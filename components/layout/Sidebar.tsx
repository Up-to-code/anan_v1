/* eslint-disable @typescript-eslint/no-explicit-any */
// components/layout/Sidebar.tsx
import { LogOut } from 'lucide-react';
import { Avatar } from '@/components/ui/Avatar';

interface SidebarItem {
  name: string;
  href: string;
  icon: React.ComponentType<any>;
  current?: boolean;
  badge?: string;
  category: string;
}

interface SidebarProps {
  items: SidebarItem[];
  user: {
    name: string;
    email: string;
    avatar?: string;
  };
  onNavigate: (href: string) => void;
  onLogout: () => void;
}

const CATEGORY_LABELS = {
  main: 'Main',
  content: 'Content',
  resources: 'Resources',
  system: 'System'
};

export function Sidebar({ items, user, onNavigate, onLogout }: SidebarProps) {
  const itemsByCategory = items.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, SidebarItem[]>);

  return (
    <div className="flex flex-col w-64 h-full bg-gray-900 text-white">
      {/* Logo */}
      <div className="flex items-center justify-center h-16 px-4 border-b border-gray-800">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">A</span>
          </div>
          <span className="text-xl font-semibold">Admin</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-8 overflow-y-auto">
        {Object.entries(itemsByCategory).map(([category, categoryItems]) => (
          <div key={category}>
            <h3 className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              {CATEGORY_LABELS[category as keyof typeof CATEGORY_LABELS] || category}
            </h3>
            <div className="space-y-1">
              {categoryItems.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(item.href);
                    }}
                    className={`
                      flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200
                      ${item.current
                        ? 'bg-gray-800 text-white'
                        : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                      }
                    `}
                  >
                    <Icon size={20} className="mr-3 flex-shrink-0" />
                    <span className="flex-1">{item.name}</span>
                    {item.badge && (
                      <span className="ml-2 bg-blue-500 text-xs px-2 py-1 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </a>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* User Menu */}
      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center space-x-3">
          <Avatar
            src={user.avatar}
            alt={user.name}
            fallback={user.name.split(' ').map(n => n[0]).join('')}
            size="sm"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{user.name}</p>
            <p className="text-xs text-gray-400 truncate">{user.email}</p>
          </div>
          <button
            onClick={onLogout}
            className="text-gray-400 hover:text-white transition-colors duration-200 p-1"
            title="Logout"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}