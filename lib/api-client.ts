/**
 * Enhanced API Client
 * 
 * Provides rate limiting, retry logic, and better error handling for external APIs.
 */

import { getFetchCacheOptions } from './cache';
import { handleError, ErrorCode } from './errors';
import { checkRateLimit, type RateLimitConfig } from './rate-limit';

export interface APIClientConfig {
  baseURL?: string;
  headers?: Record<string, string>;
  timeout?: number;
  retries?: number;
  retryDelay?: number;
  rateLimit?: RateLimitConfig;
  cache?: 'DYNAMIC' | 'FREQUENT' | 'STATIC' | 'REALTIME';
}

export interface APIResponse<T = unknown> {
  data: T;
  status: number;
  headers: Headers;
  cached?: boolean;
}

export class APIClient {
  private config: Required<Omit<APIClientConfig, 'rateLimit'>> & {
    rateLimit?: RateLimitConfig;
  };

  constructor(config: APIClientConfig = {}) {
    this.config = {
      baseURL: config.baseURL || '',
      headers: config.headers || {},
      timeout: config.timeout || 10000, // 10 seconds
      retries: config.retries ?? 3,
      retryDelay: config.retryDelay || 1000, // 1 second
      rateLimit: config.rateLimit,
      cache: config.cache || 'DYNAMIC',
    };
  }

  /**
   * Make a GET request with retry logic and rate limiting
   */
  async get<T = unknown>(
    path: string,
    options: {
      headers?: Record<string, string>;
      params?: Record<string, string>;
      identifier?: string;
    } = {}
  ): Promise<APIResponse<T>> {
    const { headers = {}, params = {}, identifier } = options;

    // Check rate limit if configured
    if (this.config.rateLimit && identifier) {
      const rateLimitResult = checkRateLimit(identifier, this.config.rateLimit);
      if (!rateLimitResult.success) {
        throw new Error(
          `Rate limit exceeded. Retry after ${rateLimitResult.retryAfter} seconds.`
        );
      }
    }

    // Build URL
    const url = new URL(path, this.config.baseURL);
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });

    // Retry logic
    let lastError: Error | null = null;
    for (let attempt = 0; attempt <= this.config.retries; attempt++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(
          () => controller.abort(),
          this.config.timeout
        );

        const response = await fetch(url.toString(), {
          method: 'GET',
          headers: {
            ...this.config.headers,
            ...headers,
          },
          signal: controller.signal,
          ...getFetchCacheOptions(this.config.cache),
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          // Handle rate limiting from external APIs
          if (response.status === 429) {
            const retryAfter = response.headers.get('Retry-After');
            throw new Error(
              `Rate limited by external API. Retry after ${retryAfter || 'unknown'} seconds.`
            );
          }

          // Handle other errors
          if (response.status >= 500 && attempt < this.config.retries) {
            // Retry on server errors
            await this.delay(this.config.retryDelay * (attempt + 1));
            continue;
          }

          throw new Error(
            `API request failed: ${response.status} ${response.statusText}`
          );
        }

        const data = await response.json();

        return {
          data: data as T,
          status: response.status,
          headers: response.headers,
          cached: response.headers.get('x-cache') === 'HIT',
        };
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error));

        // Don't retry on abort (timeout) or client errors (4xx)
        if (
          error instanceof Error &&
          (error.name === 'AbortError' ||
            (error.message.includes('429') && attempt < this.config.retries))
        ) {
          if (attempt < this.config.retries) {
            await this.delay(this.config.retryDelay * (attempt + 1));
            continue;
          }
        }

        if (attempt < this.config.retries) {
          await this.delay(this.config.retryDelay * (attempt + 1));
          continue;
        }
      }
    }

    // All retries failed
    const apiError = handleError(lastError);
    throw new Error(apiError.message);
  }

  /**
   * Make a POST request
   */
  async post<T = unknown>(
    path: string,
    body: unknown,
    options: {
      headers?: Record<string, string>;
      identifier?: string;
    } = {}
  ): Promise<APIResponse<T>> {
    const { headers = {}, identifier } = options;

    // Check rate limit if configured
    if (this.config.rateLimit && identifier) {
      const rateLimitResult = checkRateLimit(identifier, this.config.rateLimit);
      if (!rateLimitResult.success) {
        throw new Error(
          `Rate limit exceeded. Retry after ${rateLimitResult.retryAfter} seconds.`
        );
      }
    }

    const url = new URL(path, this.config.baseURL);

    const response = await fetch(url.toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...this.config.headers,
        ...headers,
      },
      body: JSON.stringify(body),
      ...getFetchCacheOptions('REALTIME'),
    });

    if (!response.ok) {
      const apiError = handleError(
        new Error(`API request failed: ${response.status}`)
      );
      throw new Error(apiError.message);
    }

    const data = await response.json();

    return {
      data: data as T,
      status: response.status,
      headers: response.headers,
    };
  }

  /**
   * Delay helper for retries
   */
  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

/**
 * Create a GitHub API client with rate limiting
 */
export function createGitHubClient() {
  return new APIClient({
    baseURL: 'https://api.github.com',
    headers: {
      Accept: 'application/vnd.github+json',
      ...(process.env.GITHUB_TOKEN && {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      }),
    },
    rateLimit: {
      maxRequests: 60, // GitHub allows 60 requests/hour for unauthenticated, 5000/hour for authenticated
      windowMs: 60 * 60 * 1000, // 1 hour
      identifier: 'github',
    },
    cache: 'DYNAMIC',
    retries: 2,
  });
}

/**
 * Create a Twitter API client with rate limiting
 */
export function createTwitterClient() {
  return new APIClient({
    baseURL: 'https://api.twitter.com/2',
    headers: {
      ...(process.env.TWITTER_BEARER_TOKEN && {
        Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
      }),
    },
    rateLimit: {
      maxRequests: 300, // Twitter API v2 allows 300 requests/15min
      windowMs: 15 * 60 * 1000, // 15 minutes
      identifier: 'twitter',
    },
    cache: 'DYNAMIC',
    retries: 2,
  });
}

