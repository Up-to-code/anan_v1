import { Metadata } from 'next';
import LandingPageClient from './LandingPageClient';

// Metadata for SEO - This can only be exported from a Server Component
export const metadata: Metadata = {
  title: 'Emailly - Modern Email Platform for Teams',
  description: 'Experience the next generation of email management with AI-powered features, seamless collaboration, and enterprise-grade security.',
  keywords: ['email', 'team collaboration', 'AI', 'email management', 'SaaS'],
  openGraph: {
    title: 'Emailly - Modern Email Platform',
    description: 'The future of email communication',
    type: 'website',
    url: 'https://emailly.com',
  },
};

// Server Component that renders the Client Component
export default function LandingPage() {
  return <LandingPageClient />;
}