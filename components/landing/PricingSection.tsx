"use client";
import React, { useState } from 'react';
import { Check, Lock, TrendingUp } from 'lucide-react';
import { pricingPlans } from '@/data/pricing';

export default function PricingSection() {
  const [pricingPeriod, setPricingPeriod] = useState<'monthly' | 'annual'>('monthly');

  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Simple, transparent pricing</h2>
          <p className="text-xl text-slate-600 mb-8">Choose the plan that fits your business needs</p>
          <div className="inline-flex items-center border border-slate-200 rounded-lg p-1 bg-white">
            <button
              onClick={() => setPricingPeriod('monthly')}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                pricingPeriod === 'monthly'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-600 hover:text-blue-600'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setPricingPeriod('annual')}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                pricingPeriod === 'annual'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-600 hover:text-blue-600'
              }`}
            >
              Annual <span className="text-green-600 text-sm ml-1">(Save 20%)</span>
            </button>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <div key={index} className={`border rounded-lg p-8 bg-white transition-all hover:scale-105 ${
              plan.highlighted ? 'border-2 border-blue-600 relative' : 'border-slate-200 hover:border-blue-600'
            }`}>
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </div>
              )}
              <h3 className="text-2xl font-bold text-slate-900 mb-2">{plan.name}</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-slate-900">
                  {plan.price === 'Custom'
                    ? 'Custom'
                    : `$${typeof plan.price === 'object' ? plan.price[pricingPeriod] : plan.price}`}
                </span>
                {plan.price !== 'Custom' && <span className="text-slate-600">/month</span>}
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <Check className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-600">{feature}</span>
                  </li>
                ))}
              </ul>
              <button className={`w-full px-6 py-3 font-semibold rounded-lg transition-colors ${
                plan.highlighted
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50'
              }`}>
                {plan.name === 'Enterprise' ? 'Contact Sales' : 'Start Free Trial'}
              </button>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <p className="text-slate-600 mb-4">All plans include a 14-day free trial. No credit card required.</p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-600">
            {[
              { icon: Lock, text: "Secure & Encrypted" },
              { icon: Check, text: "Cancel Anytime" },
              { icon: TrendingUp, text: "Upgrade or Downgrade" }
            ].map((item, index) => (
              <div key={index} className="flex items-center">
                <item.icon className="w-4 h-4 mr-2 text-blue-600" />
                {item.text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}