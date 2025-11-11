import { notFound } from 'next/navigation';
import { Calendar, Clock, ArrowLeft, ExternalLink, Tag } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';
import { getMediumPost, type MediumPost } from '@/lib/medium';
import type { Metadata } from 'next';
import { generateMetadata as generateSEOMetadata, generateArticleSchema } from "@/lib/seo";
import StructuredData from "@/components/StructuredData";

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await getMediumPost(params.slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found.',
    };
  }

  return generateSEOMetadata({
    title: post.title,
    description: post.description,
    url: post.link,
    image: post.thumbnail || "/og.png",
    type: "article",
    publishedTime: post.pubDate,
    author: "VoxHash",
    tags: post.categories || [],
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getMediumPost(params.slug);
  
  if (!post) {
    notFound();
  }

  const articleSchema = generateArticleSchema({
    title: post.title,
    description: post.description,
    image: post.thumbnail || "/og.png",
    publishedTime: post.pubDate,
    author: "VoxHash",
    section: "Blog",
    tags: post.categories || [],
  });

  return (
    <>
      <StructuredData type="custom" data={articleSchema} />
      <div className="py-12">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <div className="mb-8">
          <Link 
            href="/blog" 
            className="link mb-6 inline-flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>
        </div>

        {/* Post Header */}
        <header className="mb-8">
          <div className="flex items-center gap-4 text-sm text-neutral-500 dark:text-neutral-400 mb-6">
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {format(new Date(post.pubDate), 'MMM dd, yyyy')}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {post.readTime}
            </span>
            <span className="flex items-center gap-1">
              <ExternalLink className="h-4 w-4" />
              Medium
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            {post.title}
          </h1>
          
          <p className="text-xl text-neutral-600 dark:text-neutral-300 leading-relaxed mb-6">
            {post.description}
          </p>

          {/* Tags */}
          {post.categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {post.categories.map((tag) => (
                <span 
                  key={tag}
                  className="badge bg-brand/10 text-brand border-brand/20 text-sm flex items-center gap-1"
                >
                  <Tag className="h-3 w-3" />
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Post Content Preview */}
        <article className="prose prose-lg max-w-none dark:prose-invert mb-12">
          <div className="bg-neutral-50 dark:bg-neutral-800 rounded-xl p-8 text-center">
            <h3 className="text-xl font-semibold mb-4 text-neutral-900 dark:text-neutral-100">
              This post is published on Medium
            </h3>
            <p className="text-neutral-600 dark:text-neutral-300 mb-6">
              To read the full article with proper formatting, images, and interactive elements, 
              please visit the original post on Medium.
            </p>
            <a
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="btn hover-glow inline-flex items-center gap-2"
            >
              <ExternalLink className="h-4 w-4" />
              Read Full Article on Medium
            </a>
          </div>
        </article>

        {/* Call to Action */}
        <div className="card p-8 bg-gradient-to-r from-brand/10 to-brand-light/10 border-brand/20 text-center">
          <h3 className="text-2xl font-semibold mb-4">Enjoyed this article?</h3>
          <p className="text-neutral-600 dark:text-neutral-300 mb-6 max-w-2xl mx-auto">
            Follow me on Medium for more articles about web development, AI integration, 
            and building scalable applications. I publish new content regularly!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://medium.com/@VoxHash"
              target="_blank"
              rel="noopener noreferrer"
              className="btn hover-glow"
            >
              Follow on Medium
            </a>
            <Link
              href="/blog"
              className="badge hover:bg-brand/10 hover:text-brand transition-colors duration-200"
            >
              Browse All Articles
            </Link>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
