"use client";
import React, { useState, useRef } from 'react';
import {
  BarChart3, FileText, Settings, Bot, Plus, Edit, Trash2, File, Upload,
  MessageCircle, TrendingUp, Users, Zap, X, Play, Pause, Mail, Globe, 
  Save, Bell, User
} from 'lucide-react';

// Define types for better TypeScript support
type Tab = 'overview' | 'knowledge' | 'integrations' | 'settings';
type AgentStatus = 'active' | 'paused';
type PlatformId = 'whatsapp' | 'telegram' | 'email' | 'website' | 'slack' | 'messenger';

interface QAItem {
  id: number;
  question: string;
  answer: string;
}

interface FileItem {
  id: number;
  name: string;
  size: string;
}

interface Platform {
  id: PlatformId;
  name: string;
  icon: React.ElementType;
}

interface SettingsType {
  agentName: string;
  businessName: string;
  language: string;
  tone: string;
}

interface StatCardProps {
  label: string;
  value: string;
  icon: React.ElementType;
  color: string;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

interface ToggleProps {
  checked: boolean;
  onChange: () => void;
}

interface OverviewTabProps {
  stats: StatCardProps[];
  platformList: Platform[];
  platforms: Record<PlatformId, boolean>;
}

interface KnowledgeTabProps {
  qaList: QAItem[];
  files: FileItem[];
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  onShowAddQA: () => void;
  onEditQA: (qa: QAItem) => void;
  onDeleteQA: (id: number) => void;
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDeleteFile: (id: number) => void;
}

interface IntegrationsTabProps {
  integrationsView: 'list' | PlatformId;
  platformList: Platform[];
  platforms: Record<PlatformId, boolean>;
  onSetIntegrationsView: (view: 'list' | PlatformId) => void;
}

interface SettingsTabProps {
  settings: SettingsType;
  onSettingsChange: (settings: SettingsType) => void;
}

// Components defined outside the main component
const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/40" 
        onClick={handleBackdropClick} 
      />
      <div className="relative bg-white rounded-lg w-full max-w-2xl">
        <div className="flex items-center justify-between p-6 border-b">
          <h3 className="text-xl font-bold">{title}</h3>
          <button 
            onClick={onClose} 
            className="p-2 hover:bg-gray-100 rounded" 
            type="button"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

const StatCard: React.FC<StatCardProps> = ({ label, value, icon: Icon, color }) => (
  <div className="bg-white p-6 rounded-lg border">
    <div className="flex items-center gap-3 mb-3">
      <div className={`p-2 ${getBgColor(color)} rounded-lg`}>
        <Icon className={`w-5 h-5 ${getTextColor(color)}`} />
      </div>
      <span className="text-sm text-gray-600">{label}</span>
    </div>
    <div className="text-3xl font-bold">{value}</div>
  </div>
);

function getBgColor(color: string) {
  switch (color) {
    case "blue": return "bg-blue-50";
    case "green": return "bg-green-50";
    case "purple": return "bg-purple-50";
    case "orange": return "bg-orange-50";
    default: return "bg-gray-50";
  }
}

function getTextColor(color: string) {
  switch (color) {
    case "blue": return "text-blue-600";
    case "green": return "text-green-600";
    case "purple": return "text-purple-600";
    case "orange": return "text-orange-600";
    default: return "text-gray-600";
  }
}

const Toggle: React.FC<ToggleProps> = ({ checked, onChange }) => (
  <label className="relative inline-flex items-center cursor-pointer">
    <input 
      type="checkbox" 
      checked={checked} 
      onChange={onChange} 
      className="sr-only peer" 
    />
    <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
  </label>
);

// Tab Content Components
const OverviewTab: React.FC<OverviewTabProps> = ({ stats, platformList, platforms }) => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, i) => (
        <StatCard key={i} {...stat} />
      ))}
    </div>

    <div className="bg-white p-6 rounded-lg border">
      <h3 className="text-lg font-bold mb-4">Connected Platforms</h3>
      <div className="space-y-3">
        {platformList.slice(0, 3).map(platform => {
          const Icon = platform.icon;
          const enabled = platforms[platform.id];
          return (
            <div key={platform.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Icon className="w-5 h-5 text-gray-600" />
                <span className="font-medium">{platform.name}</span>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                enabled ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
              }`}>
                {enabled ? 'Active' : 'Inactive'}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </div>
);

const KnowledgeTab: React.FC<KnowledgeTabProps> = ({
  qaList,
  files,
  fileInputRef,
  onShowAddQA,
  onEditQA,
  onDeleteQA,
  onFileUpload,
  onDeleteFile
}) => (
  <div className="space-y-6">
    <div className="bg-white p-6 rounded-lg border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold">Questions & Answers</h3>
        <button
          onClick={onShowAddQA}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          type="button"
        >
          <Plus className="w-4 h-4" />
          Add Q&A
        </button>
      </div>

      <div className="space-y-3">
        {qaList.map(qa => (
          <div key={qa.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-semibold flex-1">{qa.question}</h4>
              <div className="flex gap-2 ml-4">
                <button 
                  onClick={() => onEditQA(qa)} 
                  className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors" 
                  type="button"
                  aria-label={`Edit ${qa.question}`}
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => onDeleteQA(qa.id)} 
                  className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors" 
                  type="button"
                  aria-label={`Delete ${qa.question}`}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <p className="text-gray-600 text-sm">{qa.answer}</p>
          </div>
        ))}
      </div>
    </div>

    <div className="bg-white p-6 rounded-lg border">
      <h3 className="text-lg font-bold mb-4">Documents</h3>
      <div
        onClick={() => fileInputRef.current?.click()}
        className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer mb-4 hover:border-blue-500 transition-colors"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            fileInputRef.current?.click();
          }
        }}
      >
        <input 
          type="file" 
          multiple 
          ref={fileInputRef as React.RefObject<HTMLInputElement>} 
          onChange={onFileUpload} 
          className="hidden" 
          accept=".pdf,.doc,.docx,.txt" 
        />
        <Upload className="w-10 h-10 text-gray-400 mx-auto mb-3" />
        <p className="font-medium mb-1">Upload Documents</p>
        <p className="text-sm text-gray-600">PDF, Word, or Text files</p>
      </div>
      <div className="space-y-2">
        {files.map(file => (
          <div key={file.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">
              <File className="w-5 h-5 text-blue-600" />
              <div>
                <div className="font-medium">{file.name}</div>
                <div className="text-xs text-gray-500">{file.size}</div>
              </div>
            </div>
            <button 
              onClick={() => onDeleteFile(file.id)} 
              className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors" 
              type="button"
              aria-label={`Delete ${file.name}`}
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const IntegrationsTab: React.FC<IntegrationsTabProps> = ({
  integrationsView,
  platformList,
  platforms,
  onSetIntegrationsView
}) => {
  if (integrationsView !== 'list') {
    const platform = platformList.find(p => p.id === integrationsView);
    if (!platform) return null;
    const Icon = platform.icon;

    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => onSetIntegrationsView('list')} 
            className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors" 
            type="button"
          >
            ← Back
          </button>
          <div className="p-3 rounded-lg bg-blue-50">
            <Icon className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">{platform.name}</h2>
            <p className="text-gray-600">Configure your {platform.name} integration</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border">
          <h3 className="text-lg font-bold mb-4">Connection Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">API Token</label>
              <input 
                type="password" 
                placeholder="Enter your API token" 
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors" 
              />
            </div>
            {integrationsView === 'whatsapp' && (
              <div>
                <label className="block text-sm font-medium mb-2">Phone Number</label>
                <input 
                  type="text" 
                  placeholder="+1 234 567 8900" 
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors" 
                />
              </div>
            )}
            {integrationsView === 'email' && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-2">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="support@company.com" 
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">SMTP Server</label>
                  <input 
                    type="text" 
                    placeholder="smtp.gmail.com" 
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors" 
                  />
                </div>
              </>
            )}
            {integrationsView === 'website' && (
              <div>
                <label className="block text-sm font-medium mb-2">Website URL</label>
                <input 
                  type="text" 
                  placeholder="https://yourwebsite.com" 
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors" 
                />
              </div>
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border">
          <h3 className="text-lg font-bold mb-4">Behavior Settings</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium">Auto-Reply</h4>
                <p className="text-sm text-gray-600">Respond automatically to messages</p>
              </div>
              <Toggle checked={true} onChange={() => {}} />
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium">Notifications</h4>
                <p className="text-sm text-gray-600">Get notified of new messages</p>
              </div>
              <Toggle checked={true} onChange={() => {}} />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Response Delay</label>
              <select className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white transition-colors">
                <option>Instant</option>
                <option>1 Minute</option>
                <option>5 Minutes</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button 
            onClick={() => onSetIntegrationsView('list')} 
            className="px-6 py-2 border rounded-lg hover:bg-gray-50 transition-colors" 
            type="button"
          >
            Cancel
          </button>
          <button 
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors" 
            type="button"
          >
            Save Changes
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-bold mb-4">Connect Platforms</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {platformList.map(platform => {
            const Icon = platform.icon;
            const enabled = platforms[platform.id];

            return (
              <div key={platform.id} className="p-6 border rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-lg bg-blue-50">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${enabled ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                    {enabled ? 'Active' : 'Inactive'}
                  </div>
                </div>
                <h4 className="font-semibold mb-1">{platform.name}</h4>
                <p className="text-sm text-gray-600 mb-4">{enabled ? 'Connected' : 'Not connected'}</p>
                <button 
                  onClick={() => onSetIntegrationsView(platform.id)} 
                  className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-colors" 
                  type="button"
                >
                  Configure
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-bold mb-4">Global Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h4 className="font-medium">Smart Handoff</h4>
              <p className="text-sm text-gray-600">Transfer complex queries to humans</p>
            </div>
            <Toggle checked={true} onChange={() => {}} />
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h4 className="font-medium">Multi-Platform Sync</h4>
              <p className="text-sm text-gray-600">Sync conversations across platforms</p>
            </div>
            <Toggle checked={true} onChange={() => {}} />
          </div>
        </div>
      </div>
    </div>
  );
};

const SettingsTab: React.FC<SettingsTabProps> = ({ settings, onSettingsChange }) => (
  <div className="space-y-6">
    <div className="bg-white p-6 rounded-lg border">
      <h3 className="text-lg font-bold mb-4">Basic Settings</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Agent Name</label>
          <input
            type="text"
            value={settings.agentName}
            onChange={(e) => onSettingsChange({ ...settings, agentName: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Business Name</label>
          <input
            type="text"
            value={settings.businessName}
            onChange={(e) => onSettingsChange({ ...settings, businessName: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Language</label>
          <select
            value={settings.language}
            onChange={(e) => onSettingsChange({ ...settings, language: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white transition-colors"
          >
            <option>English</option>
            <option>Spanish</option>
            <option>French</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Tone</label>
          <select
            value={settings.tone}
            onChange={(e) => onSettingsChange({ ...settings, tone: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white transition-colors"
          >
            <option>Professional</option>
            <option>Friendly</option>
            <option>Casual</option>
          </select>
        </div>
      </div>
    </div>

    <div className="flex justify-end">
      <button 
        className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors" 
        type="button"
      >
        <Save className="w-4 h-4" />
        Save Settings
      </button>
    </div>
  </div>
);

// Main Component
export default function YANSDashboard() {
  // State with proper typing
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [agentStatus, setAgentStatus] = useState<AgentStatus>('active');
  const [integrationsView, setIntegrationsView] = useState<'list' | PlatformId>('list');
  const [qaList, setQaList] = useState<QAItem[]>([
    { id: 1, question: "What are your business hours?", answer: "We're open Monday to Friday, 9 AM to 6 PM EST." },
    { id: 2, question: "How do I contact support?", answer: "Email us at support@company.com or call (555) 123-4567." }
  ]);
  const [files, setFiles] = useState<FileItem[]>([
    { id: 1, name: 'product-catalog.pdf', size: '2.3 MB' },
    { id: 2, name: 'company-policies.docx', size: '1.1 MB' }
  ]);
  const [platforms, setPlatforms] = useState<Record<PlatformId, boolean>>({
    whatsapp: true,
    telegram: false,
    email: true,
    website: true,
    slack: false,
    messenger: false
  });
  const [settings, setSettings] = useState<SettingsType>({
    agentName: 'YANS Assistant',
    businessName: 'My Company',
    language: 'English',
    tone: 'Professional'
  });
  const [showAddQA, setShowAddQA] = useState(false);
  const [editingQA, setEditingQA] = useState<number | null>(null);
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Stats with proper typing
  const stats: StatCardProps[] = [
    { label: 'Conversations', value: '1,247', icon: MessageCircle, color: 'blue' },
    { label: 'Success Rate', value: '94%', icon: TrendingUp, color: 'green' },
    { label: 'Active Users', value: '243', icon: Users, color: 'purple' },
    { label: 'Response Time', value: '2.3s', icon: Zap, color: 'orange' }
  ];

  const platformList: Platform[] = [
    { id: 'whatsapp', name: 'WhatsApp', icon: MessageCircle },
    { id: 'telegram', name: 'Telegram', icon: MessageCircle },
    { id: 'email', name: 'Email', icon: Mail },
    { id: 'website', name: 'Website Chat', icon: Globe },
    { id: 'slack', name: 'Slack', icon: MessageCircle },
    { id: 'messenger', name: 'Messenger', icon: MessageCircle }
  ];

  // Handlers
  const handleAddQA = () => {
    if (!newQuestion.trim() || !newAnswer.trim()) return;

    if (editingQA !== null) {
      setQaList(qaList =>
        qaList.map(qa =>
          qa.id === editingQA ? { ...qa, question: newQuestion, answer: newAnswer } : qa
        )
      );
    } else {
      setQaList(qaList => [
        ...qaList,
        { id: Date.now(), question: newQuestion, answer: newAnswer }
      ]);
    }

    setNewQuestion('');
    setNewAnswer('');
    setEditingQA(null);
    setShowAddQA(false);
  };

  const handleEditQA = (qa: QAItem) => {
    setNewQuestion(qa.question);
    setNewAnswer(qa.answer);
    setEditingQA(qa.id);
    setShowAddQA(true);
  };

  const handleDeleteQA = (id: number) => {
    setQaList(qaList => qaList.filter(qa => qa.id !== id));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = e.target.files;
    if (!uploadedFiles) return;

    const newFiles = Array.from(uploadedFiles).map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: `${(file.size / 1024 / 1024).toFixed(1)} MB`
    }));
    setFiles(prevFiles => [...prevFiles, ...newFiles]);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleDeleteFile = (id: number) => {
    setFiles(files => files.filter(file => file.id !== id));
  };

  const togglePlatform = (platformId: PlatformId) => {
    setPlatforms(prev => ({
      ...prev,
      [platformId]: !prev[platformId]
    }));
  };

  const closeModal = () => {
    setShowAddQA(false);
    setNewQuestion('');
    setNewAnswer('');
    setEditingQA(null);
  };

  const handleSettingsChange = (newSettings: SettingsType) => {
    setSettings(newSettings);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold">YANS Dashboard</h1>
                <p className="text-sm text-gray-600">AI Agent Management</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setAgentStatus(status => status === 'active' ? 'paused' : 'active')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  agentStatus === 'active' ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                type="button"
              >
                {agentStatus === 'active' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                {agentStatus === 'active' ? 'Active' : 'Paused'}
              </button>

              <button 
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors" 
                type="button"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5" />
              </button>

              <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-8">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'knowledge', label: 'Knowledge', icon: FileText },
              { id: 'integrations', label: 'Integrations', icon: MessageCircle },
              { id: 'settings', label: 'Settings', icon: Settings }
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as Tab)}
                  className={`flex items-center gap-2 px-4 py-4 font-medium border-b-2 transition-colors ${
                    isActive 
                      ? 'border-blue-600 text-blue-600' 
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
                  type="button"
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'overview' && (
          <OverviewTab 
            stats={stats}
            platformList={platformList}
            platforms={platforms}
          />
        )}
        {activeTab === 'knowledge' && (
          <KnowledgeTab 
            qaList={qaList}
            files={files}
            fileInputRef={fileInputRef}
            onShowAddQA={() => setShowAddQA(true)}
            onEditQA={handleEditQA}
            onDeleteQA={handleDeleteQA}
            onFileUpload={handleFileUpload}
            onDeleteFile={handleDeleteFile}
          />
        )}
        {activeTab === 'integrations' && (
          <IntegrationsTab 
            integrationsView={integrationsView}
            platformList={platformList}
            platforms={platforms}
            onSetIntegrationsView={setIntegrationsView}
          />
        )}
        {activeTab === 'settings' && (
          <SettingsTab 
            settings={settings}
            onSettingsChange={handleSettingsChange}
          />
        )}
      </main>

      {/* Q&A Modal */}
      <Modal 
        isOpen={showAddQA} 
        onClose={closeModal} 
        title={editingQA ? "Edit Q&A" : "Add New Q&A"}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Question</label>
            <input
              type="text"
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              placeholder="What are your business hours?"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Answer</label>
            <textarea
              value={newAnswer}
              onChange={(e) => setNewAnswer(e.target.value)}
              placeholder="We're open Monday to Friday, 9 AM to 6 PM"
              rows={5}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none transition-colors"
            />
          </div>
          <div className="flex gap-3">
            <button 
              onClick={closeModal} 
              className="flex-1 py-2 border rounded-lg hover:bg-gray-50 transition-colors" 
              type="button"
            >
              Cancel
            </button>
            <button
              onClick={handleAddQA}
              disabled={!newQuestion.trim() || !newAnswer.trim()}
              className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              type="button"
            >
              {editingQA ? 'Update' : 'Add'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}