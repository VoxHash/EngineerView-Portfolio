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
                <div class="exp-title">CEO</div>
                <div class="exp-company">VoxHash Technologies • Remote</div>
                <div class="exp-dates">2018 - Present</div>
                <div class="exp-desc">
                    Building scalable web applications and AI-powered products. Leading technical architecture decisions and mentoring junior developers. 
                    Technologies: Next.js, TypeScript, Python, AWS, AI/ML.
                </div>
            </div>
            <div class="experience">
                <div class="exp-title">Co-Founder & Game Developer</div>
                <div class="exp-company">Glytherra Studio • Remote</div>
                <div class="exp-dates">2018 - Present</div>
                <div class="exp-desc">
                    Led development of game engines and interactive experiences. Architected scalable backend systems for multiplayer games and real-time synchronization. 
                    Technologies: Game Development, Unity, C#, Multiplayer, Backend Systems, Real-time.
                </div>
            </div>
            <div class="experience">
                <div class="exp-title">Senior Software Consultant</div>
                <div class="exp-company">Olyren Consulting • Remote</div>
                <div class="exp-dates">2022 - Present</div>
                <div class="exp-desc">
                    Provided technical consulting services to enterprise clients. Designed and implemented custom software solutions, optimized system performance, and led technical teams. 
                    Focus: Consulting, Enterprise Solutions, System Architecture, Performance Optimization, Team Leadership.
                </div>
            </div>
            <div class="experience">
                <div class="exp-title">Co-Founder & CTO</div>
                <div class="exp-company">LicenseChain • Remote</div>
                <div class="exp-dates">2024 - Present</div>
                <div class="exp-desc">
                    Developed blockchain-based licensing solutions and smart contract systems. Built decentralized applications for intellectual property management. 
                    Technologies: Blockchain, Smart Contracts, Web3, Solidity, React, Node.js.
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

