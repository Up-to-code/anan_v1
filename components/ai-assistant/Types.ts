// components/ai-assistant/Types.ts
import { ReactNode } from 'react';

export interface Item {
  id: string;
  name: string;
  icon: ReactNode;
  description?: string;
  prompt?: string;
  category?: string;
}

export interface FormData {
  name: string;
  modelId: string;
  prompt: string;
  capabilities: string[];
}

export interface StepProps {
  data: FormData;
  onChange: (updates: Partial<FormData>) => void;
  onNext: () => void;
  onCreate?: () => void;
  loading?: boolean;
}

export const STEPS = [
  { step: 1, label: "Name" },
  { step: 2, label: "Model" },
  { step: 3, label: "Tools" },
  { step: 4, label: "Behavior" }
] as const;