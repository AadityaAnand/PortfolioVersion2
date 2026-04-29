import type { ThoughtPost, ThoughtPostInput } from "@/types/thoughts";

export interface ThoughtsContentService {
  listPublishedPosts(): Promise<ThoughtPost[]>;
  listAdminPosts(): Promise<ThoughtPost[]>;
  savePost(input: ThoughtPostInput): Promise<ThoughtPost>;
  deletePost(postId: string): Promise<void>;
  uploadCoverImage(file: File): Promise<string>;
}
