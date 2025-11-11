import type { Metadata } from "next";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";

export const metadata: Metadata = generateSEOMetadata({
  title: "Uses",
  description: "Discover the tools, hardware, software, and development setup I use to build amazing products. From my development environment to productivity tools.",
  keywords: ["uses", "tools", "hardware", "software", "development setup", "productivity", "tech stack"],
  url: "/uses",
  image: "/og.png",
});

export default function UsesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

