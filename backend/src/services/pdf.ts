import puppeteer from 'puppeteer';
import { IAssignment } from '../models/Assignment.js';

export const generatePDFBuffer = async (assignment: IAssignment): Promise<Buffer> => {
  const paper = assignment.generatedPaper;
  if (!paper) {
    throw new Error('Assignment has no generated paper content yet.');
  }

  // Build high-fidelity HTML matching the clean, monochrome premium design
  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>${assignment.title}</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;600;700;800&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
        <style>
          body {
            font-family: 'Inter', sans-serif;
            color: #303030;
          }
          h1, h2, h3, .font-display {
            font-family: 'Bricolage Grotesque', sans-serif;
          }
          .page-break {
            page-break-before: always;
          }
        </style>
      </head>
      <body class="p-8 bg-white max-w-[800px] mx-auto text-sm leading-relaxed">
        <!-- HEADER BLOCK -->
        <div class="border-b-2 border-[#303030] pb-6 mb-6">
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center gap-4">
              <!-- DPS Wide Logo Placeholder / Circular Logo -->
              <div class="w-12 h-12 rounded-full border border-[#303030] flex items-center justify-center font-display font-bold text-lg bg-[#F0F0F0]">
                DPS
              </div>
              <div>
                <h1 class="text-xl font-bold uppercase tracking-wide text-[#303030]">${paper.schoolName}</h1>
                <p class="text-xs text-[#5E5E5E]">Sector-4, Bokaro Steel City, Jharkhand</p>
              </div>
            </div>
          </div>

          <div class="text-center my-4">
            <h2 class="text-2xl font-bold tracking-tight text-[#303030]">${assignment.title}</h2>
          </div>

          <!-- METADATA ROWS -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs mt-6 border-t border-b border-[#F0F0F0] py-3">
            <div><strong>SUBJECT:</strong> ${paper.subject}</div>
            <div><strong>CLASS:</strong> ${paper.className}</div>
            <div><strong>TIME ALLOWED:</strong> ${paper.timeAllowed}</div>
            <div><strong>MAX MARKS:</strong> ${paper.maxMarks}</div>
          </div>
        </div>

        <!-- CANDIDATE INFO FIELDS -->
        <div class="grid grid-cols-2 gap-4 mb-6 border border-[#303030] p-4 text-xs font-semibold">
          <div>CANDIDATE NAME: ___________________________</div>
          <div>ROLL NO: _______________________</div>
        </div>

        <!-- INSTRUCTIONS -->
        <div class="bg-[#F0F0F0] p-4 rounded-lg mb-8 text-xs text-[#5E5E5E]">
          <h3 class="font-bold text-[#303030] mb-2">GENERAL INSTRUCTIONS:</h3>
          <p>${paper.instructions}</p>
        </div>

        <!-- QUESTIONS LIST -->
        <div class="mb-12">
          <h3 class="text-lg font-bold border-b border-[#303030] pb-2 mb-4 text-[#303030]">QUESTIONS</h3>
          <div class="space-y-6">
            ${paper.questions
              .map(
                (q) => `
              <div class="flex justify-between items-start gap-4">
                <div class="flex gap-3">
                  <span class="font-bold text-[#303030]">${q.id}.</span>
                  <div>
                    <p class="text-[#303030] leading-normal font-medium">${q.text}</p>
                    <span class="inline-block mt-1 text-[10px] uppercase font-bold tracking-wider text-[#A9A9A9]">Difficulty: ${q.difficulty}</span>
                  </div>
                </div>
                <div class="shrink-0 text-xs font-semibold text-[#303030] bg-[#F0F0F0] px-2 py-1 rounded">
                  [${q.marks} Marks]
                </div>
              </div>
            `
              )
              .join('')}
          </div>
        </div>

        <!-- ANSWER KEY SHEET (PAGE BREAK) -->
        <div class="page-break pt-8">
          <div class="border-b-2 border-[#303030] pb-4 mb-6">
            <h1 class="text-xl font-bold uppercase tracking-wide text-[#303030]">${paper.schoolName}</h1>
            <h2 class="text-lg font-bold text-[#5E5E5E] uppercase">TEACHER'S GRADING & ANSWER KEY</h2>
            <p class="text-xs text-[#A9A9A9] mt-1">Topic: ${assignment.title} • Subject: ${paper.subject}</p>
          </div>

          <div class="space-y-6">
            ${paper.answers
              .map((ans) => {
                const q = paper.questions.find((quest) => quest.id === ans.id);
                return `
                <div class="border-b border-[#F0F0F0] pb-4">
                  <div class="flex items-center gap-2 mb-2">
                    <span class="font-bold text-[#303030]">Q${ans.id}.</span>
                    <span class="text-xs text-[#5E5E5E] italic">(${q ? q.marks : 0} Marks Question)</span>
                  </div>
                  <div class="text-[#303030] bg-[#F0F0F0]/50 p-3 rounded-lg border border-[#F0F0F0]">
                    <p class="font-semibold text-xs mb-1 text-[#5E5E5E]">Suggested Answer:</p>
                    <p class="text-sm leading-relaxed whitespace-pre-wrap">${ans.text}</p>
                    ${
                      ans.formula
                        ? `<div class="mt-2 text-xs font-mono bg-[#303030] text-white p-2 rounded">
                            <strong>Formula:</strong> ${ans.formula}
                           </div>`
                        : ''
                    }
                  </div>
                </div>
              `;
              })
              .join('')}
          </div>
        </div>
      </body>
    </html>
  `;

  // Spin up puppeteer to print
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: 'load' });

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '15mm',
        bottom: '15mm',
        left: '15mm',
        right: '15mm',
      },
    });

    return Buffer.from(pdfBuffer);
  } finally {
    await browser.close();
  }
};
