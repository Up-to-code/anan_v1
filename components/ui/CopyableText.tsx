// components/ui/CopyableText.tsx
import { useState } from 'react';
import { Copy, CheckCircle, ExternalLink } from 'lucide-react';

interface CopyableTextProps {
  text: string;
  label?: string;
  helperText?: string;
  showCopyButton?: boolean;
  showExternalLink?: boolean;
  externalLink?: string;
  variant?: 'default' | 'inline';
  className?: string;
}

export function CopyableText({ 
  text, 
  label, 
  helperText, 
  showCopyButton = true,
  showExternalLink = false,
  externalLink,
  variant = 'default',
  className = ''
}: CopyableTextProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const openExternalLink = () => {
    if (externalLink) {
      window.open(externalLink, '_blank', 'noopener,noreferrer');
    }
  };

  if (variant === 'inline') {
    return (
      <div className={`inline-flex items-center gap-2 ${className}`}>
        <code className="text-sm bg-gray-100 px-2 py-1 rounded border">
          {text}
        </code>
        {showCopyButton && (
          <button
            onClick={copyToClipboard}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1"
            title="Copy to clipboard"
          >
            {copied ? <CheckCircle size={14} className="text-green-500" /> : <Copy size={14} />}
          </button>
        )}
      </div>
    );
  }

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      
      <div className="flex items-center gap-2">
        <code className="flex-1 bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 break-all font-mono">
          {text}
        </code>
        
        <div className="flex items-center gap-1">
          {showExternalLink && (
            <button
              onClick={openExternalLink}
              className="p-2 text-gray-400 hover:text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              title="Open in new tab"
            >
              <ExternalLink size={16} />
            </button>
          )}
          
          {showCopyButton && (
            <button
              onClick={copyToClipboard}
              className="p-2 text-gray-400 hover:text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              title="Copy to clipboard"
            >
              {copied ? <CheckCircle size={16} className="text-green-500" /> : <Copy size={16} />}
            </button>
          )}
        </div>
      </div>
      
      {helperText && (
        <p className="text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
}