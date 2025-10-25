import React from 'react';
import { Check } from 'lucide-react';

export default function FinalCTASection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-600 to-indigo-700">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Ready to transform your customer communications?
        </h2>
        <p className="text-xl text-blue-100 mb-8">
          Join 50,000+ businesses using ChatConnect to deliver exceptional customer experiences
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <button className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-all hover:scale-105">
            Start Free 14-Day Trial
          </button>
          <button className="px-8 py-4 bg-blue-700 text-white font-semibold rounded-lg border-2 border-white hover:bg-blue-800 transition-all hover:scale-105">
            Schedule a Demo
          </button>
        </div>
        <div className="flex flex-wrap justify-center gap-8 text-blue-100 text-sm">
          {[
            "No credit card required",
            "14-day free trial",
            "Cancel anytime"
          ].map((item, index) => (
            <div key={index} className="flex items-center">
              <Check className="w-5 h-5 mr-2" />
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}