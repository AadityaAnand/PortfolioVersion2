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
      <div className="shell-container space-y-8">
        <SectionHeading eyebrow="Projects" title="Selected projects." />

        <div className="grid gap-5">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.48, delay: index * 0.06 }}
            >
              <GlassPanel className="grid gap-5 p-5 xl:grid-cols-[1.02fr,0.98fr] md:p-6">
                <div className="space-y-4">
                  <div className="space-y-2.5">
                    <p className="section-lead">{project.title}</p>
                    <h3 className="font-display text-2xl text-white md:text-[2rem]">{project.tagline}</h3>
                    <p className="max-w-2xl text-sm leading-6 text-white/68">{project.problem}</p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((item) => (
                      <span key={item} className="chip normal-case tracking-normal">
                        {item}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2">
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
                      Ask AI
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <details className="group rounded-[20px] border border-white/10 bg-black/20 px-4 py-4">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm text-white/70">
                      <span>Read case details</span>
                      <ChevronDown className="h-4 w-4 transition group-open:rotate-180" />
                    </summary>
                    <div className="mt-5 space-y-5 text-sm leading-7 text-white/72">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <p className="mb-2 text-xs uppercase tracking-[0.2em] text-white/40">Why</p>
                          <p>{project.why}</p>
                        </div>
                        <div>
                          <p className="mb-2 text-xs uppercase tracking-[0.2em] text-white/40">Role</p>
                          <p>{project.role}</p>
                        </div>
                      </div>
                      <div>
                        <p className="mb-2 text-xs uppercase tracking-[0.2em] text-white/40">Architecture overview</p>
                        <ul className="space-y-2">
                          {project.architecture.map((item) => (
                            <li key={item} className="rounded-[18px] border border-white/10 bg-white/[0.04] px-4 py-3">
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
                </div>
              </GlassPanel>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
