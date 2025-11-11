"use client";

import { useState, useEffect } from "react";
import { CheckCircle2, XCircle, AlertTriangle, TrendingUp, Clock, Shield, Code, Zap } from "lucide-react";
import { metricsTracker, type MetricTarget } from "@/lib/metrics-tracker";
import type { SuccessMetrics } from "@/lib/metrics-tracker";

// Client-side date formatting component to avoid hydration mismatches
function LastUpdated({ timestamp }: { timestamp: number }) {
  const [formattedDate, setFormattedDate] = useState<string>('');

  useEffect(() => {
    // Only format on client side to avoid hydration mismatch
    setFormattedDate(new Date(timestamp).toLocaleString());
  }, [timestamp]);

  if (!formattedDate) return null;

  return (
    <div className="mt-8 text-center text-sm text-neutral-500 dark:text-neutral-400">
      <Clock className="h-4 w-4 inline mr-1" />
      Last updated: {formattedDate}
    </div>
  );
}

export default function MetricsDashboardPage() {
  const [metrics, setMetrics] = useState<SuccessMetrics | null>(null);
  const [targets, setTargets] = useState<MetricTarget[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In production, this would fetch from an API or monitoring service
    // For now, we'll use placeholder data
    const loadMetrics = async () => {
      try {
        // Simulate loading metrics
        await new Promise(resolve => setTimeout(resolve, 500));

        // Placeholder metrics - in production, fetch from actual monitoring
        const placeholderMetrics: SuccessMetrics = {
          performance: {
            lighthouseScore: 96,
            firstContentfulPaint: 1200,
            largestContentfulPaint: 2100,
            cumulativeLayoutShift: 0.05,
            speedIndex: 2500,
            totalBlockingTime: 150,
            timeToInteractive: 3200,
          },
          userExperience: {
            mobileUsabilityScore: 98,
            accessibilityScore: 97,
            pageLoadTime: 1800,
          },
          development: {
            testCoverage: 85,
            typescriptCoverage: 96,
            securityVulnerabilities: {
              critical: 0,
              high: 0,
              medium: 2,
              low: 5,
            },
            uptime: 99.95,
          },
          timestamp: Date.now(),
        };

        setMetrics(placeholderMetrics);
        const report = metricsTracker.generateReport(placeholderMetrics);
        setTargets(report.targets);
      } catch (error) {
        console.error('Error loading metrics:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadMetrics();
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pass':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'fail':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pass':
        return 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200 border-green-200 dark:border-green-800';
      case 'warning':
        return 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200 border-yellow-200 dark:border-yellow-800';
      case 'fail':
        return 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-200 border-red-200 dark:border-red-800';
      default:
        return '';
    }
  };

  if (isLoading) {
    return (
      <div className="py-12">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-brand border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-neutral-600 dark:text-neutral-300">Loading metrics...</p>
        </div>
      </div>
    );
  }

  if (!metrics) {
    return (
      <div className="py-12">
        <div className="card p-8 text-center">
          <p className="text-neutral-600 dark:text-neutral-300">Unable to load metrics.</p>
        </div>
      </div>
    );
  }

  const report = metricsTracker.generateReport(metrics);
  const performanceTargets = targets.filter(t => 
    t.name.includes('Lighthouse') || 
    t.name.includes('Contentful') || 
    t.name.includes('Layout Shift')
  );
  const uxTargets = targets.filter(t => 
    t.name.includes('Mobile') || 
    t.name.includes('Accessibility') || 
    t.name.includes('Page Load')
  );
  const devTargets = targets.filter(t => 
    t.name.includes('Coverage') || 
    t.name.includes('Security') || 
    t.name.includes('Uptime')
  );

  return (
    <div className="py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Success Metrics Dashboard</h1>
        <p className="text-neutral-600 dark:text-neutral-300">
          Track performance, user experience, and development metrics against targets.
        </p>
      </div>

      {/* Overall Status */}
      <div className={`card p-6 mb-8 border-2 ${getStatusColor(report.overallStatus)}`}>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Overall Status</h2>
            <p className="text-sm opacity-80">
              {report.summary.passed} passed, {report.summary.warnings} warnings, {report.summary.failed} failed
            </p>
          </div>
          <div className="text-4xl">
            {getStatusIcon(report.overallStatus)}
          </div>
        </div>
      </div>

      {/* Performance Targets */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Zap className="h-6 w-6 text-brand" />
          <h2 className="text-2xl font-bold">Performance Targets</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {performanceTargets.map((target) => (
            <div key={target.name} className={`card p-4 border ${getStatusColor(target.status)}`}>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">{target.name}</h3>
                {getStatusIcon(target.status)}
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold">{target.current}</span>
                <span className="text-sm opacity-70">{target.unit}</span>
                <span className="text-sm opacity-50">/ {target.target}{target.unit}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* User Experience Goals */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="h-6 w-6 text-brand" />
          <h2 className="text-2xl font-bold">User Experience Goals</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {uxTargets.map((target) => (
            <div key={target.name} className={`card p-4 border ${getStatusColor(target.status)}`}>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">{target.name}</h3>
                {getStatusIcon(target.status)}
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold">{target.current}</span>
                <span className="text-sm opacity-70">{target.unit}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Development Metrics */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Code className="h-6 w-6 text-brand" />
          <h2 className="text-2xl font-bold">Development Metrics</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {devTargets.map((target) => (
            <div key={target.name} className={`card p-4 border ${getStatusColor(target.status)}`}>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-sm">{target.name}</h3>
                {getStatusIcon(target.status)}
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold">{target.current}</span>
                <span className="text-sm opacity-70">{target.unit}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Security Details */}
      <div className="card p-6">
        <div className="flex items-center gap-2 mb-4">
          <Shield className="h-6 w-6 text-brand" />
          <h2 className="text-2xl font-bold">Security Vulnerabilities</h2>
        </div>
        <div className="grid grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-red-600 dark:text-red-400">
              {metrics.development.securityVulnerabilities.critical}
            </div>
            <div className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">Critical</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">
              {metrics.development.securityVulnerabilities.high}
            </div>
            <div className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">High</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">
              {metrics.development.securityVulnerabilities.medium}
            </div>
            <div className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">Medium</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              {metrics.development.securityVulnerabilities.low}
            </div>
            <div className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">Low</div>
          </div>
        </div>
      </div>

      {/* Last Updated */}
      <LastUpdated timestamp={metrics.timestamp} />
    </div>
  );
}

