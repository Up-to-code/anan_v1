'use client';

import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { SecuritySettings } from './types';
import { SettingsCard } from './SettingsCard';
import { SettingsSection } from './SettingsSection';
import { SettingsSelect } from './SettingsSelect';

interface SecurityTabProps {
  security: SecuritySettings;
  setSecurity: React.Dispatch<React.SetStateAction<SecuritySettings>>;
}

export const SecurityTab = ({ security, setSecurity }: SecurityTabProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');

  const handlePasswordChange = () => {
    if (newPassword.length >= 8) {
      setNewPassword('');
      setShowPassword(false);
    }
  };

  return (
    <div className="space-y-6">
      <SettingsCard>
        <SettingsSection title="Two-Factor Authentication">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">2FA Status</p>
              <p className="text-sm text-gray-500 mt-1">
                {security.twoFactorAuth ? 'Enabled' : 'Disabled'}
              </p>
            </div>
            <button
              onClick={() => setSecurity({ ...security, twoFactorAuth: !security.twoFactorAuth })}
              className={`px-4 py-2 rounded-lg font-medium text-sm ${
                security.twoFactorAuth 
                  ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' 
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
              type="button"
            >
              {security.twoFactorAuth ? 'Disable' : 'Enable'}
            </button>
          </div>
        </SettingsSection>
      </SettingsCard>

      <SettingsCard>
        <SettingsSection title="Change Password">
          <div className="space-y-4">
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 pr-10"
                  placeholder="Enter new password"
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  type="button"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Password must be at least 8 characters long
              </p>
            </div>
            <button
              onClick={handlePasswordChange}
              disabled={newPassword.length < 8}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg font-medium text-sm hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
              type="button"
            >
              Update Password
            </button>
          </div>
        </SettingsSection>
      </SettingsCard>

      <SettingsCard>
        <SettingsSection title="Session Settings">
          <SettingsSelect
            label="Session Timeout"
            value={security.sessionTimeout.toString()}
            onChange={(e) => setSecurity({ ...security, sessionTimeout: Number(e.target.value) })}
            options={[
              { value: '15', label: '15 minutes' },
              { value: '30', label: '30 minutes' },
              { value: '60', label: '1 hour' },
              { value: '120', label: '2 hours' },
            ]}
          />
        </SettingsSection>
      </SettingsCard>
    </div>
  );
};

