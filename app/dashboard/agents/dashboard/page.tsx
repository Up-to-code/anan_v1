"use client";
import React, { useState, useRef } from 'react';
import {
  BarChart3, FileText, Settings, Bot, Plus, Edit, Trash2, File, Upload,
  MessageCircle, TrendingUp, Users, Zap, X, Play, Pause, Mail, Globe, 
  Save, Check, Bell, User
} from 'lucide-react';

export default function YANSDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [agentStatus, setAgentStatus] = useState('active');
  
  // Knowledge Base
  const [qaList, setQaList] = useState([
    { id: 1, question: "What are your business hours?", answer: "We're open Monday to Friday, 9 AM to 6 PM EST." },
    { id: 2, question: "How do I contact support?", answer: "Email us at support@company.com or call (555) 123-4567." }
  ]);
  const [files, setFiles] = useState([
    { id: 1, name: 'product-catalog.pdf', size: '2.3 MB' },
    { id: 2, name: 'company-policies.docx', size: '1.1 MB' }
  ]);
  
  // Platforms
  const [platforms, setPlatforms] = useState({
    whatsapp: true,
    email: true,
    website: true
  });
  
  // Settings
  const [settings, setSettings] = useState({
    agentName: 'YANS Assistant',
    businessName: 'My Company',
    language: 'English',
    tone: 'professional'
  });
  
  // Modals
  const [showAddQA, setShowAddQA] = useState(false);
  const [editingQA, setEditingQA] = useState(null);
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');
  const fileInputRef = useRef(null);

  // Stats
  const stats = {
    conversations: 1247,
    successRate: 94,
    activeUsers: 243,
    responseTime: 2.3
  };

  // Handlers
  const handleAddQA = () => {
    if (newQuestion.trim() && newAnswer.trim()) {
      if (editingQA !== null) {
        setQaList(qaList.map(qa =>
          qa.id === editingQA ? { ...qa, question: newQuestion, answer: newAnswer } : qa
        ));
      } else {
        setQaList([...qaList, { id: Date.now(), question: newQuestion, answer: newAnswer }]);
      }
      setNewQuestion('');
      setNewAnswer('');
      setEditingQA(null);
      setShowAddQA(false);
    }
  };

  const handleEditQA = (qa) => {
    setNewQuestion(qa.question);
    setNewAnswer(qa.answer);
    setEditingQA(qa.id);
    setShowAddQA(true);
  };

  const handleDeleteQA = (id) => {
    setQaList(qaList.filter(qa => qa.id !== id));
  };

  const handleFileUpload = (e) => {
    const uploadedFiles = e.target.files;
    if (uploadedFiles) {
      const newFiles = Array.from(uploadedFiles).map(file => ({
        id: Date.now() + Math.random(),
        name: file.name,
        size: `${(file.size / 1024 / 1024).toFixed(1)} MB`
      }));
      setFiles([...files, ...newFiles]);
    }
  };

  const handleDeleteFile = (id) => {
    setFiles(files.filter(file => file.id !== id));
  };

  // Modal Component
  const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/40" onClick={onClose} />
        <div className="relative bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-auto">
          <div className="sticky top-0 bg-white px-6 py-4 border-b flex items-center justify-between">
            <h3 className="text-xl font-bold">{title}</h3>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="p-6">{children}</div>
        </div>
      </div>
    );
  };

  // Tab Content
  const renderOverview = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl border">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <MessageCircle className="w-5 h-5 text-blue-600" />
            </div>
            <span className="text-sm text-gray-600">Conversations</span>
          </div>
          <div className="text-3xl font-bold">{stats.conversations.toLocaleString()}</div>
        </div>

        <div className="bg-white p-6 rounded-xl border">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-green-50 rounded-lg">
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <span className="text-sm text-gray-600">Success Rate</span>
          </div>
          <div className="text-3xl font-bold">{stats.successRate}%</div>
        </div>

        <div className="bg-white p-6 rounded-xl border">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-purple-50 rounded-lg">
              <Users className="w-5 h-5 text-purple-600" />
            </div>
            <span className="text-sm text-gray-600">Active Users</span>
          </div>
          <div className="text-3xl font-bold">{stats.activeUsers}</div>
        </div>

        <div className="bg-white p-6 rounded-xl border">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-orange-50 rounded-lg">
              <Zap className="w-5 h-5 text-orange-600" />
            </div>
            <span className="text-sm text-gray-600">Response Time</span>
          </div>
          <div className="text-3xl font-bold">{stats.responseTime}s</div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border">
        <h3 className="text-lg font-bold mb-4">Connected Platforms</h3>
        <div className="space-y-3">
          {[
            { id: 'whatsapp', name: 'WhatsApp', icon: MessageCircle },
            { id: 'email', name: 'Email', icon: Mail },
            { id: 'website', name: 'Website Chat', icon: Globe }
          ].map(platform => {
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

  const renderKnowledge = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold">Questions & Answers</h3>
          <button
            onClick={() => setShowAddQA(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-4 h-4" />
            Add Q&A
          </button>
        </div>

        <div className="space-y-3">
          {qaList.map(qa => (
            <div key={qa.id} className="p-4 border rounded-lg">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-semibold flex-1">{qa.question}</h4>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditQA(qa)}
                    className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteQA(qa.id)}
                    className="p-1 text-red-600 hover:bg-red-50 rounded"
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

      <div className="bg-white p-6 rounded-xl border">
        <h3 className="text-lg font-bold mb-4">Documents</h3>
        
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed rounded-lg p-8 text-center hover:border-blue-400 hover:bg-blue-50/50 cursor-pointer mb-4"
        >
          <input
            type="file"
            multiple
            ref={fileInputRef}
            onChange={handleFileUpload}
            className="hidden"
            accept=".pdf,.doc,.docx,.txt"
          />
          <Upload className="w-10 h-10 text-gray-400 mx-auto mb-3" />
          <p className="font-medium mb-1">Upload Documents</p>
          <p className="text-sm text-gray-600">PDF, Word, or Text files</p>
        </div>

        <div className="space-y-2">
          {files.map(file => (
            <div key={file.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <File className="w-5 h-5 text-blue-600" />
                <div>
                  <div className="font-medium">{file.name}</div>
                  <div className="text-xs text-gray-500">{file.size}</div>
                </div>
              </div>
              <button
                onClick={() => handleDeleteFile(file.id)}
                className="p-1 text-red-600 hover:bg-red-50 rounded"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl border">
        <h3 className="text-lg font-bold mb-4">Basic Settings</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Agent Name</label>
            <input
              type="text"
              value={settings.agentName}
              onChange={(e) => setSettings({...settings, agentName: e.target.value})}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Business Name</label>
            <input
              type="text"
              value={settings.businessName}
              onChange={(e) => setSettings({...settings, businessName: e.target.value})}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Language</label>
            <select
              value={settings.language}
              onChange={(e) => setSettings({...settings, language: e.target.value})}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="English">English</option>
              <option value="Spanish">Spanish</option>
              <option value="French">French</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Tone</label>
            <select
              value={settings.tone}
              onChange={(e) => setSettings({...settings, tone: e.target.value})}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="professional">Professional</option>
              <option value="friendly">Friendly</option>
              <option value="casual">Casual</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Save className="w-4 h-4" />
          Save Settings
        </button>
      </div>
    </div>
  );

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
                onClick={() => setAgentStatus(agentStatus === 'active' ? 'paused' : 'active')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium ${
                  agentStatus === 'active'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                {agentStatus === 'active' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                {agentStatus === 'active' ? 'Active' : 'Paused'}
              </button>

              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
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
              { id: 'settings', label: 'Settings', icon: Settings }
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-4 font-medium border-b-2 transition-colors ${
                    isActive
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
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
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'knowledge' && renderKnowledge()}
        {activeTab === 'settings' && renderSettings()}
      </main>

      {/* Q&A Modal */}
      <Modal
        isOpen={showAddQA}
        onClose={() => {
          setShowAddQA(false);
          setNewQuestion('');
          setNewAnswer('');
          setEditingQA(null);
        }}
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
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Answer</label>
            <textarea
              value={newAnswer}
              onChange={(e) => setNewAnswer(e.target.value)}
              placeholder="We're open Monday to Friday, 9 AM to 6 PM"
              rows={5}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => {
                setShowAddQA(false);
                setNewQuestion('');
                setNewAnswer('');
                setEditingQA(null);
              }}
              className="flex-1 py-2 border rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleAddQA}
              disabled={!newQuestion.trim() || !newAnswer.trim()}
              className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300"
            >
              {editingQA ? 'Update' : 'Add'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}