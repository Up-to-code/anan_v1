'use client';

import React from 'react';

interface SettingsSwitchProps {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
}

export const SettingsSwitch = ({ enabled, onChange }: SettingsSwitchProps) => {
  return (
    <button
      onClick={() => onChange(!enabled)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        enabled ? 'bg-blue-500' : 'bg-gray-200'
      }`}
      type="button"
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          enabled ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );
};

