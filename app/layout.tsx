import "./globals.css";
import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import Analytics from "@/components/Analytics";
export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: `${SITE.name} — Portfolio`,
  description: SITE.description,
  keywords: SITE.keywords,
  openGraph: {
    title: `${SITE.name} — Portfolio`,
    description: SITE.description,
    url: SITE.url,
    siteName: SITE.name,
    images: [{ 
      url: "/og.png", 
      width: 1200, 
      height: 630,
      alt: `${SITE.name} Portfolio`
    }],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    site: "@"+SITE.handle,
    creator: "@"+SITE.handle,
    images: ["/og.png"]
  },
  icons: { icon: "/favicon.ico" }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Analytics />
          <Header/>
          <main className="container">{children}</main>
          <Footer/>
        </ThemeProvider>
      </body>
    </html>
  );
}
