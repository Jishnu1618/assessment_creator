'use client';

import React, { useState, useEffect } from 'react';
import './globals.css';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { useStore } from '@/store/useStore';
import { useAuthStore } from '@/store/useAuthStore';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { fetchAssignments, fetchGroups, fetchLibraryItems } = useStore();
  const { theme } = useAuthStore();

  useEffect(() => {
    fetchAssignments();
    fetchGroups();
    fetchLibraryItems();
  }, [fetchAssignments, fetchGroups, fetchLibraryItems]);

  useEffect(() => {
    // Re-apply stored theme on component mount/theme changes
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (theme === 'light') {
      document.documentElement.classList.remove('dark');
    } else {
      // System
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, [theme]);

  return (
    <html lang="en" className="h-full antialiased print:h-auto print:overflow-visible">
      <body className="text-primary dark:text-[#EFEFEF] min-h-screen flex overflow-hidden font-sans print:h-auto print:overflow-visible print:block bg-[#F5F5F5] dark:bg-[#121212] transition-colors duration-200">
        
        {/* Desktop Sidebar (Left Panel) - Fixed width 304px - White bg - Hidden during printing! */}
        <aside className="hidden lg:block w-[304px] shrink-0 h-screen bg-white dark:bg-[#1A1A1A] border-r border-[#E8E8E8] dark:border-[#2D2D2D] z-30 print:hidden transition-colors duration-200" style={{ boxShadow: '2px 0 8px rgba(0,0,0,0.06)' }}>
          <Sidebar />
        </aside>

        {/* Mobile Slide-in Drawer Sidebar Overlay - Hidden during printing! */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex print:hidden">
            {/* Backdrop */}
            <div 
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity duration-300"
            />
            {/* Sliding Panel */}
            <div className="relative w-[304px] max-w-[85vw] h-full flex flex-col z-50 animate-slide-in">
              <div className="h-full bg-white dark:bg-[#1A1A1A] shadow-2xl transition-colors duration-200">
                <Sidebar isMobile={true} onClose={() => setIsMobileMenuOpen(false)} />
              </div>
            </div>
          </div>
        )}

        {/* Main Application Container (Right Panel) */}
        <div className="flex-grow flex flex-col min-w-0 h-screen overflow-hidden print:h-auto print:overflow-visible print:block">
          {/* Header Dashboard Bar - White background - Fixed 56px height - Hidden during printing! */}
          <div className="h-[56px] shrink-0 bg-white dark:bg-[#1A1A1A] border-b border-[#E8E8E8] dark:border-[#2D2D2D] print:hidden transition-colors duration-200">
            <Header onMenuOpen={() => setIsMobileMenuOpen(true)} />
          </div>

          {/* Dynamic Scrollable Page Content Views - Gray background like Figma */}
          <main className="flex-1 min-w-0 min-h-0 overflow-y-auto px-5 lg:px-8 py-6 bg-[#F8F9FA] dark:bg-[#0B0F19] print:p-0 print:overflow-visible print:block print:h-auto print:bg-white transition-colors duration-200 relative">
            {/* Background Glow Blobs for Glassmorphism */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none select-none print:hidden z-0 opacity-40 dark:opacity-20">
              <div className="absolute top-[10%] left-[20%] w-[350px] h-[350px] rounded-full bg-blue-300 dark:bg-blue-900/40 blur-[120px]" />
              <div className="absolute bottom-[20%] right-[10%] w-[450px] h-[450px] rounded-full bg-emerald-200 dark:bg-emerald-900/30 blur-[140px]" />
              <div className="absolute top-[40%] right-[30%] w-[300px] h-[300px] rounded-full bg-purple-200 dark:bg-purple-900/30 blur-[130px]" />
            </div>
            
            <div className="relative z-10">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
