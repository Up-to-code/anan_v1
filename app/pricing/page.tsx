'use client';

import React, { useState } from 'react';
import { CheckIcon, XIcon, StarIcon, UsersIcon, ShieldCheckIcon, ClockIcon } from 'lucide-react';

interface PlanFeature {
  name: string;
  included: boolean;
  description?: string;
}

interface PricingPlan {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  popular?: boolean;
  features: PlanFeature[];
  cta: string;
  color: string;
  badge?: string;
}

const pricingPlans: PricingPlan[] = [
  {
    id: 'starter',
    name: 'Starter',
    description: 'Perfect for individuals and small businesses',
    monthlyPrice: 0,
    yearlyPrice: 0,
    features: [
      { name: '1,000 emails per month', included: true },
      { name: 'Basic templates', included: true, description: 'Access to 10+ pre-designed templates' },
      { name: 'Email analytics', included: true, description: 'Basic open and click tracking' },
      { name: 'Single user', included: true },
      { name: 'Standard support', included: true, description: 'Email support within 48 hours' },
      { name: 'Custom domains', included: false },
      { name: 'Advanced automation', included: false },
      { name: 'API access', included: false },
      { name: 'Priority support', included: false },
      { name: 'Dedicated account manager', included: false },
      { name: 'Custom integrations', included: false },
      { name: 'Advanced reporting', included: false },
    ],
    cta: 'Get Started Free',
    color: 'gray'
  },
  {
    id: 'pro',
    name: 'Professional',
    description: 'Best for growing businesses and marketing teams',
    monthlyPrice: 29,
    yearlyPrice: 24,
    popular: true,
    badge: 'Most Popular',
    features: [
      { name: '10,000 emails per month', included: true },
      { name: 'All templates', included: true, description: 'Access to 50+ premium templates' },
      { name: 'Advanced analytics', included: true, description: 'Detailed engagement metrics' },
      { name: '5 team members', included: true },
      { name: 'Custom domains', included: true, description: 'Up to 3 custom domains' },
      { name: 'Advanced automation', included: true, description: 'Build automated workflows' },
      { name: 'A/B testing', included: true, description: 'Test subject lines and content' },
      { name: 'API access', included: false },
      { name: 'Priority support', included: false },
      { name: 'Dedicated account manager', included: false },
      { name: 'Custom integrations', included: false },
      { name: 'Advanced reporting', included: false },
    ],
    cta: 'Start Free Trial',
    color: 'blue'
  },
  {
    id: 'business',
    name: 'Business',
    description: 'For established businesses needing more power',
    monthlyPrice: 59,
    yearlyPrice: 49,
    features: [
      { name: '50,000 emails per month', included: true },
      { name: 'All templates + custom', included: true, description: 'Create your own templates' },
      { name: 'Advanced analytics & reporting', included: true, description: 'Custom reports and insights' },
      { name: '15 team members', included: true },
      { name: 'Multiple custom domains', included: true, description: 'Up to 10 custom domains' },
      { name: 'Workflow automation', included: true, description: 'Complex multi-step automations' },
      { name: 'Advanced A/B testing', included: true, description: 'Multivariate testing' },
      { name: 'API access', included: true, description: 'Full REST API access' },
      { name: 'Priority support', included: true, description: '24-hour response time' },
      { name: 'Dedicated account manager', included: false },
      { name: 'Custom integrations', included: false },
      { name: 'Advanced reporting', included: true, description: 'Custom dashboards' },
    ],
    cta: 'Start Free Trial',
    color: 'indigo'
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'For large organizations with advanced needs',
    monthlyPrice: 99,
    yearlyPrice: 79,
    badge: 'Best Value',
    features: [
      { name: 'Unlimited emails', included: true },
      { name: 'All templates + custom', included: true, description: 'Unlimited custom templates' },
      { name: 'Advanced analytics & reporting', included: true, description: 'AI-powered insights' },
      { name: 'Unlimited team members', included: true },
      { name: 'Multiple custom domains', included: true, description: 'Unlimited custom domains' },
      { name: 'Workflow automation', included: true, description: 'Advanced automation with triggers' },
      { name: 'Advanced A/B testing', included: true, description: 'Full multivariate testing' },
      { name: 'Full API access', included: true, description: 'Priority API access' },
      { name: '24/7 priority support', included: true, description: 'Phone and chat support' },
      { name: 'Dedicated account manager', included: true },
      { name: 'Custom integrations', included: true, description: 'Tailored integration solutions' },
      { name: 'Advanced reporting', included: true, description: 'Custom analytics and BI tools' },
    ],
    cta: 'Contact Sales',
    color: 'purple'
  }
];

const features = [
  {
    category: 'Email Features',
    items: [
      'Drag & Drop Editor',
      'Custom Templates',
      'A/B Testing',
      'Automation Workflows',
      'Personalization',
      'Spam Testing',
      'Dynamic Content',
      'Email Scheduling',
      'RSS-to-Email',
      'Landing Pages'
    ]
  },
  {
    category: 'Analytics',
    items: [
      'Open Rate Tracking',
      'Click Tracking',
      'Conversion Tracking',
      'Revenue Reporting',
      'Geo Tracking',
      'Real-time Analytics',
      'Heat Maps',
      'Device Tracking',
      'Engagement Scoring',
      'Custom Reports'
    ]
  },
  {
    category: 'Collaboration',
    items: [
      'Team Members',
      'Role-based Access',
      'Approval Workflows',
      'Comments & Notes',
      'Activity Log',
      'Version History',
      'Content Library',
      'Team Calendars',
      'Shared Segments',
      'Collaborative Editing'
    ]
  },
  {
    category: 'Deliverability',
    items: [
      'IP Warm-up',
      'Dedicated IPs',
      'Deliverability Monitoring',
      'Spam Score Analysis',
      'Bounce Management',
      'Compliance Monitoring',
      'Domain Authentication',
      'Feedback Loops',
      'Suppression Lists',
      'Deliverability Consulting'
    ]
  }
];

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Marketing Director at TechCorp',
    content: 'Emailly transformed our email marketing strategy. The automation features saved us hours of work each week.',
    rating: 5,
    avatar: 'SJ'
  },
  {
    name: 'Michael Chen',
    role: 'Founder of StartupXYZ',
    content: 'The analytics provided by Emailly helped us understand our audience better and increase our conversion rates by 40%.',
    rating: 5,
    avatar: 'MC'
  },
  {
    name: 'Emily Rodriguez',
    role: 'E-commerce Manager at ShopWell',
    content: 'We\'ve tried several email marketing platforms, but Emailly offers the best value for money. The support team is also incredibly helpful.',
    rating: 5,
    avatar: 'ER'
  }
];

const integrations = [
  { name: 'Shopify', category: 'E-commerce' },
  { name: 'WooCommerce', category: 'E-commerce' },
  { name: 'Salesforce', category: 'CRM' },
  { name: 'HubSpot', category: 'CRM' },
  { name: 'WordPress', category: 'CMS' },
  { name: 'Zapier', category: 'Automation' },
  { name: 'Google Analytics', category: 'Analytics' },
  { name: 'Stripe', category: 'Payment' },
  { name: 'Slack', category: 'Communication' },
  { name: 'Facebook', category: 'Social Media' },
  { name: 'Twitter', category: 'Social Media' },
  { name: 'LinkedIn', category: 'Social Media' }
];

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [isAnnual, setIsAnnual] = useState(false);
  const [activeTab, setActiveTab] = useState('features');

  const toggleBilling = () => {
    const newBilling = billingCycle === 'monthly' ? 'yearly' : 'monthly';
    setBillingCycle(newBilling);
    setIsAnnual(newBilling === 'yearly');
  };

  const getPrice = (plan: PricingPlan) => {
    return billingCycle === 'yearly' ? plan.yearlyPrice : plan.monthlyPrice;
  };

  const getSavings = (plan: PricingPlan) => {
    if (billingCycle === 'yearly' && plan.monthlyPrice > 0) {
      const annualSavings = (plan.monthlyPrice * 12) - (plan.yearlyPrice * 12);
      const percentage = Math.round((annualSavings / (plan.monthlyPrice * 12)) * 100);
      return percentage;
    }
    return 0;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
                <span className="text-white font-semibold">E</span>
              </div>
              <span className="ml-3 text-xl font-bold text-gray-900">Emailly</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="/features" className="text-gray-600 hover:text-gray-900">Features</a>
              <a href="/pricing" className="text-gray-900 font-medium">Pricing</a>
              <a href="/docs" className="text-gray-600 hover:text-gray-900">Docs</a>
              <a href="/support" className="text-gray-600 hover:text-gray-900">Support</a>
            </nav>
            <div className="flex items-center space-x-4">
              <a href="/auth/signin" className="text-gray-600 hover:text-gray-900">Sign In</a>
              <a href="/auth/signup" className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors">
                Get Started Free
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Start free and scale as you grow. No hidden fees, no credit card required to start.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center mb-16">
            <span className={`mr-4 text-lg ${billingCycle === 'monthly' ? 'text-gray-900' : 'text-gray-500'}`}>
              Monthly
            </span>
            <button
              onClick={toggleBilling}
              className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  billingCycle === 'yearly' ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className="ml-4 text-lg flex items-center">
              <span className={billingCycle === 'yearly' ? 'text-gray-900' : 'text-gray-500'}>Yearly</span>
              {billingCycle === 'yearly' && (
                <span className="ml-2 bg-green-100 text-green-800 text-sm font-medium px-2 py-1 rounded-full">
                  Save up to 20%
                </span>
              )}
            </span>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pricingPlans.map((plan) => {
              const price = getPrice(plan);
              const savings = getSavings(plan);
              
              return (
                <div
                  key={plan.id}
                  className={`relative bg-white rounded-2xl shadow-sm border-2 ${
                    plan.popular 
                      ? 'border-blue-500 shadow-xl transform scale-105' 
                      : 'border-gray-200'
                  } transition-all duration-300 hover:shadow-xl`}
                >
                  {plan.badge && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                        {plan.badge}
                      </span>
                    </div>
                  )}

                  <div className="p-8">
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                      <p className="text-gray-600 mb-6">{plan.description}</p>
                      
                      <div className="mb-4">
                        <span className="text-4xl font-bold text-gray-900">${price}</span>
                        {price > 0 && (
                          <span className="text-gray-600 ml-2">/month</span>
                        )}
                      </div>
                      
                      {billingCycle === 'yearly' && price > 0 && (
                        <div className="text-sm text-green-600 font-medium">
                          Save {savings}% annually
                        </div>
                      )}
                      
                      {price === 0 && (
                        <div className="text-sm text-gray-600">
                          Free forever
                        </div>
                      )}
                    </div>

                    <button
                      className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                        plan.popular
                          ? 'bg-blue-500 text-white hover:bg-blue-600'
                          : plan.id === 'starter'
                          ? 'bg-gray-900 text-white hover:bg-gray-800'
                          : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                      }`}
                    >
                      {plan.cta}
                    </button>

                    <ul className="mt-8 space-y-4">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          {feature.included ? (
                            <CheckIcon className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                          ) : (
                            <XIcon className="h-5 w-5 text-gray-300 mt-0.5 mr-3 flex-shrink-0" />
                          )}
                          <div>
                            <span className={feature.included ? 'text-gray-700' : 'text-gray-400'}>
                              {feature.name}
                            </span>
                            {feature.description && (
                              <p className="text-xs text-gray-500 mt-1">{feature.description}</p>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Compare Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how our plans stack up against each other
            </p>
          </div>

          <div className="mb-8 flex justify-center">
            <div className="inline-flex rounded-md shadow-sm" role="group">
              <button
                type="button"
                className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
                  activeTab === 'features'
                    ? 'bg-gray-900 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                } border border-gray-200`}
                onClick={() => setActiveTab('features')}
              >
                Features
              </button>
              <button
                type="button"
                className={`px-4 py-2 text-sm font-medium ${
                  activeTab === 'integrations'
                    ? 'bg-gray-900 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                } border-t border-b border-gray-200`}
                onClick={() => setActiveTab('integrations')}
              >
                Integrations
              </button>
              <button
                type="button"
                className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
                  activeTab === 'support'
                    ? 'bg-gray-900 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                } border border-gray-200`}
                onClick={() => setActiveTab('support')}
              >
                Support
              </button>
            </div>
          </div>

          {activeTab === 'features' && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="py-4 text-left text-sm font-semibold text-gray-900">Feature</th>
                    {pricingPlans.map((plan) => (
                      <th key={plan.id} className="py-4 text-center">
                        <div className="font-semibold text-gray-900">{plan.name}</div>
                        <div className="text-sm text-gray-600 mt-1">
                          {plan.monthlyPrice === 0 ? 'Free' : `$${plan.monthlyPrice}/mo`}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {features.map((category, categoryIndex) => (
                    <React.Fragment key={categoryIndex}>
                      <tr className="border-b border-gray-100">
                        <td colSpan={5} className="py-3 bg-gray-50">
                          <h3 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">
                            {category.category}
                          </h3>
                        </td>
                      </tr>
                      {category.items.map((item, itemIndex) => (
                        <tr key={itemIndex} className="border-b border-gray-100">
                          <td className="py-3 text-sm text-gray-700">{item}</td>
                          {pricingPlans.map((plan) => (
                            <td key={plan.id} className="py-3 text-center">
                              {plan.features.some(f => f.name === item) ? (
                                <CheckIcon className="h-5 w-5 text-green-500 mx-auto" />
                              ) : (
                                <XIcon className="h-5 w-5 text-gray-300 mx-auto" />
                              )}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'integrations' && (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {integrations.map((integration, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 text-center hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg mx-auto mb-3 flex items-center justify-center">
                    <span className="text-gray-600 font-semibold">{integration.name.substring(0, 2)}</span>
                  </div>
                  <h4 className="text-sm font-medium text-gray-900">{integration.name}</h4>
                  <p className="text-xs text-gray-500 mt-1">{integration.category}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'support' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {pricingPlans.map((plan) => (
                <div key={plan.id} className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">{plan.name}</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <ClockIcon className="h-5 w-5 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-600">
                        {plan.id === 'starter' ? '48-hour response time' : 
                         plan.id === 'pro' ? '24-hour response time' :
                         plan.id === 'business' ? '12-hour response time' :
                         'Instant response'}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <UsersIcon className="h-5 w-5 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-600">
                        {plan.id === 'enterprise' ? 'Dedicated account manager' : 'Community support'}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <ShieldCheckIcon className="h-5 w-5 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-600">
                        {plan.id === 'enterprise' ? 'Phone & chat support' : 'Email support'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Trusted by Thousands of Businesses
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See what our customers have to say about Emailly
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">{testimonial.content}</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                    <span className="text-gray-600 font-medium">{testimonial.avatar}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-8">
            {[
              {
                question: "Can I change plans anytime?",
                answer: "Yes, you can upgrade, downgrade, or cancel your plan at any time. Changes take effect immediately, and we'll prorate any differences."
              },
              {
                question: "Is there a free trial?",
                answer: "All paid plans come with a 14-day free trial. No credit card required to start. You can upgrade to a paid plan at any time during or after the trial."
              },
              {
                question: "What payment methods do you accept?",
                answer: "We accept all major credit cards, PayPal, and for annual Enterprise plans, we also accept bank transfers and purchase orders."
              },
              {
                question: "Do you offer discounts for non-profits?",
                answer: "Yes, we offer a 50% discount for registered non-profit organizations. Contact our sales team for verification and to set up your discounted plan."
              },
              {
                question: "Can I get a refund?",
                answer: "We offer a 30-day money-back guarantee for all annual plans. Monthly plans can be canceled anytime, and you'll continue to have access until the end of your billing period."
              },
              {
                question: "How does the email limit work?",
                answer: "Your email limit resets at the beginning of each billing cycle. If you reach your limit, you can either upgrade your plan or wait for the next billing cycle to continue sending."
              },
              {
                question: "Do you offer custom plans?",
                answer: "Yes, we can create custom plans for businesses with specific needs. Contact our sales team to discuss your requirements."
              },
              {
                question: "Is my data secure?",
                answer: "Absolutely. We use industry-standard encryption and security practices to protect your data. All data is encrypted in transit and at rest, and we comply with GDPR and other privacy regulations."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to get started?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of businesses that use Emailly to grow their audience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/auth/signup"
              className="bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Start Free Trial
            </a>
            <a
              href="/demo"
              className="border border-gray-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
            >
              Schedule a Demo
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
                  <span className="text-white font-semibold">E</span>
                </div>
                <span className="ml-3 text-xl font-bold text-gray-900">Emailly</span>
              </div>
              <p className="text-gray-600">
                Powerful email marketing platform for modern businesses.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Product</h3>
              <ul className="space-y-2 text-gray-600">
                <li><a href="/features" className="hover:text-gray-900">Features</a></li>
                <li><a href="/pricing" className="hover:text-gray-900">Pricing</a></li>
                <li><a href="/templates" className="hover:text-gray-900">Templates</a></li>
                <li><a href="/integrations" className="hover:text-gray-900">Integrations</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Resources</h3>
              <ul className="space-y-2 text-gray-600">
                <li><a href="/docs" className="hover:text-gray-900">Documentation</a></li>
                <li><a href="/blog" className="hover:text-gray-900">Blog</a></li>
                <li><a href="/guides" className="hover:text-gray-900">Guides</a></li>
                <li><a href="/support" className="hover:text-gray-900">Support</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Company</h3>
              <ul className="space-y-2 text-gray-600">
                <li><a href="/about" className="hover:text-gray-900">About</a></li>
                <li><a href="/careers" className="hover:text-gray-900">Careers</a></li>
                <li><a href="/contact" className="hover:text-gray-900">Contact</a></li>
                <li><a href="/privacy" className="hover:text-gray-900">Privacy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-600">
            <p>&copy; 2024 Emailly. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}