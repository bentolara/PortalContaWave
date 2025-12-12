// ============================================
// HEADER COMPONENT (ORGANISM)
// ============================================

'use client';

import React from 'react';
import { Button } from '../atoms/Button';
import { useThemeStore } from '@/store';
import { Moon, Sun, User } from 'lucide-react';

export const Header: React.FC = () => {
  const { isDarkMode, toggleTheme } = useThemeStore();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background px-6">
      <div className="flex items-center space-x-4">
        <h2 className="text-lg font-semibold">Bem-vindo ao ContaWave</h2>
      </div>

      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="icon" onClick={toggleTheme}>
          {isDarkMode ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </Button>
        <Button variant="ghost" size="icon">
          <User className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
};
