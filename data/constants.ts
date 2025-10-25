// data/features.ts
import { ShoppingCart, Cloud, Heart, Users as UsersIcon } from 'lucide-react';

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

export const faqItems = [
  {
    question: "How long does it take to set up ChatConnect?",
    answer: "Most businesses can set up ChatConnect in under 10 minutes. Our intuitive setup wizard guides you through connecting your platforms, and you can start chatting with customers immediately."
  },
  // ... other FAQ items
];

// Add more data files as needed