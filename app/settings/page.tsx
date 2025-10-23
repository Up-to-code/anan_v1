/* eslint-disable @typescript-eslint/no-explicit-any */
// app/settings/page.tsx
'use client';

import { useState } from 'react';
import { 
  User, 
  Bell, 
  Shield, 
  CreditCard, 
  Users,
  Save,
  Eye,
  EyeOff,
  ChevronRight
} from 'lucide-react';

interface UserProfile {
  name: string;
  email: string;
  company: string;
  role: string;
  timezone: string;
  language: string;
}

interface NotificationSettings {
  emailNotifications: boolean;
  marketingEmails: boolean;
  securityAlerts: boolean;
  productUpdates: boolean;
  weeklyReports: boolean;
}

interface SecuritySettings {
  twoFactorAuth: boolean;
  sessionTimeout: number;
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<'profile' | 'notifications' | 'security' | 'billing' | 'team'>('profile');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');

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

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'team', label: 'Team', icon: Users },
  ];

  const handleSave = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
  };

  const handlePasswordChange = () => {
    if (newPassword.length >= 8) {
      setNewPassword('');
      setShowPassword(false);
    }
  };

  const Switch = ({ enabled, onChange }: { enabled: boolean; onChange: (enabled: boolean) => void }) => (
    <button
      onClick={() => onChange(!enabled)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        enabled ? 'bg-blue-500' : 'bg-gray-200'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          enabled ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );

  const Input = ({ label, value, onChange, type = 'text', ...props }: any) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
        {...props}
      />
    </div>
  );

  const Select = ({ label, value, onChange, options }: any) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <select
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
      >
        {options.map((option: any) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );

  const Section = ({ title, children }: any) => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      {children}
    </div>
  );

  const Card = ({ children }: any) => (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      {children}
    </div>
  );

  const renderProfileTab = () => (
    <div className="space-y-6">
      <Card>
        <Section title="Personal Information">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Full Name"
              value={profile.name}
              onChange={(e: any) => setProfile({ ...profile, name: e.target.value })}
            />
            <Input
              label="Email Address"
              type="email"
              value={profile.email}
              onChange={(e: any) => setProfile({ ...profile, email: e.target.value })}
            />
            <Input
              label="Company"
              value={profile.company}
              onChange={(e: any) => setProfile({ ...profile, company: e.target.value })}
            />
            <Input
              label="Role"
              value={profile.role}
              onChange={(e: any) => setProfile({ ...profile, role: e.target.value })}
            />
          </div>
        </Section>
      </Card>

      <Card>
        <Section title="Preferences">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Timezone"
              value={profile.timezone}
              onChange={(e: any) => setProfile({ ...profile, timezone: e.target.value })}
              options={[
                { value: 'America/New_York', label: 'Eastern Time (ET)' },
                { value: 'America/Chicago', label: 'Central Time (CT)' },
                { value: 'America/Denver', label: 'Mountain Time (MT)' },
                { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
              ]}
            />
            <Select
              label="Language"
              value={profile.language}
              onChange={(e: any) => setProfile({ ...profile, language: e.target.value })}
              options={[
                { value: 'English', label: 'English' },
                { value: 'Spanish', label: 'Spanish' },
                { value: 'French', label: 'French' },
              ]}
            />
          </div>
        </Section>
      </Card>
    </div>
  );

  const renderNotificationsTab = () => (
    <Card>
      <Section title="Email Notifications">
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
              <Switch
                enabled={value}
                onChange={(enabled) => setNotifications({ ...notifications, [key]: enabled })}
              />
            </div>
          ))}
        </div>
      </Section>
    </Card>
  );

  const renderSecurityTab = () => (
    <div className="space-y-6">
      <Card>
        <Section title="Two-Factor Authentication">
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
            >
              {security.twoFactorAuth ? 'Disable' : 'Enable'}
            </button>
          </div>
        </Section>
      </Card>

      <Card>
        <Section title="Change Password">
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
            >
              Update Password
            </button>
          </div>
        </Section>
      </Card>

      <Card>
        <Section title="Session Settings">
          <Select
            label="Session Timeout"
            value={security.sessionTimeout}
            onChange={(e: any) => setSecurity({ ...security, sessionTimeout: Number(e.target.value) })}
            options={[
              { value: 15, label: '15 minutes' },
              { value: 30, label: '30 minutes' },
              { value: 60, label: '1 hour' },
              { value: 120, label: '2 hours' },
            ]}
          />
        </Section>
      </Card>
    </div>
  );

  const renderBillingTab = () => (
    <div className="space-y-6">
      <Card>
        <Section title="Current Plan">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-semibold text-gray-900">Professional Plan</p>
              <p className="text-sm text-gray-600 mt-1">$29/month • Billed monthly</p>
            </div>
            <button className="px-4 py-2 border border-gray-300 rounded-lg font-medium text-sm text-gray-700 hover:bg-gray-50">
              Change Plan
            </button>
          </div>
        </Section>
      </Card>

      <Card>
        <Section title="Payment Method">
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
            <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
              Update
            </button>
          </div>
        </Section>
      </Card>
    </div>
  );

  const renderTeamTab = () => (
    <Card>
      <Section title="Team Members">
        <div className="space-y-4">
          {[
            { name: 'John Doe', email: 'john.doe@example.com', role: 'Admin', status: 'Active' },
            { name: 'Jane Smith', email: 'jane.smith@example.com', role: 'Editor', status: 'Active' },
            { name: 'Mike Johnson', email: 'mike.johnson@example.com', role: 'Viewer', status: 'Pending' },
          ].map((member, index) => (
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
        
        <button className="w-full mt-4 flex items-center justify-center py-3 border border-gray-300 border-dashed rounded-lg text-gray-600 hover:text-gray-700 hover:border-gray-400">
          <Users size={18} className="mr-2" />
          Invite Team Member
        </button>
      </Section>
    </Card>
  );

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
                <span className="text-white font-semibold text-sm">E</span>
              </div>
              <span className="ml-3 text-lg font-semibold text-gray-900">Emailly</span>
            </div>
            <nav className="flex items-center space-x-6">
              <a href="/features" className="text-gray-600 hover:text-gray-900 text-sm">Features</a>
              <a href="/pricing" className="text-gray-600 hover:text-gray-900 text-sm">Pricing</a>
              <a href="/settings" className="text-gray-900 font-medium text-sm">Settings</a>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-1">Manage your account preferences</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:w-64 flex-shrink-0">
            <nav className="space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center">
                      <Icon size={18} className="mr-3" />
                      {tab.label}
                    </div>
                    <ChevronRight size={16} />
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white border border-gray-200 rounded-lg">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">
                  {tabs.find(tab => tab.id === activeTab)?.label}
                </h2>
              </div>

              <div className="p-6">
                {activeTab === 'profile' && renderProfileTab()}
                {activeTab === 'notifications' && renderNotificationsTab()}
                {activeTab === 'security' && renderSecurityTab()}
                {activeTab === 'billing' && renderBillingTab()}
                {activeTab === 'team' && renderTeamTab()}
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
    </div>
  );
}