import { Monitor, Keyboard, Mouse, Headphones, Coffee, Wifi, Cpu, HardDrive, MemoryStick, Smartphone } from "lucide-react";

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
    name: 'iPhone 15 Pro',
    description: 'Mobile device for testing and communication',
    category: 'hardware',
    icon: <Smartphone className="h-6 w-6" />
  },

  // Development Software
  {
    name: 'VS Code',
    description: 'Primary code editor with extensive extensions',
    category: 'software',
    icon: <Cpu className="h-6 w-6" />
  },
  {
    name: 'iTerm2',
    description: 'Terminal emulator with custom configuration',
    category: 'software',
    icon: <Cpu className="h-6 w-6" />
  },
  {
    name: 'Docker',
    description: 'Containerization platform for development and deployment',
    category: 'software',
    icon: <Cpu className="h-6 w-6" />
  },
  {
    name: 'Git',
    description: 'Version control system with GitHub integration',
    category: 'software',
    icon: <Cpu className="h-6 w-6" />
  },
  {
    name: 'Node.js',
    description: 'JavaScript runtime for server-side development',
    category: 'software',
    icon: <Cpu className="h-6 w-6" />
  },

  // Development Tools
  {
    name: 'Next.js',
    description: 'React framework for production applications',
    category: 'development',
    icon: <Cpu className="h-6 w-6" />
  },
  {
    name: 'TypeScript',
    description: 'Typed superset of JavaScript for better development experience',
    category: 'development',
    icon: <Cpu className="h-6 w-6" />
  },
  {
    name: 'Tailwind CSS',
    description: 'Utility-first CSS framework for rapid UI development',
    category: 'development',
    icon: <Cpu className="h-6 w-6" />
  },
  {
    name: 'Framer Motion',
    description: 'Animation library for React applications',
    category: 'development',
    icon: <Cpu className="h-6 w-6" />
  },
  {
    name: 'Prisma',
    description: 'Database ORM with type safety and migrations',
    category: 'development',
    icon: <Cpu className="h-6 w-6" />
  },

  // Design Tools
  {
    name: 'Figma',
    description: 'Collaborative design tool for UI/UX work',
    category: 'design',
    icon: <Cpu className="h-6 w-6" />
  },
  {
    name: 'Adobe Creative Suite',
    description: 'Professional design and media creation tools',
    category: 'design',
    icon: <Cpu className="h-6 w-6" />
  },

  // Productivity
  {
    name: 'Notion',
    description: 'All-in-one workspace for notes, docs, and project management',
    category: 'productivity',
    icon: <Cpu className="h-6 w-6" />
  },
  {
    name: 'Linear',
    description: 'Issue tracking and project management for development teams',
    category: 'productivity',
    icon: <Cpu className="h-6 w-6" />
  },
  {
    name: 'Raycast',
    description: 'Productivity launcher for macOS with powerful extensions',
    category: 'productivity',
    icon: <Cpu className="h-6 w-6" />
  },
  {
    name: '1Password',
    description: 'Password manager and secure vault for credentials',
    category: 'productivity',
    icon: <Cpu className="h-6 w-6" />
  }
];

const categories = [
  { key: 'hardware', label: 'Hardware', icon: <Monitor className="h-5 w-5" /> },
  { key: 'software', label: 'Software', icon: <Cpu className="h-5 w-5" /> },
  { key: 'development', label: 'Development', icon: <Cpu className="h-5 w-5" /> },
  { key: 'design', label: 'Design', icon: <Cpu className="h-5 w-5" /> },
  { key: 'productivity', label: 'Productivity', icon: <Cpu className="h-5 w-5" /> }
];

export default function UsesPage() {
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
            className="badge flex items-center gap-2 hover:bg-brand/10 hover:text-brand transition-colors duration-200"
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
              key={category.key}
              className="space-y-6"
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
            <div>
              <h4 className="text-lg font-medium mb-4 text-brand">VS Code Extensions</h4>
              <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-300">
                <li>• ES7+ React/Redux/React-Native snippets</li>
                <li>• Tailwind CSS IntelliSense</li>
                <li>• TypeScript Importer</li>
                <li>• Prettier - Code formatter</li>
                <li>• GitLens — Git supercharged</li>
                <li>• Auto Rename Tag</li>
                <li>• Bracket Pair Colorizer</li>
                <li>• Material Icon Theme</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-medium mb-4 text-brand">Terminal Setup</h4>
              <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-300">
                <li>• Zsh with Oh My Zsh</li>
                <li>• Powerlevel10k theme</li>
                <li>• Homebrew package manager</li>
                <li>• Node.js via nvm</li>
                <li>• Git with custom aliases</li>
                <li>• Docker Desktop</li>
                <li>• PostgreSQL via Homebrew</li>
                <li>• Redis for caching</li>
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
