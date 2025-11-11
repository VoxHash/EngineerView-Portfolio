import { SITE } from './site';

export interface MediumPost {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  content: string;
  categories: string[];
  guid: string;
  slug: string;
  readTime: string;
  featured: boolean;
  thumbnail?: string;
}

export interface MediumRSSItem {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  content: string;
  categories: string[];
  guid: string;
}

// Function to extract slug from Medium URL
function extractSlugFromUrl(url: string): string {
  try {
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split('/');
    const slug = pathParts[pathParts.length - 1];
    return slug || 'medium-post';
  } catch {
    return 'medium-post';
  }
}

// Function to estimate read time based on content length
function estimateReadTime(content: string): string {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min read`;
}

// Function to extract excerpt from content
function extractExcerpt(content: string, maxLength: number = 200): string {
  // Remove HTML tags
  const textContent = content.replace(/<[^>]*>/g, '');
  // Remove extra whitespace
  const cleanText = textContent.replace(/\s+/g, ' ').trim();
  
  if (cleanText.length <= maxLength) {
    return cleanText;
  }
  
  // Find the last complete sentence within the limit
  const truncated = cleanText.substring(0, maxLength);
  const lastSentenceEnd = truncated.lastIndexOf('.');
  
  if (lastSentenceEnd > maxLength * 0.7) {
    return truncated.substring(0, lastSentenceEnd + 1);
  }
  
  return truncated + '...';
}

// Function to determine if a post should be featured
function isFeaturedPost(post: MediumRSSItem): boolean {
  const featuredKeywords = [
    'tutorial', 'guide', 'complete', 'comprehensive', 'best practices',
    'advanced', 'production', 'scalable', 'performance', 'architecture'
  ];
  
  const title = post.title.toLowerCase();
  const description = post.description.toLowerCase();
  
  return featuredKeywords.some(keyword => 
    title.includes(keyword) || description.includes(keyword)
  );
}

// Function to clean and categorize tags
function cleanCategories(categories: string[]): string[] {
  const commonTags = [
    'javascript', 'typescript', 'react', 'nextjs', 'nodejs', 'web development',
    'ai', 'machine learning', 'programming', 'tutorial', 'guide', 'best practices',
    'performance', 'architecture', 'frontend', 'backend', 'fullstack', 'devops',
    'css', 'html', 'api', 'database', 'security', 'testing', 'deployment'
  ];
  
  return categories
    .map(cat => cat.toLowerCase().trim())
    .filter(cat => cat.length > 0)
    .filter(cat => commonTags.some(tag => cat.includes(tag) || tag.includes(cat)))
    .slice(0, 5); // Limit to 5 tags
}

export async function fetchMediumPosts(): Promise<MediumPost[]> {
  try {
    const mediumRSSUrl = 'https://medium.com/@'+(process.env.MEDIUM_HANDLE||"voxhash")+'/feed';
    
    const response = await fetch(mediumRSSUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Portfolio Bot/1.0)',
      },
      next: { revalidate: 3600 } // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch Medium RSS: ${response.status}`);
    }

    const xmlText = await response.text();
    
    // Parse XML manually (simple approach)
    const items: MediumRSSItem[] = [];
    const itemRegex = /<item>([\s\S]*?)<\/item>/g;
    let match;

    while ((match = itemRegex.exec(xmlText)) !== null) {
      const itemXml = match[1];
      
      const titleMatch = itemXml.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/);
      const linkMatch = itemXml.match(/<link>(.*?)<\/link>/);
      const pubDateMatch = itemXml.match(/<pubDate>(.*?)<\/pubDate>/);
      const descriptionMatch = itemXml.match(/<description><!\[CDATA\[(.*?)\]\]><\/description>/);
      const contentMatch = itemXml.match(/<content:encoded><!\[CDATA\[(.*?)\]\]><\/content:encoded>/);
      const guidMatch = itemXml.match(/<guid>(.*?)<\/guid>/);
      
      // Extract categories
      const categoryMatches = itemXml.match(/<category><!\[CDATA\[(.*?)\]\]><\/category>/g);
      const categories = categoryMatches 
        ? categoryMatches.map(m => m.replace(/<category><!\[CDATA\[(.*?)\]\]><\/category>/, '$1'))
        : [];

      if (titleMatch && linkMatch && pubDateMatch) {
        items.push({
          title: titleMatch[1],
          link: linkMatch[1],
          pubDate: pubDateMatch[1],
          description: descriptionMatch ? descriptionMatch[1] : '',
          content: contentMatch ? contentMatch[1] : '',
          categories,
          guid: guidMatch ? guidMatch[1] : linkMatch[1]
        });
      }
    }

    // Convert to MediumPost format
    const posts: MediumPost[] = items.map(item => {
      const slug = extractSlugFromUrl(item.link);
      const readTime = estimateReadTime(item.content || item.description);
      const excerpt = extractExcerpt(item.description || item.content);
      const featured = isFeaturedPost(item);
      const cleanedCategories = cleanCategories(item.categories);

      return {
        title: item.title,
        link: item.link,
        pubDate: item.pubDate,
        description: excerpt,
        content: item.content,
        categories: cleanedCategories,
        guid: item.guid,
        slug,
        readTime,
        featured
      };
    });

    // Sort by publication date (newest first)
    return posts.sort((a, b) => 
      new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
    );

  } catch (error) {
    console.error('Error fetching Medium posts:', error);
    
    // Return fallback posts if Medium RSS fails
    return [
      {
        title: "Building Scalable Next.js Applications",
        link: "https://medium.com/@VoxHash/building-scalable-nextjs-applications",
        pubDate: new Date().toISOString(),
        description: "Learn how to architect and build production-ready Next.js applications that can handle millions of users with proper performance optimization techniques.",
        content: "",
        categories: ["Next.js", "Performance", "Architecture"],
        guid: "fallback-1",
        slug: "building-scalable-nextjs-applications",
        readTime: "8 min read",
        featured: true
      },
      {
        title: "Complete Guide to AI Integration in Web Apps",
        link: "https://medium.com/@VoxHash/ai-integration-guide",
        pubDate: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        description: "A comprehensive guide to integrating AI capabilities into your web applications, covering everything from API design to user experience considerations.",
        content: "",
        categories: ["AI", "Web Development", "Tutorial"],
        guid: "fallback-2",
        slug: "ai-integration-guide",
        readTime: "12 min read",
        featured: true
      }
    ];
  }
}

// Function to get a single post by slug
export async function getMediumPost(slug: string): Promise<MediumPost | null> {
  const posts = await fetchMediumPosts();
  return posts.find(post => post.slug === slug) || null;
}
