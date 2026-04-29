import { lazy, Suspense, useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { thoughtCategories, thoughtPosts } from "@/data/posts";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { getThoughtsContentService } from "@/lib/thoughts-runtime";
import type { ThoughtPost } from "@/types/thoughts";
import {
  formatDate,
  getThoughtIdentifierFromLocation,
  getThoughtPostIdentifier,
  syncThoughtUrl,
} from "@/lib/utils";

const ThoughtReader = lazy(async () => {
  const module = await import("@/components/thoughts/ThoughtReader");
  return { default: module.ThoughtReader };
});

export function ThoughtsSection() {
  const [activePost, setActivePost] = useState<ThoughtPost | null>(null);
  const [posts, setPosts] = useState<ThoughtPost[]>(thoughtPosts);
  const [isLoading, setIsLoading] = useState(true);
  const contentService = useMemo(() => getThoughtsContentService(), []);
  const hasPosts = posts.length > 0;

  const openPost = useCallback((post: ThoughtPost) => {
    setActivePost(post);
    syncThoughtUrl(post);
  }, []);

  const closePost = useCallback(() => {
    setActivePost(null);
    syncThoughtUrl(null);
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function loadPosts() {
      try {
        const nextPosts = await contentService.listPublishedPosts();

        if (!cancelled) {
          setPosts(nextPosts);
        }
      } catch {
        if (!cancelled) {
          setPosts(thoughtPosts);
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    loadPosts();

    return () => {
      cancelled = true;
    };
  }, [contentService]);

  useEffect(() => {
    if (!posts.length) {
      return;
    }

    const thoughtIdentifier = getThoughtIdentifierFromLocation();

    if (!thoughtIdentifier) {
      return;
    }

    const matchingPost = posts.find(
      (post) => getThoughtPostIdentifier(post) === thoughtIdentifier || post.id === thoughtIdentifier,
    );

    if (!matchingPost) {
      return;
    }

    setActivePost((current) => {
      if (current?.id === matchingPost.id) {
        return current;
      }

      syncThoughtUrl(matchingPost);
      return matchingPost;
    });
  }, [posts]);

  return (
    <section id="thoughts" className="section-padding">
      <div className="shell-container space-y-8">
        <SectionHeading eyebrow="Thoughts" title="Field notes." />

        {hasPosts ? (
          <div className="grid gap-5 xl:grid-cols-[1.15fr,0.85fr]">
            {posts.slice(0, 1).map((post) => (
              <motion.button
                key={post.id}
                type="button"
                onClick={() => openPost(post)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.45 }}
                className="text-left"
              >
                <GlassPanel className="h-full p-5 md:p-7">
                  <div className="flex flex-wrap items-center gap-3 text-sm text-white/45">
                    <span>{post.category}</span>
                    <span>•</span>
                    <span>{formatDate(post.date)}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="mt-4 font-display text-2xl text-white md:text-3xl">{post.title}</h3>
                  <p className="mt-3 max-w-2xl text-sm leading-6 text-white/65">{post.excerpt}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span key={tag} className="chip normal-case tracking-normal">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-7 inline-flex items-center text-sm text-accent">
                    Open note
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </GlassPanel>
              </motion.button>
            ))}

            <div className="grid gap-5">
              {posts.slice(1).map((post, index) => (
                <motion.button
                  key={post.id}
                  type="button"
                  onClick={() => openPost(post)}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.45, delay: index * 0.05 }}
                  className="text-left"
                >
                  <GlassPanel className="h-full p-5">
                    <div className="flex flex-wrap items-center gap-3 text-sm text-white/45">
                      <span>{post.category}</span>
                      <span>•</span>
                      <span>{formatDate(post.date)}</span>
                    </div>
                    <h3 className="mt-4 font-display text-xl text-white md:text-2xl">{post.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-white/65">{post.excerpt}</p>
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
        ) : (
          <div className="grid gap-3 xl:grid-cols-[0.9fr,1.1fr]">
            <GlassPanel className="flex h-full flex-col justify-between p-5 md:p-6">
              <div>
                <p className="section-lead">{isLoading ? "Loading thoughts" : "No posts yet"}</p>
                <h3 className="mt-3 font-display text-2xl text-white md:text-3xl">Technical. Life. Fun.</h3>
              </div>
              <p className="mt-6 text-sm text-white/55">{isLoading ? "Pulling published notes." : "Empty for now."}</p>
            </GlassPanel>

            <div className="grid gap-3 md:grid-cols-3">
              {thoughtCategories.map((category, index) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.45, delay: index * 0.05 }}
                >
                  <GlassPanel className="h-full p-5">
                    <p className="section-lead">{category.title}</p>
                    <p className="mt-3 text-sm text-white/66">{category.description}</p>
                    <p className="mt-6 text-xs uppercase tracking-[0.18em] text-white/34">0 notes</p>
                  </GlassPanel>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>

      <AnimatePresence>
        {activePost ? (
          <Suspense fallback={null}>
            <ThoughtReader post={activePost} onClose={closePost} />
          </Suspense>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
