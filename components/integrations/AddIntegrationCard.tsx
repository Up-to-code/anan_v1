import React from 'react'
import { Plus, Mail } from 'lucide-react'

export function AddIntegrationCard() {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 border-dashed hover:border-blue-300 transition-colors cursor-pointer">
      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
        <Plus size={24} className="text-gray-400" />
      </div>
      <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
        <Plus size={18} className="text-blue-400" />
        Request Integration
      </h3>
      <p className="text-gray-600 text-sm mb-4">Need another app? Let us know</p>
      <button className="w-full py-2 px-4 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-2">
        <Mail size={16} className="text-gray-400" />
        Suggest App
      </button>
    </div>
  )
}
