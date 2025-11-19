export const SITE = {
  name: process.env.SITE_NAME || "VoxHash",
  handle: process.env.SOCIAL_HANDLE || process.env.SITE_HANDLE || "voxhash",
  email: process.env.CONTACT_EMAIL || "contact@voxhash.dev",
  url: process.env.SITE_URL || "https://voxhash.dev",
  githubUser: process.env.GITHUB_USERNAME || "VoxHash",
  description: process.env.SITE_DESCRIPTION || "Engineer • AI • Systems • Creator. Building scalable things that sing at scale.",
  keywords: process.env.SITE_KEYWORDS ? process.env.SITE_KEYWORDS.split(',').map(k => k.trim()) : ["VoxHash", "portfolio", "engineer", "AI", "systems", "full stack"]
};
