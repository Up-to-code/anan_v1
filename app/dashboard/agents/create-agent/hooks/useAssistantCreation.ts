// hooks/useAssistantCreation.ts
import { useCallback } from 'react';
import { useAssistantStore } from '../store/useAssistantStore';

export const useAssistantCreation = () => {
  const {
    assistant,
    currentStep,
    isCreating,
    setCurrentStep,
    setAssistant,
    setPromptAgent,
    setIsCreating,
    reset
  } = useAssistantStore();

  const handleNext = useCallback(() => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  }, [currentStep, setCurrentStep]);

  const handleBack = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  }, [currentStep, setCurrentStep]);

  const handleCreate = useCallback(async () => {
    setIsCreating(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('Creating assistant:', assistant);
    alert(`Assistant "${assistant.name}" created successfully!`);
    
    setIsCreating(false);
    reset();
  }, [assistant, setIsCreating, reset]);

  const canProceed = useCallback(() => {
    switch (currentStep) {
      case 1:
        return assistant.name.trim().length > 0;
      case 2:
        return assistant.model.trim().length > 0;
      case 3:
        return assistant.promptAgent.trim().length > 0 && 
               assistant.systemPrompt.trim().length > 0;
      default:
        return false;
    }
  }, [currentStep, assistant]);

  const handleEnterKey = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (canProceed() && currentStep < 3) {
        handleNext();
      } else if (currentStep === 3 && canProceed()) {
        handleCreate();
      }
    }
  }, [canProceed, currentStep, handleNext, handleCreate]);

  return {
    // State
    assistant,
    currentStep,
    isCreating,
    
    // Actions
    handleNext,
    handleBack,
    handleCreate,
    handleEnterKey,
    setAssistant,
    setPromptAgent,
    
    // Computed
    canProceed
  };
};