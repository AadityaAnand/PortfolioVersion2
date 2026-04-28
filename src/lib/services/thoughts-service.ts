import type {
  ThoughtComment,
  ThoughtCommentInput,
  ThoughtReactionSummary,
  ThoughtReactionType,
} from "@/types/thoughts";

export interface ThoughtsService {
  listComments(postId: string): Promise<ThoughtComment[]>;
  addComment(input: ThoughtCommentInput): Promise<ThoughtComment>;
  getReactions(postId: string): Promise<ThoughtReactionSummary>;
  toggleReaction(postId: string, reaction: ThoughtReactionType): Promise<ThoughtReactionSummary>;
}
