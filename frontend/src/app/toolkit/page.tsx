'use client';

import React, { useState } from 'react';
import { Sparkles, BookOpen, FileText, Brain, Wand2, ChevronRight, X, Loader2 } from 'lucide-react';

interface Tool {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  color: string;
  badge?: string;
}

const tools: Tool[] = [
  {
    id: 'lesson-plan',
    name: 'Lesson Plan Generator',
    description: 'Generate comprehensive lesson plans aligned to curriculum standards.',
    icon: BookOpen,
    color: '#FF7950',
    badge: 'Popular',
  },
  {
    id: 'rubric',
    name: 'Rubric Builder',
    description: 'Create detailed grading rubrics for any assignment type.',
    icon: FileText,
    color: '#6C63FF',
  },
  {
    id: 'quiz',
    name: 'Quiz Generator',
    description: 'Auto-generate quizzes with MCQ, fill-in-the-blank, and more.',
    icon: Brain,
    color: '#00C896',
    badge: 'New',
  },
  {
    id: 'feedback',
    name: 'Student Feedback Writer',
    description: 'Generate personalized, constructive feedback for student submissions.',
    icon: Wand2,
    color: '#FF5B8D',
  },
  {
    id: 'summary',
    name: 'Topic Summarizer',
    description: 'Summarize complex topics into age-appropriate explanations.',
    icon: Sparkles,
    color: '#F59E0B',
  },
];

function ToolModal({ tool, onClose }: { tool: Tool; onClose: () => void }) {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const Icon = tool.icon;

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    // Simulate AI generation
    await new Promise(r => setTimeout(r, 2000));
    setResult(`[AI Generated ${tool.name} Output]\n\nBased on your input: "${prompt}"\n\nThis is a mock AI response for the ${tool.name} tool. In production, this would connect to the VedaAI backend and return a real AI-generated response tailored to your curriculum and class level.\n\nExample output would include detailed, structured content relevant to ${tool.name.toLowerCase()} for your specific class and subject.`);
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 p-6 animate-scale-up z-10 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: tool.color + '20' }}>
              <Icon className="w-5 h-5" style={{ color: tool.color }} />
            </div>
            <h2 className="text-[16px] font-bold font-display text-primary">{tool.name}</h2>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-[#F0F0F0] cursor-pointer">
            <X className="w-4 h-4 text-muted" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-[12px] font-semibold text-muted font-display uppercase tracking-wide">Describe what you need</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={`e.g. A lesson plan for Class 8 Science on the topic of Electricity for a 45-minute class...`}
              rows={4}
              className="mt-1.5 w-full px-3.5 py-3 rounded-xl border border-[#E5E5E5] text-[14px] font-display text-primary outline-none focus:border-orange-400 transition-all resize-none"
            />
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading || !prompt.trim()}
            className="w-full py-3 rounded-xl text-white font-semibold font-display text-[14px] cursor-pointer transition-all disabled:opacity-60 flex items-center justify-center gap-2"
            style={{ background: 'linear-gradient(180deg, #FF7950 0%, #C0350A 100%)' }}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Generate with AI
              </>
            )}
          </button>

          {result && (
            <div className="bg-[#F8F8F8] rounded-xl border border-[#EBEBEB] p-4">
              <p className="text-[12px] font-semibold text-muted font-display uppercase tracking-wide mb-2">Generated Output</p>
              <pre className="text-[13px] font-display text-primary whitespace-pre-wrap leading-relaxed">{result}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ToolkitPage() {
  const [activeTool, setActiveTool] = useState<Tool | null>(null);

  return (
    <>
      {activeTool && <ToolModal tool={activeTool} onClose={() => setActiveTool(null)} />}

      <div className="max-w-4xl mx-auto animate-fade-in">
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-5 h-5 text-orange-500" />
            <h1 className="text-[24px] font-extrabold font-display text-primary">AI Teacher&apos;s Toolkit</h1>
          </div>
          <p className="text-[14px] text-muted font-display">Powerful AI tools designed to save you time and enhance your teaching.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <button
                key={tool.id}
                onClick={() => setActiveTool(tool)}
                className="bg-white rounded-2xl border border-[#EBEBEB] p-5 hover:shadow-sm hover:border-[#D0D0D0] transition-all cursor-pointer group text-left flex items-start gap-4"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105"
                  style={{ background: tool.color + '18' }}
                >
                  <Icon className="w-6 h-6" style={{ color: tool.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-[15px] font-bold font-display text-primary">{tool.name}</h3>
                    {tool.badge && (
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full font-display" style={{ background: tool.color + '20', color: tool.color }}>
                        {tool.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-[13px] text-muted font-display leading-relaxed">{tool.description}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-[#A9A9A9] shrink-0 mt-1 group-hover:translate-x-0.5 transition-transform" />
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
