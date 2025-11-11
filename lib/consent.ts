/**
 * Google Consent Mode v2 Utilities
 * 
 * Handles consent state management for Google Analytics and other Google services.
 * Supports GDPR, CCPA, and other privacy regulations.
 */

export type ConsentType = 'ad_storage' | 'analytics_storage' | 'functionality_storage' | 'personalization_storage' | 'security_storage';
export type ConsentState = 'granted' | 'denied';

export interface ConsentSettings {
  ad_storage?: ConsentState;
  analytics_storage?: ConsentState;
  functionality_storage?: ConsentState;
  personalization_storage?: ConsentState;
  security_storage?: ConsentState;
}

declare global {
  interface Window {
    gtag: (
      command: 'consent' | 'config' | 'event' | 'js' | 'set',
      action: 'default' | 'update',
      params?: ConsentSettings | Record<string, unknown>
    ) => void;
  }
}

/**
 * Initialize consent mode with default (denied) state
 * This should be called BEFORE loading Google Analytics
 */
export function initializeConsentMode(defaultConsent: ConsentSettings = {}) {
  if (typeof window === 'undefined' || !window.gtag) {
    return;
  }

  // Set default consent state (denied by default for GDPR compliance)
  const defaultState: ConsentSettings = {
    ad_storage: 'denied',
    analytics_storage: 'denied',
    functionality_storage: 'denied',
    personalization_storage: 'denied',
    security_storage: 'granted', // Security storage is typically always granted
    ...defaultConsent,
  };

  window.gtag('consent', 'default', defaultState);
}

/**
 * Update consent state based on user's choice
 * Call this when user accepts/rejects cookies
 */
export function updateConsentMode(consent: ConsentSettings) {
  if (typeof window === 'undefined' || !window.gtag) {
    return;
  }

  window.gtag('consent', 'update', consent);
}

/**
 * Grant all consent types
 * Use when user accepts all cookies
 */
export function grantAllConsent() {
  updateConsentMode({
    ad_storage: 'granted',
    analytics_storage: 'granted',
    functionality_storage: 'granted',
    personalization_storage: 'granted',
    security_storage: 'granted',
  });
}

/**
 * Deny all consent types (except security)
 * Use when user rejects cookies
 */
export function denyAllConsent() {
  updateConsentMode({
    ad_storage: 'denied',
    analytics_storage: 'denied',
    functionality_storage: 'denied',
    personalization_storage: 'denied',
    security_storage: 'granted',
  });
}

/**
 * Get current consent state from localStorage
 */
export function getStoredConsent(): ConsentSettings | null {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const stored = localStorage.getItem('ga_consent');
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

/**
 * Store consent state in localStorage
 */
export function storeConsent(consent: ConsentSettings) {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    localStorage.setItem('ga_consent', JSON.stringify(consent));
  } catch (error) {
    console.warn('Failed to store consent:', error);
  }
}

/**
 * Check if user is in a region that requires consent (EEA, UK, etc.)
 * This is a simple check - you may want to use a more sophisticated geolocation service
 */
export function requiresConsent(): boolean {
  if (typeof window === 'undefined') {
    return true; // Default to requiring consent for server-side rendering
  }

  // Check if consent cookie/flag exists
  const hasConsent = getStoredConsent() !== null;
  
  // If no consent stored, assume consent is required (GDPR default)
  // You can enhance this with geolocation detection
  return !hasConsent;
}

