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
import { Sidebar } from './Sidebar';
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
      message: `Navigating to ${href}`,
      type: 'info'
    });
    setSidebarOpen(false);
  };

  const handleSearch = (query: string) => {
    if (query.trim()) {
      addToast({
        title: 'Search',
        message: `Searching for: ${query}`,
        type: 'info'
      });
    }
  };

  const handleLogout = () => {
    addToast({
      title: 'Logout',
      message: 'You have been logged out successfully',
      type: 'success'
    });
  };

  const headerActions = {
    onNotificationsClick: () => addToast({ title: 'Notifications', message: 'Opening notifications', type: 'info' }),
    onProfileClick: () => addToast({ title: 'Profile', message: 'Opening profile', type: 'info' }),
    onSettingsClick: () => addToast({ title: 'Settings', message: 'Opening settings', type: 'info' }),
    onHelpClick: () => addToast({ title: 'Help', message: 'Opening help', type: 'info' }),
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
        <Sidebar
          items={navigationItems}
          user={user}
          onNavigate={handleNavigation}
          onLogout={handleLogout}
        />
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