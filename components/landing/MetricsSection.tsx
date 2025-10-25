import React from 'react';

export default function MetricsSection() {
  const metrics = [
    { value: "50,000+", label: "Active Businesses" },
    { value: "10M+", label: "Messages Sent Daily" },
    { value: "98%", label: "Customer Satisfaction" },
    { value: "45%", label: "Increase in Sales" }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Trusted by thousands of businesses</h2>
          <p className="text-xl text-slate-600">Join the companies achieving exceptional results</p>
        </div>
        <div className="grid md:grid-cols-4 gap-8">
          {metrics.map((metric, index) => (
            <div key={index} className="text-center">
              <div className="text-5xl font-bold text-blue-600 mb-2">{metric.value}</div>
              <div className="text-slate-600 text-lg">{metric.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}