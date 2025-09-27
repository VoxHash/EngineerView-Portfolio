import { SITE } from './site';

export interface OGImageOptions {
  title?: string;
  description?: string;
  type?: 'website' | 'article' | 'profile';
}

export function generateOGImageUrl(options: OGImageOptions = {}) {
  const { title, description, type = 'website' } = options;
  
  const params = new URLSearchParams({
    title: title || SITE.name,
    description: description || SITE.description,
    type,
  });

  return `${SITE.url}/api/og?${params.toString()}`;
}

export function getPageOGImage(page: string, options: OGImageOptions = {}) {
  const pageConfigs: Record<string, OGImageOptions> = {
    home: {
      title: `${SITE.name} — Portfolio`,
      description: SITE.description,
      type: 'website'
    },
    about: {
      title: `About ${SITE.name}`,
      description: 'Learn more about my background, skills, and experience in software engineering and AI.',
      type: 'profile'
    },
    projects: {
      title: `Projects by ${SITE.name}`,
      description: 'Explore my portfolio of software projects, open source contributions, and technical achievements.',
      type: 'website'
    },
    blog: {
      title: `Blog by ${SITE.name}`,
      description: 'Read my latest thoughts on web development, AI integration, and building scalable applications.',
      type: 'website'
    },
    contact: {
      title: `Contact ${SITE.name}`,
      description: 'Get in touch for collaborations, speaking opportunities, or just to say hello.',
      type: 'website'
    },
    speaking: {
      title: `Speaking by ${SITE.name}`,
      description: 'Check out my speaking engagements, talks, and media appearances.',
      type: 'profile'
    },
    uses: {
      title: `Uses by ${SITE.name}`,
      description: 'My development setup, tools, and technologies I use to build amazing products.',
      type: 'website'
    }
  };

  const config = pageConfigs[page] || {};
  const finalOptions = { ...config, ...options };
  
  return generateOGImageUrl(finalOptions);
}
