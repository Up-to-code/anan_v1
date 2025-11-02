"use client";
import React, { useState, createContext, useContext } from 'react';

// COMPONENT IMPORTS
import { Sidebar, SidebarHeader, SidebarContent } from './Sidebar';
import { ToastProvider } from '@/components/ui/Toast';
import { useToast } from '@/components/ui/Toast';

import {
  Bell,
  Settings,
  User,
  BarChart3,
  MessageCircle,
  Users,
  ShoppingCart,
  Package,
  CreditCard,
  HelpCircle,
  ChevronDown,
  Menu,
  X,
  Zap,
  LogOut,
  Crown,
  Sparkles,
  AirVent,
  Code
} from 'lucide-react';

import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { Tooltip } from '@/components/ui/Tooltip';
import { Dropdown, DropdownItem } from '@/components/ui/Dropdown';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

// Context for sidebar state
interface LayoutContextType {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export const useLayout = () => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error('useLayout must be used within a LayoutProvider');
  }
  return context;
};

// Types
interface UserType {
  name: string;
  email: string;
  avatar?: string;
  role?: string;
}

interface AppLayoutProps {
  children: React.ReactNode;
  user?: UserType;
  breadcrumbs?: Array<{ label: string; href?: string }>;
}

// Default values
const defaultUser: UserType = {
  name: 'Alex Johnson',
  email: 'alex@example.com',
  avatar: 'AJ',
  role: 'Admin'
};

const defaultBreadcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'Dashboard', href: '/dashboard' }
];

// Navigation data (remove badge usage)
const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: BarChart3, current: true },
  { name: 'Agents', href: '/dashboard/agents', icon: AirVent, current: false },
  { name: 'integrations', href: '/dashboard/integrations', icon: Code, current: false },
  { name: 'Products', href: '/products', icon: Package, current: false },
  { name: 'Contacts', href: '/dashboard/contacts', icon: User, current: false },
  { name: 'Billing', href: '/dashboard/billing', icon: CreditCard, current: false },
];

export function AppLayout({
  children,
  user = defaultUser,
  breadcrumbs = defaultBreadcrumbs
}: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => setSidebarOpen((open) => !open);

  return (
    <ToastProvider>
      <LayoutContext.Provider value={{ sidebarOpen, toggleSidebar }}>
        <div className="flex h-screen bg-slate-50">
          {/* Sidebar */}
          <SidebarComponent
            sidebarOpen={sidebarOpen}
            onToggleSidebar={toggleSidebar}
            user={user}
          />

          {/* Main Content */}
          <div className="flex-1 flex flex-col min-w-0">
            <HeaderComponent
              user={user}
              breadcrumbs={breadcrumbs}
              onToggleSidebar={toggleSidebar}
            />

            <main className="flex-1 overflow-auto">
              <div className="p-6">{children}</div>
            </main>
          </div>
        </div>
      </LayoutContext.Provider>
    </ToastProvider>
  );
}

// Sidebar Component
interface SidebarProps {
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
  user: UserType;
}

function SidebarComponent({ sidebarOpen, onToggleSidebar, user }: SidebarProps) {
  const { addToast } = useToast();

  const handleUpgrade = () => {
    addToast({
      title: 'Upgrade to Pro',
      description: 'Redirecting to upgrade page...',
      variant: 'info'
    });
  };

  if (!sidebarOpen) return null;

  return (
    <Sidebar width="md">
      <SidebarHeader className="border-slate-700">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center shadow-lg">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-white">ChatConnect</h1>
              <p className="text-slate-400 text-sm">Workspace</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleSidebar}
            className="md:hidden text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-4 flex flex-col h-full">
        {/* Navigation - Clean & Modern */}
        <nav className="space-y-2 flex-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.name}
                href={item.href}
                className={`flex items-center justify-between px-3 py-3 rounded-xl transition-all duration-200 group ${
                  item.current
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className={`w-5 h-5 ${item.current ? 'text-white' : 'text-slate-400 group-hover:text-white'}`} />
                  <span className="font-medium">{item.name}</span>
                </div>
                {/* Remove badge rendering as navigation items do not use badge property */}
              </a>
            );
          })}
        </nav>

        {/* Upgrade Card - Clean & Modern */}
        <div className="mb-6">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-5 shadow-lg">
            <div className="text-center">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Crown className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-white font-semibold text-base mb-2">Upgrade to Pro</h3>
              <p className="text-white/90 text-sm mb-4">
                Unlock premium features
              </p>
              <Button
                onClick={handleUpgrade}
                className="w-full bg-white text-blue-600 hover:bg-slate-100 font-semibold rounded-lg"
                size="sm"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Upgrade Now
              </Button>
            </div>
          </div>
        </div>

        {/* Support Section - Simplified */}
        <div className="mb-4">
          <nav className="space-y-2">
            <a
              href="#"
              className="flex items-center px-3 py-3 text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-xl transition-colors group"
            >
              <HelpCircle className="w-5 h-5 mr-3 group-hover:text-white" />
              <span className="font-medium">Help & Support</span>
            </a>
            <a
              href="#"
              className="flex items-center px-3 py-3 text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-xl transition-colors group"
            >
              <Settings className="w-5 h-5 mr-3 group-hover:text-white" />
              <span className="font-medium">Settings</span>
            </a>
          </nav>
        </div>

        {/* User Section - Clean & Modern */}
        <div className="pt-4 border-t border-slate-700/50">
          <div className="flex items-center space-x-3 p-3 bg-slate-800/50 rounded-xl hover:bg-slate-800/70 transition-colors">
            <Avatar
              fallback={user.avatar || user.name.charAt(0)}
              size="sm"
              className="ring-2 ring-blue-500"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{user.name}</p>
              <p className="text-xs text-slate-400 truncate">{user.role}</p>
            </div>
            <Tooltip content="Settings">
              <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                <Settings className="w-4 h-4" />
              </Button>
            </Tooltip>
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}

// Header Component
interface HeaderProps {
  user: UserType;
  breadcrumbs: Array<{ label: string; href?: string }>;
  onToggleSidebar: () => void;
}

function HeaderComponent({ user, breadcrumbs, onToggleSidebar }: HeaderProps) {
  const { addToast } = useToast();

  return (
    <header className="bg-white border-b border-slate-200">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleSidebar}
              className="md:hidden"
            >
              <Menu className="w-5 h-5" />
            </Button>

            {/* Breadcrumb */}
            <Breadcrumb items={breadcrumbs} />
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-3">
            {/* Notifications */}
            <Tooltip content="Notifications">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="w-5 h-5" />
                <Badge variant="error" size="sm" className="absolute -top-1 -right-1">
                  3
                </Badge>
              </Button>
            </Tooltip>

            {/* User menu */}
            <Dropdown
              trigger={
                <Button variant="ghost" className="flex items-center space-x-2">
                  <Avatar
                    fallback={user.avatar || user.name.charAt(0)}
                    size="sm"
                  />
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium text-slate-900">{user.name}</p>
                    <p className="text-xs text-slate-500">{user.role}</p>
                  </div>
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                </Button>
              }
            >
              <DropdownItem onClick={() => addToast({ title: 'Profile clicked' })}>
                <User className="w-4 h-4 mr-2" />
                Profile
              </DropdownItem>
              <DropdownItem onClick={() => addToast({ title: 'Settings clicked' })}>
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </DropdownItem>
              <div className="border-t border-slate-200 my-1"></div>
              <DropdownItem
                onClick={() => addToast({ title: 'Signed out', variant: 'success' })}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign out
              </DropdownItem>
            </Dropdown>
          </div>
        </div>
      </div>
    </header>
  );
}