"use client";

import { motion } from "framer-motion";
import type { Repo } from "@/lib/github";
import ProjectGrid from "@/components/ProjectGrid";

interface ProjectGroupProps {
  title: string;
  repos: Repo[];
  description?: string;
}

export default function ProjectGroup({ title, repos, description }: ProjectGroupProps) {
  if (repos.length === 0) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      className="mb-12"
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        {description && (
          <p className="text-neutral-600 dark:text-neutral-300">{description}</p>
        )}
        <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
          {repos.length} project{repos.length !== 1 ? 's' : ''}
        </p>
      </div>
      <ProjectGrid repos={repos} />
    </motion.section>
  );
}

