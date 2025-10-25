import React from 'react';
import { features } from '@/data/features';

export default function FeaturesSection() {
  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Everything you need to succeed</h2>
          <p className="text-xl text-slate-600">Powerful features designed to streamline your customer communications</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div key={index} className="border border-slate-200 rounded-lg p-8 bg-white hover:border-blue-600 transition-all hover:scale-105 group">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <IconComponent className="w-6 h-6 text-blue-600 group-hover:text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 mb-4">{feature.description}</p>
                <div className="text-2xl font-bold text-blue-600">{feature.metric}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}