/**
 * Image Optimization Utilities
 * 
 * Helpers for optimizing images and implementing lazy loading.
 */

export interface ImageOptimizationOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'avif' | 'jpeg' | 'png';
  priority?: boolean;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
}

/**
 * Generate optimized image srcSet for responsive images
 */
export function generateSrcSet(
  src: string,
  widths: number[] = [640, 750, 828, 1080, 1200, 1920, 2048, 3840]
): string {
  return widths
    .map((width) => `${src}?w=${width}&q=75 ${width}w`)
    .join(', ');
}

/**
 * Get optimal image sizes for responsive images
 */
export function getImageSizes(breakpoints: {
  mobile?: number;
  tablet?: number;
  desktop?: number;
} = {}): string {
  const { mobile = 100, tablet = 50, desktop = 33 } = breakpoints;
  
  return `(max-width: 640px) ${mobile}vw, (max-width: 1024px) ${tablet}vw, ${desktop}vw`;
}

/**
 * Generate blur placeholder data URL
 */
export function generateBlurDataURL(width: number = 10, height: number = 10): string {
  // Simple SVG placeholder for blur effect
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#e5e7eb"/>
    </svg>
  `.trim();
  
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
}

/**
 * Check if image should be lazy loaded
 */
export function shouldLazyLoad(isAboveFold: boolean, priority?: boolean): boolean {
  if (priority) return false;
  return !isAboveFold;
}

/**
 * Get optimal image quality based on device
 */
export function getOptimalQuality(devicePixelRatio: number = 1): number {
  // Higher DPI devices can use higher quality
  if (devicePixelRatio >= 3) return 90;
  if (devicePixelRatio >= 2) return 85;
  return 80;
}

