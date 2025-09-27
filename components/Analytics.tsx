"use client";
import { useEffect, useState } from 'react';
import Plausible from 'plausible-tracker';

interface AnalyticsProps {
  domain?: string;
}

export default function Analytics({ domain = 'voxhash.dev' }: AnalyticsProps) {
  useEffect(() => {
    // Initialize Plausible
    const { trackPageview } = Plausible({
      domain: domain,
      apiHost: 'https://plausible.io'
    });
    
    // Track page view on mount
    trackPageview();
  }, [domain]);

  return null; // This component doesn't render anything
}

// Export the tracking function for use in other components
export const useAnalytics = () => {
  const [plausible, setPlausible] = useState<ReturnType<typeof Plausible> | null>(null);

  useEffect(() => {
    const plausibleInstance = Plausible({
      domain: 'voxhash.dev',
      apiHost: 'https://plausible.io'
    });
    setPlausible(plausibleInstance);
  }, []);

  if (!plausible) {
    return {
      trackEvent: () => {},
      trackDownload: () => {},
      trackExternalLink: () => {},
      trackProjectView: () => {},
      trackContact: () => {}
    };
  }

  const { trackEvent } = plausible;
  
  return {
    trackEvent: (eventName: string, props?: Record<string, any>) => {
      trackEvent(eventName, { props });
    },
    trackDownload: (fileName: string) => {
      trackEvent('Download', { props: { file: fileName } });
    },
    trackExternalLink: (url: string) => {
      trackEvent('External Link', { props: { url } });
    },
    trackProjectView: (projectName: string) => {
      trackEvent('Project View', { props: { project: projectName } });
    },
    trackContact: (method: string) => {
      trackEvent('Contact', { props: { method } });
    }
  };
};
