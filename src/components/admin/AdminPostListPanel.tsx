import { FilePlus2, RefreshCw } from "lucide-react";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { formatDate } from "@/lib/utils";
import type { ThoughtPost } from "@/types/thoughts";
import { cn } from "@/lib/utils";

type AdminPostListPanelProps = {
  posts: ThoughtPost[];
  selectedPostId: string | null;
  isLoading: boolean;
  loadError: string | null;
  onCreateNew: () => void;
  onRefresh: () => void;
  onSelect: (post: ThoughtPost) => void;
};

export function AdminPostListPanel({
  posts,
  selectedPostId,
  isLoading,
  loadError,
  onCreateNew,
  onRefresh,
  onSelect,
}: AdminPostListPanelProps) {
  return (
    <GlassPanel className="h-full p-5 md:p-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="section-lead">Thoughts</p>
          <h2 className="mt-1 font-display text-2xl text-white">Posts</h2>
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={onRefresh} className="action-link">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </button>
          <button type="button" onClick={onCreateNew} className="action-link action-link-primary">
            <FilePlus2 className="mr-2 h-4 w-4" />
            New
          </button>
        </div>
      </div>

      {loadError ? (
        <div className="mt-5 rounded-2xl border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-100/85">
          {loadError}
        </div>
      ) : null}

      <div className="mt-5 space-y-3">
        {isLoading ? (
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4 text-sm text-white/50">
            Loading posts...
          </div>
        ) : posts.length ? (
          posts.map((post) => (
            <button
              key={post.id}
              type="button"
              onClick={() => onSelect(post)}
              className={cn(
                "w-full rounded-[20px] border px-4 py-4 text-left transition",
                selectedPostId === post.id
                  ? "border-accent/40 bg-accent/10"
                  : "border-white/10 bg-white/[0.04] hover:border-white/20 hover:bg-white/[0.06]",
              )}
            >
              <div className="mb-3 flex items-center justify-between gap-3">
                <span className="text-xs uppercase tracking-[0.18em] text-white/38">{post.category}</span>
                <span
                  className={cn(
                    "rounded-xl px-2.5 py-1 text-[11px] uppercase tracking-[0.16em]",
                    post.published
                      ? "border border-emerald-300/20 bg-emerald-300/10 text-emerald-100/80"
                      : "border border-white/10 bg-white/[0.05] text-white/55",
                  )}
                >
                  {post.published ? "Published" : "Draft"}
                </span>
              </div>
              <h3 className="font-display text-lg text-white">{post.title}</h3>
              <p className="mt-2 line-clamp-2 text-sm leading-6 text-white/58">{post.excerpt}</p>
              <div className="mt-4 flex items-center justify-between gap-3 text-xs uppercase tracking-[0.16em] text-white/32">
                <span>{formatDate(post.date)}</span>
                <span>{post.readTime}</span>
              </div>
            </button>
          ))
        ) : (
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4 text-sm text-white/50">
            No posts yet. Create the first one from here.
          </div>
        )}
      </div>
    </GlassPanel>
  );
}
