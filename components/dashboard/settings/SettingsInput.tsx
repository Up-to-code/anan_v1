'use client';

import React from 'react';

interface SettingsInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const SettingsInput = ({ label, ...props }: SettingsInputProps) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <input
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
        {...props}
      />
    </div>
  );
};

