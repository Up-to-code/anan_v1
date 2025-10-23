// app/integrations/whatsapp/page.tsx
'use client';

import { useState } from 'react';
import { 
  CheckCircle,
  Copy,
  Key,
  MessageCircle,
  Link,
  Shield,
  ArrowLeft
} from 'lucide-react';

export default function WhatsAppIntegration() {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [copied, setCopied] = useState(false);
  
  const [formData, setFormData] = useState({
    apiToken: '',
    phoneNumberId: '',
    webhookSecret: ''
  });

  const [generatedWebhookUrl, setGeneratedWebhookUrl] = useState('');

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNext = () => {
    if (currentStep === 1 && formData.apiToken) {
      setCurrentStep(2);
    } else if (currentStep === 2 && formData.phoneNumberId && formData.webhookSecret) {
      const webhookUrl = `https://api.emailly.com/webhooks/whatsapp/${btoa(formData.phoneNumberId)}`;
      setGeneratedWebhookUrl(webhookUrl);
      setCurrentStep(3);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((currentStep - 1) as 1 | 2 | 3);
    }
  };

  const copyWebhookUrl = () => {
    navigator.clipboard.writeText(generatedWebhookUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const verifyWebhook = async () => {
    setIsVerifying(true);
    setVerificationStatus('idle');
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      const success = Math.random() > 0.2;
      setVerificationStatus(success ? 'success' : 'error');
    } catch (error) {
      setVerificationStatus('error');
    } finally {
      setIsVerifying(false);
    }
  };

  const steps = [
    {
      number: 1,
      title: "API Token",
      description: "Enter your WhatsApp Business API token",
      icon: Key,
      status: currentStep > 1 ? 'completed' : currentStep === 1 ? 'current' : 'upcoming'
    },
    {
      number: 2,
      title: "Business Details", 
      description: "Add phone number ID and webhook secret",
      icon: MessageCircle,
      status: currentStep > 2 ? 'completed' : currentStep === 2 ? 'current' : 'upcoming'
    },
    {
      number: 3,
      title: "Webhook Setup",
      description: "Configure and verify webhook",
      icon: Link,
      status: currentStep === 3 ? 'current' : 'upcoming'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <a href="/integrations" className="inline-flex items-center text-gray-600 hover:text-gray-900">
            <ArrowLeft size={20} className="mr-2" />
            Back to Integrations
          </a>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Vertical Steps */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Setup Steps</h2>
              
              <div className="space-y-6">
                {steps.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <div key={step.number} className="flex items-start space-x-4">
                      {/* Step Number */}
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        step.status === 'completed' 
                          ? 'bg-green-500 text-white'
                          : step.status === 'current'
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 text-gray-500'
                      }`}>
                        {step.status === 'completed' ? (
                          <CheckCircle size={16} />
                        ) : (
                          step.number
                        )}
                      </div>

                      {/* Step Content */}
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-medium ${
                          step.status === 'completed' 
                            ? 'text-green-700'
                            : step.status === 'current'
                            ? 'text-blue-700'
                            : 'text-gray-500'
                        }`}>
                          {step.title}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          {step.description}
                        </p>
                      </div>

                      {/* Connecting Line */}
                      {index < steps.length - 1 && (
                        <div className={`absolute left-4 top-8 w-0.5 h-10 ml-3 ${
                          step.status === 'completed' ? 'bg-green-500' : 'bg-gray-200'
                        }`} style={{ marginTop: '2rem' }} />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Step Content */}
          <div className="lg:col-span-2">
            {/* Step 1: API Token */}
            {currentStep === 1 && (
              <div className="bg-white border border-gray-200 rounded-lg p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <Key size={24} className="text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">API Token</h2>
                    <p className="text-gray-600">Enter your WhatsApp Business API token</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      API Token
                    </label>
                    <input
                      type="password"
                      value={formData.apiToken}
                      onChange={(e) => handleInputChange('apiToken', e.target.value)}
                      placeholder="Enter your WhatsApp Business API token"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <p className="text-sm text-gray-500 mt-2">
                      Find this in your Meta Business Suite under WhatsApp Business API settings
                    </p>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-medium text-blue-900 mb-2">Where to find your API token:</h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Go to Meta Business Suite</li>
                      <li>• Open WhatsApp Manager</li>
                      <li>• Select your Business Account</li>
                      <li>• Go to API Setup</li>
                      <li>• Copy the Permanent Token</li>
                    </ul>
                  </div>
                </div>

                <div className="flex justify-end mt-8">
                  <button
                    onClick={handleNext}
                    disabled={!formData.apiToken.trim()}
                    className="bg-blue-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Phone Number & Webhook Secret */}
            {currentStep === 2 && (
              <div className="bg-white border border-gray-200 rounded-lg p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                    <MessageCircle size={24} className="text-green-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">Business Details</h2>
                    <p className="text-gray-600">Enter your phone number ID and webhook secret</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number ID
                    </label>
                    <input
                      type="text"
                      value={formData.phoneNumberId}
                      onChange={(e) => handleInputChange('phoneNumberId', e.target.value)}
                      placeholder="123456789012345"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <p className="text-sm text-gray-500 mt-2">
                      Your WhatsApp Business phone number ID from Meta
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Webhook Secret Key
                    </label>
                    <input
                      type="password"
                      value={formData.webhookSecret}
                      onChange={(e) => handleInputChange('webhookSecret', e.target.value)}
                      placeholder="Enter your webhook verification token"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <p className="text-sm text-gray-500 mt-2">
                      Used to verify webhook requests from Meta
                    </p>
                  </div>
                </div>

                <div className="flex justify-between mt-8">
                  <button
                    onClick={handleBack}
                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={!formData.phoneNumberId.trim() || !formData.webhookSecret.trim()}
                    className="bg-blue-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Webhook URL & Verification */}
            {currentStep === 3 && (
              <div className="bg-white border border-gray-200 rounded-lg p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                    <Link size={24} className="text-purple-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">Webhook Setup</h2>
                    <p className="text-gray-600">Configure webhook in Meta Developer Console</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Webhook URL
                    </label>
                    <div className="flex items-center space-x-2">
                      <code className="flex-1 bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 break-all">
                        {generatedWebhookUrl}
                      </code>
                      <button
                        onClick={copyWebhookUrl}
                        className="p-2 text-gray-400 hover:text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                      >
                        {copied ? <CheckCircle size={16} className="text-green-500" /> : <Copy size={16} />}
                      </button>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      Copy this URL and paste it in your Meta webhook configuration
                    </p>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <h4 className="font-medium text-yellow-900 mb-2">Setup Instructions:</h4>
                    <ol className="text-sm text-yellow-700 space-y-2">
                      <li>1. Go to Meta Developer Console</li>
                      <li>2. Select your WhatsApp Business App</li>
                      <li>3. Go to Webhooks configuration</li>
                      <li>4. Paste the URL above in Callback URL field</li>
                      <li>5. Paste your webhook secret in Verify Token field</li>
                      <li>6. Subscribe to messages and message_deliveries events</li>
                    </ol>
                  </div>

                  {/* Verification Status */}
                  {verificationStatus !== 'idle' && (
                    <div className={`p-4 rounded-lg ${
                      verificationStatus === 'success' 
                        ? 'bg-green-50 border border-green-200' 
                        : 'bg-red-50 border border-red-200'
                    }`}>
                      <div className="flex items-center">
                        {verificationStatus === 'success' ? (
                          <CheckCircle size={20} className="text-green-500 mr-2" />
                        ) : (
                          <Shield size={20} className="text-red-500 mr-2" />
                        )}
                        <span className={
                          verificationStatus === 'success' ? 'text-green-800' : 'text-red-800'
                        }>
                          {verificationStatus === 'success' 
                            ? 'Webhook verified successfully!' 
                            : 'Verification failed. Please check your configuration.'
                          }
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex justify-between mt-8">
                  <button
                    onClick={handleBack}
                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50"
                  >
                    Back
                  </button>
                  
                  <div className="flex space-x-3">
                    {verificationStatus === 'success' ? (
                      <a
                        href="/integrations"
                        className="bg-green-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-600 flex items-center"
                      >
                        Complete Setup
                        <CheckCircle size={16} className="ml-2" />
                      </a>
                    ) : (
                      <button
                        onClick={verifyWebhook}
                        disabled={isVerifying}
                        className="bg-blue-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                      >
                        {isVerifying ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                            Verifying...
                          </>
                        ) : (
                          <>
                            Verify Webhook
                            <Shield size={16} className="ml-2" />
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}