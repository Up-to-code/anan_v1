// components/ai-assistant/Steps/Step3-Tools.tsx
import { ArrowRight, Check } from "lucide-react";
import { StepProps } from "../Types";
import { StepHeader } from "../Shared/StepHeader";
import { Button } from "../Shared/Button";
import { CapabilityCard } from "../Shared/CapabilityCard";
import { CAPABILITIES } from "../Constants";

export const Step3Tools = ({ data, onChange, onNext }: StepProps) => {
  const toggleCapability = (id: string) => {
    onChange({
      capabilities: data.capabilities.includes(id)
        ? data.capabilities.filter(i => i !== id)
        : [...data.capabilities, id]
    });
  };

  const toggleAllCapabilities = () => {
    onChange({
      capabilities: data.capabilities.length === CAPABILITIES.length 
        ? [] 
        : CAPABILITIES.map(c => c.id)
    });
  };

  const categories = [...new Set(CAPABILITIES.map(cap => cap.category))];
  
  const getCapabilitiesByCategory = (category: string) => {
    return CAPABILITIES.filter(cap => cap.category === category);
  };

  return (
    <div className="flex flex-col">
      <StepHeader 
        title="Tools & Capabilities" 
        description="Select the tools and permissions your assistant will have access to" 
      />
      
      <div className="mb-8 space-y-8">
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
          <span className="text-lg font-semibold text-gray-900">Select all tools</span>
          <button
            onClick={toggleAllCapabilities}
            className={`w-12 h-6 rounded-full transition-colors relative ${
              data.capabilities.length === CAPABILITIES.length ? 'bg-blue-600' : 'bg-gray-300'
            }`}
          >
            <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
              data.capabilities.length === CAPABILITIES.length ? 'translate-x-6' : ''
            }`} />
          </button>
        </div>

        {categories.map((category) => (
          <div key={category} className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-2 h-6 bg-blue-500 rounded-full"></div>
              <h3 className="text-xl font-bold text-gray-900">{category}</h3>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {getCapabilitiesByCategory(category ?? '').map((item) => (
                <CapabilityCard 
                  key={item.id}
                  item={item}
                  selected={data.capabilities.includes(item.id)}
                  onToggle={toggleCapability}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 rounded-xl p-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
            <Check className="w-4 h-4 text-blue-600" />
          </div>
          <div>
            <div className="font-semibold text-blue-900">{data.capabilities.length} tools selected</div>
            <div className="text-sm text-blue-700">Your assistant will have access to these capabilities</div>
          </div>
        </div>
      </div>

      <Button onClick={onNext} disabled={data.capabilities.length === 0}>
        Continue <ArrowRight className="w-5 h-5" />
      </Button>
    </div>
  );
};