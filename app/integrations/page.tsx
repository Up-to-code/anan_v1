// app/integrations/page.tsx
'use client';

import { useState } from 'react';
import { 
  MessageCircle, 
  Send, 
  Instagram,
  Mail,
  Slack,
  Chrome,
  Check,
  Play,
  Pause,
  Plus
} from 'lucide-react';

interface Integration {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  connected: boolean;
  category: string;
}

interface Automation {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'paused';
}

export default function IntegrationsPage() {
  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      description: 'Send messages and campaigns',
      icon: <MessageCircle size={24} />,
      connected: true,
      category: 'messaging'
    },
    {
      id: 'telegram',
      name: 'Telegram',
      description: 'Connect with bots and channels',
      icon: <Send size={24} />,
      connected: true,
      category: 'messaging'
    },
    {
      id: 'instagram',
      name: 'Instagram',
      description: 'Schedule posts and stories',
      icon: <Instagram size={24} />,
      connected: false,
      category: 'social'
    },
    {
      id: 'gmail',
      name: 'Gmail',
      description: 'Sync with your Gmail account',
      icon: <Mail size={24} />,
      connected: false,
      category: 'email'
    },
    {
      id: 'slack',
      name: 'Slack',
      description: 'Get notifications in Slack',
      icon: <Slack size={24} />,
      connected: true,
      category: 'productivity'
    },
    {
      id: 'chrome',
      name: 'Chrome Extension',
      description: 'Quick access from browser',
      icon: <Chrome size={24} />,
      connected: false,
      category: 'tools'
    }
  ]);

  const [automations, setAutomations] = useState<Automation[]>([
    { 
      id: '1', 
      name: 'Welcome Message', 
      description: 'Send welcome to new users',
      status: 'active' 
    },
    { 
      id: '2', 
      name: 'Weekly Digest', 
      description: 'Weekly summary email',
      status: 'paused' 
    },
    { 
      id: '3', 
      name: 'Post Alert', 
      description: 'Notify about new content',
      status: 'active' 
    }
  ]);

  const toggleIntegration = (id: string) => {
    setIntegrations(integrations.map(integration => 
      integration.id === id 
        ? { ...integration, connected: !integration.connected }
        : integration
    ));
  };

  const toggleAutomation = (id: string) => {
    setAutomations(automations.map(automation =>
      automation.id === id
        ? { ...automation, status: automation.status === 'active' ? 'paused' : 'active' }
        : automation
    ));
  };

  const connectedCount = integrations.filter(i => i.connected).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
              <span className="text-white font-semibold text-sm">E</span>
            </div>
            <span className="ml-3 text-lg font-semibold text-gray-900">Emailly</span>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Integrations</h1>
          <p className="text-gray-600">Connect your favorite apps and services</p>
        </div>

        {/* Stats Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
            <div className="text-2xl font-bold text-gray-900">{connectedCount}</div>
            <div className="text-gray-600 text-sm">Connected</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
            <div className="text-2xl font-bold text-gray-900">{integrations.length}</div>
            <div className="text-gray-600 text-sm">Available</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
            <div className="text-2xl font-bold text-gray-900">{automations.filter(a => a.status === 'active').length}</div>
            <div className="text-gray-600 text-sm">Active</div>
          </div>
        </div>

        {/* Integrations Grid */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Apps & Services</h2>
            <div className="text-sm text-gray-600">
              {connectedCount} of {integrations.length} connected
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {integrations.map(integration => (
              <div key={integration.id} className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    integration.connected ? 'bg-green-500' : 'bg-gray-100'
                  }`}>
                    <div className={integration.connected ? 'text-white' : 'text-gray-600'}>
                      {integration.icon}
                    </div>
                  </div>
                  
                  {integration.connected && (
                    <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      Connected
                    </div>
                  )}
                </div>

                <h3 className="font-semibold text-gray-900 mb-2">{integration.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{integration.description}</p>

                <button
                  onClick={() => toggleIntegration(integration.id)}
                  className={`w-full py-2 px-4 rounded-lg text-sm font-medium ${
                    integration.connected
                      ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                  }`}
                >
                  {integration.connected ? 'Disconnect' : 'Connect'}
                </button>
              </div>
            ))}

            {/* Add New Card */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 border-dashed hover:border-blue-300 transition-colors cursor-pointer">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                <Plus size={24} className="text-gray-400" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Request Integration</h3>
              <p className="text-gray-600 text-sm mb-4">Need another app? Let us know</p>
              <button className="w-full py-2 px-4 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                Suggest App
              </button>
            </div>
          </div>
        </div>

        {/* Automations Grid */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Automations</h2>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 flex items-center">
              <Plus size={16} className="mr-2" />
              New Automation
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {automations.map(automation => (
              <div key={automation.id} className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    automation.status === 'active' ? 'bg-green-500' : 'bg-gray-300'
                  }`} />
                  
                  <button
                    onClick={() => toggleAutomation(automation.id)}
                    className={`p-2 rounded-lg ${
                      automation.status === 'active' 
                        ? 'text-green-600 hover:bg-green-50' 
                        : 'text-gray-400 hover:bg-gray-50'
                    }`}
                  >
                    {automation.status === 'active' ? <Pause size={16} /> : <Play size={16} />}
                  </button>
                </div>

                <h3 className="font-semibold text-gray-900 mb-2">{automation.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{automation.description}</p>

                <div className="flex items-center justify-between">
                  <span className={`text-sm font-medium ${
                    automation.status === 'active' ? 'text-green-600' : 'text-gray-400'
                  }`}>
                    {automation.status === 'active' ? 'Running' : 'Paused'}
                  </span>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    Edit
                  </button>
                </div>
              </div>
            ))}

            {/* Add New Automation Card */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 border-dashed hover:border-blue-300 transition-colors cursor-pointer">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                <Plus size={24} className="text-gray-400" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Create Automation</h3>
              <p className="text-gray-600 text-sm">Build a new workflow</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}