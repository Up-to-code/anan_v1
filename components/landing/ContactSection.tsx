import React from 'react';
import { Mail, Phone, MapPin, Calendar } from 'lucide-react';

export default function ContactSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-4xl font-bold mb-6">Get in Touch</h2>
            <p className="text-xl text-slate-300 mb-8">
              Ready to transform your customer communications? Our team is here to help you get started.
            </p>
            
            <div className="space-y-4">
              {[
                { icon: Mail, text: "hello@chatconnect.com" },
                { icon: Phone, text: "+1 (555) 123-4567" },
                { icon: MapPin, text: "San Francisco, CA" }
              ].map((contact, index) => (
                <div key={index} className="flex items-center">
                  <contact.icon className="w-5 h-5 text-blue-400 mr-4" />
                  <span className="text-slate-300">{contact.text}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-slate-800 rounded-xl p-8">
            <h3 className="text-2xl font-bold mb-6">Schedule a Demo</h3>
            <form className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <input type="text" placeholder="First Name" className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white" />
                <input type="text" placeholder="Last Name" className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white" />
              </div>
              <input type="email" placeholder="Email Address" className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white" />
              <input type="text" placeholder="Company Name" className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white" />
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-slate-400" />
                <span className="text-slate-300">Preferred demo date</span>
              </div>
              <button type="submit" className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                Schedule Demo
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}