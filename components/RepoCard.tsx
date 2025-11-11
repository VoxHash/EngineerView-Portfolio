"use client";

import Link from "next/link";
import type { Repo } from "@/lib/github";
import { Star, GitFork, Calendar, ExternalLink } from "lucide-react";
import { useAnalytics } from "./Analytics";
import { motion } from "framer-motion";
import { hoverScale, hoverLift } from "@/lib/animation";

export default function RepoCard({repo}:{repo:Repo}){
  const { trackProjectView, trackExternalLink } = useAnalytics();

  const handleProjectClick = () => {
    trackProjectView(repo.name);
    trackExternalLink(repo.html_url);
  };

  return (
    <motion.article 
      className="card p-6 hover-glow group cursor-pointer"
      role="article"
      aria-label={`Repository: ${repo.name}`}
      whileHover={hoverLift}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-start justify-between gap-4 mb-3">
        <h3 className="text-lg font-semibold group-hover:text-brand transition-colors duration-200">
          <a 
            className="link flex items-center gap-2 focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2 rounded" 
            href={repo.html_url} 
            target="_blank" 
            rel="noopener noreferrer"
            onClick={handleProjectClick}
            aria-label={`View ${repo.name} repository on GitHub (opens in new tab)`}
          >
            {repo.name}
            <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200" aria-hidden="true" />
          </a>
        </h3>
        <span className="badge bg-brand/10 text-brand border-brand/20 group-hover:bg-brand/20 transition-colors duration-200">
          {repo.language || "Other"}
        </span>
      </div>
      
      <p className="text-sm text-neutral-600 dark:text-neutral-300 min-h-12 mb-4 leading-relaxed">
        {repo.description || "No description provided."}
      </p>

      {/* Topics */}
      {repo.topics && repo.topics.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {repo.topics.slice(0, 3).map((topic) => (
            <span
              key={topic}
              className="text-xs px-2 py-1 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 rounded-md"
            >
              {topic}
            </span>
          ))}
          {repo.topics.length > 3 && (
            <span className="text-xs px-2 py-1 text-neutral-500 dark:text-neutral-500">
              +{repo.topics.length - 3}
            </span>
          )}
        </div>
      )}
      
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-4 text-neutral-500 dark:text-neutral-400">
          <span className="flex items-center gap-1" aria-label={`${repo.stargazers_count} stars`}>
            <Star className="h-4 w-4" aria-hidden="true" />
            {repo.stargazers_count}
          </span>
          <span className="flex items-center gap-1" aria-label={`${repo.forks_count} forks`}>
            <GitFork className="h-4 w-4" aria-hidden="true" />
            {repo.forks_count}
          </span>
        </div>
        <span className="flex items-center gap-1 text-neutral-500 dark:text-neutral-400">
          <Calendar className="h-4 w-4" aria-hidden="true" />
          <time dateTime={repo.pushed_at}>
            {new Date(repo.pushed_at).toLocaleDateString()}
          </time>
        </span>
      </div>
    </motion.article>
  )
}
