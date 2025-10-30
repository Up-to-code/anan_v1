'use client';

import React from 'react';
import { User, Bell, Shield, CreditCard, Users } from 'lucide-react';
import { TabType } from './types';

interface Tab {
  id: TabType;
  label: string;
  icon: React.ElementType;
}

interface SettingsTabsProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

const tabs: Tab[] = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'billing', label: 'Billing', icon: CreditCard },
  { id: 'team', label: 'Team', icon: Users },
];

export const SettingsTabs = ({ activeTab, setActiveTab }: SettingsTabsProps) => {
  return (
    <div className="border-b border-gray-200 mb-6">
      <nav className="flex space-x-1 overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-t-lg transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'text-blue-700 border-b-2 border-blue-700 bg-blue-50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <Icon size={18} className="mr-2" />
              {tab.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

