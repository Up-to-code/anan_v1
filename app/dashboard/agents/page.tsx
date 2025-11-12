"use client";
import React, { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/navigation";
import {
  Workflow,
  Settings,
  Play,
  Clock,
  Activity,
  Plus,
  MessageCircle,
  Mail,
  Users,
  BarChart3,
  X,
  Search,
  Upload,
  Trash2,
  AlertCircle,
  CheckCircle,
  PauseCircle,
  Loader2,
} from "lucide-react";

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
  status: "active" | "idle" | "offline" | "loading";
  lastRun: string;
  executions: number;
}

// Integration icons
const INTEGRATION_ICONS = {
  slack: MessageCircle,
  email: Mail,
  zendesk: Users,
  crm: BarChart3,
  jira: Workflow,
  datadog: Activity,
} as const;

// Status Indicator Component
const StatusIndicator = ({ status }: { status: Agent["status"] }) => {
  const variants = {
    active: {
      label: "Active",
      icon: CheckCircle,
      classes: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
    idle: {
      label: "Idle",
      icon: PauseCircle,
      classes: "bg-amber-50 text-amber-700 border-amber-200",
    },
    offline: {
      label: "Offline",
      icon: X,
      classes: "bg-slate-50 text-slate-700 border-slate-200",
    },
    loading: {
      label: "Loading",
      icon: Loader2,
      classes: "bg-blue-50 text-blue-700 border-blue-200 animate-spin",
    },
  } as const;
  
  const Variant = variants[status];
  const Icon = Variant.icon;
  const animate = status === "loading" ? "animate-spin" : "";
  
  return (
    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${Variant.classes.replace(/text-\S+/, '')}`}>
      <Icon className={`w-4 h-4 ${Variant.classes.split(" ").find(c => c.startsWith("text-"))} ${animate}`} />
      <span className={`text-sm font-medium ${Variant.classes.split(" ").find(c => c.startsWith("text-"))}`}>{Variant.label}</span>
    </div>
  );
};

// Integration Item Component
const IntegrationItem = ({ integration }: { integration: Integration }) => {
  const Icon = INTEGRATION_ICONS[integration.type];
  
  return (
    <div className="flex items-center gap-2 p-2.5 bg-white border border-slate-200 rounded-lg">
      <Icon className="w-4 h-4 text-slate-600" />
      <span className="text-sm font-medium text-slate-700">{integration.name}</span>
    </div>
  );
};

// Agent Actions Component
const AgentActions = ({ 
  agent, 
  onRun, 
  onDelete 
}: { 
  agent: Agent;
  onRun: (id: string) => void;
  onDelete: (id: string) => void;
}) => (
  <div className="flex items-center gap-2 ml-4">
    <button
      onClick={() => onRun(agent.id)}
      disabled={agent.status === "loading"}
      className={`p-2.5 rounded-lg border flex items-center justify-center transition-all ${
        agent.status === "loading"
          ? "bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed"
          : "bg-blue-600 border-blue-600 text-white hover:bg-blue-700"
      }`}
    >
      {agent.status === "loading" ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <Play className="w-4 h-4" />
      )}
    </button>
    <button className="p-2.5 rounded-lg border border-slate-300 text-slate-600 hover:border-slate-400 hover:bg-slate-50 transition-all">
      <Settings className="w-4 h-4" />
    </button>
    <button
      onClick={() => onDelete(agent.id)}
      className="p-2.5 rounded-lg border border-slate-300 text-slate-600 hover:border-slate-400 hover:bg-slate-50 transition-all"
    >
      <Trash2 className="w-4 h-4" />
    </button>
  </div>
);

// Agent Header Component
const AgentHeader = ({ agent }: { agent: Agent }) => (
  <div className="flex items-start justify-between">
    <div className="space-y-3 flex-1">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
          <Workflow className="w-6 h-6 text-blue-600" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3">
            <h3 className="text-xl font-semibold text-slate-900 truncate">
              {agent.name}
            </h3>
            <StatusIndicator status={agent.status} />
          </div>
          <p className="text-slate-600 mt-1">{agent.description}</p>
        </div>
      </div>
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
          <Activity className="w-4 h-4 text-slate-600" />
          <span className="font-medium text-slate-700">{agent.model}</span>
        </div>
      </div>
    </div>
  </div>
);

// Agent Integrations Section
const AgentIntegrations = ({ integrations }: { integrations: Integration[] }) => (
  <div className="space-y-3">
    <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
      Integrations
      <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
        {integrations.length}
      </span>
    </div>
    <div className="flex flex-wrap gap-2">
      {integrations.map((integration, idx) => (
        <IntegrationItem key={`${integration.type}-${idx}`} integration={integration} />
      ))}
    </div>
  </div>
);

// Agent Products Section
const AgentProducts = ({ products }: { products: string[] }) => (
  <div>
    <div className="flex items-center gap-2 text-sm font-semibold text-slate-900 mb-3">
      Products
      <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
        {products.length}
      </span>
    </div>
    <div className="flex flex-wrap gap-2">
      {products.map((product, idx) => (
        <div key={idx} className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700">
          {product}
        </div>
      ))}
    </div>
  </div>
);

// Agent Tools Section
const AgentTools = ({ tools }: { tools: string[] }) => (
  <div>
    <div className="flex items-center gap-2 text-sm font-semibold text-slate-900 mb-3">
      Tools
      <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
        {tools.length}
      </span>
    </div>
    <div className="flex flex-wrap gap-2">
      {tools.map((tool, idx) => (
        <div key={idx} className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700">
          {tool}
        </div>
      ))}
    </div>
  </div>
);

// Agent Card Component
const AgentCard = ({
  agent,
  onDelete,
  onRun,
}: {
  agent: Agent;
  onDelete: (id: string) => void;
  onRun: (id: string) => void;
}) => (
  <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-6 hover:border-slate-300 transition-all">
    <div className="flex items-start justify-between">
      <AgentHeader agent={agent} />
      <AgentActions agent={agent} onRun={onRun} onDelete={onDelete} />
    </div>
    
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-6 border-t border-slate-100">
      <AgentIntegrations integrations={agent.integrations} />
      <div className="lg:col-span-2 space-y-6">
        <AgentProducts products={agent.products} />
        <AgentTools tools={agent.tools} />
      </div>
    </div>
  </div>
);

// Add Agent Card Component
const AddAgentCard = ({ onClick }: { onClick: () => void }) => (
  <button
    onClick={onClick}
    className="w-full bg-white border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:border-blue-400 hover:bg-blue-50/50 transition-all"
  >
    <div className="w-16 h-16 bg-blue-50 rounded-lg flex items-center justify-center mx-auto mb-4">
      <Plus className="w-8 h-8 text-blue-600" />
    </div>
    <h3 className="text-xl font-semibold text-slate-900 mb-2">Add New Agent</h3>
    <p className="text-slate-600">Create a new workflow agent</p>
  </button>
);

// Search Bar Component
const SearchBar = ({ 
  searchTerm, 
  onSearchChange,
  onImport 
}: { 
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onImport: () => void;
}) => (
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
        onClick={onImport}
        className="px-4 py-3 border border-slate-300 rounded-lg text-slate-700 hover:border-slate-400 hover:bg-slate-50 transition-all flex items-center gap-2 font-medium"
      >
        <Upload className="w-4 h-4" />
        Import
      </button>
    </div>
  </div>
);

// Empty State Component
const EmptyState = ({ 
  type, 
  onCreateAgent 
}: { 
  type: "no-agents" | "no-results";
  onCreateAgent: () => void;
}) => {
  if (type === "no-agents") {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Workflow className="w-8 h-8 text-slate-400" />
        </div>
        <h3 className="text-lg font-semibold text-slate-900 mb-2">
          No agents yet
        </h3>
        <p className="text-slate-600 mb-4">
          Create your first workflow agent to get started
        </p>
        <button
          onClick={onCreateAgent}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 mx-auto"
        >
          <Plus className="w-4 h-4" />
          Create Agent
        </button>
      </div>
    );
  }

  return (
    <div className="text-center py-12">
      <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <Search className="w-8 h-8 text-slate-400" />
      </div>
      <h3 className="text-lg font-semibold text-slate-900 mb-2">
        No agents found
      </h3>
      <p className="text-slate-600">
        Try adjusting your search terms
      </p>
    </div>
  );
};

// Toast Notification Component
const Toast = ({
  message,
  type,
  onClose,
}: {
  message: string;
  type: "success" | "error" | "info";
  onClose: () => void;
}) => {
  const [isVisible, setIsVisible] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);
  
  const color =
    type === "success"
      ? "bg-emerald-500"
      : type === "error"
      ? "bg-red-500"
      : "bg-blue-500";
      
  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-lg text-white shadow-lg transition-all duration-300 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
      } ${color}`}
    >
      {type === "success" ? (
        <CheckCircle className="w-5 h-5" />
      ) : type === "error" ? (
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
const ConfirmDialog = ({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
}: {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}) =>
  !isOpen ? null : (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" onClick={onCancel} />
      <div className="relative bg-white rounded-xl max-w-md w-full p-6 border border-slate-200 shadow-xl">
        <div className="flex items-center gap-3 mb-4">
          <AlertCircle className="w-6 h-6 text-red-500" />
          <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
        </div>
        <p className="text-slate-600 mb-6">{message}</p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={onCancel}
            className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );

// Page Header Component
const PageHeader = () => (
  <div className="mb-8">
    <h1 className="text-3xl font-bold text-slate-900 mb-2">
      Workflow Agents
    </h1>
    <p className="text-slate-600">
      Manage and monitor your automated workflow agents
    </p>
  </div>
);

// Main Page Component
const AgentsPage = () => {
  const router = useRouter();
  const [agents, setAgents] = useState<Agent[]>([
    {
      id: "1",
      name: "Customer Support",
      description: "Automated ticket routing and response",
      model: "GPT-4",
      integrations: [
        { name: "Slack", type: "slack" },
        { name: "Email", type: "email" },
        { name: "Zendesk", type: "zendesk" },
      ],
      products: ["Helpdesk", "Chat", "Ticketing"],
      tools: ["Classifier", "Auto-Reply", "Routing"],
      status: "active",
      lastRun: "2 minutes ago",
      executions: 1247,
    },
    {
      id: "2",
      name: "Sales Lead Processor",
      description: "Lead qualification and CRM automation",
      model: "Claude-2",
      integrations: [
        { name: "CRM", type: "crm" },
        { name: "Slack", type: "slack" },
      ],
      products: ["Sales", "CRM", "Analytics"],
      tools: ["Scoring", "Enrichment", "Notifications"],
      status: "idle",
      lastRun: "1 hour ago",
      executions: 892,
    },
  ]);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [toast, setToast] = useState<null | {
    message: string;
    type: "success" | "error" | "info";
  }>(null);
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
  }>({
    isOpen: false,
    title: "",
    message: "",
    onConfirm: () => {},
  });

  const handleDeleteAgent = (id: string) => {
    const agent = agents.find((a) => a.id === id);
    if (!agent) return;
    
    setConfirmDialog({
      isOpen: true,
      title: "Delete Agent",
      message: `Are you sure you want to delete "${agent.name}"? This action cannot be undone.`,
      onConfirm: () => {
        setAgents((prev) => prev.filter((agent) => agent.id !== id));
        setToast({ message: "Agent deleted successfully", type: "success" });
        setConfirmDialog((prev) => ({ ...prev, isOpen: false }));
      },
    });
  };

  const handleRunAgent = async (id: string) => {
    setAgents((prev) =>
      prev.map((agent) =>
        agent.id === id ? { ...agent, status: "loading" } : agent
      )
    );
    
    await new Promise((res) => setTimeout(res, 2000));
    
    setAgents((prev) =>
      prev.map((agent) =>
        agent.id === id
          ? {
              ...agent,
              status: "active",
              lastRun: "Just now",
              executions: agent.executions + 1,
            }
          : agent
      )
    );
    
    setToast({ message: "Agent started successfully", type: "success" });
  };

  const handleCreateAgent = () => router.push("dashboard/agents/create-agent");
  const handleImport = () => setToast({ message: "Import feature coming soon", type: "info" });

  const filteredAgents = agents.filter((agent) =>
    agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.products.some((product) => product.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <>
      <Head>
        <title>Workflow Agents</title>
        <meta name="description" content="Manage and monitor your automated workflow agents" />
      </Head>
      
      <div className="min-h-screen bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <PageHeader />
          
          <div className="mb-6">
            <SearchBar 
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              onImport={handleImport}
            />
          </div>
          
          <div className="space-y-6">
            {filteredAgents.map((agent) => (
              <AgentCard
                key={agent.id}
                agent={agent}
                onDelete={handleDeleteAgent}
                onRun={handleRunAgent}
              />
            ))}
            <AddAgentCard onClick={handleCreateAgent} />
          </div>
          
          {filteredAgents.length === 0 && agents.length > 0 && (
            <EmptyState type="no-results" onCreateAgent={handleCreateAgent} />
          )}
          
          {agents.length === 0 && (
            <EmptyState type="no-agents" onCreateAgent={handleCreateAgent} />
          )}
        </div>
        
        <ConfirmDialog
          isOpen={confirmDialog.isOpen}
          title={confirmDialog.title}
          message={confirmDialog.message}
          onConfirm={confirmDialog.onConfirm}
          onCancel={() => setConfirmDialog((prev) => ({ ...prev, isOpen: false }))}
        />
        
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