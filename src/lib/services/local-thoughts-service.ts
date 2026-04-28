import type {
  ThoughtComment,
  ThoughtCommentInput,
  ThoughtReactionSummary,
  ThoughtReactionType,
} from "@/types/thoughts";
import type { ThoughtsService } from "@/lib/services/thoughts-service";

const COMMENT_KEY = "aaditya-thought-comments:v1";
const REACTION_KEY = "aaditya-thought-reactions:v1";
const VIEWER_KEY = "aaditya-thought-viewer:v1";

type CommentStore = Record<string, ThoughtComment[]>;
type ReactionStore = Record<string, Record<ThoughtReactionType, number>>;
type ViewerStore = Record<string, ThoughtReactionType[]>;

const baseCounts = {
  useful: 0,
  interesting: 0,
  curious: 0,
};

export class LocalThoughtsService implements ThoughtsService {
  async listComments(postId: string) {
    const store = readJson<CommentStore>(COMMENT_KEY, {});
    return store[postId] ?? [];
  }

  async addComment(input: ThoughtCommentInput) {
    const store = readJson<CommentStore>(COMMENT_KEY, {});
    const nextComment: ThoughtComment = {
      id: `${input.postId}-${Date.now()}`,
      postId: input.postId,
      author: input.author.trim(),
      body: input.body.trim(),
      createdAt: new Date().toISOString(),
    };

    store[input.postId] = [nextComment, ...(store[input.postId] ?? [])];
    writeJson(COMMENT_KEY, store);

    return nextComment;
  }

  async getReactions(postId: string) {
    const store = readJson<ReactionStore>(REACTION_KEY, {});
    return {
      postId,
      counts: store[postId] ?? { ...baseCounts },
    };
  }

  async toggleReaction(postId: string, reaction: ThoughtReactionType) {
    const store = readJson<ReactionStore>(REACTION_KEY, {});
    const viewerStore = readJson<ViewerStore>(VIEWER_KEY, {});
    const currentCounts = store[postId] ?? { ...baseCounts };
    const currentSelections = new Set(viewerStore[postId] ?? []);

    if (currentSelections.has(reaction)) {
      currentSelections.delete(reaction);
      currentCounts[reaction] = Math.max(0, currentCounts[reaction] - 1);
    } else {
      currentSelections.add(reaction);
      currentCounts[reaction] += 1;
    }

    store[postId] = currentCounts;
    viewerStore[postId] = Array.from(currentSelections);

    writeJson(REACTION_KEY, store);
    writeJson(VIEWER_KEY, viewerStore);

    return {
      postId,
      counts: currentCounts,
    };
  }
}

function readJson<T>(key: string, fallback: T) {
  if (typeof window === "undefined") {
    return fallback;
  }

  const raw = window.localStorage.getItem(key);
  if (!raw) {
    return fallback;
  }

  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeJson<T>(key: string, value: T) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(key, JSON.stringify(value));
}
