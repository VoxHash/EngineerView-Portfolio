/**
 * CDN Utility Functions
 * 
 * Helper functions for CDN URL generation and asset optimization.
 * Currently uses Vercel's Edge Network (automatic CDN).
 * 
 * To use a custom CDN, set NEXT_PUBLIC_CDN_URL in environment variables.
 */

export const CDN_CONFIG = {
  url: process.env.NEXT_PUBLIC_CDN_URL || '',
  enabled: !!process.env.NEXT_PUBLIC_CDN_URL,
};

/**
 * Get CDN URL for a static asset
 * 
 * @param path - Asset path (e.g., '/og.png' or 'og.png')
 * @returns Full CDN URL or original path if CDN not configured
 * 
 * @example
 * ```typescript
 * getCDNUrl('/og.png') // Returns CDN URL or '/og.png'
 * ```
 */
export function getCDNUrl(path: string): string {
  if (!CDN_CONFIG.enabled) {
    // Return path as-is (Vercel handles CDN automatically)
    return path;
  }
  
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${CDN_CONFIG.url}/${cleanPath}`;
}

/**
 * Get optimized image URL with query parameters
 * 
 * @param path - Image path
 * @param width - Optional width parameter
 * @param quality - Optional quality parameter (1-100)
 * @returns Optimized image URL
 * 
 * @example
 * ```typescript
 * getImageUrl('/og.png', 1200, 90) // Returns optimized URL
 * ```
 */
export function getImageUrl(
  path: string,
  width?: number,
  quality?: number
): string {
  const baseUrl = getCDNUrl(path);
  
  // If CDN is not enabled, return base path (Next.js handles optimization)
  if (!CDN_CONFIG.enabled) {
    return baseUrl;
  }
  
  // Add optimization parameters if provided
  if (width || quality) {
    const params = new URLSearchParams();
    if (width) params.set('w', width.toString());
    if (quality) params.set('q', quality.toString());
    return `${baseUrl}?${params.toString()}`;
  }
  
  return baseUrl;
}

/**
 * Check if CDN is enabled
 * 
 * @returns True if custom CDN is configured
 */
export function isCDNEnabled(): boolean {
  return CDN_CONFIG.enabled;
}

