// components/ui/Dropdown.tsx
import { useState, useRef, useEffect } from 'react';
import { LucideIcon } from 'lucide-react';

interface DropdownItem {
  label: string;
  icon?: LucideIcon;
  onClick: () => void;
  variant?: 'default' | 'danger';
  type?: 'separator';
}

interface DropdownProps {
  trigger: React.ReactNode;
  items: DropdownItem[];
}

export function Dropdown({ trigger, items }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div onClick={() => setIsOpen(!isOpen)}>
        {trigger}
      </div>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {items.map((item, index) => (
              item.type === 'separator' ? (
                <div key={index} className="my-1 border-t border-gray-100" />
              ) : (
                <button
                  key={index}
                  onClick={() => {
                    item.onClick();
                    setIsOpen(false);
                  }}
                  className={`flex items-center w-full px-4 py-2 text-sm ${
                    item.variant === 'danger' 
                      ? 'text-red-700 hover:bg-red-50' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {item.icon && <item.icon size={16} className="mr-3" />}
                  {item.label}
                </button>
              )
            ))}
          </div>
        </div>
      )}
    </div>
  );
}