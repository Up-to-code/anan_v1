'use client';

import React from 'react';
import { CreditCard } from 'lucide-react';
import { SettingsCard } from './SettingsCard';
import { SettingsSection } from './SettingsSection';

export const BillingTab = () => {
  return (
    <div className="space-y-6">
      <SettingsCard>
        <SettingsSection title="Current Plan">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-semibold text-gray-900">Professional Plan</p>
              <p className="text-sm text-gray-600 mt-1">$29/month • Billed monthly</p>
            </div>
            <button 
              className="px-4 py-2 border border-gray-300 rounded-lg font-medium text-sm text-gray-700 hover:bg-gray-50"
              type="button"
            >
              Change Plan
            </button>
          </div>
        </SettingsSection>
      </SettingsCard>

      <SettingsCard>
        <SettingsSection title="Payment Method">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <div className="w-10 h-6 bg-blue-500 rounded flex items-center justify-center mr-3">
                <CreditCard size={14} className="text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Visa ending in 4242</p>
                <p className="text-sm text-gray-600 mt-1">Expires 12/2025</p>
              </div>
            </div>
            <button 
              className="text-blue-600 hover:text-blue-700 font-medium text-sm"
              type="button"
            >
              Update
            </button>
          </div>
        </SettingsSection>
      </SettingsCard>
    </div>
  );
};

