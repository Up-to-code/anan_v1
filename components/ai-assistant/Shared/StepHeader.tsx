// components/ai-assistant/Shared/StepHeader.tsx
interface StepHeaderProps {
    title: string;
    description: string;
  }
  
  export const StepHeader = ({ title, description }: StepHeaderProps) => (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-3">{title}</h1>
      <p className="text-lg text-gray-600">{description}</p>
    </div>
  );