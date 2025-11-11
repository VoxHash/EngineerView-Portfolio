"use client";

import { useEffect } from 'react';
import { reportWebVitals } from '@/lib/performance';

/**
 * WebVitals Component
 * 
 * Tracks and reports Core Web Vitals metrics.
 * Should be included in the root layout.
 */
export default function WebVitals() {
  useEffect(() => {
    // Only run in browser
    if (typeof window === 'undefined') return;

    // Import web-vitals library dynamically
    import('web-vitals').then(({ onCLS, onFID, onFCP, onLCP, onTTFB, onINP }) => {
      onCLS(reportWebVitals);
      onFID(reportWebVitals);
      onFCP(reportWebVitals);
      onLCP(reportWebVitals);
      onTTFB(reportWebVitals);
      onINP(reportWebVitals);
    }).catch((error) => {
      // Silently fail if web-vitals is not available
      if (process.env.NODE_ENV === 'development') {
        console.warn('web-vitals not available:', error);
      }
    });
  }, []);

  return null;
}

