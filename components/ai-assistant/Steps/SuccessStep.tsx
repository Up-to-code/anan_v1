// components/ai-assistant/Steps/SuccessStep.tsx
import { CheckCircle, Sparkles } from "lucide-react";
import { Button } from "../Shared/Button";

interface SuccessStepProps {
  name: string;
  onReset: () => void;
}

export const SuccessStep = ({ name, onReset }: SuccessStepProps) => (
  <div className="flex flex-col items-center justify-center text-center py-12">
    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
      <CheckCircle className="w-10 h-10 text-green-500" />
    </div>
    <h1 className="text-4xl font-bold text-gray-900 mb-4">Success!</h1>
    <p className="text-xl text-gray-600 mb-3">
      <strong className="text-gray-900">&quot;{name}&quot;</strong> is now active and ready to serve customers
    </p>
    <p className="text-gray-500 text-lg mb-8 max-w-md">
      Your AI assistant has been deployed with all selected tools and is ready for action
    </p>
    <div className="w-full max-w-sm">
      <Button onClick={onReset}>
        <Sparkles className="w-5 h-5" />Create Another Assistant
      </Button>
    </div>
  </div>
);