import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.SITE_URL || "http://localhost:3000";
  return [
    { url: base, priority: 1 },
    { url: base + "/projects" },
    { url: base + "/about" },
    { url: base + "/contact" },
    { url: base + "/privacy" },
    { url: base + "/terms" }
  ]
}
