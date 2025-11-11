"use client";

import { useEffect, useState } from "react";
import { Calendar, GitCommit, GitPullRequest, GitBranch, Issue, Star, ExternalLink } from "lucide-react";
import { format } from "date-fns";
import type { GitHubActivity } from "@/lib/github";

export default function GitHubActivity({ limit = 10 }: { limit?: number }) {
  const [activity, setActivity] = useState<GitHubActivity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadActivity = async () => {
      try {
        setIsLoading(true);
        const data = await fetch(`/api/github/activity?limit=${limit}`);
        if (!data.ok) {
          throw new Error('Failed to fetch GitHub activity');
        }
        const result = await data.json();
        if (result.success) {
          setActivity(result.data.activity || []);
        } else {
          setError(result.message || 'Failed to load activity');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load activity');
      } finally {
        setIsLoading(false);
      }
    };

    loadActivity();
  }, [limit]);

  const getActivityIcon = (type: GitHubActivity['type']) => {
    switch (type) {
      case 'PushEvent':
        return <GitCommit className="h-4 w-4" />;
      case 'PullRequestEvent':
        return <GitPullRequest className="h-4 w-4" />;
      case 'IssuesEvent':
        return <Issue className="h-4 w-4" />;
      case 'CreateEvent':
        return <GitBranch className="h-4 w-4" />;
      case 'WatchEvent':
        return <Star className="h-4 w-4" />;
      default:
        return <GitCommit className="h-4 w-4" />;
    }
  };

  const getActivityColor = (type: GitHubActivity['type']) => {
    switch (type) {
      case 'PushEvent':
        return 'text-green-600 dark:text-green-400';
      case 'PullRequestEvent':
        return 'text-blue-600 dark:text-blue-400';
      case 'IssuesEvent':
        return 'text-purple-600 dark:text-purple-400';
      case 'CreateEvent':
        return 'text-yellow-600 dark:text-yellow-400';
      case 'WatchEvent':
        return 'text-pink-600 dark:text-pink-400';
      default:
        return 'text-neutral-600 dark:text-neutral-400';
    }
  };

  const getActivityText = (activity: GitHubActivity) => {
    switch (activity.type) {
      case 'PushEvent':
        return `Pushed ${activity.payload?.commits?.length || 0} commit${(activity.payload?.commits?.length || 0) !== 1 ? 's' : ''} to`;
      case 'PullRequestEvent':
        return `${activity.action === 'opened' ? 'Opened' : activity.action === 'closed' ? 'Closed' : 'Updated'} pull request in`;
      case 'IssuesEvent':
        return `${activity.action === 'opened' ? 'Opened' : activity.action === 'closed' ? 'Closed' : 'Updated'} issue in`;
      case 'CreateEvent':
        return 'Created';
      case 'WatchEvent':
        return 'Starred';
      default:
        return 'Activity in';
    }
  };

  if (isLoading) {
    return (
      <div className="card p-8 text-center">
        <div className="w-8 h-8 border-4 border-brand border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-neutral-600 dark:text-neutral-300">Loading GitHub activity...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card p-8 text-center">
        <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          Unable to load GitHub activity. Please try again later.
        </p>
      </div>
    );
  }

  if (activity.length === 0) {
    return (
      <div className="card p-8 text-center">
        <p className="text-neutral-600 dark:text-neutral-300 mb-4">
          No recent activity found.
        </p>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          GitHub activity will appear here once available.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {activity.map((item) => (
        <article
          key={item.id}
          className="card p-4 hover-glow transition-all duration-200"
        >
          <div className="flex items-start gap-4">
            <div className={`flex-shrink-0 ${getActivityColor(item.type)}`}>
              {getActivityIcon(item.type)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4 mb-2">
                <div className="flex-1">
                  <p className="text-sm text-neutral-900 dark:text-neutral-100">
                    {getActivityText(item)}{' '}
                    <a
                      href={item.repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-brand hover:text-brand-dark transition-colors focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2 rounded"
                    >
                      {item.repo.name}
                    </a>
                  </p>
                  {item.payload?.commits && item.payload.commits.length > 0 && (
                    <div className="mt-2 space-y-1">
                      {item.payload.commits.slice(0, 3).map((commit, idx) => (
                        <a
                          key={idx}
                          href={commit.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block text-xs text-neutral-600 dark:text-neutral-400 hover:text-brand transition-colors truncate"
                        >
                          {commit.message}
                        </a>
                      ))}
                    </div>
                  )}
                  {item.payload?.pull_request && (
                    <a
                      href={item.payload.pull_request.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-sm text-neutral-600 dark:text-neutral-400 hover:text-brand transition-colors mt-2"
                    >
                      {item.payload.pull_request.title}
                    </a>
                  )}
                  {item.payload?.issue && (
                    <a
                      href={item.payload.issue.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-sm text-neutral-600 dark:text-neutral-400 hover:text-brand transition-colors mt-2"
                    >
                      {item.payload.issue.title}
                    </a>
                  )}
                </div>
                <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400 flex-shrink-0">
                  <Calendar className="h-3 w-3" aria-hidden="true" />
                  <time dateTime={item.createdAt}>
                    {format(new Date(item.createdAt), 'MMM dd, yyyy')}
                  </time>
                </div>
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

