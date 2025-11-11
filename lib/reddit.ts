import { SITE } from './site';

export interface RedditPost {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  publishedAt: string;
  upvotes: number;
  comments: number;
  subreddit: string;
  url: string;
  type: 'text' | 'link' | 'image' | 'video';
  thumbnail?: string;
  imageUrl?: string;
  videoUrl?: string;
  domain?: string;
  flair?: string;
  isSelfPost: boolean;
}

interface RedditAPIResponse {
  data: {
    children: Array<{
      data: {
        id: string;
        title: string;
        selftext: string;
        author: string;
        created_utc: number;
        score: number;
        num_comments: number;
        subreddit: string;
        permalink: string;
        url: string;
        thumbnail: string;
        post_hint?: string;
        domain?: string;
        link_flair_text?: string;
        is_self: boolean;
        preview?: {
          images?: Array<{
            source: {
              url: string;
              width: number;
              height: number;
            };
          }>;
        };
        media?: {
          reddit_video?: {
            fallback_url: string;
          };
        };
      };
    }>;
  };
}

// Function to extract subreddit name from URL or use default
function getSubredditName(subreddit: string): string {
  return subreddit.replace('r/', '').replace('/', '');
}

// Function to determine post type
function determinePostType(data: RedditAPIResponse['data']['children'][0]['data']): 'text' | 'link' | 'image' | 'video' {
  if (data.is_self) return 'text';
  if (data.post_hint === 'image' || data.thumbnail?.startsWith('http')) return 'image';
  if (data.media?.reddit_video) return 'video';
  if (data.url.includes('youtube.com') || data.url.includes('youtu.be') || data.url.includes('vimeo.com')) return 'video';
  return 'link';
}

// Function to get image URL from post data
function getImageUrl(data: RedditAPIResponse['data']['children'][0]['data']): string | undefined {
  if (data.preview?.images?.[0]?.source?.url) {
    // Reddit image URLs are HTML encoded, decode them
    return data.preview.images[0].source.url.replace(/&amp;/g, '&');
  }
  if (data.post_hint === 'image' && data.url && !data.url.includes('reddit.com')) {
    return data.url;
  }
  return undefined;
}

// Function to get video URL
function getVideoUrl(data: RedditAPIResponse['data']['children'][0]['data']): string | undefined {
  if (data.media?.reddit_video?.fallback_url) {
    return data.media.reddit_video.fallback_url;
  }
  if (data.url && (data.url.includes('youtube.com') || data.url.includes('youtu.be') || data.url.includes('vimeo.com'))) {
    return data.url;
  }
  return undefined;
}

// Function to clean Reddit content
function cleanRedditContent(text: string): string {
  if (!text) return '';
  
  // Remove markdown links but keep the text
  let cleaned = text.replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1');
  
  // Remove markdown formatting
  cleaned = cleaned.replace(/\*\*([^\*]+)\*\*/g, '$1'); // Bold
  cleaned = cleaned.replace(/\*([^\*]+)\*/g, '$1'); // Italic
  cleaned = cleaned.replace(/~~([^~]+)~~/g, '$1'); // Strikethrough
  
  // Remove code blocks but keep the content
  cleaned = cleaned.replace(/```[\s\S]*?```/g, '[code block]');
  cleaned = cleaned.replace(/`([^`]+)`/g, '$1');
  
  // Clean up extra whitespace
  cleaned = cleaned.replace(/\n{3,}/g, '\n\n');
  cleaned = cleaned.trim();
  
  return cleaned;
}

// Function to truncate content
function truncateContent(content: string, maxLength: number = 500): string {
  if (content.length <= maxLength) return content;
  return content.substring(0, maxLength).trim() + '...';
}

export async function fetchRedditPosts(username?: string, limit: number = 10): Promise<RedditPost[]> {
  try {
    const redditUsername = username || process.env.REDDIT_USERNAME || 'voxhash';
    
    // Reddit JSON API endpoint for user's submitted posts
    const apiUrl = `https://www.reddit.com/user/${redditUsername}/submitted.json?limit=${limit}&sort=new`;
    
    const response = await fetch(apiUrl, {
      headers: {
        'User-Agent': 'Portfolio Bot/1.0 (by /u/voxhash)',
      },
      next: { revalidate: 3600 } // Cache for 1 hour
    });

    if (!response.ok) {
      // If user endpoint fails, try to fetch from a subreddit as fallback
      const subreddit = process.env.REDDIT_SUBREDDIT || 'programming';
      const fallbackUrl = `https://www.reddit.com/r/${subreddit}/new.json?limit=${limit}`;
      const fallbackResponse = await fetch(fallbackUrl, {
        headers: {
          'User-Agent': 'Portfolio Bot/1.0 (by /u/voxhash)',
        },
        next: { revalidate: 3600 }
      });

      if (!fallbackResponse.ok) {
        throw new Error(`Failed to fetch Reddit posts: ${response.status}`);
      }

      const fallbackData: RedditAPIResponse = await fallbackResponse.json();
      return transformRedditPosts(fallbackData, redditUsername);
    }

    const data: RedditAPIResponse = await response.json();
    return transformRedditPosts(data, redditUsername);

  } catch (error) {
    console.error('Error fetching Reddit posts:', error);
    
    const fallbackUsername = username || process.env.REDDIT_USERNAME || 'voxhash';
    
    // Return fallback posts if Reddit API fails
    return [
      {
        id: "fallback-1",
        title: "Welcome to my Reddit feed!",
        content: "This is a demo post showing how the Reddit integration would work with real Reddit data. Configure REDDIT_USERNAME in your environment variables to fetch your actual posts.",
        author: {
          name: fallbackUsername,
          avatar: `https://www.redditstatic.com/avatars/defaults/v2/avatar_default_${Math.floor(Math.random() * 7)}.png`
        },
        publishedAt: new Date().toISOString(),
        upvotes: 15,
        comments: 3,
        subreddit: 'programming',
        url: `https://www.reddit.com/user/${fallbackUsername}`,
        type: 'text',
        isSelfPost: true
      }
    ];
  }
}

function transformRedditPosts(data: RedditAPIResponse, username: string): RedditPost[] {
  if (!data?.data?.children) {
    return [];
  }

  return data.data.children.map((item) => {
    const postData = item.data;
    const postType = determinePostType(postData);
    const imageUrl = getImageUrl(postData);
    const videoUrl = getVideoUrl(postData);
    
    // Combine title and selftext for content
    let content = postData.title;
    if (postData.selftext) {
      content += '\n\n' + postData.selftext;
    }
    content = cleanRedditContent(content);
    
    // Truncate if too long
    if (content.length > 500) {
      content = truncateContent(content, 500);
    }

    return {
      id: postData.id,
      title: postData.title,
      content: content,
      author: {
        name: postData.author || username,
        avatar: `https://www.redditstatic.com/avatars/defaults/v2/avatar_default_${Math.floor(Math.random() * 7)}.png`
      },
      publishedAt: new Date(postData.created_utc * 1000).toISOString(),
      upvotes: postData.score || 0,
      comments: postData.num_comments || 0,
      subreddit: getSubredditName(postData.subreddit),
      url: `https://www.reddit.com${postData.permalink}`,
      type: postType,
      thumbnail: postData.thumbnail && postData.thumbnail.startsWith('http') ? postData.thumbnail : undefined,
      imageUrl: imageUrl,
      videoUrl: videoUrl,
      domain: postData.domain,
      flair: postData.link_flair_text,
      isSelfPost: postData.is_self
    };
  });
}

// Function to get a single post by ID
export async function getRedditPost(id: string): Promise<RedditPost | null> {
  const posts = await fetchRedditPosts();
  return posts.find(post => post.id === id) || null;
}

// Function to get posts by subreddit
export async function getRedditPostsBySubreddit(subreddit: string, limit: number = 10): Promise<RedditPost[]> {
  try {
    const apiUrl = `https://www.reddit.com/r/${subreddit}/new.json?limit=${limit}`;
    
    const response = await fetch(apiUrl, {
      headers: {
        'User-Agent': 'Portfolio Bot/1.0 (by /u/voxhash)',
      },
      next: { revalidate: 3600 }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch Reddit posts from subreddit: ${response.status}`);
    }

    const data: RedditAPIResponse = await response.json();
    return transformRedditPosts(data, 'reddit');
  } catch (error) {
    console.error('Error fetching Reddit posts by subreddit:', error);
    return [];
  }
}

// Function to get posts by type
export async function getRedditPostsByType(type: 'text' | 'link' | 'image' | 'video'): Promise<RedditPost[]> {
  const posts = await fetchRedditPosts();
  return posts.filter(post => post.type === type);
}

