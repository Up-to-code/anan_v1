"use client";
import React from 'react';
import { ImageUpload } from '@/components/ui/ImageUpload';
import { AvatarCropper } from '@/components/ui/AvatarCropper';
import { cn } from '@/lib/utils';
import { User, Upload, X, CheckCircle2 } from 'lucide-react';

interface ProfileAvatarUploadProps {
  value?: string;
  onChange: (value: string) => void;
  onUploaded?: (payload: { id: string; url: string; filename?: string; size?: number; type?: string; source: 'server' | 'local' }) => void;
  className?: string;
  disabled?: boolean;
}

export function ProfileAvatarUpload({ value, onChange, onUploaded, className, disabled }: ProfileAvatarUploadProps) {
  const [hover, setHover] = React.useState(false);
  const [showCropper, setShowCropper] = React.useState(false);
  const [originalImage, setOriginalImage] = React.useState<string>('');

  const handleFileSelect = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const result = ev.target?.result as string;
      setOriginalImage(result);
      setShowCropper(true);
    };
    reader.readAsDataURL(f);
  }, []);

  const handleCroppedImage = React.useCallback((croppedUrl: string) => {
    onChange(croppedUrl);
    setShowCropper(false);
    setOriginalImage('');
  }, [onChange]);

  const handleCancelCrop = React.useCallback(() => {
    setShowCropper(false);
    setOriginalImage('');
  }, []);

  return (
    <>
      <div className={cn('inline-flex items-center gap-4', className)}>
        <div
          className="relative h-24 w-24 rounded-full overflow-hidden border border-slate-300 bg-slate-50"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          {value ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={value} alt="Avatar" className="h-full w-full object-cover" />
              <div className="absolute top-1 right-1 bg-[#10B981] rounded-full p-1">
                <CheckCircle2 className="h-3 w-3 text-white" />
              </div>
            </>
          ) : (
            <div className="h-full w-full grid place-items-center text-slate-400">
              <User className="h-8 w-8" />
            </div>
          )}
          {!disabled && (
            <div
              className={cn(
                'absolute inset-0 grid place-items-center bg-slate-900/70 transition-opacity',
                hover ? 'opacity-100' : 'opacity-0'
              )}
              aria-hidden={!hover}
            >
              <label className="px-3 py-1.5 text-xs bg-white text-slate-900 rounded cursor-pointer flex items-center gap-1.5 font-medium hover:bg-slate-50 transition-colors">
                <Upload className="h-3 w-3" />
                Change
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileSelect}
                />
              </label>
            </div>
          )}
        </div>
        <div className="flex-1 space-y-2">
          <ImageUpload
            value={value}
            onChange={onChange}
            onUploaded={onUploaded}
            disabled={disabled}
            mode="square"
          />
          {!disabled && value && (
            <button
              type="button"
              className="flex items-center gap-1 text-xs text-red-600 hover:text-red-700 transition-colors"
              onClick={() => onChange('')}
            >
              <X className="h-3 w-3" />
              Remove avatar
            </button>
          )}
        </div>
      </div>

      {showCropper && originalImage && (
        <AvatarCropper
          imageSrc={originalImage}
          onCancel={handleCancelCrop}
          onSave={handleCroppedImage}
        />
      )}
    </>
  );
}


