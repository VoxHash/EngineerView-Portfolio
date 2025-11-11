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

import { getFetchCacheOptions } from './cache';

async function gh(path: string) {
  const headers: Record<string, string> = { "Accept": "application/vnd.github+json" };
  if (process.env.GITHUB_TOKEN) headers["Authorization"] = `Bearer ${process.env.GITHUB_TOKEN}`;
  const res = await fetch(`https://api.github.com${path}`, { 
    headers, 
    ...getFetchCacheOptions('DYNAMIC')
  });
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

export interface GitHubActivity {
  id: string;
  type: 'PushEvent' | 'PullRequestEvent' | 'IssuesEvent' | 'CreateEvent' | 'WatchEvent' | 'ForkEvent';
  repo: {
    name: string;
    url: string;
  };
  action?: string;
  createdAt: string;
  payload?: {
    commitCount?: number; // Actual commit count (uses payload.size for PushEvent)
    commits?: Array<{
      message: string;
      sha: string;
      url: string;
    }>;
    pull_request?: {
      title: string;
      url: string;
      state: string;
    };
    issue?: {
      title: string;
      url: string;
      state: string;
    };
  };
}

/**
 * Fetch recent GitHub activity/events for a user
 */
export async function fetchGitHubActivity(user: string, limit = 10): Promise<GitHubActivity[]> {
  try {
    const events: any[] = await gh(`/users/${user}/events/public?per_page=${limit}`);
    
    if (!Array.isArray(events) || events.length === 0) {
      return [];
    }
    
    // Filter out duplicate events and ensure we have valid events
    const seenIds = new Set<string>();
    const uniqueEvents = events.filter((event) => {
      if (!event || !event.id || !event.type || !event.repo || seenIds.has(event.id)) {
        return false;
      }
      seenIds.add(event.id);
      return true;
    });
    
    return uniqueEvents
      .map((event) => {
        // For PushEvent, GitHub API provides:
        // - payload.size: total number of commits in the push
        // - payload.commits: array of commit objects (may be truncated to 20)
        // We should use payload.size if available, as it's the accurate count
        let commitCount = 0;
        
        if (event.type === 'PushEvent') {
          // Check payload.size first (most reliable)
          if (typeof event.payload?.size === 'number') {
            commitCount = event.payload.size;
          } 
          // Fallback to commits array length
          else if (Array.isArray(event.payload?.commits)) {
            commitCount = event.payload.commits.length;
          }
        } else if (event.type === 'CreateEvent' || event.type === 'DeleteEvent') {
          // These events don't have commits
          commitCount = 0;
        } else if (Array.isArray(event.payload?.commits)) {
          commitCount = event.payload.commits.length;
        }
        
        return {
          id: event.id,
          type: event.type,
          repo: {
            name: event.repo.name,
            url: `https://github.com/${event.repo.name}`,
          },
          action: event.payload?.action,
          createdAt: event.created_at,
          payload: {
            commitCount, // Store the actual commit count
            commits: Array.isArray(event.payload?.commits) 
              ? event.payload.commits.map((commit: any) => ({
                  message: commit.message || 'No message',
                  sha: commit.sha || '',
                  url: `https://github.com/${event.repo.name}/commit/${commit.sha || ''}`,
                }))
              : [],
            pull_request: event.payload?.pull_request ? {
              title: event.payload.pull_request.title,
              url: event.payload.pull_request.html_url,
              state: event.payload.pull_request.state,
            } : undefined,
            issue: event.payload?.issue ? {
              title: event.payload.issue.title,
              url: event.payload.issue.html_url,
              state: event.payload.issue.state,
            } : undefined,
          },
        };
      })
      // Filter out PushEvents with 0 commits (empty pushes, force pushes, etc.)
      .filter((activity) => {
        if (activity.type === 'PushEvent' && (activity.payload?.commitCount || 0) === 0) {
          return false;
        }
        return true;
      });
  } catch (error) {
    console.error('Error fetching GitHub activity:', error);
    return [];
  }
}

/**
 * Fetch contribution statistics
 */
export interface ContributionStats {
  totalCommits: number;
  totalPRs: number;
  totalIssues: number;
  totalStars: number;
  totalRepos: number;
  languages: Record<string, number>;
}

export async function fetchContributionStats(user: string): Promise<ContributionStats> {
  try {
    const repos: Repo[] = await gh(`/users/${user}/repos?per_page=100&sort=updated`);
    
    const stats: ContributionStats = {
      totalCommits: 0, // Would require additional API calls per repo
      totalPRs: 0,
      totalIssues: 0,
      totalStars: repos.reduce((sum, repo) => sum + repo.stargazers_count, 0),
      totalRepos: repos.length,
      languages: {},
    };

    // Count languages
    repos.forEach((repo) => {
      if (repo.language) {
        stats.languages[repo.language] = (stats.languages[repo.language] || 0) + 1;
      }
    });

    return stats;
  } catch (error) {
    console.error('Error fetching contribution stats:', error);
    return {
      totalCommits: 0,
      totalPRs: 0,
      totalIssues: 0,
      totalStars: 0,
      totalRepos: 0,
      languages: {},
    };
  }
}
