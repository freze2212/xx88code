/**
 * Utility functions for image handling
 */

export function getImageUrl(path: string, baseUrl?: string): string {
  if (path.startsWith('http')) {
    return path;
  }
  
  const base = baseUrl || process.env.NEXT_PUBLIC_IMAGE_BASE_URL || '';
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}

export function generateImageSizes(breakpoints: number[]): string {
  return breakpoints
    .map((bp) => `(max-width: ${bp}px) ${bp}px`)
    .join(', ') + `, ${Math.max(...breakpoints)}px`;
}

export function createBlurDataURL(width: number, height: number): string {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  
  if (ctx) {
    ctx.fillStyle = '#f3f4f6';
    ctx.fillRect(0, 0, width, height);
  }
  
  return canvas.toDataURL();
}

export function getImageDimensions(src: string): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
    };
    img.onerror = reject;
    img.src = src;
  });
}

export function optimizeImageUrl(
  src: string,
  options: {
    width?: number;
    height?: number;
    quality?: number;
    format?: 'webp' | 'jpeg' | 'png';
  } = {}
): string {
  const { width, height, quality = 75, format = 'webp' } = options;
  
  // If using external image service like Cloudinary, Vercel, etc.
  if (src.includes('cloudinary.com')) {
    const transformations = [];
    if (width) transformations.push(`w_${width}`);
    if (height) transformations.push(`h_${height}`);
    transformations.push(`q_${quality}`, `f_${format}`);
    
    return src.replace('/upload/', `/upload/${transformations.join(',')}/`);
  }
  
  // For local images, return as is
  return src;
}
