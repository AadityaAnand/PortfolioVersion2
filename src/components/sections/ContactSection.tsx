import { motion } from "framer-motion";
import { ArrowUpRight, Download } from "lucide-react";
import { contactLinks } from "@/data/site";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function ContactSection() {
  return (
    <section id="contact" className="section-padding">
      <div className="shell-container space-y-8">
        <SectionHeading eyebrow="Contact" title="Contact." />

        <GlassPanel className="grid gap-5 p-5 md:grid-cols-[0.85fr,1.15fr] md:p-6">
          <div className="space-y-4">
            <p className="section-lead">Software Engineer</p>
            <h3 className="font-display text-2xl text-white md:text-3xl">
              Open to AI, backend, and platform roles.
            </h3>
            <div className="flex flex-wrap gap-2 pt-1">
              <a href={`${import.meta.env.BASE_URL}assets/Aaditya-Anand-Resume.pdf`} className="action-link action-link-primary">
                <Download className="mr-2 h-4 w-4" />
                Resume
              </a>
              <a href="mailto:aadityaanand.tech@gmail.com" className="action-link">
                Email
              </a>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {contactLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                whileHover={{ y: -2 }}
                className="rounded-[20px] border border-white/10 bg-white/[0.05] px-4 py-4 transition hover:border-white/20"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.22em] text-white/40">{link.label}</p>
                    <p className="mt-2 text-base text-white/80">{link.value}</p>
                  </div>
                  <ArrowUpRight className="h-5 w-5 text-accent" />
                </div>
              </motion.a>
            ))}
          </div>
        </GlassPanel>
      </div>
    </section>
  );
}
