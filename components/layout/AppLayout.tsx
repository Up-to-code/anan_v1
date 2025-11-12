"use client";
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import {
  BarChart3, AirVent, Code, Package, CreditCard, 
  Bell, Settings, User, Menu, X, Zap, Crown, Sparkles,
  HelpCircle, LogOut, MessageCircle, Users, ShoppingCart,
  ChevronDown,
  CalendarDays
} from 'lucide-react';

interface AppLayoutProps {
  children: React.ReactNode;
}

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: BarChart3 },
  { name: 'Agents', href: '/dashboard/agents', icon: AirVent },
  { name: 'Integrations', href: '/dashboard/integrations', icon: Code },
  { name: 'Products', href: '/dashboard/products', icon: Package },
  { name: 'Contacts', href: '/dashboard/contacts', icon: Users },
  { name: 'Bookings', href: '/dashboard/bookings', icon: CalendarDays },
  { name: 'Messages', href: '/dashboard/messages', icon: MessageCircle },
  { name: 'Orders', href: '/dashboard/orders', icon: ShoppingCart },
  { name: 'Billing', href: '/dashboard/billing', icon: CreditCard },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

const user = {
  name: 'Alex Johnson',
  email: 'alex@example.com',
  role: 'Admin',
  avatar: 'AJ'
};

const notifications = [
  { id: 1, label: 'New message from John', time: '5 min ago' },
  { id: 2, label: 'Order #1234 completed', time: '1 hour ago' },
  { id: 3, label: 'System update available', time: '2 hours ago' },
];

const profileMenu = [
  { label: 'Profile', icon: User, href: '/dashboard/profile' },
  { label: 'Settings', icon: Settings, href: '/dashboard/settings' },
  { label: 'Help & Support', icon: HelpCircle, href: '/dashboard/help' },
  { label: 'Sign out', icon: LogOut, action: 'logout' },
];

export function AppLayout({ children }: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  
  const router = useRouter();
  const pathname = usePathname();
  const notificationsRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Handle screen resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setSidebarOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      
      if (notificationsOpen && notificationsRef.current && !notificationsRef.current.contains(target)) {
        setNotificationsOpen(false);
      }
      
      if (profileOpen && profileRef.current && !profileRef.current.contains(target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [notificationsOpen, profileOpen]);

  // Close dropdowns on route change
  useEffect(() => {
    setNotificationsOpen(false);
    setProfileOpen(false);
  }, [pathname]);

  const getCurrentPageTitle = useCallback(() => {
    const current = navigation.find(item => 
      pathname === item.href || pathname?.startsWith(item.href + '/')
    );
    return current?.name || 'Dashboard';
  }, [pathname]);

  const toggleNotifications = () => {
    setNotificationsOpen(!notificationsOpen);
    setProfileOpen(false);
  };

  const toggleProfile = () => {
    setProfileOpen(!profileOpen);
    setNotificationsOpen(false);
  };

  const handleProfileAction = (href?: string, action?: string) => {
    if (action === 'logout') {
      console.log('Signing out...');
      // Add logout logic here
    } else if (href) {
      router.push(href);
    }
    setProfileOpen(false);
  };

  const isActiveRoute = (href: string) => {
    if (href === '/dashboard') {
      return pathname === '/dashboard';
    }
    return pathname === href || pathname?.startsWith(href + '/');
  };

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className={`bg-slate-900 ${sidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300 flex flex-col`}>
        
        {/* Logo Header */}
        <div className="p-4 border-b border-slate-700">
          <div className="flex items-center justify-between">
            {sidebarOpen && (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-white text-lg font-bold">ChatConnect</h1>
                  <p className="text-slate-400 text-xs">Dashboard</p>
                </div>
              </div>
            )}
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition-colors"
              aria-label="Toggle sidebar"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navigation.map((item) => {
            const Icon = item.icon;
            const active = isActiveRoute(item.href);
            
            return (
              <button
                key={item.href}
                onClick={() => router.push(item.href)}
                className={`flex items-center w-full px-3 py-3 rounded-lg transition-all ${
                  active
                    ? 'bg-blue-600 text-white shadow-lg' 
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
                aria-current={active ? 'page' : undefined}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {sidebarOpen && <span className="ml-3 font-medium">{item.name}</span>}
              </button>
            );
          })}
        </nav>

        {/* Upgrade Card */}
        {sidebarOpen && (
          <div className="px-3 pb-3">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-4 text-center">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <Crown className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-white font-bold text-sm mb-1">Upgrade to Pro</h3>
              <p className="text-white/90 text-xs mb-3">Unlock all features</p>
              <button className="w-full bg-white text-blue-600 hover:bg-slate-100 font-bold rounded-lg py-2 text-xs transition-colors flex items-center justify-center gap-1">
                <Sparkles className="w-3 h-3" />
                Upgrade Now
              </button>
            </div>
          </div>
        )}

        {/* User Section */}
        <div className="p-3 border-t border-slate-700">
          <div className="flex items-center gap-2 p-2 bg-slate-800 rounded-lg">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
              {user.avatar}
            </div>
            {sidebarOpen && (
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium truncate">{user.name}</p>
                <p className="text-slate-400 text-xs truncate">{user.role}</p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* Header */}
        <header className="bg-white border-b border-slate-200 shadow-sm">
          <div className="px-4 sm:px-6 py-3 sm:py-4">
            <div className="flex items-center justify-between">
              
              {/* Left: Menu & Title */}
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors lg:hidden"
                  aria-label="Toggle sidebar"
                >
                  <Menu className="w-5 h-5" />
                </button>
                <h1 className="text-xl font-bold text-slate-900">
                  {getCurrentPageTitle()}
                </h1>
              </div>

              {/* Right: Notifications & Profile */}
              <div className="flex items-center gap-2">
                
                {/* Notifications */}
                <div className="relative" ref={notificationsRef}>
                  <button 
                    onClick={toggleNotifications}
                    className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                    aria-label="Notifications"
                  >
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
                  </button>
                  
                  {notificationsOpen && (
                    <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-200 z-50">
                      <div className="p-4 border-b border-slate-200">
                        <h3 className="font-bold text-slate-900">Notifications</h3>
                        <p className="text-slate-600 text-sm">{notifications.length} unread</p>
                      </div>
                      
                      <div className="max-h-80 overflow-y-auto">
                        {notifications.map((item) => (
                          <button 
                            key={item.id}
                            className="w-full p-4 border-b border-slate-100 hover:bg-slate-50 text-left transition-colors"
                          >
                            <p className="text-sm font-medium text-slate-900">{item.label}</p>
                            <p className="text-xs text-slate-500 mt-1">{item.time}</p>
                          </button>
                        ))}
                      </div>
                      
                      <button className="w-full p-3 text-sm text-blue-600 hover:text-blue-700 font-medium border-t border-slate-200">
                        View all notifications
                      </button>
                    </div>
                  )}
                </div>

                {/* Profile */}
                <div className="relative" ref={profileRef}>
                  <button 
                    onClick={toggleProfile}
                    className="flex items-center gap-2 p-1.5 hover:bg-slate-100 rounded-lg transition-colors"
                    aria-label="Profile menu"
                  >
                    <div className="w-9 h-9 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {user.avatar}
                    </div>
                    <div className="hidden md:block text-left">
                      <p className="text-sm font-bold text-slate-900">{user.name}</p>
                      <p className="text-xs text-slate-600">{user.role}</p>
                    </div>
                    <ChevronDown className="w-4 h-4 text-slate-400 hidden md:block" />
                  </button>
                  
                  {profileOpen && (
                    <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200 z-50">
                      <div className="p-4 border-b border-slate-200">
                        <p className="font-bold text-slate-900">{user.name}</p>
                        <p className="text-sm text-slate-600">{user.email}</p>
                      </div>
                      
                      <div className="p-2">
                        {profileMenu.map((item) => {
                          const Icon = item.icon;
                          return (
                            <button
                              key={item.label}
                              onClick={() => handleProfileAction(item.href, (item as any).action)}
                              className="flex items-center w-full p-3 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                            >
                              <Icon className="w-4 h-4 mr-3 text-slate-500" />
                              <span className="text-sm">{item.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto bg-slate-50">
          <div className="p-4 sm:p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}