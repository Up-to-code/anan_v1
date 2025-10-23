'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function LandingPageClient() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navigation />
      <Hero />
      <Benefits />
      <Features />
      <Pricing />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
}

// ==================== NAVIGATION ====================
function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.pageYOffset > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/95 backdrop-blur-lg shadow-sm' : 'bg-transparent'
    }`}>
      <nav className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
              <span className="text-white font-semibold">E</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Emailly</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <a href="#features" className="text-gray-700 hover:text-gray-900 transition-colors text-sm font-medium">
              Features
            </a>
            <a href="#pricing" className="text-gray-700 hover:text-gray-900 transition-colors text-sm font-medium">
              Pricing
            </a>
            <a href="#testimonials" className="text-gray-700 hover:text-gray-900 transition-colors text-sm font-medium">
              Testimonials
            </a>
          </div>
          
          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link href="/sign-in" className="text-gray-700 hover:text-gray-900 text-sm font-medium transition-colors">
              Sign In
            </Link>
            <Link href="/sign-up" className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-colors">
              Get Started
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}

// ==================== HERO SECTION ====================
function Hero() {
  return (
    <section className="pt-32 pb-20 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-white rounded-full shadow-sm border border-gray-200 text-sm font-medium text-gray-700 mb-8">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              Trusted by 10,000+ teams worldwide
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-gray-900">
              Email Management
              <span className="block text-gray-900">
                Made Simple
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl text-gray-600 mb-8 max-w-2xl leading-relaxed">
              AI-powered email platform that saves teams hours per week. 
              Automate sorting, collaborate seamlessly, and focus on what matters.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <Link href="/sign-up" className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-lg font-medium text-lg transition-colors text-center">
                Start Free Trial
              </Link>
              <button className="border-2 border-gray-300 hover:border-gray-400 text-gray-700 px-8 py-4 rounded-lg font-medium text-lg transition-colors flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                Watch Demo
              </button>
            </div>

            {/* Social Proof */}
            <div className="flex flex-col sm:flex-row items-center gap-8 text-sm text-gray-600">
              <div className="flex items-center">
                <div className="flex -space-x-3 mr-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white overflow-hidden bg-gray-100">
                      <Image 
                        src={`https://picsum.photos/seed/user${i}/40/40`} 
                        width={40} 
                        height={40} 
                        alt={`User ${i}`}
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
                <span>Join 10,000+ users</span>
              </div>
            </div>
          </div>

          {/* Right Content - Dashboard Preview */}
          <div className="relative">
            <div className="relative bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              <Image 
                src="https://picsum.photos/seed/dashboard/800/600" 
                width={800} 
                height={600} 
                className="w-full h-auto" 
                alt="Emailly Dashboard"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ==================== BENEFITS SECTION ====================
function Benefits() {
  const benefits = [
    {
      icon: '⏱️',
      title: 'Save 12+ Hours Weekly',
      description: 'Automate email sorting and reduce manual work with AI-powered categorization'
    },
    {
      icon: '🚀',
      title: 'Faster Response Time',
      description: 'Smart templates and collaboration features help you respond quicker'
    },
    {
      icon: '💰',
      title: 'Reduce Costs',
      description: 'Eliminate the need for multiple tools with our all-in-one platform'
    },
    {
      icon: '📈',
      title: 'Boost Productivity',
      description: 'Shared inboxes and real-time collaboration boost team efficiency'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Transform Your Email Workflow
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of teams that have revolutionized their email management
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-2xl border border-gray-200 text-center hover:shadow-lg transition-all duration-300">
              <div className="text-4xl mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {benefit.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ==================== FEATURES SECTION ====================
function Features() {
  const features = [
    {
      title: 'AI-Powered Sorting',
      description: 'Smart categorization that learns from your behavior and automatically organizes emails',
      image: 'ai-sorting',
      benefits: ['Reduces manual sorting by 90%', 'Learns your preferences', 'Improves over time']
    },
    {
      title: 'Team Collaboration',
      description: 'Shared inboxes, internal notes, and real-time collaboration for seamless teamwork',
      image: 'collaboration',
      benefits: ['No more forwarding emails', 'Assign emails to team members', 'Track team performance']
    },
    {
      title: 'Advanced Analytics',
      description: 'Deep insights into email performance, response times, and team productivity',
      image: 'analytics',
      benefits: ['Track key metrics', 'Identify bottlenecks', 'Improve team efficiency']
    }
  ];

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Powerful Features
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to manage email efficiently
          </p>
        </div>

        <div className="space-y-20">
          {features.map((feature, index) => (
            <div key={index} className={`grid lg:grid-cols-2 gap-12 items-center ${
              index % 2 === 1 ? 'lg:grid-flow-dense' : ''
            }`}>
              <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  {feature.description}
                </p>
                <ul className="space-y-3">
                  {feature.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-center text-gray-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
              <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                <div className="bg-white rounded-2xl p-2 shadow-lg border border-gray-200">
                  <Image 
                    src={`https://picsum.photos/seed/${feature.image}/600/400`} 
                    width={600} 
                    height={400} 
                    className="rounded-xl w-full h-auto" 
                    alt={feature.title}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ==================== PRICING ====================
function Pricing() {
  const [isAnnual, setIsAnnual] = useState(true);

  const plans = [
    {
      name: 'Starter',
      description: 'Perfect for individuals',
      price: '$0',
      annualPrice: '$0',
      period: 'forever',
      features: [
        'Up to 1,000 emails/month',
        'Basic AI features',
        '5GB storage',
        'Email templates',
        'Basic analytics'
      ],
      cta: 'Get Started Free',
      popular: false
    },
    {
      name: 'Professional',
      description: 'For growing teams',
      price: '$19',
      annualPrice: '$15',
      period: 'per user/month',
      features: [
        'Unlimited emails',
        'Advanced AI features',
        '100GB storage',
        'Team collaboration',
        'Advanced analytics',
        'Priority support'
      ],
      cta: 'Start Free Trial',
      popular: true
    },
    {
      name: 'Enterprise',
      description: 'For large organizations',
      price: 'Custom',
      annualPrice: 'Custom',
      period: '',
      features: [
        'Everything in Professional',
        'Unlimited storage',
        'Custom AI training',
        'Advanced security',
        'Dedicated account manager',
        '24/7 phone support'
      ],
      cta: 'Contact Sales',
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Simple Pricing
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Start free. No credit card required.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex bg-gray-100 rounded-lg p-1 mb-12">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-6 py-3 rounded-md font-medium transition-all duration-300 ${
                !isAnnual ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-6 py-3 rounded-md font-medium transition-all duration-300 ${
                isAnnual ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Annual (Save 20%)
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl p-8 relative border ${
                plan.popular ? 'border-gray-900 shadow-lg' : 'border-gray-200'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="bg-gray-900 text-white px-4 py-2 rounded-full text-sm font-medium">
                    MOST POPULAR
                  </div>
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                
                <div className="mb-4">
                  <span className="text-4xl font-bold text-gray-900">
                    {isAnnual ? plan.annualPrice : plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-gray-600 ml-2">{plan.period}</span>
                  )}
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                href="/sign-up"
                className={`w-full py-4 rounded-lg font-medium transition-all duration-300 block text-center ${
                  plan.popular
                    ? 'bg-gray-900 hover:bg-gray-800 text-white'
                    : 'bg-gray-900 hover:bg-gray-800 text-white'
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        {/* Guarantee */}
        <div className="text-center mt-12">
          <p className="text-gray-600 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            14-day free trial • No credit card required • Cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
}

// ==================== TESTIMONIALS ====================
function Testimonials() {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'CEO, TechStart',
      content: 'Emailly has transformed how our team communicates. We\'ve cut email management time by 70%.',
      rating: 5
    },
    {
      name: 'Michael Chen',
      role: 'CTO, InnovateCo',
      content: 'The AI-powered sorting alone is worth the price. It understands our workflow perfectly.',
      rating: 5
    },
    {
      name: 'Emily Davis',
      role: 'Product Manager',
      content: 'Our team productivity increased by 40% after switching to Emailly.',
      rating: 5
    }
  ];

  return (
    <section id="testimonials" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Loved by Teams
          </h2>
          <p className="text-xl text-gray-600">
            Don&apos;t just take our word for it
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 border border-gray-200">
              {/* Stars */}
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-600 mb-6 leading-relaxed">
                {testimonial.content}
              </p>

              {/* Author */}
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gray-200 mr-4"></div>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-gray-600 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ==================== FAQ ====================
function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'How does the free trial work?',
      answer: 'Start your free trial immediately after signing up. No credit card required. Get full access to all Professional features.'
    },
    {
      question: 'Can I import my existing emails?',
      answer: 'Yes! We support seamless migration from Gmail, Outlook, and all major email providers.'
    },
    {
      question: 'Is my data secure?',
      answer: 'Absolutely. We use enterprise-grade encryption and comply with GDPR and security standards.'
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-gray-50 rounded-2xl border border-gray-200 overflow-hidden">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-100 transition-colors"
              >
                <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-5 w-5 text-gray-500 transition-transform duration-300 flex-shrink-0 ${
                    openIndex === index ? 'transform rotate-180' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ==================== CTA SECTION ====================
function CTA() {
  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-6">
          Ready to Transform Your Email?
        </h2>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Join thousands of teams saving hours per week with Emailly
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Link href="/sign-up" className="bg-white hover:bg-gray-100 text-gray-900 px-8 py-4 rounded-lg font-medium text-lg transition-colors">
            Start Free Trial
          </Link>
          <button className="border-2 border-white hover:bg-white hover:text-gray-900 text-white px-8 py-4 rounded-lg font-medium text-lg transition-colors">
            Schedule a Demo
          </button>
        </div>

        <div className="text-gray-400 text-sm">
          <p>No credit card required • 14-day free trial • Cancel anytime</p>
        </div>
      </div>
    </section>
  );
}

// ==================== FOOTER ====================
function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <span className="text-gray-900 font-semibold">E</span>
              </div>
              <span className="text-xl font-bold">Emailly</span>
            </div>
            <p className="text-gray-400 text-sm">
              The future of email communication for modern teams.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2">
              {['Features', 'Pricing', 'Integrations'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              {['About', 'Blog', 'Contact'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              {['Privacy', 'Terms', 'Security'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 Emailly. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}