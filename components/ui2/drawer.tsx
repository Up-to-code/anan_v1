import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md'
}) => {
  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl'
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          <motion.div 
            className={`fixed right-0 top-0 h-full w-full ${sizes[size]} bg-white/95 backdrop-blur-xl shadow-2xl z-50 overflow-y-auto`}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div className="flex flex-col h-full">
              {title && (
                <div className="flex items-center justify-between p-6 border-b border-slate-200/50 flex-shrink-0 backdrop-blur-sm bg-white/80">
                  <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-slate-100/50 rounded-lg transition-colors backdrop-blur-sm"
                  >
                    <X className="w-6 h-6 text-slate-500" />
                  </button>
                </div>
              )}
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};