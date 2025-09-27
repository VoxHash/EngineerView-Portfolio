"use client";
import { useEffect, useState } from "react";
import { Calendar, Heart, MessageCircle, Share, ExternalLink, Linkedin, Hash, AtSign } from "lucide-react";
import { format } from "date-fns";
import { fetchLinkedInPosts, type LinkedInPost } from "@/lib/linkedin";

export default function FeedPage() {
  const [posts, setPosts] = useState<LinkedInPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const linkedInPosts = await fetchLinkedInPosts();
        setPosts(linkedInPosts);
      } catch (err) {
        console.error('Error fetching LinkedIn posts:', err);
        setError('Failed to load LinkedIn posts');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (isLoading) {
    return (
      <div className="py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            LinkedIn <span className="text-brand">Feed</span>
          </h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-300">
            Loading latest posts...
          </p>
        </div>
        <div className="max-w-2xl mx-auto space-y-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="card p-6 animate-pulse">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-neutral-200 dark:bg-neutral-700 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded mb-2"></div>
                  <div className="h-3 bg-neutral-200 dark:bg-neutral-700 rounded w-2/3"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded"></div>
                <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-3/4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            LinkedIn <span className="text-brand">Feed</span>
          </h1>
          <p className="text-lg text-red-600 dark:text-red-400 mb-8">
            {error}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="btn hover-glow"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">
          LinkedIn <span className="text-brand">Feed</span>
        </h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto mb-8">
          Latest posts and updates from my professional journey on LinkedIn. 
          <span className="text-sm text-neutral-500 dark:text-neutral-400 block mt-2">
            Featuring my thoughts on web development, AI integration, and building scalable applications.
          </span>
        </p>
        
        <a
          href="https://linkedin.com/in/voxhash"
          target="_blank"
          rel="noopener noreferrer"
          className="btn inline-flex items-center gap-2"
        >
          <Linkedin className="h-4 w-4" />
          Follow on LinkedIn
        </a>
      </div>

      <div className="max-w-2xl mx-auto space-y-6">
        {posts.map((post) => (
          <article key={post.id} className="card p-6 hover-glow">
            {/* Author Info */}
            <div className="flex items-start gap-4 mb-4">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
                  {post.author.name}
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  {post.author.title} at {post.author.company}
                </p>
                <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                  <Calendar className="h-3 w-3" />
                  {format(new Date(post.publishedAt), 'MMM dd, yyyy • h:mm a')}
                </div>
              </div>
            </div>

            {/* Post Content */}
            <div className="mb-4">
              <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed whitespace-pre-line">
                {post.content.split(' ').map((word, index) => {
                  if (word.startsWith('#')) {
                    return (
                      <span key={index} className="text-brand hover:text-brand-dark font-medium cursor-pointer">
                        {word}{' '}
                      </span>
                    );
                  }
                  if (word.startsWith('@')) {
                    return (
                      <span key={index} className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium cursor-pointer">
                        {word}{' '}
                      </span>
                    );
                  }
                  return word + ' ';
                })}
              </p>
            </div>

            {/* Hashtags and Mentions */}
            {(post.hashtags?.length || post.mentions?.length) && (
              <div className="mb-4 flex flex-wrap gap-2">
                {post.hashtags?.map((hashtag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 text-xs bg-brand/10 text-brand px-2 py-1 rounded-full hover:bg-brand/20 transition-colors cursor-pointer"
                  >
                    <Hash className="h-3 w-3" />
                    {hashtag.replace('#', '')}
                  </span>
                ))}
                {post.mentions?.map((mention, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 text-xs bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-2 py-1 rounded-full hover:bg-blue-200 dark:hover:bg-blue-900/30 transition-colors cursor-pointer"
                  >
                    <AtSign className="h-3 w-3" />
                    {mention.replace('@', '')}
                  </span>
                ))}
              </div>
            )}

            {/* Article Preview */}
            {post.type === 'article' && post.articleUrl && (
              <div className="border border-neutral-200 dark:border-neutral-700 rounded-lg p-4 mb-4 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors">
                <h4 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                  {post.articleTitle}
                </h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
                  {post.articleDescription}
                </p>
                <a
                  href={post.articleUrl}
                  className="text-brand hover:text-brand-dark text-sm font-medium inline-flex items-center gap-1"
                >
                  Read more
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            )}

            {/* Engagement Stats */}
            <div className="flex items-center justify-between text-sm text-neutral-500 dark:text-neutral-400 pt-4 border-t border-neutral-200 dark:border-neutral-700">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <Heart className="h-4 w-4" />
                  {post.likes}
                </span>
                <span className="flex items-center gap-1">
                  <MessageCircle className="h-4 w-4" />
                  {post.comments}
                </span>
                <span className="flex items-center gap-1">
                  <Share className="h-4 w-4" />
                  {post.shares}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button className="hover:text-brand transition-colors">
                  <Heart className="h-4 w-4" />
                </button>
                <button className="hover:text-brand transition-colors">
                  <MessageCircle className="h-4 w-4" />
                </button>
                <button className="hover:text-brand transition-colors">
                  <Share className="h-4 w-4" />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
