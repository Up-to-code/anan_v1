import React from 'react';
import { MessageCircle } from 'lucide-react';

export default function Footer() {
  const productLinks = ['Features', 'How It Works', 'Integrations', 'Pricing', 'FAQ'];
  const companyLinks = ['About Us', 'Blog', 'Careers', 'Contact', 'Press Kit'];
  const legalLinks = ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'GDPR'];

  return (
    <footer className="bg-white border-t border-slate-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <MessageCircle className="w-8 h-8 text-blue-600" />
              <span className="text-xl font-bold text-slate-900">ChatConnect</span>
            </div>
            <p className="text-slate-600 mb-4 leading-relaxed">
              The unified messaging platform that helps businesses connect with customers across every channel. Trusted by 50,000+ companies worldwide.
            </p>
            <div className="flex space-x-4">
              {['facebook', 'twitter', 'linkedin', 'github'].map((social, index) => (
                <a key={index} href="#" className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-slate-600 hover:bg-blue-600 hover:text-white transition-colors">
                  <div className="w-5 h-5 bg-slate-400 rounded"></div>
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-4">Product</h4>
            <ul className="space-y-2">
              {productLinks.map((item, index) => (
                <li key={index}>
                  <a href={`#${item.toLowerCase().replace(' ', '-')}`} className="text-slate-600 hover:text-blue-600 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-4">Company</h4>
            <ul className="space-y-2">
              {companyLinks.map((item, index) => (
                <li key={index}>
                  <a href="#" className="text-slate-600 hover:text-blue-600 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-600 text-sm mb-4 md:mb-0">
            © 2025 ChatConnect. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm">
            {legalLinks.map((item, index) => (
              <a key={index} href="#" className="text-slate-600 hover:text-blue-600 transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}