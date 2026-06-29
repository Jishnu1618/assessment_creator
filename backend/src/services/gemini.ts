import { GoogleGenAI, Type, Schema } from '@google/genai';
import dotenv from 'dotenv';
import { IQuestionType, IGeneratedPaper } from '../models/Assignment.js';

dotenv.config();

// Ensure the API Key is present
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.warn('WARNING: GEMINI_API_KEY is not defined in the environment variables.');
}

const ai = new GoogleGenAI({ apiKey });

// Define the structured schema for response using the official SDK format
const responseSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    schoolName: { type: Type.STRING },
    subject: { type: Type.STRING },
    className: { type: Type.STRING },
    timeAllowed: { type: Type.STRING },
    maxMarks: { type: Type.INTEGER },
    instructions: { type: Type.STRING },
    questions: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.INTEGER },
          text: { type: Type.STRING },
          difficulty: { type: Type.STRING },
          marks: { type: Type.INTEGER },
        },
        required: ['id', 'text', 'difficulty', 'marks'],
      },
    },
    answers: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.INTEGER },
          text: { type: Type.STRING },
          formula: { type: Type.STRING },
        },
        required: ['id', 'text'],
      },
    },
  },
  required: [
    'schoolName',
    'subject',
    'className',
    'timeAllowed',
    'maxMarks',
    'instructions',
    'questions',
    'answers',
  ],
};

export const generateAssignmentPaper = async (params: {
  title: string;
  className: string;
  subject: string;
  questionTypes: IQuestionType[];
  additionalInfo?: string;
  language?: string;
  referenceFileContent?: string;
  onProgress?: (status: string, percentage: number) => void;
}): Promise<IGeneratedPaper> => {
  const { title, className, subject, questionTypes, additionalInfo, language, referenceFileContent, onProgress } = params;

  const targetLanguage = language || 'English';

  // Calculate maximum marks expected
  const expectedMaxMarks = questionTypes.reduce((sum, qt) => sum + qt.count * qt.marks, 0);

  // Define total number of questions needed
  const totalQuestions = questionTypes.reduce((sum, qt) => sum + qt.count, 0);

  const questionBreakdown = questionTypes
    .map((qt) => `- **${qt.count}x** "${qt.type}" (worth **${qt.marks} marks** each)`)
    .join('\n');

  let prompt = `You are a high-quality educational content creator. Create an exam assignment paper in the following target language: **${targetLanguage}**.

  CRITICAL: You MUST write the entire generated content, including all instructions, headings, schoolName, subject, className, questions, and answers in **${targetLanguage}**.

  **Exam Metadata:**
  - **Topic/Title:** ${title}
  - **Subject:** ${subject}
  - **Class / Grade:** ${className}
  - **School Name:** Delhi Public School, Sector-4, Bokaro
  - **Time Allowed:** 45 minutes
  - **Total Marks:** ${expectedMaxMarks}
  - **Language:** ${targetLanguage}

  **Strict Question Requirements:**
  You MUST generate EXACTLY the following questions (Total ${totalQuestions} questions):
  ${questionBreakdown}

  **Additional Context / Guidelines for the Paper:**
  ${additionalInfo || 'None provided. Generate high-quality academic questions suitable for the topic.'}
  `;

  if (referenceFileContent) {
    prompt += `\n\n**Reference Material / Syllabus Uploaded by Teacher:**\n${referenceFileContent}\nUse this reference material to base your questions and answers on. Make sure the content aligns closely with this syllabus.`;
  }

  prompt += `

**Output rules:**
1. Generate high-fidelity academic questions suitable for the requested topic, grade level, and guidelines.
2. For each question, categorize difficulty as "Easy", "Moderate", or "Challenging".
3. Provide a separate, corresponding answer sheet key. For math, physics, or chemistry numericals, specify the formula utilized in the "formula" field.
4. Set sequential numeric ids (1, 2, 3, ...) for both questions and answers. The ids in questions and answers lists MUST match perfectly (e.g., question id 1 corresponds to answer id 1).
5. Do NOT include raw markdown formatting inside the JSON values, but keep standard formulas or linebreaks if needed.`;

  try {
    // 1. Drafting Agent
    onProgress?.('[Drafting Agent] Generating initial questions...', 30);
    console.log(`[Drafting Agent] Generating initial paper layout...`);
    const draftResponseText = await callGeminiModel(prompt, responseSchema, 0.2);
    const draftPaper = JSON.parse(draftResponseText) as IGeneratedPaper;

    // 2. Critic Agent
    onProgress?.('[Critic Agent] Evaluating against rubric and Bloom\'s Taxonomy...', 60);
    console.log(`[Critic Agent] Auditing generated content...`);
    const criticResult = await criticReviewPaper(draftPaper, {
      title,
      className,
      subject,
      questionTypes,
      additionalInfo,
      language,
      referenceFileContent
    });
    console.log(`[Critic Agent] Evaluation completed. Score: ${criticResult.score}/100, Approved: ${criticResult.approved}`);

    let finalPaper = draftPaper;

    // 3. Revision Agent (Conditional)
    if (!criticResult.approved) {
      console.log(`[Critic Agent] Paper not approved. Requesting revision based on feedback: ${criticResult.feedback}`);
      onProgress?.('[Revision Agent] Refining questions based on Critic feedback...', 85);
      const revisedPaper = await revisePaper(draftPaper, criticResult.feedback, {
        title,
        className,
        subject,
        questionTypes,
        additionalInfo,
        language,
        referenceFileContent
      });
      finalPaper = revisedPaper as IGeneratedPaper;
      onProgress?.('[KeyGen Agent] Finalizing grading keys...', 95);
      await new Promise((resolve) => setTimeout(resolve, 800));
    } else {
      console.log(`[Critic Agent] Paper approved. Finalizing directly.`);
      onProgress?.('[KeyGen Agent] Finalizing grading keys...', 95);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    onProgress?.('Completed', 100);
    return finalPaper;

  } catch (error) {
    console.error('Error during multi-agent paper generation loop:', error);
    throw error;
  }
};

// ─── Phase 1: Multi-Agent Self-Reflection (Critic) Loop ───────────────────────────

export interface CriticOutput {
  score: number;
  approved: boolean;
  feedback: string;
}

const criticSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    score: { type: Type.INTEGER },
    approved: { type: Type.BOOLEAN },
    feedback: { type: Type.STRING },
  },
  required: ['score', 'approved', 'feedback'],
};

/**
 * Helper to call Gemini models with retries and structured output schema
 */
async function callGeminiModel(prompt: string, schema: Schema, temperature = 0.2): Promise<string> {
  const modelsToTry = ['gemini-2.5-flash', 'gemini-2.0-flash'];
  let response;
  let lastError;

  for (const modelName of modelsToTry) {
    let retries = 3;
    while (retries > 0) {
      try {
        console.log(`[Agent] Calling Gemini model ${modelName} (Retries left: ${retries - 1})...`);
        response = await ai.models.generateContent({
          model: modelName,
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
            responseSchema: schema,
            temperature: temperature,
          },
        });

        if (response && response.text) {
          return response.text;
        }
      } catch (err: any) {
        console.warn(`[Agent] Model ${modelName} failed (retries left: ${retries - 1}):`, err);
        lastError = err;
        
        const isTransient = err?.status === 'UNAVAILABLE' || err?.message?.includes('503') || err?.message?.includes('demand');
        if (isTransient && retries > 1) {
          await new Promise((resolve) => setTimeout(resolve, 1500));
        } else {
          break;
        }
      }
      retries--;
    }
  }

  throw lastError || new Error('All available Gemini models failed to generate content.');
}

/**
 * Critic Agent: Evaluates the draft question paper against original criteria
 */
export const criticReviewPaper = async (
  draftPaper: any,
  originalParams: any
): Promise<CriticOutput> => {
  const targetLanguage = originalParams.language || 'English';

  const prompt = `You are a Senior Academic Evaluator and Critic Agent.
Your task is to critically evaluate a drafted examination paper against the teacher's original requirements and academic quality standards.

**Original Teacher Requirements:**
- Topic/Title: ${originalParams.title}
- Subject: ${originalParams.subject}
- Class/Grade: ${originalParams.className}
- Special Guidelines: ${originalParams.additionalInfo || 'None'}
- Target Language: ${targetLanguage}

**Drafted Examination Paper (JSON):**
${JSON.stringify(draftPaper, null, 2)}

**Your Evaluation Criteria:**
1. **Guideline Adherence**: Did the generator follow the special guidelines?
2. **Academic Quality**: Are the questions clear, accurate, and free of typos?
3. **Cognitive Depth (Bloom's Taxonomy)**: Are the difficulty levels ("Easy", "Moderate", "Challenging") assigned appropriately? (e.g. challenging questions must test synthesis/application, not simple recall).
4. **Answer Key Accuracy**: Do the answers match the questions perfectly? Are formula keys provided for numerical problems?
5. **Language Compliance**: Is all content written in the target language (${targetLanguage})?

Assign a score from 0 to 100. If the paper has any spelling errors, layout mistakes, or fails key requirements, score it below 85. Set 'approved' to true if and only if the score is 85 or above. Provide detailed, specific bullet points of corrections in the 'feedback' field if not approved, or suggestions for minor improvements if approved.`;

  try {
    const responseText = await callGeminiModel(prompt, criticSchema, 0.1);
    const result = JSON.parse(responseText) as CriticOutput;
    
    // Safety check on score/approved mapping
    result.approved = result.score >= 85;
    
    return result;
  } catch (error) {
    console.error('[Critic Agent] Error during review:', error);
    throw error;
  }
};

/**
 * Revision Agent: Polishes the drafted paper based on the Critic's feedback
 */
export const revisePaper = async (
  draftPaper: any,
  feedback: string,
  originalParams: any
): Promise<any> => {
  const targetLanguage = originalParams.language || 'English';

  const prompt = `You are an Expert Academic Content Editor and Revision Agent.
Your task is to refine and correct a drafted examination paper based on specific feedback from a Critic Agent and the original teacher guidelines.

**Original Teacher Requirements:**
- Topic/Title: ${originalParams.title}
- Subject: ${originalParams.subject}
- Class/Grade: ${originalParams.className}
- Special Guidelines: ${originalParams.additionalInfo || 'None'}
- Target Language: ${targetLanguage}

**Current Draft Paper:**
${JSON.stringify(draftPaper, null, 2)}

**Critic Agent Feedback & Required Corrections:**
${feedback}

Revise the paper to incorporate all corrections requested by the Critic Agent. Ensure the final output is a complete, polished examination paper matching the original structure and JSON schema. All text MUST remain in ${targetLanguage}.`;

  try {
    // We use responseSchema defined at the top of the file for the final paper structure
    const responseText = await callGeminiModel(prompt, responseSchema, 0.2);
    const result = JSON.parse(responseText);
    return result;
  } catch (error) {
    console.error('[Revision Agent] Error during revision:', error);
    throw error;
  }
};
