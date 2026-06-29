'use client';

import React, { useState, useEffect } from 'react';
import { useStore } from '@/store/useStore';
import { 
  Search, 
  SlidersHorizontal, 
  Plus, 
  Trash2, 
  Eye,
  Sparkles,
  CheckCircle2,
  FileText,
  Clock
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function FilledState() {
  const { assignments, deleteAssignment, resetForm, setSelectedAssignmentId, fetchAssignments } = useStore();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchAssignments();
  }, [fetchAssignments]);

  const filteredAssignments = assignments.filter((a) =>
    a.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateClick = () => {
    resetForm();
    router.push('/create');
  };

  const handleViewClick = (id: string) => {
    setSelectedAssignmentId(id);
    router.push('/output');
  };

  const handleDeleteClick = (id: string) => {
    deleteAssignment(id);
  };

  return (
    <div className="w-full max-w-[1100px] mx-auto flex flex-col select-none animate-fade-in relative pb-24">
      
      {/* Head Panel — Green dot + title + subtitle matching Figma */}
      <div className="flex items-center gap-3 mb-6 select-none">
        <span className="w-3 h-3 rounded-full bg-emerald-500 shrink-0" />
        <div className="flex flex-col">
          <h2 className="text-[20px] font-bold font-display text-primary dark:text-white leading-tight">
            Teacher Dashboard
          </h2>
          <span className="text-[13px] font-normal font-display text-muted dark:text-[#A0A0A0] leading-none mt-0.5">
            Manage your AI assessment pipelines and generated exam papers.
          </span>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="backdrop-blur-xl bg-white/60 dark:bg-zinc-900/30 border border-white/80 dark:border-zinc-700/50 shadow-xl shadow-slate-200/50 dark:shadow-black/40 rounded-2xl p-5 transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-white/80 dark:hover:bg-zinc-800/40 hover:shadow-2xl hover:shadow-slate-200/70">
          <div className="text-[11px] font-bold text-slate-500 dark:text-zinc-500 uppercase tracking-widest font-display">Total Creator Runs</div>
          <div className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1 font-display tracking-tight">{assignments.length}</div>
          <div className="text-[12px] text-slate-550 dark:text-zinc-500 mt-1 flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-slate-400 dark:text-zinc-500" />
            <span>Assignments deployed</span>
          </div>
        </div>
        
        <div className="backdrop-blur-xl bg-white/60 dark:bg-zinc-900/30 border border-white/80 dark:border-zinc-700/50 shadow-xl shadow-slate-200/50 dark:shadow-black/40 rounded-2xl p-5 transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-white/80 dark:hover:bg-zinc-800/40 hover:shadow-2xl hover:shadow-slate-200/70">
          <div className="text-[11px] font-bold text-slate-500 dark:text-zinc-500 uppercase tracking-widest font-display">Active Agent Cycles</div>
          <div className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1 font-display tracking-tight">
            {assignments.filter(a => a.status === 'generating').length}
          </div>
          <div className="text-[12px] text-slate-550 dark:text-zinc-500 mt-1 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
            <span>AI pipelines executing</span>
          </div>
        </div>

        <div className="backdrop-blur-xl bg-white/60 dark:bg-zinc-900/30 border border-white/80 dark:border-zinc-700/50 shadow-xl shadow-slate-200/50 dark:shadow-black/40 rounded-2xl p-5 transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-white/80 dark:hover:bg-zinc-800/40 hover:shadow-2xl hover:shadow-slate-200/70">
          <div className="text-[11px] font-bold text-slate-500 dark:text-zinc-500 uppercase tracking-widest font-display">Completed Papers</div>
          <div className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1 font-display tracking-tight">
            {assignments.filter(a => a.status === 'completed').length}
          </div>
          <div className="text-[12px] text-slate-550 dark:text-zinc-500 mt-1 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            <span>Graded & printable papers</span>
          </div>
        </div>
      </div>

      {/* Main Glassmorphic Container Layout */}
      <div className="backdrop-blur-md bg-white/40 dark:bg-zinc-900/40 border border-zinc-200/50 dark:border-zinc-800/50 rounded-3xl p-6 shadow-xl w-full">
        
        {/* Filter and Search Panel */}
        <div className="flex items-center gap-4 mb-6 select-none">
          <button className="flex items-center gap-2 text-[14px] font-bold font-display text-zinc-400 dark:text-zinc-500 hover:text-primary transition-colors cursor-pointer select-none shrink-0">
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filter By</span>
          </button>

          <div className="flex-1 bg-white/80 dark:bg-zinc-800/80 rounded-full border border-zinc-205/60 dark:border-zinc-700/60 h-[44px] px-4 flex items-center gap-2 shadow-sm focus-within:border-zinc-400 dark:focus-within:border-zinc-500 transition-all">
            <Search className="w-4 h-4 text-zinc-400 shrink-0" />
            <input
              type="text"
              placeholder="Search by assignment title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent text-[14px] font-display text-primary dark:text-white placeholder-zinc-400 border-0 outline-none focus:ring-0"
            />
          </div>
        </div>

        {/* Recent Activity Table list */}
        {filteredAssignments.length === 0 ? (
          <div className="flex-1 min-h-[250px] bg-white/30 dark:bg-zinc-850/30 rounded-2xl border border-zinc-200/40 dark:border-zinc-800/40 flex flex-col items-center justify-center p-6 text-muted text-center">
            <Search className="w-8 h-8 text-zinc-400 mb-2 stroke-[1.5]" />
            <p className="text-sm font-semibold font-display">No assignments match your search query.</p>
          </div>
        ) : (
          <div className="w-full overflow-x-auto">
            <table className="w-full border-collapse text-left text-zinc-650 dark:text-zinc-400">
              <thead>
                <tr className="border-b border-zinc-200/50 dark:border-zinc-800/50 text-[11px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                  <th className="py-3.5 px-4 font-display">Assignment Details</th>
                  <th className="py-3.5 px-4 font-display">Assigned / Due</th>
                  <th className="py-3.5 px-4 font-display">AI Progress</th>
                  <th className="py-3.5 px-4 font-display text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100/50 dark:divide-zinc-800/50">
                {filteredAssignments.map((item) => (
                  <tr 
                    key={item.id} 
                    className="group hover:bg-white/30 dark:hover:bg-zinc-800/30 transition-all duration-200"
                  >
                    <td className="py-4 px-4">
                      <div className="flex flex-col">
                        <span 
                          onClick={() => item.status !== 'generating' && handleViewClick(item.id)}
                          className={`text-[16px] font-bold transition-colors ${
                            item.status === 'generating' 
                              ? 'text-zinc-400 dark:text-zinc-605 cursor-not-allowed' 
                              : 'text-zinc-800 dark:text-zinc-200 group-hover:text-primary cursor-pointer hover:underline'
                          }`}
                        >
                          {item.title}
                        </span>
                        <span className="text-[12px] text-zinc-400 dark:text-zinc-500 mt-0.5 font-display">
                          {item.subject} • {item.className}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-[13px] font-display font-medium text-zinc-500 dark:text-zinc-400">
                      <div className="flex flex-col gap-0.5">
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-zinc-400" />
                          <span>{item.assignedDate}</span>
                        </span>
                        <span className="text-[12px] text-zinc-400 dark:text-zinc-500 pl-5">Due: {item.dueDate}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      {/* Glowing Status Badges */}
                      {item.status === 'generating' ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 shadow-[0_0_8px_rgba(245,158,11,0.1)] select-none">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />
                          <span>Generating ({item.progress}%)</span>
                        </span>
                      ) : item.status === 'completed' ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 shadow-[0_0_8px_rgba(16,185,129,0.1)] select-none">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          <span>Completed</span>
                        </span>
                      ) : item.status === 'failed' ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20 select-none">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                          <span>Failed</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-zinc-500/10 text-zinc-500 select-none">
                          <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
                          <span>Pending</span>
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => handleViewClick(item.id)}
                          disabled={item.status === 'generating'}
                          className="p-2 rounded-lg text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                          title="View Output"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(item.id)}
                          className="p-2 rounded-lg text-zinc-400 hover:text-red-650 dark:hover:text-red-400 hover:bg-red-50/50 dark:hover:bg-red-950/20 transition-colors cursor-pointer"
                          title="Delete Assignment"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Floating "Create Assignment" dark CTA button — centered at bottom */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 select-none print:hidden" style={{ marginLeft: '152px' }}>
        <button
          onClick={handleCreateClick}
          className="bg-primary hover:bg-black text-white font-medium font-display py-3 px-7 rounded-full flex items-center justify-center gap-2 shadow-lg transition-all duration-200 active:scale-[0.97] hover:scale-[1.02] cursor-pointer whitespace-nowrap h-[46px]"
          style={{ minWidth: '208px' }}
        >
          <Plus className="w-4.5 h-4.5 text-white stroke-[2.5]" />
          <span className="text-[15px]">Create Assignment</span>
        </button>
      </div>

    </div>
  );
}
