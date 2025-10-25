"use client";
import React from 'react';
import { cn } from '@/lib/utils';
import { Copy, Check } from 'lucide-react';
import { useToast } from './Toast';

interface CopyableTextProps {
  text: string;
  className?: string;
  showIcon?: boolean;
}

export function CopyableText({ text, className, showIcon = true }: CopyableTextProps) {
  const [copied, setCopied] = React.useState(false);
  const { addToast } = useToast();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      addToast({
        title: 'Copied to clipboard',
        variant: 'success',
        duration: 2000
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      addToast({
        title: 'Failed to copy',
        variant: 'error',
        duration: 2000
      });
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={cn(
        'inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 transition-colors font-mono text-sm',
        className
      )}
    >
      <span>{text}</span>
      {showIcon && (
        copied ? (
          <Check className="w-4 h-4 text-green-600" />
        ) : (
          <Copy className="w-4 h-4 text-slate-400" />
        )
      )}
    </button>
  );
}