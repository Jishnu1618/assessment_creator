'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useAuthStore, type Theme } from '@/store/useAuthStore';
import { useSearchParams } from 'next/navigation';
import {
  Sun,
  Moon,
  Monitor,
  Bell,
  Shield,
  User,
  School,
  Palette,
  ChevronRight,
  Check,
  Save,
  Eye,
  EyeOff,
} from 'lucide-react';

type SettingsTab = 'appearance' | 'profile' | 'notifications' | 'roles' | 'school';

const TABS: { id: SettingsTab; label: string; icon: React.ElementType }[] = [
  { id: 'appearance', label: 'Appearance', icon: Palette },
  { id: 'profile', label: 'My Profile', icon: User },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'roles', label: 'Roles & Scope', icon: Shield },
  { id: 'school', label: 'School', icon: School },
];

// ─── Appearance Tab ───────────────────────────────────────────────────────────
function AppearanceTab() {
  const { theme, setTheme } = useAuthStore();

  const themes: { id: Theme; label: string; desc: string; icon: React.ElementType }[] = [
    { id: 'light', label: 'Light', desc: 'Clean white background', icon: Sun },
    { id: 'dark', label: 'Dark', desc: 'Easy on the eyes at night', icon: Moon },
    { id: 'system', label: 'System', desc: 'Follows your device setting', icon: Monitor },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-[16px] font-bold font-display text-primary dark:text-white mb-1">Theme</h3>
        <p className="text-[13px] text-muted dark:text-[#A0A0A0] font-display mb-4">Choose how EduAi looks for you.</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {themes.map((t) => {
            const Icon = t.icon;
            const isActive = theme === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setTheme(t.id)}
                className={`flex flex-col items-center gap-3 p-5 rounded-2xl border-2 transition-all cursor-pointer ${
                  isActive
                    ? 'border-orange-400 dark:border-orange-500 bg-orange-50 dark:bg-orange-950/20 shadow-sm'
                    : 'border-[#EBEBEB] dark:border-[#2D2D2D] bg-white dark:bg-[#1E1E1E] hover:border-[#D0D0D0] dark:hover:border-[#404040] hover:bg-[#F8F8F8] dark:hover:bg-[#252525]'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isActive ? 'bg-orange-100 dark:bg-orange-900/30' : 'bg-[#F0F0F0] dark:bg-[#2D2D2D]'}`}>
                  <Icon className={`w-5 h-5 ${isActive ? 'text-orange-500 dark:text-orange-400' : 'text-muted dark:text-[#888888]'}`} />
                </div>
                <div className="text-center">
                  <p className={`text-[14px] font-bold font-display ${isActive ? 'text-orange-600 dark:text-orange-400' : 'text-primary dark:text-white'}`}>{t.label}</p>
                  <p className="text-[12px] text-muted dark:text-[#A0A0A0] font-display mt-0.5">{t.desc}</p>
                </div>
                {isActive && <Check className="w-4 h-4 text-orange-500" />}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <h3 className="text-[16px] font-bold font-display text-primary dark:text-white mb-1">Font Size</h3>
        <p className="text-[13px] text-muted dark:text-[#A0A0A0] font-display mb-3">Adjust the text size for better readability.</p>
        <div className="flex items-center gap-3">
          {['Small', 'Medium', 'Large'].map((size) => (
            <button
              key={size}
              className={`px-4 py-2 rounded-xl border text-[13px] font-semibold font-display transition-all cursor-pointer ${
                size === 'Medium'
                  ? 'border-orange-400 dark:border-orange-500 bg-orange-50 dark:bg-orange-950/20 text-orange-600 dark:text-orange-400'
                  : 'border-[#EBEBEB] dark:border-[#2D2D2D] bg-white dark:bg-[#1E1E1E] text-muted dark:text-[#A0A0A0] hover:border-[#D0D0D0] dark:hover:border-[#404040]'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-[16px] font-bold font-display text-primary dark:text-white mb-1">Language</h3>
        <p className="text-[13px] text-muted dark:text-[#A0A0A0] font-display mb-3">Select your preferred interface language.</p>
        <select className="px-4 py-2.5 rounded-xl border border-[#EBEBEB] dark:border-[#2D2D2D] text-[14px] font-display text-primary dark:text-white bg-white dark:bg-[#1E1E1E] outline-none focus:border-orange-400 dark:focus:border-orange-500 cursor-pointer min-w-[180px]">
          <option>English (India)</option>
          <option>Hindi</option>
          <option>Bengali</option>
          <option>Tamil</option>
          <option>Telugu</option>
        </select>
      </div>
    </div>
  );
}

// ─── Profile Tab ──────────────────────────────────────────────────────────────
function ProfileTab() {
  const { user, updateProfile } = useAuthStore();
  const [name, setName] = useState(user?.name ?? '');
  const [email, setEmail] = useState(user?.email ?? '');
  const [role, setRole] = useState(user?.role ?? '');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    updateProfile({ name, email, role });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-lg">
      {/* Avatar section */}
      <div>
        <h3 className="text-[16px] font-bold font-display text-primary dark:text-white mb-3">Profile Picture</h3>
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-orange-200 dark:border-orange-900/30 shrink-0">
            <img src={user?.avatar ?? '/avatar-monkey-large.jpg'} alt="Your avatar" className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="text-[14px] font-semibold font-display text-primary dark:text-white">Profile Avatar</p>
            <p className="text-[12px] text-muted dark:text-[#A0A0A0] font-display mt-1">Your avatar is managed by your school administrator.</p>
          </div>
        </div>
      </div>

      {/* Name */}
      <div>
        <label className="text-[12px] font-semibold text-muted dark:text-[#A0A0A0] font-display uppercase tracking-wide">Full Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1.5 w-full px-3.5 py-3 rounded-xl border border-[#E5E5E5] dark:border-[#2D2D2D] text-[14px] font-display text-primary dark:text-white bg-white dark:bg-[#1E1E1E] outline-none focus:border-orange-400 dark:focus:border-orange-500 focus:ring-2 focus:ring-orange-100 dark:focus:ring-orange-950/20 transition-all"
        />
      </div>

      {/* Email */}
      <div>
        <label className="text-[12px] font-semibold text-muted dark:text-[#A0A0A0] font-display uppercase tracking-wide">Email Address</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1.5 w-full px-3.5 py-3 rounded-xl border border-[#E5E5E5] dark:border-[#2D2D2D] text-[14px] font-display text-primary dark:text-white bg-white dark:bg-[#1E1E1E] outline-none focus:border-orange-400 dark:focus:border-orange-500 focus:ring-2 focus:ring-orange-100 dark:focus:ring-orange-950/20 transition-all"
        />
      </div>

      {/* Role */}
      <div>
        <label className="text-[12px] font-semibold text-muted dark:text-[#A0A0A0] font-display uppercase tracking-wide">Role</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="mt-1.5 w-full px-3.5 py-3 rounded-xl border border-[#E5E5E5] dark:border-[#2D2D2D] text-[14px] font-display text-primary dark:text-white bg-white dark:bg-[#1E1E1E] outline-none focus:border-orange-400 dark:focus:border-orange-500 focus:ring-2 focus:ring-orange-100 dark:focus:ring-orange-950/20 transition-all cursor-pointer"
        >
          <option>Senior Teacher</option>
          <option>Head of Department</option>
          <option>Principal</option>
          <option>Teacher</option>
          <option>Assistant Teacher</option>
        </select>
      </div>

      <button
        onClick={handleSave}
        className={`flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold font-display text-[14px] transition-all duration-200 cursor-pointer ${
          saved ? 'bg-emerald-500 hover:bg-emerald-600' : ''
        }`}
        style={saved ? {} : { background: 'linear-gradient(180deg, #FF7950 0%, #C0350A 100%)' }}
      >
        {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
        {saved ? 'Saved!' : 'Save Changes'}
      </button>
    </div>
  );
}

// ─── Notifications Tab ────────────────────────────────────────────────────────
function NotificationsTab() {
  const [prefs, setPrefs] = useState({
    assignments: true,
    submissions: true,
    weeklyReport: false,
    emailDigest: true,
    pushNotifications: false,
  });

  const toggle = (key: keyof typeof prefs) => {
    setPrefs((p) => ({ ...p, [key]: !p[key] }));
  };

  const items: { key: keyof typeof prefs; label: string; desc: string }[] = [
    { key: 'assignments', label: 'Assignment Updates', desc: 'Notify when assignments are generated or updated.' },
    { key: 'submissions', label: 'Student Submissions', desc: 'Notify when students submit assignments.' },
    { key: 'weeklyReport', label: 'Weekly Reports', desc: 'Receive a weekly summary of class performance.' },
    { key: 'emailDigest', label: 'Email Digest', desc: 'Get a daily email summary of all activity.' },
    { key: 'pushNotifications', label: 'Push Notifications', desc: 'Enable browser push notifications.' },
  ];

  return (
    <div className="space-y-3 max-w-lg">
      <div>
        <h3 className="text-[16px] font-bold font-display text-primary dark:text-white mb-1">Notification Preferences</h3>
        <p className="text-[13px] text-muted dark:text-[#A0A0A0] font-display mb-4">Control what notifications you receive from EduAi.</p>
      </div>
      {items.map((item) => (
        <div key={item.key} className="flex items-center justify-between p-4 bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#EBEBEB] dark:border-[#2D2D2D]">
          <div className="flex-1 min-w-0 pr-4">
            <p className="text-[14px] font-semibold font-display text-primary dark:text-white">{item.label}</p>
            <p className="text-[12px] text-muted dark:text-[#A0A0A0] font-display mt-0.5">{item.desc}</p>
          </div>
          <button
            onClick={() => toggle(item.key)}
            className={`relative w-11 h-6 rounded-full transition-all duration-200 cursor-pointer shrink-0 ${
              prefs[item.key] ? 'bg-orange-500 animate-none' : 'bg-[#E0E0E0] dark:bg-[#3D3D3D]'
            }`}
            role="switch"
            aria-checked={prefs[item.key]}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 ${
                prefs[item.key] ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      ))}
    </div>
  );
}

// ─── Roles Tab ────────────────────────────────────────────────────────────────
function RolesTab() {
  const { user } = useAuthStore();
  
  const permissions = [
    { label: 'Create Assignments', granted: true },
    { label: 'Grade Submissions', granted: true },
    { label: 'View Student Data', granted: true },
    { label: 'Manage Groups', granted: true },
    { label: 'Invite Teachers', granted: false },
    { label: 'School Administration', granted: false },
    { label: 'Billing & Subscription', granted: false },
  ];

  return (
    <div className="space-y-5 max-w-lg">
      <div>
        <h3 className="text-[16px] font-bold font-display text-primary dark:text-white mb-1">Your Role</h3>
        <p className="text-[13px] text-muted dark:text-[#A0A0A0] font-display mb-3">Roles determine what you can do within EduAi.</p>
        <div className="p-4 bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-900/30 rounded-xl flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-900/40 flex items-center justify-center shrink-0">
            <Shield className="w-5 h-5 text-orange-500 dark:text-orange-400" />
          </div>
          <div>
            <p className="text-[14px] font-bold font-display text-orange-700 dark:text-orange-400">{user?.role ?? 'Teacher'}</p>
            <p className="text-[12px] text-orange-500 dark:text-orange-300/80 font-display">Assigned by school admin</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-[16px] font-bold font-display text-primary dark:text-white mb-3">Permissions</h3>
        <div className="space-y-2">
          {permissions.map((perm) => (
            <div key={perm.label} className="flex items-center justify-between p-3 bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#EBEBEB] dark:border-[#2D2D2D]">
              <span className="text-[14px] font-display text-primary dark:text-white">{perm.label}</span>
              <span className={`text-[12px] font-semibold font-display px-2.5 py-1 rounded-lg ${
                perm.granted ? 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400' : 'bg-[#F5F5F5] dark:bg-[#252525] text-muted dark:text-[#888888]'
              }`}>
                {perm.granted ? 'Granted' : 'Not granted'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── School Tab ───────────────────────────────────────────────────────────────
function SchoolTab() {
  const { currentSchool, availableSchools, switchSchool, signOutFromSchool } = useAuthStore();

  return (
    <div className="space-y-5 max-w-lg">
      <div>
        <h3 className="text-[16px] font-bold font-display text-primary dark:text-white mb-1">Current School</h3>
        <p className="text-[13px] text-muted dark:text-[#A0A0A0] font-display mb-3">Your active school workspace.</p>
        {currentSchool ? (
          <div className="p-4 bg-white dark:bg-[#1E1E1E] border border-[#EBEBEB] dark:border-[#2D2D2D] rounded-xl flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl overflow-hidden bg-[#F5F5F5] dark:bg-[#2D2D2D] border border-[#E5E5E5] dark:border-[#3D3D3D] shrink-0 flex items-center justify-center">
              <img src={currentSchool.logo} alt={currentSchool.name} className="w-full h-full object-contain" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[15px] font-bold font-display text-primary dark:text-white truncate">{currentSchool.name}</p>
              <p className="text-[13px] text-muted dark:text-[#A0A0A0] font-display">{currentSchool.city}</p>
            </div>
            <span className="text-[12px] font-semibold bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 px-2.5 py-1 rounded-lg font-display">Active</span>
          </div>
        ) : (
          <div className="p-4 bg-[#F5F5F5] dark:bg-[#202020] border border-[#EBEBEB] dark:border-[#2D2D2D] rounded-xl text-center text-muted dark:text-[#A0A0A0] font-display text-[14px]">
            No school selected
          </div>
        )}
      </div>

      <div>
        <h3 className="text-[16px] font-bold font-display text-primary dark:text-white mb-3">Available Schools</h3>
        <div className="space-y-2">
          {availableSchools.map((school) => (
            <button
              key={school.id}
              onClick={() => switchSchool(school.id)}
              className={`w-full flex items-center gap-3 p-3.5 rounded-xl border transition-all cursor-pointer text-left ${
                currentSchool?.id === school.id
                  ? 'border-orange-300 dark:border-orange-500/50 bg-orange-50 dark:bg-orange-950/20'
                  : 'border-[#EBEBEB] dark:border-[#2D2D2D] bg-white dark:bg-[#1E1E1E] hover:border-[#D0D0D0] dark:hover:border-[#404040] hover:bg-[#F8F8F8] dark:hover:bg-[#252525]'
              }`}
            >
              <div className="w-10 h-10 rounded-xl overflow-hidden bg-[#F5F5F5] dark:bg-[#2D2D2D] border border-[#E5E5E5] dark:border-[#3D3D3D] shrink-0 flex items-center justify-center">
                <img src={school.logo} alt={school.name} className="w-full h-full object-contain" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[14px] font-bold font-display text-primary dark:text-white truncate">{school.name}</p>
                <p className="text-[12px] text-muted dark:text-[#A0A0A0] font-display">{school.city}</p>
              </div>
              {currentSchool?.id === school.id && <Check className="w-4 h-4 text-orange-500 shrink-0" />}
            </button>
          ))}
        </div>
      </div>

      <div className="pt-2 border-t border-[#F0F0F0] dark:border-[#2D2D2D]">
        <button
          onClick={signOutFromSchool}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-red-200 dark:border-red-900/30 text-danger hover:bg-red-50 dark:hover:bg-red-950/10 transition-all cursor-pointer text-[14px] font-semibold font-display"
        >
          <Shield className="w-4 h-4" />
          Sign out from school
        </button>
      </div>
    </div>
  );
}

// ─── Main Settings Page Content ───────────────────────────────────────────────
function SettingsPageContent() {
  const searchParams = useSearchParams();
  const initialTab = (searchParams.get('tab') as SettingsTab) ?? 'appearance';
  const [activeTab, setActiveTab] = useState<SettingsTab>(initialTab);

  useEffect(() => {
    const tab = searchParams.get('tab') as SettingsTab;
    if (tab) setActiveTab(tab);
  }, [searchParams]);

  const renderContent = () => {
    switch (activeTab) {
      case 'appearance': return <AppearanceTab />;
      case 'profile': return <ProfileTab />;
      case 'notifications': return <NotificationsTab />;
      case 'roles': return <RolesTab />;
      case 'school': return <SchoolTab />;
      default: return <AppearanceTab />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in select-none">
      <div className="mb-6">
        <h1 className="text-[24px] font-extrabold font-display text-primary dark:text-white">Settings</h1>
        <p className="text-[14px] text-muted dark:text-[#A0A0A0] font-display mt-1">Manage your account, preferences, and school workspace.</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-6">
        {/* Sidebar tabs */}
        <nav className="sm:w-48 shrink-0">
          <div className="bg-white dark:bg-[#1A1A1A] rounded-2xl border border-[#EBEBEB] dark:border-[#2D2D2D] p-2 space-y-0.5">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  id={`settings-tab-${tab.id}`}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all cursor-pointer ${
                    isActive
                      ? 'bg-orange-50 dark:bg-orange-950/20 text-orange-600 dark:text-orange-400 font-semibold shadow-sm'
                      : 'text-muted dark:text-[#A0A0A0] hover:text-primary dark:hover:text-white hover:bg-[#F8F8F8] dark:hover:bg-[#202020] font-normal'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-orange-500 dark:text-orange-400' : 'text-[#A9A9A9] dark:text-[#888888]'}`} />
                  <span className="text-[14px] font-display">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </nav>

        {/* Content */}
        <div className="flex-1 bg-white dark:bg-[#1A1A1A] rounded-2xl border border-[#EBEBEB] dark:border-[#2D2D2D] p-6 min-h-[400px]">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default function SettingsPage() {
  return (
    <Suspense fallback={
      <div className="max-w-4xl mx-auto p-8 text-center text-muted dark:text-[#A0A0A0] font-display">
        Loading settings...
      </div>
    }>
      <SettingsPageContent />
    </Suspense>
  );
}
