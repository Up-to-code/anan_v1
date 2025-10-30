import React from 'react'
import type { AutomationType } from './types'
import { Pause, Play, CheckCircle2, BarChart2 } from 'lucide-react'

export function AutomationCard({ automation, onToggle }: { automation: AutomationType; onToggle: (id: string) => void }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          <div
            className={`w-2 h-2 rounded-full mt-2 ${
              automation.status === 'active' ? 'bg-green-500' : 'bg-gray-300'
            }`}
          />
          {automation.icon && <div className="ml-1">{automation.icon}</div>}
        </div>
        <button
          onClick={() => onToggle(automation.id)}
          className={`p-2 rounded-lg ${
            automation.status === 'active' ? 'text-green-600 hover:bg-green-50' : 'text-gray-400 hover:bg-gray-50'
          }`}
        >
          {automation.status === 'active' ? <Pause size={16} /> : <Play size={16} />}
        </button>
      </div>
      <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
        {automation.icon}
        {automation.name}
      </h3>
      <p className="text-gray-600 text-sm mb-4">{automation.description}</p>
      <div className="flex items-center justify-between">
        <span
          className={`text-sm font-medium ${
            automation.status === 'active' ? 'text-green-600' : 'text-gray-400'
          } flex items-center gap-1`}
        >
          {automation.status === 'active' ? (
            <CheckCircle2 size={14} className="mr-1 text-green-500" />
          ) : (
            <Pause size={14} className="mr-1 text-gray-400" />
          )}
          {automation.status === 'active' ? 'Running' : 'Paused'}
        </span>
        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1">
          <BarChart2 size={14} />
          Edit
        </button>
      </div>
    </div>
  )
}
