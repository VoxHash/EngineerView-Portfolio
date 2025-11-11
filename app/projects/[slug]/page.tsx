import { notFound } from "next/navigation";
import { fetchTopRepos } from "@/lib/github";
import { SITE } from "@/lib/site";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import Image from "next/image";
import { Star, GitFork, Calendar, ExternalLink, Code, Globe, Book } from "lucide-react";
import Link from "next/link";
import ProjectImageGallery from "@/components/ProjectImageGallery";

interface ProjectDetailPageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 3600;

export async function generateStaticParams() {
  try {
    const repos = await fetchTopRepos(SITE.githubUser, 50);
    return repos.map((repo) => ({
      slug: repo.name,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export async function generateMetadata({ params }: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  
  try {
    const repos = await fetchTopRepos(SITE.githubUser, 100);
    const repo = repos.find(r => r.name === slug);
    
    if (!repo) {
      return generateSEOMetadata({
        title: "Project Not Found",
        description: "The requested project could not be found.",
        url: `/projects/${slug}`,
      });
    }

    return generateSEOMetadata({
      title: repo.name,
      description: repo.description || `Explore ${repo.name} - an open-source project by ${SITE.name}`,
      keywords: [repo.name, repo.language || '', ...(repo.topics || [])],
      url: `/projects/${slug}`,
      image: `/og.png`,
    });
  } catch (error) {
    return generateSEOMetadata({
      title: "Project",
      description: "Project details",
      url: `/projects/${slug}`,
    });
  }
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = await params;
  
  const repos = await fetchTopRepos(SITE.githubUser, 100);
  const repo = repos.find(r => r.name === slug);

  if (!repo) {
    notFound();
  }

  // Mock images - in production, these would come from a database or API
  const projectImages: string[] = [];

  return (
    <article className="py-10 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/projects"
          className="text-brand hover:text-brand-dark transition-colors mb-4 inline-flex items-center gap-2 text-sm focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2 rounded"
        >
          ← Back to Projects
        </Link>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{repo.name}</h1>
        {repo.description && (
          <p className="text-xl text-neutral-600 dark:text-neutral-300 mb-6">
            {repo.description}
          </p>
        )}
      </div>

      {/* Project Image Gallery */}
      {projectImages.length > 0 && (
        <div className="mb-8">
          <ProjectImageGallery images={projectImages} projectName={repo.name} />
        </div>
      )}

      {/* Stats and Info */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="card p-6">
          <h2 className="text-lg font-semibold mb-4">Project Statistics</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-neutral-600 dark:text-neutral-300">
                <Star className="h-5 w-5 text-yellow-500" aria-hidden="true" />
                Stars
              </span>
              <span className="font-semibold">{repo.stargazers_count.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-neutral-600 dark:text-neutral-300">
                <GitFork className="h-5 w-5 text-blue-500" aria-hidden="true" />
                Forks
              </span>
              <span className="font-semibold">{repo.forks_count.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-neutral-600 dark:text-neutral-300">
                <Calendar className="h-5 w-5 text-green-500" aria-hidden="true" />
                Last Updated
              </span>
              <time dateTime={repo.pushed_at} className="font-semibold">
                {new Date(repo.pushed_at).toLocaleDateString()}
              </time>
            </div>
            {repo.language && (
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-neutral-600 dark:text-neutral-300">
                  <Code className="h-5 w-5 text-brand" aria-hidden="true" />
                  Language
                </span>
                <span className="font-semibold">{repo.language}</span>
              </div>
            )}
          </div>
        </div>

        <div className="card p-6">
          <h2 className="text-lg font-semibold mb-4">Links</h2>
          <div className="space-y-3">
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 bg-neutral-100 dark:bg-neutral-800 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2 group"
            >
              <Globe className="h-5 w-5 text-brand" aria-hidden="true" />
              <div className="flex-1">
                <div className="font-semibold">View on GitHub</div>
                <div className="text-sm text-neutral-500 dark:text-neutral-400">
                  {repo.html_url.replace('https://github.com/', '')}
                </div>
              </div>
              <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>

      {/* Topics */}
      {repo.topics && repo.topics.length > 0 && (
        <div className="card p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4">Topics & Technologies</h2>
          <div className="flex flex-wrap gap-2">
            {repo.topics.map((topic) => (
              <span
                key={topic}
                className="px-3 py-1 bg-brand/10 text-brand rounded-full text-sm border border-brand/20"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Additional Info */}
      <div className="card p-6">
        <h2 className="text-lg font-semibold mb-4">About This Project</h2>
        <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">
          {repo.description || `This is an open-source project by ${SITE.name}. Visit the GitHub repository to learn more about the project, contribute, or report issues.`}
        </p>
        {!repo.description && (
          <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed mt-4">
            This project is actively maintained and welcomes contributions from the community.
          </p>
        )}
      </div>
    </article>
  );
}

