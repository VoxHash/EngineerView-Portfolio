import { fetchTopRepos } from "@/lib/github";
import { SITE } from "@/lib/site";
import ProjectGrid from "@/components/ProjectGrid";

export const revalidate = 3600;

export default async function ProjectsPage(){
  const repos = await fetchTopRepos(SITE.githubUser, 30);
  return (
    <section className="py-10">
      <h1 className="text-3xl font-bold mb-6">Projects</h1>
      <p className="text-neutral-300 mb-6">Auto‑pulled from GitHub/{SITE.githubUser}. Star‑sorted, then recency.</p>
      <ProjectGrid repos={repos} />
    </section>
  );
}
