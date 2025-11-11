/**
 * Development Tools
 * 
 * Utilities for debugging and development.
 */

/**
 * Enhanced console logging with context
 */
export class DevLogger {
  private context: string;

  constructor(context: string) {
    this.context = context;
  }

  log(message: string, data?: unknown) {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[${this.context}]`, message, data || '');
    }
  }

  error(message: string, error?: unknown) {
    if (process.env.NODE_ENV === 'development') {
      console.error(`[${this.context}]`, message, error || '');
    }
  }

  warn(message: string, data?: unknown) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(`[${this.context}]`, message, data || '');
    }
  }

  group(label: string) {
    if (process.env.NODE_ENV === 'development') {
      console.group(`[${this.context}] ${label}`);
    }
  }

  groupEnd() {
    if (process.env.NODE_ENV === 'development') {
      console.groupEnd();
    }
  }
}

/**
 * Performance profiler
 */
export class PerformanceProfiler {
  private marks: Map<string, number> = new Map();

  start(label: string) {
    if (typeof performance !== 'undefined') {
      performance.mark(`${label}-start`);
      this.marks.set(label, performance.now());
    }
  }

  end(label: string): number | null {
    if (typeof performance === 'undefined') return null;
    
    performance.mark(`${label}-end`);
    performance.measure(label, `${label}-start`, `${label}-end`);
    
    const startTime = this.marks.get(label);
    if (startTime) {
      const duration = performance.now() - startTime;
      this.marks.delete(label);
      return duration;
    }
    return null;
  }

  measure(label: string, fn: () => void) {
    this.start(label);
    fn();
    const duration = this.end(label);
    if (duration !== null && process.env.NODE_ENV === 'development') {
      console.log(`[Performance] ${label}: ${duration.toFixed(2)}ms`);
    }
  }
}

/**
 * Environment checker
 */
export function checkEnvironment() {
  if (typeof window === 'undefined') return;

  const checks = {
    nodeEnv: process.env.NODE_ENV,
    hasGA: !!window.gtag,
    hasDataLayer: !!window.dataLayer,
    viewport: {
      width: window.innerWidth,
      height: window.innerHeight,
    },
    userAgent: navigator.userAgent,
  };

  if (process.env.NODE_ENV === 'development') {
    console.log('[Environment Check]', checks);
  }

  return checks;
}

