import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string; // URL to avatar image
}

export interface School {
  id: string;
  name: string;
  city: string;
  logo: string;
}

export type Theme = 'light' | 'dark' | 'system';

interface AuthStore {
  // Auth state
  isLoggedIn: boolean;
  user: UserProfile | null;
  login: (user: UserProfile) => void;
  logout: () => void;
  updateProfile: (updates: Partial<UserProfile>) => void;

  // School state
  currentSchool: School | null;
  availableSchools: School[];
  switchSchool: (schoolId: string) => void;
  signOutFromSchool: () => void;

  // Theme
  theme: Theme;
  setTheme: (theme: Theme) => void;

  // Notifications
  notificationCount: number;
  notifications: Notification[];
  markAllRead: () => void;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const defaultUser: UserProfile = {
  id: '1',
  name: 'John Doe',
  email: 'john.doe@dps.edu.in',
  role: 'Senior Teacher',
  avatar: '/avatar-monkey-large.jpg',
};

const defaultSchools: School[] = [
  {
    id: 'dps-bokaro',
    name: 'Delhi Public School',
    city: 'Bokaro Steel City',
    logo: '/delhi-public-school-logo-compact.png',
  },
  {
    id: 'dps-ranchi',
    name: 'Delhi Public School',
    city: 'Ranchi',
    logo: '/delhi-public-school-logo-compact.png',
  },
  {
    id: 'dav-dhanbad',
    name: 'DAV Public School',
    city: 'Dhanbad',
    logo: '/delhi-public-school-logo-compact.png',
  },
];

const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'Assignment Generated',
    message: 'Your assignment "Quiz on Electricity" has been generated successfully.',
    time: '2 minutes ago',
    read: false,
  },
  {
    id: '2',
    title: 'New Student Submission',
    message: '5 students have submitted their assignments.',
    time: '1 hour ago',
    read: false,
  },
  {
    id: '3',
    title: 'Weekly Report Ready',
    message: 'Your weekly class performance report is ready to view.',
    time: 'Yesterday',
    read: true,
  },
];

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      // Auth state
      isLoggedIn: true, // Default logged in with John Doe
      user: defaultUser,
      login: (user) => set({ isLoggedIn: true, user }),
      logout: () => set({ isLoggedIn: false, user: null }),
      updateProfile: (updates) => {
        const current = get().user;
        if (current) {
          set({ user: { ...current, ...updates } });
        }
      },

      // School state
      currentSchool: defaultSchools[0],
      availableSchools: defaultSchools,
      switchSchool: (schoolId) => {
        const school = get().availableSchools.find((s) => s.id === schoolId);
        if (school) set({ currentSchool: school });
      },
      signOutFromSchool: () => set({ currentSchool: null }),

      // Theme
      theme: 'light',
      setTheme: (theme) => {
        set({ theme });
        // Apply theme to DOM
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
      },

      // Notifications
      notificationCount: mockNotifications.filter((n) => !n.read).length,
      notifications: mockNotifications,
      markAllRead: () =>
        set({
          notifications: get().notifications.map((n) => ({ ...n, read: true })),
          notificationCount: 0,
        }),
    }),
    {
      name: 'veda-auth-store',
      partialize: (state) => ({
        isLoggedIn: state.isLoggedIn,
        user: state.user,
        currentSchool: state.currentSchool,
        theme: state.theme,
      }),
    }
  )
);
