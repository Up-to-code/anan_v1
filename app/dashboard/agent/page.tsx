"use client";
import React, { useState, useEffect, useRef, ReactNode } from 'react';
import Head from 'next/head';
import {
  Workflow, Settings, Play, Clock, Activity,
  Plus, MessageCircle, Mail, Users, BarChart3,
  X, Save, Type, FileText, Cpu, ChevronDown,
  ChevronUp, Search, Filter, MoreVertical,
  Download, Upload, Trash2, Edit3, AlertCircle,
  CheckCircle, PauseCircle, Loader2
} from 'lucide-react';

// Types
interface Integration {
  name: string;
  type: keyof typeof INTEGRATION_ICONS;
}

interface Agent {
  id: string;
  name: string;
  description: string;
  model: string;
  integrations: Integration[];
  products: string[];
  tools: string[];
  status: 'active' | 'idle' | 'offline' | 'loading';
  lastRun: string;
  executions: number;
}

type StatusConfig = {
  [key in Agent['status']]: {
    color: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    bgColor: string;
    textColor: string;
    borderColor: string;
    animate?: boolean;
  }
};

// Constants
const STATUS_CONFIG: StatusConfig = {
  active: {
    color: 'bg-emerald-500',
    label: 'Active',
    icon: CheckCircle,
    bgColor: 'bg-emerald-50',
    textColor: 'text-emerald-700',
    borderColor: 'border-emerald-200'
  },
  idle: {
    color: 'bg-amber-500',
    label: 'Idle',
    icon: PauseCircle,
    bgColor: 'bg-amber-50',
    textColor: 'text-amber-700',
    borderColor: 'border-amber-200'
  },
  offline: {
    color: 'bg-slate-400',
    label: 'Offline',
    icon: X,
    bgColor: 'bg-slate-50',
    textColor: 'text-slate-700',
    borderColor: 'border-slate-200'
  },
  loading: {
    color: 'bg-blue-500',
    label: 'Loading',
    icon: Loader2,
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-700',
    borderColor: 'border-blue-200',
    animate: true
  }
};

const INTEGRATION_ICONS = {
  slack: MessageCircle,
  email: Mail,
  zendesk: Users,
  crm: BarChart3,
  jira: Workflow,
  datadog: Activity
} as const;

const MODELS = ['GPT-4', 'Claude-2', 'GPT-3.5', 'Llama-2', 'Gemini Pro'] as const;
const PRODUCTS = ['Helpdesk', 'Chat', 'Ticketing', 'Sales', 'CRM', 'Analytics', 'Billing'] as const;
const TOOLS = ['Classifier', 'Auto-Reply', 'Routing', 'Scoring', 'Enrichment', 'Notifications', 'Invoice Gen'] as const;

// ==================== UI Components ====================

// Toast Component
type ToastType = 'success' | 'error' | 'info';
const Toast: React.FC<{
  message: string;
  type: ToastType;
  onClose: () => void;
}> = ({ message, type, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor =
    type === 'success'
      ? 'bg-emerald-500'
      : type === 'error'
      ? 'bg-red-500'
      : 'bg-blue-500';

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-lg text-white shadow-lg transition-all duration-300 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
      } ${bgColor}`}
    >
      {type === 'success' ? (
        <CheckCircle className="w-5 h-5" />
      ) : type === 'error' ? (
        <AlertCircle className="w-5 h-5" />
      ) : (
        <Activity className="w-5 h-5" />
      )}
      <span className="font-medium">{message}</span>
      <button onClick={onClose} className="ml-2 hover:opacity-80 transition-opacity">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

// Confirm Dialog Component
const ConfirmDialog: React.FC<{
  isOpen: boolean;
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
  onConfirm: () => void;
  onCancel: () => void;
  type?: 'danger' | 'warning' | 'info';
}> = ({
  isOpen,
  title,
  message,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
  type = 'danger'
}) => {
  const buttonColor =
    type === 'danger'
      ? 'bg-red-600 hover:bg-red-700'
      : type === 'warning'
      ? 'bg-amber-600 hover:bg-amber-700'
      : 'bg-blue-600 hover:bg-blue-700';

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" onClick={onCancel} />
      <div className="relative bg-white rounded-xl max-w-md w-full p-6 border border-slate-200 shadow-xl">
        <div className="flex items-center gap-3 mb-4">
          {type === 'danger' ? (
            <AlertCircle className="w-6 h-6 text-red-500" />
          ) : type === 'warning' ? (
            <AlertCircle className="w-6 h-6 text-amber-500" />
          ) : (
            <AlertCircle className="w-6 h-6 text-blue-500" />
          )}
          <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
        </div>
        <p className="text-slate-600 mb-6">{message}</p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={onCancel}
            className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className={`px-4 py-2 rounded-lg text-white transition-colors ${buttonColor}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

// ==================== Agent Components ====================

// Status Indicator Component
const StatusIndicator: React.FC<{ status: Agent['status'] }> = ({ status }) => {
  const config = STATUS_CONFIG[status];
  const Icon = config.icon;

  return (
    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${config.bgColor} ${config.borderColor} border`}>
      <Icon className={`w-4 h-4 ${config.textColor} ${config.animate ? 'animate-spin' : ''}`} />
      <span className={`text-sm font-medium ${config.textColor}`}>{config.label}</span>
    </div>
  );
};

// Execution Stats Component
const ExecutionStats: React.FC<{ agent: Agent }> = ({ agent }) => (
  <div className="flex items-center gap-6 text-sm">
    <div className="flex items-center gap-2 text-slate-600">
      <Clock className="w-4 h-4" />
      <span>{agent.lastRun}</span>
    </div>
    <div className="flex items-center gap-2 text-slate-600">
      <Activity className="w-4 h-4" />
      <span>{agent.executions.toLocaleString()} runs</span>
    </div>
    <div className="flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-lg">
      <Cpu className="w-4 h-4 text-slate-600" />
      <span className="font-medium text-slate-700">{agent.model}</span>
    </div>
  </div>
);

// Integration Item Component
const IntegrationItem: React.FC<{ integration: Integration }> = ({ integration }) => {
  const Icon = INTEGRATION_ICONS[integration.type];

  return (
    <div className="flex items-center gap-2 p-2.5 bg-white border border-slate-200 rounded-lg cursor-pointer hover:border-blue-300 hover:bg-blue-50/50 transition-all group">
      <Icon className="w-4 h-4 text-slate-600 group-hover:text-blue-600 transition-colors" />
      <span className="text-sm font-medium text-slate-700 group-hover:text-blue-700 transition-colors">
        {integration.name}
      </span>
    </div>
  );
};

// Add Integration Button Component
const AddIntegrationButton: React.FC<{ onClick?: () => void }> = ({ onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="flex items-center gap-2 p-2.5 border border-dashed border-slate-300 rounded-lg text-slate-500 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50/50 transition-all"
  >
    <Plus className="w-4 h-4" />
    <span className="text-sm font-medium">Add Integration</span>
  </button>
);

// Section Component
const Section: React.FC<{
  title: string;
  items: string[];
  expanded?: boolean;
  onToggle?: () => void;
}> = ({ title, items, expanded = true, onToggle }) => (
  <div className="space-y-3">
    <button
      type="button"
      onClick={onToggle}
      className="flex items-center gap-2 text-sm font-semibold text-slate-900 hover:text-slate-700 transition-colors"
    >
      {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      {title}
      <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-full">{items.length}</span>
    </button>
    {expanded && (
      <div className="flex flex-wrap gap-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
        {items.map((item, index) => (
          <div
            key={index}
            className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700"
          >
            {item}
          </div>
        ))}
      </div>
    )}
  </div>
);

// Action Button Component
const ActionButton: React.FC<{
  icon: ReactNode;
  onClick: () => void;
  label: string;
  primary?: boolean;
  disabled?: boolean;
}> = ({ icon, onClick, label, primary = false, disabled = false }) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    className={`p-2.5 rounded-lg border flex items-center justify-center transition-all ${
      disabled
        ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed'
        : primary
        ? 'bg-blue-600 border-blue-600 text-white hover:bg-blue-700 shadow-sm hover:shadow-md'
        : 'border-slate-300 text-slate-600 hover:border-slate-400 hover:bg-slate-50'
    }`}
    aria-label={label}
  >
    {icon}
  </button>
);

// Dropdown Menu Component
const DropdownMenu: React.FC<{
  agent: Agent;
  onDelete: (id: string) => void;
  onEdit: (agent: Agent) => void;
}> = ({ agent, onDelete, onEdit }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const menuItems: {
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    action: () => void;
  }[] = [
    { icon: Edit3, label: 'Edit', action: () => onEdit(agent) },
    // Fixed: Export now does nothing (removed console.log)
    { icon: Download, label: 'Export', action: () => {} },
    { icon: Trash2, label: 'Delete', action: () => onDelete(agent.id) }
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen((o) => !o)}
        className="p-2.5 rounded-lg border border-slate-300 text-slate-600 hover:border-slate-400 hover:bg-slate-50 transition-all"
      >
        <MoreVertical className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-12 z-50 w-48 bg-white border border-slate-200 rounded-lg shadow-lg py-1 animate-in fade-in slide-in-from-top-2 duration-200">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={index}
                type="button"
                onClick={() => {
                  item.action();
                  setIsOpen(false);
                }}
                className="w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-3 transition-colors"
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

// Agent Card Component
const AgentCard: React.FC<{
  agent: Agent;
  onDelete: (id: string) => void;
  onEdit: (agent: Agent) => void;
  onRun: (id: string) => void;
}> = ({ agent, onDelete, onEdit, onRun }) => {
  const [expandedSections, setExpandedSections] = useState<{
    integrations: boolean;
    products: boolean;
    tools: boolean;
  }>({
    integrations: true,
    products: true,
    tools: true
  });

  // Fix: Remove unused handler implementations to avoid warnings.
  const handleSettings = () => {};
  const handleAddIntegration = () => {};

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-6 hover:border-slate-300 transition-all animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="space-y-3 flex-1">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center group-hover:bg-blue-100 transition-colors">
              <Workflow className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3">
                <h3 className="text-xl font-semibold text-slate-900 truncate">{agent.name}</h3>
                <StatusIndicator status={agent.status} />
              </div>
              <p className="text-slate-600 mt-1">{agent.description}</p>
            </div>
          </div>
          <ExecutionStats agent={agent} />
        </div>

        <div className="flex items-center gap-2 ml-4">
          <ActionButton
            icon={
              agent.status === 'loading' ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Play className="w-4 h-4" />
              )
            }
            onClick={() => onRun(agent.id)}
            label={`Run ${agent.name}`}
            primary
            disabled={agent.status === 'loading'}
          />
          <ActionButton
            icon={<Settings className="w-4 h-4" />}
            onClick={handleSettings}
            label={`Settings for ${agent.name}`}
          />
          <DropdownMenu agent={agent} onDelete={onDelete} onEdit={onEdit} />
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-6 border-t border-slate-100">
        {/* Integrations */}
        <div className="space-y-3">
          <Section
            title="Integrations"
            items={agent.integrations.map((i) => i.name)}
            expanded={expandedSections.integrations}
            onToggle={() => toggleSection('integrations')}
          />
          {expandedSections.integrations && (
            <div className="flex flex-wrap gap-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
              {agent.integrations.map((integration, index) => (
                <IntegrationItem
                  key={`${integration.type}-${index}`}
                  integration={integration}
                />
              ))}
              <AddIntegrationButton onClick={handleAddIntegration} />
            </div>
          )}
        </div>

        {/* Products & Tools */}
        <div className="lg:col-span-2 space-y-6">
          <Section
            title="Products"
            items={agent.products}
            expanded={expandedSections.products}
            onToggle={() => toggleSection('products')}
          />
          <Section
            title="Tools"
            items={agent.tools}
            expanded={expandedSections.tools}
            onToggle={() => toggleSection('tools')}
          />
        </div>
      </div>
    </div>
  );
};

// Add Agent Card Component
const AddAgentCard: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="w-full bg-white border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:border-blue-400 hover:bg-blue-50/50 transition-all group"
  >
    <div className="w-16 h-16 bg-blue-50 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-100 transition-colors">
      <Plus className="w-8 h-8 text-blue-600" />
    </div>
    <h3 className="text-xl font-semibold text-slate-900 mb-2 group-hover:text-slate-700 transition-colors">
      Add New Agent
    </h3>
    <p className="text-slate-600 group-hover:text-slate-500 transition-colors">Create a new workflow agent</p>
  </button>
);

// Search Bar Component
const SearchBar: React.FC<{
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onFilterClick: () => void;
  onImportClick: () => void;
}> = ({ searchTerm, onSearchChange, onFilterClick, onImportClick }) => (
  <div className="flex flex-col sm:flex-row gap-4">
    <div className="flex-1 relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
      <input
        type="text"
        placeholder="Search agents..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
      />
    </div>
    <div className="flex gap-2">
      <button
        type="button"
        onClick={onFilterClick}
        className="px-4 py-3 border border-slate-300 rounded-lg text-slate-700 hover:border-slate-400 hover:bg-slate-50 transition-all flex items-center gap-2 font-medium"
      >
        <Filter className="w-4 h-4" />
        Filter
      </button>
      <button
        type="button"
        onClick={onImportClick}
        className="px-4 py-3 border border-slate-300 rounded-lg text-slate-700 hover:border-slate-400 hover:bg-slate-50 transition-all flex items-center gap-2 font-medium"
      >
        <Upload className="w-4 h-4" />
        Import
      </button>
    </div>
  </div>
);

// ==================== Modal Components ====================

// Create Agent Drawer Component
type CreateAgentDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (agent: Omit<Agent, 'id' | 'status' | 'lastRun' | 'executions'>) => void;
  editingAgent?: Agent;
};
const CreateAgentDrawer: React.FC<CreateAgentDrawerProps> = ({
  isOpen,
  onClose,
  onCreate,
  editingAgent
}) => {
  const [formData, setFormData] = useState<{
    name: string;
    description: string;
    model: string;
    products: string[];
    tools: string[];
  }>({
    name: '',
    description: '',
    model: MODELS[0],
    products: [],
    tools: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (editingAgent) {
      setFormData({
        name: editingAgent.name,
        description: editingAgent.description,
        model: editingAgent.model,
        products: editingAgent.products,
        tools: editingAgent.tools
      });
    } else {
      setFormData({
        name: '',
        description: '',
        model: MODELS[0],
        products: [],
        tools: []
      });
    }
  }, [editingAgent, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    onCreate({
      ...formData,
      integrations: []
    });

    setIsSubmitting(false);

    if (!editingAgent) {
      setFormData({
        name: '',
        description: '',
        model: MODELS[0],
        products: [],
        tools: []
      });
    }

    onClose();
  };

  const toggleProduct = (product: string) => {
    setFormData((prev) => ({
      ...prev,
      products: prev.products.includes(product)
        ? prev.products.filter((p) => p !== product)
        : [...prev.products, product]
    }));
  };

  const toggleTool = (tool: string) => {
    setFormData((prev) => ({
      ...prev,
      tools: prev.tools.includes(tool)
        ? prev.tools.filter((t) => t !== tool)
        : [...prev.tools, tool]
    }));
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40" onClick={onClose} />
      )}
      <div
        className={`fixed top-0 right-0 h-full w-[500px] bg-white z-50 transform transition-all duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200 bg-white">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              {editingAgent ? (
                <Edit3 className="w-4 h-4 text-blue-600" />
              ) : (
                <Plus className="w-4 h-4 text-blue-600" />
              )}
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                {editingAgent ? 'Edit Agent' : 'Create Agent'}
              </h2>
              <p className="text-sm text-slate-600">
                {editingAgent ? 'Update agent configuration' : 'Add a new workflow agent'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="h-[calc(100vh-80px)] overflow-y-auto">
          <div className="p-6 space-y-6">
            {/* Basic Info */}
            <div className="space-y-4">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
                  <Type className="w-4 h-4" />
                  Agent Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="e.g., Customer Support Agent"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
                  <FileText className="w-4 h-4" />
                  Description
                </label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      description: e.target.value
                    }))
                  }
                  rows={3}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Describe what this agent does..."
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
                  <Cpu className="w-4 h-4" />
                  AI Model
                </label>
                <select
                  value={formData.model}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, model: e.target.value }))
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                >
                  {MODELS.map((model) => (
                    <option key={model} value={model}>
                      {model}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Products */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3">
                Products
              </label>
              <div className="space-y-2">
                {PRODUCTS.map((product) => (
                  <button
                    key={product}
                    type="button"
                    onClick={() => toggleProduct(product)}
                    className={`w-full p-3 text-left rounded-lg border transition-all ${
                      formData.products.includes(product)
                        ? 'bg-blue-50 border-blue-200 text-blue-700'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{product}</span>
                      {formData.products.includes(product) && (
                        <div className="w-2 h-2 bg-blue-600 rounded-full" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Tools */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3">
                Tools
              </label>
              <div className="space-y-2">
                {TOOLS.map((tool) => (
                  <button
                    key={tool}
                    type="button"
                    onClick={() => toggleTool(tool)}
                    className={`w-full p-3 text-left rounded-lg border transition-all ${
                      formData.tools.includes(tool)
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{tool}</span>
                      {formData.tools.includes(tool) && (
                        <div className="w-2 h-2 bg-emerald-600 rounded-full" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-slate-200 bg-white">
            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    {editingAgent ? 'Updating...' : 'Creating...'}
                  </>
                ) : (
                  <>{editingAgent ? 'Update Agent' : 'Create Agent'}</>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

// Filter Modal Component
const FilterModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onApplyFilter: (filters: {
    status: string[];
    models: string[];
    products: string[];
  }) => void;
}> = ({ isOpen, onClose, onApplyFilter }) => {
  const [filters, setFilters] = useState<{
    status: string[];
    models: string[];
    products: string[];
  }>({
    status: [],
    models: [],
    products: []
  });

  const statusOptions: Agent['status'][] = ['active', 'idle', 'offline'];

  const handleStatusToggle = (status: string) => {
    setFilters((prev) => ({
      ...prev,
      status: prev.status.includes(status)
        ? prev.status.filter((s) => s !== status)
        : [...prev.status, status]
    }));
  };

  const handleModelToggle = (model: string) => {
    setFilters((prev) => ({
      ...prev,
      models: prev.models.includes(model)
        ? prev.models.filter((m) => m !== model)
        : [...prev.models, model]
    }));
  };

  const handleProductToggle = (product: string) => {
    setFilters((prev) => ({
      ...prev,
      products: prev.products.includes(product)
        ? prev.products.filter((p) => p !== product)
        : [...prev.products, product]
    }));
  };

  const handleApply = () => {
    onApplyFilter(filters);
    onClose();
  };

  const handleReset = () => {
    setFilters({
      status: [],
      models: [],
      products: []
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-xl max-w-2xl w-full p-6 max-h-[80vh] overflow-y-auto border border-slate-200 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-slate-900">Filter Agents</h2>
          <button
            type="button"
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Status Filter */}
          <div>
            <h3 className="text-sm font-medium text-slate-700 mb-3">Status</h3>
            <div className="flex flex-wrap gap-2">
              {statusOptions.map((status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() => handleStatusToggle(status)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    filters.status.includes(status)
                      ? 'bg-blue-50 border border-blue-200 text-blue-700'
                      : 'bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Model Filter */}
          <div>
            <h3 className="text-sm font-medium text-slate-700 mb-3">AI Model</h3>
            <div className="flex flex-wrap gap-2">
              {MODELS.map((model) => (
                <button
                  key={model}
                  type="button"
                  onClick={() => handleModelToggle(model)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    filters.models.includes(model)
                      ? 'bg-blue-50 border border-blue-200 text-blue-700'
                      : 'bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {model}
                </button>
              ))}
            </div>
          </div>

          {/* Product Filter */}
          <div>
            <h3 className="text-sm font-medium text-slate-700 mb-3">Products</h3>
            <div className="flex flex-wrap gap-2">
              {PRODUCTS.map((product) => (
                <button
                  key={product}
                  type="button"
                  onClick={() => handleProductToggle(product)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    filters.products.includes(product)
                      ? 'bg-blue-50 border border-blue-200 text-blue-700'
                      : 'bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {product}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-3 justify-end mt-6 pt-6 border-t border-slate-200">
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors"
          >
            Reset
          </button>
          <button
            type="button"
            onClick={handleApply}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

// ==================== Main Component ====================

const AgentsPage: React.FC = () => {
  const [agents, setAgents] = useState<Agent[]>([
    {
      id: '1',
      name: 'Customer Support',
      description: 'Automated ticket routing and response',
      model: 'GPT-4',
      integrations: [
        { name: 'Slack', type: 'slack' },
        { name: 'Email', type: 'email' },
        { name: 'Zendesk', type: 'zendesk' }
      ],
      products: ['Helpdesk', 'Chat', 'Ticketing'],
      tools: ['Classifier', 'Auto-Reply', 'Routing'],
      status: 'active',
      lastRun: '2 minutes ago',
      executions: 1247
    },
    {
      id: '2',
      name: 'Sales Lead Processor',
      description: 'Lead qualification and CRM automation',
      model: 'Claude-2',
      integrations: [
        { name: 'CRM', type: 'crm' },
        { name: 'Slack', type: 'slack' }
      ],
      products: ['Sales', 'CRM', 'Analytics'],
      tools: ['Scoring', 'Enrichment', 'Notifications'],
      status: 'idle',
      lastRun: '1 hour ago',
      executions: 892
    }
  ]);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingAgent, setEditingAgent] = useState<Agent | undefined>(undefined);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [filters, setFilters] = useState<{
    status: string[];
    models: string[];
    products: string[];
  }>({
    status: [],
    models: [],
    products: []
  });
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    confirmText: string;
    cancelText: string;
    onConfirm: () => void;
    type?: 'danger' | 'warning' | 'info';
  }>({
    isOpen: false,
    title: '',
    message: '',
    confirmText: '',
    cancelText: '',
    onConfirm: () => {},
    type: 'danger'
  });

  const handleCreateAgent = (
    newAgentData: Omit<Agent, 'id' | 'status' | 'lastRun' | 'executions'>
  ) => {
    if (editingAgent) {
      setAgents((prev) =>
        prev.map((agent) =>
          agent.id === editingAgent.id
            ? { ...agent, ...newAgentData }
            : agent
        )
      );
      setToast({ message: 'Agent updated successfully', type: 'success' });
    } else {
      const newAgent: Agent = {
        ...newAgentData,
        id: Date.now().toString(),
        status: 'idle',
        lastRun: 'Never',
        executions: 0
      };
      setAgents((prev) => [...prev, newAgent]);
      setToast({ message: 'Agent created successfully', type: 'success' });
    }
    setEditingAgent(undefined);
  };

  const handleEditAgent = (agent: Agent) => {
    setEditingAgent(agent);
    setIsDrawerOpen(true);
  };

  const handleDeleteAgent = (id: string) => {
    const agent = agents.find((a) => a.id === id);
    if (!agent) return;

    setConfirmDialog({
      isOpen: true,
      title: 'Delete Agent',
      message: `Are you sure you want to delete "${agent.name}"? This action cannot be undone.`,
      confirmText: 'Delete',
      cancelText: 'Cancel',
      onConfirm: () => {
        setAgents((prev) => prev.filter((agent) => agent.id !== id));
        setToast({ message: 'Agent deleted successfully', type: 'success' });
        setConfirmDialog((prev) => ({ ...prev, isOpen: false }));
      },
      type: 'danger'
    });
  };

  const handleRunAgent = async (id: string) => {
    setAgents((prev) =>
      prev.map((agent) =>
        agent.id === id ? { ...agent, status: 'loading' } : agent
      )
    );

    await new Promise((resolve) => setTimeout(resolve, 2000));

    setAgents((prev) =>
      prev.map((agent) =>
        agent.id === id
          ? {
              ...agent,
              status: 'active',
              lastRun: 'Just now',
              executions: agent.executions + 1
            }
          : agent
      )
    );

    setToast({ message: 'Agent started successfully', type: 'success' });
  };

  const handleApplyFilter = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  const handleImport = () => {
    setToast({ message: 'Import feature coming soon', type: 'info' });
  };

  const filteredAgents = agents.filter((agent) => {
    const matchesSearch =
      agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.products.some((product) =>
        product.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesStatus =
      filters.status.length === 0 || filters.status.includes(agent.status);
    const matchesModel =
      filters.models.length === 0 || filters.models.includes(agent.model);
    const matchesProduct =
      filters.products.length === 0 ||
      agent.products.some((product) => filters.products.includes(product));

    return matchesSearch && matchesStatus && matchesModel && matchesProduct;
  });

  const activeFiltersCount =
    filters.status.length + filters.models.length + filters.products.length;

  return (
    <>
      <Head>
        <title>Workflows</title>
      </Head>

      <div className="min-h-screen bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Workflow Agents</h1>
            <p className="text-slate-600">
              Manage and monitor your automated workflow agents
            </p>
          </div>

          {/* Search and Actions Bar */}
          <div className="mb-6">
            <SearchBar
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              onFilterClick={() => setIsFilterModalOpen(true)}
              onImportClick={handleImport}
            />

            {/* Active Filters */}
            {activeFiltersCount > 0 && (
              <div className="mt-3 flex items-center gap-2">
                <span className="text-sm text-slate-600">Active filters:</span>
                <div className="flex flex-wrap gap-2">
                  {filters.status.map((status) => (
                    <span
                      key={status}
                      className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-md"
                    >
                      Status: {status}
                    </span>
                  ))}
                  {filters.models.map((model) => (
                    <span
                      key={model}
                      className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-md"
                    >
                      Model: {model}
                    </span>
                  ))}
                  {filters.products.map((product) => (
                    <span
                      key={product}
                      className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-md"
                    >
                      Product: {product}
                    </span>
                  ))}
                  <button
                    type="button"
                    onClick={() =>
                      setFilters({ status: [], models: [], products: [] })
                    }
                    className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded-md hover:bg-slate-200 transition-colors"
                  >
                    Clear all
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Agent List */}
          <div className="space-y-6">
            {filteredAgents.map((agent) => (
              <AgentCard
                key={agent.id}
                agent={agent}
                onDelete={handleDeleteAgent}
                onEdit={handleEditAgent}
                onRun={handleRunAgent}
              />
            ))}

            <AddAgentCard
              onClick={() => {
                setEditingAgent(undefined);
                setIsDrawerOpen(true);
              }}
            />
          </div>

          {/* Empty State */}
          {filteredAgents.length === 0 && agents.length > 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">No agents found</h3>
              <p className="text-slate-600">Try adjusting your search terms or filters</p>
              <button
                type="button"
                onClick={() => setFilters({ status: [], models: [], products: [] })}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}

          {/* No Agents State */}
          {agents.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Workflow className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">No agents yet</h3>
              <p className="text-slate-600 mb-4">
                Create your first workflow agent to get started
              </p>
              <button
                type="button"
                onClick={() => setIsDrawerOpen(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 mx-auto"
              >
                <Plus className="w-4 h-4" />
                Create Agent
              </button>
            </div>
          )}
        </div>

        {/* Create/Edit Agent Drawer */}
        <CreateAgentDrawer
          isOpen={isDrawerOpen}
          onClose={() => {
            setIsDrawerOpen(false);
            setEditingAgent(undefined);
          }}
          onCreate={handleCreateAgent}
          editingAgent={editingAgent}
        />

        {/* Filter Modal */}
        <FilterModal
          isOpen={isFilterModalOpen}
          onClose={() => setIsFilterModalOpen(false)}
          onApplyFilter={handleApplyFilter}
        />

        {/* Confirmation Dialog */}
        <ConfirmDialog
          isOpen={confirmDialog.isOpen}
          title={confirmDialog.title}
          message={confirmDialog.message}
          confirmText={confirmDialog.confirmText}
          cancelText={confirmDialog.cancelText}
          onConfirm={confirmDialog.onConfirm}
          onCancel={() => setConfirmDialog((prev) => ({ ...prev, isOpen: false }))}
          type={confirmDialog.type}
        />

        {/* Toast Notification */}
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </div>
    </>
  );
};

export default AgentsPage;