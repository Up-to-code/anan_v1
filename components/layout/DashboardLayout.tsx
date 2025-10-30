/* eslint-disable @typescript-eslint/no-explicit-any */
// components/layout/DashboardLayout.tsx
'use client';

import { useState } from 'react';
import { 
  Home, 
  BarChart3, 
  Users, 
  Settings, 
  FileText, 
  Mail,
  Calendar,
  Package,
  CreditCard,
  Shield,
  HelpCircle,
  Database,
  Layers
} from 'lucide-react';
import { Sidebar, SidebarHeader, SidebarContent } from './Sidebar';
import { DashboardHeader } from './DashboardHeader';
import { useToast } from '@/components/ui/Toast';

interface DashboardLayoutProps {
  children: React.ReactNode;
  user: {
    name: string;
    email: string;
    avatar?: string;
  };
  currentPage?: string;
}

interface NavigationItem {
  name: string;
  href: string;
  icon: React.ComponentType<any>;
  current?: boolean;
  badge?: string;
  category: string;
}

// Navigation configuration
const NAVIGATION_CONFIG = {
  main: [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Analytics', href: '/analytics', icon: BarChart3 },
    { name: 'Users', href: '/users', icon: Users, badge: '3' },
  ],
  content: [
    { name: 'Products', href: '/products', icon: Package },
    { name: 'Orders', href: '/orders', icon: CreditCard, badge: '12' },
    { name: 'Inventory', href: '/inventory', icon: Database },
  ],
  resources: [
    { name: 'Documents', href: '/documents', icon: FileText },
    { name: 'Calendar', href: '/calendar', icon: Calendar },
    { name: 'Messages', href: '/messages', icon: Mail, badge: '5' },
  ],
  system: [
    { name: 'Security', href: '/security', icon: Shield },
    { name: 'Settings', href: '/settings', icon: Settings },
    { name: 'Help & Support', href: '/help', icon: HelpCircle },
  ]
};

export function DashboardLayout({ children, user, currentPage = 'dashboard' }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { addToast } = useToast();

  // Build navigation items with current page state
  const buildNavigationItems = (): NavigationItem[] => {
    const items: NavigationItem[] = [];
    
    Object.entries(NAVIGATION_CONFIG).forEach(([category, categoryItems]) => {
      categoryItems.forEach(item => {
        items.push({
          ...item,
          category,
          current: currentPage === item.href.replace('/', '')
        });
      });
    });

    return items;
  };

  const navigationItems = buildNavigationItems();

  // Event handlers
  const handleNavigation = (href: string) => {
    addToast({
      title: 'Navigation',
      description: `Navigating to ${href}`,
      variant: 'info'
    });
    setSidebarOpen(false);
  };

  const handleSearch = (query: string) => {
    if (query.trim()) {
      addToast({
        title: 'Search',
        description: `Searching for: ${query}`,
        variant: 'info'
      });
    }
  };

  const handleLogout = () => {
    addToast({
      title: 'Logout',
      description: 'You have been logged out successfully',
      variant: 'success'
    });
  };

  const headerActions = {
    onNotificationsClick: () => addToast({ title: 'Notifications', description: 'Opening notifications', variant: 'info' }),
    onProfileClick: () => addToast({ title: 'Profile', description: 'Opening profile', variant: 'info' }),
    onSettingsClick: () => addToast({ title: 'Settings', description: 'Opening settings', variant: 'info' }),
    onHelpClick: () => addToast({ title: 'Help', description: 'Opening help', variant: 'info' }),
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile Sidebar Backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 lg:hidden bg-gray-600 bg-opacity-75 transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <div 
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 transform transition-transform duration-300 ease-in-out 
          lg:translate-x-0 lg:static lg:inset-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
        role="dialog"
        aria-modal="true"
      >
        <Sidebar>
          <SidebarHeader className="p-4">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-slate-700 flex items-center justify-center text-slate-200">
                {user.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <div className="font-medium text-slate-100">{user.name}</div>
                <div className="text-xs text-slate-400">{user.email}</div>
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent className="p-3 space-y-6">
            {Object.keys(NAVIGATION_CONFIG).map((category) => (
              <div key={category}>
                <div className="px-2 text-xs uppercase tracking-wider text-slate-500 mb-2">{category}</div>
                <nav className="space-y-1">
                  {navigationItems.filter(n => n.category === category).map((item) => {
                    const Icon = item.icon;
                    const isActive = item.current;
                    return (
                      <button
                        key={item.href}
                        onClick={() => handleNavigation(item.href)}
                        className={`w-full flex items-center px-3 py-2 rounded-md text-sm transition-colors ${
                          isActive
                            ? 'bg-slate-800 text-white'
                            : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                        }`}
                      >
                        <Icon className="w-4 h-4 mr-3" />
                        <span className="flex-1 text-left">{item.name}</span>
                        {item.badge && (
                          <span className="ml-auto inline-flex items-center justify-center rounded-full bg-slate-700 px-2 py-0.5 text-xs text-slate-200">
                            {item.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </nav>
              </div>
            ))}
            <div className="pt-4 border-t border-slate-700 mt-4">
              <button
                onClick={handleLogout}
                className="w-full flex items-center px-3 py-2 rounded-md text-sm text-red-300 hover:bg-red-900/20 hover:text-red-200 transition-colors"
              >
                Logout
              </button>
            </div>
          </SidebarContent>
        </Sidebar>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader
          user={user}
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
          onSearch={handleSearch}
          onLogout={handleLogout}
          {...headerActions}
        />

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-4 lg:p-6">
            {children}
          </div>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}

// Footer Component
function Footer() {
  const currentYear = new Date().getFullYear();
  const footerLinks = [
    { label: 'Privacy', href: '/privacy' },
    { label: 'Terms', href: '/terms' },
    { label: 'Support', href: '/support' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <footer className="bg-white border-t border-gray-200 py-4 px-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm text-gray-500">
        <div className="mb-2 sm:mb-0">
          © {currentYear} Your Company. All rights reserved.
        </div>
        <div className="flex space-x-6">
          {footerLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-gray-700 transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}