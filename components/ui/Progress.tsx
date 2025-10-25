// components/ui/Progress.tsx
interface ProgressProps {
    value: number;
    max?: number;
  }
  
  export function Progress({ value, max = 100 }: ProgressProps) {
    const percentage = Math.min((value / max) * 100, 100);
  
    return (
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
    );
  }