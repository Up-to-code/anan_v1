"use client";
import React, { useState } from "react";
import { 
  ArrowRight, Sparkles, Check, ArrowLeft, 
  Phone, MessageCircle, Mail, Database, User, 
  ShoppingCart, TrendingUp, CreditCard, 
  PieChart, Calendar, Cloud,
  Loader2, CheckCircle, Wand2,
  ChevronDown, X
} from "lucide-react";

// ========== MINIMAL CARD COMPONENT ==========
interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
  bordered?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
}

export const Card: React.FC<CardProps> = ({
  children,
  className = "",
  onClick,
  hoverable = false,
  bordered = true,
  padding = 'md',
  rounded = 'md'
}) => {
  const paddingClasses = {
    none: "",
    sm: "p-2",
    md: "p-4",
    lg: "p-6"
  };

  const roundedClasses = {
    none: "",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    full: "rounded-full"
  };

  const borderClass = bordered ? "border border-gray-200" : "";
  const hoverClass = hoverable ? "hover:border-gray-300 transition-colors cursor-pointer" : "";
  
  const combinedClasses = [
    "bg-white",
    paddingClasses[padding],
    roundedClasses[rounded],
    borderClass,
    hoverClass,
    className
  ].filter(Boolean).join(" ");

  return (
    <div 
      className={combinedClasses}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      } : undefined}
    >
      {children}
    </div>
  );
};

// ========== ICON COMPONENTS ==========
const ChatGPTIcon = () => (
  <svg width="20" height="20" viewBox="0 0 2406 2406" aria-label="ChatGPT">
    <path d="M1 578.4C1 259.5 259.5 1 578.4 1h1249.1c319 0 577.5 258.5 577.5 577.4V2406H578.4C259.5 2406 1 2147.5 1 1828.6V578.4z" fill="#74aa9c"/>
    <path d="M1107.3 299.1c-197.999 0-373.9 127.3-435.2 315.3L650 743.5v427.9c0 21.4 11 40.4 29.4 51.4l344.5 198.515V833.3h.1v-27.9L1372.7 604c33.715-19.52 70.44-32.857 108.47-39.828L1447.6 450.3C1361 353.5 1237.1 298.5 1107.3 299.1zm0 117.5-.6.6c79.699 0 156.3 27.5 217.6 78.4-2.5 1.2-7.4 4.3-11 6.1L952.8 709.3c-18.4 10.4-29.4 30-29.4 51.4V1248l-155.1-89.4V755.8c-.1-187.099 151.601-338.9 339-339.2z" fill="#fff"/>
  </svg>
);

const ClaudeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 512 512" aria-label="Claude">
    <rect width="512" height="512" fill="#CC9B7A" rx="104.187" ry="105.042"/>
    <path fill="#f0f0f0" fillRule="nonzero" d="M318.663 149.787h-43.368l78.952 212.423 43.368.004zm-125.326 0-78.952 212.427h44.255l15.932-44.608 82.846-.004 16.107 44.612h44.255l-79.126-212.427zm-4.251 128.341 26.91-74.701 27.083 74.701z"/>
  </svg>
);

const GeminiIcon = () => (
  <svg width="20" height="20" viewBox="0 0 30 30" aria-label="Gemini">
    <path fill="#257AF1" d="M24.51,28.51H5.49c-2.21,0-4-1.79-4-4V5.49c0-2.21,1.79-4,4-4h19.03c2.21,0,4,1.79,4,4v19.03C28.51,26.72,26.72,28.51,24.51,28.51z"/>
    <path fill="#fff" d="M15.47,7.1l-1.3,1.85c-0.2,0.29-0.54,0.47-0.9,0.47h-7.1V7.09C6.16,7.1,15.47,7.1,15.47,7.1z"/>
    <polygon fill="#fff" points="24.3,7.1 13.14,22.91 5.7,22.91 16.86,7.1"/>
    <path fill="#fff" d="M14.53,22.91l1.31-1.86c0.2-0.29,0.54-0.47,0.9-0.47h7.09v2.33H14.53z"/>
  </svg>
);

const MistralIcon = () => (
  <svg width="20" height="20" viewBox="0 0 397.46 281.64" aria-label="Mistral">
    <path d="M340.814 84.181 C 340.814 99.640,340.848 105.964,340.890 98.234 C 340.932 90.505,340.932 77.857,340.890 70.127 C 340.848 62.398,340.814 68.722,340.814 84.181 M170.339 112.147 C 170.069 112.321,149.330 112.422,113.206 112.425 L 56.497 112.429 56.497 140.494 L 56.497 168.558 106.285 168.691 C 157.316 168.827,261.045 168.838,312.147 168.714 L 340.819 168.644 340.746 140.537 L 340.673 112.429 283.771 112.429 C 246.141 112.429,226.810 112.334,226.695 112.147 C 226.459 111.765,170.929 111.765,170.339 112.147" fill="#fc8304"/>
  </svg>
);

const DeepSeekIcon = () => (
  <svg width="20" height="20" viewBox="0 0 377.1 277.86" aria-label="DeepSeek">
    <path fill="#4d6bfe" d="M373.15,23.32c-4-1.95-5.72,1.77-8.06,3.66-.79.62-1.47,1.43-2.14,2.14-5.85,6.26-12.67,10.36-21.57,9.86-13.04-.71-24.16,3.38-33.99,13.37-2.09-12.31-9.04-19.66-19.6-24.38-5.54-2.45-11.13-4.9-14.99-10.23-2.71-3.78-3.44-8-4.81-12.16-.85-2.51-1.72-5.09-4.6-5.52-3.13-.50-4.36,2.14-5.58,4.34-4.93,8.99-6.82,18.92-6.65,28.97.43,22.58,9.97,40.56,28.89,53.37,2.16,1.46,2.71,2.95,2.03,5.09-1.29,4.40-2.82,8.68-4.19,13.09-.85,2.82-2.14,3.44-5.15,2.20-10.39-4.34-19.37-10.76-27.29-18.55-13.46-13.02-25.63-27.41-40.81-38.67-3.57-2.64-7.12-5.09-10.81-7.41-15.49-15.07,2.03-27.45,6.08-28.9,4.25-1.52,1.47-6.79-12.23-6.73-13.69.06-26.24,4.65-42.21,10.76-2.34.93-4.79,1.61-7.32,2.14-14.50-2.73-29.55-3.35-45.29-1.58-29.62,3.32-53.28,17.34-70.68,41.28C1.29,88.20-3.63,120.88,2.39,155c6.33,35.91,24.64,65.68,52.8,88.94,29.18,24.10,62.8,35.91,101.15,33.65,23.29-1.33,49.23-4.46,78.48-29.24,7.38,3.66,15.12,5.12,27.97,6.23,9.89.93,19.41-.50,26.79-2.02,11.55-2.45,10.75-13.15,6.58-15.13-33.87-15.78-26.44-9.36-33.20-14.54,17.21-20.41,43.15-41.59,53.30-110.19.79-5.46.11-8.87,0-13.30-.06-2.67.54-3.72,3.61-4.03,8.48-.96,16.72-3.29,24.28-7.47,21.94-12,30.78-31.69,32.87-55.33.31-3.60-.06-7.35-3.86-9.24ZM181.96,235.97c-32.83-25.83-48.74-34.33-55.31-33.96-6.14.34-5.04,7.38-3.69,11.97,1.41,4.53,3.26,7.66,5.85,11.63,1.78,2.64,3.01,6.57-1.78,9.49-10.57,6.58-28.95-2.20-29.82-2.64-21.38-12.59-39.26-29.24-51.87-52.01-12.16-21.92-19.23-45.43-20.39-70.52-.31-6.08,1.47-8.22,7.49-9.30,7.92-1.46,16.11-1.77,24.03-.62,33.49,4.90,62.01,19.91,85.9,43.63,13.65,13.55,23.97,29.71,34.61,45.49,11.30,16.78,23.48,32.75,38.97,45.84,5.46,4.59,9.83,8.09,14,10.67-12.59,1.40-33.62,1.71-47.99-9.68ZM197.69,134.65c0-2.70,2.15-4.84,4.87-4.84.60,0,1.16.12,1.66.31.67.25,1.29.62,1.77,1.18.87.84,1.36,2.08,1.36,3.35,0,2.70-2.15,4.84-4.85,4.84s-4.81-2.14-4.81-4.84ZM246.55,159.77c-3.13,1.27-6.26,2.39-9.27,2.51-4.67.22-9.77-1.68-12.55-4-4.30-3.60-7.36-5.61-8.67-11.94-.54-2.70-.23-6.85.25-9.24,1.12-5.15-.12-8.44-3.74-11.44-2.96-2.45-6.70-3.10-10.82-3.10-1.54,0-2.95-.68-4-1.24-1.72-.87-3.13-3.01-1.78-5.64.43-.84,2.53-2.92,3.02-3.29,5.58-3.19,12.03-2.14,18,.25,5.54,2.26,9.71,6.42,15.72,12.28,6.16,7.10,7.26,9.09,10.76,14.39,2.76,4.19,5.29,8.47,7.01,13.37,1.04,3.04-.31,5.55-3.94,7.10Z"/>
  </svg>
);

// ========== CONSTANTS ==========
const MODELS = [
  { id: "gpt4", name: "GPT-4", icon: <ChatGPTIcon /> },
  { id: "claude", name: "Claude 3", icon: <ClaudeIcon /> },
  { id: "gemini", name: "Gemini Pro", icon: <GeminiIcon /> },
  { id: "mistral", name: "Mistral AI", icon: <MistralIcon /> },
  { id: "deepseek", name: "DeepSeek", icon: <DeepSeekIcon /> },
];

const TOOLS = [
  { id: "booking-call", name: "Calls", icon: <Phone className="w-4 h-4" /> },
  { id: "whatsapp", name: "WhatsApp", icon: <MessageCircle className="w-4 h-4" /> },
  { id: "email", name: "Email", icon: <Mail className="w-4 h-4" /> },
  { id: "crm-access", name: "CRM", icon: <Database className="w-4 h-4" /> },
  { id: "contact-save", name: "Contacts", icon: <User className="w-4 h-4" /> },
  { id: "order-create", name: "Orders", icon: <ShoppingCart className="w-4 h-4" /> },
  { id: "upsell", name: "Sales", icon: <TrendingUp className="w-4 h-4" /> },
  { id: "payment", name: "Payments", icon: <CreditCard className="w-4 h-4" /> },
  { id: "analytics", name: "Analytics", icon: <PieChart className="w-4 h-4" /> },
  { id: "calendar", name: "Calendar", icon: <Calendar className="w-4 h-4" /> },
  { id: "file-upload", name: "Files", icon: <Cloud className="w-4 h-4" /> },
];

const STEPS = [
  { number: 1, title: "Name", description: "Choose assistant name" },
  { number: 2, title: "AI Model", description: "Select intelligence" },
  { number: 3, title: "Tools", description: "Pick capabilities" },
  { number: 4, title: "Personality", description: "Set behavior" },
];

// ========== SIMPLIFIED COMPONENTS ==========
interface StepIndicatorProps {
  steps: typeof STEPS;
  currentStep: number;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({
  steps,
  currentStep,
}) => {
  return (
    <div className="w-64 p-6 border-r border-gray-200 bg-gray-50">
      <div className="space-y-4">
        {steps.map((item) => (
          <div key={item.number} className="flex items-center gap-3">
            <div 
              className={`w-8 h-8 rounded-md flex items-center justify-center font-medium ${
                currentStep === item.number ? 'bg-blue-600 text-white' : 
                currentStep > item.number ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'
              }`}
              aria-label={`Step ${item.number}: ${item.title} - ${currentStep === item.number ? 'current' : currentStep > item.number ? 'completed' : 'pending'}`}
            >
              {currentStep > item.number ? <Check className="w-4 h-4" /> : item.number}
            </div>
            <div>
              <div className={`font-medium ${
                currentStep === item.number ? 'text-blue-600' : 
                currentStep > item.number ? 'text-gray-900' : 'text-gray-500'
              }`}>
                {item.title}
              </div>
              <div className="text-xs text-gray-500">{item.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

interface SuccessMessageProps {
  title: string;
  message: string;
  onClose: () => void;
  show: boolean;
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({
  title,
  message,
  onClose,
  show
}) => {
  if (!show) return null;

  return (
    <div 
      className="bg-green-50 border-b border-green-200 p-4"
      role="status"
      aria-live="polite"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-5 h-5 text-green-600" aria-hidden="true" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-green-800">{title}</h3>
            <p className="text-sm text-green-600">{message}</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-green-400 hover:text-green-600 transition-colors"
          aria-label="Close success message"
        >
          <X className="w-5 h-5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};

interface ModelSelectorProps {
  models: typeof MODELS;
  selectedModelId: string;
  onModelChange: (modelId: string) => void;
}

const ModelSelector: React.FC<ModelSelectorProps> = ({
  models,
  selectedModelId,
  onModelChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedModel = models.find(m => m.id === selectedModelId);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Choose AI Model</h1>
      <p className="text-gray-600 mb-6">Select the intelligence powering your assistant</p>

      <div className="relative">
        <button
          className="w-full text-left flex items-center justify-between p-4 border border-gray-200 rounded-md bg-white hover:border-gray-300 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-label="Select AI model"
        >
          <div className="flex items-center gap-3">
            {selectedModel?.icon}
            <span className="font-medium">{selectedModel?.name}</span>
          </div>
          <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
        </button>
        
        {isOpen && (
          <div 
            className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md max-h-60 overflow-y-auto"
            role="listbox"
          >
            {models.map((model) => (
              <button
                key={model.id}
                className={`w-full text-left flex items-center gap-3 p-3 hover:bg-gray-50 ${
                  selectedModelId === model.id ? 'bg-blue-50' : ''
                }`}
                onClick={() => { onModelChange(model.id); setIsOpen(false); }}
                role="option"
                aria-selected={selectedModelId === model.id}
              >
                {model.icon}
                <span className="font-medium">{model.name}</span>
                {selectedModelId === model.id && (
                  <Check className="w-5 h-5 text-blue-600 ml-auto" aria-hidden="true" />
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

interface ToolGridProps {
  tools: typeof TOOLS;
  selectedTools: string[];
  onToolToggle: (toolId: string) => void;
}

const ToolGrid: React.FC<ToolGridProps> = ({
  tools,
  selectedTools,
  onToolToggle,
}) => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Select Tools</h1>
      <p className="text-gray-600 mb-6">Choose what your assistant can do</p>

      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {tools.map((tool) => {
          const isSelected = selectedTools.includes(tool.id);
          return (
            <button
              key={tool.id}
              className={`flex flex-col items-center gap-2 p-3 border rounded-md transition-all hover:scale-105 ${
                isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'
              }`}
              onClick={() => onToolToggle(tool.id)}
              aria-pressed={isSelected}
            >
              <div className={`p-2 rounded-md ${
                isSelected ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'
              }`}>
                {tool.icon}
              </div>
              <span className="text-sm font-medium text-center">{tool.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

interface NavigationButtonsProps {
  currentStep: number;
  onPrev: () => void;
  onNext: () => void;
  onFinish?: () => void;
  isLoading?: boolean;
  nextDisabled?: boolean;
  showFinish?: boolean;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  currentStep,
  onPrev,
  onNext,
  onFinish,
  isLoading = false,
  nextDisabled = false,
  showFinish = false,
}) => {
  return (
    <div className="mt-8">
      <div className="flex gap-3">
        {currentStep > 1 && (
          <button
            onClick={onPrev}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors flex items-center gap-2"
            aria-label="Go to previous step"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            Back
          </button>
        )}
        
        <button
          onClick={showFinish ? onFinish : onNext}
          disabled={nextDisabled || isLoading}
          className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-medium transition-colors"
          aria-label={showFinish ? "Create assistant" : "Continue to next step"}
        >
          {showFinish ? (
            isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
                Creating...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" aria-hidden="true" />
                Create Assistant
              </>
            )
          ) : (
            <>
              Continue
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

// ========== MAIN COMPONENT ==========
interface FormData {
  name: string;
  modelId: string;
  prompt: string;
  capabilities: string[];
}

export default function CreateAssistant() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormData>({
    name: "",
    modelId: "gpt4",
    prompt: "",
    capabilities: [],
  });
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const updateData = (updates: Partial<FormData>) => {
    setData(prev => ({ ...prev, ...updates }));
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, 4));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const toggleTool = (id: string) => {
    setData(prev => ({
      ...prev,
      capabilities: prev.capabilities.includes(id)
        ? prev.capabilities.filter(i => i !== id)
        : [...prev.capabilities, id]
    }));
  };

  const generatePrompt = () => {
    updateData({
      prompt: `You are "${data.name}", a helpful AI assistant. Be professional, clear, and focused on solving user problems efficiently.`
    });
  };

  const createAssistant = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1200));
    setLoading(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 5000);
  };

  const resetForm = () => {
    setStep(1);
    setData({
      name: "",
      modelId: "gpt4",
      prompt: "",
      capabilities: [],
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Success Message */}
      <SuccessMessage
        title="Assistant Created Successfully!"
        message={`"${data.name}" is now ready to use. You can start interacting with your new AI assistant.`}
        onClose={() => setShowSuccess(false)}
        show={showSuccess}
      />

      <div className="flex">
        <StepIndicator steps={STEPS} currentStep={step} />
        
        <main className="flex-1 p-8">
          <div className="max-w-2xl">
            {/* Step 1: Name Input */}
            {step === 1 && (
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Assistant Name</h1>
                <p className="text-gray-600 mb-6">What should we call your AI assistant?</p>
                
                <div className="mb-8 border border-gray-200 rounded-md bg-white">
                  <input
                    type="text"
                    value={data.name}
                    onChange={(e) => updateData({ name: e.target.value })}
                    onKeyDown={(e) => e.key === 'Enter' && data.name.trim().length > 0 && nextStep()}
                    placeholder="e.g., Sales Assistant, Support Bot..."
                    className="w-full px-4 py-3 border-0 focus:outline-none focus:ring-0 rounded-md"
                    autoFocus
                    aria-label="Assistant name"
                  />
                </div>

                <NavigationButtons
                  currentStep={1}
                  onPrev={() => {}}
                  onNext={nextStep}
                  nextDisabled={!data.name.trim().length}
                />
              </div>
            )}

            {/* Step 2: Model Selection */}
            {step === 2 && (
              <div>
                <ModelSelector
                  models={MODELS}
                  selectedModelId={data.modelId}
                  onModelChange={(modelId) => updateData({ modelId })}
                />

                <NavigationButtons
                  currentStep={2}
                  onPrev={prevStep}
                  onNext={nextStep}
                />
              </div>
            )}

            {/* Step 3: Tools Selection */}
            {step === 3 && (
              <div>
                <ToolGrid
                  tools={TOOLS}
                  selectedTools={data.capabilities}
                  onToolToggle={toggleTool}
                />

                <NavigationButtons
                  currentStep={3}
                  onPrev={prevStep}
                  onNext={nextStep}
                  nextDisabled={data.capabilities.length === 0}
                />
              </div>
            )}

            {/* Step 4: Personality */}
            {step === 4 && (
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Define Personality</h1>
                <p className="text-gray-600 mb-6">Describe how your assistant should behave</p>

                <div className="mb-8">
                  <div className="border border-gray-200 rounded-md bg-white">
                    <textarea
                      value={data.prompt}
                      onChange={(e) => updateData({ prompt: e.target.value })}
                      placeholder="Example: You are a friendly sales assistant. Be professional, enthusiastic, and always help customers find the best products for their needs..."
                      className="w-full h-48 p-4 border-0 resize-none focus:outline-none focus:ring-0 rounded-md"
                      autoFocus
                      aria-label="Assistant personality prompt"
                    />
                  </div>
                  <div className="flex justify-between items-center mt-3">
                    <button 
                      onClick={generatePrompt}
                      className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
                      aria-label="Auto-generate prompt"
                    >
                      <Wand2 className="w-4 h-4" aria-hidden="true" />
                      Auto-generate prompt
                    </button>
                    <span className="text-sm text-gray-500">{data.prompt.length} characters</span>
                  </div>
                </div>

                <NavigationButtons
                  currentStep={4}
                  onPrev={prevStep}
                  onNext={createAssistant}
                  onFinish={createAssistant}
                  isLoading={loading}
                  nextDisabled={!data.prompt.trim().length}
                  showFinish={true}
                />
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Reset Button */}
      {(data.name || data.capabilities.length > 0 || data.prompt) && !showSuccess && (
        <footer className="border-t bg-gray-50 p-4">
          <div className="max-w-7xl mx-auto flex justify-end">
            <button
              onClick={resetForm}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 font-medium transition-colors"
              aria-label="Reset form"
            >
              Reset Form
            </button>
          </div>
        </footer>
      )}
    </div>
  );
}