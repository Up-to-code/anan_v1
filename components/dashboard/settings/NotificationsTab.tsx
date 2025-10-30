'use client';

import React from 'react';
import { NotificationSettings } from './types';
import { SettingsCard } from './SettingsCard';
import { SettingsSection } from './SettingsSection';
import { SettingsSwitch } from './SettingsSwitch';

interface NotificationsTabProps {
  notifications: NotificationSettings;
  setNotifications: React.Dispatch<React.SetStateAction<NotificationSettings>>;
}

const getNotificationDescription = (key: string) => {
  const descriptions: { [key: string]: string } = {
    emailNotifications: 'Important account activity',
    marketingEmails: 'New features and promotions',
    securityAlerts: 'Security-related events',
    productUpdates: 'Product improvements',
    weeklyReports: 'Weekly campaign performance'
  };
  return descriptions[key] || '';
};

export const NotificationsTab = ({ notifications, setNotifications }: NotificationsTabProps) => {
  return (
    <SettingsCard>
      <SettingsSection title="Email Notifications">
        <div className="space-y-4">
          {Object.entries(notifications).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between py-2">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {getNotificationDescription(key)}
                </p>
              </div>
              <SettingsSwitch
                enabled={value}
                onChange={(enabled) => setNotifications({ ...notifications, [key]: enabled })}
              />
            </div>
          ))}
        </div>
      </SettingsSection>
    </SettingsCard>
  );
};

