import { generateRSS } from '@/lib/rss';
import { fetchMediumPosts } from '@/lib/medium';

export async function GET() {
  try {
    const mediumPosts = await fetchMediumPosts();
    
    // Convert Medium posts to RSS format
    const blogPosts = mediumPosts.map(post => ({
      slug: post.slug,
      title: post.title,
      description: post.description,
      date: post.pubDate,
      content: post.content,
    }));
    
    const rss = generateRSS(blogPosts);
    
    return new Response(rss, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600'
      }
    });
  } catch (error) {
    console.error('Error generating RSS feed:', error);
    return new Response('Error generating RSS feed', { status: 500 });
  }
}
