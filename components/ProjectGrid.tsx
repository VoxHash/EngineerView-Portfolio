"use client";

import RepoCard from "@/components/RepoCard";
import type { Repo } from "@/lib/github";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "@/lib/animation";

export default function ProjectGrid({repos}:{repos: Repo[]}){
  return (
    <motion.div
      className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      {repos.map((r, index) => (
        <motion.div
          key={r.id}
          variants={staggerItem}
          custom={index}
        >
          <RepoCard repo={r} />
        </motion.div>
      ))}
    </motion.div>
  );
}
