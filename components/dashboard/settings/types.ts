export interface UserProfile {
  name: string;
  email: string;
  company: string;
  role: string;
  timezone: string;
  language: string;
}

export interface NotificationSettings {
  emailNotifications: boolean;
  marketingEmails: boolean;
  securityAlerts: boolean;
  productUpdates: boolean;
  weeklyReports: boolean;
}

export interface SecuritySettings {
  twoFactorAuth: boolean;
  sessionTimeout: number;
}

export interface TeamMember {
  name: string;
  email: string;
  role: string;
  status: 'Active' | 'Pending' | 'Inactive';
}

export type TabType = 'profile' | 'notifications' | 'security' | 'billing' | 'team';

