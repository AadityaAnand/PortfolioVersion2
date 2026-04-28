import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { experiences } from "@/data/experience";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function ExperienceSection() {
  return (
    <section id="experience" className="section-padding">
      <div className="shell-container space-y-8">
        <SectionHeading eyebrow="Experience" title="Selected work." />

        <div className="grid gap-5">
          {experiences.map((experience, index) => (
            <motion.div
              key={experience.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.48, delay: index * 0.06 }}
            >
              <GlassPanel className="p-5 md:p-6">
                <div className="grid gap-5 lg:grid-cols-[220px,1fr]">
                  <div className="space-y-3">
                    <p className="section-lead">{experience.period}</p>
                    <div className="space-y-1">
                      <p className="text-sm text-white/78">{experience.company}</p>
                      <p className="text-sm text-white/42">{experience.location}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                      <div className="space-y-2">
                        <h3 className="font-display text-xl text-white md:text-2xl">{experience.role}</h3>
                        <p className="max-w-3xl text-sm leading-6 text-white/70">{experience.summary}</p>
                      </div>

                      <div className="flex flex-wrap gap-2 xl:max-w-sm xl:justify-end">
                        {experience.stack.map((item) => (
                          <span key={item} className="chip normal-case tracking-normal">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>

                    <details className="group rounded-[20px] border border-white/10 bg-black/20 px-4 py-4">
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm text-white/70">
                        <span>Read notes</span>
                        <ChevronDown className="h-4 w-4 transition group-open:rotate-180" />
                      </summary>
                      <div className="mt-5 grid gap-4 text-sm leading-7 text-white/70 md:grid-cols-2">
                        <StoryBlock label="Context" body={experience.context} />
                        <StoryBlock label="Challenge" body={experience.challenge} />
                        <StoryBlock label="Action" body={experience.action} />
                        <StoryBlock label="Thinking" body={experience.thinking} />
                        <StoryBlock label="Outcome" body={experience.outcome} className="md:col-span-2" />
                      </div>
                    </details>
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

function StoryBlock({ label, body, className = "" }: { label: string; body: string; className?: string }) {
  return (
    <div className={className}>
      <p className="mb-2 text-xs uppercase tracking-[0.22em] text-white/40">{label}</p>
      <p>{body}</p>
    </div>
  );
}
