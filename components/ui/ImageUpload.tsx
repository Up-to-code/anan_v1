"use client";
import React, { useCallback } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { X, ImageIcon, Loader2 } from 'lucide-react';

interface ImageUploadProps {
  value?: string;
  onChange: (value: string) => void;
  className?: string;
  disabled?: boolean;
  mode?: 'square' | 'auto'; // square = 1:1 aspect ratio, auto = maintain original
  onUploaded?: (payload: { id: string; url: string; filename?: string; size?: number; type?: string; source: 'server' | 'local' }) => void;
}

export function ImageUpload({
  value,
  onChange,
  className,
  disabled = false,
  mode = 'auto',
  onUploaded
}: ImageUploadProps) {
  const [preview, setPreview] = React.useState(value);
  const [isDragOver, setIsDragOver] = React.useState(false);
  const [isUploading, setIsUploading] = React.useState(false);
  const lastPayloadRef = React.useRef<{ id: string; url: string; filename?: string; size?: number; type?: string; source: 'server' | 'local' } | null>(null);

  React.useEffect(() => {
    setPreview(value);
  }, [value]);

  const handleFile = useCallback(async (file: File) => {
    if (isUploading) return; // prevent spamming
    setIsUploading(true);
    try {
      const form = new FormData();
      form.append('file', file);
      // Attempt UploadThing App Router endpoint with route slug
      const res = await fetch('/api/uploadthing?slug=imageUploader', {
        method: 'POST',
        body: form
      });
      if (res.ok) {
        const data = await res.json().catch(() => null);
        const url = (data?.url || data?.file?.url || data?.ufsUrl) as string | undefined;
        const id = (data?.id || data?.file?.key || data?.file?.name) as string | undefined;
        if (url) {
          console.log('[ImageUpload] success', { id, url });
          setPreview(url);
          onChange(url);
          const payload = { id: id || '', url, filename: file.name, size: file.size, type: file.type, source: 'server' as const };
          lastPayloadRef.current = payload;
          if (onUploaded) onUploaded(payload);
          setIsUploading(false);
          return;
        }
        console.warn('[ImageUpload] Missing URL in response', data);
      }
      // Fallback to local preview
      console.log('[ImageUpload] falling back to local preview');
    const reader = new FileReader();
      reader.onload = (ev) => {
        const result = ev.target?.result as string;
      setPreview(result);
      onChange(result);
        const payload = { id: `local-${Date.now()}`, url: result, filename: file.name, size: file.size, type: file.type, source: 'local' as const };
        lastPayloadRef.current = payload;
        if (onUploaded) onUploaded(payload);
    };
    reader.readAsDataURL(file);
    } catch (e) {
      console.error('[ImageUpload] error', e);
    } finally {
      setIsUploading(false);
    }
  }, [isUploading, onChange, onUploaded]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    const imageFile = files.find(file => file.type.startsWith('image/'));
    
    if (imageFile) {
      handleFile(imageFile);
    }
  }, [handleFile]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  }, [handleFile]);

  const handleClear = useCallback(() => {
    setPreview(undefined);
    onChange('');
  }, [onChange]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const isSquare = mode === 'square';
  
  return (
    <div className={cn('w-full', className)} aria-busy={isUploading} aria-live="polite">
      {preview ? (
        <div className={cn('relative inline-block group', isSquare && 'aspect-square')}>
          <Image
            src={preview}
            alt="Preview"
            width={isSquare ? 128 : 256}
            height={isSquare ? 128 : 256}
            className={cn(
              'rounded-lg object-cover border',
              isSquare ? 'h-32 w-32' : 'h-auto w-full max-w-xs',
              'border-slate-200'
            )}
          />
          {!disabled && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
              disabled={isUploading}
              aria-label="Remove image"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={cn(
            'border-2 border-dashed rounded-lg p-8 text-center transition-colors',
            isDragOver
              ? 'border-[#0064e0] bg-blue-50'
              : 'border-slate-300 hover:border-[#0064e0]',
            (disabled || isUploading) && 'opacity-50 cursor-not-allowed'
          )}
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleChange}
            disabled={disabled || isUploading}
            className="hidden"
            id="image-upload"
          />
          <label
            htmlFor="image-upload"
            className={cn(
              'cursor-pointer block',
              (disabled || isUploading) && 'cursor-not-allowed pointer-events-none'
            )}
          >
            <div className="flex flex-col items-center gap-3">
              {isUploading ? (
                <>
                  <Loader2 className="h-10 w-10 text-[#0064e0] animate-spin" />
                  <span className="text-sm font-medium text-slate-700">Uploading…</span>
                </>
              ) : (
                <>
                  <div className="h-12 w-12 rounded-full bg-[#0064e0] grid place-items-center">
                    <ImageIcon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-slate-900">Click to upload</div>
                    <div className="text-xs text-slate-500 mt-0.5">or drag and drop</div>
                    <div className="text-xs text-slate-400 mt-1">PNG, JPG, GIF up to 128MB</div>
                  </div>
                </>
              )}
            </div>
          </label>
        </div>
      )}
    </div>
  );
}