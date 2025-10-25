import React from 'react';
import { Check, X } from 'lucide-react';
import { comparisonData } from '@/data/pricing';

export default function ComparisonSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Why Choose ChatConnect?</h2>
          <p className="text-xl text-slate-600">See how we stack up against the competition</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left p-6 font-semibold text-slate-900">Feature</th>
                <th className="p-6 font-semibold text-blue-600">ChatConnect</th>
                <th className="p-6 font-semibold text-slate-600">Competitor A</th>
                <th className="p-6 font-semibold text-slate-600">Competitor B</th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map(([feature, chatconnect, compA, compB], index) => (
                <tr key={index} className="border-b border-slate-100">
                  <td className="p-6 font-medium text-slate-900">{feature}</td>
                  <td className="p-6 text-center">
                    {chatconnect ? <Check className="w-6 h-6 text-green-600 mx-auto" /> : <X className="w-6 h-6 text-red-600 mx-auto" />}
                  </td>
                  <td className="p-6 text-center">
                    {compA ? <Check className="w-6 h-6 text-green-600 mx-auto" /> : <X className="w-6 h-6 text-red-600 mx-auto" />}
                  </td>
                  <td className="p-6 text-center">
                    {compB ? <Check className="w-6 h-6 text-green-600 mx-auto" /> : <X className="w-6 h-6 text-red-600 mx-auto" />}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}