"use client";
import React, { ReactNode, isValidElement, cloneElement } from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

interface AccordionProps {
  children: ReactNode;
  type?: 'single' | 'multiple';
  className?: string;
}

export function Accordion({ children, type = 'single', className }: AccordionProps) {
  return (
    <div className={cn('w-full', className)}>
      {React.Children.map(children, (child) =>
        isValidElement(child)
          ? cloneElement(child, { type } as Partial<AccordionProps>)
          : child
      )}
    </div>
  );
}

interface AccordionItemProps {
  children: ReactNode;
  value: string;
  className?: string;
}

export function AccordionItem({ children, value, className }: AccordionItemProps) {
  return (
    <div className={cn('border-b border-slate-200', className)}>
      {React.Children.map(children, (child) =>
        isValidElement(child)
          ? cloneElement(child, { value } as Partial<AccordionItemProps>)
          : child
      )}
    </div>
  );
}

interface AccordionTriggerProps {
  children: ReactNode;
  value?: string;
  type?: 'single' | 'multiple';
  openValue?: string | string[];
  onToggle?: (value: string) => void;
  className?: string;
}

export function AccordionTrigger({
  children,
  value,
  type,
  openValue,
  onToggle,
  className
}: AccordionTriggerProps) {
  const isOpen = type === 'single' 
    ? openValue === value 
    : Array.isArray(openValue) && value ? openValue.includes(value) : false;

  return (
    <button
      onClick={() => value && onToggle?.(value)}
      className={cn(
        'flex w-full items-center justify-between py-4 text-left font-medium transition-all hover:text-slate-900',
        className
      )}
      type="button"
    >
      {children}
      <ChevronDown
        className={cn(
          'h-5 w-5 shrink-0 text-slate-500 transition-transform duration-200',
          isOpen && 'rotate-180'
        )}
      />
    </button>
  );
}

interface AccordionContentProps {
  children: ReactNode;
  value?: string;
  type?: 'single' | 'multiple';
  openValue?: string | string[];
  className?: string;
}

export function AccordionContent({
  children,
  value,
  type,
  openValue,
  className
}: AccordionContentProps) {
  const isOpen = type === 'single' 
    ? openValue === value 
    : Array.isArray(openValue) && value ? openValue.includes(value) : false;

  if (!isOpen) return null;

  return (
    <div className={cn('pb-4 text-slate-600', className)}>
      {children}
    </div>
  );
}