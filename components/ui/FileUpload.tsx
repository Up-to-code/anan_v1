"use client";
import React from 'react';
import { cn } from '@/lib/utils';
import { Upload, File, Loader2, CheckCircle2, X, Download, AlertCircle } from 'lucide-react';

interface FileUploadProps {
  className?: string;
  onUploaded?: (payload: { id: string; url: string; name?: string; size?: number; type?: string }) => void;
  disabled?: boolean;
  accept?: string;
}

export function FileUpload({ className, onUploaded, disabled = false, accept }: FileUploadProps) {
  const [isUploading, setIsUploading] = React.useState(false);
  const [fileInfo, setFileInfo] = React.useState<{ name: string; size: number; url?: string } | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [isDragOver, setIsDragOver] = React.useState(false);

  const handleFile = React.useCallback(async (file: File) => {
    if (isUploading) return;
    setIsUploading(true);
    try {
      setError(null);
      const form = new FormData();
      form.append('file', file);
      const res = await fetch('/api/uploadthing?slug=fileUploader', { method: 'POST', body: form });
      if (res.ok) {
        const data = await res.json().catch(() => null);
        const url = (data?.url || data?.file?.url) as string | undefined;
        const id = (data?.id || data?.file?.key || data?.file?.name) as string | undefined;
        setFileInfo({ name: file.name, size: file.size, url });
        if (onUploaded && url && id) onUploaded({ id, url, name: file.name, size: file.size, type: file.type });
        return;
      }
      console.warn('[FileUpload] upload failed', res.status);
      setError(`Upload failed (${res.status}).`);
    } finally {
      setIsUploading(false);
    }
  }, [isUploading, onUploaded]);

  const onChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) handleFile(f);
  }, [handleFile]);

  const onDrop = React.useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (disabled || isUploading) return;
    const f = e.dataTransfer.files?.[0];
    if (f) handleFile(f);
  }, [disabled, isUploading, handleFile]);

  const onDragOver = React.useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const onDragLeave = React.useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  return (
    <div className={cn('w-full', className)} aria-busy={isUploading}>
      <label
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
          className={cn(
          'block w-full border-2 border-dashed rounded-lg p-8 text-center transition-colors',
          isDragOver ? 'border-[#0064e0] bg-blue-50' : 'border-slate-300 hover:border-[#0064e0]',
          isUploading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
        )}
      >
        <input type="file" className="hidden" onChange={onChange} disabled={disabled || isUploading} accept={accept} />
        <div className="flex flex-col items-center gap-3">
          {isUploading ? (
            <>
              <Loader2 className="h-8 w-8 text-[#0064e0] animate-spin" />
              <span className="text-sm font-medium text-slate-700">Uploading…</span>
            </>
          ) : (
            <>
                  <div className="h-12 w-12 rounded-full bg-[#0064e0] grid place-items-center">
                    <Upload className="h-6 w-6 text-white" />
                  </div>
              <div>
                <div className="text-sm font-medium text-slate-900">Click to upload</div>
                <div className="text-xs text-slate-500 mt-0.5">or drag and drop</div>
                <div className="text-xs text-slate-400 mt-1">Up to 64MB</div>
              </div>
            </>
          )}
        </div>
      </label>
      {error && (
        <div className="mt-3 flex items-start gap-2 p-3 bg-red-50 border border-red-300 rounded">
          <AlertCircle className="h-4 w-4 text-red-600 shrink-0" />
          <div className="text-xs text-red-700">{error}</div>
        </div>
      )}
      {fileInfo && (
        <div className="mt-4 p-3 bg-green-50 border border-green-300 rounded">
          <div className="flex items-start gap-3">
            <div className="h-8 w-8 rounded bg-[#10B981] grid place-items-center shrink-0">
              <File className="h-4 w-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle2 className="h-3 w-3 text-[#10B981] shrink-0" />
                <div className="font-medium text-sm text-slate-900 truncate">{fileInfo.name}</div>
              </div>
              <div className="text-xs text-slate-600 mb-2">{(fileInfo.size / 1024).toFixed(1)} KB</div>
              {fileInfo.url && (
                <a
                  href={fileInfo.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-medium text-[#0064e0] hover:text-[#0082fb] transition-colors"
                >
                  <Download className="h-3 w-3" />
                  Download
                </a>
              )}
            </div>
            <button
              type="button"
              onClick={() => setFileInfo(null)}
              className="p-1 hover:bg-red-100 rounded transition-colors shrink-0"
              aria-label="Remove file"
            >
              <X className="h-4 w-4 text-red-600" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}


