"use client";
import { useEffect, useState } from "react";
import { Calendar, ArrowUp, MessageCircle, ExternalLink, Hash } from "lucide-react";
import { format } from "date-fns";
import { fetchRedditPosts, type RedditPost } from "@/lib/reddit";
import Image from "next/image";
import { generateBlurDataURL } from "@/lib/image-optimization";

export default function FeedPage() {
  const [posts, setPosts] = useState<RedditPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const redditPosts = await fetchRedditPosts(undefined, 10);
        setPosts(redditPosts);
      } catch (err) {
        console.error('Error fetching Reddit posts:', err);
        setError('Failed to load Reddit posts');
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
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center">
              <Hash className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Reddit <span className="text-brand">Feed</span>
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Reddit <span className="text-brand">Feed</span>
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
        <div className="flex items-center justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center">
            <Hash className="h-8 w-8 text-white" />
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Reddit <span className="text-brand">Feed</span>
        </h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto mb-8">
          Latest posts and discussions from my Reddit activity.
          <span className="text-sm text-neutral-500 dark:text-neutral-400 block mt-2">
            Sharing thoughts on technology, development, and community discussions.
          </span>
        </p>
        
        <a
          href="https://www.reddit.com/user/voxhash"
          target="_blank"
          rel="noopener noreferrer"
          className="btn inline-flex items-center gap-2"
        >
          <Hash className="h-4 w-4" />
          View Profile on Reddit
        </a>
      </div>

      <div className="max-w-2xl mx-auto space-y-6">
        {posts.length === 0 ? (
          <div className="card p-8 text-center">
            <p className="text-neutral-600 dark:text-neutral-300 mb-4">
              No posts found. Make sure to configure REDDIT_USERNAME in your environment variables.
            </p>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              The feed will display your latest Reddit posts once configured.
            </p>
          </div>
        ) : (
          posts.map((post) => (
            <article key={post.id} className="card p-6 hover-glow">
              {/* Author and Subreddit Info */}
              <div className="flex items-start gap-4 mb-4">
                <Image
                  src={post.author.avatar}
                  alt={`${post.author.name}'s avatar`}
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full object-cover"
                  loading="lazy"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
                      u/{post.author.name}
                    </h3>
                    <span className="text-neutral-400">•</span>
                    <a
                      href={`https://www.reddit.com/r/${post.subreddit}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-brand hover:text-brand-dark font-medium"
                    >
                      r/{post.subreddit}
                    </a>
                  </div>
                  {post.flair && (
                    <span className="inline-block text-xs bg-brand/10 text-brand px-2 py-0.5 rounded-full mb-1">
                      {post.flair}
                    </span>
                  )}
                  <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                    <Calendar className="h-3 w-3" />
                    {format(new Date(post.publishedAt), 'MMM dd, yyyy • h:mm a')}
                    {post.domain && (
                      <>
                        <span>•</span>
                        <span className="text-neutral-400">{post.domain}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Post Title */}
              <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-3">
                {post.title}
              </h2>

              {/* Post Image */}
              {post.imageUrl && (
                <div className="mb-4 rounded-lg overflow-hidden">
                  <Image
                    src={post.imageUrl}
                    alt={post.title}
                    width={800}
                    height={600}
                    className="w-full h-auto object-cover"
                    loading="lazy"
                    quality={85}
                    placeholder="blur"
                    blurDataURL={generateBlurDataURL(800, 600)}
                    sizes="(max-width: 768px) 100vw, 800px"
                  />
                </div>
              )}

              {/* Post Content */}
              {post.content && post.isSelfPost && (
                <div className="mb-4">
                  <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed whitespace-pre-line">
                    {post.content}
                  </p>
                </div>
              )}

              {/* Link Preview for Link Posts */}
              {post.type === 'link' && !post.isSelfPost && post.url && (
                <div className="border border-neutral-200 dark:border-neutral-700 rounded-lg p-4 mb-4 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors">
                  <a
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand hover:text-brand-dark text-sm font-medium inline-flex items-center gap-1"
                  >
                    View Link
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              )}

              {/* Video Preview */}
              {post.videoUrl && (
                <div className="mb-4 rounded-lg overflow-hidden">
                  <video
                    src={post.videoUrl}
                    controls
                    className="w-full"
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
              )}

              {/* Engagement Stats */}
              <div className="flex items-center justify-between text-sm text-neutral-500 dark:text-neutral-400 pt-4 border-t border-neutral-200 dark:border-neutral-700">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <ArrowUp className="h-4 w-4" />
                    {post.upvotes}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="h-4 w-4" />
                    {post.comments}
                  </span>
                </div>
                <a
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand hover:text-brand-dark inline-flex items-center gap-1 text-sm font-medium"
                >
                  View on Reddit
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
}
