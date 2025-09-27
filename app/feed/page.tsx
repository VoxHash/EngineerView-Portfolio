"use client";
import { useEffect, useState } from "react";
import { Calendar, Heart, MessageCircle, Share, ExternalLink, Linkedin } from "lucide-react";
import { format } from "date-fns";

interface LinkedInPost {
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
}

// Mock LinkedIn posts data
const mockPosts: LinkedInPost[] = [
  {
    id: "1",
    content: "Just shipped a major feature for our AI-powered portfolio platform! 🚀 The new dynamic OG image generation is working beautifully, creating personalized social media previews for each page. Built with Next.js 14 and @vercel/og - the developer experience is incredible!",
    author: {
      name: "VoxHash",
      title: "Senior Software Engineer",
      company: "TechCorp Inc.",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    publishedAt: "2024-01-20T10:30:00Z",
    likes: 42,
    comments: 8,
    shares: 12,
    type: "text"
  },
  {
    id: "2",
    content: "Excited to share my latest blog post about building scalable Next.js applications! The article covers everything from performance optimization to deployment strategies. Check it out if you're working with React/Next.js!",
    author: {
      name: "VoxHash",
      title: "Senior Software Engineer",
      company: "TechCorp Inc.",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    publishedAt: "2024-01-18T14:15:00Z",
    likes: 28,
    comments: 5,
    shares: 7,
    type: "article",
    articleUrl: "/blog/building-scalable-nextjs-apps",
    articleTitle: "Building Scalable Next.js Applications",
    articleDescription: "Learn how to architect and build production-ready Next.js applications that can handle millions of users with proper performance optimization techniques."
  },
  {
    id: "3",
    content: "Had an amazing time speaking at the React Conference 2024! 🎤 Shared insights about modern web development patterns and the future of AI integration in frontend applications. The Q&A session was particularly engaging!",
    author: {
      name: "VoxHash",
      title: "Senior Software Engineer",
      company: "TechCorp Inc.",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    publishedAt: "2024-01-15T16:45:00Z",
    likes: 67,
    comments: 15,
    shares: 23,
    type: "text"
  },
  {
    id: "4",
    content: "Open source contribution of the week: Just merged a PR that improves TypeScript support in our CLI tool. The type safety improvements will help developers catch errors earlier in their workflow. Always happy to give back to the community! 💻",
    author: {
      name: "VoxHash",
      title: "Senior Software Engineer",
      company: "TechCorp Inc.",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    publishedAt: "2024-01-12T09:20:00Z",
    likes: 35,
    comments: 6,
    shares: 9,
    type: "text"
  },
  {
    id: "5",
    content: "Working on something exciting! 🤫 Building a new AI-powered development tool that will help developers write better code faster. Can't wait to share more details soon. The intersection of AI and developer productivity is fascinating!",
    author: {
      name: "VoxHash",
      title: "Senior Software Engineer",
      company: "TechCorp Inc.",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    publishedAt: "2024-01-10T11:30:00Z",
    likes: 89,
    comments: 22,
    shares: 18,
    type: "text"
  }
];

export default function FeedPage() {
  const [posts, setPosts] = useState<LinkedInPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call delay
    const fetchPosts = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setPosts(mockPosts);
      setIsLoading(false);
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

  return (
    <div className="py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">
          LinkedIn <span className="text-brand">Feed</span>
        </h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto mb-8">
          Latest posts and updates from my professional journey. 
          <span className="text-sm text-neutral-500 dark:text-neutral-400 block mt-2">
            Note: This is a demo feed. In a real implementation, this would connect to LinkedIn's API.
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
                {post.content}
              </p>
            </div>

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
