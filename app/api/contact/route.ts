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
          <body style="margin: 0; padding: 0; background-color: #fafafa; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #fafafa; padding: 40px 20px;">
              <tr>
                <td align="center">
                  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; border: 1px solid #e5e7eb; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.05); overflow: hidden;">
                    <!-- Header with gradient -->
                    <tr>
                      <td style="background: linear-gradient(135deg, #7C3AED 0%, #5B21B6 100%); padding: 40px; text-align: center; position: relative;">
                        <div style="display: inline-block; width: 48px; height: 48px; border-radius: 50%; background-color: rgba(255, 255, 255, 0.2); margin: 0 auto 16px; display: flex; align-items: center; justify-content: center; font-size: 24px;">📧</div>
                        <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 600; letter-spacing: -0.5px;">
                          New Contact Form Submission
                        </h1>
                      </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                      <td style="padding: 40px;">
                        <!-- Name Field with icon -->
                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 24px;">
                          <tr>
                            <td style="padding-bottom: 12px;">
                              <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                                <tr>
                                  <td style="width: 40px; vertical-align: middle;">
                                    <div style="width: 40px; height: 40px; border-radius: 50%; background-color: rgba(124, 58, 237, 0.1); display: flex; align-items: center; justify-content: center; font-size: 18px;">👤</div>
                                  </td>
                                  <td style="vertical-align: middle; padding-left: 12px;">
                                    <span style="color: #6b7280; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Name</span>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding: 16px; background: linear-gradient(to right, rgba(124, 58, 237, 0.05) 0%, rgba(196, 181, 253, 0.05) 100%); border-radius: 12px; border: 1px solid rgba(124, 58, 237, 0.1);">
                              <span style="color: #111827; font-size: 16px; font-weight: 500;">${name}</span>
                            </td>
                          </tr>
                        </table>
                        
                        <!-- Email Field with icon -->
                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 24px;">
                          <tr>
                            <td style="padding-bottom: 12px;">
                              <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                                <tr>
                                  <td style="width: 40px; vertical-align: middle;">
                                    <div style="width: 40px; height: 40px; border-radius: 50%; background-color: rgba(124, 58, 237, 0.1); display: flex; align-items: center; justify-content: center; font-size: 18px;">✉️</div>
                                  </td>
                                  <td style="vertical-align: middle; padding-left: 12px;">
                                    <span style="color: #6b7280; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Email</span>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding: 16px; background: linear-gradient(to right, rgba(124, 58, 237, 0.05) 0%, rgba(196, 181, 253, 0.05) 100%); border-radius: 12px; border: 1px solid rgba(124, 58, 237, 0.1);">
                              <a href="mailto:${email}" style="color: #7C3AED; font-size: 16px; font-weight: 500; text-decoration: none;">${email}</a>
                            </td>
                          </tr>
                        </table>
                        
                        <!-- Message Field with icon -->
                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                          <tr>
                            <td style="padding-bottom: 12px;">
                              <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                                <tr>
                                  <td style="width: 40px; vertical-align: middle;">
                                    <div style="width: 40px; height: 40px; border-radius: 50%; background-color: rgba(124, 58, 237, 0.1); display: flex; align-items: center; justify-content: center; font-size: 18px;">💬</div>
                                  </td>
                                  <td style="vertical-align: middle; padding-left: 12px;">
                                    <span style="color: #6b7280; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Message</span>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding: 20px; background: linear-gradient(to right, rgba(124, 58, 237, 0.05) 0%, rgba(196, 181, 253, 0.05) 100%); border-radius: 12px; border: 1px solid rgba(124, 58, 237, 0.1);">
                              <div style="color: #374151; font-size: 15px; line-height: 1.6;">${message.replace(/\n/g, '<br>')}</div>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                      <td style="padding: 24px 40px; background-color: #f9fafb; border-top: 1px solid #e5e7eb; text-align: center;">
                        <p style="margin: 0; color: #6b7280; font-size: 13px; line-height: 1.5;">
                          This message was sent from the contact form on<br>
                          <a href="${SITE.url}" style="color: #7C3AED; text-decoration: none; font-weight: 500;">${SITE.url}</a>
                        </p>
                        <p style="margin: 12px 0 0 0; color: #9ca3af; font-size: 12px;">
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

      // Send thank you email to the user
      const thankYouEmail = {
        from: 'Portfolio Contact <noreply@voxhash.dev>',
        to: [email],
        subject: `Thank you for contacting ${SITE.name}`,
        html: `
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
          </head>
          <body style="margin: 0; padding: 0; background-color: #fafafa; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #fafafa; padding: 40px 20px;">
              <tr>
                <td align="center">
                  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; border: 1px solid #e5e7eb; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.05); overflow: hidden;">
                    <!-- Header with gradient -->
                    <tr>
                      <td style="background: linear-gradient(135deg, #7C3AED 0%, #5B21B6 100%); padding: 40px; text-align: center;">
                        <div style="display: inline-block; width: 48px; height: 48px; border-radius: 50%; background-color: rgba(255, 255, 255, 0.2); margin: 0 auto 16px; display: flex; align-items: center; justify-content: center; font-size: 24px;">✉️</div>
                        <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 600; letter-spacing: -0.5px;">
                          Thank You for Reaching Out!
                        </h1>
                      </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                      <td style="padding: 40px;">
                        <p style="margin: 0 0 20px 0; color: #111827; font-size: 16px; line-height: 1.6;">
                          Hi ${name},
                        </p>
                        <p style="margin: 0 0 20px 0; color: #374151; font-size: 15px; line-height: 1.6;">
                          Thank you for contacting me through my portfolio website. I've received your message and I appreciate you taking the time to reach out.
                        </p>
                        <!-- Response Time Card -->
                        <div style="background: linear-gradient(to right, rgba(124, 58, 237, 0.1) 0%, rgba(196, 181, 253, 0.1) 100%); border: 1px solid rgba(124, 58, 237, 0.2); border-left: 4px solid #7C3AED; padding: 20px; margin: 24px 0; border-radius: 12px;">
                          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                            <tr>
                              <td style="width: 40px; vertical-align: top;">
                                <div style="width: 40px; height: 40px; border-radius: 50%; background-color: rgba(124, 58, 237, 0.15); display: flex; align-items: center; justify-content: center; font-size: 20px;">⏱️</div>
                              </td>
                              <td style="vertical-align: top; padding-left: 12px;">
                                <p style="margin: 0 0 8px 0; color: #7C3AED; font-size: 15px; line-height: 1.6; font-weight: 600;">
                                  Response Time
                                </p>
                                <p style="margin: 0; color: #374151; font-size: 14px; line-height: 1.6;">
                                  I typically respond to messages within <strong style="color: #5B21B6;">24 hours</strong>. For urgent matters, please mention it in your message and I'll prioritize your request.
                                </p>
                              </td>
                            </tr>
                          </table>
                        </div>
                        <p style="margin: 20px 0 0 0; color: #374151; font-size: 15px; line-height: 1.6;">
                          I look forward to connecting with you soon!
                        </p>
                        <p style="margin: 24px 0 0 0; color: #374151; font-size: 15px; line-height: 1.6;">
                          Best regards,<br>
                          <strong style="color: #111827;">${SITE.name}</strong>
                        </p>
                      </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                      <td style="padding: 24px 40px; background-color: #f9fafb; border-top: 1px solid #e5e7eb; text-align: center;">
                        <p style="margin: 0; color: #6b7280; font-size: 13px; line-height: 1.5;">
                          This is an automated confirmation email.<br>
                          Visit <a href="${SITE.url}" style="color: #7C3AED; text-decoration: none; font-weight: 500;">${SITE.url}</a>
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
      };

      // Send thank you email (don't fail if this fails)
      try {
        await resend.emails.send(thankYouEmail);
      } catch (thankYouError) {
        console.error('Failed to send thank you email:', thankYouError);
        // Continue anyway - the main email was sent successfully
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
          <body style="margin: 0; padding: 0; background-color: #fafafa; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #fafafa; padding: 40px 20px;">
              <tr>
                <td align="center">
                  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; border: 1px solid #e5e7eb; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.05); overflow: hidden;">
                    <!-- Header with gradient -->
                    <tr>
                      <td style="background: linear-gradient(135deg, #7C3AED 0%, #5B21B6 100%); padding: 40px; text-align: center; position: relative;">
                        <div style="display: inline-block; width: 48px; height: 48px; border-radius: 50%; background-color: rgba(255, 255, 255, 0.2); margin: 0 auto 16px; display: flex; align-items: center; justify-content: center; font-size: 24px;">📧</div>
                        <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 600; letter-spacing: -0.5px;">
                          New Contact Form Submission
                        </h1>
                      </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                      <td style="padding: 40px;">
                        <!-- Name Field with icon -->
                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 24px;">
                          <tr>
                            <td style="padding-bottom: 12px;">
                              <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                                <tr>
                                  <td style="width: 40px; vertical-align: middle;">
                                    <div style="width: 40px; height: 40px; border-radius: 50%; background-color: rgba(124, 58, 237, 0.1); display: flex; align-items: center; justify-content: center; font-size: 18px;">👤</div>
                                  </td>
                                  <td style="vertical-align: middle; padding-left: 12px;">
                                    <span style="color: #6b7280; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Name</span>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding: 16px; background: linear-gradient(to right, rgba(124, 58, 237, 0.05) 0%, rgba(196, 181, 253, 0.05) 100%); border-radius: 12px; border: 1px solid rgba(124, 58, 237, 0.1);">
                              <span style="color: #111827; font-size: 16px; font-weight: 500;">${name}</span>
                            </td>
                          </tr>
                        </table>
                        
                        <!-- Email Field with icon -->
                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 24px;">
                          <tr>
                            <td style="padding-bottom: 12px;">
                              <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                                <tr>
                                  <td style="width: 40px; vertical-align: middle;">
                                    <div style="width: 40px; height: 40px; border-radius: 50%; background-color: rgba(124, 58, 237, 0.1); display: flex; align-items: center; justify-content: center; font-size: 18px;">✉️</div>
                                  </td>
                                  <td style="vertical-align: middle; padding-left: 12px;">
                                    <span style="color: #6b7280; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Email</span>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding: 16px; background: linear-gradient(to right, rgba(124, 58, 237, 0.05) 0%, rgba(196, 181, 253, 0.05) 100%); border-radius: 12px; border: 1px solid rgba(124, 58, 237, 0.1);">
                              <a href="mailto:${email}" style="color: #7C3AED; font-size: 16px; font-weight: 500; text-decoration: none;">${email}</a>
                            </td>
                          </tr>
                        </table>
                        
                        <!-- Message Field with icon -->
                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                          <tr>
                            <td style="padding-bottom: 12px;">
                              <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                                <tr>
                                  <td style="width: 40px; vertical-align: middle;">
                                    <div style="width: 40px; height: 40px; border-radius: 50%; background-color: rgba(124, 58, 237, 0.1); display: flex; align-items: center; justify-content: center; font-size: 18px;">💬</div>
                                  </td>
                                  <td style="vertical-align: middle; padding-left: 12px;">
                                    <span style="color: #6b7280; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Message</span>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding: 20px; background: linear-gradient(to right, rgba(124, 58, 237, 0.05) 0%, rgba(196, 181, 253, 0.05) 100%); border-radius: 12px; border: 1px solid rgba(124, 58, 237, 0.1);">
                              <div style="color: #374151; font-size: 15px; line-height: 1.6;">${message.replace(/\n/g, '<br>')}</div>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                      <td style="padding: 24px 40px; background-color: #f9fafb; border-top: 1px solid #e5e7eb; text-align: center;">
                        <p style="margin: 0; color: #6b7280; font-size: 13px; line-height: 1.5;">
                          This message was sent from the contact form on<br>
                          <a href="${SITE.url}" style="color: #7C3AED; text-decoration: none; font-weight: 500;">${SITE.url}</a>
                        </p>
                        <p style="margin: 12px 0 0 0; color: #9ca3af; font-size: 12px;">
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
      
      // Send thank you email to the user
      const thankYouMailOptions = {
        from: process.env.SMTP_FROM || SITE.email,
        to: email,
        subject: `Thank you for contacting ${SITE.name}`,
        html: `
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
          </head>
          <body style="margin: 0; padding: 0; background-color: #fafafa; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #fafafa; padding: 40px 20px;">
              <tr>
                <td align="center">
                  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; border: 1px solid #e5e7eb; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.05); overflow: hidden;">
                    <!-- Header with gradient -->
                    <tr>
                      <td style="background: linear-gradient(135deg, #7C3AED 0%, #5B21B6 100%); padding: 40px; text-align: center;">
                        <div style="display: inline-block; width: 48px; height: 48px; border-radius: 50%; background-color: rgba(255, 255, 255, 0.2); margin: 0 auto 16px; display: flex; align-items: center; justify-content: center; font-size: 24px;">✉️</div>
                        <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 600; letter-spacing: -0.5px;">
                          Thank You for Reaching Out!
                        </h1>
                      </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                      <td style="padding: 40px;">
                        <p style="margin: 0 0 20px 0; color: #111827; font-size: 16px; line-height: 1.6;">
                          Hi ${name},
                        </p>
                        <p style="margin: 0 0 20px 0; color: #374151; font-size: 15px; line-height: 1.6;">
                          Thank you for contacting me through my portfolio website. I've received your message and I appreciate you taking the time to reach out.
                        </p>
                        <!-- Response Time Card -->
                        <div style="background: linear-gradient(to right, rgba(124, 58, 237, 0.1) 0%, rgba(196, 181, 253, 0.1) 100%); border: 1px solid rgba(124, 58, 237, 0.2); border-left: 4px solid #7C3AED; padding: 20px; margin: 24px 0; border-radius: 12px;">
                          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                            <tr>
                              <td style="width: 40px; vertical-align: top;">
                                <div style="width: 40px; height: 40px; border-radius: 50%; background-color: rgba(124, 58, 237, 0.15); display: flex; align-items: center; justify-content: center; font-size: 20px;">⏱️</div>
                              </td>
                              <td style="vertical-align: top; padding-left: 12px;">
                                <p style="margin: 0 0 8px 0; color: #7C3AED; font-size: 15px; line-height: 1.6; font-weight: 600;">
                                  Response Time
                                </p>
                                <p style="margin: 0; color: #374151; font-size: 14px; line-height: 1.6;">
                                  I typically respond to messages within <strong style="color: #5B21B6;">24 hours</strong>. For urgent matters, please mention it in your message and I'll prioritize your request.
                                </p>
                              </td>
                            </tr>
                          </table>
                        </div>
                        <p style="margin: 20px 0 0 0; color: #374151; font-size: 15px; line-height: 1.6;">
                          I look forward to connecting with you soon!
                        </p>
                        <p style="margin: 24px 0 0 0; color: #374151; font-size: 15px; line-height: 1.6;">
                          Best regards,<br>
                          <strong style="color: #111827;">${SITE.name}</strong>
                        </p>
                      </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                      <td style="padding: 24px 40px; background-color: #f9fafb; border-top: 1px solid #e5e7eb; text-align: center;">
                        <p style="margin: 0; color: #6b7280; font-size: 13px; line-height: 1.5;">
                          This is an automated confirmation email.<br>
                          Visit <a href="${SITE.url}" style="color: #7C3AED; text-decoration: none; font-weight: 500;">${SITE.url}</a>
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
      };

      // Send thank you email (don't fail if this fails)
      try {
        await transporter.sendMail(thankYouMailOptions);
      } catch (thankYouError) {
        console.error('Failed to send thank you email:', thankYouError);
        // Continue anyway - the main email was sent successfully
      }
      
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
