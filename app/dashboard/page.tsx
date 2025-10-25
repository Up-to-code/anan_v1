/* eslint-disable @typescript-eslint/no-explicit-any */
// app/dashboard/page.tsx
'use client';

import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatsGrid } from '@/components/dashboard/StatsGrid';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { Container } from '@/components/layout/Container';
import { Grid } from '@/components/layout/Grid';
import { Card } from '@/components/ui/Card';
import { 
  Users, 
  DollarSign, 
  ShoppingCart, 
  Eye, 
  Plus, 
  Upload, 
  Download, 
  Share, 
  Edit,
  Calendar,
  TrendingUp
} from 'lucide-react';
import { useToast } from '@/components/ui/Toast';

// Types
interface StatItem {
  title: string;
  value: string;
  change: number;
  changeType: 'increase' | 'decrease';
  icon: React.ComponentType<any>;
  description: string;
}

interface ActivityItem {
  id: number;
  type: 'user' | 'order' | 'payment' | 'document';
  title: string;
  description: string;
  time: string;
  user?: string;
}

interface QuickActionItem {
  label: string;
  description: string;
  icon: React.ComponentType<any>;
  onClick: () => void;
}

// Mock Data
const USER_DATA = {
  name: "John Doe",
  email: "john@example.com",
  avatar: "/avatars/john.jpg"
};

const STATS_DATA: StatItem[] = [
  {
    title: 'Total Users',
    value: '12,402',
    change: 12,
    changeType: 'increase',
    icon: Users,
    description: 'From last month'
  },
  {
    title: 'Revenue',
    value: '$45,231',
    change: 8,
    changeType: 'increase',
    icon: DollarSign,
    description: 'From last month'
  },
  {
    title: 'Orders',
    value: '1,234',
    change: -2,
    changeType: 'decrease',
    icon: ShoppingCart,
    description: 'From last month'
  },
  {
    title: 'Page Views',
    value: '45.2K',
    change: 18,
    changeType: 'increase',
    icon: Eye,
    description: 'From last month'
  }
];

const ACTIVITIES_DATA: ActivityItem[] = [
  {
    id: 1,
    type: 'user',
    title: 'New user registered',
    description: 'Sarah Johnson joined the platform',
    time: '5 min ago',
    user: 'System'
  },
  {
    id: 2,
    type: 'order',
    title: 'New order placed',
    description: 'Order #ORD-1234 has been placed',
    time: '1 hour ago',
    user: 'John Smith'
  },
  {
    id: 3,
    type: 'payment',
    title: 'Payment received',
    description: 'Payment of $299.00 has been processed',
    time: '2 hours ago',
    user: 'Payment Gateway'
  },
  {
    id: 4,
    type: 'document',
    title: 'Document uploaded',
    description: 'Quarterly report has been uploaded',
    time: '3 hours ago',
    user: 'Emily Davis'
  }
];

const QUICK_ACTIONS_DATA = (addToast: any): QuickActionItem[] => [
  {
    label: 'Add User',
    description: 'Create a new user account',
    icon: Plus,
    onClick: () => addToast({ 
      title: 'Add User', 
      message: 'Opening user creation form', 
      type: 'info' 
    })
  },
  {
    label: 'Upload Files',
    description: 'Upload documents and media',
    icon: Upload,
    onClick: () => addToast({ 
      title: 'Upload Files', 
      message: 'Opening file upload dialog', 
      type: 'info' 
    })
  },
  {
    label: 'Export Data',
    description: 'Download reports and data',
    icon: Download,
    onClick: () => addToast({ 
      title: 'Export Data', 
      message: 'Preparing data for export', 
      type: 'info' 
    })
  },
  {
    label: 'Share Report',
    description: 'Share analytics with team',
    icon: Share,
    onClick: () => addToast({ 
      title: 'Share Report', 
      message: 'Opening share options', 
      type: 'info' 
    })
  },
  {
    label: 'Edit Profile',
    description: 'Update your account information',
    icon: Edit,
    onClick: () => addToast({ 
      title: 'Edit Profile', 
      message: 'Opening profile settings', 
      type: 'info' 
    })
  },
  {
    label: 'Manage Team',
    description: 'View and manage team members',
    icon: Users,
    onClick: () => addToast({ 
      title: 'Manage Team', 
      message: 'Opening team management', 
      type: 'info' 
    })
  }
];

const UPCOMING_EVENTS = [
  {
    title: 'Team Meeting',
    time: 'Today, 2:00 PM',
    status: 'soon' as const,
    color: 'blue'
  },
  {
    title: 'Project Deadline',
    time: 'Tomorrow, 5:00 PM',
    status: 'upcoming' as const,
    color: 'gray'
  },
  {
    title: 'Client Presentation',
    time: 'In 2 days, 10:00 AM',
    status: 'upcoming' as const,
    color: 'gray'
  }
];

// Components
function WelcomeSection({ userName }: { userName: string }) {
  return (
    <div className="mb-8">
      <h1 className="text-2xl font-bold text-gray-900">
        Welcome back, {userName}!
      </h1>
      <p className="text-gray-600 mt-2">
        Here&apos;s what&apos;s happening with your business today.
      </p>
    </div>
  );
}

function PerformanceChart() {
  return (
    <Card padding="lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Performance Overview</h3>
        <button className="flex items-center text-sm text-blue-600 hover:text-blue-500 font-medium">
          <TrendingUp size={16} className="mr-1" />
          View Report
        </button>
      </div>
      <div className="h-64 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg flex items-center justify-center border border-gray-200">
        <div className="text-center">
          <TrendingUp size={48} className="text-blue-400 mx-auto mb-2" />
          <p className="text-gray-500 font-medium">Interactive Chart</p>
          <p className="text-gray-400 text-sm mt-1">
            Revenue trends and analytics
          </p>
        </div>
      </div>
    </Card>
  );
}

function UpcomingEvents() {
  return (
    <Card padding="lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Upcoming Events</h3>
        <button className="text-sm text-blue-600 hover:text-blue-500 font-medium">
          View Calendar
        </button>
      </div>
      <div className="space-y-3">
        {UPCOMING_EVENTS.map((event, index) => (
          <div
            key={index}
            className={`flex items-center justify-between p-3 rounded-lg border ${
              event.color === 'blue' 
                ? 'bg-blue-50 border-blue-200' 
                : 'bg-gray-50 border-gray-200'
            }`}
          >
            <div>
              <p className="font-medium text-gray-900">{event.title}</p>
              <p className="text-sm text-gray-500">{event.time}</p>
            </div>
            {event.status === 'soon' && (
              <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full font-medium">
                Soon
              </span>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
}

// Main Component
export default function DashboardPage() {
  const { addToast } = useToast();
  const quickActions = QUICK_ACTIONS_DATA(addToast);

  return (
    <DashboardLayout user={USER_DATA}>
      <Container maxWidth="7xl">
        
        {/* Welcome Section */}
        <WelcomeSection userName={USER_DATA.name} />

        {/* Stats Grid */}
        <section className="mb-8">
          <StatsGrid stats={STATS_DATA} />
        </section>

        {/* Main Content Grid */}
        <section className="mb-8">
          <Grid cols={2} gap="lg">
            <div className="lg:col-span-1">
              <RecentActivity activities={ACTIVITIES_DATA} />
            </div>
            <div className="lg:col-span-1">
              <QuickActions actions={quickActions} />
            </div>
          </Grid>
        </section>

        {/* Additional Content */}
        <section>
          <Grid cols={2} gap="lg">
            <div className="lg:col-span-1">
              <PerformanceChart />
            </div>
            <div className="lg:col-span-1">
              <UpcomingEvents />
            </div>
          </Grid>
        </section>

      </Container>
    </DashboardLayout>
  );
}