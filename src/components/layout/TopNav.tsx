import { Download, Sparkles } from "lucide-react";
import { navItems } from "@/data/site";

export function TopNav() {
  return (
    <header className="sticky top-0 z-50 px-3 py-3 md:px-5">
      <div className="shell-container">
        <div className="glass-panel flex flex-wrap items-center justify-between gap-4 px-4 py-3 md:px-5">
          <a href="#home" className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.08] font-mono text-sm text-accent">
              AA
            </span>
            <div>
              <p className="font-display text-base text-white">Aditya Anand</p>
              <p className="text-xs uppercase tracking-[0.22em] text-white/45">Software Engineer</p>
            </div>
          </a>

          <nav className="flex flex-wrap items-center gap-1.5 text-xs text-white/70 md:text-sm">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-xl px-3 py-2 transition hover:bg-white/[0.06] hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a href="#assistant" className="action-link hidden md:inline-flex">
              <Sparkles className="mr-2 h-4 w-4" />
              Ask AI
            </a>
            <a href={`${import.meta.env.BASE_URL}assets/Aaditya-Anand-Resume.pdf`} className="action-link action-link-primary">
              <Download className="mr-2 h-4 w-4" />
              Resume
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
