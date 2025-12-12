// ============================================
// SIDEBAR COMPONENT (ORGANISM)
// ============================================

'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/utils/cn';
import { useSidebarStore } from '@/store';
import {
  LayoutDashboard,
  TrendingDown,
  TrendingUp,
  Wallet,
  FileText,
  Settings,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Button } from '../atoms/Button';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: TrendingDown, label: 'Despesas', href: '/expenses' },
  { icon: TrendingUp, label: 'Receitas', href: '/revenues' },
  { icon: Wallet, label: 'Contas', href: '/accounts' },
  { icon: FileText, label: 'Relatórios', href: '/reports' },
  { icon: Settings, label: 'Configurações', href: '/settings' },
];

export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const { isCollapsed, toggleSidebar } = useSidebarStore();

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-40 h-screen border-r bg-card transition-all duration-300',
        isCollapsed ? 'w-16' : 'w-64'
      )}
    >
      <div className="flex h-full flex-col">
        {/* Header */}
        <div className="flex h-16 items-center justify-between border-b px-4">
          {!isCollapsed && (
            <h1 className="text-xl font-bold text-primary">ContaWave</h1>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="ml-auto"
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center rounded-lg px-3 py-2 transition-colors hover:bg-accent',
                  isActive && 'bg-accent text-accent-foreground',
                  isCollapsed && 'justify-center'
                )}
              >
                <Icon className={cn('h-5 w-5', !isCollapsed && 'mr-3')} />
                {!isCollapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="border-t p-4">
          {!isCollapsed && (
            <p className="text-xs text-muted-foreground">ContaWave v1.0.0</p>
          )}
        </div>
      </div>
    </aside>
  );
};
