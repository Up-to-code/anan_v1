"use client";
import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { integrationPartners } from '@/data/faq';

export default function IntegrationSection() {
  const [activeTab, setActiveTab] = useState('all');

  const categories = ['All', 'CRM', 'Communication', 'Automation', 'E-commerce', 'Marketing'];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Seamless Integrations</h2>
          <p className="text-xl text-slate-600">Connect with your favorite tools and workflows</p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-6 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveTab(category.toLowerCase())}
              className={`px-4 py-2 rounded-full font-medium transition-colors ${
                activeTab === category.toLowerCase() 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-blue-600'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 mb-12">
          {integrationPartners
            .filter(partner => activeTab === 'all' || partner.category === activeTab)
            .map((partner, index) => (
              <div key={index} className="flex items-center justify-center p-6 bg-white rounded-lg border border-slate-200 hover:border-blue-600 transition-colors">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <span className="text-blue-600 font-bold text-sm">{partner.name.charAt(0)}</span>
                  </div>
                  <span className="text-sm font-medium text-slate-700">{partner.name}</span>
                </div>
              </div>
            ))}
        </div>
        
        <div className="text-center">
          <button className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg border-2 border-blue-600 hover:bg-blue-50 transition-colors flex items-center mx-auto">
            <span>View All Integrations</span>
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      </div>
    </section>
  );
}