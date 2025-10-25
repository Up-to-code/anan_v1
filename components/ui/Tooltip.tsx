"use client";
import React from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/utils';

interface TooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
}

export function Tooltip({
  children,
  content,
  position = 'top',
  className
}: TooltipProps) {
  const [isVisible, setIsVisible] = React.useState(false);
  const [coords, setCoords] = React.useState({ x: 0, y: 0 });
  const [mounted, setMounted] = React.useState(false);

  const childRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const handleMouseEnter = () => {
    if (childRef.current) {
      const rect = childRef.current.getBoundingClientRect();
      setCoords({
        x: rect.left + rect.width / 2,
        y: rect.top
      });
    }
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    setIsVisible(false);
  };

  const positionStyles = {
    top: {
      bottom: `calc(100% - ${coords.y}px + 8px)`,
      left: coords.x,
      transform: 'translateX(-50%)'
    },
    bottom: {
      top: coords.y + 8,
      left: coords.x,
      transform: 'translateX(-50%)'
    },
    left: {
      right: `calc(100% - ${coords.x}px + 8px)`,
      top: coords.y,
      transform: 'translateY(-50%)'
    },
    right: {
      left: coords.x + 8,
      top: coords.y,
      transform: 'translateY(-50%)'
    }
  };

  return (
    <>
      <div
        ref={childRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="inline-block"
      >
        {children}
      </div>
      {mounted && isVisible && createPortal(
        <div
          className={cn(
            'fixed z-50 px-2 py-1 text-sm text-white bg-slate-900 rounded shadow-lg whitespace-nowrap',
            className
          )}
          style={positionStyles[position]}
        >
          {content}
          <div
            className={cn(
              'absolute w-2 h-2 bg-slate-900 transform rotate-45',
              position === 'top' && 'bottom-[-4px] left-1/2 -translate-x-1/2',
              position === 'bottom' && 'top-[-4px] left-1/2 -translate-x-1/2',
              position === 'left' && 'right-[-4px] top-1/2 -translate-y-1/2',
              position === 'right' && 'left-[-4px] top-1/2 -translate-y-1/2'
            )}
          />
        </div>,
        document.body
      )}
    </>
  );
}