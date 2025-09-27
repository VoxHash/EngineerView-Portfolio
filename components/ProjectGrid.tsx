import RepoCard from "@/components/RepoCard";
import type { Repo } from "@/lib/github";

export default function ProjectGrid({repos}:{repos: Repo[]}){
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {repos.map(r => <RepoCard key={r.id} repo={r} />)}
    </div>
  );
}
