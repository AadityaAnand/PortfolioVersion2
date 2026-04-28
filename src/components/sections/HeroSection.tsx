import { motion } from "framer-motion";
import { Bot, BookText, FolderKanban, Mail } from "lucide-react";
import { heroActions, heroSignals } from "@/data/site";
import { GlassPanel } from "@/components/ui/GlassPanel";

type HeroSectionProps = {
  onAskAssistant: () => void;
};

export function HeroSection({ onAskAssistant }: HeroSectionProps) {
  return (
    <section className="section-padding" id="home">
      <div className="shell-container">
        <div className="grid items-center gap-7 lg:grid-cols-[1.1fr,0.9fr]">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="space-y-5"
          >
            <div className="space-y-3">
              <div className="space-y-2">
                <p className="section-lead">Aditya Anand</p>
                <h1 className="max-w-4xl font-display text-4xl leading-[1.02] text-white md:text-[4.25rem] xl:text-[4.9rem]">
                  Software Engineer
                </h1>
              </div>
              <div className="space-y-2.5">
                <p className="max-w-3xl font-display text-xl leading-tight text-white md:text-[1.75rem]">
                  I build AI-powered systems, backend platforms, and forward-deployed solutions.
                </p>
                <p className="max-w-xl text-[13px] leading-6 text-white/52 md:text-sm">
                  From unclear problem to shipped product.
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
                    className="action-link"
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    {action.label}
                  </a>
                );
              })}
            </div>

            <div className="flex flex-wrap gap-2">
              {heroSignals.map((signal, index) => (
                <motion.div
                  key={signal.label}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.12 + index * 0.08 }}
                >
                  <div className="chip gap-2.5 rounded-xl px-3 py-2 normal-case tracking-normal text-white/70">
                    <span className="text-[10px] uppercase tracking-[0.16em] text-white/40">{signal.label}</span>
                    <span className="text-[13px] text-white/82">{signal.value}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08 }}
          >
            <GlassPanel className="relative overflow-hidden p-3.5">
              <div className="mb-3 flex flex-wrap gap-2">
                <button type="button" onClick={onAskAssistant} className="chip rounded-xl px-3 py-2 normal-case tracking-normal text-white/72">
                  <Bot className="h-3.5 w-3.5" />
                  Ask AI
                </button>
                <a href="#projects" className="chip rounded-xl px-3 py-2 normal-case tracking-normal text-white/72">
                  <FolderKanban className="h-3.5 w-3.5" />
                  Projects
                </a>
              </div>
              <div className="overflow-hidden rounded-[22px] border border-white/10 bg-slate">
                <img
                  src={`${import.meta.env.BASE_URL}assets/profile.jpg`}
                  alt="Aditya Anand portrait"
                  className="h-[420px] w-full object-cover object-center opacity-92 mask-fade"
                />
              </div>
              <div className="mt-3 flex items-center justify-between rounded-[18px] border border-white/10 bg-white/[0.04] px-4 py-3 text-xs uppercase tracking-[0.18em] text-white/42">
                <span>AI</span>
                <span>Systems</span>
                <span>Product</span>
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
    case "Ask AI":
      return Bot;
    case "Projects":
      return FolderKanban;
    case "Thoughts":
      return BookText;
    default:
      return Mail;
  }
}
