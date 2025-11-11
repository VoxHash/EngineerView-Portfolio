# Architecture Guide

This guide provides a comprehensive overview of the EnginerView Portfolio architecture, including system design, component structure, and technical decisions.

## 📋 Table of Contents

- [System Overview](#system-overview)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Component Architecture](#component-architecture)
- [Data Flow](#data-flow)
- [State Management](#state-management)
- [Performance Architecture](#performance-architecture)
- [Security Architecture](#security-architecture)
- [Deployment Architecture](#deployment-architecture)
- [Scalability Considerations](#scalability-considerations)

## 🏗️ System Overview

### High-Level Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Client Side   │    │   Server Side   │    │   External APIs │
│                 │    │                 │    │                 │
│ ┌─────────────┐ │    │ ┌─────────────┐ │    │ ┌─────────────┐ │
│ │   React     │ │◄──►│ │   Next.js   │ │◄──►│ │   GitHub    │ │
│ │ Components  │ │    │ │   App Router│ │    │ │    API      │ │
│ └─────────────┘ │    │ └─────────────┘ │    │ └─────────────┘ │
│                 │    │                 │    │                 │
│ ┌─────────────┐ │    │ ┌─────────────┐ │    │ ┌─────────────┐ │
│ │  TailwindCSS│ │    │ │   API Routes│ │    │ │  Google     │ │
│ │   Styling   │ │    │ │             │ │    │ │  Analytics  │ │
│ └─────────────┘ │    │ └─────────────┘ │    │ └─────────────┘ │
│                 │    │                 │    │                 │
│ ┌─────────────┐ │    │ ┌─────────────┐ │    │ ┌─────────────┐ │
│ │  Framer     │ │    │ │   Database  │ │    │ │   Medium    │ │
│ │   Motion    │ │    │ │   (Optional)│ │    │ │    RSS      │ │
│ └─────────────┘ │    │ └─────────────┘ │    │ └─────────────┘ │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Core Principles

1. **Server-First**: Leverage Next.js App Router for optimal performance
2. **Component-Driven**: Reusable, composable React components
3. **Type-Safe**: Full TypeScript coverage for reliability
4. **Performance-Focused**: Optimized for Core Web Vitals
5. **Accessibility-First**: WCAG 2.1 AA compliance
6. **SEO-Optimized**: Complete meta tags and structured data

## 🛠️ Technology Stack

### Frontend

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript 5.0+
- **Styling**: TailwindCSS 3.0+
- **Icons**: Lucide React
- **Animations**: CSS animations + Framer Motion (optional)
- **Theme**: next-themes for dark/light mode

### Backend

- **Runtime**: Node.js 18+
- **Framework**: Next.js API Routes
- **Language**: TypeScript
- **Validation**: Zod for runtime validation
- **Email**: Resend + Nodemailer

### External Services

- **Version Control**: GitHub API
- **Analytics**: Google Analytics 4 (GA4)
- **Content**: Medium RSS, Reddit API
- **Email**: Resend, SMTP
- **Deployment**: Vercel, Docker

### Development Tools

- **Package Manager**: npm
- **Linting**: ESLint + Prettier
- **Type Checking**: TypeScript
- **Testing**: Jest + React Testing Library
- **Git Hooks**: Husky + lint-staged

## 📁 Project Structure

```
engineerview-portfolio/
├── app/                          # Next.js App Router
│   ├── (routes)/                 # Route groups
│   │   ├── about/               # About page
│   │   ├── blog/                # Blog system
│   │   ├── contact/             # Contact page
│   │   ├── projects/            # Projects showcase
│   │   ├── speaking/            # Speaking engagements
│   │   ├── uses/                # Dev setup
│   │   └── resume/              # Resume viewer
│   ├── api/                     # API routes
│   │   ├── contact/             # Contact form API
│   │   ├── github/              # GitHub integration
│   │   ├── og/                  # OG image generation
│   │   └── resume/              # Resume generation
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Home page
├── components/                   # Reusable components
│   ├── ui/                      # Base UI components
│   ├── layout/                  # Layout components
│   ├── forms/                   # Form components
│   └── features/                # Feature components
├── lib/                         # Utility functions
│   ├── api/                     # API clients
│   ├── utils/                   # Helper functions
│   ├── types/                   # TypeScript types
│   └── constants/               # Constants
├── data/                        # Static data
│   ├── pinned.json             # Pinned projects
│   └── testimonials.json       # Client testimonials
├── public/                      # Static assets
│   ├── images/                 # Images
│   ├── icons/                  # Icons
│   └── documents/              # PDFs, etc.
├── styles/                      # Additional styles
│   ├── components/             # Component styles
│   └── pages/                  # Page-specific styles
└── docs/                       # Documentation
    ├── api/                    # API documentation
    ├── guides/                 # User guides
    └── examples/               # Code examples
```

## 🧩 Component Architecture

### Component Hierarchy

```
App
├── Layout
│   ├── Header
│   │   ├── Navigation
│   │   ├── ThemeToggle
│   │   └── MobileMenu
│   ├── Main
│   │   ├── PageContent
│   │   └── FeatureComponents
│   └── Footer
│       ├── SocialLinks
│       └── LegalLinks
├── Pages
│   ├── HomePage
│   │   ├── Hero
│   │   ├── PinnedProjects
│   │   └── Testimonials
│   ├── AboutPage
│   │   ├── SkillsMatrix
│   │   └── Timeline
│   └── ProjectsPage
│       └── ProjectGrid
└── Features
    ├── Blog
    ├── Contact
    └── Analytics
```

### Component Design Patterns

#### 1. Compound Components

```typescript
// Card compound component
<Card>
  <Card.Header>
    <Card.Title>Project Title</Card.Title>
    <Card.Subtitle>Project Description</Card.Subtitle>
  </Card.Header>
  <Card.Body>
    <Card.Content>Project details...</Card.Content>
  </Card.Body>
  <Card.Footer>
    <Card.Actions>
      <Button>View Project</Button>
    </Card.Actions>
  </Card.Footer>
</Card>
```

#### 2. Render Props

```typescript
// Data fetching component
<DataFetcher
  url="/api/projects"
  render={({ data, loading, error }) => (
    <ProjectGrid projects={data} loading={loading} error={error} />
  )}
/>
```

#### 3. Custom Hooks

```typescript
// Theme management hook
const { theme, setTheme, toggleTheme } = useTheme();

// Analytics hook
const { trackEvent, trackPageView } = useAnalytics();

// GitHub data hook
const { repos, loading, error } = useGitHubRepos();
```

### Component Categories

#### 1. Layout Components
- **Header**: Navigation and branding
- **Footer**: Links and information
- **Sidebar**: Secondary navigation
- **Container**: Content wrapper

#### 2. UI Components
- **Button**: Interactive elements
- **Card**: Content containers
- **Modal**: Overlay dialogs
- **Form**: Input components

#### 3. Feature Components
- **ProjectGrid**: Project showcase
- **BlogList**: Blog post listing
- **ContactForm**: Contact functionality
- **Analytics**: Data visualization

#### 4. Utility Components
- **Loading**: Loading states
- **Error**: Error handling
- **Empty**: Empty states
- **Skeleton**: Content placeholders

## 🔄 Data Flow

### Client-Side Data Flow

```
User Action → Component → Hook → API → State → UI Update
     ↓           ↓         ↓      ↓      ↓        ↓
  Click → Button → useData → fetch → setState → Re-render
```

### Server-Side Data Flow

```
Request → API Route → External API → Processing → Response
   ↓         ↓           ↓            ↓           ↓
  HTTP → /api/github → GitHub API → Transform → JSON
```

### Data Fetching Strategies

#### 1. Server Components (Default)

```typescript
// Server Component - runs on server
async function ProjectGrid() {
  const projects = await getProjects(); // Server-side fetch
  return <div>{/* Render projects */}</div>;
}
```

#### 2. Client Components with SWR

```typescript
// Client Component - runs on client
function ProjectGrid() {
  const { data: projects, error } = useSWR('/api/projects', fetcher);
  
  if (error) return <Error />;
  if (!projects) return <Loading />;
  
  return <div>{/* Render projects */}</div>;
}
```

#### 3. Static Generation

```typescript
// Static generation at build time
export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map(project => ({
    slug: project.slug
  }));
}
```

## 🗃️ State Management

### State Architecture

```
Global State (Context)
├── Theme State
│   ├── theme: 'light' | 'dark' | 'system'
│   └── setTheme: (theme) => void
├── Analytics State
│   ├── trackEvent: (event, data) => void
│   └── trackPageView: (page) => void
└── UI State
    ├── mobileMenuOpen: boolean
    └── setMobileMenuOpen: (open) => void
```

### State Management Patterns

#### 1. React Context

```typescript
// Theme context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
```

#### 2. Custom Hooks

```typescript
// Analytics hook
export function useAnalytics() {
  const trackEvent = useCallback((event: string, data?: any) => {
    // Track event logic
  }, []);
  
  return { trackEvent };
}
```

#### 3. Local Storage

```typescript
// Persistent state
export function usePersistedState<T>(key: string, defaultValue: T) {
  const [state, setState] = useState<T>(() => {
    if (typeof window === 'undefined') return defaultValue;
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  });
  
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);
  
  return [state, setState] as const;
}
```

## ⚡ Performance Architecture

### Performance Strategies

#### 1. Code Splitting

```typescript
// Dynamic imports
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <Skeleton />,
  ssr: false
});
```

#### 2. Image Optimization

```typescript
// Next.js Image component
<Image
  src="/hero.jpg"
  alt="Hero image"
  width={1200}
  height={600}
  priority={true}
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>
```

#### 3. Caching

```typescript
// API route caching
export const revalidate = 3600; // 1 hour

// Client-side caching
const { data } = useSWR('/api/projects', fetcher, {
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  refreshInterval: 0
});
```

#### 4. Bundle Optimization

```typescript
// next.config.mjs
const nextConfig = {
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion']
  },
  webpack: (config) => {
    config.optimization.splitChunks = {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    };
    return config;
  }
};
```

### Performance Monitoring

#### 1. Core Web Vitals

```typescript
// Performance monitoring
export function reportWebVitals(metric: NextWebVitalsMetric) {
  if (metric.label === 'web-vital') {
    // Send to analytics
    gtag('event', metric.name, {
      value: Math.round(metric.value),
      event_label: metric.id,
      non_interaction: true
    });
  }
}
```

#### 2. Bundle Analysis

```bash
# Analyze bundle size
npm run build
npm run analyze
```

## 🔒 Security Architecture

### Security Measures

#### 1. Input Validation

```typescript
// Zod schema validation
const contactSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  message: z.string().min(1).max(1000)
});

export async function POST(request: Request) {
  const body = await request.json();
  const validatedData = contactSchema.parse(body);
  // Process validated data
}
```

#### 2. Rate Limiting

```typescript
// Rate limiting middleware
const rateLimit = new Map();

export function rateLimitMiddleware(limit: number, windowMs: number) {
  return (req: Request) => {
    const ip = req.headers.get('x-forwarded-for') || 'unknown';
    const now = Date.now();
    const windowStart = now - windowMs;
    
    if (!rateLimit.has(ip)) {
      rateLimit.set(ip, []);
    }
    
    const requests = rateLimit.get(ip).filter((time: number) => time > windowStart);
    
    if (requests.length >= limit) {
      return new Response('Rate limit exceeded', { status: 429 });
    }
    
    requests.push(now);
    rateLimit.set(ip, requests);
  };
}
```

#### 3. Security Headers

```typescript
// Security headers
export async function headers() {
  return [
    {
      source: '/(.*)',
      headers: [
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
        { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' }
      ]
    }
  ];
}
```

### Data Protection

#### 1. Environment Variables

```typescript
// Secure environment variable handling
const envSchema = z.object({
  GITHUB_TOKEN: z.string().optional(),
  CONTACT_EMAIL: z.string().email(),
  SITE_URL: z.string().url()
});

export const env = envSchema.parse(process.env);
```

#### 2. API Security

```typescript
// API route security
export async function GET(request: Request) {
  // Validate request origin
  const origin = request.headers.get('origin');
  if (origin && !ALLOWED_ORIGINS.includes(origin)) {
    return new Response('Forbidden', { status: 403 });
  }
  
  // Rate limiting
  const rateLimitResult = rateLimitMiddleware(60, 60000)(request);
  if (rateLimitResult) return rateLimitResult;
  
  // Process request
}
```

## 🚀 Deployment Architecture

### Deployment Options

#### 1. Vercel (Recommended)

```
GitHub → Vercel → CDN → Users
   ↓        ↓      ↓      ↓
  Push → Build → Deploy → Serve
```

**Benefits:**
- Zero-config deployment
- Automatic HTTPS
- Global CDN
- Serverless functions

#### 2. Docker

```dockerfile
# Multi-stage build
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
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

#### 3. Static Export

```typescript
// next.config.mjs
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
};
```

### CI/CD Pipeline

```yaml
# .github/workflows/deploy.yml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run build
      - run: npm run test
      - uses: vercel/action@v1
```

## 📈 Scalability Considerations

### Horizontal Scaling

#### 1. Stateless Design

- No server-side sessions
- All state in client or external services
- Stateless API routes

#### 2. CDN Distribution

- Static assets via CDN
- Global edge locations
- Cached API responses

#### 3. Database Considerations

- External API dependencies
- Caching strategies
- Rate limiting

### Vertical Scaling

#### 1. Performance Optimization

- Code splitting
- Image optimization
- Bundle size reduction
- Caching strategies

#### 2. Monitoring

- Performance metrics
- Error tracking
- User analytics
- Resource usage

### Future Scaling

#### 1. Microservices

```
Current: Monolithic Next.js App
Future:  Microservices Architecture
├── Portfolio Service
├── Blog Service
├── Analytics Service
└── API Gateway
```

#### 2. Database Integration

```
Current: External APIs only
Future:  Database + External APIs
├── PostgreSQL (content)
├── Redis (caching)
├── GitHub API (repos)
└── Google Analytics (analytics)
```

## 📚 Next Steps

1. **Explore examples**: Check [Examples](examples/) for implementation details
2. **Read configuration**: See [Configuration Guide](configuration.md) for setup
3. **Deploy**: Follow deployment instructions for your chosen platform
4. **Monitor**: Set up monitoring and analytics

## 🆘 Getting Help

- **Architecture questions**: [GitHub Discussions](https://github.com/voxhash/engineerview-portfolio/discussions)
- **Issues**: [GitHub Issues](https://github.com/voxhash/engineerview-portfolio/issues)
- **Email**: contact@voxhash.dev

---

**Happy coding! 🚀**
