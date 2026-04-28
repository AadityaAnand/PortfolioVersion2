import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { MessageSquare, ThumbsUp, X } from "lucide-react";
import { LocalThoughtsService } from "@/lib/services/local-thoughts-service";
import { formatDate } from "@/lib/utils";
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

type ThoughtReaderProps = {
  post: ThoughtPost;
  onClose: () => void;
};

export function ThoughtReader({ post, onClose }: ThoughtReaderProps) {
  const service = useMemo(() => new LocalThoughtsService(), []);
  const [comments, setComments] = useState<ThoughtComment[]>([]);
  const [reactions, setReactions] = useState<ThoughtReactionSummary | null>(null);
  const [author, setAuthor] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    service.listComments(post.id).then(setComments);
    service.getReactions(post.id).then(setReactions);
  }, [post, service]);

  async function handleCommentSubmit() {
    const payload: ThoughtCommentInput = {
      postId: post.id,
      author,
      body,
    };

    if (!payload.author.trim() || !payload.body.trim()) {
      return;
    }

    const nextComment = await service.addComment(payload);
    setComments((current) => [nextComment, ...current]);
    setAuthor("");
    setBody("");
  }

  async function handleReaction(reaction: ThoughtReactionType) {
    const nextReactions = await service.toggleReaction(post.id, reaction);
    setReactions(nextReactions);
  }

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
                <ReactMarkdown>{post.content}</ReactMarkdown>
              </div>
            </article>

            <aside className="space-y-6">
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
