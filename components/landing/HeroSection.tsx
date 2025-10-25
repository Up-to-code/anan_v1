"use client";
import React from 'react';
import { ArrowRight, Play } from 'lucide-react';
import ChatDemo from './ChatDemo';

interface HeroSectionProps {
  isVisible: boolean;
}

export default function HeroSection({ isVisible }: HeroSectionProps) {
  const stats = [
    { value: "98%", label: "Customer Satisfaction" },
    { value: "50k+", label: "Active Users" },
    { value: "3x", label: "Faster Response" },
    { value: "24/7", label: "Support Available" }
  ];

  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h1 className="text-5xl font-bold text-slate-900 leading-tight mb-6" style={{ letterSpacing: '-0.02em' }}>
              Connect with customers across every platform
            </h1>
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              Unified messaging platform that integrates WhatsApp, Telegram, and web chat. Respond faster, close more deals, and deliver exceptional customer experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all hover:scale-105 flex items-center justify-center">
                Start Free Trial
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
              <button className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg border-2 border-blue-600 hover:bg-blue-50 transition-all hover:scale-105 flex items-center justify-center">
                <Play className="w-5 h-5 mr-2" />
                Watch Demo
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="border border-slate-200 rounded-lg p-4 bg-white hover:border-blue-600 transition-all hover:scale-105">
                  <div className="text-2xl font-bold text-blue-600 mb-1">{stat.value}</div>
                  <div className="text-sm text-slate-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className={`transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <ChatDemo />
          </div>
        </div>
      </div>
    </section>
  );
}