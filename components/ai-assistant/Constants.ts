import React from "react";
import { 
  Brain, Bot, Zap, PhoneCall, MessageCircle, Mail, Video,
  Database, User, ShoppingCart, Target, TrendingUp, Tag, 
  CreditCard, PieChart, FileBarChart, Calendar, Cloud, Cpu,
  Headphones
} from "lucide-react";
import { Item } from './Types';

// Helper function to wrap icon with correct props as ReactNode
const icon = (IconComponent: React.ElementType, size: string = "w-5 h-5") => {
  return React.createElement(IconComponent, { className: size });
};

export const AI_MODELS: Item[] = [
  { id: "gpt4", name: "GPT-4", icon: icon(Brain) },
  { id: "claude", name: "Claude 3", icon: icon(Bot) },
  { id: "gemini", name: "Gemini Pro", icon: icon(Zap) },
];

export const CAPABILITIES: Item[] = [
  // Communication Tools
  { 
    id: "booking-call", 
    name: "Booking Calls", 
    icon: icon(PhoneCall, "w-6 h-6"), 
    description: "Schedule and manage customer calls automatically",
    category: "Communication"
  },
  { 
    id: "whatsapp", 
    name: "WhatsApp Business", 
    icon: icon(MessageCircle, "w-6 h-6"), 
    description: "Connect with customers via WhatsApp messaging",
    category: "Communication"
  },
  { 
    id: "email", 
    name: "Email Automation", 
    icon: icon(Mail, "w-6 h-6"), 
    description: "Send automated email responses and campaigns",
    category: "Communication"
  },
  { 
    id: "video-call", 
    name: "Video Calls", 
    icon: icon(Video, "w-6 h-6"), 
    description: "Host video consultations and meetings",
    category: "Communication"
  },

  // CRM & Data Tools
  { 
    id: "crm-access", 
    name: "CRM Access", 
    icon: icon(Database, "w-6 h-6"), 
    description: "Access and update customer records in CRM",
    category: "CRM & Data"
  },
  { 
    id: "contact-save", 
    name: "Save Contacts", 
    icon: icon(User, "w-6 h-6"), 
    description: "Automatically save new contacts to database",
    category: "CRM & Data"
  },
  { 
    id: "order-create", 
    name: "Create Orders", 
    icon: icon(ShoppingCart, "w-6 h-6"), 
    description: "Process and create customer orders automatically",
    category: "CRM & Data"
  },
  { 
    id: "lead-tracking", 
    name: "Lead Tracking", 
    icon: icon(Target, "w-6 h-6"), 
    description: "Track and manage sales leads pipeline",
    category: "CRM & Data"
  },

  // Sales & Marketing
  { 
    id: "upsell", 
    name: "Upsell Products", 
    icon: icon(TrendingUp, "w-6 h-6"), 
    description: "Suggest additional products to customers",
    category: "Sales & Marketing"
  },
  { 
    id: "discounts", 
    name: "Apply Discounts", 
    icon: icon(Tag, "w-6 h-6"), 
    description: "Offer and apply promotional discounts",
    category: "Sales & Marketing"
  },
  { 
    id: "payment", 
    name: "Payment Processing", 
    icon: icon(CreditCard, "w-6 h-6"), 
    description: "Process payments and generate invoices",
    category: "Sales & Marketing"
  },

  // Analytics & Reports
  { 
    id: "analytics", 
    name: "Customer Analytics", 
    icon: icon(PieChart, "w-6 h-6"), 
    description: "Generate customer behavior insights and analytics",
    category: "Analytics"
  },
  { 
    id: "reports", 
    name: "Sales Reports", 
    icon: icon(FileBarChart, "w-6 h-6"), 
    description: "Create automated sales performance reports",
    category: "Analytics"
  },

  // System Tools
  { 
    id: "calendar", 
    name: "Calendar Sync", 
    icon: icon(Calendar, "w-6 h-6"), 
    description: "Sync with Google/Outlook calendars automatically",
    category: "System"
  },
  { 
    id: "file-upload", 
    name: "File Management", 
    icon: icon(Cloud, "w-6 h-6"), 
    description: "Upload and manage customer files and documents",
    category: "System"
  },
  { 
    id: "settings", 
    name: "System Settings", 
    icon: icon(Cpu, "w-6 h-6"), 
    description: "Access and modify system configurations",
    category: "System"
  }
];

export const TEMPLATES: Item[] = [
  { 
    id: "customer-service", 
    name: "Customer Service", 
    icon: icon(Headphones), 
    prompt: "You are a friendly and empathetic customer service specialist. Your primary goal is to resolve customer issues efficiently while maintaining a warm, professional tone. Always acknowledge the customer's concerns, provide clear solutions, and follow up to ensure satisfaction." 
  },
  { 
    id: "sales-agent", 
    name: "Sales Agent", 
    icon: icon(TrendingUp), 
    prompt: "You are a persuasive yet helpful sales agent. Focus on understanding customer needs, recommending suitable products, and guiding them through the purchase process. Be knowledgeable about products but never pushy. Always look for opportunities to provide value." 
  },
  { 
    id: "booking-specialist", 
    name: "Booking Specialist", 
    icon: icon(Calendar), 
    prompt: "You are an efficient booking specialist. Your role is to help customers schedule appointments, manage calendars, and handle rescheduling requests. Be extremely organized, double-check all details, and provide clear confirmation information." 
  },
  { 
    id: "billing-support", 
    name: "Billing Support", 
    icon: icon(CreditCard), 
    prompt: "You are a detail-oriented billing specialist. Handle payment inquiries, invoice questions, and billing issues with precision and transparency. Always explain charges clearly and help customers understand their billing statements." 
  }
];