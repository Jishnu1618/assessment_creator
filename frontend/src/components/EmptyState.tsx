'use client';

import React from 'react';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function EmptyState() {
  const router = useRouter();

  return (
    <div className="w-full flex-1 flex flex-col items-center justify-center text-center select-none animate-fade-in py-8 min-h-[70vh]">
      
      {/* Premium SVG Illustration matching Figma empty state exactly */}
      <div className="w-56 h-56 relative flex items-center justify-center select-none mb-4">
        <svg viewBox="0 0 240 240" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Outer light circle background */}
          <circle cx="120" cy="120" r="100" fill="#E8E8E8" fillOpacity="0.7" />
          <circle cx="120" cy="120" r="85" fill="#EFEFEF" fillOpacity="0.8" />
          
          {/* Sparkle / diamond star top-left */}
          <path d="M68 70L70 76L76 78L70 80L68 86L66 80L60 78L66 76L68 70Z" fill="#9CA3AF" opacity="0.7" />
          
          {/* Small dot right side */}
          <circle cx="190" cy="138" r="5" fill="#94A3B8" />
          
          {/* Small card / paper element top-right */}
          <rect x="152" y="62" width="48" height="30" rx="6" fill="white" stroke="#E0E0E0" strokeWidth="1.5" />
          <circle cx="163" cy="75" r="4" fill="#D1D5DB" />
          <line x1="171" y1="72" x2="192" y2="72" stroke="#E0E0E0" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="171" y1="78" x2="185" y2="78" stroke="#E8E8E8" strokeWidth="2" strokeLinecap="round" />
          
          {/* Main document */}
          <rect x="76" y="62" width="72" height="96" rx="8" fill="white" stroke="#DEDEDE" strokeWidth="2" />
          {/* Document title line dark */}
          <line x1="90" y1="82" x2="112" y2="82" stroke="#374151" strokeWidth="5.5" strokeLinecap="round" />
          {/* Document body lines */}
          <line x1="90" y1="98" x2="136" y2="98" stroke="#C8C8C8" strokeWidth="3.5" strokeLinecap="round" />
          <line x1="90" y1="111" x2="126" y2="111" stroke="#C8C8C8" strokeWidth="3.5" strokeLinecap="round" />
          <line x1="90" y1="124" x2="136" y2="124" stroke="#C8C8C8" strokeWidth="3.5" strokeLinecap="round" />
          <line x1="90" y1="137" x2="118" y2="137" stroke="#C8C8C8" strokeWidth="3.5" strokeLinecap="round" />
          
          {/* Curved swoosh/pen element */}
          <path d="M74 68 C55 58, 52 42, 72 38" stroke="#303030" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <circle cx="72" cy="38" r="3" fill="#303030" />

          {/* Magnifying glass handle */}
          <line x1="148" y1="150" x2="172" y2="176" stroke="#B0B0B0" strokeWidth="12" strokeLinecap="round" />
          <line x1="150" y1="152" x2="170" y2="172" stroke="#D8D8D8" strokeWidth="7" strokeLinecap="round" />
          
          {/* Magnifying glass lens */}
          <circle cx="128" cy="128" r="36" fill="white" fillOpacity="0.9" stroke="#BEBEBE" strokeWidth="6" />
          <circle cx="128" cy="128" r="30" stroke="white" strokeWidth="2" />
          
          {/* Red X cross inside lens */}
          <path d="M115 115L141 141" stroke="#EF4444" strokeWidth="8" strokeLinecap="round" />
          <path d="M141 115L115 141" stroke="#EF4444" strokeWidth="8" strokeLinecap="round" />
        </svg>
      </div>

      {/* Primary Heading */}
      <h3 className="text-[20px] font-bold font-display text-primary dark:text-white mt-2 tracking-tight">No assignments yet</h3>
      
      {/* Description text */}
      <p className="max-w-[400px] text-[15px] font-display text-muted dark:text-[#A0A0A0] leading-relaxed mt-2.5 px-4">
        Create your first assignment to start collecting and grading student submissions. You can set up rubrics, define marking criteria, and let AI assist with grading.
      </p>

      {/* CTA Dark pill button */}
      <button
        onClick={() => router.push('/create')}
        className="mt-7 bg-primary hover:bg-black text-white font-medium font-sans py-3.5 px-7 rounded-full flex items-center justify-center gap-2 shadow-sm transition-all duration-200 active:scale-[0.97] hover:scale-[1.01] cursor-pointer h-[46px]"
        style={{ minWidth: '240px' }}
      >
        <Plus className="w-5 h-5 text-white stroke-[2.5]" />
        <span className="text-[15px] font-medium">Create Your First Assignment</span>
      </button>

    </div>
  );
}
