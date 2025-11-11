import type { Metadata } from "next";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";

export const metadata: Metadata = generateSEOMetadata({
  title: "Contact",
  description: "Get in touch with me for collaborations, inquiries, or just to say hello. I'm always open to discussing new projects and opportunities.",
  keywords: ["contact", "get in touch", "collaboration", "inquiry", "email"],
  url: "/contact",
  image: "/og.png",
});

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

