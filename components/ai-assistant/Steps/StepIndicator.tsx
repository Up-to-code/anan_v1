// components/ai-assistant/Steps/StepIndicator.tsx
import { ArrowLeft, Check } from "lucide-react";
import { STEPS } from "../Types";

interface StepIndicatorProps {
  currentStep: number;
  onBack: () => void;
}

export const StepIndicator = ({ currentStep, onBack }: StepIndicatorProps) => (
  <div className="w-48 p-6">
    <button 
      onClick={onBack}
      disabled={currentStep === 1}
      className="flex items-center gap-2 text-gray-600 hover:text-gray-900 disabled:text-gray-400 disabled:cursor-not-allowed mb-8 text-sm rounded-lg px-3 py-2 hover:bg-gray-100 transition-colors"
    >
      <ArrowLeft className="w-4 h-4" />Back
    </button>
    <div className="space-y-4">
      {STEPS.map(({ step, label }) => (
        <div key={step} className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
            step === currentStep ? 'bg-blue-600 text-white shadow-lg scale-110' : 
            step < currentStep ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-400'
          }`}>
            {step < currentStep ? <Check className="w-4 h-4" /> : <span className="text-sm font-bold">{step}</span>}
          </div>
          <div className={`text-sm font-semibold transition-colors ${
            step === currentStep ? 'text-blue-600' : 
            step < currentStep ? 'text-gray-900' : 'text-gray-400'
          }`}>{label}</div>
        </div>
      ))}
    </div>
  </div>
);