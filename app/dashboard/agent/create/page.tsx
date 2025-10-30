/* eslint-disable @typescript-eslint/no-explicit-any */
// app/agents/create/page.tsx
'use client';

import { useState } from 'react';
import { 
  ArrowLeft,
  CheckCircle,
  Bot,
  MessageCircle,
  Shield,
  Users,
  Plus,
  Trash2
} from 'lucide-react';

interface AgentConfig {
  name: string;
  description: string;
  model: string;
  language: string;
  channels: string[];
  prompt: string;
  rules: string[];
  access: string;
}

export default function CreateAgentPage() {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);
  const [customRules, setCustomRules] = useState(['Be helpful and professional']);
  const [newRule, setNewRule] = useState('');

  const [config, setConfig] = useState<AgentConfig>({
    name: 'Customer Support',
    description: 'Help customers with questions and issues',
    model: 'gpt-4',
    language: 'en',
    channels: ['whatsapp', 'email'],
    prompt: 'You are a helpful customer support agent. Answer questions clearly and be friendly.',
    rules: ['professional', 'helpful'],
    access: 'respond'
  });

  const channels = [
    { id: 'whatsapp', name: 'WhatsApp' },
    { id: 'email', name: 'Email' },
    { id: 'website', name: 'Website' },
    { id: 'telegram', name: 'Telegram' }
  ];

  const models = [
    { id: 'gpt-4', name: 'GPT-4' },
    { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo' }
  ];

  const rules = [
    { id: 'professional', name: 'Professional' },
    { id: 'friendly', name: 'Friendly' },
    { id: 'helpful', name: 'Helpful' },
    { id: 'quick', name: 'Quick responses' }
  ];

  const accessLevels = [
    { id: 'view', name: 'View only' },
    { id: 'respond', name: 'Can respond' },
    { id: 'manage', name: 'Full access' }
  ];

  const steps = [
    { 
      number: 1, 
      title: 'Basic info', 
      icon: Bot,
      description: 'Name and setup'
    },
    { 
      number: 2, 
      title: 'Channels', 
      icon: MessageCircle,
      description: 'Where it works'
    },
    { 
      number: 3, 
      title: 'Behavior', 
      icon: Shield,
      description: 'Style and rules'
    },
    { 
      number: 4, 
      title: 'Access', 
      icon: Users,
      description: 'Permissions'
    }
  ];

  const updateConfig = (field: keyof AgentConfig, value: any) => {
    setConfig(prev => ({ ...prev, [field]: value }));
  };

  const toggleChannel = (channelId: string) => {
    const newChannels = config.channels.includes(channelId)
      ? config.channels.filter(id => id !== channelId)
      : [...config.channels, channelId];
    updateConfig('channels', newChannels);
  };

  const toggleRule = (ruleId: string) => {
    const newRules = config.rules.includes(ruleId)
      ? config.rules.filter(id => id !== ruleId)
      : [...config.rules, ruleId];
    updateConfig('rules', newRules);
  };

  const addCustomRule = () => {
    if (newRule.trim()) {
      setCustomRules([...customRules, newRule.trim()]);
      setNewRule('');
    }
  };

  const removeCustomRule = (index: number) => {
    setCustomRules(customRules.filter((_, i) => i !== index));
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return config.name.trim().length > 0;
      case 2: return config.channels.length > 0;
      case 3: return true;
      case 4: return true;
      default: return false;
    }
  };

  const handleCreate = () => {
    console.log('Creating agent:', config);
    window.location.href = '/agents';
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <a href="/agents" className="flex items-center text-gray-600 hover:text-gray-900 text-sm">
            <ArrowLeft size={16} className="mr-2" />
            Back to Agents
          </a>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Steps Sidebar - Meta Style */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Create agent</h2>
              
              <div className="space-y-2">
                {steps.map((step, index) => {
                  const Icon = step.icon;
                  const isCompleted = currentStep > step.number;
                  const isCurrent = currentStep === step.number;
                  
                  return (
                    <div key={step.number} className="relative">
                      <button
                        onClick={() => setCurrentStep(step.number as any)}
                        className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-colors ${
                          isCurrent ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50'
                        }`}
                      >
                        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                          isCompleted 
                            ? 'bg-green-500 text-white'
                            : isCurrent
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 text-gray-500'
                        }`}>
                          {isCompleted ? <CheckCircle size={16} /> : <Icon size={16} />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-medium ${
                            isCompleted || isCurrent ? 'text-gray-900' : 'text-gray-600'
                          }`}>
                            {step.title}
                          </p>
                          <p className="text-xs text-gray-500 mt-0.5">
                            {step.description}
                          </p>
                        </div>
                      </button>
                      
                      {/* Connecting line */}
                      {index < steps.length - 1 && (
                        <div className={`absolute left-4 top-12 w-0.5 h-6 ${
                          isCompleted ? 'bg-green-500' : 'bg-gray-200'
                        }`} />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="p-8">
                {/* Step 1: Basic Info */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900 mb-2">Basic information</h2>
                      <p className="text-gray-600">Set up your agent&#39;s identity</p>
                    </div>

                    <div className="space-y-5">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Agent name
                        </label>
                        <input
                          type="text"
                          value={config.name}
                          onChange={(e) => updateConfig('name', e.target.value)}
                          className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Support Agent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Description
                        </label>
                        <textarea
                          value={config.description}
                          onChange={(e) => updateConfig('description', e.target.value)}
                          rows={3}
                          className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                          placeholder="What does this agent do?"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            AI model
                          </label>
                          <select
                            value={config.model}
                            onChange={(e) => updateConfig('model', e.target.value)}
                            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          >
                            {models.map(model => (
                              <option key={model.id} value={model.id}>{model.name}</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Language
                          </label>
                          <select
                            value={config.language}
                            onChange={(e) => updateConfig('language', e.target.value)}
                            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          >
                            <option value="en">English</option>
                            <option value="ar">Arabic</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Channels */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900 mb-2">Channels</h2>
                      <p className="text-gray-600">Where your agent will communicate</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {channels.map(channel => {
                        const isSelected = config.channels.includes(channel.id);
                        return (
                          <button
                            key={channel.id}
                            onClick={() => toggleChannel(channel.id)}
                            className={`p-4 border-2 rounded-lg text-left transition-all ${
                              isSelected
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-medium text-gray-900">{channel.name}</span>
                              {isSelected && <CheckCircle size={18} className="text-blue-500" />}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Step 3: Behavior */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900 mb-2">Behavior</h2>
                      <p className="text-gray-600">Define how your agent should act</p>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Communication style
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          {rules.map(rule => {
                            const isSelected = config.rules.includes(rule.id);
                            return (
                              <button
                                key={rule.id}
                                onClick={() => toggleRule(rule.id)}
                                className={`p-3 border-2 rounded-lg text-left transition-all ${
                                  isSelected
                                    ? 'border-blue-500 bg-blue-50'
                                    : 'border-gray-200 hover:border-gray-300'
                                }`}
                              >
                                <div className="flex items-center justify-between">
                                  <span className="font-medium text-gray-900 text-sm">{rule.name}</span>
                                  {isSelected && <CheckCircle size={16} className="text-blue-500" />}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Instructions
                        </label>
                        <textarea
                          value={config.prompt}
                          onChange={(e) => updateConfig('prompt', e.target.value)}
                          rows={4}
                          className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                          placeholder="Add specific instructions for your agent..."
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Custom rules
                        </label>
                        <div className="space-y-2 mb-3">
                          {customRules.map((rule, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
                              <span className="text-sm text-gray-700">{rule}</span>
                              <button
                                onClick={() => removeCustomRule(index)}
                                className="p-1 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={newRule}
                            onChange={(e) => setNewRule(e.target.value)}
                            placeholder="Add a custom rule..."
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                          />
                          <button
                            onClick={addCustomRule}
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 4: Access */}
                {currentStep === 4 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900 mb-2">Access control</h2>
                      <p className="text-gray-600">Set permissions for team members</p>
                    </div>

                    <div className="space-y-4">
                      {accessLevels.map(level => {
                        const isSelected = config.access === level.id;
                        return (
                          <button
                            key={level.id}
                            onClick={() => updateConfig('access', level.id)}
                            className={`w-full p-4 border-2 rounded-lg text-left transition-all ${
                              isSelected
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="font-medium text-gray-900">{level.name}</div>
                              </div>
                              {isSelected && <CheckCircle size={18} className="text-blue-500" />}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Navigation Footer */}
              <div className="px-8 py-6 bg-gray-50 border-t border-gray-200 rounded-b-lg">
                <div className="flex justify-between">
                  {currentStep > 1 ? (
                    <button
                      onClick={() => setCurrentStep(currentStep - 1 as any)}
                      className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                    >
                      Back
                    </button>
                  ) : (
                    <div></div>
                  )}

                  {currentStep < 4 ? (
                    <button
                      onClick={() => setCurrentStep(currentStep + 1 as any)}
                      disabled={!canProceed()}
                      className="px-6 py-2.5 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Continue
                    </button>
                  ) : (
                    <button
                      onClick={handleCreate}
                      className="px-6 py-2.5 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors flex items-center"
                    >
                      <CheckCircle size={16} className="mr-2" />
                      Create agent
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}