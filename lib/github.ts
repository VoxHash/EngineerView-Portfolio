export type Repo = {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics?: string[];
  pushed_at: string;
};

async function gh(path: string) {
  const headers: Record<string, string> = { "Accept": "application/vnd.github+json" };
  if (process.env.GITHUB_TOKEN) headers["Authorization"] = `Bearer ${process.env.GITHUB_TOKEN}`;
  const res = await fetch(`https://api.github.com${path}`, { headers, next: { revalidate: 3600 } });
  if (!res.ok) throw new Error(`GitHub ${res.status}`);
  return res.json();
}

export async function fetchTopRepos(user: string, limit = 8): Promise<Repo[]> {
  const repos: Repo[] = await gh(`/users/${user}/repos?per_page=100&sort=pushed`);
  const filtered = repos
    .filter(r => !r.name.match(/(^|-)old$|archive|deprecated/i))
    .sort((a,b) => (b.stargazers_count - a.stargazers_count) || (new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime()));
  return filtered.slice(0, limit);
}

export async function fetchPinnedRepos(user: string): Promise<Repo[]> {
  try {
    // Get all repositories and filter for the most important ones (pinned-like)
    const repos: Repo[] = await gh(`/users/${user}/repos?per_page=100&sort=updated`);
    
    // Filter for repositories that are likely pinned (high stars, good descriptions, not forks)
    const pinnedRepos = repos
      .filter(r => 
        !r.name.match(/(^|-)old$|archive|deprecated|test|demo|example/i) &&
        r.description && 
        r.description.length > 10 &&
        r.stargazers_count > 0
      )
      .sort((a,b) => (b.stargazers_count - a.stargazers_count) || (new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime()))
      .slice(0, 6); // Top 6 most starred repositories
    
    return pinnedRepos;
  } catch (error) {
    console.error('Error fetching pinned repos:', error);
    return [];
  }
}

export async function fetchRecentRepos(user: string, limit = 6): Promise<Repo[]> {
  try {
    // Get repositories sorted by most recently pushed
    const repos: Repo[] = await gh(`/users/${user}/repos?per_page=100&sort=pushed`);
    
    // Filter for recently updated repositories
    const recentRepos = repos
      .filter(r => !r.name.match(/(^|-)old$|archive|deprecated/i))
      .slice(0, limit); // Most recently updated repositories
    
    return recentRepos;
  } catch (error) {
    console.error('Error fetching recent repos:', error);
    return [];
  }
}
