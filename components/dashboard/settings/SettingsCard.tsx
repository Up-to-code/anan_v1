'use client';

import React from 'react';

interface SettingsCardProps {
  children: React.ReactNode;
}

export const SettingsCard = ({ children }: SettingsCardProps) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      {children}
    </div>
  );
};

