"use client";

import SocialRow from "./SocialRow";
import { SITE } from "@/lib/site";

export default function SimpleAnimatedHero() {
  return (
    <section className="relative py-12 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 particle-field">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-brand/5 to-transparent" />
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-brand/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center space-y-6">
        <h1 className="text-5xl md:text-7xl font-black tracking-tight">
          Vox<span className="text-brand bg-gradient-to-r from-brand to-brand-light bg-clip-text text-transparent">Hash</span>
        </h1>
        
        <p className="mx-auto max-w-3xl text-lg md:text-xl text-neutral-600 dark:text-neutral-300 leading-relaxed">
          Engineer • AI • Systems • Creator. I design and ship robust products end‑to‑end — from low‑level systems to delightful UIs.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a 
            href="/projects" 
            className="btn hover-glow hover-scale focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2"
            aria-label="View my projects"
          >
            View Projects
          </a>
          <a 
            className="badge hover-glow hover-scale focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2" 
            href="/VoxHash_Resume.pdf" 
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Download my resume (opens PDF in new tab)"
          >
            Résumé
          </a>
        </div>
        
        <div className="mt-8">
          <SocialRow />
        </div>
      </div>

      {/* Call to Action Banner */}
      <div className="mt-12 card p-6 text-center bg-gradient-to-r from-brand/10 to-brand-light/10 border-brand/20">
        <h3 className="text-xl font-semibold mb-2">Open to Remote Roles</h3>
        <p className="text-neutral-600 dark:text-neutral-300 mb-4">
          Looking for exciting opportunities in full-stack development, AI/ML, or systems engineering.
        </p>
        <a 
          href="/contact" 
          className="btn hover-glow focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2"
          aria-label="Contact me"
        >
          Let's Connect
        </a>
      </div>
    </section>
  );
}
