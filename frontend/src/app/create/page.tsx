'use client';

import React, { useRef, useState } from 'react';
import { useStore, QuestionTypeRow } from '@/store/useStore';
import { 
  Upload, 
  Calendar, 
  X, 
  Mic, 
  ChevronRight, 
  ChevronLeft,
  FileCheck,
  Sparkles,
  Loader2,
  Plus,
  ChevronDown
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CreateAssignment() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dateInputRef = useRef<HTMLInputElement>(null);
  const [isRecording, setIsRecording] = useState(false);

  const {
    assignmentName,
    setAssignmentName,
    dueDate,
    setDueDate,
    uploadedFileName,
    uploadedFileSize,
    setUploadedFile,
    questionTypes,
    addQuestionType,
    removeQuestionType,
    updateQuestionCounter,
    updateQuestionTypeSelection,
    additionalInfo,
    setAdditionalInfo,
    language,
    setLanguage,
    triggerAIGeneration,
    generationStatus,
    generationProgress,
    generationStatusText,
  } = useStore();

  const getTodayDateString = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  // Dynamic counter sums
  const totalQuestions = questionTypes.reduce((acc, curr) => acc + curr.count, 0);
  const totalMarks = questionTypes.reduce((acc, curr) => acc + (curr.count * curr.marks), 0);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const sizeStr = (file.size / (1024 * 1024)).toFixed(2) + ' MB';
      setUploadedFile(file.name, sizeStr, file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const sizeStr = (file.size / (1024 * 1024)).toFixed(2) + ' MB';
      setUploadedFile(file.name, sizeStr, file);
    }
  };

  const triggerFileSelect = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleNextClick = async () => {
    await triggerAIGeneration(router.push);
  };

  const toggleRecording = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice recognition is not supported in this browser. Please type your instructions manually.");
      return;
    }

    if (isRecording) {
      setIsRecording(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsRecording(true);
    };

    recognition.onresult = (event: any) => {
      const speechToText = event.results[0][0].transcript;
      if (speechToText) {
        setAdditionalInfo(additionalInfo + (additionalInfo ? ' ' : '') + speechToText);
      }
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setIsRecording(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    try {
      recognition.start();
    } catch (e) {
      console.error(e);
      setIsRecording(false);
    }
  };

  const questionCategories = [
    'Multiple Choice Questions',
    'Short Questions',
    'Diagram/Graph-Based Questions',
    'Numerical Problems',
    'Long Essay Questions',
    'Fill in the Blanks',
    'True / False'
  ];

  const getLoaderMessage = (progress: number) => {
    if (progress < 25) return 'Analyzing syllabus details and guidelines...';
    if (progress < 50) return 'Uploading references and connecting with Gemini AI...';
    if (progress < 75) return 'Drafting high-fidelity questions matching marks distribution...';
    if (progress < 95) return 'Structuring detailed answers and teacher grading keys...';
    return 'Finalizing printable paper layout...';
  };

  const isGenerating = generationStatus === 'pending' || generationStatus === 'generating';

  return (
    <div className="w-full flex flex-col gap-4 select-none animate-fade-in relative pb-20 max-w-[810px] mx-auto">
      
      {/* Premium Glassmorphic Overlay Loader */}
      {isGenerating && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4 select-none">
          <div className="bg-white rounded-2xl border border-[#F0F0F0] p-8 max-w-[480px] w-full shadow-2xl flex flex-col items-center text-center animate-scale-up">
            <div className="w-16 h-16 rounded-2xl bg-[#F8F8F8] border border-[#F0F0F0] flex items-center justify-center text-primary mb-6 shadow-sm animate-pulse relative">
              <Sparkles className="w-7 h-7 text-zinc-700" style={{ animationDuration: '3s' }} />
              <Loader2 className="w-10 h-10 animate-spin text-zinc-400 absolute opacity-30" />
            </div>

            <h3 className="text-[20px] font-bold font-display text-primary tracking-tight leading-none mb-2">
              Generating Assignment
            </h3>
            <p className="text-[14px] text-muted font-display font-medium max-w-[320px] mb-8 h-10 flex items-center justify-center">
              {generationStatusText || getLoaderMessage(generationProgress)}
            </p>

            {/* Progress Bar */}
            <div className="w-full bg-[#F0F0F0] h-2 rounded-full overflow-hidden mb-3 relative">
              <div 
                className="bg-primary h-full rounded-full transition-all duration-500 ease-out"
                style={{ width: `${generationProgress}%` }}
              />
            </div>

            <div className="flex items-center justify-between w-full text-[12px] font-bold text-[#A9A9A9] font-display">
              <span className="uppercase tracking-wider">EduAi System</span>
              <span className="text-primary font-extrabold text-[14px]">{generationProgress}%</span>
            </div>
          </div>
        </div>
      )}

      {/* Page Header - Green dot + Create Assignment title matching Figma */}
      <div className="flex items-center gap-3 select-none">
        <span className="w-3 h-3 rounded-full bg-emerald-500 shrink-0" />
        <div className="flex flex-col">
          <h2 className="text-[20px] font-bold font-display text-primary tracking-tight leading-none">
            Create Assignment
          </h2>
          <span className="text-[13px] font-normal font-display text-muted mt-0.5">
            Set up a new assignment for your students
          </span>
        </div>
      </div>

      {/* 2-Step Progress bar (2 segments: step 1 full dark, step 2 lighter) */}
      <div className="w-full flex items-center gap-2 px-0">
        <div className="flex-1 h-[3px] bg-primary rounded-full" />
        <div className="flex-[3] h-[3px] bg-[#DEDEDE] rounded-full" />
      </div>

      {/* Assignment Details White Card */}
      <div className="bg-white dark:bg-[#1A1A1A] rounded-2xl border border-[#EBEBEB] dark:border-[#2D2D2D] p-6 lg:p-8 flex flex-col gap-6 w-full shadow-sm transition-colors duration-200">
        
        {/* Step Header */}
        <div>
          <h3 className="text-[18px] font-bold font-display text-primary dark:text-[#EFEFEF] tracking-tight leading-none">Assignment Details</h3>
          <p className="text-[13px] font-normal font-display text-muted dark:text-[#A0A0A0] mt-1">Basic information about your assignment</p>
        </div>

        {/* Assignment Name Input Field */}
        <div className="flex flex-col gap-2">
          <label className="text-[15px] font-bold font-display text-primary dark:text-[#EFEFEF]">Assignment Name <span className="text-[12px] text-muted dark:text-[#A0A0A0] font-normal">(Optional - will auto-generate if blank)</span></label>
          <input
            type="text"
            placeholder="e.g. Quiz on Photosynthesis, Midterm Biology Test"
            value={assignmentName}
            onChange={(e) => setAssignmentName(e.target.value)}
            className="w-full bg-white dark:bg-[#1A1A1A] border border-[#E0E0E0] dark:border-[#2D2D2D] focus:border-primary dark:focus:border-white rounded-xl px-4 py-3 text-[15px] font-medium font-display text-primary dark:text-white placeholder-[#A9A9A9] outline-none transition-all"
          />
        </div>

        {/* Upload Box - matching Figma dashed border style */}
        <div className="flex flex-col gap-2">
          <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className="border-2 border-dashed border-[#DEDEDE] dark:border-[#2D2D2D] hover:border-[#C0C0C0] dark:hover:border-[#505050] rounded-xl p-8 flex flex-col items-center justify-center text-center bg-transparent hover:bg-[#FAFAFA] dark:hover:bg-[#202020] transition-all group relative min-h-[160px] select-none cursor-pointer"
            onClick={!uploadedFileName ? triggerFileSelect : undefined}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              className="hidden"
              accept="image/*,application/pdf"
            />

            {uploadedFileName ? (
              <div className="flex flex-col items-center animate-scale-up">
                <div className="w-12 h-12 bg-white dark:bg-[#1A1A1A] rounded-xl flex items-center justify-center border border-[#E5E5E5] dark:border-[#2D2D2D] text-primary dark:text-white mb-3 shadow-sm shrink-0">
                  <FileCheck className="w-6 h-6" />
                </div>
                <span className="text-[15px] font-bold font-display text-primary dark:text-white truncate max-w-[280px]">{uploadedFileName}</span>
                <span className="text-[13px] text-[#A9A9A9] font-normal font-display mt-0.5">{uploadedFileSize}</span>
                <button
                  onClick={(e) => { e.stopPropagation(); setUploadedFile(null, null); }}
                  className="mt-4 px-4 py-1.5 rounded-full border border-red-200 hover:bg-red-50 text-danger text-[12px] font-medium font-display transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Remove File</span>
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <div className="w-11 h-11 rounded-full border border-[#E5E5E5] dark:border-[#2D2D2D] bg-white dark:bg-[#1A1A1A] flex items-center justify-center text-primary dark:text-white shadow-sm group-hover:scale-105 transition-transform mb-3 shrink-0">
                  <Upload className="w-5 h-5 text-primary dark:text-white stroke-[2]" />
                </div>
                <span className="text-[15px] font-medium font-display text-primary dark:text-white">Choose a file or drag & drop it here</span>
                <span className="text-[13px] text-[#A9A9A9] font-normal font-display mt-1">JPEG, PNG, upto 10MB</span>
                <button
                  onClick={(e) => { e.stopPropagation(); triggerFileSelect(); }}
                  className="mt-4 bg-white dark:bg-[#1A1A1A] border border-[#DEDEDE] dark:border-[#2D2D2D] hover:border-[#C0C0C0] dark:hover:border-[#505050] hover:bg-[#F8F8F8] dark:hover:bg-[#202020] text-primary dark:text-white text-[13px] font-semibold py-2 px-6 rounded-lg transition-all active:scale-[0.97] cursor-pointer"
                >
                  Browse Files
                </button>
              </div>
            )}
          </div>
          <span className="text-[13px] text-[#A9A9A9] font-normal font-display text-center">
            Upload images of your preferred document/image
          </span>
        </div>

        {/* Due Date Row */}
        <div className="flex flex-col gap-2">
          <label className="text-[15px] font-bold font-display text-primary dark:text-[#EFEFEF]">Due Date</label>
          <div 
            onClick={() => {
              try {
                (dateInputRef.current as any)?.showPicker();
              } catch (err) {
                console.error(err);
              }
            }}
            className="relative max-w-full cursor-pointer"
          >
            <input
              ref={dateInputRef}
              type="date"
              min={getTodayDateString()}
              onClick={(e) => {
                e.stopPropagation();
                try {
                  (e.currentTarget as any).showPicker();
                } catch (err) {
                  console.error(err);
                }
              }}
              value={dueDate ? dueDate.split('-').reverse().join('-') : ''}
              onChange={(e) => {
                const val = e.target.value;
                if (val) {
                  const todayStr = getTodayDateString();
                  if (val < todayStr) {
                    alert("Due Date Blocker: You cannot select a past date. Please select today's date or a future date.");
                    return;
                  }
                  const formatted = val.split('-').reverse().join('-');
                  setDueDate(formatted);
                } else {
                  setDueDate('');
                }
              }}
              className="w-full bg-white dark:bg-[#1A1A1A] border border-[#E0E0E0] dark:border-[#2D2D2D] focus:border-primary dark:focus:border-white rounded-xl pl-4 pr-11 py-3 text-[15px] font-medium font-display text-primary dark:text-white outline-none transition-all cursor-pointer"
            />
            <Calendar className="w-5 h-5 text-[#A9A9A9] absolute right-4 top-1/2 -translate-y-1/2 stroke-[1.8] pointer-events-none" />
          </div>
        </div>

        {/* Question Type Table */}
        <div className="flex flex-col gap-3 border-t border-[#F0F0F0] dark:border-[#2D2D2D] pt-5">
          {/* Table header */}
          <div className="flex items-center text-[14px] font-medium font-display text-primary dark:text-white">
            <span className="flex-1">Question Type</span>
            <span className="w-28 text-center">No. of Questions</span>
            <span className="w-24 text-center">Marks</span>
            <span className="w-8" />
          </div>

          <div className="space-y-3">
            {questionTypes.map((row) => (
              <div key={row.id} className="flex items-center gap-3">
                {/* Question type dropdown */}
                <div className="flex-1 relative">
                  <select
                    value={row.type}
                    onChange={(e) => updateQuestionTypeSelection(row.id, e.target.value)}
                    className="w-full appearance-none bg-white dark:bg-[#1E1E1E] border border-[#E0E0E0] dark:border-[#2D2D2D] focus:border-primary dark:focus:border-white rounded-xl px-4 py-2.5 text-[14px] font-medium font-display text-primary dark:text-white outline-none transition-all pr-8 cursor-pointer"
                  >
                    {questionCategories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-[#A9A9A9] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>

                {/* Questions counter */}
                <div className="w-28 flex items-center justify-center">
                  <div className="flex items-center bg-white dark:bg-[#1E1E1E] border border-[#E0E0E0] dark:border-[#2D2D2D] rounded-xl px-1 py-0.5 gap-1">
                    <button
                      onClick={() => updateQuestionCounter(row.id, 'count', 'dec')}
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-[#A9A9A9] dark:text-[#888888] hover:text-primary dark:hover:text-white hover:bg-[#F5F5F5] dark:hover:bg-[#2D2D2D] text-[16px] font-bold transition-colors select-none cursor-pointer"
                    >
                      −
                    </button>
                    <span className="w-8 text-center font-semibold font-display text-[14px] text-primary dark:text-white select-none">
                      {row.count}
                    </span>
                    <button
                      onClick={() => updateQuestionCounter(row.id, 'count', 'inc')}
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-[#A9A9A9] dark:text-[#888888] hover:text-primary dark:hover:text-white hover:bg-[#F5F5F5] dark:hover:bg-[#2D2D2D] text-[16px] font-bold transition-colors select-none cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Marks counter */}
                <div className="w-24 flex items-center justify-center">
                  <div className="flex items-center bg-white dark:bg-[#1E1E1E] border border-[#E0E0E0] dark:border-[#2D2D2D] rounded-xl px-1 py-0.5 gap-1">
                    <button
                      onClick={() => updateQuestionCounter(row.id, 'marks', 'dec')}
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-[#A9A9A9] dark:text-[#888888] hover:text-primary dark:hover:text-white hover:bg-[#F5F5F5] dark:hover:bg-[#2D2D2D] text-[16px] font-bold transition-colors select-none cursor-pointer"
                    >
                      −
                    </button>
                    <span className="w-8 text-center font-semibold font-display text-[14px] text-primary dark:text-white select-none">
                      {row.marks}
                    </span>
                    <button
                      onClick={() => updateQuestionCounter(row.id, 'marks', 'inc')}
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-[#A9A9A9] dark:text-[#888888] hover:text-primary dark:hover:text-white hover:bg-[#F5F5F5] dark:hover:bg-[#2D2D2D] text-[16px] font-bold transition-colors select-none cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Remove row */}
                <button
                  onClick={() => removeQuestionType(row.id)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-[#A9A9A9] dark:text-[#888888] hover:text-danger dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/10 transition-colors cursor-pointer shrink-0"
                  aria-label="Remove type"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Add Question Type link */}
          <button
            onClick={addQuestionType}
            className="flex items-center gap-2 mt-1 self-start text-[14px] font-bold font-display text-primary dark:text-white hover:underline transition-all cursor-pointer active:scale-95 bg-transparent border-0 p-0"
          >
            <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center shrink-0">
              <Plus className="w-3.5 h-3.5 text-white stroke-[3]" />
            </div>
            <span>Add Question Type</span>
          </button>

          {/* Totals */}
          <div className="flex flex-col items-end gap-0.5 text-[15px] font-medium font-display text-primary dark:text-white mt-2 border-t border-[#F0F0F0] dark:border-[#2D2D2D] pt-4">
            <span>Total Questions : {totalQuestions}</span>
            <span className="font-bold">Total Marks : {totalMarks}</span>
          </div>
        </div>

        {/* Language Selection Row */}
        <div className="flex flex-col gap-2 border-t border-[#F0F0F0] dark:border-[#2D2D2D] pt-5">
          <label className="text-[15px] font-bold font-display text-primary dark:text-[#EFEFEF]">
            Generation Language
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <select
                value={['English', 'Bengali', 'Hindi'].includes(language) ? language : 'Other'}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === 'Other') {
                    setLanguage('');
                  } else {
                    setLanguage(val);
                  }
                }}
                className="w-full appearance-none bg-white dark:bg-[#1A1A1A] border border-[#E0E0E0] dark:border-[#2D2D2D] focus:border-primary dark:focus:border-white rounded-xl px-4 py-3 text-[14px] font-medium font-display text-primary dark:text-white outline-none pr-10 cursor-pointer transition-all"
              >
                <option value="English">English</option>
                <option value="Bengali">Bengali (বাংলা)</option>
                <option value="Hindi">Hindi (हिंदी)</option>
                <option value="Other">Other (Custom language...)</option>
              </select>
              <ChevronDown className="w-4 h-4 text-[#A9A9A9] absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Custom input text box if language is custom */}
            {!['English', 'Bengali', 'Hindi'].includes(language) && (
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Type custom language (e.g. Spanish, French, Tamil...)"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full bg-white dark:bg-[#1A1A1A] border border-[#E0E0E0] dark:border-[#2D2D2D] focus:border-primary dark:focus:border-white rounded-xl px-4 py-3 text-[14px] font-medium font-display text-primary dark:text-white placeholder-[#A9A9A9] outline-none transition-all"
                  required
                />
              </div>
            )}
          </div>
        </div>

        {/* Additional Information textarea */}
        <div className="flex flex-col gap-2 border-t border-[#F0F0F0] dark:border-[#2D2D2D] pt-5">
          <label className="text-[15px] font-bold font-display text-primary dark:text-[#EFEFEF]">
            Additional Information (For better output)
          </label>
          <div className="relative">
            <textarea
              placeholder="e.g. Generate a question paper for 3 hour exam duration…"
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
              className="w-full bg-white dark:bg-[#1A1A1A] border border-[#E0E0E0] dark:border-[#2D2D2D] focus:border-primary dark:focus:border-white focus:ring-0 rounded-xl p-4 pb-12 text-[14px] font-medium font-display text-primary dark:text-white placeholder-[#A9A9A9] outline-none min-h-[120px] resize-none transition-all"
            />
            {/* Mic button */}
            <button
              onClick={toggleRecording}
              className={`absolute bottom-4 right-4 p-2.5 rounded-full border shadow-sm transition-all cursor-pointer ${
                isRecording 
                  ? 'bg-danger border-danger text-white animate-pulse shadow-md shadow-red-500/50 scale-105' 
                  : 'bg-white dark:bg-[#202020] border-[#E0E0E0] dark:border-[#3D3D3D] text-[#A9A9A9] hover:text-primary dark:hover:text-white hover:border-[#C0C0C0]'
              }`}
              aria-label="Voice input"
            >
              <Mic className="w-4 h-4 stroke-[2]" />
            </button>
          </div>
        </div>

      </div>

      {/* Navigation Buttons Row */}
      <div className="flex items-center justify-between w-full mt-2 select-none">
        <button
          onClick={() => router.push('/')}
          className="bg-white dark:bg-[#1A1A1A] border border-[#DEDEDE] dark:border-[#2D2D2D] text-primary dark:text-white hover:bg-[#F5F5F5] dark:hover:bg-[#202020] font-medium font-display py-3 px-7 rounded-full flex items-center justify-center gap-1.5 transition-all duration-200 active:scale-[0.97] cursor-pointer h-[46px] shadow-sm"
        >
          <ChevronLeft className="w-4 h-4 stroke-[2]" />
          <span className="text-[15px]">Previous</span>
        </button>

        <button
          onClick={handleNextClick}
          className="bg-primary hover:bg-black dark:hover:bg-white dark:hover:text-black text-white font-medium font-display py-3 px-7 rounded-full flex items-center justify-center gap-2 shadow-sm transition-all duration-200 active:scale-[0.97] cursor-pointer h-[46px]"
        >
          <span className="text-[15px]">Next</span>
          <ChevronRight className="w-4 h-4 stroke-[2]" />
        </button>
      </div>

    </div>
  );
}
