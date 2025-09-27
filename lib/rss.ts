import { SITE } from './site';

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  content: string;
}

export function generateRSS(posts: BlogPost[]) {
  const rssItems = posts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .map(post => {
      const postUrl = `${SITE.url}/blog/${post.slug}`;
      const pubDate = new Date(post.date).toUTCString();
      
      return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${post.description}]]></description>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <pubDate>${pubDate}</pubDate>
    </item>`;
    })
    .join('');

  return `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title><![CDATA[${SITE.name} Blog]]></title>
    <description><![CDATA[${SITE.description}]]></description>
    <link>${SITE.url}/blog</link>
    <atom:link href="${SITE.url}/rss.xml" rel="self" type="application/rss+xml"/>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <managingEditor>${SITE.email} (${SITE.name})</managingEditor>
    <webMaster>${SITE.email} (${SITE.name})</webMaster>
    <generator>Next.js RSS Generator</generator>
    ${rssItems}
  </channel>
</rss>`;
}

export function generateAtom(posts: BlogPost[]) {
  const atomEntries = posts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .map(post => {
      const postUrl = `${SITE.url}/blog/${post.slug}`;
      const updatedDate = new Date(post.date).toISOString();
      
      return `
    <entry>
      <title>${post.title}</title>
      <summary>${post.description}</summary>
      <link href="${postUrl}" rel="alternate"/>
      <id>${postUrl}</id>
      <updated>${updatedDate}</updated>
      <author>
        <name>${SITE.name}</name>
        <email>${SITE.email}</email>
      </author>
    </entry>`;
    })
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>${SITE.name} Blog</title>
  <subtitle>${SITE.description}</subtitle>
  <link href="${SITE.url}/blog" rel="self"/>
  <link href="${SITE.url}"/>
  <id>${SITE.url}/blog</id>
  <updated>${new Date().toISOString()}</updated>
  <author>
    <name>${SITE.name}</name>
    <email>${SITE.email}</email>
  </author>
  ${atomEntries}
</feed>`;
}
