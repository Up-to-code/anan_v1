"use client";
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Headphones, Mail, FileText } from 'lucide-react';
import { faqItems } from '@/data/faq';

export default function FAQSection() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-slate-600">Get answers to the most common questions about ChatConnect</p>
        </div>
        
        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <div key={index} className="bg-white rounded-lg border border-slate-200 overflow-hidden hover:border-blue-600 transition-colors">
              <button
                className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-slate-50 transition-colors"
                onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
              >
                <span className="text-lg font-semibold text-slate-900">{item.question}</span>
                {openFaqIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-blue-600 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
                )}
              </button>
              {openFaqIndex === index && (
                <div className="px-6 pb-5">
                  <p className="text-slate-600 leading-relaxed">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <div className="bg-white rounded-xl border border-slate-200 p-8 max-w-2xl mx-auto">
            <Headphones className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Still have questions?</h3>
            <p className="text-slate-600 mb-6">Our support team is here to help you get the most out of ChatConnect</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center">
                <Mail className="w-5 h-5 mr-2" />
                Contact Support
              </button>
              <button className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg border-2 border-blue-600 hover:bg-blue-50 transition-colors flex items-center justify-center">
                <FileText className="w-5 h-5 mr-2" />
                Documentation
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}