import type {
  ThoughtComment,
  ThoughtCommentInput,
  ThoughtReactionSummary,
  ThoughtReactionType,
} from "@/types/thoughts";
import type { ThoughtsService } from "@/lib/services/thoughts-service";

export class SupabaseThoughtsService implements ThoughtsService {
  async listComments(_postId: string): Promise<ThoughtComment[]> {
    throw new Error("SupabaseThoughtsService is a placeholder. Wire your Supabase client here.");
  }

  async addComment(_input: ThoughtCommentInput): Promise<ThoughtComment> {
    throw new Error("SupabaseThoughtsService is a placeholder. Wire your Supabase client here.");
  }

  async getReactions(_postId: string): Promise<ThoughtReactionSummary> {
    throw new Error("SupabaseThoughtsService is a placeholder. Wire your Supabase client here.");
  }

  async toggleReaction(
    _postId: string,
    _reaction: ThoughtReactionType,
  ): Promise<ThoughtReactionSummary> {
    throw new Error("SupabaseThoughtsService is a placeholder. Wire your Supabase client here.");
  }
}
