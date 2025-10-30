// components/layout/SectionHeader.tsx
import { Button } from '@/components/ui/Button';
import { Plus, Filter, Download, Upload } from 'lucide-react';
import React from 'react';

interface SectionHeaderProps {
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
    icon?: 'plus' | 'download' | 'upload';
    variant?: 'primary' | 'secondary';
  };
  filters?: React.ReactNode;
  children?: React.ReactNode;
}

export function SectionHeader({
  title,
  description,
  action,
  filters,
  children
}: SectionHeaderProps) {
  const getIcon = (icon?: string) => {
    switch (icon) {
      case 'plus': return Plus;
      case 'download': return Download;
      case 'upload': return Upload;
      default: return Plus;
    }
  };

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="px-4 sm:px-6 lg:px-8 py-6">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
              {title}
            </h1>
            {description && (
              <p className="mt-2 text-sm text-gray-500">
                {description}
              </p>
            )}
          </div>
          
          <div className="mt-4 flex md:mt-0 md:ml-4 space-x-3">
            {filters && (
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Filter size={16} />
                <span>Filter:</span>
                {filters}
              </div>
            )}
            
            {action && (
              <Button
                onClick={action.onClick}
                variant={action.variant || 'primary'}
                leftIcon={getIcon(action.icon) ? React.createElement(getIcon(action.icon)) : undefined}
              >
                {action.label}
              </Button>
            )}
            
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}