import "./globals.css";
import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import Analytics from "@/components/Analytics";
import StructuredData from "@/components/StructuredData";
import ErrorBoundary from "@/components/ErrorBoundary";
import SkipLink from "@/components/SkipLink";
import WebVitals from "@/components/WebVitals";
import ConsentBanner from "@/components/ConsentBanner";

export const metadata: Metadata = generateSEOMetadata({
  title: SITE.name,
  description: SITE.description,
  keywords: SITE.keywords,
  image: "/og.png",
  url: SITE.url,
  type: "website",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
      </head>
      <body>
        <StructuredData type="website" />
        <StructuredData type="organization" />
        <StructuredData type="person" />
        <ErrorBoundary>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <SkipLink />
            <WebVitals />
            <Analytics />
            <Header/>
            <main id="main-content" className="container" role="main">{children}</main>
            <Footer/>
            <ConsentBanner />
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
