import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { caseStudies } from '@/data/testimonials';

export default function CaseStudiesSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Success Stories</h2>
          <p className="text-xl text-slate-600">See how businesses transformed their customer service with ChatConnect</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {caseStudies.map((study, index) => (
            <div key={index} className="bg-white border border-slate-200 rounded-xl p-8 hover:border-blue-600 transition-all hover:scale-105">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <span className="text-blue-600 font-bold text-xl">{study.logo}</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">{study.company}</h3>
              <div className="text-3xl font-bold text-blue-600 mb-4">{study.result}</div>
              <p className="text-slate-600 mb-6">{study.description}</p>
              <button className="text-blue-600 font-semibold hover:text-blue-700 transition-colors flex items-center">
                Read Case Study
                <ArrowUpRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}