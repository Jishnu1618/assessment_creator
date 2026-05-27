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
}): Promise<IGeneratedPaper> => {
  const { title, className, subject, questionTypes, additionalInfo, language, referenceFileContent } = params;

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

  const modelsToTry = ['gemini-2.5-flash', 'gemini-2.0-flash'];
  let response;
  let lastError;

  for (const modelName of modelsToTry) {
    let retries = 3;
    while (retries > 0) {
      try {
        console.log(`Attempting content generation using model ${modelName} (Retries left: ${retries - 1})...`);
        response = await ai.models.generateContent({
          model: modelName,
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
            responseSchema: responseSchema,
            temperature: 0.2, // slightly lower temperature for precise compliance
          },
        });

        if (response && response.text) {
          console.log(`Successfully generated content using model ${modelName}!`);
          break; // Stop retry loop on successful generation
        }
      } catch (err: any) {
        console.warn(`Model ${modelName} failed or returned error (retries left: ${retries - 1}):`, err);
        lastError = err;
        
        const isTransient = err?.status === 'UNAVAILABLE' || err?.message?.includes('503') || err?.message?.includes('demand');
        if (isTransient && retries > 1) {
          console.log('Transient error detected. Waiting 1.5 seconds before retrying...');
          await new Promise((resolve) => setTimeout(resolve, 1500));
        } else {
          // If it's a hard error or out of retries, break to try the next model
          break;
        }
      }
      retries--;
    }
    if (response && response.text) {
      break; // Stop iterating outer model list on success
    }
  }

  if (!response || !response.text) {
    throw lastError || new Error('All available Gemini models failed to generate content.');
  }

  try {
    const result = JSON.parse(response.text) as IGeneratedPaper;
    return result;
  } catch (error) {
    console.error('Error parsing Gemini JSON response:', error);
    throw error;
  }
};
