// components/ai-assistant/Shared/CapabilityCard.tsx
import { Check } from "lucide-react";
import { Item } from "../Types";

interface CapabilityCardProps {
  item: Item;
  selected: boolean;
  onToggle: (id: string) => void;
}

export const CapabilityCard = ({ item, selected, onToggle }: CapabilityCardProps) => (
  <button
    onClick={() => onToggle(item.id)}
    className={`p-5 border-2 rounded-xl text-left transition-all duration-200 group ${
      selected 
        ? 'border-blue-500 bg-blue-50 shadow-md scale-[1.02]' 
        : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-lg hover:scale-[1.01]'
    }`}
  >
    <div className="flex items-start gap-4">
      <div className={`p-3 rounded-xl transition-colors ${
        selected 
          ? 'bg-blue-100 text-blue-600 shadow-sm' 
          : 'bg-gray-100 text-gray-600 group-hover:bg-blue-50 group-hover:text-blue-500'
      }`}>
        {item.icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3 mb-2">
          <span className={`font-bold text-lg ${
            selected ? 'text-blue-900' : 'text-gray-900'
          }`}>
            {item.name}
          </span>
          {selected && (
            <div className="flex items-center gap-1 bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
              <Check className="w-3 h-3" />
              <span className="text-xs font-medium">Active</span>
            </div>
          )}
        </div>
        <p className={`text-sm leading-relaxed ${
          selected ? 'text-blue-700' : 'text-gray-600'
        }`}>
          {item.description}
        </p>
      </div>
    </div>
  </button>
);