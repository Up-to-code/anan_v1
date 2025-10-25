"use client";
import React from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

interface SelectItemProps {
  children: React.ReactNode;
  value: string;
  onSelect?: (value: string) => void;
  isSelected?: boolean;
}

export function SelectItem({
  children,
  value,
  onSelect,
  isSelected
}: SelectItemProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect?.(value)}
      className={cn(
        'w-full rounded-md px-3 py-2 text-left text-sm transition-colors',
        isSelected
          ? 'bg-blue-50 text-blue-900'
          : 'hover:bg-slate-100 text-slate-900'
      )}
    >
      {children}
    </button>
  );
}

interface SelectProps {
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
  className?: string;
  placeholder?: string;
}

export function Select({
  value,
  onValueChange,
  children,
  className,
  placeholder = "Select an option"
}: SelectProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(value);

  const childArray = React.Children.toArray(children) as React.ReactElement<SelectItemProps>[];
  const selectedChild = childArray.find(
    (child) => React.isValidElement(child) && child.props.value === selectedValue
  );

  const handleSelect = (val: string) => {
    setSelectedValue(val);
    onValueChange?.(val);
    setIsOpen(false);
  };

  React.useEffect(() => {
    if (value !== undefined) {
      setSelectedValue(value);
    }
  }, [value]);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex w-full items-center justify-between rounded-lg border border-slate-300 bg-white px-3 py-2 text-left text-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20',
          className
        )}
      >
        <span className={cn(!selectedValue && 'text-slate-400')}>
          {selectedChild && React.isValidElement(selectedChild)
            ? selectedChild.props.children
            : placeholder}
        </span>
        <ChevronDown
          className={cn(
            'h-4 w-4 text-slate-400 transition-transform',
            isOpen && 'rotate-180'
          )}
        />
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full rounded-lg border border-slate-200 bg-white shadow-lg">
          <div className="max-h-60 overflow-auto p-1">
            {childArray.map((child) =>
              React.isValidElement(child)
                ? React.cloneElement(child, {
                    onSelect: handleSelect,
                    isSelected: child.props.value === selectedValue
                  })
                : child
            )}
          </div>
        </div>
      )}
    </div>
  );
}