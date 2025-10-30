import React from 'react';
import { Loader } from 'lucide-react';

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50">
      <Loader className="w-10 h-10 text-blue-600 animate-spin" />
      <span className="sr-only">Loading...</span>
    </div>
  );
}
