"use client";

import { useEffect, useState } from "react";
import { Calendar, Heart, MessageCircle, Repeat2, ExternalLink, Twitter } from "lucide-react";
import { format } from "date-fns";
import { fetchTweets, type Tweet } from "@/lib/twitter";
import Image from "next/image";
import { generateBlurDataURL } from "@/lib/image-optimization";

export default function TwitterPage() {
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTweets = async () => {
      try {
        setIsLoading(true);
        const data = await fetch('/api/twitter');
        if (!data.ok) {
          throw new Error('Failed to fetch tweets');
        }
        const result = await data.json();
        if (result.success) {
          setTweets(result.data.tweets || []);
        } else {
          setError(result.message || 'Failed to load tweets');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load tweets');
      } finally {
        setIsLoading(false);
      }
    };

    loadTweets();
  }, []);

  return (
    <div className="py-12">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Twitter className="h-8 w-8 text-[#1DA1F2]" />
          <h1 className="text-4xl md:text-5xl font-bold">
            Twitter / <span className="text-brand">X</span> Feed
          </h1>
        </div>
        <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto mb-8">
          Latest posts and thoughts from my Twitter/X account.
          <span className="text-sm text-neutral-500 dark:text-neutral-400 block mt-2">
            Sharing insights on technology, development, and industry trends.
          </span>
        </p>
        
        {(process.env.TWITTER_USERNAME || process.env.X_USERNAME) && (
          <a
            href={`https://twitter.com/${process.env.TWITTER_USERNAME || process.env.X_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn inline-flex items-center gap-2"
          >
            <Twitter className="h-4 w-4" />
            View Profile on Twitter/X
          </a>
        )}
      </div>

      <div className="max-w-2xl mx-auto space-y-6">
        {isLoading ? (
          <div className="card p-8 text-center">
            <div className="w-8 h-8 border-4 border-brand border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-neutral-600 dark:text-neutral-300">Loading tweets...</p>
          </div>
        ) : error ? (
          <div className="card p-8 text-center">
            <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              Make sure to configure TWITTER_USERNAME or X_USERNAME in your environment variables.
              {process.env.TWITTER_BEARER_TOKEN || process.env.X_BEARER_TOKEN
                ? ' Twitter API is configured.'
                : ' For better results, configure TWITTER_BEARER_TOKEN or X_BEARER_TOKEN.'}
            </p>
          </div>
        ) : tweets.length === 0 ? (
          <div className="card p-8 text-center">
            <p className="text-neutral-600 dark:text-neutral-300 mb-4">
              No tweets found. Make sure to configure Twitter/X credentials in your environment variables.
            </p>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              The feed will display your latest tweets once configured.
            </p>
          </div>
        ) : (
          tweets.map((tweet) => (
            <article key={tweet.id} className="card p-6 hover-glow">
              {/* Author Info */}
              <div className="flex items-start gap-4 mb-4">
                {tweet.author.avatar ? (
                  <Image
                    src={tweet.author.avatar}
                    alt={`${tweet.author.name}'s avatar`}
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-brand/10 flex items-center justify-center">
                    <Twitter className="h-6 w-6 text-brand" />
                  </div>
                )}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
                      {tweet.author.name}
                    </h3>
                    <span className="text-neutral-400">@</span>
                    <span className="text-neutral-500 dark:text-neutral-400">
                      {tweet.author.username}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
                    <Calendar className="h-3 w-3" />
                    {format(new Date(tweet.publishedAt), 'MMM dd, yyyy • h:mm a')}
                  </div>
                </div>
              </div>

              {/* Tweet Content */}
              <div className="mb-4">
                <p className="text-neutral-900 dark:text-neutral-100 leading-relaxed whitespace-pre-wrap">
                  {tweet.text}
                </p>
              </div>

              {/* Media */}
              {tweet.media && tweet.media.length > 0 && (
                <div className="mb-4 grid grid-cols-2 gap-2">
                  {tweet.media.map((media, idx) => (
                    <div key={idx} className="rounded-lg overflow-hidden">
                      {media.type === 'photo' && media.url && (
                        <Image
                          src={media.url}
                          alt={`Tweet media ${idx + 1}`}
                          width={400}
                          height={300}
                          className="w-full h-auto object-cover"
                          loading="lazy"
                          quality={85}
                          placeholder="blur"
                          blurDataURL={generateBlurDataURL(400, 300)}
                          sizes="(max-width: 768px) 100vw, 400px"
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Engagement Metrics */}
              <div className="flex items-center gap-6 text-sm text-neutral-500 dark:text-neutral-400 pt-4 border-t border-neutral-200 dark:border-neutral-800">
                {tweet.replies !== undefined && (
                  <span className="flex items-center gap-1" aria-label={`${tweet.replies} replies`}>
                    <MessageCircle className="h-4 w-4" aria-hidden="true" />
                    {tweet.replies}
                  </span>
                )}
                {tweet.retweets !== undefined && (
                  <span className="flex items-center gap-1" aria-label={`${tweet.retweets} retweets`}>
                    <Repeat2 className="h-4 w-4" aria-hidden="true" />
                    {tweet.retweets}
                  </span>
                )}
                {tweet.likes !== undefined && (
                  <span className="flex items-center gap-1" aria-label={`${tweet.likes} likes`}>
                    <Heart className="h-4 w-4" aria-hidden="true" />
                    {tweet.likes}
                  </span>
                )}
                <a
                  href={tweet.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-auto flex items-center gap-1 text-brand hover:text-brand-dark transition-colors focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2 rounded"
                  aria-label="View tweet on Twitter/X (opens in new tab)"
                >
                  View on Twitter/X
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
}

