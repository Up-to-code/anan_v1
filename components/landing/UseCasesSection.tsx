 import { useCases } from '@/data/features';

export default function UseCasesSection() {
  return (
    <section id="use-cases" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Perfect for Every Industry</h2>
          <p className="text-xl text-slate-600">See how ChatConnect transforms customer communication across different sectors</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {useCases.map((useCase, index) => {
            const IconComponent = useCase.icon;
            return (
              <div key={index} className="bg-white rounded-xl border border-slate-200 p-6 hover:border-blue-600 transition-all hover:scale-105">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <IconComponent className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{useCase.industry}</h3>
                <p className="text-slate-600 mb-4">{useCase.description}</p>
                <div className="text-sm font-semibold text-blue-600">{useCase.metrics}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}