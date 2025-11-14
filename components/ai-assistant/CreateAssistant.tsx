// components/ai-assistant/CreateAssistant.tsx
'use client';
import { useAssistantStore } from "../../store/assistant-store";
import { Step1Name } from "./Steps/Step1-Name";
import { Step2Model } from "./Steps/Step2-Model";
import { Step3Tools } from "./Steps/Step3-Tools";
import { Step4Behavior } from "./Steps/Step4-Behavior";
import { SuccessStep } from "./Steps/SuccessStep";
import { StepIndicator } from "./Steps/StepIndicator";

export function CreateAssistant() {
  const { 
    currentStep, 
    formData, 
    loading, 
    success, 
    error,
    setFormData, 
    nextStep, 
    prevStep, 
    createAssistant,
    resetForm 
  } = useAssistantStore();

  const handleCreate = async () => {
    await createAssistant();
  };

  const renderStep = () => {
    if (success) return <SuccessStep name={formData.name} onReset={resetForm} />;
    
    if (error) {
      return (
        <div className="flex flex-col items-center justify-center text-center py-8">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <div className="w-8 h-8 bg-red-500 rounded-full"></div>
          </div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">Creation Failed</h1>
          <p className="text-gray-600 mb-6 max-w-md">{error}</p>
          <div className="w-full max-w-xs">
            <button
              onClick={handleCreate}
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }

    const stepProps = { 
      data: formData, 
      onChange: setFormData, 
      onNext: nextStep,
      onCreate: handleCreate,
      loading 
    };

    switch (currentStep) {
      case 1: return <Step1Name {...stepProps} />;
      case 2: return <Step2Model {...stepProps} />;
      case 3: return <Step3Tools {...stepProps} />;
      case 4: return <Step4Behavior {...stepProps} />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-white flex">
      <div className="max-w-6xl w-full mx-auto px-6 py-8 flex">
        {!success && !error && <StepIndicator currentStep={currentStep} onBack={prevStep} />}
        <div className={success || error ? 'w-full' : 'pl-8 flex-1'}>
          {renderStep()}
        </div>
      </div>
    </div>
  );
}

// Export with common names for reuse
export { CreateAssistant as AICreator };
export { CreateAssistant as AssistantBuilder };
export { CreateAssistant as AIAssistantCreator };
export { CreateAssistant as CreateAIAssistant };
export { CreateAssistant as AssistantCreator };