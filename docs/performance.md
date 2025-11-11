# Performance Optimization Guide

This document outlines performance optimization strategies and best practices for the EnginerView Portfolio project.

## Core Web Vitals

The project tracks and optimizes for Core Web Vitals:

- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1
- **FCP (First Contentful Paint)**: < 1.8s
- **TTFB (Time to First Byte)**: < 600ms

### Tracking

Core Web Vitals are automatically tracked using the `WebVitals` component:

```typescript
import WebVitals from '@/components/WebVitals';

// Automatically tracks and reports metrics
<WebVitals />
```

## Image Optimization

### Best Practices

1. **Use Next.js Image Component**:
   ```typescript
   import Image from 'next/image';
   
   <Image
     src="/image.jpg"
     alt="Description"
     width={800}
     height={600}
     loading="lazy" // For below-the-fold images
     quality={85} // Optimal quality
     placeholder="blur" // For better LCP
     sizes="(max-width: 768px) 100vw, 800px"
   />
   ```

2. **Lazy Loading**: 
   - Use `loading="lazy"` for images below the fold
   - Use `priority={true}` for above-the-fold images

3. **Responsive Images**:
   - Always provide `sizes` attribute
   - Use appropriate `width` and `height` to prevent layout shift

4. **Image Formats**:
   - Next.js automatically serves WebP/AVIF when supported
   - Configured in `next.config.mjs`

### Image Optimization Utilities

```typescript
import { 
  generateSrcSet, 
  getImageSizes, 
  generateBlurDataURL,
  shouldLazyLoad 
} from '@/lib/image-optimization';

// Generate responsive srcSet
const srcSet = generateSrcSet('/image.jpg', [640, 1200, 1920]);

// Get optimal sizes
const sizes = getImageSizes({ mobile: 100, tablet: 50, desktop: 33 });

// Generate blur placeholder
const blurDataURL = generateBlurDataURL(10, 10);
```

## Bundle Size Optimization

### Current Optimizations

1. **Package Import Optimization**:
   - `optimizePackageImports` for lucide-react, framer-motion, date-fns
   - Reduces bundle size by tree-shaking unused exports

2. **Code Splitting**:
   - Automatic route-based code splitting
   - Dynamic imports for heavy components
   - Webpack bundle splitting configuration

3. **Tree Shaking**:
   - ES modules for better tree shaking
   - Side-effect free imports

### Analyzing Bundle Size

```bash
# Install bundle analyzer
npm install --save-dev @next/bundle-analyzer

# Analyze bundle
ANALYZE=true npm run build
```

## Caching Strategies

### Static Assets
- **Next.js Static Assets**: 1 year cache (immutable)
- **Images**: 1 year cache (immutable)
- **PDFs**: 1 day cache (must-revalidate)

### API Routes
- **Dynamic Content**: 1 hour cache, 24h stale-while-revalidate
- **Frequent Updates**: 5 minutes cache, 1h stale-while-revalidate
- **Real-time**: No cache

### Using Cache Utilities

```typescript
import { getCacheControlHeader, getFetchCacheOptions } from '@/lib/cache';

// Get cache header
const cacheHeader = getCacheControlHeader('DYNAMIC');

// Get fetch cache options
const fetchOptions = getFetchCacheOptions('DYNAMIC');
```

## Performance Monitoring

### Web Vitals Tracking

Core Web Vitals are automatically reported to Google Analytics (if configured):

```typescript
// Automatically tracks:
// - LCP (Largest Contentful Paint)
// - FID (First Input Delay)
// - CLS (Cumulative Layout Shift)
// - FCP (First Contentful Paint)
// - TTFB (Time to First Byte)
// - INP (Interaction to Next Paint)
```

### Performance Utilities

```typescript
import { getPerformanceMetrics } from '@/lib/performance';

// Get performance metrics
const metrics = getPerformanceMetrics();
// Returns: { lcp, fid, cls, dns, tcp, request, response, dom, load, total }
```

## Optimization Checklist

### Page Load
- [ ] Images are optimized and lazy loaded
- [ ] Critical CSS is inlined
- [ ] Fonts are preloaded
- [ ] JavaScript is code-split
- [ ] Third-party scripts are deferred

### Runtime Performance
- [ ] Components are memoized when appropriate
- [ ] Event handlers use `useCallback`
- [ ] Expensive computations are memoized
- [ ] Unnecessary re-renders are prevented

### Network
- [ ] API responses are cached appropriately
- [ ] Static assets use CDN
- [ ] Compression is enabled
- [ ] HTTP/2 is used

## Performance Targets

### Lighthouse Scores
- **Performance**: > 95
- **Accessibility**: > 95
- **Best Practices**: > 95
- **SEO**: > 95

### Core Web Vitals
- **LCP**: < 1.5s (target), < 2.5s (acceptable)
- **FID**: < 100ms
- **CLS**: < 0.1
- **FCP**: < 1.5s
- **TTFB**: < 600ms

## Tools

### Development
- **Next.js DevTools**: Built-in performance insights
- **React DevTools Profiler**: Component performance analysis
- **Chrome DevTools Performance**: Runtime performance analysis

### Production
- **Vercel Analytics**: Real-time performance metrics
- **Google PageSpeed Insights**: Performance scoring
- **WebPageTest**: Detailed performance analysis
- **Lighthouse CI**: Automated performance testing

## Resources

- [Web.dev Performance](https://web.dev/performance/)
- [Next.js Performance](https://nextjs.org/docs/app/building-your-application/optimizing)
- [Core Web Vitals](https://web.dev/vitals/)
- [Chrome DevTools Performance](https://developer.chrome.com/docs/devtools/performance/)

