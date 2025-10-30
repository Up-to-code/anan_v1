import type { ReactNode } from 'react'

export type IntegrationType = {
  id: string
  name: string
  description: string
  icon: ReactNode
  connected: boolean
}

export type AutomationType = {
  id: string
  name: string
  description: string
  status: 'active' | 'paused'
  icon?: ReactNode
}
