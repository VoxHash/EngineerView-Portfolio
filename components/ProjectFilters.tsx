"use client";

import { useState, useMemo } from "react";
import { X, Filter } from "lucide-react";
import type { Repo } from "@/lib/github";
import { motion, AnimatePresence } from "framer-motion";

interface ProjectFiltersProps {
  repos: Repo[];
  onFilterChange: (filteredRepos: Repo[]) => void;
}

export default function ProjectFilters({ repos, onFilterChange }: ProjectFiltersProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'stars' | 'updated' | 'name'>('stars');
  const [searchQuery, setSearchQuery] = useState('');

  // Extract unique languages and topics
  const languages = useMemo(() => {
    const langs = new Set<string>();
    repos.forEach(repo => {
      if (repo.language) langs.add(repo.language);
    });
    return Array.from(langs).sort();
  }, [repos]);

  const topics = useMemo(() => {
    const top = new Set<string>();
    repos.forEach(repo => {
      if (repo.topics) {
        repo.topics.forEach(topic => top.add(topic));
      }
    });
    return Array.from(top).sort();
  }, [repos]);

  // Filter and sort repos
  const filteredRepos = useMemo(() => {
    let filtered = [...repos];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(repo =>
        repo.name.toLowerCase().includes(query) ||
        repo.description?.toLowerCase().includes(query) ||
        repo.language?.toLowerCase().includes(query) ||
        repo.topics?.some(topic => topic.toLowerCase().includes(query))
      );
    }

    // Language filter
    if (selectedLanguage) {
      filtered = filtered.filter(repo => repo.language === selectedLanguage);
    }

    // Topic filter
    if (selectedTopic) {
      filtered = filtered.filter(repo => 
        repo.topics?.includes(selectedTopic)
      );
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'stars':
          return b.stargazers_count - a.stargazers_count;
        case 'updated':
          return new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime();
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    return filtered;
  }, [repos, searchQuery, selectedLanguage, selectedTopic, sortBy]);

  // Update parent component
  useMemo(() => {
    onFilterChange(filteredRepos);
  }, [filteredRepos, onFilterChange]);

  const clearFilters = () => {
    setSelectedLanguage(null);
    setSelectedTopic(null);
    setSearchQuery('');
  };

  const hasActiveFilters = selectedLanguage || selectedTopic || searchQuery;

  return (
    <div className="space-y-6 mb-8">
      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search projects..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-3 pl-10 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-all"
          aria-label="Search projects"
        />
        <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-400" aria-hidden="true" />
      </div>

      {/* Filters Row */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Language Filter */}
        <div className="flex items-center gap-2">
          <label htmlFor="language-filter" className="text-sm font-medium text-neutral-700 dark:text-neutral-300 sr-only">
            Filter by language
          </label>
          <select
            id="language-filter"
            value={selectedLanguage || ''}
            onChange={(e) => setSelectedLanguage(e.target.value || null)}
            className="px-4 py-2 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-all text-sm"
            aria-label="Filter by programming language"
          >
            <option value="">All Languages</option>
            {languages.map(lang => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
        </div>

        {/* Topic Filter */}
        <div className="flex items-center gap-2">
          <label htmlFor="topic-filter" className="text-sm font-medium text-neutral-700 dark:text-neutral-300 sr-only">
            Filter by topic
          </label>
          <select
            id="topic-filter"
            value={selectedTopic || ''}
            onChange={(e) => setSelectedTopic(e.target.value || null)}
            className="px-4 py-2 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-all text-sm"
            aria-label="Filter by topic"
          >
            <option value="">All Topics</option>
            {topics.map(topic => (
              <option key={topic} value={topic}>{topic}</option>
            ))}
          </select>
        </div>

        {/* Sort By */}
        <div className="flex items-center gap-2 ml-auto">
          <label htmlFor="sort-filter" className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
            Sort by:
          </label>
          <select
            id="sort-filter"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'stars' | 'updated' | 'name')}
            className="px-4 py-2 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-all text-sm"
            aria-label="Sort projects"
          >
            <option value="stars">Most Stars</option>
            <option value="updated">Recently Updated</option>
            <option value="name">Name (A-Z)</option>
          </select>
        </div>

        {/* Clear Filters */}
        <AnimatePresence>
          {hasActiveFilters && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={clearFilters}
              className="px-4 py-2 text-sm text-brand hover:text-brand-dark bg-brand/10 hover:bg-brand/20 rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2 flex items-center gap-2"
              aria-label="Clear all filters"
            >
              <X className="h-4 w-4" aria-hidden="true" />
              Clear Filters
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Active Filters Display */}
      <AnimatePresence>
        {hasActiveFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="flex flex-wrap gap-2"
          >
            {selectedLanguage && (
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-brand/10 text-brand rounded-full text-sm">
                Language: {selectedLanguage}
                <button
                  onClick={() => setSelectedLanguage(null)}
                  className="hover:bg-brand/20 rounded-full p-0.5 focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2"
                  aria-label={`Remove language filter: ${selectedLanguage}`}
                >
                  <X className="h-3 w-3" aria-hidden="true" />
                </button>
              </span>
            )}
            {selectedTopic && (
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-brand/10 text-brand rounded-full text-sm">
                Topic: {selectedTopic}
                <button
                  onClick={() => setSelectedTopic(null)}
                  className="hover:bg-brand/20 rounded-full p-0.5 focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2"
                  aria-label={`Remove topic filter: ${selectedTopic}`}
                >
                  <X className="h-3 w-3" aria-hidden="true" />
                </button>
              </span>
            )}
            {searchQuery && (
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-brand/10 text-brand rounded-full text-sm">
                Search: &quot;{searchQuery}&quot;
                <button
                  onClick={() => setSearchQuery('')}
                  className="hover:bg-brand/20 rounded-full p-0.5 focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2"
                  aria-label="Clear search query"
                >
                  <X className="h-3 w-3" aria-hidden="true" />
                </button>
              </span>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results Count */}
      <p className="text-sm text-neutral-600 dark:text-neutral-400">
        Showing {filteredRepos.length} of {repos.length} projects
      </p>
    </div>
  );
}

