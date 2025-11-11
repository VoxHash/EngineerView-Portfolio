const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Import site config (simplified for Node.js)
const SITE = {
  name: process.env.SITE_NAME || 'VoxHash',
  email: process.env.CONTACT_EMAIL || 'contact@voxhash.dev',
  url: process.env.SITE_URL || 'https://voxhash.dev',
  githubUser: process.env.GITHUB_USERNAME || 'VoxHash',
  description: process.env.SITE_DESCRIPTION || 'Engineer • AI • Systems • Creator. I design and ship robust products end-to-end — from low-level systems to delightful UIs.'
};

// Mock GitHub data (you can fetch real data if needed)
const pinnedRepos = [
  {
    name: 'ForexSmartBot',
    description: 'A professional, modular forex trading bot with advanced risk management, multiple strategies, portfolio mode, and comprehensive backtesting capabilities.',
    stargazers_count: 8,
    forks_count: 5,
    language: 'Python',
    pushed_at: new Date('2025-11-05').toISOString()
  },
  {
    name: 'Telegram-Multi-Account-Message-Sender',
    description: 'Professional-grade desktop application for managing and sending messages across multiple Telegram accounts safely with advanced features like scheduling, spintax, media support, and compliance controls.',
    stargazers_count: 5,
    forks_count: 5,
    language: 'Python',
    pushed_at: new Date('2025-09-23').toISOString()
  },
  {
    name: 'vox-ai-chatbot',
    description: 'Vox AI Chatbot - A multi-platform AI chatbot with support for web, Discord, WhatsApp, Slack, and Telegram integrations',
    stargazers_count: 1,
    forks_count: 0,
    language: 'JavaScript',
    pushed_at: new Date('2025-09-17').toISOString()
  }
];

const recentRepos = pinnedRepos.slice(0, 3);

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
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Inter', 'Roboto', 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.7;
            color: #1a1a1a;
            background: #fff;
            font-size: 11pt;
        }
        
        .container {
            max-width: 850px;
            margin: 0 auto;
            padding: 35px 40px;
        }
        
        .header {
            margin-bottom: 35px;
            padding-bottom: 25px;
            border-bottom: 2px solid #000;
        }
        
        .name {
            font-size: 2.8em;
            font-weight: 700;
            color: #000;
            margin-bottom: 8px;
            letter-spacing: -0.5px;
        }
        
        .title {
            font-size: 1.1em;
            color: #4a4a4a;
            margin-bottom: 18px;
            font-weight: 500;
            letter-spacing: 0.3px;
        }
        
        .contact {
            display: flex;
            gap: 25px;
            flex-wrap: wrap;
            font-size: 0.85em;
            color: #666;
        }
        
        .contact span {
            display: flex;
            align-items: center;
            gap: 6px;
        }
        
        .section {
            margin-bottom: 28px;
        }
        
        .section-title {
            font-size: 1.3em;
            font-weight: 700;
            color: #000;
            margin-bottom: 18px;
            text-transform: uppercase;
            letter-spacing: 1px;
            border-bottom: 1px solid #e0e0e0;
            padding-bottom: 8px;
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
            background: transparent;
            padding: 0;
            border: none;
        }
        
        .skill-category h4 {
            color: #000;
            margin-bottom: 12px;
            font-size: 0.95em;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        
        .skill-list {
            list-style: none;
            font-size: 0.9em;
            margin: 0;
            padding: 0;
        }
        
        .skill-list li {
            margin-bottom: 6px;
            padding-left: 0;
            color: #4a4a4a;
        }
        
        .skill-list li:before {
            content: "▸";
            color: #000;
            margin-right: 8px;
            font-size: 0.7em;
        }
        
        .experience {
            margin-bottom: 24px;
            page-break-inside: avoid;
        }
        
        .exp-header {
            display: flex;
            justify-content: space-between;
            align-items: baseline;
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
        
        .exp-desc ul {
            margin-top: 8px;
            padding-left: 20px;
        }
        
        .exp-desc li {
            margin-bottom: 4px;
            color: #4a4a4a;
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
            <div class="experience">
                <div class="exp-header">
                    <div>
                        <div class="exp-title">CEO</div>
                        <div class="exp-company">VoxHash Technologies</div>
                    </div>
                    <div class="exp-dates">2018 - Present</div>
                </div>
                <div class="exp-desc">
                    Leading technical strategy and architecture for scalable web applications and AI-powered products. 
                    Designing end-to-end systems from infrastructure to user experience. Mentoring engineering teams and 
                    establishing technical best practices. Driving innovation in AI integration and modern web technologies.
                </div>
            </div>
            <div class="experience">
                <div class="exp-header">
                    <div>
                        <div class="exp-title">Co-Founder & CTO</div>
                        <div class="exp-company">LicenseChain</div>
                    </div>
                    <div class="exp-dates">2024 - Present</div>
                </div>
                <div class="exp-desc">
                    Architected and developed blockchain-based licensing platform with smart contract infrastructure. 
                    Built decentralized applications for intellectual property management. Led technical team in Web3 
                    development, implementing secure smart contracts and scalable blockchain solutions.
                </div>
            </div>
            <div class="experience">
                <div class="exp-header">
                    <div>
                        <div class="exp-title">Senior Software Consultant</div>
                        <div class="exp-company">Olyren Consulting</div>
                    </div>
                    <div class="exp-dates">2022 - Present</div>
                </div>
                <div class="exp-desc">
                    Delivered technical consulting to enterprise clients, designing and implementing custom software solutions. 
                    Optimized system performance and scalability for high-traffic applications. Led cross-functional technical 
                    teams and established architecture patterns for distributed systems.
                </div>
            </div>
            <div class="experience">
                <div class="exp-header">
                    <div>
                        <div class="exp-title">Co-Founder & Game Developer</div>
                        <div class="exp-company">Glytherra Studio</div>
                    </div>
                    <div class="exp-dates">2018 - Present</div>
                </div>
                <div class="exp-desc">
                    Developed game engines and interactive experiences with focus on real-time multiplayer systems. 
                    Architected scalable backend infrastructure for game services, implementing low-latency synchronization 
                    and state management. Built tools and pipelines for game development workflows.
                </div>
            </div>
        </div>


        <div class="footer">
            <p>Generated on ${new Date().toLocaleDateString()} • Visit ${SITE.url} for more information</p>
        </div>
    </div>
</body>
</html>
`;

async function generatePDF() {
  console.log('Starting PDF generation...');
  
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
    
    const publicDir = path.join(process.cwd(), 'public');
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }
    
    const pdfPath = path.join(publicDir, 'VoxHash_Resume.pdf');
    
    await page.pdf({
      path: pdfPath,
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
    
    console.log(`✅ PDF generated successfully at: ${pdfPath}`);
    console.log(`📄 File size: ${(fs.statSync(pdfPath).size / 1024).toFixed(2)} KB`);
    
  } catch (error) {
    console.error('❌ Error generating PDF:', error);
    process.exit(1);
  }
}

generatePDF();

