 
export default function TrustedBySection() {
  const companies = ['TechCorp', 'GrowthLabs', 'StartupXYZ', 'InnovateCo', 'ScaleFast', 'NextGen'];

  return (
    <section className="py-16 bg-white border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-slate-600 font-medium mb-8">Trusted by 10,000+ companies worldwide</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 items-center opacity-60">
          {companies.map((company, index) => (
            <div key={index} className="flex items-center justify-center p-4">
              <div className="w-32 h-8 bg-slate-200 rounded flex items-center justify-center">
                <span className="text-slate-600 font-medium text-sm">{company}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}