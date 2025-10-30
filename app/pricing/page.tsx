'use client';

import React, { useState } from 'react';
import {
  CheckIcon,
  XIcon,
  StarIcon,
  UsersIcon,
  ShieldCheckIcon,
  ClockIcon,
  SparklesIcon,
  TrendingUpIcon,
} from 'lucide-react';

// -------- Data and Types --------

interface PlanFeature {
  name: string;
  included: boolean;
  description?: string;
  modern?: boolean;
  highlighted?: boolean;
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
    description: 'Modern free forever for new users and small businesses',
    monthlyPrice: 0,
    yearlyPrice: 0,
    features: [
      { name: 'Drag & Drop Editor', included: true, modern: true, highlighted: true },
      { name: 'Custom Templates', included: false },
      { name: 'A/B Testing', included: false },
      { name: 'Automation Workflows', included: false },
      { name: 'Personalization', included: false },
      { name: 'Spam Testing', included: false },
      { name: 'Dynamic Content', included: false },
    ],
    cta: 'Get Started Free',
    color: 'gray',
  },
  {
    id: 'pro',
    name: 'Professional',
    description: 'Modern plan for growing businesses and teams',
    monthlyPrice: 29,
    yearlyPrice: 24,
    popular: true,
    badge: 'Most Popular',
    features: [
      { name: 'Drag & Drop Editor', included: true, modern: true, highlighted: true },
      { name: 'Custom Templates', included: true, modern: true },
      { name: 'A/B Testing', included: true, highlighted: true },
      { name: 'Automation Workflows', included: true, highlighted: true },
      { name: 'Personalization', included: true },
      { name: 'Spam Testing', included: false },
      { name: 'Dynamic Content', included: false },
    ],
    cta: 'Start Free Trial',
    color: 'blue',
  },
  {
    id: 'business',
    name: 'Business',
    description: 'Flexible plan for established businesses',
    monthlyPrice: 59,
    yearlyPrice: 49,
    features: [
      { name: 'Drag & Drop Editor', included: true, modern: true, highlighted: true },
      { name: 'Custom Templates', included: true, modern: true, highlighted: true },
      { name: 'A/B Testing', included: true, highlighted: true },
      { name: 'Automation Workflows', included: true, highlighted: true },
      { name: 'Personalization', included: true },
      { name: 'Spam Testing', included: true },
      { name: 'Dynamic Content', included: true },
    ],
    cta: 'Start Free Trial',
    color: 'indigo',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'Modern & advanced for high-demand organizations',
    monthlyPrice: 99,
    yearlyPrice: 79,
    badge: 'Best Value',
    features: [
      { name: 'Drag & Drop Editor', included: true, modern: true, highlighted: true },
      { name: 'Custom Templates', included: true, modern: true, highlighted: true },
      { name: 'A/B Testing', included: true, highlighted: true },
      { name: 'Automation Workflows', included: true, highlighted: true },
      { name: 'Personalization', included: true, modern: true },
      { name: 'Spam Testing', included: true, modern: true },
      { name: 'Dynamic Content', included: true, modern: true },
    ],
    cta: 'Contact Sales',
    color: 'purple',
  },
];

// Only show a sample, with "more/less" feature toggle.
const allFeatures = [
  {
    category: 'Email Features',
    items: [
      { name: 'Drag & Drop Editor', modern: true },
      { name: 'Custom Templates', modern: true },
      { name: 'A/B Testing', modern: false },
      { name: 'Automation Workflows', modern: false },
      { name: 'Personalization', modern: false },
      { name: 'Spam Testing', modern: false },
      { name: 'Dynamic Content', modern: false },
      { name: 'Email Scheduling', modern: false },
      { name: 'RSS-to-Email', modern: false },
      { name: 'Landing Pages', modern: false },
      { name: 'Device Preview', modern: false },
      { name: 'Inbox Preview', modern: false },
      { name: 'Attachment Support', modern: false },
    ],
  },
];

const minimalFeatureCount = 7;

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Marketing Director at TechCorp',
    content:
      'Emailly transformed our email marketing strategy. The automation features saved us hours of work each week.',
    rating: 5,
    avatar: 'SJ',
  },
  {
    name: 'Michael Chen',
    role: 'Founder of StartupXYZ',
    content:
      'The analytics provided by Emailly helped us understand our audience better and increase our conversion rates by 40%.',
    rating: 5,
    avatar: 'MC',
  },
  {
    name: 'Emily Rodriguez',
    role: 'E-commerce Manager at ShopWell',
    content:
      "We've tried several email marketing platforms, but Emailly offers the best value for money. The support team is also incredibly helpful.",
    rating: 5,
    avatar: 'ER',
  },
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
  { name: 'LinkedIn', category: 'Social Media' },
];

// -------- Components --------

function PricingHeader() {
  return (
    <header className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex justify-between items-center py-6">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gradient-to-tr from-gray-900 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-semibold flex items-center gap-1">
                <SparklesIcon className="inline h-4 w-4 mr-[2px]" aria-label="Modern feature" />
                E
              </span>
            </div>
            <span className="ml-3 text-xl font-bold text-gray-900 flex items-center gap-1">
              Emailly{' '}
              <TrendingUpIcon className="h-5 w-5 text-blue-500 ml-1" aria-label="Trending" />
            </span>
          </div>
          <nav className="hidden md:flex space-x-8">
            {[
              { text: 'Features', href: '/features' },
              { text: 'Pricing', href: '/pricing', active: true },
              { text: 'Docs', href: '/docs' },
              { text: 'Support', href: '/support' },
            ].map(({ text, href, active }) => (
              <a
                key={href}
                href={href}
                className={
                  active
                    ? 'text-gray-900 font-semibold'
                    : 'text-gray-500 hover:text-gray-900'
                }
              >
                {text}
              </a>
            ))}
          </nav>
          <div className="flex items-center space-x-4">
            <a
              href="/auth/signin"
              className="text-gray-500 hover:text-gray-900 transition-colors"
            >
              Sign In
            </a>
            <a
              href="/auth/signup"
              className="bg-gradient-to-l from-blue-600 to-gray-900 text-white px-4 py-2 rounded-lg font-semibold shadow hover:from-blue-700 hover:to-gray-950 transition"
            >
              Get Started Free
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

function HeroSection({
  billingCycle,
  toggleBilling,
}: {
  billingCycle: 'monthly' | 'yearly';
  toggleBilling: () => void;
}) {
  return (
    <section className="pt-20 pb-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight">
          Pricing that Fits Your Growth 🚀
        </h1>
        <p className="text-lg md:text-xl text-gray-500 mb-10 max-w-2xl mx-auto">
          Start free and scale on your terms. No hidden fees, cancel any time. Choose a plan that grows with you.
        </p>
        <div className="flex items-center justify-center mb-14 gap-5">
          <span
            className={`text-base font-medium ${
              billingCycle === 'monthly' ? 'text-gray-900' : 'text-gray-400'
            }`}
          >
            Monthly
          </span>
          <button
            onClick={toggleBilling}
            className="relative inline-flex h-7 w-14 items-center rounded-full bg-gray-200 shadow-inner transition focus:outline-none ring-2 ring-offset-2 ring-gray-900"
            aria-label="Toggle yearly billing"
          >
            <span
              className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-all ${
                billingCycle === 'yearly'
                  ? 'translate-x-7 bg-blue-600'
                  : 'translate-x-1'
              }`}
            />
          </button>
          <span className="text-base font-medium flex items-center">
            <span className={billingCycle === 'yearly' ? 'text-gray-900' : 'text-gray-400'}>
              Yearly
            </span>
            {billingCycle === 'yearly' && (
              <span className="ml-2 bg-green-100 text-green-700 text-xs font-bold px-2.5 py-1 rounded-full">
                Save up to 20%
              </span>
            )}
          </span>
        </div>
      </div>
    </section>
  );
}

// Fix: Remove 'title' prop from SparklesIcon and TrendingUpIcon, use aria-label instead for accessibility.
function PricingCard({
  plan,
  billingCycle,
  price,
  savings,
}: {
  plan: PricingPlan;
  billingCycle: 'monthly' | 'yearly';
  price: number;
  savings: number;
}) {
  return (
    <div
      key={plan.id}
      className={`relative bg-white rounded-xl shadow border ${
        plan.popular
          ? 'border-blue-600 shadow-lg scale-105 z-10'
          : 'border-gray-200'
      } group transition-transform`}
    >
      {plan.badge && (
        <span className="absolute left-1/2 -top-4 -translate-x-1/2 bg-blue-600 text-white text-xs py-1 px-3 rounded-full font-bold shadow group-hover:scale-105 transition">
          {plan.badge}
        </span>
      )}
      <div className="p-8 pb-6 flex flex-col items-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">{plan.name}</h3>
        <p className="text-gray-500 text-sm mb-6 text-center">{plan.description}</p>
        <div className="flex items-end mb-3 min-h-[56px]">
          <span className="text-4xl font-extrabold text-gray-900">
            {price > 0 ? `$${price}` : 'Free'}
          </span>
          {price > 0 && (
            <span className="ml-2 text-gray-400 text-sm font-medium">/mo</span>
          )}
        </div>
        {billingCycle === 'yearly' && price > 0 && (
          <span className="text-xs text-green-600 bg-green-50 rounded-full px-2 py-0.5 font-medium mb-2">
            Save {savings}% annually
          </span>
        )}
        {price === 0 && (
          <span className="text-xs text-gray-400">Free forever</span>
        )}
        <button
          className={`w-full py-2 my-4 rounded-lg font-semibold transition-all shadow-sm focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
            plan.popular
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : plan.id === 'starter'
              ? 'bg-gray-900 text-white hover:bg-gray-800'
              : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
          }`}
        >
          {plan.cta}
        </button>
        <ul className="w-full mt-2 space-y-3">
          {plan.features.map((feature, idx) => (
            <li key={idx} className="flex items-center gap-2">
              {feature.included ? (
                <CheckIcon className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
              ) : (
                <XIcon className="h-5 w-5 text-gray-300 shrink-0 mt-0.5" />
              )}
              <div className="flex items-center gap-1">
                <span
                  className={
                    feature.included
                      ? 'text-gray-700 font-medium'
                      : 'text-gray-400 font-normal'
                  }
                >
                  {feature.name}
                </span>
                {feature.modern && (
                  <SparklesIcon className="h-4 w-4 text-blue-400" aria-label="Modern" />
                )}
                {feature.highlighted && (
                  <TrendingUpIcon className="h-4 w-4 text-orange-400" aria-label="Most used" />
                )}
              </div>
              {feature.description && (
                <span className="block text-xs text-gray-400 ml-7">
                  {feature.description}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function PricingCardsSection({
  billingCycle,
  getPrice,
  getSavings,
}: {
  billingCycle: 'monthly' | 'yearly';
  getPrice: (plan: PricingPlan) => number;
  getSavings: (plan: PricingPlan) => number;
}) {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pricingPlans.map((plan) => (
            <PricingCard
              key={plan.id}
              plan={plan}
              billingCycle={billingCycle}
              price={getPrice(plan)}
              savings={getSavings(plan)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// Fix: Remove 'title' prop from SparklesIcon and use aria-label for accessibility in the feature table.
function FeatureCompareTab() {
  const [showAll, setShowAll] = useState(false);
  const category = allFeatures[0];
  const showItems = showAll ? category.items : category.items.slice(0, minimalFeatureCount);
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-100 shadow-sm bg-white transition">
      <table className="w-full text-sm text-left text-gray-700">
        <thead>
          <tr className="border-b border-gray-100 bg-gray-50">
            <th className="py-4 pl-4 pr-2 font-semibold text-gray-900 w-56">
              Feature
            </th>
            {pricingPlans.map((plan) => (
              <th
                key={plan.id}
                className="py-4 text-center font-semibold text-gray-900"
              >
                <div>{plan.name}</div>
                <div className="text-xs text-gray-400 mt-0.5">
                  {plan.monthlyPrice === 0 ? 'Free' : `$${plan.monthlyPrice}/mo`}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Email Features section */}
          <tr>
            <td
              colSpan={1 + pricingPlans.length}
              className="py-3 bg-gray-50 text-[13px] pl-4 font-semibold text-gray-700 uppercase tracking-widest border-b"
            >
              {category.category}
            </td>
          </tr>
          {showItems.map((item, itemIdx) => (
            <tr
              key={itemIdx}
              className="border-b border-gray-50 hover:bg-gray-50 transition"
            >
              <td className="py-3 pl-4 text-gray-700 flex items-center gap-2">
                {item.name}
                {item.modern && (
                  <SparklesIcon className="h-4 w-4 text-blue-400" aria-label="Modern" />
                )}
              </td>
              {pricingPlans.map((plan) => (
                <td key={plan.id} className="py-3 text-center">
                  {plan.features.find(f => f.name === item.name && f.included) ? (
                    <CheckIcon className="h-5 w-5 text-blue-500 mx-auto" />
                  ) : (
                    <XIcon className="h-5 w-5 text-gray-200 mx-auto" />
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="w-full flex justify-center mt-4">
        <button
          className="text-blue-600 hover:underline text-sm font-semibold"
          onClick={() => setShowAll(v => !v)}
        >
          {showAll ? 'Show less' : 'Show more'}
        </button>
      </div>
    </div>
  );
}

function IntegrationsTab() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {integrations.map((integration, i) => (
        <div
          key={integration.name}
          className="bg-white border border-gray-100 rounded-xl py-5 px-4 flex flex-col items-center shadow-sm hover:shadow transition"
        >
          <div className="w-12 h-12 bg-gradient-to-tr from-gray-100 to-blue-50 rounded-lg flex items-center justify-center mb-2">
            <span className="text-gray-500 font-bold text-lg">
              {integration.name.slice(0, 2)}
            </span>
          </div>
          <span className="text-sm font-semibold text-gray-900">{integration.name}</span>
          <span className="text-xs text-gray-400 mt-1">{integration.category}</span>
        </div>
      ))}
    </div>
  );
}

function SupportTab() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {pricingPlans.map((plan) => (
        <div
          key={plan.id}
          className="bg-white border border-gray-100 rounded-xl py-7 px-6 flex flex-col gap-4 shadow-sm"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{plan.name}</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <ClockIcon className="h-5 w-5 text-gray-300" />
              <span className="text-sm text-gray-600">
                {plan.id === 'starter'
                  ? '48-hour response'
                  : plan.id === 'pro'
                  ? '24-hour response'
                  : plan.id === 'business'
                  ? '12-hour response'
                  : 'Instant response'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <UsersIcon className="h-5 w-5 text-gray-300" />
              <span className="text-sm text-gray-600">
                {plan.id === 'enterprise' ? 'Dedicated account manager' : 'Community support'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheckIcon className="h-5 w-5 text-gray-300" />
              <span className="text-sm text-gray-600">
                {plan.id === 'enterprise' ? 'Phone & chat support' : 'Email support'}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function FeatureTabs({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}) {
  const tabs = [
    { key: 'features', label: 'Features' },
    { key: 'integrations', label: 'Integrations' },
    { key: 'support', label: 'Support' },
  ];
  return (
    <div className="mb-10 flex justify-center">
      <div className="bg-gray-100 rounded-xl shadow inline-flex p-1 gap-2" role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            className={`px-5 py-2 font-semibold rounded-lg text-sm transition-all ${
              activeTab === tab.key
                ? 'bg-white shadow text-blue-600'
                : 'text-gray-500 hover:text-gray-900'
            }`}
            tabIndex={activeTab === tab.key ? 0 : -1}
            onClick={() => setActiveTab(tab.key)}
            style={{ minWidth: 110 }}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function FeatureComparisonSection({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <section className="pt-16 pb-20 bg-gradient-to-b from-white via-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Compare Features
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            See how our plans stack up against each other and make a good decision for your team.
          </p>
        </div>
        <FeatureTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="transition">
          {activeTab === 'features' && <FeatureCompareTab />}
          {activeTab === 'integrations' && <IntegrationsTab />}
          {activeTab === 'support' && <SupportTab />}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2 tracking-tight">
            Trusted by Businesses Worldwide
          </h2>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">
            See what our customers say about Emailly and how it helps them grow.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow border border-gray-100 p-7 flex flex-col"
            >
              <div className="flex items-center gap-1 mb-3">
                {[...Array(t.rating)].map((_, i) => (
                  <StarIcon
                    key={i}
                    className="h-5 w-5 text-yellow-400 fill-current"
                  />
                ))}
              </div>
              <p className="text-gray-600 mb-7 italic flex-1">{t.content}</p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-3 font-semibold text-gray-800 text-base">
                  {t.avatar}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{t.name}</h4>
                  <span className="text-sm text-gray-500">{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqSection() {
  const faqs = [
    {
      question: 'Can I change plans anytime?',
      answer:
        "Yes, you can upgrade, downgrade, or cancel your plan at any time. Changes take effect immediately, and we'll prorate any differences.",
    },
    {
      question: 'Is there a free trial?',
      answer:
        'All paid plans come with a 14-day free trial. No credit card required to start. You can upgrade to a paid plan at any time during or after the trial.',
    },
    {
      question: 'What payment methods do you accept?',
      answer:
        'We accept all major credit cards, PayPal, and for annual Enterprise plans, we also accept bank transfers and purchase orders.',
    },
    {
      question: 'Do you offer discounts for non-profits?',
      answer:
        'Yes, we offer a 50% discount for registered non-profit organizations. Contact our sales team for verification and to set up your discounted plan.',
    },
    {
      question: 'Can I get a refund?',
      answer:
        "We offer a 30-day money-back guarantee for all annual plans. Monthly plans can be canceled anytime, and you'll continue to have access until the end of your billing period.",
    },
    {
      question: 'How does the email limit work?',
      answer:
        'Your email limit resets at the beginning of each billing cycle. If you reach your limit, you can either upgrade your plan or wait for the next billing cycle to continue sending.',
    },
    {
      question: 'Do you offer custom plans?',
      answer:
        'Yes, we can create custom plans for businesses with specific needs. Contact our sales team to discuss your requirements.',
    },
    {
      question: 'Is my data secure?',
      answer:
        'Absolutely. We use industry-standard encryption and security practices to protect your data. All data is encrypted in transit and at rest, and we comply with GDPR and other privacy regulations.',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2 tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-8">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-gray-50 rounded-xl shadow border border-gray-100 p-6"
            >
              <div className="mb-2 text-base font-semibold text-gray-900">{faq.question}</div>
              <div className="text-gray-600 text-sm">{faq.answer}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-16 bg-gradient-to-b from-gray-900 to-blue-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-8 text-center">
        <h2 className="text-3xl font-extrabold text-white mb-4">
          Ready to get started?
        </h2>
        <p className="text-lg text-gray-200 mb-8">
          Join thousands of teams that use Emailly to grow their audience.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/auth/signup"
            className="bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 shadow transition"
          >
            Start Free Trial
          </a>
          <a
            href="/demo"
            className="border border-gray-400 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 shadow transition"
          >
            Schedule a Demo
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 pt-14 pb-7">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-gradient-to-tr from-gray-900 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-semibold flex items-center gap-1">
                  <SparklesIcon className="inline h-4 w-4 mr-[2px]" aria-label="Modern feature" />
                  E
                </span>
              </div>
              <span className="ml-3 text-xl font-bold text-gray-900 flex items-center gap-1">
                Emailly{' '}
                <TrendingUpIcon className="h-5 w-5 text-blue-500 ml-1" aria-label="Trending" />
              </span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              A modern email marketing platform designed to help you reach, engage, and grow your audience.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Product</h3>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li><a href="/features" className="hover:text-gray-900">Features</a></li>
              <li><a href="/pricing" className="hover:text-gray-900">Pricing</a></li>
              <li><a href="/templates" className="hover:text-gray-900">Templates</a></li>
              <li><a href="/integrations" className="hover:text-gray-900">Integrations</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Resources</h3>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li><a href="/docs" className="hover:text-gray-900">Documentation</a></li>
              <li><a href="/blog" className="hover:text-gray-900">Blog</a></li>
              <li><a href="/guides" className="hover:text-gray-900">Guides</a></li>
              <li><a href="/support" className="hover:text-gray-900">Support</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Company</h3>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li><a href="/about" className="hover:text-gray-900">About</a></li>
              <li><a href="/careers" className="hover:text-gray-900">Careers</a></li>
              <li><a href="/contact" className="hover:text-gray-900">Contact</a></li>
              <li><a href="/privacy" className="hover:text-gray-900">Privacy</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-100 pt-7 text-center text-gray-400 text-sm">
          <p>&copy; 2024 Emailly. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

// -------- Main Page --------

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [activeTab, setActiveTab] = useState('features');

  const toggleBilling = () =>
    setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly');

  const getPrice = (plan: PricingPlan) =>
    billingCycle === 'yearly' ? plan.yearlyPrice : plan.monthlyPrice;

  const getSavings = (plan: PricingPlan) => {
    if (billingCycle === 'yearly' && plan.monthlyPrice > 0) {
      const annualSavings =
        plan.monthlyPrice * 12 - plan.yearlyPrice * 12;
      return Math.round((annualSavings / (plan.monthlyPrice * 12)) * 100);
    }
    return 0;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white antialiased">
      <PricingHeader />
      <HeroSection billingCycle={billingCycle} toggleBilling={toggleBilling} />
      <PricingCardsSection
        billingCycle={billingCycle}
        getPrice={getPrice}
        getSavings={getSavings}
      />
      <FeatureComparisonSection activeTab={activeTab} setActiveTab={setActiveTab} />
      <TestimonialsSection />
      <FaqSection />
      <CTASection />
      <Footer />
    </div>
  );
}