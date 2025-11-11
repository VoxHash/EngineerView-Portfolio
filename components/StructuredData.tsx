/**
 * StructuredData Component
 * 
 * Injects JSON-LD structured data for SEO (Schema.org)
 */

import { generatePersonSchema, generateWebSiteSchema, generateOrganizationSchema } from '@/lib/seo';

interface StructuredDataProps {
  type?: 'person' | 'website' | 'organization' | 'custom';
  data?: Record<string, any>;
}

export default function StructuredData({ type = 'website', data }: StructuredDataProps) {
  let schemaData: Record<string, any>;

  switch (type) {
    case 'person':
      schemaData = generatePersonSchema();
      break;
    case 'organization':
      schemaData = generateOrganizationSchema();
      break;
    case 'website':
      schemaData = generateWebSiteSchema();
      break;
    case 'custom':
      schemaData = data || {};
      break;
    default:
      schemaData = generateWebSiteSchema();
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}

