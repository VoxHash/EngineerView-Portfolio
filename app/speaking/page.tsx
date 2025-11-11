import { Calendar, ExternalLink, Video as VideoIcon, Youtube, Twitch, Eye, Clock } from "lucide-react";
import { format } from "date-fns";
import { fetchAllVideos, type Video } from "@/lib/videos";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = generateSEOMetadata({
  title: "Speaking & Media",
  description: "Watch my latest videos, streams, and speaking engagements on YouTube, Twitch, and other platforms.",
  keywords: ["speaking", "videos", "youtube", "twitch", "streaming", "talks", "presentations"],
  url: "/speaking",
  image: "/og.png",
  type: "website",
});

const getPlatformIcon = (platform: Video['platform']) => {
  switch (platform) {
    case 'youtube':
      return <Youtube className="h-5 w-5" />;
    case 'twitch':
      return <Twitch className="h-5 w-5" />;
    case 'kick':
      return <VideoIcon className="h-5 w-5" />;
    case 'vimeo':
      return <VideoIcon className="h-5 w-5" />;
    default:
      return <VideoIcon className="h-5 w-5" />;
  }
};

const getPlatformColor = (platform: Video['platform']) => {
  switch (platform) {
    case 'youtube':
      return 'bg-red-500';
    case 'twitch':
      return 'bg-purple-500';
    case 'kick':
      return 'bg-green-500';
    default:
      return 'bg-gray-500';
  }
};

const getPlatformName = (platform: Video['platform']) => {
  switch (platform) {
    case 'youtube':
      return 'YouTube';
    case 'twitch':
      return 'Twitch';
    case 'kick':
      return 'Kick';
    case 'vimeo':
      return 'Vimeo';
    default:
      return 'Video';
  }
};

export default async function SpeakingPage() {
  const videos = await fetchAllVideos(20);

  return (
    <div className="py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Speaking & <span className="text-brand">Media</span>
        </h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
          Latest videos and streams from YouTube, Twitch, and other platforms. 
          Sharing knowledge through live coding, tutorials, and tech discussions.
        </p>
      </div>

      {videos.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-neutral-600 dark:text-neutral-400 mb-4">
            No videos available at the moment.
          </p>
          <p className="text-sm text-neutral-500 dark:text-neutral-500">
            Make sure to configure your YouTube Channel ID and/or Twitch Channel Name in environment variables.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <article
              key={video.id}
              className="card overflow-hidden hover-glow hover-scale group cursor-pointer"
            >
              <a
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                {/* Thumbnail */}
                <div className="relative w-full aspect-video bg-neutral-200 dark:bg-neutral-800 overflow-hidden">
                  <Image
                    src={video.thumbnail}
                    alt={video.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    loading="lazy"
                    quality={85}
                    placeholder="blur"
                    blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQwIiBoZWlnaHQ9IjM2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZTBlN2ViIi8+PC9zdmc+"
                  />
                  {/* Platform Badge */}
                  <div className="absolute top-2 right-2">
                    <span className={`badge ${getPlatformColor(video.platform)} text-white flex items-center gap-1`}>
                      {getPlatformIcon(video.platform)}
                      {getPlatformName(video.platform)}
                    </span>
                  </div>
                  {/* Duration Badge */}
                  {video.duration && (
                    <div className="absolute bottom-2 right-2">
                      <span className="badge bg-black/70 text-white text-xs flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {video.duration}
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-2 line-clamp-2 group-hover:text-brand transition-colors duration-200">
                    {video.title}
                  </h3>

                  {video.description && (
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4 line-clamp-2">
                      {video.description}
                    </p>
                  )}

                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-xs text-neutral-500 dark:text-neutral-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {format(new Date(video.publishedAt), 'MMM dd, yyyy')}
                    </span>
                    {video.viewCount && (
                      <span className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        {video.viewCount.toLocaleString()} views
                      </span>
                    )}
                  </div>

                  <div className="mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-800">
                    <span className="link text-sm flex items-center gap-1">
                      Watch on {getPlatformName(video.platform)}
                      <ExternalLink className="h-3 w-3" />
                    </span>
                  </div>
                </div>
              </a>
            </article>
          ))}
        </div>
      )}

      <div className="mt-16 text-center">
        <div className="card p-8 bg-gradient-to-r from-brand/10 to-brand-light/10 border-brand/20">
          <h3 className="text-2xl font-semibold mb-4">Interested in Having Me Speak?</h3>
          <p className="text-neutral-600 dark:text-neutral-300 mb-6 max-w-2xl mx-auto">
            I'm always excited to share knowledge and connect with the developer community. 
            Whether it's a conference, podcast, workshop, or webinar, I'd love to hear from you.
          </p>
          <a
            href="/contact"
            className="btn hover-glow"
          >
            Get In Touch
          </a>
        </div>
      </div>
    </div>
  );
}
