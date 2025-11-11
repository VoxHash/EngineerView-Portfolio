/**
 * Twitter/X Integration
 * 
 * Fetches tweets from Twitter/X using the Twitter API v2 or RSS feed.
 * Note: Twitter API v2 requires authentication. RSS feed is a fallback option.
 */

import { getFetchCacheOptions } from './cache';

export interface Tweet {
  id: string;
  text: string;
  author: {
    name: string;
    username: string;
    avatar?: string;
  };
  publishedAt: string;
  url: string;
  likes?: number;
  retweets?: number;
  replies?: number;
  media?: {
    type: 'photo' | 'video' | 'gif';
    url: string;
    thumbnail?: string;
  }[];
  isRetweet?: boolean;
  retweetedBy?: string;
}

interface TwitterAPIResponse {
  data?: {
    id: string;
    text: string;
    created_at: string;
    public_metrics?: {
      like_count: number;
      retweet_count: number;
      reply_count: number;
    };
    author_id?: string;
    attachments?: {
      media_keys?: string[];
    };
  }[];
  includes?: {
    users?: {
      id: string;
      name: string;
      username: string;
      profile_image_url?: string;
    }[];
    media?: {
      type: string;
      url?: string;
      preview_image_url?: string;
      media_key: string;
    }[];
  };
}

/**
 * Fetch tweets using Twitter API v2 (requires Bearer Token)
 */
export async function fetchTweetsAPI(
  username: string,
  bearerToken: string,
  limit: number = 10
): Promise<Tweet[]> {
  try {
    // First, get user ID
    const userResponse = await fetch(
      `https://api.twitter.com/2/users/by/username/${username}`,
      {
        headers: {
          'Authorization': `Bearer ${bearerToken}`,
        },
        ...getFetchCacheOptions('DYNAMIC')
      }
    );

    if (!userResponse.ok) {
      throw new Error(`Failed to fetch Twitter user: ${userResponse.status}`);
    }

    const userData = await userResponse.json();
    const userId = userData.data?.id;

    if (!userId) {
      throw new Error('Twitter user not found');
    }

    // Fetch user's tweets
    const tweetsResponse = await fetch(
      `https://api.twitter.com/2/users/${userId}/tweets?max_results=${limit}&tweet.fields=created_at,public_metrics&expansions=author_id,attachments.media_keys&user.fields=profile_image_url&media.fields=type,url,preview_image_url`,
      {
        headers: {
          'Authorization': `Bearer ${bearerToken}`,
        },
        ...getFetchCacheOptions('DYNAMIC')
      }
    );

    if (!tweetsResponse.ok) {
      throw new Error(`Failed to fetch tweets: ${tweetsResponse.status}`);
    }

    const tweetsData: TwitterAPIResponse = await tweetsResponse.json();
    const users = tweetsData.includes?.users || [];
    const media = tweetsData.includes?.media || [];

    return (tweetsData.data || []).map((tweet) => {
      const author = users.find((u) => u.id === tweet.author_id) || {
        name: username,
        username: username,
      };

      const tweetMedia = media.filter((m) =>
        tweet.attachments?.media_keys?.includes(m.media_key)
      );

      return {
        id: tweet.id,
        text: tweet.text,
        author: {
          name: author.name,
          username: author.username,
          avatar: author.profile_image_url,
        },
        publishedAt: tweet.created_at,
        url: `https://twitter.com/${username}/status/${tweet.id}`,
        likes: tweet.public_metrics?.like_count,
        retweets: tweet.public_metrics?.retweet_count,
        replies: tweet.public_metrics?.reply_count,
        media: tweetMedia.map((m) => ({
          type: m.type as 'photo' | 'video' | 'gif',
          url: m.url || '',
          thumbnail: m.preview_image_url,
        })),
      };
    });
  } catch (error) {
    console.error('Error fetching tweets from API:', error);
    return [];
  }
}

/**
 * Fetch tweets using RSS feed (fallback, no authentication required)
 * Note: Twitter RSS feeds are deprecated but may still work for some accounts
 */
export async function fetchTweetsRSS(
  username: string,
  limit: number = 10
): Promise<Tweet[]> {
  try {
    const rssUrl = `https://nitter.net/${username}/rss`;
    
    const response = await fetch(rssUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Portfolio Bot/1.0)',
      },
      ...getFetchCacheOptions('DYNAMIC')
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch Twitter RSS: ${response.status}`);
    }

    const xml = await response.text();
    const items = xml.match(/<item>[\s\S]*?<\/item>/g) || [];

    const tweets: Tweet[] = [];

    for (const item of items.slice(0, limit)) {
      const titleMatch = item.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/);
      const linkMatch = item.match(/<link>(.*?)<\/link>/);
      const pubDateMatch = item.match(/<pubDate>(.*?)<\/pubDate>/);
      const descriptionMatch = item.match(/<description><!\[CDATA\[(.*?)\]\]><\/description>/);

      if (titleMatch && linkMatch && pubDateMatch) {
        const tweetId = linkMatch[1].split('/status/')[1]?.split('?')[0] || '';
        
        tweets.push({
          id: tweetId || `rss-${tweets.length}`,
          text: titleMatch[1],
          author: {
            name: username,
            username: username,
          },
          publishedAt: pubDateMatch[1],
          url: linkMatch[1],
          description: descriptionMatch?.[1] || titleMatch[1],
        });
      }
    }

    return tweets;
  } catch (error) {
    console.error('Error fetching tweets from RSS:', error);
    return [];
  }
}

/**
 * Main function to fetch tweets
 * Tries API first, falls back to RSS if API is not available
 */
export async function fetchTweets(
  username?: string,
  limit: number = 10
): Promise<Tweet[]> {
  const twitterUsername = username || process.env.TWITTER_USERNAME || process.env.X_USERNAME;
  
  if (!twitterUsername) {
    return [];
  }

  const bearerToken = process.env.TWITTER_BEARER_TOKEN || process.env.X_BEARER_TOKEN;

  if (bearerToken) {
    return fetchTweetsAPI(twitterUsername, bearerToken, limit);
  }

  // Fallback to RSS (may not work for all accounts)
  return fetchTweetsRSS(twitterUsername, limit);
}

