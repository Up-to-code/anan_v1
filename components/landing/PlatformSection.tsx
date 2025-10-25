import React from 'react';
import { platforms } from '@/data/features';

export default function PlatformSection() {
  return (
    <section id="platforms" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Connect on every platform</h2>
          <p className="text-xl text-slate-600">Meet your customers where they are with seamless integrations</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {platforms.map((platform, index) => {
            const IconComponent = platform.icon;
            return (
              <div key={index} className="border border-slate-200 rounded-lg p-6 bg-white hover:border-blue-600 transition-all hover:scale-105">
                <IconComponent className="w-10 h-10 text-blue-600 mb-4" />
                <h3 className="text-xl font-bold text-slate-900 mb-2">{platform.platform}</h3>
                <p className="text-slate-600 mb-3">{platform.description}</p>
                <div className="text-sm font-semibold text-blue-600">{platform.metric}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}