import { 
  MessageCircle,
  Send,
  Instagram,
  Mail,
  Slack,
  Chrome,
  Calendar,
  BarChart2,
  Users,
  Shield,
  CheckCircle2,
  RefreshCw,
  Zap,
  Bell
} from 'lucide-react'
import type { IntegrationType, AutomationType } from './types'

export const initialIntegrations: IntegrationType[] = [
  { id: 'whatsapp', name: 'WhatsApp', description: 'Send messages and campaigns', icon: <MessageCircle size={24} />, connected: true },
  { id: 'telegram', name: 'Telegram', description: 'Connect with bots and channels', icon: <Send size={24} />, connected: true },
  { id: 'instagram', name: 'Instagram', description: 'Schedule posts and stories', icon: <Instagram size={24} />, connected: false },
  { id: 'gmail', name: 'Gmail', description: 'Sync with your Gmail account', icon: <Mail size={24} />, connected: false },
  { id: 'slack', name: 'Slack', description: 'Get notifications in Slack', icon: <Slack size={24} />, connected: true },
  { id: 'chrome', name: 'Chrome Extension', description: 'Quick access from browser', icon: <Chrome size={24} />, connected: false },
  { id: 'calendar', name: 'Google Calendar', description: 'Sync meetings and events', icon: <Calendar size={24} />, connected: false },
  { id: 'analytics', name: 'Google Analytics', description: 'Monitor traffic sources', icon: <BarChart2 size={24} />, connected: false },
  { id: 'team', name: 'Team Management', description: 'Invite or remove collaborators', icon: <Users size={24} />, connected: false },
  { id: 'security', name: 'Security Alerts', description: 'Monitor security notifications', icon: <Shield size={24} />, connected: false }
]

export const initialAutomations: AutomationType[] = [
  { id: '1', name: 'Welcome Message', description: 'Send welcome to new users', status: 'active', icon: <CheckCircle2 size={18} className="text-blue-500" /> },
  { id: '2', name: 'Weekly Digest', description: 'Weekly summary email', status: 'paused', icon: <BarChart2 size={18} className="text-purple-500" /> },
  { id: '3', name: 'Post Alert', description: 'Notify about new content', status: 'active', icon: <Bell size={18} className="text-yellow-500" /> },
  { id: '4', name: 'Campaign Boost', description: 'Promote special campaigns automatically', status: 'paused', icon: <Zap size={18} className="text-pink-500" /> },
  { id: '5', name: 'Sync Users', description: 'Sync users list every day', status: 'active', icon: <RefreshCw size={18} className="text-green-500" /> }
]
