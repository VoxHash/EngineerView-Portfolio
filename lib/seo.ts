/**
 * SEO Utilities
 * 
 * Comprehensive SEO helper functions for metadata, structured data, and social media optimization.
 */

import { SITE } from './site';
import type { Metadata } from 'next';

export interface SEOConfig {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'profile';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
}

/**
 * Generate comprehensive metadata for a page
 */
export function generateMetadata(config: SEOConfig): Metadata {
  const {
    title = SITE.name,
    description = SITE.description,
    keywords = SITE.keywords,
    image = '/og.png',
    url = SITE.url,
    type = 'website',
    publishedTime,
    modifiedTime,
    author = SITE.name,
    section,
    tags = [],
  } = config;

  const fullTitle = title === SITE.name ? title : `${title} — ${SITE.name}`;
  const imageUrl = image.startsWith('http') ? image : `${SITE.url}${image}`;
  const pageUrl = url.startsWith('http') ? url : `${SITE.url}${url}`;

  const metadata: Metadata = {
    title: fullTitle,
    description,
    keywords: [...SITE.keywords, ...keywords],
    metadataBase: new URL(SITE.url),
    openGraph: {
      title: fullTitle,
      description,
      url: pageUrl,
      siteName: SITE.name,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
      locale: 'en_US',
      type,
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(author && { authors: [author] }),
      ...(section && { section }),
      ...(tags.length > 0 && { tags }),
    },
    twitter: {
      card: 'summary_large_image',
      site: `@${SITE.handle}`,
      creator: `@${SITE.handle}`,
      title: fullTitle,
      description,
      images: [imageUrl],
    },
    alternates: {
      canonical: pageUrl,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };

  return metadata;
}

/**
 * Generate Person schema (Schema.org)
 */
export function generatePersonSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: SITE.name,
    url: SITE.url,
    email: SITE.email,
    jobTitle: 'Senior Software Engineer',
    worksFor: {
      '@type': 'Organization',
      name: 'VoxHash Technologies',
      url: SITE.url,
    },
    sameAs: [
      `https://github.com/${SITE.githubUser}`,
      `https://twitter.com/${SITE.handle}`,
      `https://linkedin.com/in/${SITE.handle}`,
      `https://reddit.com/user/${SITE.handle}`,
    ],
    description: SITE.description,
    knowsAbout: [
      'Software Engineering',
      'Artificial Intelligence',
      'Full Stack Development',
      'System Architecture',
      'Web Development',
      'Machine Learning',
    ],
  };
}

/**
 * Generate Organization schema (Schema.org)
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'VoxHash Technologies',
    url: SITE.url,
    logo: `${SITE.url}/og.png`,
    description: SITE.description,
    founder: {
      '@type': 'Person',
      name: SITE.name,
    },
    sameAs: [
      `https://github.com/${SITE.githubUser}`,
      `https://twitter.com/${SITE.handle}`,
    ],
  };
}

/**
 * Generate WebSite schema (Schema.org)
 */
export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    publisher: {
      '@type': 'Organization',
      name: 'VoxHash Technologies',
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE.url}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * Generate BreadcrumbList schema (Schema.org)
 */
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${SITE.url}${item.url}`,
    })),
  };
}

/**
 * Generate Article schema (Schema.org)
 */
export function generateArticleSchema(config: {
  title: string;
  description: string;
  image?: string;
  publishedTime: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
}) {
  const {
    title,
    description,
    image = '/og.png',
    publishedTime,
    modifiedTime,
    author = SITE.name,
    section,
    tags = [],
  } = config;

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    image: image.startsWith('http') ? image : `${SITE.url}${image}`,
    datePublished: publishedTime,
    ...(modifiedTime && { dateModified: modifiedTime }),
    author: {
      '@type': 'Person',
      name: author,
      url: SITE.url,
    },
    publisher: {
      '@type': 'Organization',
      name: 'VoxHash Technologies',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE.url}/og.png`,
      },
    },
    ...(section && { articleSection: section }),
    ...(tags.length > 0 && { keywords: tags.join(', ') }),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': SITE.url,
    },
  };
}

/**
 * Generate Project schema (Schema.org)
 */
export function generateProjectSchema(config: {
  name: string;
  description: string;
  url: string;
  image?: string;
  technologies?: string[];
  repository?: string;
}) {
  const {
    name,
    description,
    url,
    image,
    technologies = [],
    repository,
  } = config;

  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    description,
    url: url.startsWith('http') ? url : `${SITE.url}${url}`,
    ...(image && {
      image: image.startsWith('http') ? image : `${SITE.url}${image}`,
    }),
    applicationCategory: 'WebApplication',
    operatingSystem: 'Web',
    ...(technologies.length > 0 && {
      offers: {
        '@type': 'Offer',
        category: technologies.join(', '),
      },
    }),
    ...(repository && {
      codeRepository: repository,
    }),
    author: {
      '@type': 'Person',
      name: SITE.name,
      url: SITE.url,
    },
  };
}

