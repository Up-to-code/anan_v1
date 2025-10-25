import { 
    Zap, Users, BarChart3, Shield, Brain, Workflow,
    ShoppingCart, Cloud, Heart, Users as UsersIcon,
    MessageSquare, MessageCircle, Globe, Smartphone,
    ShieldCheck, FileText, Award, Lock,
    Settings, PieChart
  } from 'lucide-react';
  
  export const features = [
    {
      icon: Zap,
      title: "Instant Responses",
      description: "Automated replies and AI-powered suggestions help you respond to customers 3x faster than traditional methods.",
      metric: "3x faster"
    },
    {
      icon: Users,
      title: "Unified Inbox",
      description: "Manage all conversations from WhatsApp, Telegram, and web chat in one beautiful interface.",
      metric: "5+ platforms"
    },
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      description: "Track response times, customer satisfaction, and team performance with real-time analytics.",
      metric: "Real-time data"
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-level encryption, GDPR compliance, and SOC 2 Type II certification keep your data safe.",
      metric: "99.9% uptime"
    },
    {
      icon: Brain,
      title: "AI Assistant",
      description: "Smart AI that learns from your conversations to provide better responses and suggestions.",
      metric: "AI-powered"
    },
    {
      icon: Workflow,
      title: "Smart Automation",
      description: "Set up custom workflows, auto-responses, and chatbots to handle routine inquiries automatically.",
      metric: "80% automated"
    }
  ];
  
  export const useCases = [
    {
      industry: "E-commerce",
      icon: ShoppingCart,
      description: "Handle order inquiries, track shipments, and provide instant support to boost conversions.",
      metrics: "35% increase in sales"
    },
    {
      industry: "SaaS",
      icon: Cloud,
      description: "Offer real-time technical support and onboard new users with automated workflows.",
      metrics: "50% faster onboarding"
    },
    {
      industry: "Healthcare",
      icon: Heart,
      description: "Schedule appointments, send reminders, and provide confidential patient support.",
      metrics: "40% fewer no-shows"
    },
    {
      industry: "Education",
      icon: UsersIcon,
      description: "Engage students, answer questions, and provide learning support across multiple channels.",
      metrics: "60% better engagement"
    }
  ];
  
  export const howItWorksSteps = [
    {
      step: 1,
      title: "Sign Up & Connect",
      description: "Create your account in minutes and connect your WhatsApp, Telegram, and other messaging platforms.",
      icon: Settings
    },
    {
      step: 2,
      title: "Invite Your Team",
      description: "Add team members and set permissions. Everyone gets access to the unified inbox instantly.",
      icon: Users
    },
    {
      step: 3,
      title: "Start Chatting",
      description: "Begin conversations with customers across all platforms from one beautiful interface.",
      icon: MessageCircle
    },
    {
      step: 4,
      title: "Analyze & Improve",
      description: "Use our analytics dashboard to track performance and optimize your customer service.",
      icon: PieChart
    }
  ];
  
  export const securityFeatures = [
    {
      feature: "End-to-End Encryption",
      icon: ShieldCheck,
      description: "All messages are encrypted in transit and at rest"
    },
    {
      feature: "GDPR Compliant",
      icon: FileText,
      description: "Fully compliant with global data protection regulations"
    },
    {
      feature: "SOC 2 Type II",
      icon: Award,
      description: "Enterprise-grade security and compliance certification"
    },
    {
      feature: "Two-Factor Auth",
      icon: Lock,
      description: "Extra security layer for all team member accounts"
    }
  ];
  
  export const platforms = [
    {
      icon: MessageSquare,
      platform: "WhatsApp",
      description: "Reach 2 billion users with WhatsApp Business API integration",
      metric: "2B+ users"
    },
    {
      icon: MessageCircle,
      platform: "Telegram",
      description: "Fast, secure messaging with 700 million active users worldwide",
      metric: "700M+ users"
    },
    {
      icon: Globe,
      platform: "Web Chat",
      description: "Embed beautiful chat widgets on your website with one line of code",
      metric: "Instant setup"
    },
    {
      icon: Smartphone,
      platform: "Mobile Apps",
      description: "Native iOS and Android apps for managing conversations on the go",
      metric: "iOS & Android"
    }
  ];