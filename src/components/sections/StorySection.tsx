import { motion } from "framer-motion";
import { Compass, Layers3, ShieldCheck } from "lucide-react";
import { storyIntro, storyPillars } from "@/data/site";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { SectionHeading } from "@/components/ui/SectionHeading";

const icons = [Compass, Layers3, ShieldCheck];

export function StorySection() {
  return (
    <section id="story" className="section-padding">
      <div className="shell-container grid gap-6 lg:grid-cols-[0.92fr,1.08fr]">
        <div className="space-y-4">
          <SectionHeading
            eyebrow="About"
            title="I like the part where the problem is still unclear."
            copy={storyIntro}
          />
        </div>

        <div className="grid gap-3 md:grid-cols-3 lg:grid-cols-1">
          {storyPillars.map((pillar, index) => {
            const Icon = icons[index];

            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
            >
                <GlassPanel className="h-full p-4 md:p-5">
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] text-accent">
                    <Icon className="h-4 w-4" />
                  </div>
                  <h3 className="font-display text-lg text-white md:text-xl">{pillar.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/62">{pillar.body}</p>
                </GlassPanel>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
