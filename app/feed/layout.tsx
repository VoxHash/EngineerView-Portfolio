import type { Metadata } from "next";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";

export const metadata: Metadata = generateSEOMetadata({
  title: "Feed",
  description: "Latest posts and discussions from my Reddit activity. Sharing thoughts on technology, development, and community discussions.",
  keywords: ["reddit", "feed", "posts", "discussions", "community", "technology"],
  url: "/feed",
  image: "/og.png",
});

export default function FeedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

