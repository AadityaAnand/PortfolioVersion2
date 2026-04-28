import { motion } from "framer-motion";
import { ArrowUpRight, Download } from "lucide-react";
import { contactLinks, footerNote } from "@/data/site";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function ContactSection() {
  return (
    <section id="contact" className="section-padding">
      <div className="shell-container space-y-8">
        <SectionHeading
          eyebrow="Contact"
          title="Warm, direct, and easy to act on."
          copy={footerNote}
        />

        <GlassPanel className="grid gap-6 p-6 md:grid-cols-[0.95fr,1.05fr] md:p-8">
          <div className="space-y-4">
            <p className="section-lead">Open to conversations</p>
            <h3 className="font-display text-3xl text-white md:text-4xl">
              If you are building AI products, internal platforms, or systems that need someone who can move between code, product, and users, I'd love to connect.
            </h3>
            <div className="flex flex-wrap gap-3 pt-3">
              <a href={`${import.meta.env.BASE_URL}assets/Aaditya-Anand-Resume.pdf`} className="action-link action-link-primary">
                <Download className="mr-2 h-4 w-4" />
                Download resume
              </a>
              <a href="mailto:aadityaanand.tech@gmail.com" className="action-link">
                Say hello
              </a>
            </div>
          </div>

          <div className="grid gap-3">
            {contactLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                whileHover={{ y: -2 }}
                className="rounded-[24px] border border-white/10 bg-white/[0.05] px-5 py-4 transition hover:border-white/20"
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
