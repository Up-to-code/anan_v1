import React from 'react'
import type { IntegrationType } from './types'

export function IntegrationCard({ integration, onToggle }: { integration: IntegrationType; onToggle: (id: string) => void }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex items-start justify-between mb-4">
        <div
          className={`w-12 h-12 rounded-lg flex items-center justify-center ${
            integration.connected ? 'bg-green-500' : 'bg-gray-100'
          }`}
        >
          <div className={integration.connected ? 'text-white' : 'text-gray-600'}>
            {integration.icon}
          </div>
        </div>
        {integration.connected && (
          <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Connected</div>
        )}
      </div>
      <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
        {integration.icon}
        {integration.name}
      </h3>
      <p className="text-gray-600 text-sm mb-4">{integration.description}</p>
      <button
        onClick={() => onToggle(integration.id)}
        className={`w-full py-2 px-4 rounded-lg text-sm font-medium ${
          integration.connected
            ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            : 'bg-blue-500 text-white hover:bg-blue-600'
        }`}
      >
        {integration.connected ? 'Disconnect' : 'Connect'}
      </button>
    </div>
  )
}
