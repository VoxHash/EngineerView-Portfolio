# Configuration Guide

This guide covers all configuration options available in EnginerView Portfolio, from basic setup to advanced customization.

## 📋 Table of Contents

- [Environment Variables](#environment-variables)
- [Site Configuration](#site-configuration)
- [Theme Configuration](#theme-configuration)
- [Content Configuration](#content-configuration)
- [Component Configuration](#component-configuration)
- [Build Configuration](#build-configuration)
- [Deployment Configuration](#deployment-configuration)

## 🔧 Environment Variables

### Required Variables

```env
# GitHub Integration
GITHUB_USERNAME=your-github-username
GITHUB_TOKEN=your-github-token

# Contact Information
CONTACT_EMAIL=your-email@domain.com
SITE_URL=https://your-domain.com
```

### Optional Variables

```env
# Social Media
SOCIAL_HANDLE=your-social-handle

# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Email Service
RESEND_API_KEY=your-resend-api-key
SMTP_HOST=your-smtp-host
SMTP_PORT=587
SMTP_USER=your-smtp-user
SMTP_PASS=your-smtp-password

# Content Integration
MEDIUM_USERNAME=your-medium-username
REDDIT_USERNAME=your-reddit-username
REDDIT_SUBREDDIT=programming

# Video Integration (for Speaking page)
YOUTUBE_CHANNEL_ID=your-youtube-channel-id
YOUTUBE_API_KEY=your-youtube-api-key
TWITCH_CHANNEL_NAME=your-twitch-channel-name
TWITCH_CLIENT_ID=your-twitch-client-id
KICK_CHANNEL_NAME=your-kick-channel-name
VIMEO_USER_ID=your-vimeo-user-id
VIMEO_ACCESS_TOKEN=your-vimeo-access-token

# Twitter/X Integration (optional)
TWITTER_USERNAME=your-twitter-username
X_USERNAME=your-x-username
TWITTER_BEARER_TOKEN=your-twitter-bearer-token
X_BEARER_TOKEN=your-x-bearer-token
```

### Variable Details

| Variable | Required | Type | Default | Description |
|----------|----------|------|---------|-------------|
| `GITHUB_USERNAME` | Yes | string | - | Your GitHub username |
| `GITHUB_TOKEN` | No | string | - | GitHub personal access token (see [How to Get GitHub Token](#how-to-get-github-token)) |
| `CONTACT_EMAIL` | Yes | string | - | Your contact email |
| `SITE_URL` | Yes | string | `http://localhost:3000` | Your site URL |
| `SOCIAL_HANDLE` | No | string | - | Your social media handle |
| `NEXT_PUBLIC_GA_ID` | No | string | - | Google Analytics 4 Measurement ID (format: G-XXXXXXXXXX) |
| `RESEND_API_KEY` | No | string | - | Resend API key for email |
| `SMTP_HOST` | No | string | - | SMTP server host |
| `SMTP_PORT` | No | number | 587 | SMTP server port |
| `SMTP_USER` | No | string | - | SMTP username |
| `SMTP_PASS` | No | string | - | SMTP password |
| `MEDIUM_USERNAME` | No | string | - | Medium username |
| `REDDIT_USERNAME` | No | string | - | Reddit username (for feed page) |
| `REDDIT_SUBREDDIT` | No | string | `programming` | Fallback subreddit if user posts fail |
| `YOUTUBE_CHANNEL_ID` | No | string | - | YouTube channel ID (for RSS feed, no API key needed) |
| `YOUTUBE_API_KEY` | No | string | - | YouTube Data API v3 key (optional, for enhanced data) |
| `TWITCH_CHANNEL_NAME` | No | string | - | Twitch channel username |
| `TWITCH_CLIENT_ID` | No | string | - | Twitch API client ID |
| `KICK_CHANNEL_NAME` | No | string | - | Kick channel username |
| `VIMEO_USER_ID` | No | string | - | Vimeo user ID |
| `VIMEO_ACCESS_TOKEN` | No | string | - | Vimeo API access token |
| `TWITTER_USERNAME` | No | string | - | Twitter/X username (for feed page) |
| `X_USERNAME` | No | string | - | Alternative to TWITTER_USERNAME |
| `TWITTER_BEARER_TOKEN` | No | string | - | Twitter API v2 Bearer Token |
| `X_BEARER_TOKEN` | No | string | - | Alternative to TWITTER_BEARER_TOKEN |

### How to Get GitHub Token

The `GITHUB_TOKEN` is optional but recommended. Without it, you'll have a rate limit of 60 requests/hour. With authentication, you get 5,000 requests/hour.

**Steps to create a GitHub Personal Access Token (PAT):**

1. **Go to GitHub Settings**
   - Visit: https://github.com/settings/tokens
   - Or: GitHub → Your Profile → Settings → Developer settings → Personal access tokens → Tokens (classic)

2. **Generate New Token**
   - Click "Generate new token" → "Generate new token (classic)"
   - Give it a descriptive name (e.g., "Portfolio Site API Access")
   - Set expiration (recommended: 90 days or custom)

3. **Select Scopes**
   - For this project, you only need: **`public_repo`** (read-only access to public repositories)
   - This is sufficient for fetching your public repositories and activity

4. **Generate and Copy**
   - Click "Generate token"
   - **Important**: Copy the token immediately - you won't be able to see it again!
   - The token will look like: `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

5. **Add to Environment Variables**
   ```bash
   # Add to your .env.local file
   GITHUB_TOKEN=ghp_your_token_here
   ```

**Security Notes:**
- Never commit the token to version control
- Keep it in `.env.local` (which is gitignored)
- If the token is exposed, revoke it immediately and generate a new one
- For production (Vercel), add it as an environment variable in your deployment settings

**What the token enables:**
- Higher API rate limits (5,000/hour vs 60/hour)
- Access to private repository metadata (if you grant `repo` scope)
- More reliable API responses

## ⚙️ Site Configuration

### Basic Configuration

Edit `lib/site.ts` to configure your site:

```typescript
export const siteConfig = {
  name: "Your Name",
  handle: "@yourhandle",
  description: "Your professional description",
  url: "https://your-domain.com",
  email: "your-email@domain.com",
  keywords: ["developer", "portfolio", "nextjs", "typescript"],
  social: {
    twitter: "https://twitter.com/yourhandle",
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourprofile",
    instagram: "https://instagram.com/yourhandle",
    youtube: "https://youtube.com/@yourhandle",
  },
  author: {
    name: "Your Name",
    email: "your-email@domain.com",
    url: "https://your-domain.com",
  },
  creator: {
    name: "Your Name",
    email: "your-email@domain.com",
    url: "https://your-domain.com",
  },
};
```

### Advanced Configuration

```typescript
export const siteConfig = {
  // ... basic configuration
  
  // SEO Configuration
  seo: {
    title: "Your Name - Portfolio",
    description: "Your professional portfolio",
    keywords: ["developer", "portfolio", "nextjs"],
    openGraph: {
      type: "website",
      locale: "en_US",
      url: "https://your-domain.com",
      siteName: "Your Name Portfolio",
    },
    twitter: {
      card: "summary_large_image",
      creator: "@yourhandle",
    },
  },
  
  // Navigation Configuration
  navigation: {
    main: [
      { name: "About", href: "/about" },
      { name: "Projects", href: "/projects" },
      { name: "Blog", href: "/blog" },
      { name: "Contact", href: "/contact" },
    ],
    footer: [
      { name: "Privacy", href: "/privacy" },
      { name: "Terms", href: "/terms" },
    ],
  },
  
  // Feature Flags
  features: {
    blog: true,
    projects: true,
    speaking: true,
    uses: true,
    resume: true,
    metrics: true,
    feed: true,
  },
};
```

## 🎨 Theme Configuration

### TailwindCSS Configuration

Edit `tailwind.config.ts` to customize your theme:

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
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'gradient': 'gradient 15s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
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
        }
      }
    },
  },
  plugins: [],
};

export default config;
```

### Global Styles

Edit `app/globals.css` to customize global styles:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 221.2 83.2% 53.3%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96%;
    --secondary-foreground: 222.2 84% 4.9%;
    --muted: 210 40% 96%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96%;
    --accent-foreground: 222.2 84% 4.9%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 221.2 83.2% 53.3%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
    --primary: 217.2 91.2% 59.8%;
    --primary-foreground: 222.2 84% 4.9%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 224.3 76.3% 94.1%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

## 📝 Content Configuration

### Pinned Projects

Edit `data/pinned.json` to showcase your best work:

```json
[
  {
    "name": "Project Name",
    "description": "Project description",
    "url": "https://project-url.com",
    "github": "https://github.com/username/project",
    "technologies": ["React", "TypeScript", "TailwindCSS"],
    "featured": true,
    "image": "https://example.com/project-image.jpg",
    "category": "web-development"
  }
]
```

### Testimonials

Edit `data/testimonials.json` to add client feedback:

```json
[
  {
    "name": "Client Name",
    "role": "CEO, Company Name",
    "content": "Great work on our project!",
    "avatar": "https://example.com/avatar.jpg",
    "rating": 5,
    "company": "Company Name",
    "website": "https://company.com"
  }
]
```

### Skills Matrix

Edit `components/SkillsMatrix.tsx` to update your skills:

```typescript
const skills = [
  {
    category: "Frontend",
    skills: [
      { name: "React", level: 90 },
      { name: "TypeScript", level: 85 },
      { name: "Next.js", level: 80 },
    ]
  },
  {
    category: "Backend",
    skills: [
      { name: "Node.js", level: 85 },
      { name: "Python", level: 80 },
      { name: "PostgreSQL", level: 75 },
    ]
  }
];
```

### Career Timeline

Edit `components/Timeline.tsx` to update your career milestones:

```typescript
const milestones = [
  {
    year: "2025",
    title: "Senior Developer",
    company: "Company Name",
    description: "Led development of major features",
    type: "work"
  },
  {
    year: "2023",
    title: "Full Stack Developer",
    company: "Previous Company",
    description: "Developed full-stack applications",
    type: "work"
  }
];
```

## 🧩 Component Configuration

### Header Navigation

Edit `components/Header.tsx` to customize navigation:

```typescript
const navigation = [
  { name: "About", href: "/about" },
  { name: "Projects", href: "/projects" },
  { name: "Blog", href: "/blog" },
  { name: "Speaking", href: "/speaking" },
  { name: "Uses", href: "/uses" },
  { name: "Contact", href: "/contact" },
];
```

### Footer Links

Edit `components/Footer.tsx` to customize footer:

```typescript
const footerLinks = {
  main: [
    { name: "About", href: "/about" },
    { name: "Projects", href: "/projects" },
    { name: "Blog", href: "/blog" },
  ],
  social: [
    { name: "GitHub", href: "https://github.com/username" },
    { name: "Twitter", href: "https://twitter.com/username" },
    { name: "Reddit", href: "https://reddit.com/user/username" },
  ],
  legal: [
    { name: "Privacy", href: "/privacy" },
    { name: "Terms", href: "/terms" },
  ],
};
```

## 🔨 Build Configuration

### Next.js Configuration

Edit `next.config.mjs` to customize build settings:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
```

### TypeScript Configuration

Edit `tsconfig.json` to customize TypeScript settings:

```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

## 🚀 Deployment Configuration

### Vercel Configuration

Create `vercel.json` for Vercel deployment:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "functions": {
    "app/api/**/*.ts": {
      "runtime": "nodejs18.x"
    }
  },
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

### Docker Configuration

Create `Dockerfile` for containerized deployment:

```dockerfile
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci --only=production

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app ./
EXPOSE 3000
CMD ["npm", "start"]
```

## 🔍 Configuration Validation

### Environment Validation

Create `lib/env.ts` to validate environment variables:

```typescript
import { z } from 'zod';

const envSchema = z.object({
  GITHUB_USERNAME: z.string().min(1),
  CONTACT_EMAIL: z.string().email(),
  SITE_URL: z.string().url(),
  GITHUB_TOKEN: z.string().optional(),
  NEXT_PUBLIC_GA_ID: z.string().optional(),
});

export const env = envSchema.parse(process.env);
```

### Configuration Testing

```bash
# Test configuration
npm run type-check

# Test build
npm run build

# Test production
npm run start
```

## 📚 Next Steps

After configuration:

1. **Test your setup**: Run `npm run dev` and verify everything works
2. **Customize content**: Update your personal information and content
3. **Deploy**: Deploy to your chosen platform
4. **Monitor**: Set up analytics and monitoring

## 🆘 Troubleshooting

### Common Configuration Issues

1. **Environment variables not loading**: Check `.env.local` format
2. **Build errors**: Verify TypeScript configuration
3. **Styling issues**: Check TailwindCSS configuration
4. **API errors**: Verify GitHub token permissions

### Getting Help

- **Documentation**: [Complete Guide](getting-started.md)
- **Issues**: [GitHub Issues](https://github.com/voxhash/engineerview-portfolio/issues)
- **Discussions**: [GitHub Discussions](https://github.com/voxhash/engineerview-portfolio/discussions)
- **Email**: contact@voxhash.dev

---

**Configuration complete! 🎉**
