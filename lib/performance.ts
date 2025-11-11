/**
 * Performance Utilities
 * 
 * Core Web Vitals tracking and performance optimization helpers.
 */

/**
 * Report Core Web Vitals to analytics
 */
export function reportWebVitals(metric: {
  id: string;
  name: string;
  value: number;
  label?: string;
  rating?: 'good' | 'needs-improvement' | 'poor';
}) {
  // Derive label from rating if not provided
  const label = metric.label || metric.rating || 'unknown';
  
  // Report to Google Analytics if available
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', metric.name, {
      event_category: 'Web Vitals',
      value: Math.round(metric.value),
      event_label: metric.id,
      non_interaction: true,
    });
  }

  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log('[Web Vitals]', metric.name, metric.value, label);
  }
}

/**
 * Get performance metrics
 */
export function getPerformanceMetrics() {
  if (typeof window === 'undefined' || !window.performance) {
    return null;
  }

  const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
  
  if (!navigation) {
    return null;
  }

  return {
    // Core Web Vitals
    lcp: navigation.loadEventEnd - navigation.fetchStart, // Largest Contentful Paint approximation
    fid: 0, // First Input Delay - requires user interaction
    cls: 0, // Cumulative Layout Shift - requires observer
    
    // Other metrics
    dns: navigation.domainLookupEnd - navigation.domainLookupStart,
    tcp: navigation.connectEnd - navigation.connectStart,
    request: navigation.responseStart - navigation.requestStart,
    response: navigation.responseEnd - navigation.responseStart,
    dom: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
    load: navigation.loadEventEnd - navigation.loadEventStart,
    total: navigation.loadEventEnd - navigation.fetchStart,
  };
}

/**
 * Preload critical resources
 */
export function preloadResource(href: string, as: string, crossorigin?: string) {
  if (typeof document === 'undefined') return;
  
  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = href;
  link.as = as;
  if (crossorigin) {
    link.crossOrigin = crossorigin;
  }
  document.head.appendChild(link);
}

/**
 * Prefetch resource for faster navigation
 */
export function prefetchResource(href: string) {
  if (typeof document === 'undefined') return;
  
  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = href;
  document.head.appendChild(link);
}

/**
 * Defer non-critical JavaScript
 */
export function deferScript(src: string, callback?: () => void) {
  if (typeof document === 'undefined') return;
  
  const script = document.createElement('script');
  script.src = src;
  script.defer = true;
  script.async = true;
  if (callback) {
    script.onload = callback;
  }
  document.head.appendChild(script);
}

