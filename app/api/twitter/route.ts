import { NextRequest, NextResponse } from 'next/server';
import { fetchTweets } from '@/lib/twitter';
import { createSuccessResponse, handleError, ErrorCode, createErrorResponse } from '@/lib/errors';
import { getCacheControlHeader } from '@/lib/cache';
import { withRateLimit } from '@/lib/rate-limit';
import { getSecurityHeaders, getClientIP } from '@/lib/security';

export const dynamic = 'force-dynamic';

// Rate limit configuration
const rateLimitConfig = {
  maxRequests: 30, // 30 requests per window
  windowMs: 15 * 60 * 1000, // 15 minutes
  identifier: 'twitter-api',
};

export async function GET(request: NextRequest) {
  try {
    // Rate limiting
    const clientIP = getClientIP(request);
    const rateLimitCheck = withRateLimit(rateLimitConfig, () => clientIP)(request);
    
    if (!rateLimitCheck.allowed) {
      return NextResponse.json(
        createErrorResponse(
          ErrorCode.RATE_LIMITED,
          'Too many requests. Please try again later.',
          { retryAfter: rateLimitCheck.retryAfter }
        ),
        {
          status: 429,
          headers: {
            ...getSecurityHeaders(),
            ...rateLimitCheck.headers,
            'Cache-Control': getCacheControlHeader('REALTIME'),
          },
        }
      );
    }

    const searchParams = request.nextUrl.searchParams;
    const limitParam = searchParams.get('limit') || '10';
    const limit = parseInt(limitParam, 10);

    // Validate limit
    if (isNaN(limit) || limit < 1 || limit > 50) {
      return NextResponse.json(
        createErrorResponse(
          ErrorCode.VALIDATION_ERROR,
          'Limit must be between 1 and 50',
          { field: 'limit', value: limitParam }
        ),
        { 
          status: 400,
          headers: { 
            ...getSecurityHeaders(),
            'Cache-Control': getCacheControlHeader('REALTIME') 
          }
        }
      );
    }

    const tweets = await fetchTweets(undefined, limit);

    const response = createSuccessResponse({
      tweets,
      count: tweets.length,
    });

    return NextResponse.json(response, {
      headers: {
        ...getSecurityHeaders(),
        ...rateLimitCheck.headers,
        'Cache-Control': getCacheControlHeader('DYNAMIC'),
      },
    });
  } catch (error) {
    console.error('Error fetching tweets:', error);
    const errorResponse = handleError(error);
    return NextResponse.json(errorResponse, { 
      status: errorResponse.statusCode,
      headers: { 
        ...getSecurityHeaders(),
        'Cache-Control': getCacheControlHeader('REALTIME') 
      }
    });
  }
}

