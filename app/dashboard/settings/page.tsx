'use client';

import { useState } from 'react';
import { Save } from 'lucide-react';
import { ProfileTab } from '@/components/dashboard/settings/ProfileTab';
import { NotificationsTab } from '@/components/dashboard/settings/NotificationsTab';
import { SecurityTab } from '@/components/dashboard/settings/SecurityTab';
import { BillingTab } from '@/components/dashboard/settings/BillingTab';
import { TeamTab } from '@/components/dashboard/settings/TeamTab';
import { SettingsTabs } from '@/components/dashboard/settings/SettingsTabs';
import type { UserProfile, NotificationSettings, SecuritySettings, TabType } from '@/components/dashboard/settings/types';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<TabType>('profile');
  const [isLoading, setIsLoading] = useState(false);

  const [profile, setProfile] = useState<UserProfile>({
    name: 'John Doe',
    email: 'john.doe@example.com',
    company: 'Acme Inc',
    role: 'Admin',
    timezone: 'America/New_York',
    language: 'English'
  });

  const [notifications, setNotifications] = useState<NotificationSettings>({
    emailNotifications: true,
    marketingEmails: false,
    securityAlerts: true,
    productUpdates: true,
    weeklyReports: false
  });

  const [security, setSecurity] = useState<SecuritySettings>({
    twoFactorAuth: true,
    sessionTimeout: 60
  });

  const handleSave = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-1">Manage your account preferences</p>
        </div>

        <SettingsTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Main Content */}
        <div className="w-full">
          <div className="bg-white border border-gray-200 rounded-lg">
            <div className="p-6">
              {activeTab === 'profile' && <ProfileTab profile={profile} setProfile={setProfile} />}
              {activeTab === 'notifications' && (
                <NotificationsTab 
                  notifications={notifications} 
                  setNotifications={setNotifications} 
                />
              )}
              {activeTab === 'security' && (
                <SecurityTab security={security} setSecurity={setSecurity} />
              )}
              {activeTab === 'billing' && <BillingTab />}
              {activeTab === 'team' && <TeamTab />}
            </div>

            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end">
              <button
                onClick={handleSave}
                disabled={isLoading}
                className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg font-medium text-sm hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed"
              >
                <Save size={16} className="mr-2" />
                {isLoading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
