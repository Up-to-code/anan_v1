// StepIndicator.tsx
import { useAssistantCreation } from './hooks/useAssistantCreation';
import { ArrowLeft, Check } from 'lucide-react';

const StepIndicator = () => {
  const { currentStep, handleBack } = useAssistantCreation();
  
  const steps = [
    { step: 1, label: "Name", desc: "Assistant name" },
    { step: 2, label: "Model", desc: "AI brain" },
    { step: 3, label: "Behavior", desc: "Customize responses" }
  ];

  return (
    <div className="w-64 bg-slate-50 p-6 border-r border-slate-200">
      <button 
        onClick={handleBack}
        className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-8 text-sm"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      <div className="space-y-4">
        {steps.map((item) => (
          <div key={item.step} className="flex items-start gap-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
              item.step < currentStep ? 'bg-blue-600' : 
              item.step === currentStep ? 'bg-blue-600 ring-4 ring-blue-100' : 
              'bg-slate-200'
            }`}>
              {item.step < currentStep ? (
                <Check className="w-4 h-4 text-white" />
              ) : (
                <span className={`text-sm font-medium ${
                  item.step === currentStep ? 'text-white' : 'text-slate-400'
                }`}>
                  {item.step}
                </span>
              )}
            </div>
            
            <div>
              <div className={`text-sm font-medium ${
                item.step === currentStep ? 'text-blue-600' : 
                item.step < currentStep ? 'text-slate-900' : 'text-slate-400'
              }`}>
                {item.label}
              </div>
              <div className="text-xs text-slate-500">
                {item.desc}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepIndicator;