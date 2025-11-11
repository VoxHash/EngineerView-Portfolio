"use client";
import { useEffect, useState, Suspense } from 'react';
import { usePathname } from 'next/navigation';
import { initializeConsentMode, getStoredConsent, updateConsentMode } from '@/lib/consent';

interface AnalyticsProps {
  gaId?: string;
}

interface GtagConfig {
  page_path?: string;
  [key: string]: unknown;
}

interface GtagEventParams {
  event_category?: string;
  event_label?: string;
  transport_type?: string;
  item_name?: string;
  method?: string;
  file_name?: string;
  [key: string]: unknown;
}

declare global {
  interface Window {
    gtag: (
      command: 'consent' | 'config' | 'event' | 'js' | 'set',
      action: 'default' | 'update' | string | Date,
      params?: GtagConfig | GtagEventParams | Record<string, unknown>
    ) => void;
    dataLayer: unknown[];
  }
}

function AnalyticsInner({ gaId }: AnalyticsProps) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  // Get GA ID from environment variable
  const googleAnalyticsId = gaId || process.env.NEXT_PUBLIC_GA_ID;

  useEffect(() => {
    setMounted(true);

    if (!googleAnalyticsId) {
      return;
    }

    // Initialize dataLayer FIRST (before consent mode)
    window.dataLayer = window.dataLayer || [];
    function gtag(
      command: 'consent' | 'config' | 'event' | 'js' | 'set',
      action: 'default' | 'update' | string | Date,
      params?: GtagConfig | GtagEventParams | Record<string, unknown>
    ) {
      window.dataLayer.push([command, action, params]);
    }
    window.gtag = gtag;

    // Initialize consent mode BEFORE loading GA script
    // Check if user has previously given consent
    const storedConsent = getStoredConsent();
    if (storedConsent) {
      // User has previously given consent, restore it
      initializeConsentMode(storedConsent);
      updateConsentMode(storedConsent);
    } else {
      // Default: deny all (GDPR compliant)
      // User will need to accept cookies via consent banner
      initializeConsentMode({
        ad_storage: 'denied',
        analytics_storage: 'denied',
        functionality_storage: 'denied',
        personalization_storage: 'denied',
        security_storage: 'granted',
      });
    }

    // Load Google Analytics script
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`;
    document.head.appendChild(script1);

    // Initialize GA
    gtag('js', new Date());
    gtag('config', googleAnalyticsId, {
      page_path: window.location.pathname,
    });

    return () => {
      // Cleanup: remove scripts if component unmounts
      const scripts = document.querySelectorAll(`script[src*="googletagmanager.com"]`);
      scripts.forEach((script) => script.remove());
    };
  }, [googleAnalyticsId]);

  // Track page views on route changes
  useEffect(() => {
    if (!mounted || !googleAnalyticsId || !window.gtag || typeof window === 'undefined') {
      return;
    }

    // Use window.location for the full URL including search params to avoid useSearchParams Suspense issue
    const url = window.location.pathname + window.location.search;
    
    window.gtag('config', googleAnalyticsId, {
      page_path: url,
    });
  }, [pathname, mounted, googleAnalyticsId]);

  return null; // This component doesn't render anything
}

export default function Analytics({ gaId }: AnalyticsProps) {
  return (
    <Suspense fallback={null}>
      <AnalyticsInner gaId={gaId} />
    </Suspense>
  );
}

// Export the tracking function for use in other components
export const useAnalytics = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || typeof window === 'undefined' || !window.gtag) {
    return {
      trackEvent: () => {},
      trackDownload: () => {},
      trackExternalLink: () => {},
      trackProjectView: () => {},
      trackContact: () => {}
    };
  }

  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return {
    trackEvent: (eventName: string, params?: GtagEventParams) => {
      if (gaId && window.gtag) {
        window.gtag('event', eventName, params);
      }
    },
    trackDownload: (fileName: string) => {
      if (gaId && window.gtag) {
        window.gtag('event', 'file_download', {
          file_name: fileName,
        });
      }
    },
    trackExternalLink: (url: string) => {
      if (gaId && window.gtag) {
        window.gtag('event', 'click', {
          event_category: 'outbound',
          event_label: url,
          transport_type: 'beacon',
        });
      }
    },
    trackProjectView: (projectName: string) => {
      if (gaId && window.gtag) {
        window.gtag('event', 'view_item', {
          item_name: projectName,
          event_category: 'engagement',
        });
      }
    },
    trackContact: (method: string) => {
      if (gaId && window.gtag) {
        window.gtag('event', 'generate_lead', {
          method: method,
          event_category: 'contact',
        });
      }
    }
  };
};
