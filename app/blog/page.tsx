import Link from "next/link";
import { Calendar, Clock, ArrowRight, Rss } from "lucide-react";
import { format } from "date-fns";
import type { Metadata } from "next";
import { getPageOGImage } from "@/lib/og";

export const metadata: Metadata = {
  title: "Blog & Tutorials - VoxHash",
  description: "Read my latest thoughts on web development, AI integration, and building scalable applications.",
  openGraph: {
    title: "Blog & Tutorials - VoxHash",
    description: "Read my latest thoughts on web development, AI integration, and building scalable applications.",
    images: [getPageOGImage('blog')]
  },
  twitter: {
    card: "summary_large_image",
    images: [getPageOGImage('blog')]
  }
};

// Mock blog posts data - in a real app, this would come from a CMS or file system
const blogPosts = [
  {
    slug: "building-scalable-nextjs-apps",
    title: "Building Scalable Next.js Applications",
    excerpt: "Learn how to architect and build production-ready Next.js applications that can handle millions of users with proper performance optimization techniques.",
    date: "2024-01-15",
    readTime: "8 min read",
    tags: ["Next.js", "Performance", "Architecture"],
    featured: true
  },
  {
    slug: "ai-integration-guide",
    title: "Complete Guide to AI Integration in Web Apps",
    excerpt: "A comprehensive guide to integrating AI capabilities into your web applications, covering everything from API design to user experience considerations.",
    date: "2024-01-10",
    readTime: "12 min read",
    tags: ["AI", "Web Development", "Tutorial"],
    featured: true
  },
  {
    slug: "typescript-best-practices",
    title: "TypeScript Best Practices for Large Codebases",
    excerpt: "Essential TypeScript patterns and practices that will help you maintain clean, scalable code in large applications.",
    date: "2024-01-05",
    readTime: "6 min read",
    tags: ["TypeScript", "Best Practices", "Code Quality"],
    featured: false
  },
  {
    slug: "modern-css-techniques",
    title: "Modern CSS Techniques for Better UX",
    excerpt: "Explore advanced CSS techniques including container queries, CSS Grid, and modern layout patterns that enhance user experience.",
    date: "2024-01-01",
    readTime: "10 min read",
    tags: ["CSS", "UX", "Frontend"],
    featured: false
  }
];

export default function BlogPage() {
  const featuredPosts = blogPosts.filter(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

  return (
    <div className="py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Blog & <span className="text-brand">Tutorials</span>
        </h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto mb-6">
          Thoughts on web development, AI integration, and building scalable applications. 
          Sharing knowledge and experiences from the trenches.
        </p>
        <div className="flex items-center justify-center gap-4">
          <a 
            href="/rss.xml" 
            className="badge hover:bg-brand/10 hover:text-brand transition-colors duration-200 flex items-center gap-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Rss className="h-4 w-4" />
            RSS Feed
          </a>
          <a 
            href="/atom.xml" 
            className="badge hover:bg-brand/10 hover:text-brand transition-colors duration-200 flex items-center gap-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Rss className="h-4 w-4" />
            Atom Feed
          </a>
        </div>
      </div>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8">Featured Articles</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {featuredPosts.map((post, index) => (
            <article
              key={post.slug}
              className="card p-8 hover-glow hover-scale group cursor-pointer"
            >
                <div className="flex items-center gap-4 text-sm text-neutral-500 dark:text-neutral-400 mb-4">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {format(new Date(post.date), 'MMM dd, yyyy')}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {post.readTime}
                  </span>
                </div>

                <h3 className="text-xl font-semibold mb-3 group-hover:text-brand transition-colors duration-200">
                  {post.title}
                </h3>

                <p className="text-neutral-600 dark:text-neutral-300 mb-4 leading-relaxed">
                  {post.excerpt}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {post.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="badge bg-brand/10 text-brand border-brand/20 text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <Link 
                  href={`/blog/${post.slug}`}
                  className="link group-hover:text-brand transition-colors duration-200"
                >
                  Read more
                  <ArrowRight className="inline h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* All Posts */}
      <section>
        <h2 className="text-2xl font-bold mb-8">All Articles</h2>
        <div className="space-y-6">
          {blogPosts.map((post, index) => (
            <article
              key={post.slug}
              className="card p-6 hover-glow hover-scale group cursor-pointer"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-4 text-sm text-neutral-500 dark:text-neutral-400 mb-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {format(new Date(post.date), 'MMM dd, yyyy')}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {post.readTime}
                    </span>
                    {post.featured && (
                      <span className="badge bg-yellow-100 text-yellow-800 border-yellow-200 text-xs">
                        Featured
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-semibold mb-2 group-hover:text-brand transition-colors duration-200">
                    {post.title}
                  </h3>

                  <p className="text-neutral-600 dark:text-neutral-300 mb-3">
                    {post.excerpt}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span 
                        key={tag}
                        className="badge text-xs bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <Link 
                  href={`/blog/${post.slug}`}
                  className="link group-hover:text-brand transition-colors duration-200 flex items-center gap-1"
                >
                  Read more
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
