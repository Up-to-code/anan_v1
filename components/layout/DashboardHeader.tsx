// components/layout/DashboardHeader.tsx
import { Bell, Search, Menu } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Dropdown } from '@/components/ui/Dropdown';
import { Avatar } from '@/components/ui/Avatar';
import { Input } from '@/components/ui/Input';

interface DashboardHeaderProps {
  user: {
    name: string;
    email: string;
    avatar?: string;
  };
  onMenuToggle: () => void;
  onSearch?: (query: string) => void;
  onNotificationsClick?: () => void;
  onProfileClick?: () => void;
  onSettingsClick?: () => void;
  onHelpClick?: () => void;
  onLogout?: () => void;
}

export function DashboardHeader({
  user,
  onMenuToggle,
  onSearch,
  onNotificationsClick,
  onProfileClick,
  onSettingsClick,
  onHelpClick,
  onLogout
}: DashboardHeaderProps) {
  // Compose userMenuItems in the format required by DropdownItem[]
  const userMenuItems = [
    {
      label: 'Profile',
      onClick: () => onProfileClick?.(),
    },
    {
      label: 'Settings',
      onClick: () => onSettingsClick?.(),
    },
    {
      label: 'Help',
      onClick: () => onHelpClick?.(),
    },
    {
      type: 'separator',
      label: '',
      onClick: () => {},
    },
    {
      label: 'Logout',
      onClick: () => onLogout?.(),
      variant: 'danger',
    },
  ];

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left Section */}
          <div className="flex items-center">
            <button
              onClick={onMenuToggle}
              className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 transition-colors"
            >
              <Menu size={24} />
            </button>
            
            <div className="ml-4 lg:ml-0">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <Input
                  type="search"
                  value=""
                  onChange={(value) => onSearch?.(value)}
                  placeholder="Search..."
                  className="w-64 pl-10"
                />
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              icon={Bell}
              onClick={onNotificationsClick}
              className="text-gray-400 hover:text-gray-600 relative"
            >
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
            </Button>

            <Dropdown
              trigger={
                <button className="flex items-center space-x-3 text-sm rounded-lg hover:bg-gray-50 p-2 transition-colors">
                  <Avatar
                    src={user.avatar}
                    alt={user.name}
                    fallback={user.name.split(' ').map(n => n[0]).join('')}
                    size="sm"
                  />
                  <div className="hidden md:block text-left">
                    <div className="font-medium text-gray-900">{user.name}</div>
                    <div className="text-gray-500">{user.email}</div>
                  </div>
                </button>
              }
              items={userMenuItems}
            />
          </div>
        </div>
      </div>
    </header>
  );
}