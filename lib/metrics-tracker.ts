/**
 * Success Metrics Tracker
 * Tracks and reports on all success metrics defined in ROADMAP.md
 */

export interface PerformanceMetrics {
  lighthouseScore: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  cumulativeLayoutShift: number;
  speedIndex: number;
  totalBlockingTime: number;
  timeToInteractive: number;
}

export interface UserExperienceMetrics {
  mobileUsabilityScore: number;
  accessibilityScore: number;
  pageLoadTime: number;
}

export interface DevelopmentMetrics {
  testCoverage: number;
  typescriptCoverage: number;
  securityVulnerabilities: {
    critical: number;
    high: number;
    medium: number;
    low: number;
  };
  uptime: number;
}

export interface SuccessMetrics {
  performance: PerformanceMetrics;
  userExperience: UserExperienceMetrics;
  development: DevelopmentMetrics;
  timestamp: number;
}

export interface MetricTarget {
  name: string;
  current: number;
  target: number;
  unit: string;
  status: 'pass' | 'fail' | 'warning';
}

class MetricsTracker {
  private metrics: SuccessMetrics | null = null;

  /**
   * Calculate performance metrics from Lighthouse results
   */
  calculatePerformanceMetrics(lighthouseResults: any): PerformanceMetrics {
    const performance = lighthouseResults.categories?.performance?.score || 0;
    const audits = lighthouseResults.audits || {};

    return {
      lighthouseScore: Math.round(performance * 100),
      firstContentfulPaint: audits['first-contentful-paint']?.numericValue || 0,
      largestContentfulPaint: audits['largest-contentful-paint']?.numericValue || 0,
      cumulativeLayoutShift: audits['cumulative-layout-shift']?.numericValue || 0,
      speedIndex: audits['speed-index']?.numericValue || 0,
      totalBlockingTime: audits['total-blocking-time']?.numericValue || 0,
      timeToInteractive: audits['interactive']?.numericValue || 0,
    };
  }

  /**
   * Calculate user experience metrics
   */
  calculateUserExperienceMetrics(lighthouseResults: any): UserExperienceMetrics {
    const categories = lighthouseResults.categories || {};
    
    return {
      mobileUsabilityScore: Math.round((categories['mobile-friendly']?.score || categories.accessibility?.score || 0) * 100),
      accessibilityScore: Math.round((categories.accessibility?.score || 0) * 100),
      pageLoadTime: lighthouseResults.audits?.['page-load-time']?.numericValue || 0,
    };
  }

  /**
   * Check if metrics meet targets
   */
  checkTargets(metrics: SuccessMetrics): MetricTarget[] {
    const targets: MetricTarget[] = [];

    // Performance Targets
    targets.push({
      name: 'Lighthouse Score',
      current: metrics.performance.lighthouseScore,
      target: 95,
      unit: '%',
      status: metrics.performance.lighthouseScore >= 95 ? 'pass' : 'fail',
    });

    targets.push({
      name: 'First Contentful Paint',
      current: metrics.performance.firstContentfulPaint,
      target: 1500,
      unit: 'ms',
      status: metrics.performance.firstContentfulPaint <= 1500 ? 'pass' : 'fail',
    });

    targets.push({
      name: 'Largest Contentful Paint',
      current: metrics.performance.largestContentfulPaint,
      target: 2500,
      unit: 'ms',
      status: metrics.performance.largestContentfulPaint <= 2500 ? 'pass' : 'fail',
    });

    targets.push({
      name: 'Cumulative Layout Shift',
      current: metrics.performance.cumulativeLayoutShift,
      target: 0.1,
      unit: '',
      status: metrics.performance.cumulativeLayoutShift <= 0.1 ? 'pass' : 'fail',
    });

    // User Experience Goals
    targets.push({
      name: 'Mobile Usability Score',
      current: metrics.userExperience.mobileUsabilityScore,
      target: 95,
      unit: '%',
      status: metrics.userExperience.mobileUsabilityScore >= 95 ? 'pass' : 'fail',
    });

    targets.push({
      name: 'Accessibility Score',
      current: metrics.userExperience.accessibilityScore,
      target: 95,
      unit: '%',
      status: metrics.userExperience.accessibilityScore >= 95 ? 'pass' : 'fail',
    });

    targets.push({
      name: 'Page Load Time',
      current: metrics.userExperience.pageLoadTime,
      target: 2000,
      unit: 'ms',
      status: metrics.userExperience.pageLoadTime <= 2000 ? 'pass' : 'fail',
    });

    // Development Metrics
    targets.push({
      name: 'Test Coverage',
      current: metrics.development.testCoverage,
      target: 80,
      unit: '%',
      status: metrics.development.testCoverage >= 80 ? 'pass' : metrics.development.testCoverage >= 70 ? 'warning' : 'fail',
    });

    targets.push({
      name: 'TypeScript Coverage',
      current: metrics.development.typescriptCoverage,
      target: 95,
      unit: '%',
      status: metrics.development.typescriptCoverage >= 95 ? 'pass' : metrics.development.typescriptCoverage >= 90 ? 'warning' : 'fail',
    });

    targets.push({
      name: 'Critical Security Vulnerabilities',
      current: metrics.development.securityVulnerabilities.critical,
      target: 0,
      unit: '',
      status: metrics.development.securityVulnerabilities.critical === 0 ? 'pass' : 'fail',
    });

    targets.push({
      name: 'Uptime',
      current: metrics.development.uptime,
      target: 99.9,
      unit: '%',
      status: metrics.development.uptime >= 99.9 ? 'pass' : metrics.development.uptime >= 99.5 ? 'warning' : 'fail',
    });

    return targets;
  }

  /**
   * Get overall status
   */
  getOverallStatus(targets: MetricTarget[]): 'pass' | 'fail' | 'warning' {
    const fails = targets.filter(t => t.status === 'fail').length;
    const warnings = targets.filter(t => t.status === 'warning').length;

    if (fails > 0) return 'fail';
    if (warnings > 0) return 'warning';
    return 'pass';
  }

  /**
   * Generate metrics report
   */
  generateReport(metrics: SuccessMetrics): {
    metrics: SuccessMetrics;
    targets: MetricTarget[];
    overallStatus: 'pass' | 'fail' | 'warning';
    summary: {
      passed: number;
      failed: number;
      warnings: number;
      total: number;
    };
  } {
    const targets = this.checkTargets(metrics);
    const overallStatus = this.getOverallStatus(targets);

    return {
      metrics,
      targets,
      overallStatus,
      summary: {
        passed: targets.filter(t => t.status === 'pass').length,
        failed: targets.filter(t => t.status === 'fail').length,
        warnings: targets.filter(t => t.status === 'warning').length,
        total: targets.length,
      },
    };
  }
}

export const metricsTracker = new MetricsTracker();

