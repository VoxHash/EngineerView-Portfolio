# CDN Integration Guide

This guide explains CDN integration options for the EnginerView Portfolio project.

## 📋 Current State

### Vercel Edge Network (Already Active)

Your project is deployed on **Vercel**, which automatically provides:
- ✅ **Global CDN**: All static assets and pages are served from Vercel's Edge Network
- ✅ **Automatic optimization**: Images, fonts, and static files are optimized and cached
- ✅ **Edge caching**: Pages and API routes are cached at edge locations worldwide
- ✅ **Automatic HTTPS**: SSL/TLS certificates managed automatically

**You already have CDN integration!** Vercel's Edge Network provides excellent performance out of the box.

## 🎯 When to Consider Additional CDN

You might want additional CDN integration if:

1. **High traffic volumes**: Need more bandwidth or better performance
2. **Custom domain requirements**: Want to use a specific CDN provider
3. **Advanced caching rules**: Need more granular control over caching
4. **Media-heavy content**: Large video files or extensive image galleries
5. **Global audience**: Need edge locations in specific regions

## 🚀 Implementation Options

### Option 1: Vercel Edge Network (Recommended - Already Active)

No additional configuration needed. Vercel automatically:
- Serves all static assets from edge locations
- Optimizes images through Next.js Image Optimization
- Caches pages and API routes at the edge

**Configuration** (already in place):
```javascript
// next.config.mjs - No changes needed
// Vercel handles CDN automatically
```

### Option 2: Custom CDN for Static Assets

If you want to use a custom CDN (Cloudflare, AWS CloudFront, etc.) for static assets:

#### Step 1: Configure Asset Prefix

```javascript
// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Add asset prefix for CDN
  assetPrefix: process.env.CDN_URL || '',
  
  images: {
    // Configure CDN domain for images
    domains: process.env.CDN_DOMAIN ? [process.env.CDN_DOMAIN] : [],
    remotePatterns: [
      // ... existing patterns
    ],
  },
  
  // Optional: Configure base path if using subdirectory
  // basePath: '/portfolio',
};

export default nextConfig;
```

#### Step 2: Environment Variables

```bash
# .env.local
CDN_URL=https://cdn.yourdomain.com
CDN_DOMAIN=cdn.yourdomain.com
```

#### Step 3: Update Image References

```typescript
// lib/cdn.ts
export const getCDNUrl = (path: string): string => {
  const cdnUrl = process.env.NEXT_PUBLIC_CDN_URL;
  if (!cdnUrl) return path;
  
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${cdnUrl}/${cleanPath}`;
};

// Usage in components
import { getCDNUrl } from '@/lib/cdn';
import Image from 'next/image';

<Image
  src={getCDNUrl('/og.png')}
  alt="OG Image"
  width={1200}
  height={630}
/>
```

### Option 3: Cloudflare CDN (Popular Choice)

#### Step 1: Set up Cloudflare

1. Add your domain to Cloudflare
2. Update DNS records to point to Cloudflare
3. Configure Cloudflare to proxy through to Vercel

#### Step 2: Configure Cloudflare Settings

- **Caching Level**: Standard
- **Browser Cache TTL**: 4 hours
- **Edge Cache TTL**: 1 month
- **Auto Minify**: Enable for HTML, CSS, JS
- **Brotli Compression**: Enable

#### Step 3: Page Rules (Optional)

```
# Cache static assets aggressively
https://yourdomain.com/_next/static/* → Cache Level: Cache Everything, Edge Cache TTL: 1 month

# Cache images
https://yourdomain.com/*.jpg → Cache Level: Cache Everything, Edge Cache TTL: 1 month
https://yourdomain.com/*.png → Cache Level: Cache Everything, Edge Cache TTL: 1 month
```

### Option 4: AWS CloudFront CDN

#### Step 1: Create CloudFront Distribution

1. Create S3 bucket or use Vercel as origin
2. Create CloudFront distribution
3. Configure caching behaviors

#### Step 2: Update DNS

Point your domain to CloudFront distribution.

#### Step 3: Configure Next.js

```javascript
// next.config.mjs
const nextConfig = {
  assetPrefix: process.env.CLOUDFRONT_URL,
  images: {
    domains: [process.env.CLOUDFRONT_DOMAIN],
  },
};
```

## 📦 Static Asset Optimization

### Current Setup

Your static assets in `/public` are automatically served via Vercel's CDN:
- `favicon.ico`
- `favicon-16x16.png`
- `favicon-32x32.png`
- `og.png`
- `VoxHash_Resume.pdf`

### Optimization Best Practices

1. **Image Optimization**:
```typescript
// Already using Next.js Image component
import Image from 'next/image';

<Image
  src="/og.png"
  alt="OG Image"
  width={1200}
  height={630}
  priority={true} // For above-the-fold images
  quality={90} // Adjust quality (1-100)
/>
```

2. **Font Optimization**:
```typescript
// app/layout.tsx
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap', // Optimize font loading
  preload: true,
});
```

3. **Static Asset Caching**:
```javascript
// next.config.mjs
const nextConfig = {
  // Headers for static assets
  async headers() {
    return [
      {
        source: '/:path*.(jpg|jpeg|png|gif|svg|webp|ico)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:path*.(pdf)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, must-revalidate',
          },
        ],
      },
    ];
  },
};
```

## 🔧 Advanced Configuration

### Custom Cache Headers

```javascript
// next.config.mjs
const nextConfig = {
  async headers() {
    return [
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, stale-while-revalidate=604800',
          },
        ],
      },
    ];
  },
};
```

### CDN Helper Utilities

```typescript
// lib/cdn.ts
export const CDN_CONFIG = {
  url: process.env.NEXT_PUBLIC_CDN_URL || '',
  enabled: !!process.env.NEXT_PUBLIC_CDN_URL,
};

/**
 * Get CDN URL for a static asset
 */
export function getCDNUrl(path: string): string {
  if (!CDN_CONFIG.enabled) {
    return path;
  }
  
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${CDN_CONFIG.url}/${cleanPath}`;
}

/**
 * Get optimized image URL
 */
export function getImageUrl(path: string, width?: number, quality?: number): string {
  const baseUrl = getCDNUrl(path);
  
  if (width || quality) {
    const params = new URLSearchParams();
    if (width) params.set('w', width.toString());
    if (quality) params.set('q', quality.toString());
    return `${baseUrl}?${params.toString()}`;
  }
  
  return baseUrl;
}
```

## 📊 Performance Monitoring

### Check CDN Performance

1. **Vercel Analytics**: Built-in performance metrics
2. **Google PageSpeed Insights**: Test CDN effectiveness
3. **WebPageTest**: Detailed performance analysis
4. **Lighthouse**: Core Web Vitals monitoring

### Monitor Cache Hit Rates

```typescript
// app/api/cdn-stats/route.ts (if using custom CDN)
export async function GET() {
  // Fetch CDN statistics from your provider's API
  // Return cache hit rates, bandwidth usage, etc.
}
```

## ✅ Recommendation

**For your current setup, no additional CDN is needed.**

Vercel's Edge Network provides:
- ✅ Global CDN coverage
- ✅ Automatic optimization
- ✅ Excellent performance
- ✅ Zero configuration

**Consider additional CDN only if:**
- You experience performance issues in specific regions
- You need advanced caching rules
- You have very high traffic volumes
- You want to use a specific CDN provider for business reasons

## 🚀 Quick Start (If Needed)

If you decide to add a custom CDN:

1. **Choose a CDN provider** (Cloudflare, AWS CloudFront, etc.)
2. **Set up the CDN** with your domain
3. **Configure environment variables**:
   ```bash
   NEXT_PUBLIC_CDN_URL=https://cdn.yourdomain.com
   ```
4. **Update `next.config.mjs`** with asset prefix (optional)
5. **Test thoroughly** before deploying

## 📚 Additional Resources

- [Vercel Edge Network Documentation](https://vercel.com/docs/edge-network)
- [Next.js Asset Prefix](https://nextjs.org/docs/api-reference/next.config.js/assetPrefix)
- [Cloudflare CDN Setup](https://developers.cloudflare.com/cache/)
- [AWS CloudFront Guide](https://docs.aws.amazon.com/cloudfront/)

---

**Last Updated**: January 2025

