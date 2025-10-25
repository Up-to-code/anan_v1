// components/ui/Alert.tsx
import { 
    Info, 
    CheckCircle, 
    AlertTriangle, 
    XCircle, 
    X,
    LucideIcon 
  } from 'lucide-react';
  import { useState } from 'react';
  
  interface AlertProps {
    children: React.ReactNode;
    type?: 'info' | 'success' | 'warning' | 'error';
    title?: string;
    icon?: LucideIcon;
    dismissible?: boolean;
    onDismiss?: () => void;
    className?: string;
  }
  
  export function Alert({
    children,
    type = 'info',
    title,
    icon: CustomIcon,
    dismissible = false,
    onDismiss,
    className = ''
  }: AlertProps) {
    const [isVisible, setIsVisible] = useState(true);
  
    if (!isVisible) return null;
  
    const styles = {
      info: {
        container: 'bg-blue-50 border-blue-200',
        title: 'text-blue-900',
        text: 'text-blue-700',
        icon: 'text-blue-500'
      },
      success: {
        container: 'bg-green-50 border-green-200',
        title: 'text-green-900',
        text: 'text-green-700',
        icon: 'text-green-500'
      },
      warning: {
        container: 'bg-yellow-50 border-yellow-200',
        title: 'text-yellow-900',
        text: 'text-yellow-700',
        icon: 'text-yellow-500'
      },
      error: {
        container: 'bg-red-50 border-red-200',
        title: 'text-red-900',
        text: 'text-red-700',
        icon: 'text-red-500'
      }
    };
  
    const defaultIcons = {
      info: Info,
      success: CheckCircle,
      warning: AlertTriangle,
      error: XCircle
    };
  
    const Icon = CustomIcon || defaultIcons[type];
    const style = styles[type];
  
    const handleDismiss = () => {
      setIsVisible(false);
      onDismiss?.();
    };
  
    return (
      <div className={`border rounded-lg p-4 ${style.container} ${className}`}>
        <div className="flex items-start">
          <Icon className={`flex-shrink-0 mt-0.5 ${style.icon}`} size={20} />
          
          <div className="flex-1 ml-3">
            {title && (
              <h4 className={`font-medium ${style.title}`}>
                {title}
              </h4>
            )}
            <div className={`text-sm mt-1 ${style.text}`}>
              {children}
            </div>
          </div>
  
          {dismissible && (
            <button
              onClick={handleDismiss}
              className={`flex-shrink-0 ml-4 p-1 rounded hover:bg-black hover:bg-opacity-10 transition-colors ${style.text}`}
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>
    );
  }