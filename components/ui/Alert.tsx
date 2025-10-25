import React from 'react';
import { cn } from '@/lib/utils';
import { AlertCircle, CheckCircle, Info, XCircle, X } from 'lucide-react';

interface AlertProps {
  children: React.ReactNode;
  variant?: 'success' | 'error' | 'warning' | 'info';
  className?: string;
  dismissible?: boolean;
  onDismiss?: () => void;
}

export function Alert({
  children,
  variant = 'info',
  className,
  dismissible = false,
  onDismiss
}: AlertProps) {
  const variantStyles = {
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800'
  };

  const icons = {
    success: CheckCircle,
    error: XCircle,
    warning: AlertCircle,
    info: Info
  };

  const IconComponent = icons[variant];

  return (
    <div
      className={cn(
        'rounded-lg border p-4 relative',
        variantStyles[variant],
        className
      )}
      role="alert"
    >
      <div className="flex items-start">
        <IconComponent className="h-5 w-5 flex-shrink-0 mt-0.5 mr-3" />
        <div className="flex-1">{children}</div>
        {dismissible && (
          <button
            onClick={onDismiss}
            className="ml-4 flex-shrink-0 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}

interface AlertTitleProps {
  children: React.ReactNode;
  className?: string;
}

export function AlertTitle({ children, className }: AlertTitleProps) {
  return (
    <h4 className={cn('font-semibold mb-1', className)}>
      {children}
    </h4>
  );
}

interface AlertDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

export function AlertDescription({ children, className }: AlertDescriptionProps) {
  return (
    <div className={cn('text-sm', className)}>
      {children}
    </div>
  );
}