'use client';

import { useState } from 'react';
import { CustomImage } from './Image';
import { cn } from '@/lib/utils';

interface ImageGalleryProps {
  images: {
    src: string;
    alt: string;
    caption?: string;
  }[];
  className?: string;
}

export function ImageGallery({ images, className }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className={cn('space-y-4', className)}>
      {/* Main Image */}
      <div className="relative aspect-video w-full overflow-hidden rounded-lg">
        <CustomImage
          src={images[selectedIndex].src}
          alt={images[selectedIndex].alt}
          fill
          className="object-cover"
        />
        {images[selectedIndex].caption && (
          <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-4 text-white">
            <p className="text-sm">{images[selectedIndex].caption}</p>
          </div>
        )}
      </div>

      {/* Thumbnail Grid */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={cn(
                'relative aspect-video overflow-hidden rounded-md transition-all duration-200',
                selectedIndex === index
                  ? 'ring-2 ring-primary-500 ring-offset-2'
                  : 'hover:opacity-80'
              )}
            >
              <CustomImage
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
