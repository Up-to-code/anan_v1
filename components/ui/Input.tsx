/* eslint-disable @typescript-eslint/no-explicit-any */
// components/ui/Input.tsx
import { useState } from 'react';
import { Eye, EyeOff, Search, X } from 'lucide-react';

interface InputProps {
  label?: string;
  type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search';
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  helperText?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  icon?: React.ComponentType<any>;
  onClear?: () => void;
  className?: string;
  name?: string; // Add name prop
}

export function Input({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  helperText,
  error,
  disabled = false,
  required = false,
  icon: Icon,
  onClear,
  className = '',
  name // Add name prop
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const inputType = type === 'password' && showPassword ? 'text' : type;
  const isSearch = type === 'search';
  const hasValue = value.length > 0;

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {/* Input Icon (Left) */}
        {(Icon || isSearch) && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {isSearch ? <Search size={18} /> : Icon && <Icon size={18} />}
          </div>
        )}

        {/* Input Field */}
        <input
          type={inputType}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          disabled={disabled}
          name={name} // Add name attribute
          className={`
            w-full rounded-lg border transition-all duration-200 focus:ring-2 focus:ring-offset-1
            ${Icon || isSearch ? 'pl-10' : 'pl-3'}
            ${onClear || type === 'password' || hasValue ? 'pr-10' : 'pr-3'}
            ${error 
              ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
              : isFocused && !error
              ? 'border-blue-300 focus:border-blue-500 focus:ring-blue-500'
              : 'border-gray-300 focus:border-blue-500'
            }
            ${disabled ? 'bg-gray-50 text-gray-500 cursor-not-allowed' : 'bg-white text-gray-900'}
            py-2
          `}
        />

        {/* Right-side Icons */}
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
          {/* Clear Button */}
          {onClear && hasValue && !disabled && (
            <button
              type="button"
              onClick={onClear}
              className="text-gray-400 hover:text-gray-600 transition-colors p-0.5"
            >
              <X size={16} />
            </button>
          )}

          {/* Password Toggle */}
          {type === 'password' && !disabled && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-gray-400 hover:text-gray-600 transition-colors p-0.5"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          )}
        </div>
      </div>

      {/* Helper Text & Error */}
      {(helperText || error) && (
        <p className={`text-sm ${error ? 'text-red-600' : 'text-gray-500'}`}>
          {error || helperText}
        </p>
      )}
    </div>
  );
}