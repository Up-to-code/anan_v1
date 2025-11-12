"use client";
import React, { useState } from "react";
import Head from "next/head";
import {
  Users,
  MessageCircle,
  Zap,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Settings,
  Plus,
  Eye,
  Download,
  Calendar,
  Mail,
  Globe,
  Instagram,
  Facebook,
  MessageSquare,
  CheckCircle,
  XCircle,
  ArrowRight,
  MoreVertical,
  Bell,
  Search,
} from "lucide-react";

// Types
interface StatCard {
  title: string;
  value: string;
  change: number;
  trend: "up" | "down";
  icon: React.ElementType;
}

interface Integration {
  id: string;
  name: string;
  type: string;
  status: "connected" | "disconnected" | "error";
  icon: React.ElementType;
  lastActive: string;
}

interface Conversation {
  id: string;
  customer: string;
  platform: string;
  status: "active" | "waiting" | "resolved";
  time: string;
}

// Mock Data
const STAT_CARDS: StatCard[] = [
  {
    title: "Total Customers",
    value: "2,847",
    change: 12,
    trend: "up",
    icon: Users,
  },
  {
    title: "Active Conversations",
    value: "156",
    change: 8,
    trend: "up",
    icon: MessageCircle,
  },
  {
    title: "Tokens Used",
    value: "1.2M",
    change: 23,
    trend: "up",
    icon: Zap,
  },
  {
    title: "Response Time",
    value: "1.4s",
    change: -5,
    trend: "down",
    icon: BarChart3,
  },
];

const INTEGRATIONS: Integration[] = [
  {
    id: "1",
    name: "WhatsApp",
    type: "Messaging",
    status: "connected",
    icon: MessageCircle,
    lastActive: "2 min ago",
  },
  {
    id: "2",
    name: "Website Chat",
    type: "Web",
    status: "connected",
    icon: Globe,
    lastActive: "Just now",
  },
  {
    id: "3",
    name: "Instagram",
    type: "Social",
    status: "connected",
    icon: Instagram,
    lastActive: "5 min ago",
  },
  {
    id: "4",
    name: "Email",
    type: "Communication",
    status: "disconnected",
    icon: Mail,
    lastActive: "1 hour ago",
  },
];

const RECENT_CONVERSATIONS: Conversation[] = [
  {
    id: "1",
    customer: "Sarah Johnson",
    platform: "whatsapp",
    status: "active",
    time: "2 min ago",
  },
  {
    id: "2",
    customer: "Mike Chen",
    platform: "website",
    status: "active",
    time: "5 min ago",
  },
  {
    id: "3",
    customer: "Emma Davis",
    platform: "instagram",
    status: "waiting",
    time: "8 min ago",
  },
  {
    id: "4",
    customer: "Alex Rodriguez",
    platform: "email",
    status: "resolved",
    time: "12 min ago",
  },
];

// Components
const WelcomeHeader = () => {
  const currentTime = new Date();
  const hours = currentTime.getHours();
  let greeting = "Good evening";
  
  if (hours < 12) greeting = "Good morning";
  else if (hours < 18) greeting = "Good afternoon";

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6 mb-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">
            {greeting}, Michael! 👋
          </h1>
          <p className="text-slate-600">
            Here's what's happening with your customer service agents today.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white w-64"
            />
          </div>
          <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
            <Bell className="w-5 h-5 text-slate-600" />
          </button>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ stat }: { stat: StatCard }) => {
  const Icon = stat.icon;
  
  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center">
          <Icon className="w-6 h-6 text-blue-600" />
        </div>
        <div className={`flex items-center gap-1 text-sm font-medium ${
          stat.trend === "up" ? "text-blue-600" : "text-red-600"
        }`}>
          {stat.trend === "up" ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
          {Math.abs(stat.change)}%
        </div>
      </div>
      <h3 className="text-2xl font-bold text-slate-900 mb-1">{stat.value}</h3>
      <p className="text-slate-600 text-sm">{stat.title}</p>
    </div>
  );
};

const CleanBarChart = () => {
  const data = [45, 52, 48, 61, 55, 38, 32];
  const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const maxValue = Math.max(...data);

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold text-slate-900">Weekly Activity</h3>
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <Calendar className="w-4 h-4" />
          <span>Last 7 days</span>
        </div>
      </div>
      
      <div className="flex items-end justify-between h-32 gap-1">
        {data.map((value, index) => {
          const height = (value / maxValue) * 80;
          return (
            <div key={labels[index]} className="flex flex-col items-center flex-1">
              <div
                className="w-full bg-blue-500 rounded-t transition-all hover:bg-blue-600"
                style={{ height: `${height}%` }}
              />
              <span className="text-xs text-slate-500 mt-2">{labels[index]}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const CleanLineChart = () => {
  const data = [32, 45, 28, 51, 42, 65, 58, 48, 62, 55, 48, 52];
  const maxValue = Math.max(...data);

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6">
      <h3 className="font-semibold text-slate-900 mb-6">Response Time Trend</h3>
      
      <div className="relative h-32">
        <svg viewBox="0 0 300 100" className="w-full h-full">
          {/* Grid lines */}
          {[0, 25, 50, 75, 100].map((y) => (
            <line
              key={y}
              x1="0"
              y1={y}
              x2="300"
              y2={y}
              stroke="#e2e8f0"
              strokeWidth="1"
            />
          ))}
          
          {/* Line */}
          <polyline
            fill="none"
            stroke="#3b82f6"
            strokeWidth="2"
            points={data.map((value, index) => 
              `${(index / (data.length - 1)) * 300},${100 - (value / maxValue) * 100}`
            ).join(' ')}
          />
          
          {/* Dots */}
          {data.map((value, index) => (
            <circle
              key={index}
              cx={(index / (data.length - 1)) * 300}
              cy={100 - (value / maxValue) * 100}
              r="3"
              fill="#3b82f6"
            />
          ))}
        </svg>
      </div>
      
      <div className="flex justify-between mt-4 text-xs text-slate-500">
        <span>Jan</span>
        <span>Dec</span>
      </div>
    </div>
  );
};

const PlatformDistribution = () => {
  const platforms = [
    { name: "WhatsApp", percentage: 45, color: "bg-green-500" },
    { name: "Website", percentage: 30, color: "bg-blue-500" },
    { name: "Instagram", percentage: 15, color: "bg-pink-500" },
    { name: "Email", percentage: 10, color: "bg-slate-500" },
  ];

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6">
      <h3 className="font-semibold text-slate-900 mb-6">Platform Usage</h3>
      
      <div className="space-y-4">
        {platforms.map((platform) => (
          <div key={platform.name} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${platform.color}`}></div>
              <span className="text-sm text-slate-700">{platform.name}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-20 bg-slate-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${platform.color} transition-all`}
                  style={{ width: `${platform.percentage}%` }}
                />
              </div>
              <span className="text-sm font-medium text-slate-900 w-8">{platform.percentage}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const IntegrationCard = ({ integration }: { integration: Integration }) => {
  const Icon = integration.icon;
  const statusColors = {
    connected: "bg-blue-100 text-blue-700",
    disconnected: "bg-slate-100 text-slate-700",
    error: "bg-red-100 text-red-700",
  };

  const StatusIcon = integration.status === "connected" ? CheckCircle : XCircle;

  return (
    <div className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-lg">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
          <Icon className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <h4 className="font-semibold text-slate-900">{integration.name}</h4>
          <p className="text-sm text-slate-600">{integration.type}</p>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="text-right">
          <div className="flex items-center gap-1">
            <StatusIcon className={`w-3 h-3 ${
              integration.status === "connected" ? "text-blue-500" : "text-slate-500"
            }`} />
            <span className={`text-xs font-medium ${statusColors[integration.status]}`}>
              {integration.status}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">{integration.lastActive}</p>
        </div>
        <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
          <MoreVertical className="w-4 h-4 text-slate-600" />
        </button>
      </div>
    </div>
  );
};

const RecentConversations = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-blue-100 text-blue-700";
      case "waiting": return "bg-amber-100 text-amber-700";
      case "resolved": return "bg-green-100 text-green-700";
      default: return "bg-slate-100 text-slate-700";
    }
  };

  const getPlatformIcon = (platform: string) => {
    const icons: { [key: string]: React.ElementType } = {
      whatsapp: MessageCircle,
      website: Globe,
      instagram: Instagram,
      email: Mail,
    };
    return icons[platform] || MessageCircle;
  };

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold text-slate-900">Recent Conversations</h3>
        <button className="flex items-center gap-2 px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
          <span className="text-sm font-medium">View All</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
      
      <div className="space-y-3">
        {RECENT_CONVERSATIONS.map((conversation) => {
          const PlatformIcon = getPlatformIcon(conversation.platform);
          
          return (
            <div key={conversation.id} className="flex items-center justify-between p-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                  <PlatformIcon className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-slate-900 text-sm">{conversation.customer}</p>
                  <p className="text-xs text-slate-500 capitalize">{conversation.platform}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(conversation.status)}`}>
                  {conversation.status}
                </span>
                <span className="text-xs text-slate-500">{conversation.time}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Main Dashboard Component
const Dashboard = () => {
  return (
    <>
      <Head>
        <title>Dashboard - Customer Service Platform</title>
        <meta name="description" content="Manage your customer service agents and conversations" />
      </Head>

      <div className="min-h-screen bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          {/* Welcome Header */}
          <WelcomeHeader />

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {STAT_CARDS.map((stat, index) => (
              <StatCard key={index} stat={stat} />
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Charts */}
            <div className="lg:col-span-2 space-y-6">
              {/* Bar Chart */}
              <CleanBarChart />
              
              {/* Line Chart */}
              <CleanLineChart />
              
              {/* Integrations */}
              <div className="bg-white rounded-lg border border-slate-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-slate-900">Active Integrations</h2>
                  <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <Plus className="w-4 h-4" />
                    <span className="text-sm font-medium">Add Integration</span>
                  </button>
                </div>
                <div className="space-y-3">
                  {INTEGRATIONS.map((integration) => (
                    <IntegrationCard key={integration.id} integration={integration} />
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Platform Distribution */}
              <PlatformDistribution />
              
              {/* Recent Conversations */}
              <RecentConversations />
              
              {/* Quick Stats */}
              <div className="bg-white rounded-lg border border-slate-200 p-6">
                <h3 className="font-semibold text-slate-900 mb-4">Performance</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm text-slate-600 mb-1">
                      <span>Success Rate</span>
                      <span>98%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '98%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm text-slate-600 mb-1">
                      <span>Customer Satisfaction</span>
                      <span>94%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '94%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm text-slate-600 mb-1">
                      <span>Response Time</span>
                      <span>1.4s</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className="bg-amber-500 h-2 rounded-full" style={{ width: '92%' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;