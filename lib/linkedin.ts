import { SITE } from './site';

export interface LinkedInPost {
  id: string;
  content: string;
  author: {
    name: string;
    title: string;
    company: string;
    avatar: string;
  };
  publishedAt: string;
  likes: number;
  comments: number;
  shares: number;
  type: 'text' | 'image' | 'article' | 'video';
  imageUrl?: string;
  articleUrl?: string;
  articleTitle?: string;
  articleDescription?: string;
  hashtags?: string[];
  mentions?: string[];
}

export interface LinkedInRSSItem {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  content: string;
  categories: string[];
  guid: string;
  author?: string;
}

// Function to extract hashtags from content
function extractHashtags(content: string): string[] {
  const hashtagRegex = /#[\w\u0590-\u05ff]+/g;
  return content.match(hashtagRegex) || [];
}

// Function to extract mentions from content
function extractMentions(content: string): string[] {
  const mentionRegex = /@[\w\u0590-\u05ff]+/g;
  return content.match(mentionRegex) || [];
}

// Function to determine post type based on content
function determinePostType(content: string, hasImage: boolean = false): 'text' | 'image' | 'article' | 'video' {
  if (hasImage) return 'image';
  if (content.includes('youtube.com') || content.includes('youtu.be') || content.includes('vimeo.com')) return 'video';
  if (content.includes('http') && (content.includes('medium.com') || content.includes('dev.to') || content.includes('hashnode.com'))) return 'article';
  return 'text';
}

// Function to extract article information from content
function extractArticleInfo(content: string): { url?: string; title?: string; description?: string } {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const urls = content.match(urlRegex);
  
  if (!urls || urls.length === 0) return {};
  
  const url = urls[0];
  
  // For now, we'll use the URL as title and extract a description from content
  const title = url.includes('medium.com') ? 'Medium Article' : 
                url.includes('dev.to') ? 'Dev.to Article' :
                url.includes('hashnode.com') ? 'Hashnode Article' : 'External Article';
  
  // Extract description from content (text before the URL)
  const urlIndex = content.indexOf(url);
  const beforeUrl = content.substring(0, urlIndex).trim();
  const description = beforeUrl.length > 100 ? beforeUrl.substring(0, 100) + '...' : beforeUrl;
  
  return { url, title, description };
}

// Function to clean and format content
function cleanContent(content: string): string {
  // Remove HTML tags
  let cleanContent = content.replace(/<[^>]*>/g, '');
  
  // Decode HTML entities
  cleanContent = cleanContent
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ');
  
  // Clean up extra whitespace
  cleanContent = cleanContent.replace(/\s+/g, ' ').trim();
  
  return cleanContent;
}

// Function to generate realistic engagement metrics
function generateEngagementMetrics(content: string): { likes: number; comments: number; shares: number } {
  const baseLikes = Math.floor(Math.random() * 50) + 10;
  const baseComments = Math.floor(Math.random() * 15) + 2;
  const baseShares = Math.floor(Math.random() * 10) + 1;
  
  // Boost engagement for certain content types
  const hasHashtags = content.includes('#');
  const hasMentions = content.includes('@');
  const isLongPost = content.length > 200;
  
  let likes = baseLikes;
  let comments = baseComments;
  let shares = baseShares;
  
  if (hasHashtags) {
    likes += Math.floor(Math.random() * 20);
    comments += Math.floor(Math.random() * 5);
  }
  
  if (hasMentions) {
    likes += Math.floor(Math.random() * 15);
    comments += Math.floor(Math.random() * 3);
  }
  
  if (isLongPost) {
    likes += Math.floor(Math.random() * 10);
    comments += Math.floor(Math.random() * 2);
  }
  
  return { likes, comments, shares };
}

export async function fetchLinkedInPosts(): Promise<LinkedInPost[]> {
  try {
    // Since LinkedIn doesn't provide a public RSS feed, we'll use a combination of approaches
    // For now, we'll create a realistic feed based on your professional activity
    
    // In a real implementation, you would:
    // 1. Use LinkedIn's API (requires OAuth and approval)
    // 2. Use a web scraping service
    // 3. Use a third-party service that provides LinkedIn data
    // 4. Manually curate posts
    
    const linkedInHandle = process.env.LINKEDIN_HANDLE || 'voxhash';
    
    // For demonstration, we'll create realistic posts based on your professional profile
    const mockPosts: LinkedInPost[] = [
      {
        id: "1",
        content: "Just shipped a major feature for our AI-powered portfolio platform! 🚀 The new dynamic OG image generation is working beautifully, creating personalized social media previews for each page. Built with Next.js 14 and @vercel/og - the developer experience is incredible! #WebDevelopment #NextJS #AI #Portfolio",
        author: {
          name: SITE.name,
          title: "Senior Software Engineer",
          company: "TechCorp Inc.",
          avatar: "https://avatars.githubusercontent.com/u/10000000?v=4"
        },
        publishedAt: new Date().toISOString(),
        likes: 42,
        comments: 8,
        shares: 12,
        type: "text",
        hashtags: ["#WebDevelopment", "#NextJS", "#AI", "#Portfolio"],
        mentions: ["@vercel"]
      },
      {
        id: "2",
        content: "Excited to share my latest blog post about building scalable Next.js applications! The article covers everything from performance optimization to deployment strategies. Check it out if you're working with React/Next.js! https://medium.com/@VoxHash/building-scalable-nextjs-applications",
        author: {
          name: SITE.name,
          title: "Senior Software Engineer",
          company: "TechCorp Inc.",
          avatar: "https://avatars.githubusercontent.com/u/10000000?v=4"
        },
        publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        likes: 28,
        comments: 5,
        shares: 7,
        type: "article",
        articleUrl: "https://medium.com/@VoxHash/building-scalable-nextjs-applications",
        articleTitle: "Building Scalable Next.js Applications",
        articleDescription: "Learn how to architect and build production-ready Next.js applications that can handle millions of users with proper performance optimization techniques."
      },
      {
        id: "3",
        content: "Had an amazing time speaking at the React Conference 2025! 🎤 Shared insights about modern web development patterns and the future of AI integration in frontend applications. The Q&A session was particularly engaging! #Speaking #React #WebDevelopment #AI",
        author: {
          name: SITE.name,
          title: "Senior Software Engineer",
          company: "TechCorp Inc.",
          avatar: "https://avatars.githubusercontent.com/u/10000000?v=4"
        },
        publishedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        likes: 67,
        comments: 15,
        shares: 23,
        type: "text",
        hashtags: ["#Speaking", "#React", "#WebDevelopment", "#AI"]
      },
      {
        id: "4",
        content: "Open source contribution of the week: Just merged a PR that improves TypeScript support in our CLI tool. The type safety improvements will help developers catch errors earlier in their workflow. Always happy to give back to the community! 💻 #OpenSource #TypeScript #DeveloperTools",
        author: {
          name: SITE.name,
          title: "Senior Software Engineer",
          company: "TechCorp Inc.",
          avatar: "https://avatars.githubusercontent.com/u/10000000?v=4"
        },
        publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        likes: 35,
        comments: 6,
        shares: 9,
        type: "text",
        hashtags: ["#OpenSource", "#TypeScript", "#DeveloperTools"]
      },
      {
        id: "5",
        content: "Working on something exciting! 🤫 Building a new AI-powered development tool that will help developers write better code faster. Can't wait to share more details soon. The intersection of AI and developer productivity is fascinating! #AI #DeveloperTools #Innovation",
        author: {
          name: SITE.name,
          title: "Senior Software Engineer",
          company: "TechCorp Inc.",
          avatar: "https://avatars.githubusercontent.com/u/10000000?v=4"
        },
        publishedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
        likes: 89,
        comments: 22,
        shares: 18,
        type: "text",
        hashtags: ["#AI", "#DeveloperTools", "#Innovation"]
      },
      {
        id: "6",
        content: "Just completed a deep dive into the latest React 18 features! The new concurrent rendering and automatic batching are game-changers for performance. Wrote a comprehensive guide covering all the new APIs and best practices. https://medium.com/@VoxHash/react-18-complete-guide",
        author: {
          name: SITE.name,
          title: "Senior Software Engineer",
          company: "TechCorp Inc.",
          avatar: "https://avatars.githubusercontent.com/u/10000000?v=4"
        },
        publishedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
        likes: 156,
        comments: 34,
        shares: 28,
        type: "article",
        articleUrl: "https://medium.com/@VoxHash/react-18-complete-guide",
        articleTitle: "React 18 Complete Guide",
        articleDescription: "A comprehensive guide to React 18's new features including concurrent rendering, automatic batching, and the new APIs."
      }
    ];

    // In a real implementation, you would fetch from LinkedIn API or RSS
    // For now, we'll return the mock data with some randomization
    return mockPosts.map(post => ({
      ...post,
      ...generateEngagementMetrics(post.content)
    }));

  } catch (error) {
    console.error('Error fetching LinkedIn posts:', error);
    
    // Return fallback posts if LinkedIn API fails
    return [
      {
        id: "fallback-1",
        content: "Welcome to my LinkedIn feed! This is a demo post showing how the integration would work with real LinkedIn data.",
        author: {
          name: SITE.name,
          title: "Senior Software Engineer",
          company: "TechCorp Inc.",
          avatar: "https://avatars.githubusercontent.com/u/10000000?v=4"
        },
        publishedAt: new Date().toISOString(),
        likes: 15,
        comments: 3,
        shares: 2,
        type: "text"
      }
    ];
  }
}

// Function to get a single post by ID
export async function getLinkedInPost(id: string): Promise<LinkedInPost | null> {
  const posts = await fetchLinkedInPosts();
  return posts.find(post => post.id === id) || null;
}

// Function to get posts by hashtag
export async function getLinkedInPostsByHashtag(hashtag: string): Promise<LinkedInPost[]> {
  const posts = await fetchLinkedInPosts();
  return posts.filter(post => 
    post.hashtags?.some(tag => tag.toLowerCase().includes(hashtag.toLowerCase()))
  );
}

// Function to get posts by type
export async function getLinkedInPostsByType(type: 'text' | 'image' | 'article' | 'video'): Promise<LinkedInPost[]> {
  const posts = await fetchLinkedInPosts();
  return posts.filter(post => post.type === type);
}
