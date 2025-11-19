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
  [key: string]: unknown;
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
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
          </head>
          <body style="margin: 0; padding: 0; background-color: #f5f7fa; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f5f7fa; padding: 40px 20px;">
              <tr>
                <td align="center">
                  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07); overflow: hidden;">
                    <!-- Header -->
                    <tr>
                      <td style="background: linear-gradient(135deg, #7C3AED 0%, #5B21B6 100%); padding: 32px 40px; text-align: center;">
                        <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 600; letter-spacing: -0.5px;">
                          📧 New Contact Form Submission
                        </h1>
                      </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                      <td style="padding: 40px;">
                        <!-- Name Field -->
                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 24px;">
                          <tr>
                            <td style="padding-bottom: 8px;">
                              <span style="color: #6B7280; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Name</span>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding: 12px 16px; background-color: #F9FAFB; border-radius: 8px; border-left: 3px solid #7C3AED;">
                              <span style="color: #111827; font-size: 16px; font-weight: 500;">${name}</span>
                            </td>
                          </tr>
                        </table>
                        
                        <!-- Email Field -->
                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 24px;">
                          <tr>
                            <td style="padding-bottom: 8px;">
                              <span style="color: #6B7280; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Email</span>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding: 12px 16px; background-color: #F9FAFB; border-radius: 8px; border-left: 3px solid #7C3AED;">
                              <a href="mailto:${email}" style="color: #7C3AED; font-size: 16px; font-weight: 500; text-decoration: none;">${email}</a>
                            </td>
                          </tr>
                        </table>
                        
                        <!-- Message Field -->
                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                          <tr>
                            <td style="padding-bottom: 8px;">
                              <span style="color: #6B7280; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Message</span>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding: 20px; background-color: #F9FAFB; border-radius: 8px; border-left: 3px solid #7C3AED;">
                              <div style="color: #374151; font-size: 15px; line-height: 1.6;">${message.replace(/\n/g, '<br>')}</div>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                      <td style="padding: 24px 40px; background-color: #F9FAFB; border-top: 1px solid #E5E7EB; text-align: center;">
                        <p style="margin: 0; color: #6B7280; font-size: 13px; line-height: 1.5;">
                          This message was sent from the contact form on<br>
                          <a href="${SITE.url}" style="color: #7C3AED; text-decoration: none; font-weight: 500;">${SITE.url}</a>
                        </p>
                        <p style="margin: 12px 0 0 0; color: #9CA3AF; font-size: 12px;">
                          You can reply directly to this email to respond to ${name}
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
          </html>
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
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
          </head>
          <body style="margin: 0; padding: 0; background-color: #f5f7fa; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f5f7fa; padding: 40px 20px;">
              <tr>
                <td align="center">
                  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07); overflow: hidden;">
                    <!-- Header -->
                    <tr>
                      <td style="background: linear-gradient(135deg, #7C3AED 0%, #5B21B6 100%); padding: 32px 40px; text-align: center;">
                        <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 600; letter-spacing: -0.5px;">
                          📧 New Contact Form Submission
                        </h1>
                      </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                      <td style="padding: 40px;">
                        <!-- Name Field -->
                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 24px;">
                          <tr>
                            <td style="padding-bottom: 8px;">
                              <span style="color: #6B7280; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Name</span>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding: 12px 16px; background-color: #F9FAFB; border-radius: 8px; border-left: 3px solid #7C3AED;">
                              <span style="color: #111827; font-size: 16px; font-weight: 500;">${name}</span>
                            </td>
                          </tr>
                        </table>
                        
                        <!-- Email Field -->
                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 24px;">
                          <tr>
                            <td style="padding-bottom: 8px;">
                              <span style="color: #6B7280; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Email</span>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding: 12px 16px; background-color: #F9FAFB; border-radius: 8px; border-left: 3px solid #7C3AED;">
                              <a href="mailto:${email}" style="color: #7C3AED; font-size: 16px; font-weight: 500; text-decoration: none;">${email}</a>
                            </td>
                          </tr>
                        </table>
                        
                        <!-- Message Field -->
                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                          <tr>
                            <td style="padding-bottom: 8px;">
                              <span style="color: #6B7280; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Message</span>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding: 20px; background-color: #F9FAFB; border-radius: 8px; border-left: 3px solid #7C3AED;">
                              <div style="color: #374151; font-size: 15px; line-height: 1.6;">${message.replace(/\n/g, '<br>')}</div>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                      <td style="padding: 24px 40px; background-color: #F9FAFB; border-top: 1px solid #E5E7EB; text-align: center;">
                        <p style="margin: 0; color: #6B7280; font-size: 13px; line-height: 1.5;">
                          This message was sent from the contact form on<br>
                          <a href="${SITE.url}" style="color: #7C3AED; text-decoration: none; font-weight: 500;">${SITE.url}</a>
                        </p>
                        <p style="margin: 12px 0 0 0; color: #9CA3AF; font-size: 12px;">
                          You can reply directly to this email to respond to ${name}
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
          </html>
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
