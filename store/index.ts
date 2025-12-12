// ============================================
// ZUSTAND STORE - GLOBAL STATE
// ============================================

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ThemeStore {
  isDarkMode: boolean;
  toggleTheme: () => void;
  setTheme: (isDark: boolean) => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      isDarkMode: false,
      toggleTheme: () => set((state) => {
        const newValue = !state.isDarkMode;
        if (typeof document !== 'undefined') {
          document.documentElement.classList.toggle('dark', newValue);
        }
        return { isDarkMode: newValue };
      }),
      setTheme: (isDark) => set(() => {
        if (typeof document !== 'undefined') {
          document.documentElement.classList.toggle('dark', isDark);
        }
        return { isDarkMode: isDark };
      }),
    }),
    {
      name: 'theme-storage',
    }
  )
);

interface SidebarStore {
  isCollapsed: boolean;
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
}

export const useSidebarStore = create<SidebarStore>()(
  persist(
    (set) => ({
      isCollapsed: false,
      toggleSidebar: () => set((state) => ({ isCollapsed: !state.isCollapsed })),
      setSidebarCollapsed: (collapsed) => set({ isCollapsed: collapsed }),
    }),
    {
      name: 'sidebar-storage',
    }
  )
);

interface FilterStore {
  dateRange: { start: string; end: string };
  selectedCategories: string[];
  selectedAccounts: string[];
  setDateRange: (range: { start: string; end: string }) => void;
  setSelectedCategories: (categories: string[]) => void;
  setSelectedAccounts: (accounts: string[]) => void;
  resetFilters: () => void;
}

export const useFilterStore = create<FilterStore>()((set) => ({
  dateRange: { start: '', end: '' },
  selectedCategories: [],
  selectedAccounts: [],
  setDateRange: (range) => set({ dateRange: range }),
  setSelectedCategories: (categories) => set({ selectedCategories: categories }),
  setSelectedAccounts: (accounts) => set({ selectedAccounts: accounts }),
  resetFilters: () => set({
    dateRange: { start: '', end: '' },
    selectedCategories: [],
    selectedAccounts: [],
  }),
}));
