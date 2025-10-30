/* eslint-disable @typescript-eslint/no-explicit-any */
// app/agents/page.tsx
'use client';

import { useState } from 'react';
import { 
  Plus,
  Search,
  Filter,
  MessageCircle,
  Zap,
  Settings,
  Play,
  Pause,
  Edit,
  Trash2,
  Bot,
  User,
  Clock,
  BarChart3,
  MoreVertical
} from 'lucide-react';

interface Agent {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'paused' | 'draft';
  type: 'customer-support' | 'sales' | 'onboarding' | 'technical';
  model: string;
  lastActive: string;
  conversations: number;
  satisfaction: number;
}

interface Conversation {
  id: string;
  agentId: string;
  customer: string;
  lastMessage: string;
  timestamp: string;
  status: 'active' | 'resolved' | 'pending';
}

export default function AgentsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'paused' | 'draft'>('all');
  const [filterType, setFilterType] = useState<'all' | 'customer-support' | 'sales' | 'onboarding' | 'technical'>('all');
  
  const [agents, setAgents] = useState<Agent[]>([
    {
      id: '1',
      name: 'Customer Support Bot',
      description: 'Handles common customer inquiries and support tickets',
      status: 'active',
      type: 'customer-support',
      model: 'gpt-4',
      lastActive: '2 minutes ago',
      conversations: 1247,
      satisfaction: 92
    },
    {
      id: '2',
      name: 'Sales Assistant',
      description: 'Qualifies leads and schedules product demos',
      status: 'active',
      type: 'sales',
      model: 'gpt-4',
      lastActive: '5 minutes ago',
      conversations: 843,
      satisfaction: 88
    },
    {
      id: '3',
      name: 'Onboarding Guide',
      description: 'Helps new users get started with the platform',
      status: 'paused',
      type: 'onboarding',
      model: 'gpt-3.5-turbo',
      lastActive: '1 hour ago',
      conversations: 312,
      satisfaction: 95
    },
    {
      id: '4',
      name: 'Technical Support',
      description: 'Assists with technical issues and bug reports',
      status: 'draft',
      type: 'technical',
      model: 'gpt-4',
      lastActive: 'Never',
      conversations: 0,
      satisfaction: 0
    }
  ]);

  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: '1',
      agentId: '1',
      customer: 'sarah@example.com',
      lastMessage: 'How do I reset my password?',
      timestamp: '2 min ago',
      status: 'active'
    },
    {
      id: '2',
      agentId: '2',
      customer: 'mike@company.com',
      lastMessage: 'Interested in enterprise pricing',
      timestamp: '5 min ago',
      status: 'active'
    },
    {
      id: '3',
      agentId: '1',
      customer: 'jane@startup.io',
      lastMessage: 'Issue resolved, thank you!',
      timestamp: '1 hour ago',
      status: 'resolved'
    }
  ]);

  const toggleAgentStatus = (id: string) => {
    setAgents(agents.map(agent => 
      agent.id === id 
        ? { 
            ...agent, 
            status: agent.status === 'active' ? 'paused' : 'active',
            lastActive: agent.status === 'active' ? agent.lastActive : 'Just now'
          }
        : agent
    ));
  };

  const deleteAgent = (id: string) => {
    setAgents(agents.filter(agent => agent.id !== id));
  };

  const filteredAgents = agents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         agent.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || agent.status === filterStatus;
    const matchesType = filterType === 'all' || agent.type === filterType;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'customer-support': return <MessageCircle size={16} />;
      case 'sales': return <Zap size={16} />;
      case 'onboarding': return <User size={16} />;
      case 'technical': return <Settings size={16} />;
      default: return <Bot size={16} />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'customer-support': return 'bg-blue-100 text-blue-800';
      case 'sales': return 'bg-purple-100 text-purple-800';
      case 'onboarding': return 'bg-green-100 text-green-800';
      case 'technical': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
                <span className="text-white font-semibold text-sm">E</span>
              </div>
              <span className="ml-3 text-lg font-semibold text-gray-900">Emailly</span>
            </div>
            <nav className="flex items-center space-x-6">
              <a href="/dashboard" className="text-gray-600 hover:text-gray-900 text-sm">Dashboard</a>
              <a href="/agents" className="text-gray-900 font-medium text-sm">Agents</a>
              <a href="/integrations" className="text-gray-600 hover:text-gray-900 text-sm">Integrations</a>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">AI Agents</h1>
            <p className="text-gray-600">Manage your automated assistants and their conversations</p>
          </div>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-600 flex items-center">
            <Plus size={16} className="mr-2" />
            New Agent
          </button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Agents</p>
                <p className="text-2xl font-bold text-gray-900">{agents.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Bot size={24} className="text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Conversations</p>
                <p className="text-2xl font-bold text-gray-900">
                  {conversations.filter(c => c.status === 'active').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <MessageCircle size={24} className="text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg. Satisfaction</p>
                <p className="text-2xl font-bold text-gray-900">
                  {Math.round(agents.reduce((acc, agent) => acc + agent.satisfaction, 0) / agents.length)}%
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <BarChart3 size={24} className="text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Conversations</p>
                <p className="text-2xl font-bold text-gray-900">
                  {agents.reduce((acc, agent) => acc + agent.conversations, 0)}
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Clock size={24} className="text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Agents List */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-gray-200 rounded-lg">
              {/* Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">Your Agents</h2>
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search agents..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                      <Filter size={16} className="text-gray-600" />
                    </button>
                  </div>
                </div>

                {/* Filters */}
                <div className="flex space-x-4">
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value as any)}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="paused">Paused</option>
                    <option value="draft">Draft</option>
                  </select>

                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value as any)}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="all">All Types</option>
                    <option value="customer-support">Customer Support</option>
                    <option value="sales">Sales</option>
                    <option value="onboarding">Onboarding</option>
                    <option value="technical">Technical</option>
                  </select>
                </div>
              </div>

              {/* Agents Grid */}
              <div className="p-6">
                <div className="grid grid-cols-1 gap-4">
                  {filteredAgents.map(agent => (
                    <div key={agent.id} className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                            {getTypeIcon(agent.type)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h3 className="font-semibold text-gray-900">{agent.name}</h3>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(agent.status)}`}>
                                {agent.status}
                              </span>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(agent.type)} flex items-center`}>
                                {getTypeIcon(agent.type)}
                                <span className="ml-1">{agent.type.replace('-', ' ')}</span>
                              </span>
                            </div>
                            <p className="text-gray-600 text-sm mb-2">{agent.description}</p>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <span>Model: {agent.model}</span>
                              <span>Last active: {agent.lastActive}</span>
                              <span>{agent.conversations} conversations</span>
                              <span>{agent.satisfaction}% satisfaction</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => toggleAgentStatus(agent.id)}
                            className={`p-2 rounded-lg ${
                              agent.status === 'active' 
                                ? 'text-green-600 hover:bg-green-50' 
                                : 'text-gray-400 hover:bg-gray-50'
                            }`}
                          >
                            {agent.status === 'active' ? <Pause size={16} /> : <Play size={16} />}
                          </button>
                          <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-50">
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => deleteAgent(agent.id)}
                            className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Recent Conversations */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-200 rounded-lg">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Recent Conversations</h2>
              </div>

              <div className="p-6">
                <div className="space-y-4">
                  {conversations.map(conversation => {
                    const agent = agents.find(a => a.id === conversation.agentId);
                    return (
                      <div key={conversation.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                              <User size={14} className="text-gray-600" />
                            </div>
                            <span className="font-medium text-gray-900 text-sm">{conversation.customer}</span>
                          </div>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            conversation.status === 'active' 
                              ? 'bg-blue-100 text-blue-800'
                              : conversation.status === 'resolved'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {conversation.status}
                          </span>
                        </div>
                        
                        <p className="text-gray-600 text-sm mb-2">{conversation.lastMessage}</p>
                        
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>via {agent?.name}</span>
                          <span>{conversation.timestamp}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <button className="w-full mt-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 text-sm">
                  View All Conversations
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}