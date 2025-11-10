"use client";
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { usePathname, useRouter } from 'next/navigation';

// Icons
import {
  BarChart3, AirVent, Code, Package, CreditCard, 
  Bell, Settings, User, Menu, X, Zap, Crown, Sparkles,
  HelpCircle, LogOut, MessageCircle, Users, ShoppingCart,
  ChevronDown
} from 'lucide-react';

interface AppLayoutProps {
  children: React.ReactNode;
}

// All routes under /dashboard
const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: BarChart3 },
  { name: 'Agents', href: '/dashboard/agents', icon: AirVent },
  { name: 'Integrations', href: '/dashboard/integrations', icon: Code },
  { name: 'Products', href: '/dashboard/products', icon: Package },
  { name: 'Contacts', href: '/dashboard/contacts', icon: Users },
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

const notificationItems = [
  { label: 'New message from John', time: '5 min ago' },
  { label: 'Order #1234 completed', time: '1 hour ago' },
  { label: 'System update available', time: '2 hours ago' },
];

const profileItems = [
  { label: 'Profile', icon: User, href: '/dashboard/profile' },
  { label: 'Settings', icon: Settings, href: '/dashboard/settings' },
  { label: 'Help & Support', icon: HelpCircle, href: '/dashboard/help' },
  { label: 'Sign out', icon: LogOut, action: 'logout' },
];

export function AppLayout({ children }: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMediumScreen, setIsMediumScreen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  
  const router = useRouter();
  const pathname = usePathname();

  // Refs for dropdowns
  const notificationsRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside - FIXED VERSION
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      
      // Check if click is outside notifications dropdown
      if (notificationsOpen && 
          notificationsRef.current && 
          !notificationsRef.current.contains(target)) {
        setNotificationsOpen(false);
      }
      
      // Check if click is outside profile dropdown
      if (profileOpen && 
          profileRef.current && 
          !profileRef.current.contains(target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [notificationsOpen, profileOpen]);

  // Close dropdowns when route changes
  useEffect(() => {
    if (notificationsOpen || profileOpen) {
      setNotificationsOpen(false);
      setProfileOpen(false);
    }
  }, [pathname, notificationsOpen, profileOpen]);

  // Get current page title for header
  const getCurrentPageTitle = useCallback(() => {
    const currentNav = navigation.find(item => 
      pathname === item.href || pathname?.startsWith(item.href + '/')
    );
    return currentNav?.name || 'Dashboard';
  }, [pathname]);

  // Detect screen size and adjust sidebar
  useEffect(() => {
    const checkScreenSize = () => {
      const medium = window.innerWidth >= 768 && window.innerWidth <= 1024;
      setIsMediumScreen(medium);
      if (medium) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    if (typeof window !== 'undefined') {
      checkScreenSize();
      window.addEventListener('resize', checkScreenSize);
      
      return () => window.removeEventListener('resize', checkScreenSize);
    }
  }, []);

  // Toggle functions
  const toggleNotifications = useCallback(() => {
    setNotificationsOpen(prev => !prev);
    setProfileOpen(false);
  }, []);

  const toggleProfile = useCallback(() => {
    setProfileOpen(prev => !prev);
    setNotificationsOpen(false);
  }, []);

  const toggleSidebar = useCallback(() => {
    setSidebarOpen(prev => !prev);
  }, []);

  const handleUpgrade = () => {
    console.log('Upgrade to Pro clicked');
  };

  const handleSignOut = () => {
    console.log('Sign out clicked');
  };

  const handleNotificationClick = (item: { label: string; time: string }) => {
    console.log('Notification clicked:', item);
    // Don't close dropdown when clicking notification items
  };

  const handleViewAllNotifications = () => {
    console.log('View all notifications clicked');
    setNotificationsOpen(false);
  };

  const handleProfileItemClick = (href: string, action?: string) => {
    if (action === 'logout') {
      handleSignOut();
    } else {
      router.push(href);
    }
    setProfileOpen(false);
  };

  // Responsive sidebar width
  const getSidebarWidth = () => {
    if (!sidebarOpen) return 'w-16 md:w-20';
    if (isMediumScreen) return 'w-56';
    return 'w-64';
  };

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
      <div className={`bg-slate-900 ${getSidebarWidth()} transition-all duration-300 flex flex-col`}>
        
        {/* Header */}
        <div className="p-4 border-b border-slate-700">
          <div className="flex items-center justify-between">
            {sidebarOpen && (
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Zap className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h1 className="text-white text-lg font-bold">ChatConnect</h1>
                  <p className="text-slate-400 text-sm">Dashboard</p>
                </div>
              </div>
            )}
            <button 
              onClick={toggleSidebar}
              className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition-colors"
            >
              {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Navigation - All dashboard routes */}
        <div className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navigation.map((item) => {
            const Icon = item.icon;
            // Only show blue background for exact /dashboard path
            const isActive = item.href === '/dashboard' 
              ? pathname === '/dashboard'  // Only exact match for dashboard
              : pathname === item.href || pathname?.startsWith(item.href + '/');
            
            return (
              <button
                key={item.name}
                onClick={() => router.push(item.href)}
                className={`flex items-center w-full p-3 rounded-lg text-base transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-lg' // Blue only for active items
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Icon className="w-5 h-5 mr-3" />
                {sidebarOpen && (
                  <span className="font-medium">{item.name}</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Upgrade Card */}
        {sidebarOpen && (
          <div className="px-3 pb-3">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-4">
              <div className="text-center">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Crown className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-white font-bold text-sm mb-1">Upgrade to Pro</h3>
                <p className="text-white/90 text-xs mb-3">
                  Unlock all features
                </p>
                <button
                  onClick={handleUpgrade}
                  className="w-full bg-white text-blue-600 hover:bg-slate-100 font-bold rounded-lg py-2 text-xs transition-colors"
                >
                  <Sparkles className="w-3 h-3 inline mr-1" />
                  Upgrade Now
                </button>
              </div>
            </div>
          </div>
        )}

        {/* User Section */}
        <div className="p-3 border-t border-slate-700">
          <div className="flex items-center space-x-2 p-2 bg-slate-800 rounded-lg">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
              {user.avatar}
            </div>
            {sidebarOpen && (
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-bold truncate">{user.name}</p>
                <p className="text-slate-400 text-xs truncate">{user.role}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        
        {/* Header */}
        <header className="bg-white border-b border-slate-200 shadow-sm">
          <div className="px-4 py-3 md:px-6 md:py-4">
            <div className="flex items-center justify-between">
              
              {/* Left side */}
              <div className="flex items-center space-x-3 md:space-x-4">
                <button 
                  onClick={toggleSidebar}
                  className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <Menu className="w-4 h-4 md:w-5 md:h-5" />
                </button>
                
                {/* Page Title - Clean and simple */}
                <div>
                  <h1 className="text-lg md:text-xl font-bold text-slate-900">
                    {getCurrentPageTitle()}
                  </h1>
                </div>
              </div>

              {/* Right side - Dropdown menus */}
              <div className="flex items-center space-x-2 md:space-x-3">
                
                {/* Notifications Dropdown */}
                <div className="relative" ref={notificationsRef}>
                  <button 
                    onClick={toggleNotifications}
                    className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    <Bell className="w-4 h-4 md:w-5 md:h-5" />
                    <div className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></div>
                  </button>
                  
                  {/* Dropdown Menu */}
                  {notificationsOpen && (
                    <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-lg border border-slate-200 z-50">
                      <div className="p-4 border-b border-slate-200">
                        <h3 className="font-bold text-slate-900">Notifications</h3>
                        <p className="text-slate-600 text-sm">You have {notificationItems.length} new notifications</p>
                      </div>
                      
                      <div className="max-h-96 overflow-y-auto">
                        {notificationItems.map((item, index) => (
                          <div 
                            key={index} 
                            onClick={() => handleNotificationClick(item)}
                            className="p-4 border-b border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors"
                          >
                            <p className="text-sm font-medium text-slate-900">{item.label}</p>
                            <p className="text-xs text-slate-500 mt-1">{item.time}</p>
                          </div>
                        ))}
                      </div>
                      
                      <div className="p-3 border-t border-slate-200">
                        <button 
                          onClick={handleViewAllNotifications}
                          className="w-full text-center text-sm text-blue-600 hover:text-blue-700 font-medium py-2"
                        >
                          View all notifications
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Profile Dropdown */}
                <div className="relative" ref={profileRef}>
                  <button 
                    onClick={toggleProfile}
                    className="flex items-center space-x-2 p-1 md:p-2 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm md:text-base">
                      {user.avatar}
                    </div>
                    
                    {/* User info - Hidden on small screens */}
                    <div className="hidden md:block text-left">
                      <p className="text-sm md:text-base font-bold text-slate-900">{user.name}</p>
                      <p className="text-slate-600 text-xs md:text-sm">{user.role}</p>
                    </div>
                    
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  </button>
                  
                  {/* Dropdown Menu */}
                  {profileOpen && (
                    <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-lg border border-slate-200 z-50">
                      <div className="p-4 border-b border-slate-200">
                        <p className="font-bold text-slate-900">{user.name}</p>
                        <p className="text-slate-600 text-sm">{user.email}</p>
                      </div>
                      
                      <div className="p-2">
                        {profileItems.map((item, index) => {
                          const Icon = item.icon;
                          return (
                            <button
                              key={index}
                              onClick={() => handleProfileItemClick(item.href, (item as any).action)}
                              className="flex items-center w-full p-3 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors text-left"
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

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto bg-slate-50/50">
          <div className="p-4 md:p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}