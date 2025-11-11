"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { 
  Code, 
  Database, 
  Brain, 
  Server, 
  Palette, 
  Smartphone,
  Cloud,
  Shield,
  Zap,
  GitBranch
} from "lucide-react";

interface Skill {
  name: string;
  level: number; // 1-5
  category: string;
  icon: React.ReactNode;
  description: string;
}

interface SkillCategory {
  name: string;
  icon: React.ReactNode;
  color: string;
  skills: Skill[];
}

const skillCategories: SkillCategory[] = [
  {
    name: "Frontend",
    icon: <Code className="h-6 w-6" />,
    color: "from-blue-500 to-cyan-500",
    skills: [
      { name: "React", level: 5, category: "Frontend", icon: <Code className="h-4 w-4" />, description: "Advanced React patterns, hooks, and performance optimization" },
      { name: "Next.js", level: 5, category: "Frontend", icon: <Code className="h-4 w-4" />, description: "Full-stack React framework with SSR/SSG" },
      { name: "TypeScript", level: 5, category: "Frontend", icon: <Code className="h-4 w-4" />, description: "Type-safe JavaScript development" },
      { name: "Tailwind CSS", level: 4, category: "Frontend", icon: <Code className="h-4 w-4" />, description: "Utility-first CSS framework" },
      { name: "Framer Motion", level: 4, category: "Frontend", icon: <Code className="h-4 w-4" />, description: "Animation library for React" },
      { name: "Vue.js", level: 3, category: "Frontend", icon: <Code className="h-4 w-4" />, description: "Progressive JavaScript framework" }
    ]
  },
  {
    name: "Backend",
    icon: <Server className="h-6 w-6" />,
    color: "from-green-500 to-emerald-500",
    skills: [
      { name: "Node.js", level: 5, category: "Backend", icon: <Server className="h-4 w-4" />, description: "JavaScript runtime for server-side development" },
      { name: "Python", level: 4, category: "Backend", icon: <Server className="h-4 w-4" />, description: "FastAPI, Django, Flask for web APIs" },
      { name: "Go", level: 3, category: "Backend", icon: <Server className="h-4 w-4" />, description: "High-performance systems programming" },
      { name: "Rust", level: 2, category: "Backend", icon: <Server className="h-4 w-4" />, description: "Memory-safe systems programming" },
      { name: "GraphQL", level: 4, category: "Backend", icon: <Server className="h-4 w-4" />, description: "Query language for APIs" },
      { name: "REST APIs", level: 5, category: "Backend", icon: <Server className="h-4 w-4" />, description: "RESTful API design and implementation" }
    ]
  },
  {
    name: "AI/ML",
    icon: <Brain className="h-6 w-6" />,
    color: "from-purple-500 to-pink-500",
    skills: [
      { name: "OpenAI API", level: 4, category: "AI/ML", icon: <Brain className="h-4 w-4" />, description: "GPT models integration and fine-tuning" },
      { name: "TensorFlow", level: 3, category: "AI/ML", icon: <Brain className="h-4 w-4" />, description: "Machine learning framework" },
      { name: "PyTorch", level: 3, category: "AI/ML", icon: <Brain className="h-4 w-4" />, description: "Deep learning research framework" },
      { name: "LangChain", level: 4, category: "AI/ML", icon: <Brain className="h-4 w-4" />, description: "LLM application development" },
      { name: "Vector Databases", level: 3, category: "AI/ML", icon: <Brain className="h-4 w-4" />, description: "Pinecone, Weaviate for embeddings" },
      { name: "Prompt Engineering", level: 4, category: "AI/ML", icon: <Brain className="h-4 w-4" />, description: "Designing effective AI prompts" }
    ]
  },
  {
    name: "Infrastructure",
    icon: <Cloud className="h-6 w-6" />,
    color: "from-orange-500 to-red-500",
    skills: [
      { name: "AWS", level: 4, category: "Infrastructure", icon: <Cloud className="h-4 w-4" />, description: "Amazon Web Services cloud platform" },
      { name: "Docker", level: 5, category: "Infrastructure", icon: <Cloud className="h-4 w-4" />, description: "Containerization and orchestration" },
      { name: "Kubernetes", level: 3, category: "Infrastructure", icon: <Cloud className="h-4 w-4" />, description: "Container orchestration platform" },
      { name: "Terraform", level: 3, category: "Infrastructure", icon: <Cloud className="h-4 w-4" />, description: "Infrastructure as code" },
      { name: "Vercel", level: 5, category: "Infrastructure", icon: <Cloud className="h-4 w-4" />, description: "Frontend cloud platform" },
      { name: "CI/CD", level: 4, category: "Infrastructure", icon: <Cloud className="h-4 w-4" />, description: "GitHub Actions, GitLab CI" }
    ]
  },
  {
    name: "Database",
    icon: <Database className="h-6 w-6" />,
    color: "from-yellow-500 to-orange-500",
    skills: [
      { name: "PostgreSQL", level: 5, category: "Database", icon: <Database className="h-4 w-4" />, description: "Advanced relational database" },
      { name: "MongoDB", level: 4, category: "Database", icon: <Database className="h-4 w-4" />, description: "NoSQL document database" },
      { name: "Redis", level: 4, category: "Database", icon: <Database className="h-4 w-4" />, description: "In-memory data structure store" },
      { name: "Prisma", level: 5, category: "Database", icon: <Database className="h-4 w-4" />, description: "Database ORM and query builder" },
      { name: "Supabase", level: 4, category: "Database", icon: <Database className="h-4 w-4" />, description: "Open source Firebase alternative" },
      { name: "PlanetScale", level: 3, category: "Database", icon: <Database className="h-4 w-4" />, description: "Serverless MySQL platform" }
    ]
  },
  {
    name: "Design",
    icon: <Palette className="h-6 w-6" />,
    color: "from-pink-500 to-rose-500",
    skills: [
      { name: "Figma", level: 4, category: "Design", icon: <Palette className="h-4 w-4" />, description: "Collaborative design tool" },
      { name: "Adobe Creative Suite", level: 3, category: "Design", icon: <Palette className="h-4 w-4" />, description: "Photoshop, Illustrator, After Effects" },
      { name: "UI/UX Design", level: 4, category: "Design", icon: <Palette className="h-4 w-4" />, description: "User interface and experience design" },
      { name: "Design Systems", level: 4, category: "Design", icon: <Palette className="h-4 w-4" />, description: "Component libraries and design tokens" },
      { name: "Prototyping", level: 3, category: "Design", icon: <Palette className="h-4 w-4" />, description: "Interactive prototypes and user testing" }
    ]
  }
];

const getLevelColor = (level: number) => {
  if (level >= 5) return "bg-green-500";
  if (level >= 4) return "bg-blue-500";
  if (level >= 3) return "bg-yellow-500";
  if (level >= 2) return "bg-orange-500";
  return "bg-gray-400";
};

const getLevelText = (level: number) => {
  if (level >= 5) return "Expert";
  if (level >= 4) return "Advanced";
  if (level >= 3) return "Intermediate";
  if (level >= 2) return "Beginner";
  return "Learning";
};

export default function SkillsMatrix() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <div ref={ref} className="space-y-12">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold mb-4">Skills Matrix</h2>
        <p className="text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
          A comprehensive overview of my technical skills across different domains. 
          Continuously learning and expanding expertise in emerging technologies.
        </p>
      </motion.div>

      <div className="space-y-8">
        {skillCategories.map((category, categoryIndex) => (
          <motion.div
            key={category.name}
            className="card p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: categoryIndex * 0.1, duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className={`p-3 rounded-lg bg-gradient-to-r ${category.color} text-white`}>
                {category.icon}
              </div>
              <h3 className="text-2xl font-semibold">{category.name}</h3>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.skills.map((skill, skillIndex) => (
                <motion.div
                  key={skill.name}
                  className="p-4 rounded-lg border border-neutral-200 dark:border-neutral-700 hover:border-brand/50 transition-colors duration-200"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                  transition={{ 
                    delay: (categoryIndex * 0.1) + (skillIndex * 0.05), 
                    duration: 0.4 
                  }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="text-brand">
                        {skill.icon}
                      </div>
                      <span className="font-medium">{skill.name}</span>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(skill.level)} text-white`}>
                      {getLevelText(skill.level)}
                    </span>
                  </div>

                  <p className="text-sm text-neutral-600 dark:text-neutral-300 mb-3">
                    {skill.description}
                  </p>

                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={`h-2 flex-1 rounded-full ${
                          i < skill.level 
                            ? getLevelColor(skill.level) 
                            : 'bg-neutral-200 dark:bg-neutral-700'
                        }`}
                      />
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Learning Goals */}
      <motion.div
        className="card p-8 bg-gradient-to-r from-brand/10 to-brand-light/10 border-brand/20"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <h3 className="text-2xl font-semibold mb-6 text-center">Currently Learning</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="text-center">
            <h4 className="text-lg font-medium mb-3 text-brand">Short Term</h4>
            <ul className="space-y-2 text-neutral-600 dark:text-neutral-300">
              <li>• WebAssembly (WASM) for performance-critical applications</li>
              <li>• Advanced Kubernetes patterns and operators</li>
              <li>• Rust for systems programming and performance</li>
              <li>• Advanced AI/ML model fine-tuning techniques</li>
            </ul>
          </div>
          <div className="text-center">
            <h4 className="text-lg font-medium mb-3 text-brand">Long Term</h4>
            <ul className="space-y-2 text-neutral-600 dark:text-neutral-300">
              <li>• Quantum computing fundamentals</li>
              <li>• Advanced distributed systems architecture</li>
              <li>• Computer vision and image processing</li>
              <li>• Blockchain and Web3 development</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
