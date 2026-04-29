import type { PropsWithChildren } from "react";
import { TopNav } from "@/components/layout/TopNav";
import type { NavItem } from "@/types/portfolio";
import { homeNavItems } from "@/data/site";

type SiteShellProps = PropsWithChildren<{
  brandHref?: string;
  assistantHref?: string;
  navItems?: NavItem[];
}>;

export function SiteShell({
  children,
  brandHref,
  assistantHref,
  navItems = homeNavItems,
}: SiteShellProps) {
  return (
    <div id="top" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(circle_at_top,rgba(140,246,218,0.15),transparent_42%),radial-gradient(circle_at_top_right,rgba(122,166,255,0.18),transparent_34%)]" />
      <TopNav brandHref={brandHref} assistantHref={assistantHref} navItems={navItems} />
      <main>{children}</main>
      <footer className="pb-8 pt-2">
        <div className="shell-container">
          <div className="flex items-center justify-between border-t border-white/8 px-1 pt-4 text-xs uppercase tracking-[0.18em] text-white/35">
            <span>Aditya Anand</span>
            <span>React · Vite · TypeScript</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
