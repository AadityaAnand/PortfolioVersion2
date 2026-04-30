import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { Check, Copy, MessageSquare, Share2, ThumbsUp, X } from "lucide-react";
import { getThoughtsInteractionService } from "@/lib/thoughts-runtime";
import { buildThoughtShareUrl, formatDate } from "@/lib/utils";
import type {
  ThoughtComment,
  ThoughtCommentInput,
  ThoughtPost,
  ThoughtReactionSummary,
  ThoughtReactionType,
} from "@/types/thoughts";

const reactionLabels: Record<ThoughtReactionType, string> = {
  useful: "Useful",
  interesting: "Interesting",
  curious: "Curious",
};

const emptyReactions = {
  useful: 0,
  interesting: 0,
  curious: 0,
};

type ThoughtReaderProps = {
  post: ThoughtPost;
  onClose: () => void;
};

export function ThoughtReader({ post, onClose }: ThoughtReaderProps) {
  const service = useMemo(() => getThoughtsInteractionService(), []);
  const [comments, setComments] = useState<ThoughtComment[]>([]);
  const [reactions, setReactions] = useState<ThoughtReactionSummary | null>(null);
  const [author, setAuthor] = useState("");
  const [body, setBody] = useState("");
  const [serviceError, setServiceError] = useState<string | null>(null);
  const [shareState, setShareState] = useState<"idle" | "copied" | "error">("idle");
  const shareUrl = useMemo(() => buildThoughtShareUrl(post), [post]);

  useEffect(() => {
    let cancelled = false;

    async function loadEngagement() {
      try {
        const [nextComments, nextReactions] = await Promise.all([
          service.listComments(post.id),
          service.getReactions(post.id),
        ]);

        if (cancelled) {
          return;
        }

        setComments(nextComments);
        setReactions(nextReactions);
        setServiceError(null);
      } catch {
        if (cancelled) {
          return;
        }

        setComments([]);
        setReactions({
          postId: post.id,
          counts: { ...emptyReactions },
        });
        setServiceError("Comments and reactions are unavailable until the Thoughts backend is configured.");
      }
    }

    loadEngagement();

    return () => {
      cancelled = true;
    };
  }, [post.id, service]);

  async function handleCommentSubmit() {
    const payload: ThoughtCommentInput = {
      postId: post.id,
      author,
      body,
    };

    if (!payload.author.trim() || !payload.body.trim()) {
      return;
    }

    try {
      const nextComment = await service.addComment(payload);
      setComments((current) => [nextComment, ...current]);
      setAuthor("");
      setBody("");
      setServiceError(null);
    } catch {
      setServiceError("Comment posting is unavailable right now.");
    }
  }

  async function handleReaction(reaction: ThoughtReactionType) {
    try {
      const nextReactions = await service.toggleReaction(post.id, reaction);
      setReactions(nextReactions);
      setServiceError(null);
    } catch {
      setServiceError("Reactions are unavailable right now.");
    }
  }

  async function handleShare() {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setShareState("copied");
    } catch {
      setShareState("error");
    }
  }

  useEffect(() => {
    if (shareState === "idle") {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setShareState("idle");
    }, 2200);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [shareState]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[70] flex items-center justify-center bg-slate/80 px-3 py-6 backdrop-blur-md"
    >
      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.98 }}
        transition={{ duration: 0.25 }}
        className="scrollbar-thin relative max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-[32px] border border-white/10 bg-slate/95 shadow-glass"
      >
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-white/60 transition hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>

          {post.coverImage ? (
            <div className="relative h-64 overflow-hidden border-b border-white/10">
              <img src={post.coverImage} alt={post.title} className="h-full w-full object-cover opacity-70" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate via-slate/40 to-transparent" />
            </div>
          ) : null}

          <div className="grid gap-10 p-6 md:grid-cols-[minmax(0,1.2fr),360px] md:p-8">
            <article className="space-y-6">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-3 text-sm text-white/50">
                  <span>{post.category}</span>
                  <span>•</span>
                  <span>{formatDate(post.date)}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="font-display text-3xl text-white md:text-5xl">{post.title}</h3>
                <p className="max-w-3xl text-lg text-white/65">{post.excerpt}</p>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span key={tag} className="chip normal-case tracking-normal">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="prose prose-invert max-w-none prose-headings:font-display prose-headings:text-white prose-p:text-white/72 prose-strong:text-white prose-li:text-white/72">
                {post.bodyImages?.length ? (
                  <div className="not-prose mb-8 space-y-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-white/40">Images</p>
                    <div className="grid gap-5">
                      {post.bodyImages.map((imageUrl, index) => (
                        <div
                          key={`${imageUrl}-${index}`}
                          className="overflow-hidden rounded-[24px] border border-white/10 bg-black/20"
                        >
                          <img
                            src={imageUrl}
                            alt={`${post.title} image ${index + 1}`}
                            className="h-[320px] w-full object-cover md:h-[420px]"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
                <ReactMarkdown>{post.content}</ReactMarkdown>
              </div>
            </article>

            <aside className="space-y-6">
              {serviceError ? (
                <div className="rounded-[24px] border border-white/10 bg-white/[0.05] px-4 py-3 text-sm text-white/55">
                  {serviceError}
                </div>
              ) : null}

              <div className="rounded-[28px] border border-white/10 bg-white/[0.05] p-5">
                <div className="mb-4 flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-white/50">
                  <Share2 className="h-4 w-4" />
                  Share
                </div>
                <div className="space-y-3">
                  <button type="button" onClick={handleShare} className="action-link w-full justify-center">
                    {shareState === "copied" ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
                    {shareState === "copied" ? "Link copied" : "Copy link"}
                  </button>
                  <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-xs leading-6 text-white/52">
                    {shareUrl}
                  </div>
                  {shareState === "error" ? (
                    <p className="text-sm text-white/45">Could not copy automatically. You can still copy the link above.</p>
                  ) : null}
                </div>
              </div>

              <div className="rounded-[28px] border border-white/10 bg-white/[0.05] p-5">
                <div className="mb-4 flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-white/50">
                  <ThumbsUp className="h-4 w-4" />
                  Reactions
                </div>
                <div className="space-y-2">
                  {(Object.keys(reactionLabels) as ThoughtReactionType[]).map((reaction) => (
                    <button
                      key={reaction}
                      type="button"
                      onClick={() => handleReaction(reaction)}
                      className="flex w-full items-center justify-between rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3 text-left text-white/75 transition hover:border-white/20 hover:text-white"
                    >
                      <span>{reactionLabels[reaction]}</span>
                      <span>{reactions?.counts[reaction] ?? 0}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-[28px] border border-white/10 bg-white/[0.05] p-5">
                <div className="mb-4 flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-white/50">
                  <MessageSquare className="h-4 w-4" />
                  Comments
                </div>
                <div className="space-y-3">
                  <input
                    value={author}
                    onChange={(event) => setAuthor(event.target.value)}
                    placeholder="Your name"
                    className="min-h-[48px] w-full rounded-2xl border border-white/10 bg-black/20 px-4 text-sm text-white placeholder:text-white/30"
                  />
                  <textarea
                    value={body}
                    onChange={(event) => setBody(event.target.value)}
                    placeholder="Add a comment"
                    rows={4}
                    className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white placeholder:text-white/30"
                  />
                  <button
                    type="button"
                    onClick={handleCommentSubmit}
                    className="action-link action-link-primary w-full"
                  >
                    Post comment
                  </button>
                </div>

                <div className="mt-5 space-y-3">
                  {comments.length ? (
                    comments.map((comment) => (
                      <div
                        key={comment.id}
                        className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm"
                      >
                        <div className="mb-1 flex items-center justify-between gap-3 text-white/45">
                          <span>{comment.author}</span>
                          <span>{formatDate(comment.createdAt)}</span>
                        </div>
                        <p className="leading-6 text-white/72">{comment.body}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-white/45">No comments yet. Leave the first one.</p>
                  )}
                </div>
              </div>
            </aside>
          </div>
      </motion.div>
    </motion.div>
  );
}
