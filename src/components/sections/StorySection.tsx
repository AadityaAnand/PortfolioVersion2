import { motion } from "framer-motion";
import { Compass, Layers3, ShieldCheck } from "lucide-react";
import { storyIntro, storyPillars } from "@/data/site";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { SectionHeading } from "@/components/ui/SectionHeading";

const icons = [Compass, Layers3, ShieldCheck];

export function StorySection() {
  return (
    <section id="story" className="section-padding">
      <div className="shell-container grid gap-8 lg:grid-cols-[0.92fr,1.08fr]">
        <div className="space-y-6">
          <SectionHeading
            eyebrow="About / Story"
            title="I like the part where the problem is still unclear."
            copy={storyIntro}
          />
          <GlassPanel className="space-y-4 p-6">
            <p className="section-lead">How I operate</p>
            <p className="text-base leading-7 text-white/70">
              I am happiest on work that starts with context gathering, tradeoff discovery, and a system that needs to become both useful and trustworthy.
            </p>
          </GlassPanel>
        </div>

        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-1">
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
                <GlassPanel className="h-full p-6">
                  <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] text-accent">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-2xl text-white">{pillar.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-white/68">{pillar.body}</p>
                </GlassPanel>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
