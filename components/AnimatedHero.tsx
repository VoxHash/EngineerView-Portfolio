"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import SocialRow from "./SocialRow";
import { SITE } from "@/lib/site";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const floatingVariants = {
  float: {
    y: [-10, 10, -10],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export default function AnimatedHero() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section className="relative py-12 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 particle-field">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-brand/5 to-transparent" />
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-brand/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            variants={floatingVariants}
            animate="float"
            transition={{
              delay: Math.random() * 2,
              duration: 3 + Math.random() * 2
            }}
          />
        ))}
      </div>

      <motion.div
        ref={ref}
        className="relative z-10 text-center space-y-6"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <motion.h1 
          className="text-5xl md:text-7xl font-black tracking-tight"
          variants={itemVariants}
        >
          Vox<span className="text-brand bg-gradient-to-r from-brand to-brand-light bg-clip-text text-transparent">Hash</span>
        </motion.h1>
        
        <motion.p 
          className="mx-auto max-w-3xl text-lg md:text-xl text-neutral-600 dark:text-neutral-300 leading-relaxed"
          variants={itemVariants}
        >
          Engineer • AI • Systems • Creator. I design and ship robust products end‑to‑end — from low‑level systems to delightful UIs.
        </motion.p>
        
        <motion.div 
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          variants={itemVariants}
        >
          <motion.a 
            href="/projects" 
            className="btn hover-glow hover-scale"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View Projects
          </motion.a>
          <motion.a 
            className="badge hover-glow hover-scale" 
            href="/VoxHash_Resume.pdf" 
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Résumé
          </motion.a>
        </motion.div>
        
        <motion.div 
          className="mt-8"
          variants={itemVariants}
        >
          <SocialRow />
        </motion.div>
      </motion.div>

      {/* Call to Action Banner */}
      <motion.div
        className="mt-12 card p-6 text-center bg-gradient-to-r from-brand/10 to-brand-light/10 border-brand/20"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <h3 className="text-xl font-semibold mb-2">Open to Remote Roles</h3>
        <p className="text-neutral-600 dark:text-neutral-300 mb-4">
          Looking for exciting opportunities in full-stack development, AI/ML, or systems engineering.
        </p>
        <motion.a 
          href="/contact" 
          className="btn hover-glow"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Let's Connect
        </motion.a>
      </motion.div>
    </section>
  );
}
