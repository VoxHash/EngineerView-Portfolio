import { SITE } from "@/lib/site";
import VisitorCounter from "./VisitorCounter";

export default function Footer(){
  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-800 mt-16 py-10">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-neutral-400">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <p>© {new Date().getFullYear()} VoxHash — All rights reserved.</p>
          <VisitorCounter />
        </div>
        <div className="flex flex-wrap gap-4">
          <a className="hover:text-brand transition-colors" href="/privacy">Privacy</a>
          <a className="hover:text-brand transition-colors" href="/terms">Terms</a>
          <a className="hover:text-brand transition-colors" href={`mailto:${SITE.email}`}>Email</a>
          <a className="hover:text-brand transition-colors" href="https://t.me/voxhash" target="_blank" rel="noopener noreferrer">Telegram</a>
        </div>
      </div>
    </footer>
  );
}
