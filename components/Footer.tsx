import { SITE } from "@/lib/site";

export default function Footer(){
  return (
    <footer 
      className="border-t border-neutral-200 dark:border-neutral-800 mt-16 py-10"
      role="contentinfo"
    >
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-neutral-400">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <p>© {new Date().getFullYear()} VoxHash Technologies Ltd — All rights reserved.</p>
        </div>
        <nav className="flex flex-wrap gap-4" aria-label="Footer navigation">
          <a 
            className="hover:text-brand transition-colors focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2 rounded" 
            href="/privacy"
          >
            Privacy
          </a>
          <a 
            className="hover:text-brand transition-colors focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2 rounded" 
            href="/terms"
          >
            Terms
          </a>
          <a 
            className="hover:text-brand transition-colors focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2 rounded" 
            href={`mailto:${SITE.email}`}
            aria-label={`Send email to ${SITE.email}`}
          >
            Email
          </a>
          <a 
            className="hover:text-brand transition-colors focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2 rounded" 
            href="https://t.me/voxhash" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="Open Telegram profile in new tab"
          >
            Telegram
          </a>
        </nav>
      </div>
    </footer>
  );
}
