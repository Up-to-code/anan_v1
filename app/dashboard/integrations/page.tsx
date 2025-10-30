'use client';

import { useState } from 'react';
import { Plus, Zap, BarChart2, Play, CheckCircle2 } from 'lucide-react';
import { initialIntegrations, initialAutomations } from '@/components/integrations/data';
import type { IntegrationType, AutomationType } from '@/components/integrations/types';
import { IntegrationCard } from '@/components/integrations/IntegrationCard';
import { AddIntegrationCard } from '@/components/integrations/AddIntegrationCard';
import { AutomationCard } from '@/components/integrations/AutomationCard';
import { AddAutomationCard } from '@/components/integrations/AddAutomationCard';
import { PlugIcon } from '@/components/integrations/PlugIcon';

export default function IntegrationsPage() {
  const [integrations, setIntegrations] = useState<IntegrationType[]>(initialIntegrations);
  const [automations, setAutomations] = useState<AutomationType[]>(initialAutomations);

  const handleToggleIntegration = (id: string) => {
    setIntegrations((prev) =>
      prev.map((integration) =>
        integration.id === id ? { ...integration, connected: !integration.connected } : integration
      )
    );
  };

  const handleToggleAutomation = (id: string) => {
    setAutomations((prev) =>
      prev.map((automation) =>
        automation.id === id
          ? {
              ...automation,
              status: automation.status === 'active' ? 'paused' : 'active',
            }
          : automation
      )
    );
  };

  const connectedCount = integrations.filter((i) => i.connected).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
            <Zap className="text-blue-500" size={24} />
            Integrations
          </h1>
          <p className="text-gray-600 flex items-center gap-2">
            <BarChart2 size={16} className="mr-1" />
            Connect your favorite apps and services
          </p>
        </div>
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <PlugIcon />
              Apps & Services
            </h2>
            <div className="text-sm text-gray-600 flex items-center gap-1">
              <CheckCircle2 size={15} className="mr-1 text-green-500" />
              {connectedCount} of {integrations.length} connected
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {integrations.map((integration) => (
              <IntegrationCard
                key={integration.id}
                integration={integration}
                onToggle={handleToggleIntegration}
              />
            ))}
            <AddIntegrationCard />
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <Play size={18} />
              Automations
            </h2>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 flex items-center">
              <Plus size={16} className="mr-2" />
              New Automation
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {automations.map((automation) => (
              <AutomationCard
                key={automation.id}
                automation={automation}
                onToggle={handleToggleAutomation}
              />
            ))}
            <AddAutomationCard />
          </div>
        </div>
      </div>
    </div>
  );
}
