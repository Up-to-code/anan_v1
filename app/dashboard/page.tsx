/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import React, { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import {
  Users,
  Zap,
  Brain,
  MessageCircle,
  Database,
  CreditCard,
  Loader2,
  TrendingUp,
  Shield,
  Download,
  Plus,
  Bot,
} from 'lucide-react';

// ============================================
// DATA
// ============================================
const chartData = {
  tokenUsage: [
    { month: 'Jan', tokens: 400000, cost: 12000 },
    { month: 'Feb', tokens: 300000, cost: 9000 },
    { month: 'Mar', tokens: 500000, cost: 15000 },
    { month: 'Apr', tokens: 450000, cost: 13500 },
    { month: 'May', tokens: 600000, cost: 18000 },
    { month: 'Jun', tokens: 550000, cost: 16500 },
  ],
  modelUsage: [
    { name: 'GPT-4', tokens: 450000, color: '#3b82f6' },
    { name: 'Claude-3', tokens: 320000, color: '#60a5fa' },
    { name: 'Llama-2', tokens: 280000, color: '#93c5fd' },
    { name: 'Gemini', tokens: 195000, color: '#bfdbfe' },
  ],
  clientActivity: [
    { day: 'Mon', requests: 1200, tokens: 45000, activeUsers: 450 },
    { day: 'Tue', requests: 1900, tokens: 72000, activeUsers: 620 },
    { day: 'Wed', requests: 1500, tokens: 58000, activeUsers: 510 },
    { day: 'Thu', requests: 2100, tokens: 89000, activeUsers: 730 },
    { day: 'Fri', requests: 1800, tokens: 67000, activeUsers: 680 },
    { day: 'Sat', requests: 900, tokens: 34000, activeUsers: 320 },
    { day: 'Sun', requests: 800, tokens: 31000, activeUsers: 290 },
  ],
  platformPerformance: [
    { platform: 'OpenAI', uptime: 99.9, reliability: 98.5 },
    { platform: 'Anthropic', uptime: 99.8, reliability: 97.8 },
    { platform: 'Meta', uptime: 99.5, reliability: 95.2 },
    { platform: 'Google', uptime: 99.7, reliability: 96.8 },
  ],
  costAnalysis: [
    { model: 'GPT-4', development: 15000, inference: 45000, maintenance: 8000 },
    { model: 'Claude-3', development: 12000, inference: 32000, maintenance: 6000 },
    { model: 'Llama-2', development: 18000, inference: 28000, maintenance: 5000 },
    { model: 'Gemini', development: 10000, inference: 19500, maintenance: 4500 },
  ],
};

// ============================================
// COMPONENTS
// ============================================

// Type definitions
interface StatCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ElementType;
  isLoading: boolean;
}

interface ChartSkeletonProps {
  height?: number;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

interface HeaderProps {
  isExporting: boolean;
  handleExport: () => void;
  timeFilter: string;
  setTimeFilter: (filter: string) => void;
}

interface StatsGridProps {
  isLoading: boolean;
}

interface TabNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

interface OverviewTabProps {
  isLoading: boolean;
}

interface UsageTabProps {
  isLoading: boolean;
}

interface ClientsTabProps {
  isLoading: boolean;
}

interface CostsTabProps {
  isLoading: boolean;
}

// Empty State Component - Matches the exact same UI style
const EmptyState = () => (
  <div className="bg-white border border-slate-200 rounded-lg p-8">
    {/* 30% Overlay Background */}
    <div className="absolute inset-0 bg-blue-50 opacity-30 rounded-lg -z-10"></div>
    
    <div className="relative text-center py-12">
      {/* Icon */}
      <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-6 mx-auto">
        <Bot className="w-10 h-10 text-blue-600" />
      </div>
      
      {/* Title */}
      <h2 className="text-3xl font-bold text-slate-900 mb-4">
        Create your first agent
      </h2>
      
      {/* Subtitle */}
      <p className="text-lg text-slate-600 mb-8 max-w-md mx-auto">
        Get started by creating your first AI agent to analyze your data and provide insights.
      </p>
      
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium flex items-center gap-2 hover:bg-blue-700 transition-colors">
          <Plus className="w-5 h-5" />
          Create New Agent
        </button>
        <button className="px-6 py-3 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors">
          Learn More
        </button>
      </div>
    </div>
    
    {/* Bottom Section */}
    <div className="border-t border-slate-200 pt-8">
      <h3 className="text-lg font-semibold text-slate-900 mb-6 text-center">What you can do with agents:</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Brain className="w-6 h-6 text-blue-600" />
          </div>
          <h4 className="font-semibold text-slate-900 mb-2">Analyze Data</h4>
          <p className="text-sm text-slate-600">Analyze data patterns and trends automatically</p>
        </div>
        <div className="text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <TrendingUp className="w-6 h-6 text-blue-600" />
          </div>
          <h4 className="font-semibold text-slate-900 mb-2">Generate Insights</h4>
          <p className="text-sm text-slate-600">Get automated recommendations and insights</p>
        </div>
        <div className="text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Shield className="w-6 h-6 text-blue-600" />
          </div>
          <h4 className="font-semibold text-slate-900 mb-2">Monitor Performance</h4>
          <p className="text-sm text-slate-600">Track performance metrics in real-time</p>
        </div>
      </div>
    </div>
  </div>
);

// Chart Skeleton Loading Component
const ChartSkeleton = ({ height = 300 }: ChartSkeletonProps) => (
  <div className="w-full bg-slate-50 rounded-lg flex items-center justify-center" style={{ height }}>
    <div className="flex flex-col items-center gap-3">
      <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      <p className="text-sm text-slate-500">Loading chart...</p>
    </div>
  </div>
);

// Stat Card Component
const StatCard = ({ title, value, change, icon: Icon, isLoading }: StatCardProps) => {
  if (isLoading) {
    return (
      <div className="bg-white border border-slate-200 rounded-lg p-6">
        <div className="h-4 bg-slate-100 rounded w-24 mb-4"></div>
        <div className="h-8 bg-slate-100 rounded w-20 mb-2"></div>
        <div className="h-3 bg-slate-100 rounded w-32"></div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-6">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm font-medium text-slate-600">{title}</p>
        <Icon className="w-5 h-5 text-blue-500" />
      </div>
      <div className="text-3xl font-bold text-slate-900 mb-1">{value}</div>
      <div className="flex items-center text-sm">
        <TrendingUp className="w-4 h-4 text-blue-500 mr-1" />
        <span className="text-blue-600 font-medium">{change}</span>
        <span className="text-slate-500 ml-1">from last month</span>
      </div>
    </div>
  );
};

// Custom Tooltip Component
const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 border border-slate-200 rounded-lg shadow-lg">
        <p className="font-semibold text-slate-900 mb-2">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {entry.value.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// Header Component
const Header = ({ isExporting, handleExport, timeFilter, setTimeFilter }: HeaderProps) => (
  <div className="flex flex-col gap-4 mb-8">
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-4xl font-bold text-slate-900">AI Analytics Dashboard</h1>
        <p className="text-slate-600 mt-2">
          Real-time monitoring of token usage, costs, and performance
        </p>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={handleExport}
          disabled={isExporting}
          className="px-4 py-2 border border-slate-300 rounded-lg bg-white text-slate-700 flex items-center gap-2 disabled:opacity-50"
        >
          {isExporting ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Download className="w-4 h-4" />
          )}
          {isExporting ? 'Exporting...' : 'Export'}
        </button>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2">
          <Zap className="w-4 h-4" />
          New Analysis
        </button>
      </div>
    </div>
    
    {/* Time Filter */}
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium text-slate-700">Time Range:</span>
      <div className="flex gap-2">
        {['7D', '30D', '3M', '6M', '1Y', 'All'].map((period) => (
          <button
            key={period}
            onClick={() => setTimeFilter(period)}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              timeFilter === period
                ? 'bg-blue-600 text-white'
                : 'bg-white border border-slate-300 text-slate-700'
            }`}
          >
            {period}
          </button>
        ))}
      </div>
    </div>
  </div>
);

// Stats Grid Component
const StatsGrid = ({ isLoading }: StatsGridProps) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    <StatCard title="Total Tokens" value="7.2M" change="+18%" icon={Database} isLoading={isLoading} />
    <StatCard title="Active Clients" value="1,248" change="+12%" icon={Users} isLoading={isLoading} />
    <StatCard title="API Requests" value="92.4K" change="+24%" icon={MessageCircle} isLoading={isLoading} />
    <StatCard title="Total Cost" value="$24.8K" change="+8%" icon={CreditCard} isLoading={isLoading} />
  </div>
);

// Tab Navigation Component
const TabNavigation = ({ activeTab, setActiveTab }: TabNavigationProps) => (
  <div className="bg-white border border-slate-200 rounded-lg p-1 inline-flex gap-1">
    {['overview', 'usage', 'clients', 'costs'].map((tab) => (
      <button
        key={tab}
        onClick={() => setActiveTab(tab)}
        className={`px-6 py-2 rounded-md font-medium ${
          activeTab === tab ? 'bg-blue-600 text-white' : 'text-slate-600'
        }`}
      >
        {tab.charAt(0).toUpperCase() + tab.slice(1)}
      </button>
    ))}
  </div>
);

// Overview Tab Component
const OverviewTab = ({ isLoading }: OverviewTabProps) => {
  const [chartsLoaded, setChartsLoaded] = useState({
    main: false,
    model: false,
    activity: false
  });

  useEffect(() => {
    if (!isLoading) {
      const timers = [
        setTimeout(() => setChartsLoaded(prev => ({ ...prev, main: true })), 100),
        setTimeout(() => setChartsLoaded(prev => ({ ...prev, model: true })), 300),
        setTimeout(() => setChartsLoaded(prev => ({ ...prev, activity: true })), 500),
      ];
      return () => timers.forEach(timer => clearTimeout(timer));
    }
  }, [isLoading]);

  return (
    <div className="space-y-6">
      {/* Main Chart */}
      <div className="bg-white border border-slate-200 rounded-lg p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            Monthly Token Usage & Cost
          </h3>
          <p className="text-sm text-slate-500 mt-1">Token consumption and costs over time</p>
        </div>
        {isLoading || !chartsLoaded.main ? (
          <ChartSkeleton height={350} />
        ) : (
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={chartData.tokenUsage}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" tick={{ fill: '#64748b' }} />
              <YAxis
                yAxisId="left"
                tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
                tick={{ fill: '#64748b' }}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
                tick={{ fill: '#64748b' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar yAxisId="left" dataKey="tokens" fill="#3b82f6" name="Tokens" radius={[4, 4, 0, 0]} />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="cost"
                stroke="#ef4444"
                strokeWidth={3}
                name="Cost (USD)"
                dot={{ fill: '#ef4444', r: 4 }}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Two Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Model Distribution */}
        <div className="bg-white border border-slate-200 rounded-lg p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-slate-900">Model Distribution</h3>
            <p className="text-sm text-slate-500 mt-1">Token usage by AI model</p>
          </div>
          {isLoading || !chartsLoaded.model ? (
            <ChartSkeleton height={280} />
          ) : (
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={chartData.modelUsage}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(1)}%)`}
                  outerRadius={90}
                  innerRadius={50}
                  dataKey="tokens"
                >
                  {chartData.modelUsage.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Weekly Activity */}
        <div className="bg-white border border-slate-200 rounded-lg p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-slate-900">Weekly Activity</h3>
            <p className="text-sm text-slate-500 mt-1">Requests throughout the week</p>
          </div>
          {isLoading || !chartsLoaded.activity ? (
            <ChartSkeleton height={280} />
          ) : (
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={chartData.clientActivity}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="day" tick={{ fill: '#64748b' }} />
                <YAxis tick={{ fill: '#64748b' }} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="requests" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.2} />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
};

// Usage Tab Component
const UsageTab = ({ isLoading }: UsageTabProps) => {
  const [chartLoaded, setChartLoaded] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => setChartLoaded(true), 200);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-slate-900">Detailed Token Usage</h3>
        <p className="text-sm text-slate-500 mt-1">Comprehensive usage patterns over time</p>
      </div>
      {isLoading || !chartLoaded ? (
        <ChartSkeleton height={400} />
      ) : (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData.tokenUsage}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="month" tick={{ fill: '#64748b' }} />
            <YAxis tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`} tick={{ fill: '#64748b' }} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="tokens" fill="#3b82f6" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

// Clients Tab Component
const ClientsTab = ({ isLoading }: ClientsTabProps) => {
  const [chartsLoaded, setChartsLoaded] = useState({
    activity: false,
    reliability: false
  });

  useEffect(() => {
    if (!isLoading) {
      const timers = [
        setTimeout(() => setChartsLoaded(prev => ({ ...prev, activity: true })), 200),
        setTimeout(() => setChartsLoaded(prev => ({ ...prev, reliability: true })), 400),
      ];
      return () => timers.forEach(timer => clearTimeout(timer));
    }
  }, [isLoading]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Client Activity Chart */}
        <div className="bg-white border border-slate-200 rounded-lg p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-slate-900">Client Activity</h3>
            <p className="text-sm text-slate-500 mt-1">API requests and active users by day</p>
          </div>
          {isLoading || !chartsLoaded.activity ? (
            <ChartSkeleton height={300} />
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData.clientActivity}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="day" tick={{ fill: '#64748b' }} />
                <YAxis tick={{ fill: '#64748b' }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="requests" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="activeUsers" fill="#60a5fa" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Platform Reliability */}
        <div className="bg-white border border-slate-200 rounded-lg p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-600" />
              Platform Reliability
            </h3>
            <p className="text-sm text-slate-500 mt-1">Uptime metrics across platforms</p>
          </div>
          {isLoading || !chartsLoaded.reliability ? (
            <ChartSkeleton height={300} />
          ) : (
            <div className="space-y-4">
              {chartData.platformPerformance.map((platform, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: platform.uptime >= 99.8 ? '#3b82f6' : '#60a5fa' }}
                    />
                    <span className="font-medium text-slate-900">{platform.platform}</span>
                  </div>
                  <span className="text-sm font-semibold text-blue-600">{platform.uptime}% uptime</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Costs Tab Component
const CostsTab = ({ isLoading }: CostsTabProps) => {
  const [chartLoaded, setChartLoaded] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => setChartLoaded(true), 200);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-slate-900">Cost Breakdown by Model</h3>
        <p className="text-sm text-slate-500 mt-1">Development, inference, and maintenance costs</p>
      </div>
      {isLoading || !chartLoaded ? (
        <ChartSkeleton height={400} />
      ) : (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData.costAnalysis}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="model" tick={{ fill: '#64748b' }} />
            <YAxis tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`} tick={{ fill: '#64748b' }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="development" stackId="cost" fill="#3b82f6" />
            <Bar dataKey="inference" stackId="cost" fill="#60a5fa" />
            <Bar dataKey="maintenance" stackId="cost" fill="#93c5fd" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

 

// ============================================
// MAIN COMPONENT
// ============================================
export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [isExporting, setIsExporting] = useState(false);
  const [timeFilter, setTimeFilter] = useState('30D');
  const [hasAgents, setHasAgents] = useState(true); // Set to false to show empty state

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Reload data when time filter changes
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, [timeFilter]);

  const handleExport = async () => {
    setIsExporting(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    alert('Report exported successfully!');
    setIsExporting(false);
  };

  // If no agents, show empty state instead of the main dashboard content
  if (!hasAgents) {
    return (
      <div className="min-h-screen bg-slate-50 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <Header 
            isExporting={isExporting} 
            handleExport={handleExport}
            timeFilter={timeFilter}
            setTimeFilter={setTimeFilter}
          />
          <StatsGrid isLoading={isLoading} />
          
          {/* Empty State replaces the tab navigation and chart content */}
          <EmptyState />
          
  
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <Header 
          isExporting={isExporting} 
          handleExport={handleExport}
          timeFilter={timeFilter}
          setTimeFilter={setTimeFilter}
        />
        <StatsGrid isLoading={isLoading} />
        <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
        
        {activeTab === 'overview' && <OverviewTab isLoading={isLoading} />}
        {activeTab === 'usage' && <UsageTab isLoading={isLoading} />}
        {activeTab === 'clients' && <ClientsTab isLoading={isLoading} />}
        {activeTab === 'costs' && <CostsTab isLoading={isLoading} />}
        
       </div>
    </div>
  );
}