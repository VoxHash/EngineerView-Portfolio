"use client";
import Link from "next/link";
import { SITE } from "@/lib/site";
import { usePathname } from "next/navigation";
import { useState } from "react";
import clsx from "clsx";
import ThemeToggle from "./ThemeToggle";
import { Menu, X } from "lucide-react";

const nav = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/feed", label: "Feed" },
  { href: "/speaking", label: "Speaking" },
  { href: "/uses", label: "Uses" },
  { href: "/resume", label: "Resume" },
  { href: "/metrics", label: "Metrics" },
  { href: "/contact", label: "Contact" }
];

export default function Header(){
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-950/70 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="font-bold tracking-tight text-xl">
          Vox<span className="text-brand">Hash</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {nav.map(item => (
            <Link 
              key={item.href} 
              href={item.href} 
              className={clsx(
                "hover:text-brand transition-colors duration-200",
                pathname === item.href && "text-brand"
              )}
            >
              {item.label}
            </Link>
          ))}
          <a 
            href={`https://github.com/${SITE.githubUser}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="badge hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
          >
            GitHub
          </a>
          <ThemeToggle />
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button 
            className="badge p-2" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <div className={clsx(
        "md:hidden mobile-drawer fixed top-16 right-0 h-screen w-80 bg-white dark:bg-neutral-900 border-l border-neutral-200 dark:border-neutral-800 shadow-xl z-50",
        mobileMenuOpen && "open"
      )}>
        <nav className="flex flex-col p-6 space-y-4">
          {nav.map(item => (
            <Link 
              key={item.href} 
              href={item.href} 
              className={clsx(
                "text-lg py-2 px-4 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-200",
                pathname === item.href && "text-brand bg-neutral-100 dark:bg-neutral-800"
              )}
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <a 
            href={`https://github.com/${SITE.githubUser}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="badge text-center mt-4 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            GitHub
          </a>
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </header>
  );
}
