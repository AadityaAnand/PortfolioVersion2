import { motion } from "framer-motion";
import { ArrowRight, Bot, BookText, FolderKanban, Mail } from "lucide-react";
import { heroActions, heroSignals } from "@/data/site";
import { GlassPanel } from "@/components/ui/GlassPanel";

type HeroSectionProps = {
  onAskAssistant: () => void;
};

export function HeroSection({ onAskAssistant }: HeroSectionProps) {
  return (
    <section className="section-padding" id="home">
      <div className="shell-container">
        <div className="grid items-center gap-8 lg:grid-cols-[1.1fr,0.9fr]">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="space-y-8"
          >
            <div className="space-y-5">
              <span className="chip">Forward Deployed Engineer · AI Engineer · Full Stack / Backend Systems</span>
              <div className="space-y-4">
                <h1 className="max-w-5xl font-display text-4xl leading-[1.05] text-white md:text-6xl xl:text-7xl">
                  I build AI-powered systems, backend platforms, and forward-deployed solutions that turn ambiguous problems into working products.
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-white/68 md:text-xl">
                  Aaditya Anand. Practical builder. Product-minded engineer. Most comfortable where users, AI workflows, and systems design all show up in the same room.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              {heroActions.map((action) => {
                const Icon = getActionIcon(action.label);

                if (action.type === "assistant") {
                  return (
                    <button
                      key={action.label}
                      type="button"
                      onClick={onAskAssistant}
                      className="action-link action-link-primary"
                    >
                      <Icon className="mr-2 h-4 w-4" />
                      {action.label}
                    </button>
                  );
                }

                return (
                  <a
                    key={action.label}
                    href={action.href}
                    className={action.label === "View Projects" ? "action-link action-link-primary" : "action-link"}
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    {action.label}
                  </a>
                );
              })}
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              {heroSignals.map((signal, index) => (
                <motion.div
                  key={signal.label}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.12 + index * 0.08 }}
                >
                  <GlassPanel className="h-full px-5 py-4">
                    <p className="text-xs uppercase tracking-[0.24em] text-white/45">{signal.label}</p>
                    <p className="mt-2 text-base leading-7 text-white/80">{signal.value}</p>
                  </GlassPanel>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08 }}
          >
            <GlassPanel className="relative overflow-hidden p-4">
              <div className="absolute inset-x-6 top-6 flex items-center justify-between text-xs uppercase tracking-[0.22em] text-white/45">
                <span>Interactive portfolio surface</span>
                <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-2 text-accent">
                  Shipping oriented
                </span>
              </div>
              <div className="overflow-hidden rounded-[24px] border border-white/10 bg-slate pt-14">
                <img
                  src={`${import.meta.env.BASE_URL}assets/profile.jpg`}
                  alt="Aaditya Anand portrait"
                  className="h-[520px] w-full object-cover object-center opacity-92 mask-fade"
                />
              </div>
              <div className="mt-4 flex items-center justify-between rounded-[24px] border border-white/10 bg-white/[0.04] px-5 py-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-white/40">Current lens</p>
                  <p className="mt-2 max-w-xs text-sm leading-7 text-white/72">
                    AI products, customer-adjacent engineering, and backend systems that stay legible under pressure.
                  </p>
                </div>
                <ArrowRight className="h-5 w-5 text-accent" />
              </div>
            </GlassPanel>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function getActionIcon(label: string) {
  switch (label) {
    case "Ask AI About Me":
      return Bot;
    case "View Projects":
      return FolderKanban;
    case "Read My Thoughts":
      return BookText;
    default:
      return Mail;
  }
}
