import { NextRequest, NextResponse } from 'next/server';
import { fetchGitHubActivity, fetchContributionStats } from '@/lib/github';
import { createSuccessResponse, handleError, ErrorCode, createErrorResponse } from '@/lib/errors';
import { getCacheControlHeader } from '@/lib/cache';
import { withRateLimit } from '@/lib/rate-limit';
import { getSecurityHeaders, getClientIP } from '@/lib/security';
import { SITE } from '@/lib/site';

export const dynamic = 'force-dynamic';

// Rate limit configuration
const rateLimitConfig = {
  maxRequests: 30, // 30 requests per window
  windowMs: 15 * 60 * 1000, // 15 minutes
  identifier: 'github-activity-api',
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
    const type = searchParams.get('type') || 'activity'; // 'activity' or 'stats'
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

    if (type === 'stats') {
      const stats = await fetchContributionStats(SITE.githubUser);
      const response = createSuccessResponse({ stats });
      return NextResponse.json(response, {
        headers: {
          ...getSecurityHeaders(),
          ...rateLimitCheck.headers,
          'Cache-Control': getCacheControlHeader('DYNAMIC'),
        },
      });
    }

    const activity = await fetchGitHubActivity(SITE.githubUser, limit);
    const response = createSuccessResponse({
      activity,
      count: activity.length,
    });

    return NextResponse.json(response, {
      headers: {
        ...getSecurityHeaders(),
        ...rateLimitCheck.headers,
        'Cache-Control': getCacheControlHeader('DYNAMIC'),
      },
    });
  } catch (error) {
    console.error('Error fetching GitHub activity:', error);
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

