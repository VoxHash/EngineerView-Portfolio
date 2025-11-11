import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    const title = searchParams.get('title') || 'VoxHash.dev';
    const description = searchParams.get('description') || 'Engineer • AI • Systems • Creator';
    const type = searchParams.get('type') || 'website';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#0a0a0a',
            backgroundImage: 'linear-gradient(45deg, #1a1a1a 0%, #2d1b69 50%, #1a1a1a 100%)',
            fontFamily: 'Inter, sans-serif',
          }}
        >
          {/* Background Pattern */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'radial-gradient(circle at 20% 80%, rgba(124, 58, 237, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(124, 58, 237, 0.1) 0%, transparent 50%)',
            }}
          />
          
          {/* Main Content */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              padding: '60px',
              maxWidth: '1000px',
            }}
          >
            {/* Logo/Brand */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '40px',
              }}
            >
              <div
                style={{
                  fontSize: '72px',
                  fontWeight: '900',
                  color: '#ffffff',
                  letterSpacing: '-0.02em',
                }}
              >
                Vox<span style={{ color: '#7C3AED' }}>Hash</span>
              </div>
            </div>

            {/* Title */}
            <div
              style={{
                fontSize: '56px',
                fontWeight: '700',
                color: '#ffffff',
                lineHeight: '1.1',
                marginBottom: '24px',
                textAlign: 'center',
                maxWidth: '900px',
              }}
            >
              {title}
            </div>

            {/* Description */}
            <div
              style={{
                fontSize: '28px',
                color: '#a1a1aa',
                lineHeight: '1.4',
                textAlign: 'center',
                maxWidth: '800px',
                marginBottom: '40px',
              }}
            >
              {description}
            </div>

            {/* Type Badge */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '12px 24px',
                backgroundColor: 'rgba(124, 58, 237, 0.1)',
                border: '2px solid rgba(124, 58, 237, 0.3)',
                borderRadius: '12px',
                fontSize: '20px',
                color: '#7C3AED',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              {type}
            </div>
          </div>

          {/* Bottom Accent */}
          <div
            style={{
              position: 'absolute',
              bottom: '0',
              left: '0',
              right: '0',
              height: '8px',
              background: 'linear-gradient(90deg, #7C3AED 0%, #C4B5FD 50%, #7C3AED 100%)',
            }}
          />
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (error) {
    console.error('OG image generation error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return new Response(`Failed to generate the image: ${message}`, {
      status: 500,
    });
  }
}
