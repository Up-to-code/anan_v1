import React from 'react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  children: React.ReactNode;
  className?: string;
  width?: 'sm' | 'md' | 'lg';
}

export function Sidebar({ 
  children, 
  className,
  width = 'md'
}: SidebarProps) {
  const widthClasses = {
    sm: 'w-64',
    md: 'w-72',
    lg: 'w-80'
  };

  return (
    <aside className={cn(
      'h-full bg-slate-900 text-slate-200 transition-all duration-300 ease-in-out overflow-hidden border-r border-slate-700',
      widthClasses[width],
      className
    )}>
      {children}
    </aside>
  );
}

interface SidebarContentProps {
  children: React.ReactNode;
  className?: string;
}

export function SidebarContent({ children, className }: SidebarContentProps) {
  return (
    <div className={cn('overflow-y-auto h-full', className)}>
      {children}
    </div>
  );
}

interface SidebarHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function SidebarHeader({ children, className }: SidebarHeaderProps) {
  return (
    <div className={cn('border-b border-slate-700', className)}>
      {children}
    </div>
  );
}