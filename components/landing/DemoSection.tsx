import React from 'react';
import { Check, Play, Bot } from 'lucide-react';

export default function DemoSection() {
  const features = [
    "Live chat demo with real-time responses",
    "Multi-platform message management",
    "AI-powered response suggestions",
    "Advanced analytics dashboard"
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-600 to-indigo-700">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <h2 className="text-4xl font-bold mb-6">See ChatConnect in Action</h2>
            <p className="text-xl text-blue-100 mb-8">
              Watch how our platform transforms customer conversations into meaningful relationships that drive business growth.
            </p>
            <ul className="space-y-4 mb-8">
              {features.map((item, index) => (
                <li key={index} className="flex items-center">
                  <Check className="w-6 h-6 text-green-400 mr-3" />
                  <span className="text-blue-100">{item}</span>
                </li>
              ))}
            </ul>
            <button className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-all hover:scale-105 flex items-center">
              <Play className="w-5 h-5 mr-2" />
              Watch Full Demo
            </button>
          </div>
          <div className="relative">
            <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
              <div className="bg-slate-900 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="text-sm text-slate-300">demo.chatconnect.com</div>
                <div className="w-4"></div>
              </div>
              <div className="p-8">
                <div className="bg-slate-100 rounded-lg p-6 mb-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                      <Bot className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900">AI Assistant</div>
                      <div className="text-sm text-slate-600">How can I help you today?</div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {[
                      "Order tracking and updates",
                      "Product recommendations",
                      "Technical support",
                      "Billing inquiries"
                    ].map((option, index) => (
                      <div key={index} className="bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-700 cursor-pointer hover:border-blue-600 transition-colors">
                        {option}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="text-center text-slate-600">
                  Real-time AI-powered customer support
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}