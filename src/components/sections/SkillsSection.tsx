import { motion } from "framer-motion";
import { skillGroups } from "@/data/skills";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function SkillsSection() {
  return (
    <section id="skills" className="section-padding">
      <div className="shell-container space-y-10">
        <SectionHeading
          eyebrow="Skills"
          title="Grouped by how I use them, not how a resume would list them."
          copy="The categories below are less about keywords and more about where I am useful when a product or team needs engineering range."
        />

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {skillGroups.map((group, index) => (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: index * 0.05 }}
            >
              <GlassPanel className="h-full p-6">
                <p className="section-lead">{group.title}</p>
                <p className="mt-3 text-sm leading-7 text-white/68">{group.summary}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span key={skill} className="chip normal-case tracking-normal">
                      {skill}
                    </span>
                  ))}
                </div>
              </GlassPanel>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
