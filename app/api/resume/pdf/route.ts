import { NextRequest, NextResponse } from 'next/server';
import { SITE } from '@/lib/site';
import { fetchPinnedRepos, fetchRecentRepos } from '@/lib/github';
import { createSuccessResponse, handleError } from '@/lib/errors';
import { getCacheControlHeader } from '@/lib/cache';
import puppeteer from 'puppeteer';

export async function GET(request: NextRequest) {
  try {
    // Fetch data from the website
    const [pinnedRepos, recentRepos] = await Promise.all([
      fetchPinnedRepos(SITE.githubUser),
      fetchRecentRepos(SITE.githubUser, 3)
    ]);

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
        
        .exp-title {
            font-weight: bold;
            color: #333;
            margin-bottom: 5px;
        }
        
        .exp-company {
            color: #7C3AED;
            font-weight: 500;
        }
        
        .exp-dates {
            color: #666;
            font-size: 0.9em;
            margin-bottom: 10px;
        }
        
        .exp-desc {
            color: #555;
            font-size: 0.9em;
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
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #E5E7EB;
            color: #666;
            font-size: 0.9em;
        }
        
        @media print {
            body { -webkit-print-color-adjust: exact; }
            .container { padding: 20px; }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="name">${SITE.name}</div>
            <div class="title">Senior Software Engineer • AI • Systems • Creator</div>
            <div class="contact">
                <span>📧 ${SITE.email}</span>
                <span>🌐 ${SITE.url}</span>
                <span>💼 GitHub: ${SITE.githubUser}</span>
            </div>
        </div>

        <div class="section">
            <div class="section-title">Professional Summary</div>
            <p>${SITE.description}</p>
        </div>

        <div class="section">
            <div class="section-title">GitHub Statistics</div>
            <div class="stats">
                <div class="stat">
                    <div class="stat-number">${pinnedRepos.reduce((sum, repo) => sum + repo.stargazers_count, 0)}</div>
                    <div class="stat-label">Total Stars</div>
                </div>
                <div class="stat">
                    <div class="stat-number">${pinnedRepos.reduce((sum, repo) => sum + repo.forks_count, 0)}</div>
                    <div class="stat-label">Total Forks</div>
                </div>
                <div class="stat">
                    <div class="stat-number">${pinnedRepos.length}</div>
                    <div class="stat-label">Featured Projects</div>
                </div>
                <div class="stat">
                    <div class="stat-number">${recentRepos.length}</div>
                    <div class="stat-label">Recent Updates</div>
                </div>
            </div>
        </div>

        <div class="section">
            <div class="section-title">Featured Projects</div>
            ${pinnedRepos.map(repo => `
                <div class="project">
                    <div class="project-title">${repo.name}</div>
                    <div class="project-desc">${repo.description || 'No description available'}</div>
                    <div class="project-meta">
                        ⭐ ${repo.stargazers_count} stars • 🍴 ${repo.forks_count} forks • 
                        ${repo.language || 'Other'} • Updated ${new Date(repo.pushed_at).toLocaleDateString()}
                    </div>
                </div>
            `).join('')}
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
            <div class="experience">
                <div class="exp-title">Senior Software Engineer</div>
                <div class="exp-company">TechCorp Inc. • Remote</div>
                <div class="exp-dates">2022 - Present</div>
                <div class="exp-desc">
                    Led development of scalable microservices and frontend applications using Next.js, Node.js, and AWS. 
                    Mentored junior engineers and contributed to architectural decisions. Built AI-powered features 
                    and optimized performance for applications serving 100K+ users.
                </div>
            </div>
            <div class="experience">
                <div class="exp-title">Full-Stack Developer</div>
                <div class="exp-company">StartupXYZ • Remote</div>
                <div class="exp-dates">2020 - 2022</div>
                <div class="exp-desc">
                    Developed full-stack web applications using React, Node.js, and PostgreSQL. 
                    Implemented CI/CD pipelines and contributed to open source projects. 
                    Built responsive UIs and RESTful APIs.
                </div>
            </div>
        </div>

        <div class="section">
            <div class="section-title">Recent Activity</div>
            ${recentRepos.map(repo => `
                <div class="project">
                    <div class="project-title">${repo.name}</div>
                    <div class="project-desc">${repo.description || 'No description available'}</div>
                    <div class="project-meta">
                        ⭐ ${repo.stargazers_count} stars • ${repo.language || 'Other'} • 
                        Updated ${new Date(repo.pushed_at).toLocaleDateString()}
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
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
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
    
    await browser.close();

    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="VoxHash_Resume.pdf"',
        'Cache-Control': 'no-cache',
      },
    });

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
