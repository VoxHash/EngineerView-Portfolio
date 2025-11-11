"use client";

export default function SocialRow(){
  // Use NEXT_PUBLIC_ env vars for client-side access to avoid hydration mismatches
  // Fallback to defaults if env vars are not set
  const socialHandle = process.env.NEXT_PUBLIC_SOCIAL_HANDLE || "voxhash";
  const githubUsername = process.env.NEXT_PUBLIC_GITHUB_USERNAME || "VoxHash";
  const linkedinUsername = process.env.NEXT_PUBLIC_LINKEDIN_USERNAME || "voxhash";

  const socials = [
    { name: "YouTube", url: `https://youtube.com/@${socialHandle}` },
    { name: "Instagram/Threads", url: `https://instagram.com/${socialHandle}` },
    { name: "TikTok", url: `https://tiktok.com/@${socialHandle}` },
    { name: "X", url: `https://x.com/${socialHandle}` },
    { name: "Facebook", url: `https://facebook.com/${socialHandle}` },
    { name: "BlueSky", url: `https://bsky.app/profile/${socialHandle}.bsky.social` },
    { name: "GitHub", url: `https://github.com/${githubUsername}` },
    { name: "Reddit", url: `https://reddit.com/u/${socialHandle}` },
    { name: "LinkedIn", url: `https://linkedin.com/in/${linkedinUsername}` },
    { name: "Telegram", url: `https://t.me/${socialHandle}` }
  ];

  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {socials.map(s => (
        <a key={s.name} className="badge hover:border-brand hover:text-brand" href={s.url} target="_blank" rel="noopener noreferrer">{s.name}</a>
      ))}
    </div>
  );
}
