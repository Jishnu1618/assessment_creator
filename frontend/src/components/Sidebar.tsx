'use client';

import React, { useState } from 'react';
import { useStore } from '@/store/useStore';
import { useAuthStore } from '@/store/useAuthStore';
import { 
  Home, 
  Users, 
  FileText, 
  Sparkles, 
  Library, 
  Settings, 
  X,
  ChevronRight,
  Building2,
  LogOut,
  Check,
  LayoutGrid,
  Book,
  PieChart
} from 'lucide-react';
import { useRouter } from 'next/navigation';

const MyGroupsIcon = (props: any) => (
  <svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path fillRule="evenodd" clipRule="evenodd" d="M18.0053 0C19.1069 0 20 0.867353 20 1.93727V12.0627C20 12.8063 19.5687 13.452 18.9357 13.7767C18.7114 13.0842 18.552 12.599 18.4574 12.321C18.403 12.1608 18.3777 12.011 18.2979 11.8819C18.2236 11.7617 18.1006 11.6182 17.9791 11.4747L17.9521 11.4428C17.5516 10.968 17.0414 10.3553 16.609 9.82839C16.1946 9.32331 15.8524 8.89639 15.7181 8.78227C15.3989 8.51105 14.9468 8.21401 14.2686 8.21401H9.66755C9.62487 8.2067 9.53035 8.1911 9.41489 8.14943C8.91888 7.97045 7.88479 7.51948 7.36702 7.30995C6.21465 6.13586 5.35029 5.25332 4.77394 4.66235C4.72638 4.61361 4.61117 4.49397 4.42827 4.30347C4.20391 4.06978 3.83109 4.04594 3.57713 4.24907C3.32508 4.45067 3.28322 4.81013 3.48253 5.06133C5.29064 7.33994 6.21755 8.50276 6.2633 8.5498C6.37468 8.66433 6.70673 8.87699 7.11436 9.1439C7.53415 9.41875 8.03354 9.75 8.41755 10.0092C8.77511 10.2505 8.97606 10.3192 9.01596 10.655C9.10394 11.3955 9.21032 12.5105 9.33511 14H1.99468C0.893058 14 0 13.1326 0 12.0627V1.93727C0 0.867353 0.893058 0 1.99468 0H18.0053ZM15.7979 11.7915C15.9066 11.7819 16.0276 11.915 16.0771 11.9594C16.2486 12.1131 16.3003 12.1721 16.4096 12.2694C16.5691 12.4114 16.7331 12.5764 16.7553 12.6051C16.9727 12.99 17.2919 13.7639 17.4073 14L15.4654 14C15.5489 13.0617 15.6021 12.459 15.625 12.1919C15.6516 11.8819 15.6891 11.8011 15.7979 11.7915ZM12.4734 3.06088C11.1955 3.06088 10.1596 4.06699 10.1596 5.30811C10.1596 6.54922 11.1955 7.55534 12.4734 7.55534C13.7513 7.55534 14.7872 6.54922 14.7872 5.30811C14.7872 4.06699 13.7513 3.06088 12.4734 3.06088Z" fill="currentColor" fillOpacity="0.8"/>
  </svg>
);

const SparklesIcon = (props: any) => (
  <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path fillRule="evenodd" clipRule="evenodd" d="M4.63783 8.63783L6.18377 4H7.13246L8.6784 8.63783L13.3162 10.1838V11.1325L8.6784 12.6784L7.13246 17.3162H6.18377L4.63783 12.6784L0 11.1325V10.1838L4.63783 8.63783Z" fill="currentColor"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M13.3878 2.38783L14.1838 0H15.1325L15.9284 2.38783L18.3162 3.18377V4.13246L15.9284 4.9284L15.1325 7.31623H14.1838L13.3878 4.9284L11 4.13246V3.18377L13.3878 2.38783Z" fill="currentColor"/>
  </svg>
);

// School Selector Modal
function SchoolModal({ onClose }: { onClose: () => void }) {
  const { currentSchool, availableSchools, switchSchool, signOutFromSchool } = useAuthStore();

  const handleSwitch = (schoolId: string) => {
    switchSchool(schoolId);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      
      {/* Modal panel */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-4 p-5 animate-scale-up z-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[16px] font-bold font-display text-primary">Select School</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-[#F0F0F0] transition-colors cursor-pointer">
            <X className="w-4 h-4 text-muted" />
          </button>
        </div>

        <div className="space-y-2 mb-4">
          {availableSchools.map((school) => (
            <button
              key={school.id}
              onClick={() => handleSwitch(school.id)}
              className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer text-left ${
                currentSchool?.id === school.id
                  ? 'border-orange-300 bg-orange-50'
                  : 'border-[#F0F0F0] hover:border-[#E0E0E0] hover:bg-[#F8F8F8]'
              }`}
            >
              <div className="w-10 h-10 rounded-xl overflow-hidden bg-[#F5F5F5] shrink-0 flex items-center justify-center">
                <img src={school.logo} alt={school.name} className="w-full h-full object-contain" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[14px] font-bold font-display text-primary truncate">{school.name}</p>
                <p className="text-[12px] font-normal font-display text-muted truncate">{school.city}</p>
              </div>
              {currentSchool?.id === school.id && (
                <Check className="w-4 h-4 text-orange-500 shrink-0" />
              )}
            </button>
          ))}
        </div>

        <div className="border-t border-[#F0F0F0] pt-3">
          <button
            onClick={() => {
              signOutFromSchool();
              onClose();
            }}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-danger hover:bg-red-50 transition-all cursor-pointer text-[14px] font-semibold font-display"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign out from school</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Sidebar({ isMobile = false, onClose = () => {} }: { isMobile?: boolean; onClose?: () => void }) {
  const { activeTab, setActiveTab, assignments, groups, libraryItems, resetForm } = useStore();
  const { currentSchool, theme } = useAuthStore();
  const router = useRouter();
  const [showSchoolModal, setShowSchoolModal] = useState(false);

  const navItems = [
    { id: 'Home', label: 'Home', icon: LayoutGrid },
    { id: 'My Groups', label: 'My Groups', icon: MyGroupsIcon },
    { id: 'Assignments', label: 'Assignments', icon: FileText },
    { id: 'AI Teacher\'s Toolkit', label: 'AI Teacher\'s Toolkit', icon: Book },
    { id: 'My Library', label: 'My Library', icon: PieChart },
  ];

  const handleCreateClick = () => {
    resetForm();
    router.push('/create');
    if (isMobile) onClose();
  };

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    if (tabId === 'Assignments' || tabId === 'Home') {
      router.push('/');
    } else if (tabId === 'Settings') {
      router.push('/settings');
    } else if (tabId === 'My Groups') {
      router.push('/groups');
    } else if (tabId === 'AI Teacher\'s Toolkit') {
      router.push('/toolkit');
    } else if (tabId === 'My Library') {
      router.push('/library');
    }
    if (isMobile) onClose();
  };

  return (
    <>
      {showSchoolModal && <SchoolModal onClose={() => setShowSchoolModal(false)} />}

      <div className="flex flex-col h-full bg-transparent px-5 py-7 select-none relative w-full transition-colors duration-200">
        {/* Mobile close button */}
        {isMobile && (
          <button 
            onClick={onClose} 
            className="absolute top-6 right-6 p-2 rounded-full hover:bg-[#F0F0F0] dark:hover:bg-[#252525] transition-colors cursor-pointer"
            aria-label="Close menu"
          >
            <X className="w-5 h-5 text-muted dark:text-[#A0A0A0]" />
          </button>
        )}

        <div 
          onClick={() => handleTabClick('Home')}
          className="flex items-center gap-2 mb-7 cursor-pointer hover:opacity-90 transition-opacity select-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-500 to-orange-600 flex items-center justify-center shadow-md shadow-orange-500/20 text-white shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <span className="text-[20px] font-extrabold font-display tracking-tight text-primary dark:text-white leading-none">
            Edu<span className="text-orange-500">Ai</span>
          </span>
        </div>

        {/* ── Create Assignment Button ──────────────────────────── */}
        {/*
          Figma specs:
          - Fill: #272727 (dark charcoal)
          - Border: 4px linear gradient #FF7950 → #C0350A (outer alignment)  
          - Width: 251px, Height: 42px, Radius: 21px (pill)
          - Drop shadow 1: y=32, blur=48, #FFFFFF 20%
          - Drop shadow 2: y=16, blur=48, #FFFFFF 12%
          - Icon: ✦ four-point star (sparkle)
          - Text: "Create Assignment" white, medium weight
        */}
        <button
          id="create-assignment-btn"
          onClick={handleCreateClick}
          className="w-full text-white font-medium font-display py-0 flex items-center justify-center gap-2.5 transition-all duration-200 active:scale-[0.98] mb-7 cursor-pointer whitespace-nowrap relative"
          style={{
            background: 'linear-gradient(#272727, #272727) padding-box, linear-gradient(180deg, #FF7950 0%, #C0350A 100%) border-box',
            borderRadius: '21px',
            height: '42px',
            maxWidth: '251px',
            border: '4px solid transparent',
            boxShadow: '0 32px 48px 0 rgba(255, 255, 255, 0.20), 0 16px 48px 0 rgba(255, 255, 255, 0.12)',
            outline: 'none',
          }}
        >
          <SparklesIcon className="shrink-0 text-white" />
          <span className="text-[16px] font-semibold relative z-10">Create Assignment</span>
        </button>

        {/* ── Navigation list ──────────────────────────────────── */}
        <nav className="flex-grow space-y-2 overflow-y-auto w-[254px]">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            const isHome = item.id === 'Home';

            // Determine if this nav item should show a dynamic count badge
            let countBadge = null;
            if (item.id === 'My Groups') {
              countBadge = groups.length;
            } else if (item.id === 'Assignments') {
              countBadge = assignments.length;
            } else if (item.id === 'My Library') {
              countBadge = libraryItems.length;
            }

            return (
              <button
                key={item.id}
                id={`nav-${item.id.toLowerCase().replace(/\s+/g, '-').replace(/'/g, '')}`}
                onClick={() => handleTabClick(item.id)}
                className={`w-[254px] ${isHome ? 'h-[40px]' : 'h-[38px]'} flex items-center justify-between px-3 transition-all duration-150 group cursor-pointer ${
                  isActive
                    ? 'bg-white/40 dark:bg-white/10 text-slate-900 dark:text-white font-semibold border border-white/40 dark:border-white/5 shadow-xs'
                    : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/20 dark:hover:bg-zinc-800/20 font-normal border border-transparent'
                }`}
                style={{
                  borderRadius: '8px',
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                  fontSize: '16px',
                  lineHeight: '140%',
                  letterSpacing: '-0.04em'
                }}
              >
                <div className="flex items-center gap-[8px]">
                  <Icon className={`w-[20px] h-[20px] shrink-0 transition-transform duration-200 group-hover:scale-105 ${
                    isActive ? 'text-[#303030] dark:text-white' : 'text-[rgba(94,94,94,0.8)] dark:text-[#A0A0A0]'
                  }`} />
                  <span>{item.label}</span>
                </div>

                {countBadge !== null && (
                  <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold border transition-all duration-150 ${
                    isActive 
                      ? 'bg-[#D5D5D5] dark:bg-[#3D3D3D] text-[#303030] dark:text-white border-transparent' 
                      : 'bg-[#F5F5F5] dark:bg-[#252525] text-[rgba(94,94,94,0.8)] dark:text-[#888888] border-[#E8E8E8] dark:border-[#2F2F2F] group-hover:border-[#C0C0C0] dark:group-hover:border-[#404040]'
                  }`}>
                    {countBadge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* ── Footer section ───────────────────────────────────── */}
        <div className="mt-auto pt-5 border-t border-white/20 dark:border-zinc-850/30 space-y-1 w-full">
          {/* Settings button */}
          <button
            id="nav-settings"
            onClick={() => handleTabClick('Settings')}
            className={`w-full flex items-center gap-3 px-3 py-[11px] rounded-lg transition-all duration-150 group cursor-pointer ${
              activeTab === 'Settings'
                ? 'bg-white/40 dark:bg-white/10 text-slate-900 dark:text-white font-semibold border border-white/40 dark:border-white/5 shadow-xs'
                : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/20 dark:hover:bg-zinc-800/20 font-normal border border-transparent'
            }`}
          >
            <Settings className={`w-[18px] h-[18px] shrink-0 ${activeTab === 'Settings' ? 'text-primary dark:text-white' : 'text-[#A9A9A9] dark:text-[#888888]'}`} />
            <span className="text-[15px] font-display">Settings</span>
          </button>

          {/* Delhi Public School Card - CLICKABLE: opens school selector */}
          <button
            id="school-selector-btn"
            onClick={() => setShowSchoolModal(true)}
            className="w-full flex items-center gap-3 p-3 mt-2 bg-white/30 dark:bg-zinc-900/30 backdrop-blur-md rounded-xl border border-white/50 dark:border-zinc-800/40 shadow-sm hover:border-white/70 dark:hover:border-zinc-700/50 hover:bg-white/40 dark:hover:bg-zinc-900/50 hover:shadow transition-all duration-200 cursor-pointer group text-left"
            aria-label="Select school"
          >
            {/* Ape avatar in circular frame - 59×56 matching Figma */}
            <div className="w-12 h-11 rounded-xl overflow-hidden bg-[#FFF0E8] dark:bg-[#2D1F1A] shrink-0 flex items-center justify-center border border-[#F0E0D0] dark:border-[#4D3A30]">
              <img 
                src="/Avatar.png" 
                alt="School Avatar" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col min-w-0 flex-1">
              <span className="text-[14px] font-bold font-display text-primary dark:text-white leading-tight truncate">
                {currentSchool?.name ?? 'No School Selected'}
              </span>
              <span className="text-[12px] font-normal font-display text-muted dark:text-[#A0A0A0] leading-none mt-0.5 truncate">
                {currentSchool?.city ?? 'Tap to select'}
              </span>
            </div>
            <ChevronRight className="w-4 h-4 text-[#A9A9A9] dark:text-[#888888] shrink-0 group-hover:translate-x-0.5 transition-transform duration-150" />
          </button>
        </div>
      </div>
    </>
  );
}
