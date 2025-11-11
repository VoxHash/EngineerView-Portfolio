/**
 * Rate Limiting Utilities
 * 
 * Implements rate limiting for API routes and external API calls.
 */

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

// In-memory store (for serverless, consider using Redis or similar)
const rateLimitStore: RateLimitStore = {};

export interface RateLimitConfig {
  maxRequests: number;
  windowMs: number;
  identifier?: string;
}

export interface RateLimitResult {
  success: boolean;
  remaining: number;
  resetTime: number;
  retryAfter?: number;
}

/**
 * Check rate limit for a given identifier
 */
export function checkRateLimit(
  identifier: string,
  config: RateLimitConfig
): RateLimitResult {
  const now = Date.now();
  const key = `${identifier}:${config.identifier || 'default'}`;
  const record = rateLimitStore[key];

  // Initialize or reset if window expired
  if (!record || now > record.resetTime) {
    rateLimitStore[key] = {
      count: 1,
      resetTime: now + config.windowMs,
    };

    return {
      success: true,
      remaining: config.maxRequests - 1,
      resetTime: now + config.windowMs,
    };
  }

  // Check if limit exceeded
  if (record.count >= config.maxRequests) {
    const retryAfter = Math.ceil((record.resetTime - now) / 1000);

    return {
      success: false,
      remaining: 0,
      resetTime: record.resetTime,
      retryAfter,
    };
  }

  // Increment count
  record.count++;

  return {
    success: true,
    remaining: config.maxRequests - record.count,
    resetTime: record.resetTime,
  };
}

/**
 * Get rate limit headers for HTTP response
 */
export function getRateLimitHeaders(result: RateLimitResult): Record<string, string> {
  return {
    'X-RateLimit-Limit': result.remaining.toString(),
    'X-RateLimit-Remaining': result.remaining.toString(),
    'X-RateLimit-Reset': new Date(result.resetTime).toISOString(),
    ...(result.retryAfter && {
      'Retry-After': result.retryAfter.toString(),
    }),
  };
}

/**
 * Rate limit middleware for API routes
 */
export function withRateLimit(
  config: RateLimitConfig,
  getIdentifier: (request: Request) => string
) {
  return (request: Request) => {
    const identifier = getIdentifier(request);
    const result = checkRateLimit(identifier, config);

    if (!result.success) {
      return {
        allowed: false,
        headers: getRateLimitHeaders(result),
        retryAfter: result.retryAfter,
      };
    }

    return {
      allowed: true,
      headers: getRateLimitHeaders(result),
    };
  };
}

/**
 * Clean up expired rate limit records
 */
export function cleanupRateLimitStore() {
  const now = Date.now();
  Object.keys(rateLimitStore).forEach((key) => {
    if (rateLimitStore[key].resetTime < now) {
      delete rateLimitStore[key];
    }
  });
}

// Cleanup every 5 minutes
if (typeof setInterval !== 'undefined') {
  setInterval(cleanupRateLimitStore, 5 * 60 * 1000);
}

