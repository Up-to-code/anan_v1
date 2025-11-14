// store/assistant-store.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { FormData } from '../components/ai-assistant/Types';

interface AssistantState {
  formData: FormData;
  currentStep: number;
  isModelOpen: boolean;
  loading: boolean;
  error: string | null;
  success: boolean;
  
  // Actions
  setFormData: (updates: Partial<FormData>) => void;
  setCurrentStep: (step: number) => void;
  setIsModelOpen: (isOpen: boolean) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setSuccess: (success: boolean) => void;
  
  // Step Actions
  nextStep: () => void;
  prevStep: () => void;
  resetForm: () => void;
  
  // API Call
  createAssistant: () => Promise<void>;
}

export const useAssistantStore = create<AssistantState>()(
  persist(
    (set, get) => ({
      formData: {
        name: "",
        modelId: "gpt4",
        prompt: "",
        capabilities: [
          "booking-call", 
          "crm-access", 
          "contact-save", 
          "order-create",
          "email",
          "whatsapp"
        ],
      },
      currentStep: 1,
      isModelOpen: false,
      loading: false,
      error: null,
      success: false,

      setFormData: (updates) => set((state) => ({ 
        formData: { ...state.formData, ...updates } 
      })),

      setCurrentStep: (step) => set({ currentStep: step }),
      setIsModelOpen: (isOpen) => set({ isModelOpen: isOpen }),
      setLoading: (loading) => set({ loading }),
      setError: (error) => set({ error }),
      setSuccess: (success) => set({ success }),

      nextStep: () => set((state) => ({ 
        currentStep: Math.min(state.currentStep + 1, 4) 
      })),
      
      prevStep: () => set((state) => ({ 
        currentStep: Math.max(state.currentStep - 1, 1) 
      })),

      resetForm: () => set({
        formData: {
          name: "",
          modelId: "gpt4",
          prompt: "",
          capabilities: [
            "booking-call", 
            "crm-access", 
            "contact-save", 
            "order-create",
            "email",
            "whatsapp"
          ],
        },
        currentStep: 1,
        loading: false,
        error: null,
        success: false,
      }),

      createAssistant: async () => {
        const { formData, setLoading, setError, setSuccess } = get();
        
        setLoading(true);
        setError(null);
        
        try {
          const response = await fetch('/api/assistants', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              ...formData,
              createdAt: new Date().toISOString(),
              status: 'active'
            }),
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to create assistant');
          }

          const result = await response.json();
          setSuccess(true);
          setLoading(false);
          
        } catch (error) {
          setError(error instanceof Error ? error.message : 'Creation failed');
          setLoading(false);
        }
      },
    }),
    {
      name: 'assistant-storage',
      partialize: (state) => ({ 
        formData: state.formData,
        currentStep: state.currentStep 
      }),
    }
  )
);