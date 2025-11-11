/**
 * Security Utilities
 * 
 * Enhanced security measures for API routes and external integrations.
 */

import { NextRequest } from 'next/server';

/**
 * Validate and sanitize input
 */
export function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, ''); // Remove event handlers
}

/**
 * Validate URL to prevent open redirects
 */
export function validateUrl(url: string, allowedDomains?: string[]): boolean {
  try {
    const urlObj = new URL(url);
    
    // Check if URL is HTTPS
    if (urlObj.protocol !== 'https:') {
      return false;
    }

    // Check against allowed domains if provided
    if (allowedDomains && allowedDomains.length > 0) {
      return allowedDomains.some((domain) => urlObj.hostname === domain || urlObj.hostname.endsWith(`.${domain}`));
    }

    return true;
  } catch {
    return false;
  }
}

/**
 * Get client IP address
 */
export function getClientIP(request: NextRequest): string {
  // Check various headers for IP (considering proxies)
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  const cfConnectingIP = request.headers.get('cf-connecting-ip');

  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }

  if (realIP) {
    return realIP;
  }

  if (cfConnectingIP) {
    return cfConnectingIP;
  }

  return 'unknown';
}

/**
 * Check if request is from allowed origin
 */
export function isAllowedOrigin(
  origin: string | null,
  allowedOrigins: string[]
): boolean {
  if (!origin) {
    return false;
  }

  try {
    const originUrl = new URL(origin);
    return allowedOrigins.some(
      (allowed) =>
        originUrl.hostname === allowed ||
        originUrl.hostname.endsWith(`.${allowed}`)
    );
  } catch {
    return false;
  }
}

/**
 * Generate CSRF token
 */
export function generateCSRFToken(): string {
  const array = new Uint8Array(32);
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    crypto.getRandomValues(array);
  } else {
    // Fallback for environments without crypto
    for (let i = 0; i < array.length; i++) {
      array[i] = Math.floor(Math.random() * 256);
    }
  }
  return Array.from(array, (byte) => byte.toString(16).padStart(2, '0')).join('');
}

/**
 * Validate CSRF token
 */
export function validateCSRFToken(token: string, expectedToken: string): boolean {
  return token === expectedToken && token.length === 64;
}

/**
 * Content Security Policy headers
 */
export function getCSPHeaders(): Record<string, string> {
  return {
    'Content-Security-Policy': [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: https: blob:",
      "connect-src 'self' https://api.github.com https://www.googleapis.com https://api.twitch.tv https://www.reddit.com https://api.twitter.com https://www.googletagmanager.com https://www.google-analytics.com",
      "frame-src 'self' https://www.youtube.com https://player.twitch.tv",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      "upgrade-insecure-requests",
    ].join('; '),
  };
}

/**
 * Security headers for API routes
 */
export function getSecurityHeaders(): Record<string, string> {
  return {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',
    ...getCSPHeaders(),
  };
}

/**
 * Validate request size
 */
export function validateRequestSize(
  contentLength: string | null,
  maxSize: number = 1024 * 1024 // 1MB default
): boolean {
  if (!contentLength) {
    return true; // Allow if content length is not provided
  }

  const size = parseInt(contentLength, 10);
  return !isNaN(size) && size <= maxSize;
}

