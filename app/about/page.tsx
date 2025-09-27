import SkillsMatrix from "@/components/SkillsMatrix";
import Timeline from "@/components/Timeline";
import type { Metadata } from "next";
import { getPageOGImage } from "@/lib/og";

export const metadata: Metadata = {
  title: "About VoxHash",
  description: "Learn more about my background, skills, and experience in software engineering and AI.",
  openGraph: {
    title: "About VoxHash",
    description: "Learn more about my background, skills, and experience in software engineering and AI.",
    images: [getPageOGImage('about')]
  },
  twitter: {
    card: "summary_large_image",
    images: [getPageOGImage('about')]
  }
};

export default function AboutPage(){
  return (
    <div className="py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          About <span className="text-brand">VoxHash</span>
        </h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto leading-relaxed">
          I build performant, human‑centered software: web apps, AI utilities, and creative systems. 
          I care about architecture, developer experience, and clear documentation. Passionate about 
          solving complex problems with elegant solutions.
        </p>
      </div>

      {/* Focus Areas */}
      <div className="card p-8 mb-16">
        <h2 className="text-2xl font-bold mb-6 text-center">Focus Areas</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🤖</span>
            </div>
            <h3 className="text-lg font-semibold mb-3 text-brand">AI Engineering</h3>
            <p className="text-neutral-600 dark:text-neutral-300 text-sm">
              Data pipelines • retrieval systems • model evaluation • prompt engineering • LLM integration
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">⚛️</span>
            </div>
            <h3 className="text-lg font-semibold mb-3 text-brand">Frontend Systems</h3>
            <p className="text-neutral-600 dark:text-neutral-300 text-sm">
              React/Next.js • design systems • UX optimization • performance • accessibility
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🛠️</span>
            </div>
            <h3 className="text-lg font-semibold mb-3 text-brand">Tooling & DevEx</h3>
            <p className="text-neutral-600 dark:text-neutral-300 text-sm">
              CI/CD • testing • developer tools • automation • infrastructure as code
            </p>
          </div>
        </div>
      </div>

      {/* Skills Matrix */}
      <SkillsMatrix />

      {/* Career Timeline */}
      <div className="mt-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Career Journey</h2>
          <p className="text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
            A timeline of my professional journey, key achievements, and the evolution of my skills over time.
          </p>
        </div>
        <Timeline />
      </div>

      {/* Personal Philosophy */}
      <div className="mt-16 card p-8 bg-gradient-to-r from-brand/10 to-brand-light/10 border-brand/20">
        <h3 className="text-2xl font-semibold mb-6 text-center">Philosophy</h3>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-lg font-medium mb-3 text-brand">Code Quality</h4>
            <p className="text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed">
              I believe in writing code that's not just functional, but maintainable, readable, and scalable. 
              Clean code is a gift to your future self and your team.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-medium mb-3 text-brand">Continuous Learning</h4>
            <p className="text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed">
              Technology evolves rapidly, and so should we. I'm committed to staying current with emerging 
              technologies and best practices.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-medium mb-3 text-brand">User-Centric Design</h4>
            <p className="text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed">
              Every technical decision should ultimately serve the end user. I prioritize user experience 
              and accessibility in all my work.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-medium mb-3 text-brand">Open Source</h4>
            <p className="text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed">
              Contributing to open source projects and sharing knowledge with the community is essential 
              for the growth of our industry.
            </p>
          </div>
        </div>
      </div>

      {/* Availability */}
      <div className="mt-16 text-center">
        <div className="card p-8">
          <h3 className="text-2xl font-semibold mb-4">Let's Work Together</h3>
          <p className="text-neutral-600 dark:text-neutral-300 mb-6 max-w-2xl mx-auto">
            I'm currently open to remote roles and freelance/consulting opportunities. 
            Whether you need a full-stack developer, AI integration specialist, or technical consultant, 
            I'd love to hear about your project.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="btn hover-glow">
              Get In Touch
            </a>
            <a href="/VoxHash_Resume.pdf" target="_blank" rel="noopener noreferrer" className="badge hover-glow">
              Download Resume
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
