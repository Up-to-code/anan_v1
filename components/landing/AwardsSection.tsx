import React from 'react';
import { Award } from 'lucide-react';
import { awards } from '@/data/faq';

export default function AwardsSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Awards & Recognition</h2>
          <p className="text-xl text-slate-600">Trusted by industry leaders and recognized for excellence</p>
        </div>
        
        <div className="grid md:grid-cols-4 gap-8">
          {awards.map((award, index) => (
            <div key={index} className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">{award.name}</h3>
              <p className="text-slate-600 text-sm">{award.issuer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}