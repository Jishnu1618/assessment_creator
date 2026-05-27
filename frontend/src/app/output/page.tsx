'use client';

import React from 'react';
import { useStore } from '@/store/useStore';
import { 
  Download, 
  ArrowLeft, 
  Printer, 
  FileText
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function OutputView() {
  const router = useRouter();
  const { generatedPaper, selectedAssignmentId, generatingAssignmentId } = useStore();
  const assignmentId = selectedAssignmentId || generatingAssignmentId;

  if (!generatedPaper) {
    return (
      <div className="w-full max-w-lg mx-auto mt-20 bg-white dark:bg-[#1A1A1A] p-8 rounded-2xl border border-[#EBEBEB] dark:border-[#2D2D2D] text-center select-none shadow-sm transition-colors duration-200">
        <h3 className="text-[18px] font-bold text-primary dark:text-white mb-2">No Assignment Loaded</h3>
        <p className="text-sm text-muted dark:text-[#A0A0A0] mb-6">No question paper was found or generated for the active session.</p>
        <button onClick={() => router.push('/')} className="bg-primary hover:bg-black dark:hover:bg-white dark:hover:text-black text-white py-2.5 px-6 rounded-full font-semibold transition-colors">
          Go Back Home
        </button>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    if (assignmentId) {
      const downloadUrl = `http://localhost:5000/api/assignments/${assignmentId}/pdf`;
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', `Assignment-${assignmentId}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      window.print();
    }
  };

  // Beautiful animated difficulty badges
  const renderDifficultyBadge = (difficulty: string) => {
    const diff = difficulty.toLowerCase();
    let badgeStyle = '';
    let dotBgStyle = '';
    let dotStyle = '';
    let text = '';

    if (diff === 'easy') {
      badgeStyle = 'bg-emerald-50/80 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/40 hover:bg-emerald-100 dark:hover:bg-emerald-950/40 hover:shadow-[0_2px_12px_rgba(16,185,129,0.2)] dark:hover:shadow-[0_2px_12px_rgba(16,185,129,0.1)]';
      dotBgStyle = 'bg-emerald-400 dark:bg-emerald-500';
      dotStyle = 'bg-emerald-500 dark:bg-emerald-400 shadow-[0_0_6px_rgba(16,185,129,0.7)]';
      text = 'Easy';
    } else if (diff === 'moderate' || diff === 'medium') {
      badgeStyle = 'bg-amber-50/80 dark:bg-amber-950/20 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800/40 hover:bg-amber-100 dark:hover:bg-amber-950/40 hover:shadow-[0_2px_12px_rgba(245,158,11,0.2)] dark:hover:shadow-[0_2px_12px_rgba(245,158,11,0.1)]';
      dotBgStyle = 'bg-amber-400 dark:bg-amber-500';
      dotStyle = 'bg-amber-500 dark:bg-amber-400 shadow-[0_0_6px_rgba(245,158,11,0.7)]';
      text = 'Moderate';
    } else {
      badgeStyle = 'bg-rose-50/80 dark:bg-rose-950/20 text-rose-700 dark:text-rose-400 border-rose-200 dark:border-rose-800/40 hover:bg-rose-100 dark:hover:bg-rose-950/40 hover:shadow-[0_2px_12px_rgba(239,68,68,0.2)] dark:hover:shadow-[0_2px_12px_rgba(239,68,68,0.1)]';
      dotBgStyle = 'bg-rose-400 dark:bg-rose-500';
      dotStyle = 'bg-rose-500 dark:bg-rose-400 shadow-[0_0_6px_rgba(239,68,68,0.7)]';
      text = 'Challenging';
    }

    return (
      <span className={`inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-[11px] font-bold border transition-all duration-300 transform hover:scale-[1.06] hover:-translate-y-0.5 select-none cursor-default shadow-xs ${badgeStyle}`}>
        <span className="relative flex h-1.5 w-1.5 shrink-0">
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${dotBgStyle}`} style={{ animationDuration: '2s' }} />
          <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${dotStyle}`} />
        </span>
        <span className="tracking-wide">{text}</span>
      </span>
    );
  };

  return (
    <div className="w-full flex flex-col select-none animate-fade-in relative pb-16 max-w-[1060px] mx-auto print:pb-0 print:max-w-full">
      
      {/* AI Response Banner - Dark #303030 background, rounded top, matches Figma exactly */}
      <div className="bg-primary text-white rounded-t-2xl p-5 flex flex-col gap-4 select-none relative overflow-hidden print:hidden">
        <p className="text-[14px] font-semibold font-display text-white leading-snug">
          Certainly, Lakshya! Here are customized Question Paper for your CBSE Grade 8 Science classes on the NCERT chapters:
        </p>

        {/* Download as PDF button — rounded-lg outline style matching Figma */}
        <button
          onClick={handleDownloadPDF}
          className="bg-transparent border border-white/60 hover:bg-white/10 hover:border-white text-white font-semibold font-display py-2 px-5 rounded-lg flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.97] cursor-pointer text-[13px] whitespace-nowrap w-fit"
        >
          <Download className="w-4 h-4 stroke-[2]" />
          <span>Download as PDF</span>
        </button>
      </div>

      {/* Printable Question Paper White Content Card */}
      <div className="bg-white dark:bg-[#1A1A1A] border border-[#EBEBEB] dark:border-[#2D2D2D] rounded-b-2xl rounded-t-none px-8 lg:px-12 py-8 w-full flex flex-col gap-5 shadow-sm print:shadow-none print:border-none print:px-0 print:py-0 print:m-0 print:rounded-none transition-colors duration-200">
        
        {/* Print controls bar - hidden during print */}
        <div className="flex items-center justify-between pb-4 border-b border-[#F0F0F0] dark:border-[#2D2D2D] print:hidden select-none">
          <div className="flex items-center gap-2 text-[#A9A9A9] text-[13px] font-semibold font-display">
            <FileText className="w-4 h-4" />
            <span>Interactive PDF Preview</span>
          </div>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#E0E0E0] dark:border-[#2D2D2D] hover:bg-[#F5F5F5] dark:hover:bg-[#202020] text-[13px] font-bold font-display text-primary dark:text-white transition-all cursor-pointer active:scale-95"
          >
            <Printer className="w-4 h-4 text-[#A9A9A9] dark:text-[#888888]" />
            <span>Print Paper</span>
          </button>
        </div>

        {/* Document Header — School name as text matching Figma (NOT logo image) */}
        <div className="text-center flex flex-col items-center gap-1 mt-2 select-none print:mt-0">
          <h1 className="text-[22px] font-bold font-sans text-primary dark:text-white tracking-wide">
            {generatedPaper.schoolName}
          </h1>
          <span className="text-[16px] font-semibold font-sans text-primary dark:text-white">
            Subject: {generatedPaper.subject}
          </span>
          <span className="text-[15px] font-semibold font-sans text-muted dark:text-[#A0A0A0]">
            {generatedPaper.className}
          </span>
        </div>

        {/* Time and Marks row */}
        <div className="flex items-center justify-between text-[16px] font-semibold font-sans text-primary dark:text-white border-y-2 border-primary/80 dark:border-[#2D2D2D] py-3 select-none">
          <span>Time Allowed: {generatedPaper.timeAllowed}</span>
          <span>Maximum Marks: {generatedPaper.maxMarks}</span>
        </div>

        {/* Instructions */}
        <p className="text-[15px] font-normal font-sans text-primary dark:text-[#EFEFEF] leading-normal select-none">
          {generatedPaper.instructions}
        </p>

        {/* Candidate Info — Left-aligned, stacked compactly — matches Figma */}
        <div className="flex flex-col gap-2 text-[15px] font-normal font-sans text-primary dark:text-[#EFEFEF] select-none">
          <div className="flex items-end">
            <span className="shrink-0 font-semibold text-primary dark:text-white">Name: </span>
            <span className="ml-1 border-b border-primary dark:border-[#EFEFEF] w-36 inline-block h-5" />
          </div>
          <div className="flex items-end">
            <span className="shrink-0 font-semibold text-primary dark:text-white">Roll Number: </span>
            <span className="ml-1 border-b border-primary dark:border-[#EFEFEF] w-28 inline-block h-5" />
          </div>
          <div className="flex items-end">
            <span className="shrink-0 font-semibold text-primary dark:text-white">Class: 5th Section: </span>
            <span className="ml-1 border-b border-primary dark:border-[#EFEFEF] w-20 inline-block h-5" />
          </div>
        </div>

        {/* Section A divider - Figma: centered, normal weight, not uppercase */}
        <div className="text-center font-semibold font-sans text-[18px] text-primary dark:text-white my-3 select-none border-t border-[#F0F0F0] dark:border-[#2D2D2D] pt-5">
          Section A
        </div>

        {/* Question type header - Figma: bold, not uppercase */}
        <div className="flex flex-col gap-0.5 select-none">
          <h3 className="text-[15px] font-bold font-sans text-primary dark:text-white">Short Answer Questions</h3>
          <span className="text-[13px] italic text-muted dark:text-[#A0A0A0] font-sans">Attempt all questions. Each question carries 2 marks</span>
        </div>

        {/* Questions list with beautiful animated badges */}
        <ol className="space-y-3 text-[15px] font-normal font-sans text-primary dark:text-[#EFEFEF]">
          {generatedPaper.questions.map((q, index) => (
            <li 
              key={q.id} 
              className="flex items-start gap-3 py-3 border-b border-[#F5F5F5] dark:border-[#2D2D2D] last:border-0 hover:bg-[#FAFAFA] dark:hover:bg-[#202020] px-3 rounded-xl transition-all duration-200 group"
            >
              <span className="font-bold text-zinc-400 dark:text-zinc-500 select-none shrink-0 w-5 text-right mt-0.5">{index + 1}.</span>
              <div className="flex-grow flex flex-col sm:flex-row sm:items-center gap-2 justify-between">
                <span className="text-[15px] font-sans text-primary dark:text-white leading-relaxed flex-1">
                  {q.text}
                </span>
                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center mt-1 sm:mt-0">
                  {renderDifficultyBadge(q.difficulty)}
                  <span className="bg-zinc-100 dark:bg-[#2D2D2D] border border-zinc-200 dark:border-[#3D3D3D] text-zinc-700 dark:text-zinc-300 font-semibold px-2.5 py-0.5 rounded-md text-[11px] select-none uppercase tracking-wide transition-all group-hover:bg-zinc-200 dark:group-hover:bg-[#3D3D3D] print:border-zinc-300">
                    {q.marks} Marks
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ol>

        {/* End of Question Paper — bold, matching Figma */}
        <p className="font-bold text-[15px] text-primary dark:text-white mt-2 select-none font-sans">
          End of Question Paper
        </p>

        {/* Answer Key */}
        <div className="mt-6 border-t border-[#F0F0F0] dark:border-[#2D2D2D] pt-5 flex flex-col gap-3">
          <h3 className="text-[15px] font-bold font-sans text-primary dark:text-white select-none">
            Answer Key:
          </h3>
          <ol className="space-y-5 text-[15px] font-normal font-sans text-muted dark:text-[#A0A0A0] leading-relaxed">
            {generatedPaper.answers.map((a, index) => (
              <li key={a.id} className="flex items-start gap-2.5">
                <span className="font-semibold text-primary dark:text-white select-none shrink-0">{index + 1}.</span>
                <div className="flex-1 flex flex-col gap-1">
                  <p>{a.text}</p>
                  {a.formula && (
                    <p className="text-[13px] font-mono bg-[#F8F8F8] dark:bg-[#202020] border dark:border-[#2D2D2D] rounded px-2 py-1 text-primary dark:text-white mt-1">
                      {a.formula}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>

      </div>

      {/* Back button */}
      <div className="w-full mt-5 print:hidden select-none">
        <button
          onClick={() => router.push('/')}
          className="bg-white dark:bg-[#1A1A1A] border border-[#DEDEDE] dark:border-[#2D2D2D] text-primary dark:text-white hover:bg-[#F5F5F5] dark:hover:bg-[#202020] font-medium font-display py-3 px-6 rounded-full flex items-center justify-center gap-1.5 shadow-sm transition-all duration-200 active:scale-[0.97] cursor-pointer h-[46px] w-fit"
        >
          <ArrowLeft className="w-4 h-4 stroke-[2]" />
          <span className="text-[15px]">Back to Assignments</span>
        </button>
      </div>

    </div>
  );
}
