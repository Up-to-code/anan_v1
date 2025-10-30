/* eslint-disable @typescript-eslint/no-explicit-any */
// components/dashboard/QuickActions.tsx
import React from 'react';
import { Card, CardContent, CardHeader } from '../ui/Card';


interface QuickAction {
  label: string;
  description: string;
  icon: React.ComponentType<any>;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

interface QuickActionsProps {
  actions: QuickAction[];
}

export function QuickActions({ actions }: QuickActionsProps) {
  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {actions.map((action, index) => {
            const Icon = action.icon;
            return (
              <button
                key={index}
                onClick={action.onClick}
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors text-left"
              >
                <div className="p-2 bg-blue-100 rounded-lg mr-4">
                  <Icon className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{action.label}</p>
                  <p className="text-sm text-gray-500 mt-1">{action.description}</p>
                </div>
              </button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}