"use client";

import { useState, useMemo, useEffect } from "react";
import { fetchTopRepos } from "@/lib/github";
import { SITE } from "@/lib/site";
import ProjectGrid from "@/components/ProjectGrid";
import ProjectFilters from "@/components/ProjectFilters";
import ProjectGroup from "@/components/ProjectGroup";
import type { Repo } from "@/lib/github";
import { usePerformanceMonitor } from "@/lib/performance-monitor";

export default function ProjectsPage(){
  const [repos, setRepos] = useState<Repo[]>([]);
  const [filteredRepos, setFilteredRepos] = useState<Repo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { measureAsync, logReport } = usePerformanceMonitor();

  useEffect(() => {
    const loadRepos = async () => {
      try {
        setIsLoading(true);
        const data = await measureAsync('loadProjects', async () => 
          await fetchTopRepos(SITE.githubUser, 100)
        );
        setRepos(data);
        setFilteredRepos(data);
      } catch (error) {
        console.error('Error loading repos:', error);
      } finally {
        setIsLoading(false);
        // Log performance report in development
        if (process.env.NODE_ENV === 'development') {
          setTimeout(() => logReport(), 1000);
        }
      }
    };
    loadRepos();
  }, [measureAsync, logReport]);

  // Group repos by technology/language
  const groupedRepos = useMemo(() => {
    const groups: Record<string, Repo[]> = {};
    
    filteredRepos.forEach(repo => {
      const key = repo.language || 'Other';
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(repo);
    });

    // Sort groups by number of repos
    return Object.entries(groups)
      .sort((a, b) => b[1].length - a[1].length)
      .map(([language, repos]) => ({
        language,
        repos: repos.sort((a, b) => b.stargazers_count - a.stargazers_count),
      }));
  }, [filteredRepos]);

  if (isLoading) {
    return (
      <section className="py-10">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-brand border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-neutral-600 dark:text-neutral-300">Loading projects...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-10">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Projects</h1>
        <p className="text-neutral-600 dark:text-neutral-300 mb-2">
          Auto‑pulled from GitHub/{SITE.githubUser}. Explore my open-source projects, web applications, and software solutions.
        </p>
      </div>

      <ProjectFilters repos={repos} onFilterChange={setFilteredRepos} />

      {filteredRepos.length === 0 ? (
        <div className="card p-8 text-center">
          <p className="text-neutral-600 dark:text-neutral-300 mb-4">
            No projects found matching your filters.
          </p>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            Try adjusting your search or filter criteria.
          </p>
        </div>
      ) : (
        <>
          {/* All Projects View */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">All Projects</h2>
            <ProjectGrid repos={filteredRepos} />
          </div>

          {/* Grouped by Technology */}
          {groupedRepos.length > 1 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold mb-8">Projects by Technology</h2>
              {groupedRepos.map(({ language, repos }) => (
                <ProjectGroup
                  key={language}
                  title={language}
                  repos={repos}
                  description={`${repos.length} project${repos.length !== 1 ? 's' : ''} built with ${language}`}
                />
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
}
