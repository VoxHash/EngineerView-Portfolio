import { generateAtom } from '@/lib/rss';
import { fetchMediumPosts } from '@/lib/medium';

export async function GET() {
  try {
    const mediumPosts = await fetchMediumPosts();
    
    // Convert Medium posts to Atom format
    const blogPosts = mediumPosts.map(post => ({
      slug: post.slug,
      title: post.title,
      description: post.description,
      date: post.pubDate,
      content: post.content,
    }));
    
    const atom = generateAtom(blogPosts);
    
    return new Response(atom, {
      headers: {
        'Content-Type': 'application/atom+xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600'
      }
    });
  } catch (error) {
    console.error('Error generating Atom feed:', error);
    return new Response('Error generating Atom feed', { status: 500 });
  }
}
