import { motion } from "framer-motion";
import { ArrowUpRight, Bot, ChevronDown } from "lucide-react";
import { projects } from "@/data/projects";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { SectionHeading } from "@/components/ui/SectionHeading";

type ProjectsSectionProps = {
  onAskAssistant: (prompt: string) => void;
};

export function ProjectsSection({ onAskAssistant }: ProjectsSectionProps) {
  return (
    <section id="projects" className="section-padding">
      <div className="shell-container space-y-10">
        <SectionHeading
          eyebrow="Projects"
          title="Case studies, not just screenshots."
          copy="These projects are where product instinct, backend design, and AI-oriented thinking start to overlap."
        />

        <div className="grid gap-5">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.48, delay: index * 0.06 }}
            >
              <GlassPanel className="grid gap-6 p-6 md:grid-cols-[0.9fr,1.1fr] md:p-7">
                <div className="space-y-5">
                  <div className="space-y-3">
                    <p className="section-lead">{project.title}</p>
                    <h3 className="font-display text-3xl text-white">{project.tagline}</h3>
                    <p className="text-sm leading-7 text-white/68">{project.problem}</p>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <p className="mb-2 text-xs uppercase tracking-[0.2em] text-white/40">Why I built it</p>
                      <p className="text-sm leading-7 text-white/72">{project.why}</p>
                    </div>
                    <div>
                      <p className="mb-2 text-xs uppercase tracking-[0.2em] text-white/40">My role</p>
                      <p className="text-sm leading-7 text-white/72">{project.role}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-5">
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((item) => (
                      <span key={item} className="chip normal-case tracking-normal">
                        {item}
                      </span>
                    ))}
                  </div>

                  <details className="group rounded-[24px] border border-white/10 bg-black/20 px-5 py-4">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm text-white/70">
                      <span>Architecture and lessons</span>
                      <ChevronDown className="h-4 w-4 transition group-open:rotate-180" />
                    </summary>
                    <div className="mt-5 space-y-5 text-sm leading-7 text-white/72">
                      <div>
                        <p className="mb-2 text-xs uppercase tracking-[0.2em] text-white/40">Architecture overview</p>
                        <ul className="space-y-2">
                          {project.architecture.map((item) => (
                            <li key={item} className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="mb-2 text-xs uppercase tracking-[0.2em] text-white/40">What I learned</p>
                        <p>{project.learned}</p>
                      </div>
                    </div>
                  </details>

                  <div className="flex flex-wrap gap-3">
                    {project.links.map((link) => (
                      <a key={link.href} href={link.href} className="action-link" target="_blank" rel="noreferrer">
                        {link.label}
                        <ArrowUpRight className="ml-2 h-4 w-4" />
                      </a>
                    ))}
                    <button
                      type="button"
                      onClick={() => onAskAssistant(project.assistantPrompt)}
                      className="action-link"
                    >
                      <Bot className="mr-2 h-4 w-4" />
                      Ask AI about this project
                    </button>
                  </div>
                </div>
              </GlassPanel>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
