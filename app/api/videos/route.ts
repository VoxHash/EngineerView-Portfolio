import { NextRequest, NextResponse } from 'next/server';
import { fetchAllVideos } from '@/lib/videos';
import { createSuccessResponse, handleError, ErrorCode, createErrorResponse } from '@/lib/errors';
import { getCacheControlHeader } from '@/lib/cache';
import { withRateLimit, getRateLimitHeaders } from '@/lib/rate-limit';
import { getSecurityHeaders, getClientIP } from '@/lib/security';

export const dynamic = 'force-dynamic';

// Rate limit configuration
const rateLimitConfig = {
  maxRequests: 60, // 60 requests per window
  windowMs: 15 * 60 * 1000, // 15 minutes
  identifier: 'videos-api',
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
    const limitParam = searchParams.get('limit') || '20';
    const limit = parseInt(limitParam, 10);

    // Validate limit
    if (isNaN(limit) || limit < 1 || limit > 100) {
      return NextResponse.json(
        createErrorResponse(
          ErrorCode.VALIDATION_ERROR,
          'Limit must be between 1 and 100',
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

    const videos = await fetchAllVideos(limit);

    const response = createSuccessResponse({
      videos,
      count: videos.length,
    });

    return NextResponse.json(response, {
      headers: {
        ...getSecurityHeaders(),
        ...rateLimitCheck.headers,
        'Cache-Control': getCacheControlHeader('DYNAMIC'),
      },
    });
  } catch (error) {
    console.error('Error fetching videos:', error);
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

