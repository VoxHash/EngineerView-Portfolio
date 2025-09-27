import { Star, GitFork, ExternalLink, Globe } from "lucide-react";

interface PinnedProject {
  id: string;
  name: string;
  description: string;
  url: string;
  language: string;
  stars: number;
  forks: number;
  topics: string[];
  featured: boolean;
  liveUrl: string | null;
}

interface PinnedProjectsProps {
  projects: PinnedProject[];
}

export default function PinnedProjects({ projects }: PinnedProjectsProps) {
  const featuredProjects = projects.filter(p => p.featured);

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Featured Projects</h2>
        <p className="text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
          Curated selection of my most impactful projects, showcasing different technologies and problem-solving approaches.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredProjects.map((project, index) => (
          <div
            key={project.id}
            className="card p-6 hover-glow hover-scale group cursor-pointer"
          >
            <div className="flex items-start justify-between gap-4 mb-4">
              <h3 className="text-lg font-semibold group-hover:text-brand transition-colors duration-200">
                {project.name}
              </h3>
              <span className="badge bg-brand/10 text-brand border-brand/20 group-hover:bg-brand/20 transition-colors duration-200">
                {project.language}
              </span>
            </div>

            <p className="text-sm text-neutral-600 dark:text-neutral-300 mb-4 leading-relaxed min-h-12">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              {project.topics.slice(0, 3).map((topic) => (
                <span 
                  key={topic}
                  className="badge text-xs bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300"
                >
                  {topic}
                </span>
              ))}
              {project.topics.length > 3 && (
                <span className="badge text-xs bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300">
                  +{project.topics.length - 3} more
                </span>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm text-neutral-500 dark:text-neutral-400">
                <span className="flex items-center gap-1">
                  <Star className="h-4 w-4" />
                  {project.stars}
                </span>
                <span className="flex items-center gap-1">
                  <GitFork className="h-4 w-4" />
                  {project.forks}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-200"
                  aria-label="View source code"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-200"
                    aria-label="View live demo"
                  >
                    <Globe className="h-4 w-4" />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center">
        <a
          href="/projects"
          className="btn hover-glow"
        >
          View All Projects
        </a>
      </div>
    </div>
  );
}
