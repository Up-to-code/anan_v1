"use client";
import React, { useState } from "react";
import { 
  MessageCircle, Users, TrendingUp, Zap, Settings, Play, Pause,
  FileText, BarChart3, Sparkles, Bot, Plus, Upload, File, Trash2, 
  Search, MessageSquare, Smartphone, Save, HelpCircle, Lightbulb, 
  X, ArrowRight, Edit, Check, Copy, RefreshCw, ExternalLink,
  CheckCircle, Circle, AlertCircle
} from "lucide-react";

// ========== MODAL ==========
const Modal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-auto">
        <div className="sticky top-0 bg-white px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-xl font-bold text-gray-900">{title}</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

// ========== MAIN ==========
export default function AgentDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [agentStatus, setAgentStatus] = useState('active');
  const [showHelp, setShowHelp] = useState(false);
  const [currentHelp, setCurrentHelp] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  
  // WhatsApp Integration
  const [showWhatsAppSetup, setShowWhatsAppSetup] = useState(false);
  const [whatsappStep, setWhatsappStep] = useState(1);
  const [apiToken, setApiToken] = useState('');
  const [customWebhookUrl, setCustomWebhookUrl] = useState('');
  const [generatedWebhookUrl, setGeneratedWebhookUrl] = useState('https://api.yourdomain.com/webhook/wa-' + Math.random().toString(36).substr(2, 9));
  const [verificationToken, setVerificationToken] = useState('verify_' + Math.random().toString(36).substr(2, 12));
  const [webhookVerified, setWebhookVerified] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [copySuccess, setCopySuccess] = useState('');
  
  // Knowledge Base
  const [showAddQA, setShowAddQA] = useState(false);
  const [qaList, setQaList] = useState<Array<{id: number, question: string, answer: string}>>([]);
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');
  const [editingQA, setEditingQA] = useState<number | null>(null);
  
  // Files
  const [files, setFiles] = useState([
    { id: 1, name: 'product-info.pdf', size: '2.3 MB' },
    { id: 2, name: 'faq-document.docx', size: '1.1 MB' }
  ]);
  
  // Integrations
  const [platforms, setPlatforms] = useState({
    whatsapp: false,
    email: false,
    website: true
  });
  const [useQAFirst, setUseQAFirst] = useState(true);
  const [messageLimit, setMessageLimit] = useState('100');
  
  // Settings
  const [aiName, setAiName] = useState('Sales Assistant');
  const [aiModel, setAiModel] = useState('gpt4-turbo');
  const [personality, setPersonality] = useState('');
  const [learnFromChats, setLearnFromChats] = useState(true);
  const [settingsSaved, setSettingsSaved] = useState(false);

  const stats = [
    { title: "Total Chats", value: "1,247", change: 12.5, icon: <MessageCircle className="w-5 h-5" /> },
    { title: "Success Rate", value: "94%", change: 3.1, icon: <TrendingUp className="w-5 h-5" /> },
    { title: "Active Users", value: "243", change: 8.2, icon: <Users className="w-5 h-5" /> },
    { title: "Response Time", value: "2.3s", change: -15.2, icon: <Zap className="w-5 h-5" /> }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'knowledge', label: 'Knowledge', icon: FileText },
    { id: 'integrations', label: 'Integrations', icon: Smartphone },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const helpContent = {
    overview: {
      title: "📊 Dashboard Overview",
      content: "This is your main dashboard where you can see how your AI assistant is performing. Check metrics like chat volume, success rates, and response times.",
      tip: "Check this daily to monitor your AI's performance"
    },
    knowledge: {
      title: "🧠 Knowledge Base",
      content: "Add your business information here. Upload documents or create Q&A pairs to help your AI provide accurate answers and reduce costs.",
      tip: "Add at least 5 Q&A pairs to reduce AI costs by 40%"
    },
    integrations: {
      title: "🔗 Integrations",
      content: "Connect your AI to messaging platforms like WhatsApp and email. Enable smart features to save money on AI usage.",
      tip: "Connect WhatsApp first - it's where most customers prefer to chat"
    },
    settings: {
      title: "⚙️ Settings",
      content: "Customize your AI's personality and behavior. Choose the right AI model for your needs and budget.",
      tip: "Start with GPT-4 Turbo for the best balance of cost and performance"
    }
  };

  const openHelp = (tab: string) => {
    setCurrentHelp(tab);
    setShowHelp(true);
  };

  // WhatsApp Functions
  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopySuccess(label);
    setTimeout(() => setCopySuccess(''), 2000);
  };

  const handleVerifyWebhook = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setWebhookVerified(true);
      setIsVerifying(false);
    }, 2000);
  };

  const handleCompleteWhatsAppSetup = () => {
    setPlatforms({...platforms, whatsapp: true});
    setShowWhatsAppSetup(false);
    setWhatsappStep(1);
  };

  const generateNewWebhook = () => {
    setGeneratedWebhookUrl('https://api.yourdomain.com/webhook/wa-' + Math.random().toString(36).substr(2, 9));
    setVerificationToken('verify_' + Math.random().toString(36).substr(2, 12));
    setWebhookVerified(false);
  };

  // Knowledge Base Functions
  const handleAddQA = () => {
    if (newQuestion.trim() && newAnswer.trim()) {
      if (editingQA !== null) {
        setQaList(qaList.map(qa => 
          qa.id === editingQA ? { ...qa, question: newQuestion, answer: newAnswer } : qa
        ));
        setEditingQA(null);
      } else {
        setQaList([...qaList, { id: Date.now(), question: newQuestion, answer: newAnswer }]);
      }
      setNewQuestion('');
      setNewAnswer('');
      setShowAddQA(false);
    }
  };

  const handleEditQA = (qa: any) => {
    setNewQuestion(qa.question);
    setNewAnswer(qa.answer);
    setEditingQA(qa.id);
    setShowAddQA(true);
  };

  const handleDeleteQA = (id: number) => {
    setQaList(qaList.filter(qa => qa.id !== id));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = e.target.files;
    if (uploadedFiles) {
      Array.from(uploadedFiles).forEach(file => {
        setFiles([...files, { 
          id: Date.now(), 
          name: file.name, 
          size: `${(file.size / 1024 / 1024).toFixed(1)} MB` 
        }]);
      });
    }
  };

  const handleDeleteFile = (id: number) => {
    setFiles(files.filter(file => file.id !== id));
  };

  const handleSaveSettings = () => {
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Help Modal */}
      <Modal isOpen={showHelp} onClose={() => setShowHelp(false)} title={helpContent[currentHelp as keyof typeof helpContent]?.title || "Help"}>
        <div className="space-y-6">
          <p className="text-gray-700 leading-relaxed">
            {helpContent[currentHelp as keyof typeof helpContent]?.content}
          </p>
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-100">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-white rounded-lg">
                <Lightbulb className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-semibold text-blue-900 mb-1">Pro Tip</h4>
                <p className="text-blue-800 text-sm leading-relaxed">
                  {helpContent[currentHelp as keyof typeof helpContent]?.tip}
                </p>
              </div>
            </div>
          </div>
          <button onClick={() => setShowHelp(false)} className="w-full py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-semibold transition-colors">
            Got it!
          </button>
        </div>
      </Modal>

      {/* WhatsApp Setup Modal */}
      <Modal isOpen={showWhatsAppSetup} onClose={() => setShowWhatsAppSetup(false)} title="Connect WhatsApp">
        <div className="space-y-6">
          {/* Progress Steps */}
          <div className="flex items-center justify-between mb-8">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center flex-1">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
                  whatsappStep >= step ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-gray-300 text-gray-400'
                }`}>
                  {whatsappStep > step ? <Check className="w-5 h-5" /> : step}
                </div>
                {step < 4 && (
                  <div className={`flex-1 h-1 mx-2 transition-colors ${
                    whatsappStep > step ? 'bg-blue-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>

          {/* Step 1: API Token */}
          {whatsappStep === 1 && (
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
                <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                <div className="text-sm text-blue-800">
                  <p className="font-medium mb-1">Get your WhatsApp API Token</p>
                  <p>Visit <a href="https://business.facebook.com" target="_blank" className="underline">Meta Business Suite</a> and generate your API token from the WhatsApp Business settings.</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">WhatsApp API Token</label>
                <input
                  type="text"
                  value={apiToken}
                  onChange={(e) => setApiToken(e.target.value)}
                  placeholder="EAAxxxxxxxxxxxxxxxxxxxxxxxx"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button 
                onClick={() => apiToken.trim() && setWhatsappStep(2)}
                disabled={!apiToken.trim()}
                className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed font-medium transition-colors"
              >
                Continue to Webhook Setup
              </button>
            </div>
          )}

          {/* Step 2: Webhook URL */}
          {whatsappStep === 2 && (
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 bg-green-50 rounded-xl border border-green-100">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                <div className="text-sm text-green-800">
                  <p className="font-medium mb-1">API Token Saved!</p>
                  <p>Now let's set up your webhook to receive messages.</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Choose Webhook Option</label>
                <div className="space-y-3">
                  <div className="p-4 border-2 border-blue-500 bg-blue-50 rounded-lg">
                    <div className="flex items-start gap-3">
                      <input type="radio" name="webhook" checked readOnly className="mt-1" />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 mb-1">Use Our Generated Webhook (Recommended)</h4>
                        <p className="text-sm text-gray-600 mb-3">We'll create and manage a secure webhook URL for you.</p>
                        <div className="bg-white p-3 rounded-lg border border-gray-200">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-medium text-gray-500">Your Webhook URL</span>
                            <button 
                              onClick={() => copyToClipboard(generatedWebhookUrl, 'webhook')}
                              className="text-blue-600 hover:text-blue-700 flex items-center gap-1 text-xs"
                            >
                              <Copy className="w-3 h-3" />
                              {copySuccess === 'webhook' ? 'Copied!' : 'Copy'}
                            </button>
                          </div>
                          <code className="text-sm text-gray-800 break-all">{generatedWebhookUrl}</code>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border border-gray-300 rounded-lg opacity-50">
                    <div className="flex items-start gap-3">
                      <input type="radio" name="webhook" disabled className="mt-1" />
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">Use Custom Webhook URL</h4>
                        <p className="text-sm text-gray-600">For advanced users who host their own webhook.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button 
                  onClick={() => setWhatsappStep(1)}
                  className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
                >
                  Back
                </button>
                <button 
                  onClick={() => setWhatsappStep(3)}
                  className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
                >
                  Continue to Verification
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Verification */}
          {whatsappStep === 3 && (
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-xl border border-purple-100">
                <Sparkles className="w-5 h-5 text-purple-600 mt-0.5" />
                <div className="text-sm text-purple-800">
                  <p className="font-medium mb-1">Configure WhatsApp Webhook</p>
                  <p>Add this webhook URL and verification token to your WhatsApp Business API settings.</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-gray-700">Webhook URL</label>
                    <button 
                      onClick={() => copyToClipboard(generatedWebhookUrl, 'webhook-verify')}
                      className="text-blue-600 hover:text-blue-700 flex items-center gap-1 text-sm"
                    >
                      <Copy className="w-4 h-4" />
                      {copySuccess === 'webhook-verify' ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <code className="text-sm text-gray-800 break-all">{generatedWebhookUrl}</code>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-gray-700">Verification Token</label>
                    <button 
                      onClick={() => copyToClipboard(verificationToken, 'token')}
                      className="text-blue-600 hover:text-blue-700 flex items-center gap-1 text-sm"
                    >
                      <Copy className="w-4 h-4" />
                      {copySuccess === 'token' ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <code className="text-sm text-gray-800 break-all">{verificationToken}</code>
                  </div>
                </div>

                <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <h4 className="font-medium text-yellow-900 mb-2">Setup Instructions:</h4>
                  <ol className="text-sm text-yellow-800 space-y-1 list-decimal list-inside">
                    <li>Go to WhatsApp Business API Settings</li>
                    <li>Navigate to Configuration → Webhooks</li>
                    <li>Paste the Webhook URL above</li>
                    <li>Paste the Verification Token</li>
                    <li>Click "Verify and Save"</li>
                    <li>Return here and click "Verify Connection"</li>
                  </ol>
                </div>

                {webhookVerified && (
                  <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <div>
                      <h4 className="font-medium text-green-900">Webhook Verified!</h4>
                      <p className="text-sm text-green-700">Your WhatsApp integration is ready.</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-3">
                <button 
                  onClick={() => setWhatsappStep(2)}
                  className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
                >
                  Back
                </button>
                <button 
                  onClick={handleVerifyWebhook}
                  disabled={isVerifying || webhookVerified}
                  className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 font-medium transition-colors flex items-center justify-center gap-2"
                >
                  {isVerifying && <RefreshCw className="w-4 h-4 animate-spin" />}
                  {webhookVerified ? 'Verified' : isVerifying ? 'Verifying...' : 'Verify Connection'}
                </button>
              </div>

              {webhookVerified && (
                <button 
                  onClick={() => setWhatsappStep(4)}
                  className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium transition-colors"
                >
                  Continue to Final Step
                </button>
              )}
            </div>
          )}

          {/* Step 4: Complete */}
          {whatsappStep === 4 && (
            <div className="space-y-6 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">All Set! 🎉</h3>
                <p className="text-gray-600">Your WhatsApp integration is now active and ready to receive messages.</p>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-100">
                <h4 className="font-semibold text-gray-900 mb-3">What happens next?</h4>
                <ul className="text-sm text-gray-700 space-y-2 text-left">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                    <span>Messages sent to your WhatsApp number will be received by your AI</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                    <span>Your AI will respond automatically based on your knowledge base</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                    <span>You can monitor all conversations in the dashboard</span>
                  </li>
                </ul>
              </div>

              <div className="flex gap-3">
                <button 
                  onClick={generateNewWebhook}
                  className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  Reset Setup
                </button>
                <button 
                  onClick={handleCompleteWhatsAppSetup}
                  className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
                >
                  Complete Setup
                </button>
              </div>
            </div>
          )}
        </div>
      </Modal>

      {/* Add Q&A Modal */}
      <Modal isOpen={showAddQA} onClose={() => { setShowAddQA(false); setEditingQA(null); setNewQuestion(''); setNewAnswer(''); }} title={editingQA ? "Edit Q&A" : "Add New Q&A"}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Question</label>
            <input
              type="text"
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              placeholder="e.g., What are your business hours?"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Answer</label>
            <textarea
              value={newAnswer}
              onChange={(e) => setNewAnswer(e.target.value)}
              placeholder="e.g., We're open Monday to Friday, 9 AM to 6 PM"
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => { setShowAddQA(false); setEditingQA(null); setNewQuestion(''); setNewAnswer(''); }}
              className="flex-1 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={handleAddQA}
              className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {editingQA ? 'Update' : 'Add'}
            </button>
          </div>
        </div>
      </Modal>

      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{aiName}</h1>
                <p className="text-gray-600">Your AI customer support agent</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                />
              </div>
              
              <button 
                onClick={() => setAgentStatus(agentStatus === 'active' ? 'paused' : 'active')} 
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${agentStatus === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}
              >
                {agentStatus === 'active' ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
                {agentStatus === 'active' ? 'Active' : 'Paused'}
              </button>

              <button onClick={() => openHelp(activeTab)} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                <HelpCircle className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="px-6">
          <div className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 py-4 border-b-2 font-medium transition-colors ${activeTab === tab.id ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Welcome to your AI Dashboard! 👋</h3>
                  <p className="text-gray-600">This is where you manage your AI assistant. Start by adding business knowledge.</p>
                </div>
                <button onClick={() => setActiveTab('knowledge')} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors">
                  Get Started
                </button>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-6">
              {stats.map((stat, i) => (
                <div key={i} className="bg-white border border-gray-200 rounded-xl p-6 hover:border-blue-300 transition-colors cursor-pointer" onClick={() => openHelp('overview')}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2 rounded-lg bg-blue-50 text-blue-600">{stat.icon}</div>
                    <div className={`text-sm ${stat.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.change >= 0 ? '+' : ''}{stat.change}%
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                  <p className="text-gray-600 text-sm">{stat.title}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white border border-gray-200 rounded-xl">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">Recent Chats</h3>
                    <button className="text-sm text-blue-600 hover:text-blue-700 transition-colors">View All</button>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 font-semibold">SJ</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">Sarah Johnson</h4>
                      <p className="text-gray-600 text-sm">"Hello, I need help with my order..."</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500">2:30 PM</div>
                      <div className="text-green-600 text-sm">✓ Resolved</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-semibold">MC</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">Mike Chen</h4>
                      <p className="text-gray-600 text-sm">"Can you tell me about return policy?"</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500">2:15 PM</div>
                      <div className="text-green-600 text-sm">✓ Resolved</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Quick Setup</h3>
                </div>
                <div className="p-6 space-y-4">
                  <button onClick={() => setActiveTab('knowledge')} className="w-full flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors">
                    <FileText className="w-5 h-5 text-blue-600" />
                    <div className="text-left flex-1">
                      <h4 className="font-medium text-gray-900">Add Business Knowledge</h4>
                      <p className="text-sm text-gray-600">Upload documents or create Q&A</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </button>

                  <button onClick={() => setShowWhatsAppSetup(true)} className="w-full flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors">
                    <Smartphone className="w-5 h-5 text-green-600" />
                    <div className="text-left flex-1">
                      <h4 className="font-medium text-gray-900">Connect WhatsApp</h4>
                      <p className="text-sm text-gray-600">Reach customers where they are</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </button>

                  <button onClick={() => setActiveTab('settings')} className="w-full flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors">
                    <Sparkles className="w-5 h-5 text-purple-600" />
                    <div className="text-left flex-1">
                      <h4 className="font-medium text-gray-900">Customize AI</h4>
                      <p className="text-sm text-gray-600">Set personality and behavior</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* KNOWLEDGE */}
        {activeTab === 'knowledge' && (
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">Teach Your AI About Your Business</h2>
                  <p className="text-gray-600">Add common questions and business documents. This helps your AI provide better answers and reduces costs.</p>
                </div>
                <button onClick={() => openHelp('knowledge')} className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                  <HelpCircle className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white border border-gray-200 rounded-xl">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">Common Questions ({qaList.length})</h3>
                    <button onClick={() => setShowAddQA(true)} className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      <Plus className="w-4 h-4" />
                      Add Q&A
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  {qaList.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <FileText className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                      <p className="text-gray-600 mb-2">No questions added yet</p>
                      <p className="text-sm text-gray-500">Add common customer questions to help your AI respond faster</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {qaList.map(qa => (
                        <div key={qa.id} className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-medium text-gray-900">{qa.question}</h4>
                            <div className="flex gap-2">
                              <button onClick={() => handleEditQA(qa)} className="text-blue-600 hover:text-blue-700">
                                <Edit className="w-4 h-4" />
                              </button>
                              <button onClick={() => handleDeleteQA(qa.id)} className="text-red-600 hover:text-red-700">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600">{qa.answer}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Business Documents ({files.length})</h3>
                </div>
                <div className="p-6">
                  <label className="block border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 hover:bg-blue-50/50 transition-colors cursor-pointer">
                    <input type="file" multiple onChange={handleFileUpload} className="hidden" />
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-lg font-medium text-gray-900 mb-2">Upload Files</p>
                    <p className="text-gray-600 mb-4">PDF, Word, or Text files about your business</p>
                    <span className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      <Upload className="w-4 h-4" />
                      Choose Files
                    </span>
                  </label>

                  <div className="mt-6">
                    <h4 className="font-medium text-gray-900 mb-4">Your Files</h4>
                    <div className="space-y-2">
                      {files.map(file => (
                        <div key={file.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
                          <div className="flex items-center gap-3">
                            <File className="w-5 h-5 text-blue-600" />
                            <div>
                              <div className="text-gray-700 font-medium">{file.name}</div>
                              <div className="text-xs text-gray-500">{file.size}</div>
                            </div>
                          </div>
                          <button onClick={() => handleDeleteFile(file.id)} className="text-gray-400 hover:text-red-600 transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* INTEGRATIONS */}
        {activeTab === 'integrations' && (
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <Smartphone className="w-6 h-6 text-green-600" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">Connect Your AI to Messaging Apps</h2>
                  <p className="text-gray-600">Reach customers on their favorite platforms. Enable smart features to save money on AI usage.</p>
                </div>
                <button onClick={() => openHelp('integrations')} className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                  <HelpCircle className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white border border-gray-200 rounded-xl">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Messaging Platforms</h3>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
                    <div className="flex items-center gap-3">
                      <MessageSquare className="w-5 h-5 text-gray-600" />
                      <div>
                        <span className="font-medium text-gray-900 block">WhatsApp</span>
                        {platforms.whatsapp && <span className="text-xs text-green-600">Connected</span>}
                      </div>
                    </div>
                    {!platforms.whatsapp ? (
                      <button 
                        onClick={() => setShowWhatsAppSetup(true)}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium transition-colors"
                      >
                        Setup
                      </button>
                    ) : (
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={platforms.whatsapp}
                          onChange={() => setPlatforms({...platforms, whatsapp: !platforms.whatsapp})}
                          className="sr-only peer" 
                        />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    )}
                  </div>

                  {Object.entries(platforms).filter(([key]) => key !== 'whatsapp').map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
                      <div className="flex items-center gap-3">
                        <MessageSquare className="w-5 h-5 text-gray-600" />
                        <span className="font-medium text-gray-900 capitalize">{key === 'website' ? 'Website Chat' : key}</span>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={value}
                          onChange={() => setPlatforms({...platforms, [key]: !value})}
                          className="sr-only peer" 
                        />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Save Money</h3>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl border border-blue-100">
                    <div>
                      <h4 className="font-medium text-gray-900">Use Q&A First</h4>
                      <p className="text-sm text-gray-600">Cheaper than AI responses</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={useQAFirst}
                        onChange={() => setUseQAFirst(!useQAFirst)}
                        className="sr-only peer" 
                      />
                      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl border border-green-100">
                    <div>
                      <h4 className="font-medium text-gray-900">Limit AI Usage</h4>
                      <p className="text-sm text-gray-600">Control your costs</p>
                    </div>
                    <select 
                      value={messageLimit}
                      onChange={(e) => setMessageLimit(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    >
                      <option value="50">50 msg/hour</option>
                      <option value="100">100 msg/hour</option>
                      <option value="200">200 msg/hour</option>
                      <option value="500">500 msg/hour</option>
                    </select>
                  </div>

                  <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-100">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="w-5 h-5 text-yellow-600" />
                      <h4 className="font-medium text-gray-900">Cost Summary</h4>
                    </div>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between text-gray-600">
                        <span>Estimated monthly cost:</span>
                        <span className="font-medium text-gray-900">$127</span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>Saved with Q&A:</span>
                        <span className="font-medium text-green-600">-$53</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SETTINGS */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                  <Settings className="w-6 h-6 text-orange-600" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">Customize Your AI Assistant</h2>
                  <p className="text-gray-600">Choose how your AI behaves and responds to customers.</p>
                </div>
                <button onClick={() => openHelp('settings')} className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                  <HelpCircle className="w-5 h-5" />
                </button>
              </div>
            </div>

            {settingsSaved && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <Check className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-green-900">Settings Saved!</h4>
                    <p className="text-sm text-green-700">Your changes have been applied successfully.</p>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white border border-gray-200 rounded-xl">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Basic Settings</h3>
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">AI Name</label>
                    <input 
                      type="text" 
                      value={aiName}
                      onChange={(e) => setAiName(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">AI Model</label>
                    <select 
                      value={aiModel}
                      onChange={(e) => setAiModel(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    >
                      <option value="gpt4-turbo">GPT-4 Turbo (Recommended)</option>
                      <option value="gpt4">GPT-4</option>
                      <option value="claude3">Claude 3</option>
                      <option value="gpt35">GPT-3.5 (Budget)</option>
                    </select>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                    <div className="text-sm text-blue-800">
                      <span className="font-medium">Model Info:</span> {aiModel === 'gpt4-turbo' && 'Best balance of speed and quality'}
                      {aiModel === 'gpt4' && 'Highest quality, slower'}
                      {aiModel === 'claude3' && 'Great for detailed responses'}
                      {aiModel === 'gpt35' && 'Fast and economical'}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">AI Behavior</h3>
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Personality</label>
                    <textarea 
                      value={personality}
                      onChange={(e) => setPersonality(e.target.value)}
                      placeholder="e.g., Friendly, professional, helpful. Always greet customers warmly..."
                      rows={5}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div>
                      <h4 className="font-medium text-gray-900">Learn from Chats</h4>
                      <p className="text-sm text-gray-600">Improve over time</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={learnFromChats}
                        onChange={() => setLearnFromChats(!learnFromChats)}
                        className="sr-only peer" 
                      />
                      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Advanced Options</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Response Length</h4>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                    <option>Concise</option>
                    <option>Moderate</option>
                    <option>Detailed</option>
                  </select>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Language</h4>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                    <option>English</option>
                    <option>Spanish</option>
                    <option>French</option>
                    <option>German</option>
                  </select>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Tone</h4>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                    <option>Professional</option>
                    <option>Casual</option>
                    <option>Formal</option>
                    <option>Playful</option>
                  </select>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Temperature</h4>
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    defaultValue="70"
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Focused</span>
                    <span>Creative</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-medium transition-colors">
                Reset to Default
              </button>
              <button 
                onClick={handleSaveSettings}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-medium transition-colors"
              >
                <Save className="w-4 h-4" />
                Save Settings
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}