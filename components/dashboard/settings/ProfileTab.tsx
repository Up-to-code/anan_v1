'use client';

import React from 'react';
import { UserProfile } from './types';
import { SettingsCard } from './SettingsCard';
import { SettingsSection } from './SettingsSection';
import { SettingsInput } from './SettingsInput';
import { SettingsSelect } from './SettingsSelect';

interface ProfileTabProps {
  profile: UserProfile;
  setProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
}

export const ProfileTab = ({ profile, setProfile }: ProfileTabProps) => {
  return (
    <div className="space-y-6">
      <SettingsCard>
        <SettingsSection title="Personal Information">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SettingsInput
              label="Full Name"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            />
            <SettingsInput
              label="Email Address"
              type="email"
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            />
            <SettingsInput
              label="Company"
              value={profile.company}
              onChange={(e) => setProfile({ ...profile, company: e.target.value })}
            />
            <SettingsInput
              label="Role"
              value={profile.role}
              onChange={(e) => setProfile({ ...profile, role: e.target.value })}
            />
          </div>
        </SettingsSection>
      </SettingsCard>

      <SettingsCard>
        <SettingsSection title="Preferences">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SettingsSelect
              label="Timezone"
              value={profile.timezone}
              onChange={(e) => setProfile({ ...profile, timezone: e.target.value })}
              options={[
                { value: 'America/New_York', label: 'Eastern Time (ET)' },
                { value: 'America/Chicago', label: 'Central Time (CT)' },
                { value: 'America/Denver', label: 'Mountain Time (MT)' },
                { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
              ]}
            />
            <SettingsSelect
              label="Language"
              value={profile.language}
              onChange={(e) => setProfile({ ...profile, language: e.target.value })}
              options={[
                { value: 'English', label: 'English' },
                { value: 'Spanish', label: 'Spanish' },
                { value: 'French', label: 'French' },
              ]}
            />
          </div>
        </SettingsSection>
      </SettingsCard>
    </div>
  );
};

