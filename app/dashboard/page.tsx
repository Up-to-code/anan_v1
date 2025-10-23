// app/dashboard/page.tsx
'use client';

import { useState } from 'react';
import { 
  MessageCircle,
  Users,
  Zap,
  TrendingUp,
  ArrowUp,
  ArrowDown,
  MoreVertical,
  Bot,
  Plus,
  Cpu,
  Database,
  Bell,
  Activity,
  Shield,
  Cloud,
  Brain,
  Sparkles
} from 'lucide-react';

// Import shadcn chart components
import { Bar, BarChart, Line, LineChart, Pie, PieChart, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

// Types
interface StatCardData {
  title: string;
  value: string;
  change: number;
  trend: 'up' | 'down';
  icon: React.ReactNode;
}

interface ChatSession {
  id: string;
  user: string;
  lastMessage: string;
  time: string;
  status: 'active' | 'completed';
  tokens: number;
  model: string;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'info' | 'warning' | 'success' | 'error';
  unread: boolean;
}

// Mock data for AI platform
const STATS_DATA: StatCardData[] = [
  {
    title: 'Total Tokens Used',
    value: '2.8M',
    change: 12,
    trend: 'up',
    icon: <Cpu size={20} />
  },
  {
    title: 'Active Chat Sessions',
    value: '1,247',
    change: 8,
    trend: 'up',
    icon: <MessageCircle size={20} />
  },
  {
    title: 'Avg Response Time',
    value: '1.2s',
    change: -15,
    trend: 'down',
    icon: <Zap size={20} />
  },
  {
    title: 'Model Accuracy',
    value: '98.2%',
    change: 2,
    trend: 'up',
    icon: <TrendingUp size={20} />
  }
];

const CHAT_SESSIONS_DATA: ChatSession[] = [
  {
    id: '1',
    user: 'alex@techcorp.com',
    lastMessage: 'Explain neural networks in simple terms',
    time: '2 min ago',
    status: 'active',
    tokens: 1247,
    model: 'GPT-4'
  },
  {
    id: '2',
    user: 'sarah@research.io',
    lastMessage: 'Generate Python code for data analysis',
    time: '5 min ago',
    status: 'active',
    tokens: 892,
    model: 'Claude-3'
  },
  {
    id: '3',
    user: 'mike@university.edu',
    lastMessage: 'Summarize this research paper on AI ethics',
    time: '15 min ago',
    status: 'completed',
    tokens: 2156,
    model: 'GPT-4'
  },
  {
    id: '4',
    user: 'jane@startup.co',
    lastMessage: 'Create marketing copy for AI product',
    time: '8 min ago',
    status: 'active',
    tokens: 743,
    model: 'Gemini Pro'
  }
];

const NOTIFICATIONS_DATA: Notification[] = [
  {
    id: '1',
    title: 'High Token Usage',
    message: 'Token consumption exceeded daily limit for user alex@techcorp.com',
    time: '5 min ago',
    type: 'warning',
    unread: true
  },
  {
    id: '2',
    title: 'Model Update',
    message: 'GPT-4 model has been updated to version 4.1.2',
    time: '1 hour ago',
    type: 'info',
    unread: true
  },
  {
    id: '3',
    title: 'System Health',
    message: 'All systems operating normally. Response times optimal.',
    time: '2 hours ago',
    type: 'success',
    unread: false
  },
  {
    id: '4',
    title: 'API Rate Limit',
    message: 'Rate limit approaching for European region',
    time: '30 min ago',
    type: 'warning',
    unread: false
  }
];

// Blue-themed mock chart data
const TOKEN_USAGE_DATA = [
  { hour: '00:00', tokens: 45000, cost: 45 },
  { hour: '04:00', tokens: 32000, cost: 32 },
  { hour: '08:00', tokens: 125000, cost: 125 },
  { hour: '12:00', tokens: 187000, cost: 187 },
  { hour: '16:00', tokens: 156000, cost: 156 },
  { hour: '20:00', tokens: 98000, cost: 98 }
];

const MODEL_USAGE_DATA = [
  { model: 'GPT-4', usage: 45, tokens: 1250000, color: '#3B82F6' },
  { model: 'Claude-3', usage: 25, tokens: 750000, color: '#60A5FA' },
  { model: 'Gemini Pro', usage: 18, tokens: 520000, color: '#93C5FD' },
  { model: 'Llama-2', usage: 12, tokens: 280000, color: '#BFDBFE' }
];

const RESPONSE_TIME_DATA = [
  { time: '00:00', gpt4: 1.2, claude: 1.8, gemini: 1.5 },
  { time: '04:00', gpt4: 1.1, claude: 1.7, gemini: 1.4 },
  { time: '08:00', gpt4: 1.8, claude: 2.1, gemini: 1.9 },
  { time: '12:00', gpt4: 2.2, claude: 2.5, gemini: 2.3 },
  { time: '16:00', gpt4: 1.9, claude: 2.2, gemini: 2.0 },
  { time: '20:00', gpt4: 1.5, claude: 1.9, gemini: 1.6 }
];

const COST_ANALYSIS_DATA = [
  { day: 'Mon', tokens: 145000, cost: 145 },
  { day: 'Tue', tokens: 187000, cost: 187 },
  { day: 'Wed', tokens: 165000, cost: 165 },
  { day: 'Thu', tokens: 198000, cost: 198 },
  { day: 'Fri', tokens: 176000, cost: 176 },
  { day: 'Sat', tokens: 89000, cost: 89 },
  { day: 'Sun', tokens: 67000, cost: 67 }
];

// Components
function StatCard({ title, value, change, trend, icon }: StatCardData) {
  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
          {icon}
        </div>
        <div className={`flex items-center gap-1 text-sm font-medium ${
          trend === 'up' ? 'text-green-600' : 'text-red-600'
        }`}>
          {trend === 'up' ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
          {Math.abs(change)}%
        </div>
      </div>
      <div>
        <div className="text-2xl font-semibold text-gray-900 mb-1">{value}</div>
        <div className="text-sm text-gray-600">{title}</div>
      </div>
    </div>
  );
}

function ChatSessionItem({ chat }: { chat: ChatSession }) {
  const getStatusColor = (status: string) => {
    return status === 'active' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800';
  };

  const getModelColor = (model: string) => {
    const colors: { [key: string]: string } = {
      'GPT-4': 'bg-purple-100 text-purple-800',
      'Claude-3': 'bg-orange-100 text-orange-800',
      'Gemini Pro': 'bg-teal-100 text-teal-800'
    };
    return colors[model] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors">
      <div className="flex items-center space-x-3 flex-1">
        <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
          <Brain size={16} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-medium text-gray-900 text-sm truncate">
              {chat.user}
            </span>
            <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(chat.status)}`}>
              {chat.status}
            </span>
            <span className={`px-2 py-1 rounded text-xs font-medium ${getModelColor(chat.model)}`}>
              {chat.model}
            </span>
          </div>
          <p className="text-gray-600 text-sm truncate">
            {chat.lastMessage}
          </p>
          <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
            <span>{chat.time}</span>
            <span className="font-medium">{chat.tokens.toLocaleString()} tokens</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function NotificationItem({ notification }: { notification: Notification }) {
  const getTypeColor = (type: string) => {
    const colors = {
      info: 'bg-blue-100 text-blue-800',
      warning: 'bg-yellow-100 text-yellow-800',
      success: 'bg-green-100 text-green-800',
      error: 'bg-red-100 text-red-800'
    };
    return colors[type as keyof typeof colors];
  };

  const getTypeIcon = (type: string) => {
    const icons = {
      info: <Bell size={14} />,
      warning: <Activity size={14} />,
      success: <Shield size={14} />,
      error: <Cloud size={14} />
    };
    return icons[type as keyof typeof icons];
  };

  return (
    <div className={`flex items-start space-x-3 p-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors ${notification.unread ? 'bg-blue-50' : ''}`}>
      <div className={`p-2 rounded-lg mt-1 ${getTypeColor(notification.type)}`}>
        {getTypeIcon(notification.type)}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-medium text-gray-900 text-sm">
            {notification.title}
          </span>
          {notification.unread && (
            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
          )}
        </div>
        <p className="text-gray-600 text-sm">
          {notification.message}
        </p>
        <div className="text-xs text-gray-500 mt-1">
          {notification.time}
        </div>
      </div>
    </div>
  );
}

function ChartCard({ 
  title, 
  description,
  children 
}: { 
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200">
      <div className="mb-4">
        <h3 className="font-semibold text-gray-900">{title}</h3>
        {description && <p className="text-sm text-gray-600 mt-1">{description}</p>}
      </div>
      {children}
    </div>
  );
}

function ListCard({ 
  title, 
  children,
  action 
}: { 
  title: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">{title}</h3>
          {action}
        </div>
      </div>
      <div className="divide-y divide-gray-100">
        {children}
      </div>
    </div>
  );
}

// Custom Tooltip for charts
const ChartTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-sm">
        <p className="text-sm font-medium text-gray-900 mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {entry.value}{entry.dataKey === 'cost' ? ' USD' : entry.dataKey === 'tokens' ? ' tokens' : 's'}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function AIPlatformDashboard() {
  const [timeRange, setTimeRange] = useState<'24h' | '7d' | '30d'>('24h');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <Sparkles size={18} className="text-white" />
              </div>
              <span className="ml-2 text-lg font-semibold text-gray-900">NeuraCore AI</span>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
              {['Dashboard', 'Models', 'Analytics', 'Billing', 'Settings'].map((item) => (
                <a
                  key={item}
                  href={`/${item.toLowerCase()}`}
                  className={`text-sm font-medium ${
                    item === 'Dashboard' ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {item}
                </a>
              ))}
            </nav>
            
            <div className="flex items-center space-x-3">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center transition-colors">
                <Plus size={16} className="mr-2" />
                New Model
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">AI Platform Dashboard</h1>
            <p className="text-gray-600 mt-1">Monitor token usage, chat sessions, and system performance</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex bg-white border border-gray-300 rounded-lg p-1">
              {(['24h', '7d', '30d'] as const).map(range => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                    timeRange === range
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {STATS_DATA.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Token Usage */}
          <ChartCard 
            title="Token Usage & Cost" 
            description="Real-time token consumption and associated costs"
          >
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={TOKEN_USAGE_DATA}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="hour" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip content={<ChartTooltip />} />
                <Bar 
                  yAxisId="left"
                  dataKey="tokens" 
                  fill="#3B82F6" 
                  radius={[4, 4, 0, 0]} 
                  name="Tokens Used" 
                />
                <Bar 
                  yAxisId="right"
                  dataKey="cost" 
                  fill="#60A5FA" 
                  radius={[4, 4, 0, 0]} 
                  name="Cost (USD)" 
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Model Distribution */}
          <ChartCard 
            title="Model Usage Distribution" 
            description="Token usage across different AI models"
          >
            <div className="flex flex-col items-center">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Tooltip content={<ChartTooltip />} />
                  <Pie
                    data={MODEL_USAGE_DATA}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ model, usage }) => `${model} ${usage}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="usage"
                  >
                    {MODEL_USAGE_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-4 mt-4 w-full">
                {MODEL_USAGE_DATA.map((model, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: model.color }}></div>
                      <span className="text-sm font-medium text-gray-900">{model.model}</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">{model.tokens.toLocaleString()} tokens</span>
                  </div>
                ))}
              </div>
            </div>
          </ChartCard>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Response Times */}
          <ChartCard 
            title="Model Response Times" 
            description="Average response time by model (seconds)"
          >
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={RESPONSE_TIME_DATA}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="time" />
                <YAxis domain={[1, 3]} />
                <Tooltip content={<ChartTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey="gpt4" 
                  stroke="#3B82F6" 
                  strokeWidth={2}
                  dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, fill: '#3B82F6' }}
                  name="GPT-4"
                />
                <Line 
                  type="monotone" 
                  dataKey="claude" 
                  stroke="#60A5FA" 
                  strokeWidth={2}
                  dot={{ fill: '#60A5FA', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, fill: '#60A5FA' }}
                  name="Claude-3"
                />
                <Line 
                  type="monotone" 
                  dataKey="gemini" 
                  stroke="#93C5FD" 
                  strokeWidth={2}
                  dot={{ fill: '#93C5FD', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, fill: '#93C5FD' }}
                  name="Gemini Pro"
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Cost Analysis */}
          <ChartCard 
            title="Daily Cost Analysis" 
            description="Token costs over the past week"
          >
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={COST_ANALYSIS_DATA}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip content={<ChartTooltip />} />
                <Area 
                  type="monotone" 
                  dataKey="cost" 
                  stroke="#3B82F6" 
                  fill="#3B82F6" 
                  fillOpacity={0.2}
                  strokeWidth={2}
                  name="Cost (USD)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ListCard 
            title="Active Chat Sessions" 
            action={<button className="text-blue-600 hover:text-blue-700 text-sm font-medium">View all</button>}
          >
            {CHAT_SESSIONS_DATA.map(chat => (
              <ChatSessionItem key={chat.id} chat={chat} />
            ))}
          </ListCard>

          <ListCard 
            title="System Notifications"
            action={<button className="text-blue-600 hover:text-blue-700 text-sm font-medium">View all</button>}
          >
            {NOTIFICATIONS_DATA.map(notification => (
              <NotificationItem key={notification.id} notification={notification} />
            ))}
          </ListCard>
        </div>
      </div>
    </div>
  );
}