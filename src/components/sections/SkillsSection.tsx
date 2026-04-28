import { motion } from "framer-motion";
import { skillGroups } from "@/data/skills";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function SkillsSection() {
  return (
    <section id="skills" className="section-padding">
      <div className="shell-container space-y-6">
        <SectionHeading
          eyebrow="Skills"
          title="Stack."
        />

        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {skillGroups.map((group, index) => (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: index * 0.05 }}
            >
              <GlassPanel className="h-full p-5">
                <p className="section-lead">{group.title}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span key={skill} className="chip rounded-xl px-3 py-2 normal-case tracking-normal">
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
