// store/assistantStore.ts
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface PromptAgent {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  prompt: string;
}

export interface Assistant {
  name: string;
  model: string;
  promptAgent: string;
  systemPrompt: string;
  welcomeMessage: string;
  temperature: number;
}

interface AssistantStore {
  // State
  currentStep: number;
  assistant: Assistant;
  isCreating: boolean;
  
  // Prompt agents
  promptAgents: PromptAgent[];
  
  // Actions
  setCurrentStep: (step: number) => void;
  setAssistant: (assistant: Partial<Assistant>) => void;
  setPromptAgent: (agentId: string) => void;
  setIsCreating: (creating: boolean) => void;
  reset: () => void;
}

const initialState: Assistant = {
  name: '',
  model: 'gpt4',
  promptAgent: '',
  systemPrompt: '',
  welcomeMessage: 'Hello! How can I help you today?',
  temperature: 0.7,
};

const promptAgents: PromptAgent[] = [
  {
    id: 'health',
    name: 'Health Support',
    description: 'Medical and health-related assistance',
    icon: '🏥',
    category: 'Health',
    prompt: 'You are a compassionate health support assistant. Provide general health information, always recommend consulting healthcare professionals for specific medical advice, and maintain a caring, professional tone.'
  },
  {
    id: 'tech',
    name: 'Tech Support',
    description: 'Technical troubleshooting and IT help',
    icon: '💻',
    category: 'Technology',
    prompt: 'You are a knowledgeable tech support specialist. Provide clear, step-by-step technical solutions, use simple language, and guide users through troubleshooting processes patiently.'
  },
  {
    id: 'finance',
    name: 'Financial Advisor',
    description: 'Banking and financial guidance',
    icon: '💰',
    category: 'Finance',
    prompt: 'You are a helpful financial advisor. Provide general financial guidance, explain complex concepts simply, and always recommend consulting professional financial advisors for specific decisions.'
  },
  {
    id: 'education',
    name: 'Education Coach',
    description: 'Learning and educational support',
    icon: '📚',
    category: 'Education',
    prompt: 'You are a patient education coach. Explain concepts clearly, use examples, encourage questions, and adapt your teaching style to different learning needs.'
  },
  {
    id: 'wellness',
    name: 'Mental Wellness',
    description: 'Mental health and wellness support',
    icon: '🧘',
    category: 'Wellness',
    prompt: 'You are a supportive mental wellness coach. Provide empathetic listening, share general wellness strategies, and always recommend professional mental health support for serious concerns.'
  },
  {
    id: 'travel',
    name: 'Travel Assistant',
    description: 'Travel planning and assistance',
    icon: '✈️',
    category: 'Travel',
    prompt: 'You are an efficient travel assistant. Help with travel planning, provide destination information, suggest itineraries, and offer practical travel tips.'
  }
];

export const useAssistantStore = create<AssistantStore>()(
  devtools(
    (set, get) => ({
      // Initial state
      currentStep: 1,
      assistant: initialState,
      isCreating: false,
      promptAgents,
      
      // Actions
      setCurrentStep: (step) => set({ currentStep: step }),
      
      setAssistant: (updates) => 
        set((state) => ({ 
          assistant: { ...state.assistant, ...updates } 
        })),
      
      setPromptAgent: (agentId) => {
        const agent = promptAgents.find(a => a.id === agentId);
        if (agent) {
          set((state) => ({
            assistant: {
              ...state.assistant,
              promptAgent: agentId,
              systemPrompt: agent.prompt
            }
          }));
        }
      },
      
      setIsCreating: (creating) => set({ isCreating: creating }),
      
      reset: () => set({
        currentStep: 1,
        assistant: initialState,
        isCreating: false
      })
    }),
    { name: 'assistant-store' }
  )
);