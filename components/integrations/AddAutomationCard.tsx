import React from 'react'
import { Zap, RefreshCw } from 'lucide-react'

export function AddAutomationCard() {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 border-dashed hover:border-blue-300 transition-colors cursor-pointer">
      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
        <Zap size={24} className="text-yellow-400" />
      </div>
      <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
        <Zap size={18} className="text-yellow-400" />
        Create Automation
      </h3>
      <p className="text-gray-600 text-sm flex items-center gap-2">
        <RefreshCw size={14} className="mr-1" />
        Build a new workflow
      </p>
    </div>
  )
}
