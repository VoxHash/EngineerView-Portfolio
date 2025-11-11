# Usage Guide

This guide covers how to use EnginerView Portfolio effectively, from basic operations to advanced features.

## 📋 Table of Contents

- [Basic Usage](#basic-usage)
- [Content Management](#content-management)
- [Customization](#customization)
- [Advanced Features](#advanced-features)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)

## 🚀 Basic Usage

### Starting the Development Server

```bash
# Start development server
npm run dev

# Open browser to http://localhost:3000
```

### Building for Production

```bash
# Build the application
npm run build

# Start production server
npm run start
```

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run format       # Format with Prettier
npm run type-check   # TypeScript checking

# Testing
npm test             # Run tests
npm run test:watch   # Run tests in watch mode
```

## 📝 Content Management

### Adding Blog Posts

1. **Create a new blog post**:
   ```bash
   # Create new blog post directory
   mkdir app/blog/your-post-slug
   
   # Create page.tsx
   touch app/blog/your-post-slug/page.tsx
   ```

2. **Blog post structure**:
   ```typescript
   // app/blog/your-post-slug/page.tsx
   export default function BlogPost() {
     return (
       <div className="container mx-auto px-4 py-8">
         <article className="prose prose-lg max-w-none">
           <h1>Your Blog Post Title</h1>
           <p>Your blog post content...</p>
         </article>
       </div>
     );
   }
   ```

3. **Update blog index**:
   ```typescript
   // app/blog/page.tsx
   const blogPosts = [
     {
       title: "Your Blog Post Title",
       slug: "your-post-slug",
       date: "2025-01-15",
       excerpt: "Your post excerpt...",
     },
   ];
   ```

### Managing Projects

1. **Update pinned projects** in `data/pinned.json`:
   ```json
   [
     {
       "name": "Project Name",
       "description": "Project description",
       "url": "https://project-url.com",
       "github": "https://github.com/username/project",
       "technologies": ["React", "TypeScript"],
       "featured": true
     }
   ]
   ```

2. **GitHub integration** automatically fetches:
   - Repository information
   - Stars and forks
   - Recent activity
   - Technology stack

### Updating Personal Information

1. **Site configuration** in `lib/site.ts`:
   ```typescript
   export const siteConfig = {
     name: "Your Name",
     handle: "@yourhandle",
     description: "Your professional description",
     email: "your-email@domain.com",
     // ... other configuration
   };
   ```

2. **Social links** in `components/SocialRow.tsx`:
   ```typescript
   const socialLinks = [
     { name: "GitHub", href: "https://github.com/username" },
     { name: "Twitter", href: "https://twitter.com/username" },
     { name: "Reddit", href: "https://reddit.com/user/username" },
   ];
   ```

## 🎨 Customization

### Theme Customization

1. **Color scheme** in `tailwind.config.ts`:
   ```typescript
   colors: {
     primary: {
       500: '#your-primary-color',
     },
     secondary: {
       500: '#your-secondary-color',
     },
   }
   ```

2. **Global styles** in `app/globals.css`:
   ```css
   :root {
     --primary: 221.2 83.2% 53.3%;
     --secondary: 210 40% 96%;
   }
   ```

### Component Customization

1. **Header navigation** in `components/Header.tsx`:
   ```typescript
   const navigation = [
     { name: "About", href: "/about" },
     { name: "Projects", href: "/projects" },
     { name: "Blog", href: "/blog" },
     // Add your custom pages
   ];
   ```

2. **Footer links** in `components/Footer.tsx`:
   ```typescript
   const footerLinks = {
     main: [
       { name: "About", href: "/about" },
       { name: "Projects", href: "/projects" },
     ],
     social: [
       { name: "GitHub", href: "https://github.com/username" },
     ],
   };
   ```

### Page Customization

1. **About page** in `app/about/page.tsx`:
   ```typescript
   export default function About() {
     return (
       <div className="container mx-auto px-4 py-8">
         <h1>About Me</h1>
         <p>Your about content...</p>
         <SkillsMatrix />
         <Timeline />
       </div>
     );
   }
   ```

2. **Projects page** in `app/projects/page.tsx`:
   ```typescript
   export default function Projects() {
     return (
       <div className="container mx-auto px-4 py-8">
         <h1>My Projects</h1>
         <ProjectGrid />
       </div>
     );
   }
   ```

## ⚡ Advanced Features

### Analytics Integration

1. **Google Analytics 4**:
   ```typescript
   // components/Analytics.tsx
   import { useAnalytics } from './Analytics';
   
   function MyComponent() {
     const { trackEvent } = useAnalytics();
     
     const handleClick = () => {
       trackEvent('button_click', { button: 'cta' });
     };
   }
   ```

2. **Custom events**:
   ```typescript
   // Track custom events
   trackEvent('project_view', { project: 'project-name' });
   trackEvent('contact_form', { form: 'newsletter' });
   ```

### Email Integration

1. **Contact form** in `app/api/contact/route.ts`:
   ```typescript
   export async function POST(request: Request) {
     const { name, email, message } = await request.json();
     
     // Send email using Resend or SMTP
     await sendEmail({ name, email, message });
     
     return Response.json({ success: true });
   }
   ```

2. **Email templates**:
   ```typescript
   const emailTemplate = `
     <h1>New Contact Form Submission</h1>
     <p>Name: ${name}</p>
     <p>Email: ${email}</p>
     <p>Message: ${message}</p>
   `;
   ```

### RSS Feed Generation

1. **RSS feed** in `app/rss.xml/route.ts`:
   ```typescript
   export async function GET() {
     const posts = await getBlogPosts();
     const rss = generateRSS(posts);
     
     return new Response(rss, {
       headers: { 'Content-Type': 'application/xml' },
     });
   }
   ```

2. **Atom feed** in `app/atom.xml/route.ts`:
   ```typescript
   export async function GET() {
     const posts = await getBlogPosts();
     const atom = generateAtom(posts);
     
     return new Response(atom, {
       headers: { 'Content-Type': 'application/xml' },
     });
   }
   ```

### Dynamic OG Images

1. **OG image generation** in `app/api/og/route.tsx`:
   ```typescript
   export async function GET(request: Request) {
     const { searchParams } = new URL(request.url);
     const title = searchParams.get('title');
     const description = searchParams.get('description');
     
     return new ImageResponse(
       <div style={{ fontSize: 60, background: 'white' }}>
         <h1>{title}</h1>
         <p>{description}</p>
       </div>,
       { width: 1200, height: 630 }
     );
   }
   ```

2. **Using OG images**:
   ```typescript
   // In your page metadata
   export const metadata = {
     openGraph: {
       images: [`/api/og?title=${title}&description=${description}`],
     },
   };
   ```

## 📊 Best Practices

### Performance Optimization

1. **Image optimization**:
   ```typescript
   import Image from 'next/image';
   
   <Image
     src="/your-image.jpg"
     alt="Description"
     width={800}
     height={600}
     priority={true} // For above-the-fold images
   />
   ```

2. **Code splitting**:
   ```typescript
   import dynamic from 'next/dynamic';
   
   const DynamicComponent = dynamic(() => import('./HeavyComponent'), {
     loading: () => <p>Loading...</p>,
   });
   ```

3. **Caching**:
   ```typescript
   // Cache API responses
   export const revalidate = 3600; // 1 hour
   
   async function getData() {
     const res = await fetch('https://api.example.com/data', {
       next: { revalidate: 3600 }
     });
     return res.json();
   }
   ```

### SEO Optimization

1. **Metadata**:
   ```typescript
   export const metadata = {
     title: 'Page Title',
     description: 'Page description',
     keywords: ['keyword1', 'keyword2'],
     openGraph: {
       title: 'Page Title',
       description: 'Page description',
       images: ['/og-image.jpg'],
     },
   };
   ```

2. **Structured data**:
   ```typescript
   const structuredData = {
     "@context": "https://schema.org",
     "@type": "Person",
     "name": "Your Name",
     "jobTitle": "Developer",
     "url": "https://your-domain.com",
   };
   ```

### Accessibility

1. **Semantic HTML**:
   ```typescript
   <main>
     <section>
       <h1>Page Title</h1>
       <p>Content...</p>
     </section>
   </main>
   ```

2. **ARIA labels**:
   ```typescript
   <button
     aria-label="Close navigation menu"
     onClick={closeMenu}
   >
     <CloseIcon />
   </button>
   ```

3. **Keyboard navigation**:
   ```typescript
   const handleKeyDown = (event: KeyboardEvent) => {
     if (event.key === 'Escape') {
       closeMenu();
     }
   };
   ```

## 🔍 Troubleshooting

### Common Issues

1. **Build errors**:
   ```bash
   # Clear cache and rebuild
   rm -rf .next node_modules
   npm install
   npm run build
   ```

2. **Environment variables not loading**:
   ```bash
   # Check .env.local exists and has correct format
   cat .env.local
   
   # Restart development server
   npm run dev
   ```

3. **GitHub API issues**:
   ```bash
   # Check GitHub token permissions
   # Verify GITHUB_USERNAME is correct
   # Check rate limits
   ```

4. **Styling issues**:
   ```bash
   # Check TailwindCSS configuration
   # Verify class names are correct
   # Check for CSS conflicts
   ```

### Debugging

1. **Enable debug mode**:
   ```typescript
   // In your component
   console.log('Debug info:', { data });
   ```

2. **Check network requests**:
   - Open browser dev tools
   - Check Network tab
   - Look for failed requests

3. **Verify environment variables**:
   ```typescript
   console.log('Environment:', process.env);
   ```

## 📚 Next Steps

1. **Explore examples**: Check [Examples](examples/) for code samples
2. **Read API docs**: See [API Reference](api.md) for detailed API information
3. **Customize further**: Use [Configuration Guide](configuration.md) for advanced setup
4. **Deploy**: Follow deployment instructions for your chosen platform

## 🆘 Getting Help

- **Documentation**: [Complete Guide](getting-started.md)
- **Issues**: [GitHub Issues](https://github.com/voxhash/engineerview-portfolio/issues)
- **Discussions**: [GitHub Discussions](https://github.com/voxhash/engineerview-portfolio/discussions)
- **Email**: contact@voxhash.dev

---

**Happy coding! 🚀**
