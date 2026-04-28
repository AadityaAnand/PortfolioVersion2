import { lazy, Suspense, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { thoughtPosts } from "@/data/posts";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassPanel } from "@/components/ui/GlassPanel";
import type { ThoughtPost } from "@/types/thoughts";
import { formatDate } from "@/lib/utils";

const ThoughtReader = lazy(async () => {
  const module = await import("@/components/thoughts/ThoughtReader");
  return { default: module.ThoughtReader };
});

export function ThoughtsSection() {
  const [activePost, setActivePost] = useState<ThoughtPost | null>(null);

  return (
    <section id="thoughts" className="section-padding">
      <div className="shell-container space-y-10">
        <SectionHeading
          eyebrow="Thoughts / Field Notes"
          title="Short essays from the edge of product, AI, and systems work."
          copy="These notes are meant to feel like dispatches from actual engineering work: what I am noticing, what I am learning, and how I think about building."
        />

        <div className="grid gap-5 xl:grid-cols-[1.15fr,0.85fr]">
          {thoughtPosts.slice(0, 1).map((post) => (
            <motion.button
              key={post.id}
              type="button"
              onClick={() => setActivePost(post)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45 }}
              className="text-left"
            >
              <GlassPanel className="h-full p-6 md:p-8">
                <div className="flex flex-wrap items-center gap-3 text-sm text-white/45">
                  <span>{post.category}</span>
                  <span>•</span>
                  <span>{formatDate(post.date)}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="mt-5 font-display text-3xl text-white md:text-4xl">{post.title}</h3>
                <p className="mt-4 max-w-2xl text-base leading-7 text-white/68">{post.excerpt}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span key={tag} className="chip normal-case tracking-normal">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-8 inline-flex items-center text-sm text-accent">
                  Open field note
                  <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </GlassPanel>
            </motion.button>
          ))}

          <div className="grid gap-5">
            {thoughtPosts.slice(1).map((post, index) => (
              <motion.button
                key={post.id}
                type="button"
                onClick={() => setActivePost(post)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.45, delay: index * 0.05 }}
                className="text-left"
              >
                <GlassPanel className="h-full p-6">
                  <div className="flex flex-wrap items-center gap-3 text-sm text-white/45">
                    <span>{post.category}</span>
                    <span>•</span>
                    <span>{formatDate(post.date)}</span>
                  </div>
                  <h3 className="mt-4 font-display text-2xl text-white">{post.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-white/65">{post.excerpt}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span key={tag} className="chip normal-case tracking-normal">
                        {tag}
                      </span>
                    ))}
                  </div>
                </GlassPanel>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {activePost ? (
          <Suspense fallback={null}>
            <ThoughtReader post={activePost} onClose={() => setActivePost(null)} />
          </Suspense>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
