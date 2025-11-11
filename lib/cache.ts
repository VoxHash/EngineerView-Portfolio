/**
 * Caching Utilities
 * 
 * Centralized caching configuration and utilities for API routes and data fetching.
 */

export const CACHE_CONFIG = {
  // Static content - cache for 1 year
  STATIC: {
    maxAge: 31536000, // 1 year
    sMaxAge: 31536000,
    staleWhileRevalidate: 31536000,
  },
  
  // Dynamic content - cache for 1 hour, stale for 24 hours
  DYNAMIC: {
    maxAge: 3600, // 1 hour
    sMaxAge: 3600,
    staleWhileRevalidate: 86400, // 24 hours
  },
  
  // Frequently updated content - cache for 5 minutes, stale for 1 hour
  FREQUENT: {
    maxAge: 300, // 5 minutes
    sMaxAge: 300,
    staleWhileRevalidate: 3600, // 1 hour
  },
  
  // Real-time content - no cache
  REALTIME: {
    maxAge: 0,
    sMaxAge: 0,
    staleWhileRevalidate: 0,
  },
} as const;

export type CacheType = keyof typeof CACHE_CONFIG;

/**
 * Get Cache-Control header value
 */
export function getCacheControlHeader(cacheType: CacheType = 'DYNAMIC'): string {
  const config = CACHE_CONFIG[cacheType];
  
  if (config.maxAge === 0) {
    return 'no-cache, no-store, must-revalidate';
  }
  
  return `public, max-age=${config.maxAge}, s-maxage=${config.sMaxAge}, stale-while-revalidate=${config.staleWhileRevalidate}`;
}

/**
 * Get Next.js revalidate value (in seconds)
 */
export function getRevalidateTime(cacheType: CacheType = 'DYNAMIC'): number {
  return CACHE_CONFIG[cacheType].maxAge;
}

/**
 * Get fetch cache options for Next.js
 */
export function getFetchCacheOptions(cacheType: CacheType = 'DYNAMIC') {
  const revalidate = getRevalidateTime(cacheType);
  
  if (revalidate === 0) {
    return { cache: 'no-store' as const };
  }
  
  return {
    next: {
      revalidate,
    },
  };
}

