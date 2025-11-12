"use client";
import React, { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Plus,
  X,
  Search,
  MessageCircle,
  Mail,
  Users,
  BarChart3,
  Workflow,
  Activity,
  Zap,
  Code,
  Database,
  Globe,
  Shield,
  Bot,
  Sparkles,
} from "lucide-react";

// Types
interface Integration {
  id: string;
  name: string;
  type: keyof typeof INTEGRATION_ICONS;
  description: string;
  category: string;
}

interface Model {
  id: string;
  name: string;
  provider: string;
  description: string;
  contextLength: number;
  capabilities: string[];
}

interface Tool {
  id: string;
  name: string;
  category: string;
  description: string;
  icon: keyof typeof TOOL_ICONS;
}

// Icons
const INTEGRATION_ICONS = {
  slack: MessageCircle,
  email: Mail,
  zendesk: Users,
  crm: BarChart3,
  jira: Workflow,
  datadog: Activity,
  webhook: Zap,
  api: Code,
  database: Database,
} as const;

const TOOL_ICONS = {
  classifier: Sparkles,
  scraper: Globe,
  analyzer: Activity,
  notifier: Zap,
  validator: Shield,
  generator: Bot,
} as const;

// Sample Data
const AVAILABLE_INTEGRATIONS: Integration[] = [
  { id: "1", name: "Slack", type: "slack", description: "Send and receive messages from Slack channels", category: "Communication" },
  { id: "2", name: "Email", type: "email", description: "Send and receive emails", category: "Communication" },
  { id: "3", name: "Zendesk", type: "zendesk", description: "Manage support tickets and customer interactions", category: "Support" },
  { id: "4", name: "CRM", type: "crm", description: "Connect to customer relationship management system", category: "Sales" },
  { id: "5", name: "Jira", type: "jira", description: "Create and manage development tasks", category: "Development" },
  { id: "6", name: "Datadog", type: "datadog", description: "Monitor applications and infrastructure", category: "Monitoring" },
  { id: "7", name: "Webhook", type: "webhook", description: "Send data to external services via webhooks", category: "Integration" },
  { id: "8", name: "API", type: "api", description: "Connect to custom APIs", category: "Integration" },
  { id: "9", name: "Database", type: "database", description: "Read and write to databases", category: "Data" },
];

const AVAILABLE_MODELS: Model[] = [
  { id: "1", name: "GPT-4", provider: "OpenAI", description: "Most capable model for complex tasks", contextLength: 128000, capabilities: ["Reasoning", "Code", "Creative"] },
  { id: "2", name: "GPT-3.5 Turbo", provider: "OpenAI", description: "Fast and cost-effective for most tasks", contextLength: 16000, capabilities: ["Speed", "Efficiency", "General"] },
  { id: "3", name: "Claude-3", provider: "Anthropic", description: "Excellent for long conversations and analysis", contextLength: 200000, capabilities: ["Long Context", "Analysis", "Safety"] },
  { id: "4", name: "Claude-2", provider: "Anthropic", description: "Reliable for general purpose tasks", contextLength: 100000, capabilities: ["Reliability", "General", "Safety"] },
  { id: "5", name: "Gemini Pro", provider: "Google", description: "Strong multimodal capabilities", contextLength: 32000, capabilities: ["Multimodal", "Reasoning", "Creative"] },
];

const AVAILABLE_TOOLS: Tool[] = [
  { id: "1", name: "Content Classifier", category: "Analysis", description: "Categorize and tag content automatically", icon: "classifier" },
  { id: "2", name: "Web Scraper", category: "Data", description: "Extract information from websites", icon: "scraper" },
  { id: "3", name: "Sentiment Analyzer", category: "Analysis", description: "Analyze emotional tone in text", icon: "analyzer" },
  { id: "4", name: "Alert System", category: "Notification", description: "Send notifications based on triggers", icon: "notifier" },
  { id: "5", name: "Data Validator", category: "Quality", description: "Validate and clean incoming data", icon: "validator" },
  { id: "6", name: "Content Generator", category: "Creation", description: "Generate text content automatically", icon: "generator" },
];

// Step Components
const StepIndicator = ({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) => {
  return (
    <div className="flex items-center justify-center space-x-4 mb-8">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <React.Fragment key={index}>
          <div className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                index + 1 === currentStep
                  ? "bg-blue-600 text-white"
                  : index + 1 < currentStep
                  ? "bg-emerald-500 text-white"
                  : "bg-slate-200 text-slate-600"
              }`}
            >
              {index + 1 < currentStep ? <Check className="w-4 h-4" /> : index + 1}
            </div>
          </div>
          {index < totalSteps - 1 && (
            <div
              className={`w-12 h-0.5 ${
                index + 1 < currentStep ? "bg-emerald-500" : "bg-slate-200"
              }`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

const Step1BasicInfo = ({
  data,
  onChange,
}: {
  data: { name: string; description: string };
  onChange: (data: { name: string; description: string }) => void;
}) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-slate-900 mb-2">Basic Information</h3>
        <p className="text-slate-600">Give your agent a name and description to get started.</p>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Agent Name *
          </label>
          <input
            type="text"
            value={data.name}
            onChange={(e) => onChange({ ...data, name: e.target.value })}
            placeholder="e.g., Customer Support Bot"
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            required
          />
          <p className="text-xs text-slate-500 mt-1">Choose a descriptive name for your agent</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Description *
          </label>
          <textarea
            value={data.description}
            onChange={(e) => onChange({ ...data, description: e.target.value })}
            placeholder="Describe what this agent does..."
            rows={4}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
            required
          />
          <p className="text-xs text-slate-500 mt-1">Briefly explain the agent&#39;s purpose and functionality</p>
        </div>
      </div>
    </div>
  );
};

const Step2ModelSelection = ({
  data,
  onChange,
}: {
  data: { modelId: string };
  onChange: (data: { modelId: string }) => void;
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredModels = AVAILABLE_MODELS.filter(model =>
    model.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    model.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
    model.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-slate-900 mb-2">AI Model</h3>
        <p className="text-slate-600">Choose the AI model that will power your agent.</p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search models..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors mb-4"
        />
      </div>

      <div className="grid gap-4">
        {filteredModels.map((model) => (
          <div
            key={model.id}
            onClick={() => onChange({ modelId: model.id })}
            className={`p-4 border rounded-lg cursor-pointer transition-all ${
              data.modelId === model.id
                ? "border-blue-500 bg-blue-50 ring-2 ring-blue-500/20"
                : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Bot className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">{model.name}</h4>
                    <p className="text-sm text-slate-600">{model.provider}</p>
                  </div>
                </div>
                <p className="text-sm text-slate-700 mb-3">{model.description}</p>
                <div className="flex items-center gap-4 text-xs text-slate-600">
                  <span>Context: {model.contextLength.toLocaleString()} tokens</span>
                  <div className="flex items-center gap-1">
                    {model.capabilities.map((capability, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-slate-100 rounded-md text-slate-700"
                      >
                        {capability}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              {data.modelId === model.id && (
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Step3Integrations = ({
  data,
  onChange,
}: {
  data: { integrations: string[] };
  onChange: (data: { integrations: string[] }) => void;
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", ...Array.from(new Set(AVAILABLE_INTEGRATIONS.map(i => i.category)))];

  const filteredIntegrations = AVAILABLE_INTEGRATIONS.filter(integration => {
    const matchesSearch = integration.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         integration.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || integration.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleIntegration = (integrationId: string) => {
    const newIntegrations = data.integrations.includes(integrationId)
      ? data.integrations.filter(id => id !== integrationId)
      : [...data.integrations, integrationId];
    onChange({ integrations: newIntegrations });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-slate-900 mb-2">Integrations</h3>
        <p className="text-slate-600">Connect your agent to external services and tools.</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search integrations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
        </div>
        
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
        >
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredIntegrations.map((integration) => {
          const Icon = INTEGRATION_ICONS[integration.type];
          const isSelected = data.integrations.includes(integration.id);
          
          return (
            <div
              key={integration.id}
              onClick={() => toggleIntegration(integration.id)}
              className={`p-4 border rounded-lg cursor-pointer transition-all ${
                isSelected
                  ? "border-blue-500 bg-blue-50 ring-2 ring-blue-500/20"
                  : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    isSelected ? "bg-blue-100" : "bg-slate-100"
                  }`}>
                    <Icon className={`w-5 h-5 ${isSelected ? "text-blue-600" : "text-slate-600"}`} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">{integration.name}</h4>
                    <p className="text-sm text-slate-600">{integration.category}</p>
                    <p className="text-xs text-slate-500 mt-1">{integration.description}</p>
                  </div>
                </div>
                {isSelected && (
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Step4Tools = ({
  data,
  onChange,
}: {
  data: { tools: string[] };
  onChange: (data: { tools: string[] }) => void;
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", ...Array.from(new Set(AVAILABLE_TOOLS.map(t => t.category)))];

  const filteredTools = AVAILABLE_TOOLS.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || tool.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleTool = (toolId: string) => {
    const newTools = data.tools.includes(toolId)
      ? data.tools.filter(id => id !== toolId)
      : [...data.tools, toolId];
    onChange({ tools: newTools });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-slate-900 mb-2">Tools & Capabilities</h3>
        <p className="text-slate-600">Add functionality to your agent with specialized tools.</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search tools..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
        </div>
        
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
        >
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTools.map((tool) => {
          const Icon = TOOL_ICONS[tool.icon];
          const isSelected = data.tools.includes(tool.id);
          
          return (
            <div
              key={tool.id}
              onClick={() => toggleTool(tool.id)}
              className={`p-4 border rounded-lg cursor-pointer transition-all ${
                isSelected
                  ? "border-blue-500 bg-blue-50 ring-2 ring-blue-500/20"
                  : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    isSelected ? "bg-blue-100" : "bg-slate-100"
                  }`}>
                    <Icon className={`w-5 h-5 ${isSelected ? "text-blue-600" : "text-slate-600"}`} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">{tool.name}</h4>
                    <p className="text-sm text-slate-600">{tool.category}</p>
                    <p className="text-xs text-slate-500 mt-1">{tool.description}</p>
                  </div>
                </div>
                {isSelected && (
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Step5Review = ({
  data,
}: {
  data: {
    name: string;
    description: string;
    modelId: string;
    integrations: string[];
    tools: string[];
  };
}) => {
  const selectedModel = AVAILABLE_MODELS.find(m => m.id === data.modelId);
  const selectedIntegrations = AVAILABLE_INTEGRATIONS.filter(i => data.integrations.includes(i.id));
  const selectedTools = AVAILABLE_TOOLS.filter(t => data.tools.includes(t.id));

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-slate-900 mb-2">Review & Create</h3>
        <p className="text-slate-600">Review your agent configuration before creating it.</p>
      </div>

      <div className="space-y-6">
        {/* Basic Info */}
        <div className="bg-white border border-slate-200 rounded-lg p-6">
          <h4 className="font-semibold text-slate-900 mb-4">Basic Information</h4>
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-slate-700">Agent Name</label>
              <p className="text-slate-900">{data.name}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">Description</label>
              <p className="text-slate-600">{data.description}</p>
            </div>
          </div>
        </div>

        {/* Model */}
        <div className="bg-white border border-slate-200 rounded-lg p-6">
          <h4 className="font-semibold text-slate-900 mb-4">AI Model</h4>
          {selectedModel && (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Bot className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h5 className="font-semibold text-slate-900">{selectedModel.name}</h5>
                <p className="text-sm text-slate-600">{selectedModel.provider} • {selectedModel.contextLength.toLocaleString()} tokens</p>
              </div>
            </div>
          )}
        </div>

        {/* Integrations */}
        <div className="bg-white border border-slate-200 rounded-lg p-6">
          <h4 className="font-semibold text-slate-900 mb-4">
            Integrations ({selectedIntegrations.length})
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {selectedIntegrations.map((integration) => {
              const Icon = INTEGRATION_ICONS[integration.type];
              return (
                <div key={integration.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                  <Icon className="w-4 h-4 text-slate-600" />
                  <span className="text-sm font-medium text-slate-700">{integration.name}</span>
                </div>
              );
            })}
            {selectedIntegrations.length === 0 && (
              <p className="text-slate-500 text-sm">No integrations selected</p>
            )}
          </div>
        </div>

        {/* Tools */}
        <div className="bg-white border border-slate-200 rounded-lg p-6">
          <h4 className="font-semibold text-slate-900 mb-4">
            Tools ({selectedTools.length})
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {selectedTools.map((tool) => {
              const Icon = TOOL_ICONS[tool.icon];
              return (
                <div key={tool.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                  <Icon className="w-4 h-4 text-slate-600" />
                  <span className="text-sm font-medium text-slate-700">{tool.name}</span>
                </div>
              );
            })}
            {selectedTools.length === 0 && (
              <p className="text-slate-500 text-sm">No tools selected</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Create Agent Page
const CreateAgentPage = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    modelId: "",
    integrations: [] as string[],
    tools: [] as string[],
  });

  const totalSteps = 5;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      router.back();
    }
  };

  const handleFormDataChange = (newData: Partial<typeof formData>) => {
    setFormData(prev => ({ ...prev, ...newData }));
  };

  const handleCreateAgent = () => {
    // Here you would typically send the data to your backend
    console.log("Creating agent with data:", formData);
    
    // Simulate API call
    setTimeout(() => {
      router.push("/agents");
    }, 1000);
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.name.trim() && formData.description.trim();
      case 2:
        return !!formData.modelId;
      case 3:
      case 4:
        return true; // Integrations and tools are optional
      case 5:
        return formData.name.trim() && formData.description.trim() && formData.modelId;
      default:
        return false;
    }
  };

  const getStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1BasicInfo
            data={{ name: formData.name, description: formData.description }}
            onChange={(data) => handleFormDataChange(data)}
          />
        );
      case 2:
        return (
          <Step2ModelSelection
            data={{ modelId: formData.modelId }}
            onChange={(data) => handleFormDataChange(data)}
          />
        );
      case 3:
        return (
          <Step3Integrations
            data={{ integrations: formData.integrations }}
            onChange={(data) => handleFormDataChange(data)}
          />
        );
      case 4:
        return (
          <Step4Tools
            data={{ tools: formData.tools }}
            onChange={(data) => handleFormDataChange(data)}
          />
        );
      case 5:
        return <Step5Review data={formData} />;
      default:
        return null;
    }
  };

  const getStepTitle = () => {
    const titles = {
      1: "Basic Information",
      2: "AI Model",
      3: "Integrations",
      4: "Tools & Capabilities",
      5: "Review & Create",
    };
    return titles[currentStep as keyof typeof titles];
  };

  return (
    <>
      <Head>
        <title>Create New Agent - Workflow Agents</title>
        <meta name="description" content="Create a new workflow agent" />
      </Head>

      <div className="min-h-screen bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Agents
            </button>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              Create New Agent
            </h1>
            <p className="text-slate-600">
              Step {currentStep} of {totalSteps}: {getStepTitle()}
            </p>
          </div>

          {/* Step Indicator */}
          <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />

          {/* Form Content */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
            {getStepContent()}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 px-6 py-3 border border-slate-300 rounded-lg text-slate-700 hover:border-slate-400 hover:bg-slate-50 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              {currentStep === 1 ? "Cancel" : "Back"}
            </button>

            <div className="flex items-center gap-3">
              {currentStep === totalSteps ? (
                <button
                  onClick={handleCreateAgent}
                  disabled={!isStepValid()}
                  className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors"
                >
                  <Check className="w-4 h-4" />
                  Create Agent
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  disabled={!isStepValid()}
                  className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateAgentPage;