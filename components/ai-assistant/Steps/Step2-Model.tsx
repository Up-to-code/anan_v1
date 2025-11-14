// components/ai-assistant/Steps/Step2-Model.tsx
import { useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { StepProps } from "../Types";
import { StepHeader } from "../Shared/StepHeader";
import { Button } from "../Shared/Button";
import { AI_MODELS } from "../Constants";

export const Step2Model = ({ data, onChange, onNext }: StepProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const selected = AI_MODELS.find(m => m.id === data.modelId);

  return (
    <div className="flex flex-col">
      <StepHeader 
        title="AI Brain" 
        description="Choose the intelligence model that will power your assistant" 
      />
      <div className="mb-8">
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full px-4 py-4 text-lg border-2 border-gray-300 rounded-xl text-left flex items-center justify-between hover:border-gray-400 transition-colors bg-white"
          >
            <div className="flex items-center gap-4">
              <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                {selected?.icon}
              </div>
              <div>
                <div className="font-semibold text-gray-900">{selected?.name}</div>
                <div className="text-sm text-gray-500">Advanced AI model</div>
              </div>
            </div>
            <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </button>
          {isOpen && (
            <div className="absolute z-10 w-full mt-2 border-2 border-gray-300 rounded-xl bg-white shadow-xl">
              {AI_MODELS.map((model) => (
                <button
                  key={model.id}
                  onClick={() => { onChange({ modelId: model.id }); setIsOpen(false); }}
                  className={`w-full px-4 py-4 text-left hover:bg-gray-50 flex items-center gap-4 transition-colors border-b border-gray-100 last:border-b-0 ${
                    data.modelId === model.id ? 'bg-blue-50 text-blue-600' : ''
                  }`}
                >
                  <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                    {model.icon}
                  </div>
                  <div>
                    <div className="font-semibold">{model.name}</div>
                    <div className="text-sm text-gray-500">Advanced AI model</div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      <Button onClick={onNext}>
        Continue <ArrowRight className="w-5 h-5" />
      </Button>
    </div>
  );
};