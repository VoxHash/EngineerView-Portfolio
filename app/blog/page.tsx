import Link from "next/link";
import { Calendar, Clock, ArrowRight, Rss, ExternalLink } from "lucide-react";
import { format } from "date-fns";
import type { Metadata } from "next";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";
import { fetchMediumPosts, type MediumPost } from "@/lib/medium";

export const metadata: Metadata = generateSEOMetadata({
  title: "Blog & Tutorials",
  description: "Read my latest thoughts on web development, AI integration, and building scalable applications.",
  keywords: ["blog", "tutorials", "web development", "AI", "programming", "software engineering"],
  url: "/blog",
  image: "/og.png",
  type: "website",
});

export default async function BlogPage() {
  // Fetch posts from Medium
  const mediumPosts = await fetchMediumPosts();
  
  // Convert Medium posts to the format expected by the UI
  const blogPosts = mediumPosts.map(post => ({
    slug: post.slug,
    title: post.title,
    excerpt: post.description,
    date: post.pubDate,
    readTime: post.readTime,
    tags: post.categories,
    featured: post.featured,
    link: post.link
  }));

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
          Sharing knowledge and experiences from the trenches on Medium.
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <a 
            href="https://medium.com/@VoxHash" 
            className="badge hover:bg-brand/10 hover:text-brand transition-colors duration-200 flex items-center gap-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            <ExternalLink className="h-4 w-4" />
            Follow on Medium
          </a>
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

                <a 
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link group-hover:text-brand transition-colors duration-200 flex items-center gap-1"
                >
                  Read on Medium
                  <ExternalLink className="inline h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                </a>
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

                <a 
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link group-hover:text-brand transition-colors duration-200 flex items-center gap-1"
                >
                  Read on Medium
                  <ExternalLink className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
