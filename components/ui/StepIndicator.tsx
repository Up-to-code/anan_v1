// components/ui/StepIndicator.tsx
import { LucideIcon, CheckCircle } from 'lucide-react';

interface Step {
  number: number;
  title: string;
  description: string;
  icon: LucideIcon;
  status: 'completed' | 'current' | 'upcoming';
}

interface StepIndicatorProps {
  steps: Step[];
  title?: string;
  vertical?: boolean;
  className?: string;
}

export function StepIndicator({ 
  steps, 
  title = "Setup Steps", 
  vertical = true,
  className = '' 
}: StepIndicatorProps) {
  if (vertical) {
    return (
      <div className={`bg-white border border-gray-200 rounded-lg p-6 ${className}`}>
        <h2 className="text-lg font-semibold text-gray-900 mb-6">{title}</h2>
        
        <div className="space-y-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.number} className="flex items-start space-x-4 relative">
                {/* Step Number */}
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step.status === 'completed' 
                    ? 'bg-green-500 text-white'
                    : step.status === 'current'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-500'
                }`}>
                  {step.status === 'completed' ? (
                    <CheckCircle size={16} />
                  ) : (
                    step.number
                  )}
                </div>

                {/* Step Content */}
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium ${
                    step.status === 'completed' 
                      ? 'text-green-700'
                      : step.status === 'current'
                      ? 'text-blue-700'
                      : 'text-gray-500'
                  }`}>
                    {step.title}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    {step.description}
                  </p>
                </div>

                {/* Connecting Line */}
                {index < steps.length - 1 && (
                  <div className={`absolute left-4 top-8 w-0.5 h-10 ${
                    step.status === 'completed' ? 'bg-green-500' : 'bg-gray-200'
                  }`} style={{ marginTop: '2rem' }} />
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Horizontal Layout
  return (
    <div className={`bg-white border border-gray-200 rounded-lg p-6 ${className}`}>
      <h2 className="text-lg font-semibold text-gray-900 mb-6">{title}</h2>
      
      <nav aria-label="Progress">
        <ol className="flex items-center">
          {steps.map((step, stepIdx) => (
            <li key={step.number} className={`relative ${stepIdx !== steps.length - 1 ? 'pr-8 sm:pr-20' : ''} flex-1`}>
              <div className="flex items-center">
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step.status === 'completed' 
                    ? 'bg-green-500 text-white'
                    : step.status === 'current'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-500'
                }`}>
                  {step.status === 'completed' ? (
                    <CheckCircle size={16} />
                  ) : (
                    step.number
                  )}
                </div>
                
                <div className="ml-4 min-w-0">
                  <p className={`text-sm font-medium ${
                    step.status === 'completed' 
                      ? 'text-green-700'
                      : step.status === 'current'
                      ? 'text-blue-700'
                      : 'text-gray-500'
                  }`}>
                    {step.title}
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    {step.description}
                  </p>
                </div>
              </div>

              {stepIdx !== steps.length - 1 && (
                <div className="absolute top-4 left-8 -ml-px mt-0.5 h-0.5 w-full bg-gray-200" aria-hidden="true" />
              )}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
}