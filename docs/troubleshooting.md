# Troubleshooting Guide

This guide helps you resolve common issues when working with EnginerView Portfolio.

## 📋 Table of Contents

- [Common Issues](#common-issues)
- [Build Issues](#build-issues)
- [Runtime Issues](#runtime-issues)
- [Deployment Issues](#deployment-issues)
- [Performance Issues](#performance-issues)
- [Debugging Tools](#debugging-tools)
- [Getting Help](#getting-help)

## 🐛 Common Issues

### Environment Variables Not Loading

**Problem**: Environment variables are not being loaded or are undefined.

**Symptoms**:
- `process.env.VARIABLE_NAME` returns `undefined`
- API calls fail with missing configuration
- Build errors related to missing environment variables

**Solutions**:

1. **Check file location**:
   ```bash
   # Ensure .env.local exists in project root
   ls -la .env.local
   ```

2. **Verify file format**:
   ```env
   # Correct format (no spaces around =)
   GITHUB_USERNAME=your-username
   CONTACT_EMAIL=your-email@domain.com
   
   # Incorrect format (spaces around =)
   GITHUB_USERNAME = your-username
   ```

3. **Restart development server**:
   ```bash
   # Stop server (Ctrl+C)
   npm run dev
   ```

4. **Check variable names**:
   ```typescript
   // Ensure exact match in code
   console.log(process.env.GITHUB_USERNAME); // Not GITHUB_USER
   ```

### GitHub API Issues

**Problem**: GitHub API calls are failing or returning errors.

**Symptoms**:
- "GitHub API rate limit exceeded" errors
- Empty project lists
- 401/403 authentication errors

**Solutions**:

1. **Check GitHub username**:
   ```bash
   # Verify username in .env.local
   echo $GITHUB_USERNAME
   ```

2. **Add GitHub token**:
   ```env
   # Add to .env.local for higher rate limits
   GITHUB_TOKEN=ghp_your_github_token_here
   ```

3. **Verify token permissions**:
   - Go to GitHub Settings > Developer settings > Personal access tokens
   - Ensure token has `public_repo` scope
   - Check if token is expired

4. **Check rate limits**:
   ```bash
   # Check current rate limit
   curl -H "Authorization: token YOUR_TOKEN" https://api.github.com/rate_limit
   ```

### Theme Not Working

**Problem**: Dark/light theme toggle is not working properly.

**Symptoms**:
- Theme doesn't persist between sessions
- Theme toggle doesn't change appearance
- Hydration mismatches

**Solutions**:

1. **Check ThemeProvider setup**:
   ```typescript
   // Ensure ThemeProvider wraps your app
   export default function RootLayout({ children }: { children: React.ReactNode }) {
     return (
       <html lang="en" suppressHydrationWarning>
         <body>
           <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
             {children}
           </ThemeProvider>
         </body>
       </html>
     );
   }
   ```

2. **Verify TailwindCSS configuration**:
   ```typescript
   // tailwind.config.ts
   module.exports = {
     darkMode: 'class', // Important!
     // ... rest of config
   };
   ```

3. **Check for hydration issues**:
   ```typescript
   // Use suppressHydrationWarning for theme-dependent elements
   <html lang="en" suppressHydrationWarning>
   ```

## 🔨 Build Issues

### TypeScript Errors

**Problem**: TypeScript compilation fails during build.

**Symptoms**:
- `npm run build` fails with TypeScript errors
- Type errors in console
- IDE showing red squiggly lines

**Solutions**:

1. **Check TypeScript version**:
   ```bash
   npx tsc --version
   # Should be 5.0 or later
   ```

2. **Run type checking**:
   ```bash
   npm run type-check
   ```

3. **Fix common type errors**:
   ```typescript
   // Add proper types
   interface Project {
     id: number;
     name: string;
     description: string;
   }
   
   // Use proper event types
   const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
     // Handle click
   };
   ```

4. **Update type definitions**:
   ```bash
   npm install --save-dev @types/node @types/react @types/react-dom
   ```

### Build Failures

**Problem**: `npm run build` fails with various errors.

**Solutions**:

1. **Clear cache and reinstall**:
   ```bash
   rm -rf .next node_modules package-lock.json
   npm install
   npm run build
   ```

2. **Check Node.js version**:
   ```bash
   node --version
   # Should be 18.0 or later
   ```

3. **Update dependencies**:
   ```bash
   npm update
   npm run build
   ```

4. **Check for circular dependencies**:
   ```bash
   # Install circular dependency detector
   npm install -g madge
   madge --circular src/
   ```

### Memory Issues

**Problem**: Build fails due to memory issues.

**Solutions**:

1. **Increase Node.js memory limit**:
   ```bash
   NODE_OPTIONS="--max-old-space-size=4096" npm run build
   ```

2. **Use swap file (Linux/macOS)**:
   ```bash
   sudo fallocate -l 2G /swapfile
   sudo chmod 600 /swapfile
   sudo mkswap /swapfile
   sudo swapon /swapfile
   ```

3. **Optimize build process**:
   ```typescript
   // next.config.mjs
   const nextConfig = {
     experimental: {
       optimizePackageImports: ['lucide-react']
     }
   };
   ```

## 🚀 Runtime Issues

### Hydration Mismatches

**Problem**: React hydration warnings in console.

**Symptoms**:
- "Text content does not match server-rendered HTML" warnings
- Layout shifts during page load
- Theme flickering

**Solutions**:

1. **Use suppressHydrationWarning**:
   ```typescript
   <html lang="en" suppressHydrationWarning>
   ```

2. **Handle client-only content**:
   ```typescript
   import dynamic from 'next/dynamic';
   
   const ClientOnlyComponent = dynamic(() => import('./ClientComponent'), {
     ssr: false
   });
   ```

3. **Use useEffect for client-side logic**:
   ```typescript
   useEffect(() => {
     // Client-side only code
     const theme = localStorage.getItem('theme');
     setTheme(theme);
   }, []);
   ```

### API Route Errors

**Problem**: API routes are not working or returning errors.

**Solutions**:

1. **Check route file location**:
   ```
   app/api/contact/route.ts  ✅ Correct
   app/api/contact.ts        ❌ Incorrect
   ```

2. **Verify HTTP methods**:
   ```typescript
   // Ensure proper method export
   export async function POST(request: Request) {
     // Handle POST request
   }
   ```

3. **Check request body parsing**:
   ```typescript
   const body = await request.json();
   // Handle JSON parsing errors
   ```

4. **Add error handling**:
   ```typescript
   try {
     // API logic
   } catch (error) {
     console.error('API error:', error);
     return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
   }
   ```

### Image Loading Issues

**Problem**: Images are not loading or showing broken images.

**Solutions**:

1. **Check image paths**:
   ```typescript
   // Correct path
   <Image src="/images/hero.jpg" alt="Hero" />
   
   // Incorrect path
   <Image src="./images/hero.jpg" alt="Hero" />
   ```

2. **Configure external domains**:
   ```typescript
   // next.config.mjs
   const nextConfig = {
     images: {
       remotePatterns: [
         {
           protocol: 'https',
           hostname: 'images.unsplash.com',
         },
       ],
     },
   };
   ```

3. **Use proper Image component**:
   ```typescript
   import Image from 'next/image';
   
   <Image
     src="/hero.jpg"
     alt="Hero image"
     width={800}
     height={600}
     priority={true} // For above-the-fold images
   />
   ```

## 🚀 Deployment Issues

### Vercel Deployment Failures

**Problem**: Deployment to Vercel fails.

**Solutions**:

1. **Check build logs**:
   - Go to Vercel dashboard
   - Click on failed deployment
   - Review build logs for errors

2. **Verify environment variables**:
   - Check Vercel dashboard > Settings > Environment Variables
   - Ensure all required variables are set

3. **Check Node.js version**:
   ```json
   // package.json
   {
     "engines": {
       "node": ">=18.0.0"
     }
   }
   ```

4. **Fix build command**:
   ```bash
   # Ensure build command is correct
   npm run build
   ```

### Docker Issues

**Problem**: Docker build or run fails.

**Solutions**:

1. **Check Dockerfile**:
   ```dockerfile
   # Use correct Node.js version
   FROM node:20-alpine
   
   # Set working directory
   WORKDIR /app
   
   # Copy package files first
   COPY package*.json ./
   RUN npm ci --only=production
   ```

2. **Build Docker image**:
   ```bash
   docker build -t engineerview-portfolio .
   ```

3. **Run container**:
   ```bash
   docker run -p 3000:3000 engineerview-portfolio
   ```

4. **Check container logs**:
   ```bash
   docker logs container-id
   ```

### Environment Variable Issues in Production

**Problem**: Environment variables not working in production.

**Solutions**:

1. **Check production environment**:
   - Verify variables are set in deployment platform
   - Check variable names match exactly
   - Ensure no typos in variable names

2. **Use build-time variables**:
   ```typescript
   // Use NEXT_PUBLIC_ prefix for client-side variables
   const apiUrl = process.env.NEXT_PUBLIC_API_URL;
   ```

3. **Debug environment variables**:
   ```typescript
   // Add logging (remove in production)
   console.log('Environment:', process.env.NODE_ENV);
   console.log('GitHub Username:', process.env.GITHUB_USERNAME);
   ```

## ⚡ Performance Issues

### Slow Page Loads

**Problem**: Pages are loading slowly.

**Solutions**:

1. **Optimize images**:
   ```typescript
   <Image
     src="/hero.jpg"
     alt="Hero"
     width={800}
     height={600}
     priority={true}
     placeholder="blur"
     blurDataURL="data:image/jpeg;base64,..."
   />
   ```

2. **Use dynamic imports**:
   ```typescript
   const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
     loading: () => <Skeleton />,
     ssr: false
   });
   ```

3. **Implement caching**:
   ```typescript
   export const revalidate = 3600; // 1 hour
   ```

4. **Optimize bundle size**:
   ```bash
   npm run analyze
   ```

### Memory Leaks

**Problem**: Application consumes too much memory.

**Solutions**:

1. **Clean up event listeners**:
   ```typescript
   useEffect(() => {
     const handleResize = () => {
       // Handle resize
     };
     
     window.addEventListener('resize', handleResize);
     
     return () => {
       window.removeEventListener('resize', handleResize);
     };
   }, []);
   ```

2. **Use useCallback for functions**:
   ```typescript
   const handleClick = useCallback(() => {
     // Handle click
   }, []);
   ```

3. **Optimize re-renders**:
   ```typescript
   const MemoizedComponent = memo(ExpensiveComponent);
   ```

## 🔍 Debugging Tools

### Browser DevTools

1. **Console errors**:
   - Open DevTools (F12)
   - Check Console tab for errors
   - Look for React warnings

2. **Network tab**:
   - Check failed requests
   - Verify API responses
   - Check loading times

3. **Performance tab**:
   - Record performance
   - Identify bottlenecks
   - Check Core Web Vitals

### Next.js Debugging

1. **Enable debug mode**:
   ```bash
   DEBUG=* npm run dev
   ```

2. **Check build output**:
   ```bash
   npm run build
   # Look for warnings and errors
   ```

3. **Use React DevTools**:
   - Install React Developer Tools browser extension
   - Inspect component state and props

### Logging

1. **Add console logs**:
   ```typescript
   console.log('Debug info:', { data, error });
   ```

2. **Use structured logging**:
   ```typescript
   const logger = {
     info: (message: string, data?: any) => {
       console.log(`[INFO] ${message}`, data);
     },
     error: (message: string, error?: any) => {
       console.error(`[ERROR] ${message}`, error);
     }
   };
   ```

3. **Remove logs in production**:
   ```typescript
   if (process.env.NODE_ENV === 'development') {
     console.log('Debug info:', data);
   }
   ```

## 🆘 Getting Help

### Before Asking for Help

1. **Check this guide** for your specific issue
2. **Search existing issues** on GitHub
3. **Check the documentation** thoroughly
4. **Try the solutions** provided above

### When Asking for Help

Include the following information:

1. **Environment details**:
   - Operating system
   - Node.js version
   - npm version
   - Browser version

2. **Error messages**:
   - Full error message
   - Stack trace
   - Console output

3. **Steps to reproduce**:
   - What you were doing
   - What you expected to happen
   - What actually happened

4. **Code samples**:
   - Relevant code snippets
   - Configuration files
   - Package.json

### Support Channels

1. **GitHub Issues**: [Create an issue](https://github.com/voxhash/engineerview-portfolio/issues)
2. **GitHub Discussions**: [Ask a question](https://github.com/voxhash/engineerview-portfolio/discussions)
3. **Email**: contact@voxhash.dev
4. **Documentation**: [Complete Guide](getting-started.md)

### Community Help

1. **Stack Overflow**: Tag questions with `nextjs`, `react`, `typescript`
2. **Discord**: Join the Next.js Discord server
3. **Reddit**: r/nextjs, r/reactjs communities
4. **Twitter**: Use #NextJS, #ReactJS hashtags

---

**Happy debugging! 🐛➡️✨**
