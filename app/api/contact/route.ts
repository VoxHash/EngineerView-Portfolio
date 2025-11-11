import { NextRequest, NextResponse } from 'next/server';
import { SITE } from '@/lib/site';
import { createErrorResponse, createSuccessResponse, handleError, validateEmail, validateRequiredFields, ErrorCode } from '@/lib/errors';
import { getCacheControlHeader } from '@/lib/cache';
import { withRateLimit } from '@/lib/rate-limit';
import { getSecurityHeaders, getClientIP, sanitizeInput, validateRequestSize } from '@/lib/security';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

// Rate limit configuration for contact form
const rateLimitConfig = {
  maxRequests: 5, // 5 requests per window
  windowMs: 15 * 60 * 1000, // 15 minutes
  identifier: 'contact-form',
};

export async function POST(request: NextRequest) {
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

    // Validate request size
    const contentLength = request.headers.get('content-length');
    if (!validateRequestSize(contentLength, 10 * 1024)) { // 10KB max
      return NextResponse.json(
        createErrorResponse(
          ErrorCode.VALIDATION_ERROR,
          'Request body too large',
          { maxSize: '10KB' }
        ),
        {
          status: 413,
          headers: {
            ...getSecurityHeaders(),
            'Cache-Control': getCacheControlHeader('REALTIME'),
          },
        }
      );
    }

    let body: ContactFormData;
    
    try {
      body = await request.json();
    } catch (parseError) {
      const error = createErrorResponse(
        ErrorCode.VALIDATION_ERROR,
        'Invalid JSON in request body',
        { parseError: parseError instanceof Error ? parseError.message : String(parseError) }
      );
      return NextResponse.json(error, { 
        status: error.statusCode,
        headers: { 
          ...getSecurityHeaders(),
          'Cache-Control': getCacheControlHeader('REALTIME') 
        }
      });
    }

    // Sanitize inputs
    body.name = sanitizeInput(body.name);
    body.email = sanitizeInput(body.email);
    body.message = sanitizeInput(body.message);

    const { name, email, message } = body;

    // Validate required fields
    const validation = validateRequiredFields(body, ['name', 'email', 'message']);
    if (!validation.isValid) {
      const error = createErrorResponse(
        ErrorCode.VALIDATION_ERROR,
        'All fields are required',
        { missingFields: validation.missingFields }
      );
      return NextResponse.json(error, { 
        status: error.statusCode,
        headers: { 
          ...getSecurityHeaders(),
          'Cache-Control': getCacheControlHeader('REALTIME') 
        }
      });
    }

    // Validate email format
    if (!validateEmail(email)) {
      const error = createErrorResponse(
        ErrorCode.VALIDATION_ERROR,
        'Invalid email format',
        { field: 'email', value: email }
      );
      return NextResponse.json(error, { 
        status: error.statusCode,
        headers: { 
          ...getSecurityHeaders(),
          'Cache-Control': getCacheControlHeader('REALTIME') 
        }
      });
    }

    // For now, we'll use a simple email service
    // In production, you'd want to use a service like SendGrid, Resend, or Nodemailer
    
    // Option 1: Using Resend (recommended for production)
    if (process.env.RESEND_API_KEY) {
      const { Resend } = await import('resend');
      const resend = new Resend(process.env.RESEND_API_KEY);

      const emailData = {
        from: 'Portfolio Contact <noreply@voxhash.dev>',
        to: [SITE.email],
        subject: `New Contact Form Submission from ${name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #7C3AED;">New Contact Form Submission</h2>
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Message:</strong></p>
              <div style="background: white; padding: 15px; border-radius: 4px; margin-top: 10px;">
                ${message.replace(/\n/g, '<br>')}
              </div>
            </div>
            <p style="color: #666; font-size: 14px;">
              This message was sent from the contact form on ${SITE.url}
            </p>
          </div>
        `,
        reply_to: email,
      };

      const result = await resend.emails.send(emailData);
      
      if (result.error) {
        console.error('Resend error:', result.error);
        throw new Error('Failed to send email');
      }

      const response = createSuccessResponse(
        { id: result.data?.id },
        'Email sent successfully'
      );
      return NextResponse.json(response, { 
        status: 200,
        headers: { 
          ...getSecurityHeaders(),
          ...rateLimitCheck.headers,
          'Cache-Control': getCacheControlHeader('REALTIME') 
        }
      });
    }

    // Option 2: Using Nodemailer (alternative)
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      const nodemailer = await import('nodemailer');
      
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      const mailOptions = {
        from: process.env.SMTP_FROM || SITE.email,
        to: SITE.email,
        subject: `New Contact Form Submission from ${name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #7C3AED;">New Contact Form Submission</h2>
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Message:</strong></p>
              <div style="background: white; padding: 15px; border-radius: 4px; margin-top: 10px;">
                ${message.replace(/\n/g, '<br>')}
              </div>
            </div>
            <p style="color: #666; font-size: 14px;">
              This message was sent from the contact form on ${SITE.url}
            </p>
          </div>
        `,
        replyTo: email,
      };

      await transporter.sendMail(mailOptions);
      
      const response = createSuccessResponse(null, 'Email sent successfully');
      return NextResponse.json(response, { 
        status: 200,
        headers: { 
          ...getSecurityHeaders(),
          ...rateLimitCheck.headers,
          'Cache-Control': getCacheControlHeader('REALTIME') 
        }
      });
    }

    // Option 3: Fallback - Log to console and return success (for development)
    console.log('Contact Form Submission:', {
      name,
      email,
      message,
      timestamp: new Date().toISOString(),
    });

    // In development, we'll just log the data
          const response = createSuccessResponse(
            { mode: 'development' },
            'Message received! (Development mode - check console logs)'
          );
          return NextResponse.json(response, { 
            status: 200,
            headers: { 
              ...getSecurityHeaders(),
              ...rateLimitCheck.headers,
              'Cache-Control': getCacheControlHeader('REALTIME') 
            }
          });

        } catch (error) {
          console.error('Contact form error:', error);
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
