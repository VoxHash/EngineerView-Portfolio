import { SITE } from "@/lib/site";

const socials = [
  { name: "YouTube", url: "https://youtube.com/@"+(process.env.SOCIAL_HANDLE||"voxhash") },
  { name: "Instagram/Threads", url: "https://instagram.com/"+(process.env.SOCIAL_HANDLE||"voxhash") },
  { name: "TikTok", url: "https://tiktok.com/@"+(process.env.SOCIAL_HANDLE||"voxhash") },
  { name: "X", url: "https://x.com/"+(process.env.SOCIAL_HANDLE||"voxhash") },
  { name: "Facebook", url: "https://facebook.com/"+(process.env.SOCIAL_HANDLE||"voxhash") },
  { name: "BlueSky", url: "https://bsky.app/profile/"+(process.env.SOCIAL_HANDLE||"voxhash")+".bsky.social" },
  { name: "GitHub", url: "https://github.com/"+(process.env.GITHUB_USERNAME||"VoxHash") },
  { name: "Reddit", url: "https://reddit.com/u/"+(process.env.SOCIAL_HANDLE||"voxhash") },
  { name: "LinkedIn", url: "https://linkedin.com/in/"+(process.env.LINKEDIN_USERNAME||"voxhash") },
  { name: "Telegram", url: "https://t.me/"+(process.env.SOCIAL_HANDLE||"voxhash") }
];

export default function SocialRow(){
  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {socials.map(s => (
        <a key={s.name} className="badge hover:border-brand hover:text-brand" href={s.url} target="_blank" rel="noopener noreferrer">{s.name}</a>
      ))}
    </div>
  );
}
