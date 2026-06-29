'use client';

import React, { useState } from 'react';
import { useStore } from '@/store/useStore';
import { useAuthStore } from '@/store/useAuthStore';
import { 
  Bell, 
  ChevronDown, 
  ArrowLeft, 
  LayoutGrid, 
  Menu,
  Sparkles,
  LogOut,
  User,
  Shield,
  Check,
  X,
  Eye,
  EyeOff
} from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';

// ─── Login Modal ──────────────────────────────────────────────────────────────
function LoginModal({ onClose }: { onClose: () => void }) {
  const { login } = useAuthStore();
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john.doe@dps.edu.in');
  const [role, setRole] = useState('Senior Teacher');
  const [showPwd, setShowPwd] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setError('Please fill in all required fields.');
      return;
    }
    login({
      id: Math.random().toString(36).substr(2, 9),
      name: name.trim(),
      email: email.trim(),
      role: role.trim() || 'Teacher',
      avatar: '/avatar-monkey-large.jpg',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-4 p-6 animate-scale-up z-10">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-orange-200">
              <img src="/avatar-monkey-large.jpg" alt="Avatar" className="w-full h-full object-cover" />
            </div>
            <div>
              <h2 className="text-[16px] font-bold font-display text-primary">Sign In</h2>
              <p className="text-[12px] text-muted font-display">Welcome to EduAi</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-[#F0F0F0] transition-colors cursor-pointer">
            <X className="w-4 h-4 text-muted" />
          </button>
        </div>

        <form onSubmit={handleLogin} className="space-y-3">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-[13px] font-display px-3 py-2 rounded-lg">
              {error}
            </div>
          )}

          <div>
            <label className="text-[12px] font-semibold text-muted font-display uppercase tracking-wide">Full Name *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. John Doe"
              className="mt-1 w-full px-3 py-2.5 rounded-xl border border-[#E5E5E5] text-[14px] font-display text-primary outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all"
              required
            />
          </div>

          <div>
            <label className="text-[12px] font-semibold text-muted font-display uppercase tracking-wide">Email *</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@school.edu.in"
              className="mt-1 w-full px-3 py-2.5 rounded-xl border border-[#E5E5E5] text-[14px] font-display text-primary outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all"
              required
            />
          </div>

          <div>
            <label className="text-[12px] font-semibold text-muted font-display uppercase tracking-wide">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="mt-1 w-full px-3 py-2.5 rounded-xl border border-[#E5E5E5] text-[14px] font-display text-primary outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all bg-white cursor-pointer"
            >
              <option>Senior Teacher</option>
              <option>Head of Department</option>
              <option>Principal</option>
              <option>Teacher</option>
              <option>Assistant Teacher</option>
            </select>
          </div>

          <div>
            <label className="text-[12px] font-semibold text-muted font-display uppercase tracking-wide">Password</label>
            <div className="relative mt-1">
              <input
                type={showPwd ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3 py-2.5 pr-10 rounded-xl border border-[#E5E5E5] text-[14px] font-display text-primary outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPwd(!showPwd)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-primary transition-colors cursor-pointer"
              >
                {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl text-white font-semibold font-display text-[14px] transition-all duration-200 active:scale-[0.98] cursor-pointer mt-2"
            style={{ background: 'linear-gradient(180deg, #FF7950 0%, #C0350A 100%)' }}
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

// ─── Notifications Dropdown ───────────────────────────────────────────────────
function NotificationsDropdown({ onClose }: { onClose: () => void }) {
  const { notifications, markAllRead } = useAuthStore();

  return (
    <>
      <div className="fixed inset-0 z-40 bg-transparent" onClick={onClose} />
      <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl border border-[#F0F0F0] shadow-xl p-3 z-50 animate-fade-in">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-[14px] font-bold font-display text-primary">Notifications</h3>
          <button
            onClick={markAllRead}
            className="text-[12px] font-semibold font-display text-orange-500 hover:text-orange-600 transition-colors cursor-pointer"
          >
            Mark all read
          </button>
        </div>
        <div className="space-y-1">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              className={`p-3 rounded-xl transition-colors ${notif.read ? 'bg-white' : 'bg-orange-50/60'}`}
            >
              <div className="flex items-start gap-2.5">
                {!notif.read && <span className="w-2 h-2 rounded-full bg-orange-500 mt-1.5 shrink-0" />}
                {notif.read && <span className="w-2 h-2 mt-1.5 shrink-0" />}
                <div>
                  <p className="text-[13px] font-semibold font-display text-primary">{notif.title}</p>
                  <p className="text-[12px] font-normal font-display text-muted mt-0.5 leading-relaxed">{notif.message}</p>
                  <p className="text-[11px] text-[#A9A9A9] font-display mt-1">{notif.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

// ─── Profile Dropdown ─────────────────────────────────────────────────────────
function ProfileDropdown({ onClose, onShowLogin }: { onClose: () => void; onShowLogin: () => void }) {
  const { user, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    onClose();
  };

  const handleMyProfile = () => {
    router.push('/settings?tab=profile');
    onClose();
  };

  const handleRolesScope = () => {
    router.push('/settings?tab=roles');
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 z-40 bg-transparent" onClick={onClose} />
      <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl border border-[#F0F0F0] shadow-lg p-2 z-50 flex flex-col gap-0.5 select-none animate-fade-in">
        
        {/* User info header */}
        {user && (
          <div className="px-3 py-2.5 border-b border-[#F0F0F0] mb-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full overflow-hidden border border-[#E5E5E5] shrink-0">
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
              </div>
              <div className="min-w-0">
                <p className="text-[13px] font-bold font-display text-primary truncate">{user.name}</p>
                <p className="text-[11px] font-normal font-display text-muted truncate">{user.role}</p>
              </div>
            </div>
          </div>
        )}

        <button
          onClick={handleMyProfile}
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-primary hover:bg-[#F5F5F5] transition-all text-[14px] font-semibold font-display text-left select-none cursor-pointer"
        >
          <User className="w-4 h-4 text-[#A9A9A9]" />
          <span>My Profile</span>
        </button>
        <button
          onClick={handleRolesScope}
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-primary hover:bg-[#F5F5F5] transition-all text-[14px] font-semibold font-display text-left select-none cursor-pointer"
        >
          <Shield className="w-4 h-4 text-[#A9A9A9]" />
          <span>Roles &amp; Scope</span>
        </button>
        <div className="h-[1px] bg-[#F0F0F0] my-1" />
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-danger hover:bg-red-50/50 transition-all text-[14px] font-semibold font-display text-left select-none cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </div>
    </>
  );
}

// ─── Header ───────────────────────────────────────────────────────────────────
export default function Header({ onMenuOpen = () => {} }: { onMenuOpen?: () => void }) {
  const { activeTab } = useStore();
  const { user, isLoggedIn, notificationCount } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const getHeaderInfo = () => {
    if (pathname === '/create') {
      return { title: 'Assignment', subtitle: 'Create New', showBack: true, backRoute: '/' };
    }
    if (pathname === '/output') {
      return { title: 'Create New', subtitle: 'AI Generation', showBack: true, backRoute: '/' };
    }
    if (pathname === '/settings') {
      return { title: 'Settings', subtitle: '', showBack: true, backRoute: '/' };
    }
    if (pathname === '/groups') {
      return { title: 'My Groups', subtitle: '', showBack: true, backRoute: '/' };
    }
    if (pathname === '/toolkit') {
      return { title: 'AI Teacher\'s Toolkit', subtitle: '', showBack: true, backRoute: '/' };
    }
    if (pathname === '/library') {
      return { title: 'My Library', subtitle: '', showBack: true, backRoute: '/' };
    }
    return { title: 'Assignment', subtitle: activeTab, showBack: false, backRoute: '/' };
  };

  const info = getHeaderInfo();

  const displayName = isLoggedIn && user ? user.name : 'Sign In';
  const avatarSrc = isLoggedIn && user ? user.avatar : '/avatar-monkey-large.jpg';

  return (
    <>
      {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} />}

      <header className="bg-white h-full px-6 flex items-center justify-between select-none relative z-40 w-full">
        {/* Left side breadcrumbs */}
        <div className="flex items-center gap-3">
          {/* Mobile menu trigger */}
          <button
            onClick={onMenuOpen}
            className="lg:hidden p-2 rounded-xl text-muted hover:text-primary hover:bg-[#F0F0F0] transition-colors cursor-pointer"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {info.showBack && (
            <button
              onClick={() => router.push(info.backRoute)}
              className="w-8 h-8 rounded-full border border-[#E5E5E5] flex items-center justify-center text-primary hover:bg-[#F0F0F0] transition-all active:scale-95 cursor-pointer shrink-0"
              aria-label="Go back"
            >
              <ArrowLeft className="w-4 h-4 stroke-[2]" />
            </button>
          )}

          <div className="flex items-center gap-2">
            {pathname === '/output' ? (
              <Sparkles className="w-4 h-4 text-[#A9A9A9] stroke-[2]" />
            ) : (
              <LayoutGrid className="w-4 h-4 text-[#A9A9A9] stroke-[1.8]" />
            )}
            <span className="text-[15px] font-semibold font-display text-[#A9A9A9] select-none">
              {info.title}
            </span>
          </div>
        </div>

        {/* Right side notifications & profile */}
        <div className="flex items-center gap-3">
          
          {/* Notification Bell */}
          <div className="relative">
            <button
              id="notification-bell-btn"
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowProfileMenu(false);
              }}
              className="w-9 h-9 rounded-full hover:bg-[#F0F0F0] flex items-center justify-center text-muted hover:text-primary transition-all relative active:scale-95 cursor-pointer shrink-0"
              aria-label={`Notifications${notificationCount > 0 ? ` (${notificationCount} unread)` : ''}`}
            >
              <Bell className="w-[18px] h-[18px] stroke-[1.8]" />
              {notificationCount > 0 && (
                <span className="absolute top-[8px] right-[8px] w-[7px] h-[7px] rounded-full bg-danger border border-white" />
              )}
            </button>
            {showNotifications && (
              <NotificationsDropdown onClose={() => setShowNotifications(false)} />
            )}
          </div>

          {/* Profile Dropdown Container */}
          <div className="relative">
            <button
              id="profile-menu-btn"
              onClick={() => {
                if (!isLoggedIn) {
                  setShowLoginModal(true);
                } else {
                  setShowProfileMenu(!showProfileMenu);
                  setShowNotifications(false);
                }
              }}
              className="flex items-center gap-2 pl-1.5 pr-3 py-1 rounded-full border border-[#EBEBEB] hover:bg-[#F8F8F8] transition-all cursor-pointer select-none active:scale-[0.98] h-10"
            >
              {/* Ape avatar - matches Figma profile section */}
              <div className="w-8 h-8 rounded-full overflow-hidden border border-[#E5E5E5] shrink-0">
                <img 
                  src={avatarSrc}
                  alt={`${displayName} Avatar`}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-[14px] font-semibold font-display text-primary">
                {displayName}
              </span>
              <ChevronDown className={`w-3.5 h-3.5 text-[#A9A9A9] transition-transform duration-200 ${showProfileMenu ? 'rotate-180' : ''}`} />
            </button>

            {showProfileMenu && isLoggedIn && (
              <ProfileDropdown 
                onClose={() => setShowProfileMenu(false)} 
                onShowLogin={() => {
                  setShowProfileMenu(false);
                  setShowLoginModal(true);
                }}
              />
            )}
          </div>
        </div>
      </header>
    </>
  );
}
