import { NextRequest, NextResponse } from 'next/server';
import { SITE } from '@/lib/site';
import { handleError } from '@/lib/errors';
import { getCacheControlHeader } from '@/lib/cache';
import { timelineData } from '@/data/timeline';
import puppeteer from 'puppeteer';

// Force dynamic rendering - this route should never be statically generated
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  try {
    // Filter timeline data to only include work experience
    const workExperience = timelineData.filter(item => item.type === 'work');

    // Generate HTML content for the PDF
    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${SITE.name} - Resume</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            background: #fff;
        }
        
        .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 40px;
        }
        
        .header {
            text-align: center;
            margin-bottom: 40px;
            border-bottom: 3px solid #7C3AED;
            padding-bottom: 20px;
        }
        
        .name {
            font-size: 2.5em;
            font-weight: bold;
            color: #7C3AED;
            margin-bottom: 10px;
        }
        
        .title {
            font-size: 1.2em;
            color: #666;
            margin-bottom: 20px;
        }
        
        .contact {
            display: flex;
            justify-content: center;
            gap: 30px;
            flex-wrap: wrap;
            font-size: 0.9em;
            color: #666;
        }
        
        .section {
            margin-bottom: 30px;
        }
        
        .section-title {
            font-size: 1.4em;
            font-weight: bold;
            color: #7C3AED;
            margin-bottom: 15px;
            border-bottom: 2px solid #E5E7EB;
            padding-bottom: 5px;
        }
        
        .project {
            margin-bottom: 15px;
            padding: 10px;
            background: #F9FAFB;
            border-left: 4px solid #7C3AED;
        }
        
        .project-title {
            font-weight: bold;
            color: #333;
            margin-bottom: 5px;
        }
        
        .project-desc {
            color: #666;
            font-size: 0.9em;
            margin-bottom: 5px;
        }
        
        .project-meta {
            font-size: 0.8em;
            color: #888;
        }
        
        .skills {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
        }
        
        .skill-category {
            background: #F3F4F6;
            padding: 15px;
            border-radius: 8px;
        }
        
        .skill-category h4 {
            color: #7C3AED;
            margin-bottom: 10px;
            font-size: 1.1em;
        }
        
        .skill-list {
            list-style: none;
            font-size: 0.9em;
        }
        
        .skill-list li {
            margin-bottom: 5px;
            padding-left: 15px;
            position: relative;
        }
        
        .skill-list li:before {
            content: "•";
            color: #7C3AED;
            position: absolute;
            left: 0;
        }
        
        .experience {
            margin-bottom: 20px;
        }
        
        .exp-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 8px;
        }
        
        .exp-title {
            font-weight: 700;
            color: #000;
            font-size: 1.05em;
        }
        
        .exp-company {
            color: #000;
            font-weight: 600;
            font-size: 0.95em;
        }
        
        .exp-dates {
            color: #666;
            font-size: 0.85em;
            font-weight: 500;
            white-space: nowrap;
        }
        
        .exp-desc {
            color: #4a4a4a;
            font-size: 0.9em;
            line-height: 1.6;
            margin-top: 6px;
        }
        
        .stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }
        
        .stat {
            text-align: center;
            padding: 15px;
            background: #F9FAFB;
            border-radius: 8px;
        }
        
        .stat-number {
            font-size: 1.5em;
            font-weight: bold;
            color: #7C3AED;
        }
        
        .stat-label {
            font-size: 0.9em;
            color: #666;
        }
        
        .footer {
            text-align: center;
            margin-top: 35px;
            padding-top: 20px;
            border-top: 1px solid #e0e0e0;
            color: #999;
            font-size: 0.75em;
        }
        
        @media print {
            body { 
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
            }
            .container { 
                padding: 20px 30px;
            }
            .section {
                page-break-inside: avoid;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="name">${SITE.name}</div>
            <div class="title">Senior Software Engineer</div>
            <div class="contact">
                <span>${SITE.email}</span>
                <span>${SITE.url}</span>
                <span>github.com/${SITE.githubUser}</span>
            </div>
        </div>

        <div class="section">
            <div class="section-title">Technical Skills</div>
            <div class="skills">
                <div class="skill-category">
                    <h4>Frontend Development</h4>
                    <ul class="skill-list">
                        <li>Next.js, React, TypeScript</li>
                        <li>Tailwind CSS, Styled Components</li>
                        <li>Framer Motion, Animation</li>
                        <li>Responsive Design</li>
                    </ul>
                </div>
                <div class="skill-category">
                    <h4>Backend Development</h4>
                    <ul class="skill-list">
                        <li>Node.js, Python, Go</li>
                        <li>PostgreSQL, MongoDB, Redis</li>
                        <li>REST APIs, GraphQL</li>
                        <li>Microservices Architecture</li>
                    </ul>
                </div>
                <div class="skill-category">
                    <h4>AI & Machine Learning</h4>
                    <ul class="skill-list">
                        <li>OpenAI, LangChain</li>
                        <li>Vector Databases</li>
                        <li>Prompt Engineering</li>
                        <li>AI Integration</li>
                    </ul>
                </div>
                <div class="skill-category">
                    <h4>DevOps & Cloud</h4>
                    <ul class="skill-list">
                        <li>AWS, Vercel, Docker</li>
                        <li>CI/CD Pipelines</li>
                        <li>Infrastructure as Code</li>
                        <li>Performance Optimization</li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="section">
            <div class="section-title">Professional Experience</div>
            ${workExperience.map(exp => `
                <div class="experience">
                    <div class="exp-header">
                        <div>
                            <div class="exp-title">${exp.title}</div>
                            <div class="exp-company">${exp.company || ''}</div>
                        </div>
                        <div class="exp-dates">${exp.date}</div>
                    </div>
                    <div class="exp-desc">
                        ${exp.description}
                    </div>
                </div>
            `).join('')}
        </div>

        <div class="footer">
            <p>Generated on ${new Date().toLocaleDateString()} • Visit ${SITE.url} for more information</p>
        </div>
    </div>
</body>
</html>
    `;

    // Generate PDF using Puppeteer
    // Check if we're in a build environment where Puppeteer might not work
    const isBuildTime = process.env.NEXT_PHASE === 'phase-production-build';
    
    if (isBuildTime) {
      // During build, return a placeholder or skip PDF generation
      return NextResponse.json(
        { 
          error: 'PDF generation is not available during build time. Please access this endpoint at runtime.',
          message: 'This endpoint generates PDFs on-demand and cannot be pre-rendered.'
        },
        { status: 503 }
      );
    }

    let browser;
    try {
      browser = await puppeteer.launch({
        headless: true,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-accelerated-2d-canvas',
          '--no-first-run',
          '--no-zygote',
          '--single-process',
          '--disable-gpu'
        ],
        // Use system Chrome if available, otherwise use bundled
        executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined,
      });
    } catch (error) {
      console.error('Failed to launch Puppeteer:', error);
      return NextResponse.json(
        {
          error: 'PDF generation service is currently unavailable',
          message: 'Chrome/Chromium is not available in this environment. This is expected in some CI/CD environments.',
          details: error instanceof Error ? error.message : 'Unknown error'
        },
        { status: 503 }
      );
    }
    
    let page;
    try {
      page = await browser.newPage();
      await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
      
      const pdfBuffer = await page.pdf({
        format: 'A4',
        printBackground: true,
        margin: {
          top: '20mm',
          right: '20mm',
          bottom: '20mm',
          left: '20mm'
        }
      });
      
      return new NextResponse(pdfBuffer, {
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': 'attachment; filename="VoxHash_Resume.pdf"',
          'Cache-Control': 'no-cache',
        },
      });
    } finally {
      // Always close browser, even if PDF generation fails
      if (page) {
        try {
          await page.close();
        } catch (e) {
          console.error('Error closing page:', e);
        }
      }
      if (browser) {
        try {
          await browser.close();
        } catch (e) {
          console.error('Error closing browser:', e);
        }
      }
    }

  } catch (error) {
    console.error('Error generating PDF resume:', error);
    const errorResponse = handleError(error);
    return NextResponse.json(
      { 
        success: false,
        error: errorResponse.error,
        message: errorResponse.message,
        timestamp: errorResponse.timestamp
      },
      { 
        status: errorResponse.statusCode,
        headers: { 
          'Cache-Control': getCacheControlHeader('REALTIME'),
          'Content-Type': 'application/json'
        }
      }
    );
  }
}
