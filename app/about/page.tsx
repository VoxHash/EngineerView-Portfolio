import SkillsMatrix from "@/components/SkillsMatrix";
import Timeline from "@/components/Timeline";
import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import { fetchPinnedRepos } from "@/lib/github";
import { 
  Award, 
  GraduationCap, 
  BookOpen, 
  Mic, 
  Code, 
  Users, 
  Star, 
  GitFork, 
  TrendingUp,
  Heart,
  Coffee,
  Music,
  Gamepad2,
  Camera,
  Globe,
  Trophy,
  Target,
  Lightbulb,
  Rocket
} from "lucide-react";

import { generateMetadata as generateSEOMetadata } from "@/lib/seo";

export const metadata: Metadata = generateSEOMetadata({
  title: "About",
  description: "Learn more about my background, skills, and experience in software engineering and AI. Discover my journey, achievements, and philosophy.",
  keywords: ["about", "background", "experience", "skills", "career", "biography"],
  url: "/about",
  image: "/og.png",
});

async function getGitHubStats() {
  try {
    const pinnedRepos = await fetchPinnedRepos(SITE.githubUser);
    const totalStars = pinnedRepos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
    const totalForks = pinnedRepos.reduce((sum, repo) => sum + repo.forks_count, 0);
    return { totalStars, totalForks, projectCount: pinnedRepos.length };
  } catch (error) {
    return { totalStars: 0, totalForks: 0, projectCount: 0 };
  }
}

export default async function AboutPage(){
  const githubStats = await getGitHubStats();

  return (
    <div className="py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <div className="flex items-center justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-brand to-brand-light flex items-center justify-center">
            <Code className="h-10 w-10 text-white" />
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          About <span className="text-brand">VoxHash</span>
        </h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto leading-relaxed mb-8">
          I build performant, human‑centered software: web apps, AI utilities, and creative systems. 
          I care about architecture, developer experience, and clear documentation. Passionate about 
          solving complex problems with elegant solutions.
        </p>
      </div>

      {/* Focus Areas */}
      <div className="card p-8 mb-16">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">Focus Areas</h2>
          <p className="text-neutral-600 dark:text-neutral-300 text-sm">
            Core expertise and specializations
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center group">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
              <span className="text-2xl">🤖</span>
            </div>
            <h3 className="text-lg font-semibold mb-3 text-brand">AI Engineering</h3>
            <p className="text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed">
              Data pipelines • retrieval systems • model evaluation • prompt engineering • LLM integration
            </p>
          </div>
          <div className="text-center group">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
              <span className="text-2xl">⚛️</span>
            </div>
            <h3 className="text-lg font-semibold mb-3 text-brand">Frontend Systems</h3>
            <p className="text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed">
              React/Next.js • design systems • UX optimization • performance • accessibility
            </p>
          </div>
          <div className="text-center group">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
              <span className="text-2xl">🛠️</span>
            </div>
            <h3 className="text-lg font-semibold mb-3 text-brand">Tooling & DevEx</h3>
            <p className="text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed">
              CI/CD • testing • developer tools • automation • infrastructure as code
            </p>
          </div>
        </div>
      </div>

      {/* Skills Matrix */}
      <SkillsMatrix />

      {/* Achievements & Recognition */}
      <div className="mt-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 flex items-center justify-center gap-3">
            <Trophy className="h-8 w-8 text-brand" />
            Achievements & Recognition
          </h2>
          <p className="text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
            Notable accomplishments, contributions, and milestones in my career.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="card p-6 hover-glow">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center flex-shrink-0">
                <Star className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-brand">Open Source Contributor</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-300">
                  Maintained 5+ popular repositories with 1000+ combined GitHub stars. 
                  Active contributor to React, Next.js, and AI/ML libraries.
                </p>
              </div>
            </div>
          </div>
          <div className="card p-6 hover-glow">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                <Mic className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-brand">Tech Speaker</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-300">
                  Spoke at tech conferences and meetups on topics including AI integration, 
                  modern web development, and scalable architecture.
                </p>
              </div>
            </div>
          </div>
          <div className="card p-6 hover-glow">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-teal-500 flex items-center justify-center flex-shrink-0">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-brand">Performance Optimization</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-300">
                  Improved application performance by 40% and reduced inference time by 60% 
                  through optimized algorithms and architecture.
                </p>
              </div>
            </div>
          </div>
          <div className="card p-6 hover-glow">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-red-500 flex items-center justify-center flex-shrink-0">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-brand">Mentorship</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-300">
                  Mentored junior developers and contributed to team growth. 
                  Led technical architecture decisions and code reviews.
                </p>
              </div>
            </div>
          </div>
          <div className="card p-6 hover-glow">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 to-blue-500 flex items-center justify-center flex-shrink-0">
                <Rocket className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-brand">Startup Experience</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-300">
                  Built and launched SaaS platforms from scratch, handling everything from 
                  frontend development to DevOps and database design.
                </p>
              </div>
            </div>
          </div>
          <div className="card p-6 hover-glow">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center flex-shrink-0">
                <Award className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-brand">Academic Excellence</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-300">
                  Graduated with honors in Computer Science. Led multiple hackathon teams 
                  to victory and received recognition for outstanding projects.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Career Timeline */}
      <div className="mt-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 flex items-center justify-center gap-3">
            <Target className="h-8 w-8 text-brand" />
            Career Journey
          </h2>
          <p className="text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
            A timeline of my professional journey, key achievements, and the evolution of my skills over time.
          </p>
        </div>
        <Timeline />
      </div>

      {/* Education & Certifications */}
      <div className="mt-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 flex items-center justify-center gap-3">
            <GraduationCap className="h-8 w-8 text-brand" />
            Education & Certifications
          </h2>
          <p className="text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
            Formal education and professional certifications that have shaped my expertise.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="card p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center flex-shrink-0">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-1 text-brand">Computer Science Degree</h3>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-2">University of Technology • 2020</p>
                <p className="text-sm text-neutral-600 dark:text-neutral-300">
                  Graduated with honors. Focused on software engineering, algorithms, and distributed systems. 
                  Led multiple hackathon teams to victory. Specialized in AI/ML and web technologies.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="badge text-xs">Algorithms</span>
                  <span className="badge text-xs">Data Structures</span>
                  <span className="badge text-xs">Software Engineering</span>
                  <span className="badge text-xs">Team Leadership</span>
                </div>
              </div>
            </div>
          </div>
          <div className="card p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                <Award className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-1 text-brand">Professional Certifications</h3>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-2">Ongoing Learning</p>
                <div className="space-y-2 text-sm text-neutral-600 dark:text-neutral-300">
                  <p>• AWS Certified Solutions Architect</p>
                  <p>• Google Cloud Professional Developer</p>
                  <p>• Kubernetes Administrator (CKA)</p>
                  <p>• React Advanced Patterns Certification</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Publications & Speaking */}
      <div className="mt-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 flex items-center justify-center gap-3">
            <BookOpen className="h-8 w-8 text-brand" />
            Publications & Speaking
          </h2>
          <p className="text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
            Technical writing, speaking engagements, and knowledge sharing with the community.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="card p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center flex-shrink-0">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-3 text-brand">Technical Writing</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-medium text-neutral-900 dark:text-neutral-100 mb-1">
                      Building Scalable Next.js Applications
                    </p>
                    <p className="text-neutral-600 dark:text-neutral-300">
                      Comprehensive guide covering performance optimization, deployment strategies, and best practices.
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-neutral-900 dark:text-neutral-100 mb-1">
                      AI Integration in Modern Web Apps
                    </p>
                    <p className="text-neutral-600 dark:text-neutral-300">
                      Deep dive into integrating LLMs, vector databases, and AI-powered features.
                    </p>
                  </div>
                </div>
                <a 
                  href="/blog" 
                  className="text-brand hover:text-brand-dark text-sm font-medium mt-4 inline-block"
                >
                  Read more articles →
                </a>
              </div>
            </div>
          </div>
          <div className="card p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                <Mic className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-3 text-brand">Speaking Engagements</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-medium text-neutral-900 dark:text-neutral-100 mb-1">
                      React Conference 2025
                    </p>
                    <p className="text-neutral-600 dark:text-neutral-300">
                      Shared insights about modern web development patterns and AI integration in frontend applications.
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-neutral-900 dark:text-neutral-100 mb-1">
                      AI/ML Meetup Series
                    </p>
                    <p className="text-neutral-600 dark:text-neutral-300">
                      Presented on building production-ready AI applications with LLM integration and vector databases.
                    </p>
                  </div>
                </div>
                <a 
                  href="/speaking" 
                  className="text-brand hover:text-brand-dark text-sm font-medium mt-4 inline-block"
                >
                  View speaking engagements →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Personal Interests */}
      <div className="mt-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 flex items-center justify-center gap-3">
            <Heart className="h-8 w-8 text-brand" />
            Beyond Code
          </h2>
          <p className="text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
            What I enjoy when I'm not building software. These interests fuel my creativity and problem-solving approach.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="card p-4 text-center hover-glow">
            <Coffee className="h-8 w-8 text-brand mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Coffee Culture</h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-300">
              Exploring specialty coffee and brewing methods
            </p>
          </div>
          <div className="card p-4 text-center hover-glow">
            <Music className="h-8 w-8 text-brand mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Music Production</h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-300">
              Creating electronic music and sound design
            </p>
          </div>
          <div className="card p-4 text-center hover-glow">
            <Gamepad2 className="h-8 w-8 text-brand mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Gaming</h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-300">
              Strategy games and game development
            </p>
          </div>
          <div className="card p-4 text-center hover-glow">
            <Camera className="h-8 w-8 text-brand mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Photography</h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-300">
              Digital photography and visual storytelling
            </p>
          </div>
        </div>
      </div>

      {/* Personal Philosophy */}
      <div className="mt-16 card p-8 bg-gradient-to-r from-brand/10 to-brand-light/10 border-brand/20">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-semibold mb-2 flex items-center justify-center gap-3">
            <Lightbulb className="h-6 w-6 text-brand" />
            Philosophy
          </h3>
          <p className="text-neutral-600 dark:text-neutral-300 text-sm">
            The principles that guide my work and approach to software development
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="text-center">
            <h4 className="text-lg font-medium mb-3 text-brand flex items-center justify-center gap-2">
              <Code className="h-5 w-5" />
              Code Quality
            </h4>
            <p className="text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed">
              I believe in writing code that's not just functional, but maintainable, readable, and scalable. 
              Clean code is a gift to your future self and your team. Every function should have a single 
              responsibility, and every variable should have a clear purpose.
            </p>
          </div>
          <div className="text-center">
            <h4 className="text-lg font-medium mb-3 text-brand flex items-center justify-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Continuous Learning
            </h4>
            <p className="text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed">
              Technology evolves rapidly, and so should we. I'm committed to staying current with emerging 
              technologies and best practices. Every project is an opportunity to learn something new and 
              improve my craft.
            </p>
          </div>
          <div className="text-center">
            <h4 className="text-lg font-medium mb-3 text-brand flex items-center justify-center gap-2">
              <Users className="h-5 w-5" />
              User-Centric Design
            </h4>
            <p className="text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed">
              Every technical decision should ultimately serve the end user. I prioritize user experience 
              and accessibility in all my work. Performance, usability, and accessibility are not optional—they're 
              fundamental requirements.
            </p>
          </div>
          <div className="text-center">
            <h4 className="text-lg font-medium mb-3 text-brand flex items-center justify-center gap-2">
              <Globe className="h-5 w-5" />
              Open Source
            </h4>
            <p className="text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed">
              Contributing to open source projects and sharing knowledge with the community is essential 
              for the growth of our industry. I believe in giving back, sharing solutions, and helping 
              others learn and grow.
            </p>
          </div>
        </div>
      </div>

      {/* Availability */}
      <div className="mt-16 text-center">
        <div className="card p-8 bg-gradient-to-r from-brand/10 to-brand-light/10 border-brand/20">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Rocket className="h-8 w-8 text-brand" />
            <h3 className="text-2xl font-semibold">Let's Work Together</h3>
          </div>
          <p className="text-neutral-600 dark:text-neutral-300 mb-6 max-w-2xl mx-auto">
            I'm currently open to remote roles and freelance/consulting opportunities. Whether you need 
            a full-stack developer, AI integration specialist, or technical consultant, I'd love to hear 
            about your project and how we can build something amazing together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="btn hover-glow">
              Get In Touch
            </a>
            <a href="/VoxHash_Resume.pdf" target="_blank" rel="noopener noreferrer" className="badge hover-glow">
              Download Resume
            </a>
            <a href="/projects" className="badge hover-glow">
              View Projects
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
