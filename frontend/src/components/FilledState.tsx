'use client';

import React, { useState, useEffect } from 'react';
import { useStore } from '@/store/useStore';
import { 
  Search, 
  SlidersHorizontal, 
  MoreVertical, 
  Plus, 
  Trash2, 
  Eye,
  Circle
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function FilledState() {
  const { assignments, deleteAssignment, resetForm, setSelectedAssignmentId, fetchAssignments } = useStore();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDropdownId, setActiveDropdownId] = useState<string | null>(null);

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
    setActiveDropdownId(null);
    setSelectedAssignmentId(id);
    router.push('/output');
  };

  const handleDeleteClick = (id: string) => {
    setActiveDropdownId(null);
    deleteAssignment(id);
  };

  return (
    <div className="w-full max-w-[1100px] mx-auto flex flex-col select-none animate-fade-in relative pb-24">
      
      {/* Head Panel — Green dot + title + subtitle matching Figma */}
      <div className="flex items-center gap-3 mb-5 select-none">
        <span className="w-3 h-3 rounded-full bg-emerald-500 shrink-0" />
        <div className="flex flex-col">
          <h2 className="text-[20px] font-bold font-display text-primary dark:text-white leading-tight">
            Assignments
          </h2>
          <span className="text-[13px] font-normal font-display text-muted dark:text-[#A0A0A0] leading-none mt-0.5">
            Manage and create assignments for your classes.
          </span>
        </div>
      </div>

      {/* Filter and Search Panel (matching Figma: Filter By on LEFT, Search pill on RIGHT) */}
      <div className="flex items-center gap-4 mb-5 select-none">
        
        {/* Filter By on LEFT side */}
        <button className="flex items-center gap-2 text-[14px] font-normal font-display text-[#A9A9A9] hover:text-primary transition-colors cursor-pointer select-none shrink-0">
          <SlidersHorizontal className="w-4 h-4 text-[#A9A9A9]" />
          <span>Filter By</span>
        </button>

        {/* Search Input Box on RIGHT side as its own pill */}
        <div className="flex-1 bg-white dark:bg-[#1A1A1A] rounded-full border border-[#E5E5E5] dark:border-[#2D2D2D] h-[44px] px-4 flex items-center gap-2 shadow-sm">
          <Search className="w-4 h-4 text-[#A9A9A9] shrink-0" />
          <input
            type="text"
            placeholder="Search Assignment"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent text-[14px] font-display text-primary dark:text-white placeholder-[#A9A9A9] border-0 outline-none focus:ring-0"
          />
        </div>
      </div>

      {/* 2-Column Grid of Cards */}
      {filteredAssignments.length === 0 ? (
        <div className="flex-1 min-h-[300px] bg-white dark:bg-[#1A1A1A] rounded-2xl border border-[#F0F0F0] dark:border-[#2D2D2D] flex flex-col items-center justify-center p-6 text-muted">
          <Search className="w-8 h-8 text-[#A9A9A9] mb-2 stroke-[1.5]" />
          <p className="text-sm font-semibold font-display">No assignments match your search query.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 select-none">
          {filteredAssignments.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-[#1A1A1A] rounded-2xl border border-[#EBEBEB] dark:border-[#2D2D2D] hover:border-[#D0D0D0] dark:hover:border-[#505050] p-5 flex flex-col justify-between relative transition-all duration-200 group hover:shadow-sm select-none w-full"
              style={{ minHeight: '140px' }}
            >
              {/* Card Header: Title + 3-dot menu */}
              <div className="flex items-start justify-between gap-3">
                <h3 
                  onClick={() => handleViewClick(item.id)}
                  className="text-[20px] font-extrabold font-display text-primary dark:text-white leading-tight hover:underline cursor-pointer transition-colors truncate"
                >
                  {item.title}
                </h3>
                <div className="relative shrink-0">
                  <button
                    onClick={() => setActiveDropdownId(activeDropdownId === item.id ? null : item.id)}
                    className="p-1.5 rounded-lg text-[#A9A9A9] hover:text-primary dark:hover:text-white hover:bg-[#F5F5F5] dark:hover:bg-[#252525] transition-colors cursor-pointer"
                    aria-label="More options"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>
 
                  {/* Dropdown Options Popup */}
                  {activeDropdownId === item.id && (
                    <>
                      <div 
                        onClick={() => setActiveDropdownId(null)}
                        className="fixed inset-0 z-40 bg-transparent"
                      />
                      <div className="absolute right-0 mt-1.5 w-44 bg-white dark:bg-[#1A1A1A] rounded-xl border border-[#F0F0F0] dark:border-[#2D2D2D] shadow-lg p-1.5 z-50 flex flex-col gap-0.5 select-none animate-fade-in">
                        <button
                          onClick={() => handleViewClick(item.id)}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-primary dark:text-white hover:bg-[#F5F5F5] dark:hover:bg-[#252525] transition-all text-[13px] font-semibold text-left select-none cursor-pointer"
                        >
                          <Eye className="w-4 h-4 text-[#A9A9A9]" />
                          <span>View Assignment</span>
                        </button>
                        <button
                          onClick={() => handleDeleteClick(item.id)}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-danger hover:bg-red-50/50 transition-all text-[13px] font-semibold text-left select-none cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Card Footer: dates + action links */}
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#F5F5F5] dark:border-[#2D2D2D]">
                <div className="flex flex-col gap-0.5 text-[14px] font-normal font-display text-black dark:text-[#EFEFEF]">
                  <span><strong>Assigned on</strong> : {item.assignedDate}</span>
                  <span><strong>Due</strong> : {item.dueDate}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Floating "Create Assignment" dark CTA button — centered at bottom like Figma */}
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
