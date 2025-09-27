import { generateAtom } from '@/lib/rss';
import { SITE } from '@/lib/site';

// Mock blog posts data - in a real app, this would come from a CMS or file system
const mockPosts = [
  {
    slug: 'building-scalable-nextjs-apps',
    title: 'Building Scalable Next.js Applications',
    description: 'Learn how to build scalable Next.js applications with best practices for performance, SEO, and developer experience.',
    date: '2024-01-15',
    content: 'Full blog post content...'
  },
  {
    slug: 'modern-web-development-trends',
    title: 'Modern Web Development Trends in 2024',
    description: 'Exploring the latest trends in web development including AI integration, edge computing, and new frameworks.',
    date: '2024-01-10',
    content: 'Full blog post content...'
  },
  {
    slug: 'typescript-best-practices',
    title: 'TypeScript Best Practices for Large Applications',
    description: 'Essential TypeScript patterns and practices for maintaining large-scale applications with confidence.',
    date: '2024-01-05',
    content: 'Full blog post content...'
  }
];

export async function GET() {
  const atom = generateAtom(mockPosts);
  
  return new Response(atom, {
    headers: {
      'Content-Type': 'application/atom+xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600'
    }
  });
}
