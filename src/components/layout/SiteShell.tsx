import type { PropsWithChildren } from "react";
import { footerNote } from "@/data/site";
import { TopNav } from "@/components/layout/TopNav";

export function SiteShell({ children }: PropsWithChildren) {
  return (
    <div id="top" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(circle_at_top,rgba(140,246,218,0.15),transparent_42%),radial-gradient(circle_at_top_right,rgba(122,166,255,0.18),transparent_34%)]" />
      <TopNav />
      <main>{children}</main>
      <footer className="pb-10 pt-6">
        <div className="shell-container">
          <div className="glass-panel flex flex-col gap-6 px-6 py-8 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl space-y-2">
              <p className="section-lead">Built for real conversations</p>
              <p className="text-base leading-7 text-white/65">{footerNote}</p>
            </div>
            <div className="text-sm text-white/50">React · Vite · TypeScript · Tailwind · Framer Motion</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
