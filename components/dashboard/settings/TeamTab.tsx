'use client';

import React from 'react';
import { User, Users } from 'lucide-react';
import { SettingsCard } from './SettingsCard';
import { SettingsSection } from './SettingsSection';

export const TeamTab = () => {
  const teamMembers = [
    { name: 'John Doe', email: 'john.doe@example.com', role: 'Admin', status: 'Active' as const },
    { name: 'Jane Smith', email: 'jane.smith@example.com', role: 'Editor', status: 'Active' as const },
    { name: 'Mike Johnson', email: 'mike.johnson@example.com', role: 'Viewer', status: 'Pending' as const },
  ];

  return (
    <SettingsCard>
      <SettingsSection title="Team Members">
        <div className="space-y-4">
          {teamMembers.map((member, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                  <User size={18} className="text-gray-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{member.name}</p>
                  <p className="text-sm text-gray-600">{member.email}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  member.status === 'Active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {member.status}
                </span>
                <select 
                  value={member.role}
                  className="border border-gray-300 rounded px-2 py-1 text-sm"
                >
                  <option value="Admin">Admin</option>
                  <option value="Editor">Editor</option>
                  <option value="Viewer">Viewer</option>
                </select>
              </div>
            </div>
          ))}
        </div>
        
        <button 
          className="w-full mt-4 flex items-center justify-center py-3 border border-gray-300 border-dashed rounded-lg text-gray-600 hover:text-gray-700 hover:border-gray-400"
          type="button"
        >
          <Users size={18} className="mr-2" />
          Invite Team Member
        </button>
      </SettingsSection>
    </SettingsCard>
  );
};

