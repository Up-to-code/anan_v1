"use client";
import React, { useState } from 'react';
import { Play, Download } from 'lucide-react';
import { howItWorksSteps } from '@/data/features';

export default function HowItWorksSection() {
  const [activeWorkStep, setActiveWorkStep] = useState(0);

  return (
    <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">How ChatConnect Works</h2>
          <p className="text-xl text-slate-600">Get started in just four simple steps</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            {howItWorksSteps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div 
                  key={step.step}
                  className={`flex items-start space-x-6 p-6 rounded-lg transition-all cursor-pointer ${
                    activeWorkStep === index ? 'bg-white border-2 border-blue-600 shadow-lg' : 'bg-white border border-slate-200 hover:border-blue-300'
                  }`}
                  onMouseEnter={() => setActiveWorkStep(index)}
                >
                  <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                    activeWorkStep === index ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-600'
                  }`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-sm font-semibold text-blue-600">STEP {step.step}</span>
                      {activeWorkStep === index && (
                        <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{step.title}</h3>
                    <p className="text-slate-600">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="relative">
            <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-lg">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Play className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Watch Setup Demo</h3>
                  <p className="text-slate-600">See how easy it is to get started</p>
                </div>
              </div>
              
              <div className="bg-slate-900 rounded-lg aspect-video flex items-center justify-center mb-4">
                <div className="text-center text-white">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Play className="w-8 h-8" />
                  </div>
                  <p className="font-semibold">2-minute setup demo</p>
                </div>
              </div>
              
              <button className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center">
                <Download className="w-5 h-5 mr-2" />
                Download Setup Guide
              </button>
            </div>
            
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-blue-100 rounded-full opacity-50"></div>
            <div className="absolute -top-6 -right-6 w-20 h-20 bg-blue-200 rounded-full opacity-30"></div>
          </div>
        </div>
      </div>
    </section>
  );
}