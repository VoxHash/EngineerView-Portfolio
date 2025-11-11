"use client";
import { useEffect, useState } from "react";
import { Star, GitFork, GitCommit, Users, TrendingUp, Calendar } from "lucide-react";
import { SITE } from "@/lib/site";

interface RepoMetrics {
  name: string;
  stars: number;
  forks: number;
  commits: number;
  contributors: number;
  language: string;
  updated_at: string;
}

interface GitHubStats {
  totalStars: number;
  totalForks: number;
  totalCommits: number;
  totalContributors: number;
  topRepos: RepoMetrics[];
}

export default function MetricsPage() {
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        setIsLoading(true);
        
        // Fetch user's repositories
        const reposResponse = await fetch(`https://api.github.com/users/${SITE.githubUser}/repos?per_page=100&sort=updated`);
        const repos = await reposResponse.json();
        
        if (!reposResponse.ok) {
          throw new Error('Failed to fetch repositories');
        }

        // Type guard for GitHub API response
        interface GitHubRepo {
          stargazers_count: number;
          forks_count: number;
          name: string;
          language: string | null;
          updated_at: string;
          [key: string]: unknown;
        }

        // Calculate metrics
        const githubRepos = repos as GitHubRepo[];
        const totalStars = githubRepos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
        const totalForks = githubRepos.reduce((sum, repo) => sum + repo.forks_count, 0);
        
        // Get top 10 repositories by stars
        const topRepos = githubRepos
          .sort((a, b) => b.stargazers_count - a.stargazers_count)
          .slice(0, 10)
          .map((repo) => ({
            name: repo.name,
            stars: repo.stargazers_count,
            forks: repo.forks_count,
            commits: 0, // Would need additional API calls
            contributors: 0, // Would need additional API calls
            language: repo.language || 'Other',
            updated_at: repo.updated_at
          }));

        setStats({
          totalStars,
          totalForks,
          totalCommits: 0, // Placeholder - would need additional API calls
          totalContributors: 0, // Placeholder - would need additional API calls
          topRepos
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch metrics');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  if (isLoading) {
    return (
      <div className="py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Project Metrics</h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-300 mb-8">
            Loading GitHub statistics and project metrics...
          </p>
          <div className="animate-pulse">
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="card p-6">
                  <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded mb-2"></div>
                  <div className="h-8 bg-neutral-200 dark:bg-neutral-700 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Project Metrics</h1>
          <p className="text-lg text-red-600 dark:text-red-400 mb-8">
            Error loading metrics: {error}
          </p>
        </div>
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">
          Project <span className="text-brand">Metrics</span>
        </h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
          GitHub statistics and open source project metrics showcasing my contributions and impact.
        </p>
      </div>

      {/* Overall Stats */}
      <div className="grid md:grid-cols-4 gap-6 mb-12">
        <div className="card p-6 text-center">
          <div className="flex items-center justify-center mb-2">
            <Star className="h-6 w-6 text-yellow-500 mr-2" />
            <span className="text-2xl font-bold">{stats.totalStars.toLocaleString()}</span>
          </div>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">Total Stars</p>
        </div>

        <div className="card p-6 text-center">
          <div className="flex items-center justify-center mb-2">
            <GitFork className="h-6 w-6 text-blue-500 mr-2" />
            <span className="text-2xl font-bold">{stats.totalForks.toLocaleString()}</span>
          </div>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">Total Forks</p>
        </div>

        <div className="card p-6 text-center">
          <div className="flex items-center justify-center mb-2">
            <GitCommit className="h-6 w-6 text-green-500 mr-2" />
            <span className="text-2xl font-bold">{stats.totalCommits.toLocaleString()}</span>
          </div>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">Total Commits</p>
        </div>

        <div className="card p-6 text-center">
          <div className="flex items-center justify-center mb-2">
            <Users className="h-6 w-6 text-purple-500 mr-2" />
            <span className="text-2xl font-bold">{stats.totalContributors.toLocaleString()}</span>
          </div>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">Contributors</p>
        </div>
      </div>

      {/* Top Repositories */}
      <div className="card p-8">
        <h2 className="text-2xl font-bold mb-6">Top Repositories</h2>
        <div className="space-y-4">
          {stats.topRepos.map((repo, index) => (
            <div key={repo.name} className="flex items-center justify-between p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
              <div className="flex items-center gap-4">
                <span className="text-lg font-semibold text-neutral-400">#{index + 1}</span>
                <div>
                  <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
                    {repo.name}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-neutral-600 dark:text-neutral-400">
                    <span className="flex items-center gap-1">
                      <Star className="h-4 w-4" />
                      {repo.stars}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork className="h-4 w-4" />
                      {repo.forks}
                    </span>
                    <span className="badge text-xs">
                      {repo.language}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right text-sm text-neutral-500 dark:text-neutral-400">
                <p>Updated {new Date(repo.updated_at).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* GitHub Link */}
      <div className="text-center mt-8">
        <a
          href={`https://github.com/${SITE.githubUser}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn inline-flex items-center gap-2"
        >
          <TrendingUp className="h-4 w-4" />
          View Full GitHub Profile
        </a>
      </div>
    </div>
  );
}
