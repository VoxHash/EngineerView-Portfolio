/**
 * Performance monitoring utilities for tracking and optimizing application performance
 */

import { useMemo, useCallback } from 'react';

export interface PerformanceMetric {
  name: string;
  value: number;
  unit: string;
  timestamp: number;
}

export interface PerformanceReport {
  metrics: PerformanceMetric[];
  timestamp: number;
  url: string;
}

class PerformanceMonitor {
  private metrics: PerformanceMetric[] = [];
  private observers: PerformanceObserver[] = [];

  constructor() {
    if (typeof window !== 'undefined') {
      this.initializeObservers();
    }
  }

  private initializeObservers() {
    // Observe navigation timing
    if ('PerformanceObserver' in window) {
      try {
        const navObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.entryType === 'navigation') {
              const navEntry = entry as PerformanceNavigationTiming;
              this.recordMetric('navigation', {
                'DNS Lookup': navEntry.domainLookupEnd - navEntry.domainLookupStart,
                'TCP Connection': navEntry.connectEnd - navEntry.connectStart,
                'TLS Negotiation': navEntry.secureConnectionStart ? navEntry.connectEnd - navEntry.secureConnectionStart : 0,
                'TTFB': navEntry.responseStart - navEntry.requestStart,
                'Download': navEntry.responseEnd - navEntry.responseStart,
                'DOM Processing': navEntry.domInteractive - navEntry.responseEnd,
                'Resource Load': navEntry.loadEventStart - navEntry.domContentLoadedEventEnd,
              });
            }
          }
        });
        navObserver.observe({ entryTypes: ['navigation'] });
        this.observers.push(navObserver);
      } catch (e) {
        console.warn('Navigation timing observer not supported:', e);
      }

      // Observe resource timing
      try {
        const resourceObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            const resourceEntry = entry as PerformanceResourceTiming;
            if (resourceEntry.initiatorType === 'img' || resourceEntry.initiatorType === 'script') {
              this.recordMetric('resource', {
                name: resourceEntry.name,
                type: resourceEntry.initiatorType,
                duration: resourceEntry.duration,
                size: resourceEntry.transferSize,
              });
            }
          }
        });
        resourceObserver.observe({ entryTypes: ['resource'] });
        this.observers.push(resourceObserver);
      } catch (e) {
        console.warn('Resource timing observer not supported:', e);
      }

      // Observe paint timing
      try {
        const paintObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            const paintEntry = entry as PerformancePaintTiming;
            this.recordMetric('paint', {
              name: paintEntry.name,
              value: paintEntry.startTime,
            });
          }
        });
        paintObserver.observe({ entryTypes: ['paint'] });
        this.observers.push(paintObserver);
      } catch (e) {
        console.warn('Paint timing observer not supported:', e);
      }
    }
  }

  private recordMetric(type: string, data: Record<string, any>) {
    Object.entries(data).forEach(([key, value]) => {
      if (typeof value === 'number') {
        this.metrics.push({
          name: `${type}.${key}`,
          value,
          unit: 'ms',
          timestamp: Date.now(),
        });
      }
    });
  }

  /**
   * Measure a function's execution time
   */
  measureFunction<T>(name: string, fn: () => T): T {
    const start = performance.now();
    const result = fn();
    const end = performance.now();
    
    this.metrics.push({
      name: `function.${name}`,
      value: end - start,
      unit: 'ms',
      timestamp: Date.now(),
    });

    return result;
  }

  /**
   * Measure an async function's execution time
   */
  async measureAsyncFunction<T>(name: string, fn: () => Promise<T>): Promise<T> {
    const start = performance.now();
    const result = await fn();
    const end = performance.now();
    
    this.metrics.push({
      name: `async.${name}`,
      value: end - start,
      unit: 'ms',
      timestamp: Date.now(),
    });

    return result;
  }

  /**
   * Get all metrics
   */
  getMetrics(): PerformanceMetric[] {
    return [...this.metrics];
  }

  /**
   * Get metrics by name pattern
   */
  getMetricsByPattern(pattern: string): PerformanceMetric[] {
    return this.metrics.filter(m => m.name.includes(pattern));
  }

  /**
   * Get performance report
   */
  getReport(): PerformanceReport {
    return {
      metrics: this.getMetrics(),
      timestamp: Date.now(),
      url: typeof window !== 'undefined' ? window.location.href : '',
    };
  }

  /**
   * Clear all metrics
   */
  clear() {
    this.metrics = [];
  }

  /**
   * Disconnect all observers
   */
  disconnect() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
  }

  /**
   * Log performance report to console (development only)
   */
  logReport() {
    if (process.env.NODE_ENV === 'development') {
      const report = this.getReport();
      console.group('📊 Performance Report');
      console.table(report.metrics);
      console.log('Total Metrics:', report.metrics.length);
      console.log('URL:', report.url);
      console.groupEnd();
    }
  }
}

// Singleton instance
export const performanceMonitor = typeof window !== 'undefined' 
  ? new PerformanceMonitor()
  : null;

/**
 * React hook for performance monitoring
 */
export function usePerformanceMonitor() {
  const measure = useCallback(<T,>(name: string, fn: () => T) => {
    if (typeof window === 'undefined' || !performanceMonitor) {
      return fn();
    }
    return performanceMonitor.measureFunction(name, fn);
  }, []);

  const measureAsync = useCallback(<T,>(name: string, fn: () => Promise<T>) => {
    if (typeof window === 'undefined' || !performanceMonitor) {
      return fn();
    }
    return performanceMonitor.measureAsyncFunction(name, fn);
  }, []);

  const getReport = useCallback(() => {
    if (typeof window === 'undefined' || !performanceMonitor) {
      return { metrics: [], timestamp: Date.now(), url: '' };
    }
    return performanceMonitor.getReport();
  }, []);

  const logReport = useCallback(() => {
    if (typeof window === 'undefined' || !performanceMonitor) {
      return;
    }
    performanceMonitor.logReport();
  }, []);

  return useMemo(() => ({
    measure,
    measureAsync,
    getReport,
    logReport,
  }), [measure, measureAsync, getReport, logReport]);
}

