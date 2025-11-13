import { ArrowRight, ChevronDown } from "lucide-react";
import { FormData, AIModel } from "./page";

interface Step2Props {
  formData: FormData;
  isModelOpen: boolean;
  setIsModelOpen: (isOpen: boolean) => void;
  handleModelChange: (modelId: string) => void;
  handleNext: () => void;
  canProceed: () => boolean;
  AI_MODELS: AIModel[];
}

const Step2 = ({ 
  formData, 
  isModelOpen, 
  setIsModelOpen, 
  handleModelChange, 
  handleNext, 
  canProceed,
  AI_MODELS 
}: Step2Props) => {
  return (
    <div className="flex flex-col flex-1">
      <div className="mb-8">
        <h1 className="text-3xl font-light text-slate-900 mb-2">AI model</h1>
        <p className="text-slate-500">Select the AI brain for your assistant</p>
      </div>
      
      <div className="flex-1">
        <div className="relative">
          <button
            onClick={() => setIsModelOpen(!isModelOpen)}
            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-left flex items-center justify-between hover:border-slate-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <span className="text-slate-900">
              {AI_MODELS.find(m => m.id === formData.modelId)?.name}
            </span>
            <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isModelOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {isModelOpen && (
            <div className="absolute z-10 w-full mt-2 bg-white border border-slate-200 rounded-lg shadow-lg overflow-hidden">
              {AI_MODELS.map((model) => (
                <button
                  key={model.id}
                  onClick={() => handleModelChange(model.id)}
                  className={`w-full px-4 py-3 text-left hover:bg-slate-50 transition-colors ${
                    formData.modelId === model.id ? 'bg-blue-50 text-blue-600' : 'text-slate-900'
                  }`}
                >
                  {model.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Button 50px below content */}
      <div className="mt-[50px]">
        <button
          onClick={handleNext}
          disabled={!canProceed()}
          className="w-full py-3.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed transition-colors font-medium flex items-center justify-center gap-2"
        >
          Continue
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Step2;