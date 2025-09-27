"use client";

import Link from "next/link";
import type { Repo } from "@/lib/github";
import { Star, GitFork, Calendar, ExternalLink } from "lucide-react";
import { useAnalytics } from "./Analytics";

export default function RepoCard({repo}:{repo:Repo}){
  const { trackProjectView, trackExternalLink } = useAnalytics();

  const handleProjectClick = () => {
    trackProjectView(repo.name);
    trackExternalLink(repo.html_url);
  };

  return (
    <article 
      className="card p-6 hover-glow hover-scale group cursor-pointer"
    >
      <div className="flex items-start justify-between gap-4 mb-3">
        <h3 className="text-lg font-semibold group-hover:text-brand transition-colors duration-200">
          <a 
            className="link flex items-center gap-2" 
            href={repo.html_url} 
            target="_blank" 
            rel="noopener noreferrer"
            onClick={handleProjectClick}
          >
            {repo.name}
            <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
          </a>
        </h3>
        <span className="badge bg-brand/10 text-brand border-brand/20 group-hover:bg-brand/20 transition-colors duration-200">
          {repo.language || "Other"}
        </span>
      </div>
      
      <p className="text-sm text-neutral-600 dark:text-neutral-300 min-h-12 mb-4 leading-relaxed">
        {repo.description || "No description provided."}
      </p>
      
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-4 text-neutral-500 dark:text-neutral-400">
          <span className="flex items-center gap-1">
            <Star className="h-4 w-4" />
            {repo.stargazers_count}
          </span>
          <span className="flex items-center gap-1">
            <GitFork className="h-4 w-4" />
            {repo.forks_count}
          </span>
        </div>
        <span className="flex items-center gap-1 text-neutral-500 dark:text-neutral-400">
          <Calendar className="h-4 w-4" />
          {new Date(repo.pushed_at).toLocaleDateString()}
        </span>
      </div>
    </article>
  )
}
