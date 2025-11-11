# Example 2: Advanced Configuration

This example shows how to set up an advanced EnginerView Portfolio with custom features, analytics, and integrations.

## 📋 Prerequisites

- Completed [Example 1](example-01.md)
- GitHub personal access token
- Google Analytics 4 account (optional)
- Resend account for email (optional)

## 🚀 Advanced Setup

### Step 1: Environment Configuration

Create a comprehensive `.env.local`:

```env
# GitHub Integration
GITHUB_USERNAME=your-github-username
GITHUB_TOKEN=ghp_your_github_token_here

# Contact Information
CONTACT_EMAIL=your-email@domain.com
SITE_URL=https://your-domain.com

# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Email Service
RESEND_API_KEY=re_your_resend_api_key
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Content Integration
MEDIUM_USERNAME=your-medium-username
LINKEDIN_USERNAME=your-linkedin-username

# Social Media
SOCIAL_HANDLE=your-social-handle
```

### Step 2: Advanced Site Configuration

Edit `lib/site.ts` with comprehensive settings:

```typescript
export const siteConfig = {
  name: "John Doe",
  handle: "@johndoe",
  description: "Senior Full-Stack Developer | React Expert | Open Source Contributor",
  url: "https://johndoe.dev",
  email: "john@johndoe.dev",
  keywords: [
    "developer", "portfolio", "nextjs", "typescript", "react",
    "full-stack", "frontend", "backend", "javascript", "nodejs"
  ],
  social: {
    twitter: "https://twitter.com/johndoe",
    github: "https://github.com/johndoe",
    linkedin: "https://linkedin.com/in/johndoe",
    instagram: "https://instagram.com/johndoe",
    youtube: "https://youtube.com/@johndoe",
    medium: "https://medium.com/@johndoe",
    dev: "https://dev.to/johndoe",
    codepen: "https://codepen.io/johndoe",
  },
  author: {
    name: "John Doe",
    email: "john@johndoe.dev",
    url: "https://johndoe.dev",
    bio: "Passionate developer with 5+ years of experience building scalable web applications",
    location: "San Francisco, CA",
    company: "TechCorp",
    jobTitle: "Senior Full-Stack Developer",
  },
  creator: {
    name: "John Doe",
    email: "john@johndoe.dev",
    url: "https://johndoe.dev",
  },
  seo: {
    title: "John Doe - Senior Full-Stack Developer",
    description: "Portfolio of John Doe, a senior full-stack developer specializing in React, Node.js, and modern web technologies",
    keywords: ["developer", "portfolio", "nextjs", "typescript", "react"],
    openGraph: {
      type: "website",
      locale: "en_US",
      url: "https://johndoe.dev",
      siteName: "John Doe Portfolio",
      title: "John Doe - Senior Full-Stack Developer",
      description: "Portfolio of John Doe, a senior full-stack developer",
      images: [
        {
          url: "https://johndoe.dev/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "John Doe - Senior Full-Stack Developer",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      creator: "@johndoe",
      site: "@johndoe",
    },
  },
  navigation: {
    main: [
      { name: "About", href: "/about" },
      { name: "Projects", href: "/projects" },
      { name: "Blog", href: "/blog" },
      { name: "Speaking", href: "/speaking" },
      { name: "Uses", href: "/uses" },
      { name: "Resume", href: "/resume" },
      { name: "Contact", href: "/contact" },
    ],
    footer: [
      { name: "Privacy", href: "/privacy" },
      { name: "Terms", href: "/terms" },
      { name: "Sitemap", href: "/sitemap.xml" },
    ],
  },
  features: {
    blog: true,
    projects: true,
    speaking: true,
    uses: true,
    resume: true,
    metrics: true,
    feed: true,
    analytics: true,
    rss: true,
    sitemap: true,
  },
};
```

### Step 3: Advanced Theme Configuration

Edit `tailwind.config.ts` with custom theme:

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49',
        },
        secondary: {
          50: '#fdf4ff',
          100: '#fae8ff',
          200: '#f5d0fe',
          300: '#f0abfc',
          400: '#e879f9',
          500: '#d946ef',
          600: '#c026d3',
          700: '#a21caf',
          800: '#86198f',
          900: '#701a75',
          950: '#4a044e',
        },
        accent: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
        },
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
          950: '#0a0a0a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        display: ['Cal Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      animation: {
        'gradient': 'gradient 15s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'bounce-slow': 'bounce 3s infinite',
        'pulse-slow': 'pulse 3s infinite',
        'spin-slow': 'spin 3s linear infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
      },
      keyframes: {
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' }
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(59, 130, 246, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(59, 130, 246, 0.8)' }
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' }
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-mesh': 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
        'hero-pattern': "url('/hero-pattern.svg')",
      },
      boxShadow: {
        'glow': '0 0 20px rgba(59, 130, 246, 0.3)',
        'glow-lg': '0 0 40px rgba(59, 130, 246, 0.4)',
        'inner-glow': 'inset 0 0 20px rgba(59, 130, 246, 0.1)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
  ],
};

export default config;
```

### Step 4: Advanced Component Configuration

#### Custom Hero Component

Create `components/AdvancedHero.tsx`:

```typescript
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Github, Twitter, Linkedin, Mail } from 'lucide-react';

export default function AdvancedHero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-20" />
      
      {/* Mouse Follow Effect */}
      <div
        className="absolute w-96 h-96 bg-primary-500/10 rounded-full blur-3xl pointer-events-none"
        style={{
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
          transition: 'all 0.1s ease-out',
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
            John Doe
          </h1>
          
          <motion.p
            className="text-xl md:text-2xl text-neutral-600 dark:text-neutral-300 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Senior Full-Stack Developer
          </motion.p>
          
          <motion.p
            className="text-lg text-neutral-500 dark:text-neutral-400 mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Building amazing web experiences with React, Node.js, and modern technologies.
            Passionate about clean code, user experience, and continuous learning.
          </motion.p>
          
          {/* Social Links */}
          <motion.div
            className="flex justify-center space-x-6 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <a
              href="https://github.com/johndoe"
              className="p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-primary-500/20 transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-6 h-6" />
            </a>
            <a
              href="https://twitter.com/johndoe"
              className="p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-primary-500/20 transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="w-6 h-6" />
            </a>
            <a
              href="https://linkedin.com/in/johndoe"
              className="p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-primary-500/20 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a
              href="mailto:john@johndoe.dev"
              className="p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-primary-500/20 transition-colors"
              aria-label="Email"
            >
              <Mail className="w-6 h-6" />
            </a>
          </motion.div>
          
          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <a
              href="/projects"
              className="px-8 py-4 bg-primary-500 text-white rounded-lg font-semibold hover:bg-primary-600 transition-colors shadow-glow"
            >
              View My Work
            </a>
            <a
              href="/contact"
              className="px-8 py-4 border-2 border-primary-500 text-primary-500 rounded-lg font-semibold hover:bg-primary-500 hover:text-white transition-colors"
            >
              Get In Touch
            </a>
          </motion.div>
        </motion.div>
        
        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <ChevronDown className="w-8 h-8 text-neutral-400 animate-bounce" />
        </motion.div>
      </div>
    </div>
  );
}
```

#### Advanced Project Card

Create `components/AdvancedProjectCard.tsx`:

```typescript
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Star, Fork, Eye } from 'lucide-react';

interface Project {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage?: string;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  language: string;
  topics: string[];
  created_at: string;
  updated_at: string;
}

interface AdvancedProjectCardProps {
  project: Project;
  index: number;
}

export default function AdvancedProjectCard({ project, index }: AdvancedProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative bg-white dark:bg-neutral-900 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-secondary-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Content */}
      <div className="relative p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2 group-hover:text-primary-500 transition-colors">
              {project.name}
            </h3>
            <p className="text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed">
              {project.description || 'No description available'}
            </p>
          </div>
          
          {/* Language Badge */}
          {project.language && (
            <span className="ml-4 px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 text-xs font-medium rounded-full">
              {project.language}
            </span>
          )}
        </div>
        
        {/* Topics */}
        {project.topics.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {project.topics.slice(0, 3).map((topic) => (
              <span
                key={topic}
                className="px-2 py-1 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 text-xs rounded-md"
              >
                {topic}
              </span>
            ))}
            {project.topics.length > 3 && (
              <span className="px-2 py-1 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 text-xs rounded-md">
                +{project.topics.length - 3} more
              </span>
            )}
          </div>
        )}
        
        {/* Stats */}
        <div className="flex items-center space-x-4 mb-6 text-sm text-neutral-500 dark:text-neutral-400">
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4" />
            <span>{project.stargazers_count}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Fork className="w-4 h-4" />
            <span>{project.forks_count}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Eye className="w-4 h-4" />
            <span>{project.watchers_count}</span>
          </div>
        </div>
        
        {/* Actions */}
        <div className="flex items-center space-x-3">
          <a
            href={project.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 px-4 py-2 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded-lg hover:bg-primary-100 dark:hover:bg-primary-900 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
          >
            <Github className="w-4 h-4" />
            <span>Code</span>
          </a>
          
          {project.homepage && (
            <a
              href={project.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Live Demo</span>
            </a>
          )}
        </div>
      </div>
      
      {/* Hover Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        initial={false}
        animate={{ opacity: isHovered ? 1 : 0 }}
      />
    </motion.div>
  );
}
```

### Step 5: Analytics Integration

#### Google Analytics 4 Setup

The Analytics component is already set up to use Google Analytics 4. Simply add your GA4 Measurement ID to your environment variables:

```env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

The component automatically:
- Loads the Google Analytics script
- Tracks page views on route changes
- Provides event tracking functions via `useAnalytics` hook

Example usage:

```typescript
'use client';

import { useAnalytics } from '@/components/Analytics';

export default function MyComponent() {
  const { trackEvent, trackProjectView, trackContactForm, trackDownload } = useAnalytics();

  const handleProjectClick = (projectName: string) => {
    trackProjectView(projectName);
  };

  const handleContact = (formType: string) => {
    trackContactForm(formType);
  };

  const handleDownload = (fileType: string) => {
    trackDownload(fileType);
  };

  return (
    // Your component JSX
  );
}
```

### Step 6: Advanced Email Integration

#### Enhanced Contact Form

Create `app/api/contact/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { Resend } from 'resend';
import nodemailer from 'nodemailer';

const resend = new Resend(process.env.RESEND_API_KEY);

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name too long'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(1, 'Subject is required').max(200, 'Subject too long'),
  message: z.string().min(10, 'Message too short').max(2000, 'Message too long'),
  company: z.string().optional(),
  phone: z.string().optional(),
  budget: z.string().optional(),
  timeline: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = contactSchema.parse(body);

    // Send email using Resend (preferred)
    if (process.env.RESEND_API_KEY) {
      const { data, error } = await resend.emails.send({
        from: 'Portfolio Contact <noreply@yourdomain.com>',
        to: [process.env.CONTACT_EMAIL!],
        subject: `New Contact Form Submission: ${validatedData.subject}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${validatedData.name}</p>
          <p><strong>Email:</strong> ${validatedData.email}</p>
          <p><strong>Subject:</strong> ${validatedData.subject}</p>
          ${validatedData.company ? `<p><strong>Company:</strong> ${validatedData.company}</p>` : ''}
          ${validatedData.phone ? `<p><strong>Phone:</strong> ${validatedData.phone}</p>` : ''}
          ${validatedData.budget ? `<p><strong>Budget:</strong> ${validatedData.budget}</p>` : ''}
          ${validatedData.timeline ? `<p><strong>Timeline:</strong> ${validatedData.timeline}</p>` : ''}
          <p><strong>Message:</strong></p>
          <p>${validatedData.message.replace(/\n/g, '<br>')}</p>
        `,
      });

      if (error) {
        console.error('Resend error:', error);
        throw new Error('Failed to send email via Resend');
      }

      return NextResponse.json({
        success: true,
        message: 'Thank you for your message! I will get back to you soon.',
        messageId: data?.id,
      });
    }

    // Fallback to SMTP
    if (process.env.SMTP_HOST) {
      const transporter = nodemailer.createTransporter({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: process.env.CONTACT_EMAIL,
        subject: `New Contact Form Submission: ${validatedData.subject}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${validatedData.name}</p>
          <p><strong>Email:</strong> ${validatedData.email}</p>
          <p><strong>Subject:</strong> ${validatedData.subject}</p>
          ${validatedData.company ? `<p><strong>Company:</strong> ${validatedData.company}</p>` : ''}
          ${validatedData.phone ? `<p><strong>Phone:</strong> ${validatedData.phone}</p>` : ''}
          ${validatedData.budget ? `<p><strong>Budget:</strong> ${validatedData.budget}</p>` : ''}
          ${validatedData.timeline ? `<p><strong>Timeline:</strong> ${validatedData.timeline}</p>` : ''}
          <p><strong>Message:</strong></p>
          <p>${validatedData.message.replace(/\n/g, '<br>')}</p>
        `,
      });

      return NextResponse.json({
        success: true,
        message: 'Thank you for your message! I will get back to you soon.',
      });
    }

    throw new Error('No email service configured');

  } catch (error) {
    console.error('Contact form error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation error',
          details: error.errors,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to send message. Please try again later.',
      },
      { status: 500 }
    );
  }
}
```

## 🚀 Deployment

### Deploy to Vercel with Advanced Features

1. **Environment Variables in Vercel**:
   ```
   GITHUB_USERNAME=your-github-username
   GITHUB_TOKEN=ghp_your_github_token
   CONTACT_EMAIL=your-email@domain.com
   SITE_URL=https://your-vercel-app.vercel.app
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   RESEND_API_KEY=re_your_resend_api_key
   ```

2. **Deploy**:
   ```bash
   git add .
   git commit -m "Advanced portfolio configuration"
   git push origin main
   ```

## 📊 Monitoring and Analytics

### Set up monitoring:

1. **Google Analytics 4**: Track visitor behavior
2. **Vercel Analytics**: Monitor performance
3. **Error Tracking**: Set up Sentry or similar
4. **Uptime Monitoring**: Use UptimeRobot or similar

## 🔧 Troubleshooting

### Common Issues:

1. **Framer Motion SSR issues**: Use dynamic imports
2. **Analytics not tracking**: Check domain configuration
3. **Email not sending**: Verify API keys and SMTP settings
4. **Build errors**: Check TypeScript types and imports

## 📚 Next Steps

1. **Add more features**: Blog system, project filtering, search
2. **Optimize performance**: Image optimization, caching, CDN
3. **Add tests**: Unit tests, integration tests, E2E tests
4. **Monitor and iterate**: Use analytics to improve the portfolio

## 🆘 Getting Help

- **Documentation**: [Complete Guide](../getting-started.md)
- **Issues**: [GitHub Issues](https://github.com/voxhash/engineerview-portfolio/issues)
- **Discussions**: [GitHub Discussions](https://github.com/voxhash/engineerview-portfolio/discussions)
- **Email**: contact@voxhash.dev

---

**Your advanced portfolio is ready! 🚀**
