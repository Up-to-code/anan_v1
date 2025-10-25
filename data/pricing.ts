export const pricingPlans = [
    {
      name: "Basic",
      price: { monthly: '29', annual: '23' },
      features: [
        "Up to 1,000 conversations/month",
        "3 team members",
        "WhatsApp & Web Chat",
        "Email support"
      ],
      highlighted: false
    },
    {
      name: "Pro",
      price: { monthly: '99', annual: '79' },
      features: [
        "Up to 10,000 conversations/month",
        "10 team members",
        "All platforms included",
        "Advanced analytics & reports",
        "Priority support",
        "API access",
        "Custom branding"
      ],
      highlighted: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      features: [
        "Unlimited conversations",
        "Unlimited team members",
        "Custom integrations",
        "Dedicated account manager",
        "SLA guarantees",
        "On-premise deployment option"
      ],
      highlighted: false
    }
  ];
  
  export const comparisonData = [
    ["Unified Inbox", true, false, true],
    ["AI Responses", true, false, false],
    ["Multi-Platform", true, true, false],
    ["Custom Branding", true, false, true],
    ["API Access", true, true, true],
    ["24/7 Support", true, false, true]
  ];