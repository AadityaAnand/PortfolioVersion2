import { thoughtPosts } from "@/data/posts";
import type { ThoughtsContentService } from "@/lib/services/thoughts-content-service";
import type { ThoughtPost, ThoughtPostInput } from "@/types/thoughts";

export class LocalThoughtsContentService implements ThoughtsContentService {
  async listPublishedPosts() {
    return sortPosts(thoughtPosts.filter((post) => post.published !== false));
  }

  async listAdminPosts() {
    return sortPosts(thoughtPosts);
  }

  async savePost(_input: ThoughtPostInput): Promise<ThoughtPost> {
    throw new Error("Thought publishing requires Supabase. Configure your Supabase env vars to write posts from the UI.");
  }

  async deletePost(_postId: string): Promise<void> {
    throw new Error("Thought publishing requires Supabase. Configure your Supabase env vars to delete posts from the UI.");
  }

  async uploadCoverImage(_file: File): Promise<string> {
    throw new Error("Thought publishing requires Supabase Storage. Configure your Supabase env vars to upload cover images.");
  }
}

function sortPosts(posts: ThoughtPost[]) {
  return [...posts].sort((left, right) => {
    if (Boolean(left.featured) !== Boolean(right.featured)) {
      return left.featured ? -1 : 1;
    }

    return new Date(right.date).getTime() - new Date(left.date).getTime();
  });
}
