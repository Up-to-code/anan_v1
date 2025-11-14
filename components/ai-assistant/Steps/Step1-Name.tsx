// components/ai-assistant/Steps/Step1-Name.tsx
import { ArrowRight } from "lucide-react";
import type { StepProps } from "../Types";
import { StepHeader } from "../Shared/StepHeader";
import {Button} from "../Shared/Button";

export const Step1Name = ({ data, onChange, onNext }: StepProps) => {
  const canProceed = data.name.trim().length > 0;

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && canProceed) onNext();
  };

  return (
    <div className="flex flex-col">
      <StepHeader 
        title="Assistant Identity" 
        description="Give your AI assistant a name that reflects its purpose and personality" 
      />
      <div className="mb-8">
        <input
          type="text"
          value={data.name}
          onChange={(e) => onChange({ name: e.target.value })}
          onKeyPress={handleKeyPress}
          placeholder="e.g., Sales Pro, Support Hero, Booking Master..."
          className="w-full px-4 py-4 text-lg border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
          autoFocus
        />
      </div>
      <Button onClick={onNext} disabled={!canProceed}>
        Continue <ArrowRight className="w-5 h-5" />
      </Button>
    </div>
  );
};