import Navigation from '@/components/landing/Navigation';
import HeroSection from '@/components/landing/HeroSection';
import TrustedBySection from '@/components/landing/TrustedBySection';
import FeaturesSection from '@/components/landing/FeaturesSection';
import UseCasesSection from '@/components/landing/UseCasesSection';
import HowItWorksSection from '@/components/landing/HowItWorksSection';
import SecuritySection from '@/components/landing/SecuritySection';
import PlatformSection from '@/components/landing/PlatformSection';
import IntegrationSection from '@/components/landing/IntegrationSection';
import DemoSection from '@/components/landing/DemoSection';
import MetricsSection from '@/components/landing/MetricsSection';
import TestimonialsSection from '@/components/landing/TestimonialsSection';
import CaseStudiesSection from '@/components/landing/CaseStudiesSection';
import TeamSection from '@/components/landing/TeamSection';
import FAQSection from '@/components/landing/FAQSection';
import AwardsSection from '@/components/landing/AwardsSection';
import PricingSection from '@/components/landing/PricingSection';
import ComparisonSection from '@/components/landing/ComparisonSection';
import ContactSection from '@/components/landing/ContactSection';
import FinalCTASection from '@/components/landing/FinalCTASection'; 
import Footer from '@/components/landing/Footer';   

export default function LandingPage() {
 

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Navigation />
      <HeroSection isVisible={true} />
      <TrustedBySection />
      <FeaturesSection />
      <UseCasesSection />
      <HowItWorksSection />
      <SecuritySection />
      <PlatformSection />
      <IntegrationSection />
      <DemoSection />
      <MetricsSection />
      <TestimonialsSection />
      <CaseStudiesSection />
      <TeamSection />
      <FAQSection />
      <AwardsSection />
      <PricingSection />
      <ComparisonSection />
      <ContactSection />
      <FinalCTASection />
      <Footer />
    </div>
  );
}