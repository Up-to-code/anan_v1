"use client";
import React from 'react';
import Cropper from 'react-easy-crop';
import { cn } from '@/lib/utils';
import { Button } from './Button';
import { X } from 'lucide-react';

interface Area {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface AvatarCropperProps {
  imageSrc: string;
  onCancel: () => void;
  onSave: (croppedImageUrl: string) => void;
}

export function AvatarCropper({ imageSrc, onCancel, onSave }: AvatarCropperProps) {
  const [crop, setCrop] = React.useState({ x: 0, y: 0 });
  const [zoom, setZoom] = React.useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = React.useState<Area | null>(null);

  const onCropComplete = React.useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const createCroppedImage = React.useCallback(async () => {
    if (!croppedAreaPixels) return;

    try {
      const croppedImageUrl = await getCroppedImg(imageSrc, croppedAreaPixels);
      onSave(croppedImageUrl);
    } catch (error) {
      console.error('[AvatarCropper] Error creating cropped image:', error);
      onSave(imageSrc); // Fallback to original image
    }
  }, [imageSrc, croppedAreaPixels, onSave]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative w-full max-w-2xl bg-white rounded-lg border border-slate-300">
        <div className="absolute top-4 right-4 z-10">
          <button
            type="button"
            onClick={onCancel}
            className="p-2 bg-white rounded-full border border-slate-300 hover:bg-slate-100 transition-colors"
            aria-label="Close cropper"
          >
            <X className="h-5 w-5 text-slate-700" />
          </button>
        </div>
        
        <div className="p-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Crop Avatar</h2>
          
          <div className="relative w-full h-96 bg-slate-100 rounded-lg overflow-hidden mb-4">
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
              cropShape="round"
              showGrid={false}
            />
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Zoom
              </label>
              <input
                type="range"
                min={1}
                max={3}
                step={0.1}
                value={zoom}
                onChange={(e) => setZoom(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="secondary"
                onClick={onCancel}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={createCroppedImage}
                className="flex-1"
              >
                Save Avatar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

async function getCroppedImg(
  imageSrc: string,
  pixelCrop: Area
): Promise<string> {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('Could not get canvas context');
  }

  // Set canvas size to the crop size
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  // Draw the cropped image
  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error('Canvas is empty'));
        return;
      }
      const url = URL.createObjectURL(blob);
      resolve(url);
    }, 'image/png');
  });
}

function createImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    image.crossOrigin = 'anonymous';
    image.src = url;
  });
}

