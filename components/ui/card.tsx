// components/ui/Card.tsx
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
  onClick?: () => void;
}

export function Card({ 
  children, 
  className = '',
  padding = 'md',
  hover = false,
  onClick
}: CardProps) {
  const paddingStyles = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };

  const hoverStyle = hover ? 'hover:shadow-md hover:border-gray-300 cursor-pointer transition-all duration-200' : '';

  return (
    <div 
      onClick={onClick}
      className={`
        bg-white border border-gray-200 rounded-lg
        ${paddingStyles[padding]}
        ${hoverStyle}
        ${className}
      `}
    >
      {children}
    </div>
  );
}

// Card Sub-components
interface CardSubComponentProps {
  children: React.ReactNode;
  className?: string;
}

function CardHeader({ children, className = '' }: CardSubComponentProps) {
  return (
    <div className={`border-b border-gray-200 pb-4 mb-4 ${className}`}>
      {children}
    </div>
  );
}

function CardTitle({ children, className = '' }: CardSubComponentProps) {
  return (
    <h3 className={`text-lg font-semibold text-gray-900 ${className}`}>
      {children}
    </h3>
  );
}

function CardDescription({ children, className = '' }: CardSubComponentProps) {
  return (
    <p className={`text-sm text-gray-600 mt-1 ${className}`}>
      {children}
    </p>
  );
}

function CardContent({ children, className = '' }: CardSubComponentProps) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}

function CardFooter({ children, className = '' }: CardSubComponentProps) {
  return (
    <div className={`border-t border-gray-200 pt-4 mt-4 ${className}`}>
      {children}
    </div>
  );
}

// Attach sub-components to Card
Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Description = CardDescription;
Card.Content = CardContent;
Card.Footer = CardFooter;