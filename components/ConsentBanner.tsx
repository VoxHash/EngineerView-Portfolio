"use client";

import { useEffect, useState } from 'react';
import { X, Cookie, Settings } from 'lucide-react';
import { grantAllConsent, denyAllConsent, storeConsent, getStoredConsent, updateConsentMode, type ConsentSettings, type ConsentState } from '@/lib/consent';

export default function ConsentBanner() {
  const [mounted, setMounted] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [consentSettings, setConsentSettings] = useState<ConsentSettings>({
    ad_storage: 'denied',
    analytics_storage: 'denied',
    functionality_storage: 'denied',
    personalization_storage: 'denied',
    security_storage: 'granted',
  });

  useEffect(() => {
    // Mark as mounted to ensure consistent server/client rendering
    setMounted(true);
    
    // Check if user has already given consent
    const stored = getStoredConsent();
    if (!stored) {
      // Show banner after a short delay
      const timer = setTimeout(() => setShowBanner(true), 1000);
      return () => clearTimeout(timer);
    } else {
      // User has already consented, apply stored settings
      setConsentSettings(stored);
      updateConsentMode(stored);
    }
  }, []);

  const handleAcceptAll = () => {
    const consent: ConsentSettings = {
      ad_storage: 'granted',
      analytics_storage: 'granted',
      functionality_storage: 'granted',
      personalization_storage: 'granted',
      security_storage: 'granted',
    };
    grantAllConsent();
    storeConsent(consent);
    setConsentSettings(consent);
    setShowBanner(false);
  };

  const handleRejectAll = () => {
    const consent: ConsentSettings = {
      ad_storage: 'denied',
      analytics_storage: 'denied',
      functionality_storage: 'denied',
      personalization_storage: 'denied',
      security_storage: 'granted',
    };
    denyAllConsent();
    storeConsent(consent);
    setConsentSettings(consent);
    setShowBanner(false);
  };

  const handleSaveSettings = () => {
    updateConsentMode(consentSettings);
    storeConsent(consentSettings);
    setShowBanner(false);
    setShowSettings(false);
  };

  const toggleConsent = (key: keyof ConsentSettings) => {
    setConsentSettings(prev => {
      const newValue: ConsentState = prev[key] === 'granted' ? 'denied' : 'granted';
      return {
        ...prev,
        [key]: newValue,
      };
    });
  };

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted || !showBanner) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6">
      <div className="max-w-4xl mx-auto card border-2 border-brand/20 shadow-2xl p-4 md:p-6">
        {!showSettings ? (
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
            <div className="flex items-start gap-3 flex-1 min-w-0">
              <Cookie className="h-6 w-6 text-brand flex-shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-base md:text-lg text-neutral-900 dark:text-neutral-100 mb-1.5">
                  Cookie Consent
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  We use cookies to enhance your experience, analyze site usage, and assist in marketing efforts. 
                  By clicking "Accept All", you consent to our use of cookies.{' '}
                  <a 
                    href="/privacy" 
                    className="text-brand hover:underline font-medium"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Learn more
                  </a>
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto md:flex-shrink-0 md:flex-nowrap">
              <button
                onClick={() => setShowSettings(true)}
                className="btn-secondary text-sm px-4 py-2.5 inline-flex items-center justify-center gap-2 whitespace-nowrap"
                aria-label="Customize cookie settings"
              >
                <Settings className="h-4 w-4" />
                Customize
              </button>
              <button
                onClick={handleRejectAll}
                className="btn-secondary text-sm px-4 py-2.5 whitespace-nowrap"
                aria-label="Reject all cookies"
              >
                Reject All
              </button>
              <button
                onClick={handleAcceptAll}
                className="btn text-sm px-5 py-2.5 whitespace-nowrap font-medium"
                aria-label="Accept all cookies"
              >
                Accept All
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-5">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-200 dark:border-neutral-700">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                Cookie Preferences
              </h3>
              <button
                onClick={() => setShowSettings(false)}
                className="p-1.5 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
                aria-label="Close settings"
              >
                <X className="h-5 w-5 text-neutral-600 dark:text-neutral-400" />
              </button>
            </div>
            
            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Choose which cookies you want to accept. Required cookies are always enabled.
            </p>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 bg-neutral-50 dark:bg-neutral-900/50 rounded-lg gap-4">
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm md:text-base text-neutral-900 dark:text-neutral-100 mb-1">Security Storage</h4>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    Required for site security and cannot be disabled
                  </p>
                </div>
                <div className="badge bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200 flex-shrink-0">
                  Always On
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-neutral-50 dark:bg-neutral-900/50 rounded-lg gap-4">
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm md:text-base text-neutral-900 dark:text-neutral-100 mb-1">Analytics Storage</h4>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    Helps us understand how visitors interact with our website
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                  <input
                    type="checkbox"
                    checked={consentSettings.analytics_storage === 'granted'}
                    onChange={() => toggleConsent('analytics_storage')}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-neutral-300 dark:bg-neutral-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-brand rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-neutral-50 dark:bg-neutral-900/50 rounded-lg gap-4">
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm md:text-base text-neutral-900 dark:text-neutral-100 mb-1">Functionality Storage</h4>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    Enables enhanced functionality and personalization
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                  <input
                    type="checkbox"
                    checked={consentSettings.functionality_storage === 'granted'}
                    onChange={() => toggleConsent('functionality_storage')}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-neutral-300 dark:bg-neutral-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-brand rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-neutral-50 dark:bg-neutral-900/50 rounded-lg gap-4">
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm md:text-base text-neutral-900 dark:text-neutral-100 mb-1">Personalization Storage</h4>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    Allows us to personalize your experience
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                  <input
                    type="checkbox"
                    checked={consentSettings.personalization_storage === 'granted'}
                    onChange={() => toggleConsent('personalization_storage')}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-neutral-300 dark:bg-neutral-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-brand rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-neutral-50 dark:bg-neutral-900/50 rounded-lg gap-4">
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm md:text-base text-neutral-900 dark:text-neutral-100 mb-1">Ad Storage</h4>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    Used for advertising and marketing purposes
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                  <input
                    type="checkbox"
                    checked={consentSettings.ad_storage === 'granted'}
                    onChange={() => toggleConsent('ad_storage')}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-neutral-300 dark:bg-neutral-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-brand rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand"></div>
                </label>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 pt-3 border-t border-neutral-200 dark:border-neutral-700">
              <button
                onClick={handleSaveSettings}
                className="btn flex-1 sm:flex-none sm:px-6 order-2 sm:order-1"
                aria-label="Save cookie preferences"
              >
                Save Preferences
              </button>
              <button
                onClick={() => {
                  setShowSettings(false);
                  setShowBanner(false);
                }}
                className="btn-secondary px-6 order-1 sm:order-2"
                aria-label="Cancel"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

