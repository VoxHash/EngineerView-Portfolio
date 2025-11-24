import { SITE } from "@/lib/site";
import { fetchPinnedRepos, fetchRecentRepos } from "@/lib/github";
import ProjectGrid from "@/components/ProjectGrid";
import SimpleAnimatedHero from "@/components/SimpleAnimatedHero";
import Testimonials from "@/components/Testimonials";
import GitHubActivity from "@/components/GitHubActivity";
import fs from 'fs';
import path from 'path';

export const revalidate = 3600;

// Function to load pinned projects
async function getPinnedProjects() {
  try {
    const filePath = path.join(process.cwd(), 'data', 'pinned.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.error('Error loading pinned projects:', error);
    return [];
  }
}

// Function to load testimonials
async function getTestimonials() {
  try {
    const filePath = path.join(process.cwd(), 'data', 'testimonials.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.error('Error loading testimonials:', error);
    return [];
  }
}

export default async function Home(){
  const [pinnedRepos, recentRepos, testimonials] = await Promise.all([
    fetchPinnedRepos(SITE.githubUser),
    fetchRecentRepos(SITE.githubUser, 6),
    getTestimonials()
  ]);
  
  return (
    <>
      <SimpleAnimatedHero />

      {/* Featured Projects */}
      <div className="mt-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Featured Projects</h2>
        <p className="text-center text-neutral-600 dark:text-neutral-300 mb-8 max-w-2xl mx-auto">
          My most popular and well-maintained repositories with the highest star counts and best documentation.
        </p>
        <ProjectGrid repos={pinnedRepos} />
      </div>

      {/* Recent GitHub Activity */}
      <div className="mt-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Recent GitHub Activity</h2>
        <p className="text-center text-neutral-600 dark:text-neutral-300 mb-8 max-w-2xl mx-auto">
          My latest commits, pull requests, and updates across all repositories, showing my current development activity.
        </p>
        <div className="mb-8">
          <ProjectGrid repos={recentRepos} />
        </div>
        <div className="mt-8">
          <h3 className="text-2xl font-bold mb-6 text-center">Activity Feed</h3>
          <GitHubActivity limit={5} />
        </div>
      </div>

      <div className="mt-16 card-strong p-8">
        <h3 className="text-2xl font-semibold mb-6 text-center">What I do</h3>
        <div className="grid md:grid-cols-2 gap-6 text-center">
          <div>
            <h4 className="text-lg font-medium mb-3 text-brand">Full-Stack Development</h4>
            <ul className="space-y-2 text-neutral-600 dark:text-neutral-300">
              <li>• Next.js, React, TypeScript</li>
              <li>• Node.js, Python, Go</li>
              <li>• PostgreSQL, MongoDB, Redis</li>
              <li>• AWS, Vercel, Docker</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-medium mb-3 text-brand">AI & Systems</h4>
            <ul className="space-y-2 text-neutral-600 dark:text-neutral-300">
              <li>• AI + data products, prompt pipelines</li>
              <li>• Systems + tooling, CLIs</li>
              <li>• Infrastructure as code</li>
              <li>• Content: tutorials, live builds</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="mt-16">
        <Testimonials testimonials={testimonials} maxItems={3} />
      </div>
    </>
  );
}
