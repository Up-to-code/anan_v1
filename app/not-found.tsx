import Link from 'next/link';
import React from 'react';
import { MessageCircle, ArrowRight } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col justify-center items-center text-center px-4">
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-center mb-6">
          <MessageCircle className="w-16 h-16 text-blue-600" />
        </div>
        <h1 className="text-6xl font-bold text-slate-900 mb-4">404</h1>
        <h2 className="text-3xl font-bold text-slate-900 mb-6">Page Not Found</h2>
        <p className="text-xl text-slate-600 mb-8">
          Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link href="/" passHref>
          <button className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center mx-auto">
            Go to Homepage
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        </Link>
      </div>
    </div>
  );
}
