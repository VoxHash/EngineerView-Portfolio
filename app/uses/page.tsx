"use client";
import { Monitor, Keyboard, Mouse, Headphones, Coffee, Wifi, Cpu, HardDrive, MemoryStick, Smartphone, Mic, Gamepad2, Terminal, Code, Database, Palette, Zap, GitBranch, Server, Cloud, Shield, Watch } from "lucide-react";

interface Tool {
  name: string;
  description: string;
  category: 'hardware' | 'software' | 'development' | 'design' | 'productivity';
  icon: React.ReactNode;
  link?: string;
}

const tools: Tool[] = [
  // Hardware
  {
    name: 'MacBook Pro 16" M2 Max',
    description: 'Primary development machine with 32GB RAM and 1TB SSD',
    category: 'hardware',
    icon: <Monitor className="h-6 w-6" />
  },
  {
    name: 'PC (Windows 11)',
    description: 'Custom build: RTX 4060 8GB, Intel Core i7/i9 (or AMD equivalent), 42GB DDR4/DDR5 RAM, 4TB NVMe SSD',
    category: 'hardware',
    icon: <Cpu className="h-6 w-6" />
  },
  {
    name: 'Laptop (Arch Linux)',
    description: 'Custom MSI Sword 15 with RTX 3050 Ti, 32GB RAM, 2TB NVMe SSD',
    category: 'hardware',
    icon: <Monitor className="h-6 w-6" />
  },
  {
    name: 'Ubuntu Budgie (Dual Boot)',
    description: 'Dedicated NVMe drive running Ubuntu Budgie for Linux development and testing',
    category: 'hardware',
    icon: <HardDrive className="h-6 w-6" />
  },
  {
    name: 'Keychron K8 Pro',
    description: 'Mechanical keyboard with Gateron Brown switches',
    category: 'hardware',
    icon: <Keyboard className="h-6 w-6" />
  },
  {
    name: 'Logitech MX Master 3S',
    description: 'Wireless mouse with excellent ergonomics and precision',
    category: 'hardware',
    icon: <Mouse className="h-6 w-6" />
  },
  {
    name: 'Sony WH-1000XM4',
    description: 'Noise-canceling headphones for focused work',
    category: 'hardware',
    icon: <Headphones className="h-6 w-6" />
  },
  {
    name: 'iPhone 14',
    description: 'Mobile device for testing and communication',
    category: 'hardware',
    icon: <Smartphone className="h-6 w-6" />
  },
  {
    name: 'Google Pixel 7 Pro',
    description: 'Android device for cross-platform testing and development',
    category: 'hardware',
    icon: <Smartphone className="h-6 w-6" />
  },
  {
    name: 'Google Pixel Watch',
    description: 'Smartwatch for testing smartwatch apps, notifications, and health tracking',
    category: 'hardware',
    icon: <Watch className="h-6 w-6" />
  },
  {
    name: 'HyperX QuadCast',
    description: 'Professional USB microphone for streaming and recording',
    category: 'hardware',
    icon: <Mic className="h-6 w-6" />
  },
  {
    name: 'Meta Quest 3',
    description: 'VR headset for immersive development and gaming',
    category: 'hardware',
    icon: <Gamepad2 className="h-6 w-6" />
  },

  // Software
  {
    name: 'VS Code',
    description: 'Primary code editor with extensive extensions and custom configuration',
    category: 'software',
    icon: <Code className="h-6 w-6" />
  },
  {
    name: 'Windows Terminal',
    description: 'Modern terminal emulator for Windows with tabs, panes, and customization',
    category: 'software',
    icon: <Terminal className="h-6 w-6" />
  },
  {
    name: 'PowerShell 7',
    description: 'Cross-platform PowerShell for automation and scripting',
    category: 'software',
    icon: <Terminal className="h-6 w-6" />
  },
  {
    name: 'WSL2',
    description: 'Windows Subsystem for Linux 2 for seamless Linux development on Windows',
    category: 'software',
    icon: <Terminal className="h-6 w-6" />
  },
  {
    name: 'iTerm2',
    description: 'Terminal emulator for macOS with custom configuration',
    category: 'software',
    icon: <Terminal className="h-6 w-6" />
  },
  {
    name: 'Docker Desktop',
    description: 'Containerization platform for development and deployment with GUI',
    category: 'software',
    icon: <Server className="h-6 w-6" />
  },
  {
    name: 'Git',
    description: 'Version control system with GitHub integration and custom aliases',
    category: 'software',
    icon: <GitBranch className="h-6 w-6" />
  },
  {
    name: 'GitHub CLI',
    description: 'Command-line interface for GitHub workflows and automation',
    category: 'software',
    icon: <GitBranch className="h-6 w-6" />
  },
  {
    name: 'Node.js',
    description: 'JavaScript runtime for server-side development (via nvm)',
    category: 'software',
    icon: <Zap className="h-6 w-6" />
  },
  {
    name: 'PostgreSQL',
    description: 'Advanced open-source relational database',
    category: 'software',
    icon: <Database className="h-6 w-6" />
  },
  {
    name: 'Redis',
    description: 'In-memory data structure store for caching and session management',
    category: 'software',
    icon: <Database className="h-6 w-6" />
  },
  {
    name: 'MongoDB',
    description: 'NoSQL document database for flexible data storage',
    category: 'software',
    icon: <Database className="h-6 w-6" />
  },

  // Development Tools
  {
    name: 'Next.js',
    description: 'React framework for production applications with App Router',
    category: 'development',
    icon: <Code className="h-6 w-6" />
  },
  {
    name: 'React',
    description: 'JavaScript library for building user interfaces',
    category: 'development',
    icon: <Code className="h-6 w-6" />
  },
  {
    name: 'TypeScript',
    description: 'Typed superset of JavaScript for better development experience',
    category: 'development',
    icon: <Code className="h-6 w-6" />
  },
  {
    name: 'Tailwind CSS',
    description: 'Utility-first CSS framework for rapid UI development',
    category: 'development',
    icon: <Palette className="h-6 w-6" />
  },
  {
    name: 'Framer Motion',
    description: 'Animation library for React applications',
    category: 'development',
    icon: <Zap className="h-6 w-6" />
  },
  {
    name: 'Prisma',
    description: 'Next-generation ORM with type safety and migrations',
    category: 'development',
    icon: <Database className="h-6 w-6" />
  },
  {
    name: 'ESLint',
    description: 'JavaScript and TypeScript linter for code quality',
    category: 'development',
    icon: <Code className="h-6 w-6" />
  },
  {
    name: 'Prettier',
    description: 'Opinionated code formatter for consistent styling',
    category: 'development',
    icon: <Code className="h-6 w-6" />
  },
  {
    name: 'npm / pnpm',
    description: 'Package managers for Node.js dependencies',
    category: 'development',
    icon: <Zap className="h-6 w-6" />
  },
  {
    name: 'React DevTools',
    description: 'Browser extension for debugging React applications',
    category: 'development',
    icon: <Code className="h-6 w-6" />
  },
  {
    name: 'Chrome DevTools',
    description: 'Built-in browser tools for debugging and performance analysis',
    category: 'development',
    icon: <Code className="h-6 w-6" />
  },
  {
    name: 'Postman',
    description: 'API development and testing platform',
    category: 'development',
    icon: <Server className="h-6 w-6" />
  },
  {
    name: 'Insomnia',
    description: 'REST client for API testing and debugging',
    category: 'development',
    icon: <Server className="h-6 w-6" />
  },
  {
    name: 'Vercel',
    description: 'Platform for frontend deployment and serverless functions',
    category: 'development',
    icon: <Cloud className="h-6 w-6" />
  },

  // Design Tools
  {
    name: 'Figma',
    description: 'Collaborative design tool for UI/UX work and prototyping',
    category: 'design',
    icon: <Palette className="h-6 w-6" />
  },
  {
    name: 'Adobe Creative Suite',
    description: 'Professional design and media creation tools (Photoshop, Illustrator, Premiere)',
    category: 'design',
    icon: <Palette className="h-6 w-6" />
  },
  {
    name: 'Blender',
    description: 'Open-source 3D creation suite for modeling and animation',
    category: 'design',
    icon: <Palette className="h-6 w-6" />
  },

  // Productivity
  {
    name: 'Notion',
    description: 'All-in-one workspace for notes, docs, and project management',
    category: 'productivity',
    icon: <Zap className="h-6 w-6" />
  },
  {
    name: 'Linear',
    description: 'Issue tracking and project management for development teams',
    category: 'productivity',
    icon: <Zap className="h-6 w-6" />
  },
  {
    name: 'Raycast',
    description: 'Productivity launcher for macOS with powerful extensions',
    category: 'productivity',
    icon: <Zap className="h-6 w-6" />
  },
  {
    name: 'PowerToys',
    description: 'Windows utilities for power users and productivity',
    category: 'productivity',
    icon: <Zap className="h-6 w-6" />
  },
  {
    name: 'Keeper Password Manager',
    description: 'Password manager and secure vault for credentials',
    category: 'productivity',
    icon: <Shield className="h-6 w-6" />
  },
  {
    name: 'Obsidian',
    description: 'Knowledge base and note-taking app with markdown support',
    category: 'productivity',
    icon: <Zap className="h-6 w-6" />
  },
  {
    name: 'Spotify',
    description: 'Music streaming for focused coding sessions',
    category: 'productivity',
    icon: <Headphones className="h-6 w-6" />
  }
];

const categories = [
  { key: 'hardware', label: 'Hardware', icon: <Monitor className="h-5 w-5" /> },
  { key: 'software', label: 'Software', icon: <Cpu className="h-5 w-5" /> },
  { key: 'development', label: 'Development', icon: <Code className="h-5 w-5" /> },
  { key: 'design', label: 'Design', icon: <Palette className="h-5 w-5" /> },
  { key: 'productivity', label: 'Productivity', icon: <Zap className="h-5 w-5" /> }
];

export default function UsesPage() {
  const scrollToSection = (categoryKey: string) => {
    const element = document.getElementById(categoryKey);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          What I <span className="text-brand">Use</span>
        </h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
          A comprehensive list of the hardware, software, and tools I use daily for development, 
          design, and productivity. Always evolving and optimizing my setup.
        </p>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {categories.map((category) => (
          <button
            key={category.key}
            onClick={() => scrollToSection(category.key)}
            className="badge flex items-center gap-2 hover:bg-brand/10 hover:text-brand transition-colors duration-200 cursor-pointer"
          >
            {category.icon}
            {category.label}
          </button>
        ))}
      </div>

      {/* Tools Grid */}
      <div className="space-y-8">
        {categories.map((category, categoryIndex) => {
          const categoryTools = tools.filter(tool => tool.category === category.key);
          
          return (
            <section
              id={category.key}
              key={category.key}
              className="space-y-6 scroll-mt-24"
            >
              <h2 className="text-2xl font-bold flex items-center gap-3">
                {category.icon}
                {category.label}
              </h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryTools.map((tool, toolIndex) => (
                  <div
                    key={tool.name}
                    className="card p-6 hover-glow hover-scale group cursor-pointer"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 p-2 rounded-lg bg-brand/10 text-brand group-hover:bg-brand/20 transition-colors duration-200">
                        {tool.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-2 group-hover:text-brand transition-colors duration-200">
                          {tool.name}
                        </h3>
                        <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                          {tool.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {/* Setup Details */}
      <div className="mt-16">
        <div className="card p-8 bg-gradient-to-r from-brand/10 to-brand-light/10 border-brand/20">
          <h3 className="text-2xl font-semibold mb-6 text-center">Development Environment</h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="text-center">
              <h4 className="text-lg font-medium mb-4 text-brand">VS Code Extensions</h4>
              <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-300">
                <li>• ES7+ React/Redux/React-Native snippets</li>
                <li>• Tailwind CSS IntelliSense</li>
                <li>• TypeScript Importer</li>
                <li>• Prettier - Code formatter</li>
                <li>• ESLint - Code linting</li>
                <li>• GitLens — Git supercharged</li>
                <li>• Auto Rename Tag</li>
                <li>• Bracket Pair Colorizer</li>
                <li>• Material Icon Theme</li>
                <li>• Error Lens - Inline error highlighting</li>
                <li>• Thunder Client - API testing</li>
                <li>• REST Client - HTTP requests</li>
              </ul>
            </div>
            
            <div className="text-center">
              <h4 className="text-lg font-medium mb-4 text-brand">Terminal & Shell Setup</h4>
              <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-300">
                <li>• Windows Terminal with custom themes</li>
                <li>• PowerShell 7 with Oh My Posh</li>
                <li>• WSL2 with Ubuntu/Debian</li>
                <li>• Zsh with Oh My Zsh (macOS/Linux)</li>
                <li>• Powerlevel10k theme</li>
                <li>• Homebrew package manager (macOS)</li>
                <li>• Node.js via nvm (Node Version Manager)</li>
                <li>• Git with custom aliases</li>
                <li>• Docker Desktop</li>
                <li>• PostgreSQL via package manager</li>
                <li>• Redis for caching</li>
                <li>• Python 3.x with pip</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Contact CTA */}
      <div className="mt-12 text-center">
        <p className="text-neutral-600 dark:text-neutral-300 mb-4">
          Questions about my setup or recommendations for tools?
        </p>
        <a
          href="/contact"
          className="btn hover-glow"
        >
          Let's Discuss
        </a>
      </div>
    </div>
  );
}
