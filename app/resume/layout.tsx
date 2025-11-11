import type { Metadata } from "next";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";

export const metadata: Metadata = generateSEOMetadata({
  title: "Resume",
  description: "Download my professional resume and learn about my experience, skills, and achievements in software engineering and AI development.",
  keywords: ["resume", "CV", "experience", "skills", "career", "professional"],
  url: "/resume",
  image: "/og.png",
});

export default function ResumeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

