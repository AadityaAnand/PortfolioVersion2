import type { SupabaseClient } from "@supabase/supabase-js";
import type {
  ThoughtComment,
  ThoughtCommentInput,
  ThoughtPost,
  ThoughtPostInput,
  ThoughtReactionSummary,
  ThoughtReactionType,
} from "@/types/thoughts";
import { getThoughtsStorageBucket } from "@/lib/supabase/client";
import type { ThoughtsContentService } from "@/lib/services/thoughts-content-service";
import type { ThoughtsService } from "@/lib/services/thoughts-service";

const baseCounts: ThoughtReactionSummary["counts"] = {
  useful: 0,
  interesting: 0,
  curious: 0,
};

const postSelect =
  "id, slug, title, display_date, category, tags, excerpt, content, cover_image, read_time, featured, published, created_at, updated_at";

type ThoughtPostRecord = {
  id: string;
  slug: string;
  title: string;
  display_date: string;
  category: string;
  tags: string[] | null;
  excerpt: string;
  content: string;
  cover_image: string | null;
  read_time: string | null;
  featured: boolean | null;
  published: boolean | null;
  created_at: string;
  updated_at: string;
};

type ThoughtCommentRecord = {
  id: string;
  post_id: string;
  author: string;
  body: string;
  created_at: string;
};

type ThoughtReactionRecord = {
  id: string;
  reaction_type: ThoughtReactionType;
};

export class SupabaseThoughtsService implements ThoughtsService, ThoughtsContentService {
  constructor(private readonly client: SupabaseClient) {}

  async listPublishedPosts(): Promise<ThoughtPost[]> {
    const { data, error } = await this.client
      .from("thought_posts")
      .select(postSelect)
      .eq("published", true)
      .order("featured", { ascending: false })
      .order("display_date", { ascending: false });

    if (error) {
      throw error;
    }

    return (data ?? []).map((record) => mapThoughtPost(record as ThoughtPostRecord));
  }

  async listAdminPosts(): Promise<ThoughtPost[]> {
    const { data, error } = await this.client
      .from("thought_posts")
      .select(postSelect)
      .order("updated_at", { ascending: false });

    if (error) {
      throw error;
    }

    return (data ?? []).map((record) => mapThoughtPost(record as ThoughtPostRecord));
  }

  async savePost(input: ThoughtPostInput): Promise<ThoughtPost> {
    const payload = mapThoughtPostInput(input);

    if (input.id) {
      const { data, error } = await this.client
        .from("thought_posts")
        .update(payload)
        .eq("id", input.id)
        .select(postSelect)
        .single();

      if (error) {
        throw error;
      }

      return mapThoughtPost(data as ThoughtPostRecord);
    }

    const { data, error } = await this.client
      .from("thought_posts")
      .insert(payload)
      .select(postSelect)
      .single();

    if (error) {
      throw error;
    }

    return mapThoughtPost(data as ThoughtPostRecord);
  }

  async deletePost(postId: string) {
    const { error } = await this.client.from("thought_posts").delete().eq("id", postId);

    if (error) {
      throw error;
    }
  }

  async uploadCoverImage(file: File) {
    const bucket = getThoughtsStorageBucket();
    const filePath = `${Date.now()}-${sanitizeFileName(file.name)}`;
    const { data, error } = await this.client.storage.from(bucket).upload(filePath, file, {
      cacheControl: "3600",
      upsert: true,
      contentType: file.type || undefined,
    });

    if (error) {
      throw error;
    }

    const { data: publicUrlData } = this.client.storage.from(bucket).getPublicUrl(data.path);
    return publicUrlData.publicUrl;
  }

  async listComments(postId: string): Promise<ThoughtComment[]> {
    const { data, error } = await this.client
      .from("thought_comments")
      .select("id, post_id, author, body, created_at")
      .eq("post_id", postId)
      .eq("is_hidden", false)
      .order("created_at", { ascending: false });

    if (error) {
      throw error;
    }

    return (data ?? []).map((record) => mapThoughtComment(record as ThoughtCommentRecord));
  }

  async addComment(input: ThoughtCommentInput): Promise<ThoughtComment> {
    const { data, error } = await this.client
      .from("thought_comments")
      .insert({
        post_id: input.postId,
        author: input.author.trim(),
        body: input.body.trim(),
      })
      .select("id, post_id, author, body, created_at")
      .single();

    if (error) {
      throw error;
    }

    return mapThoughtComment(data as ThoughtCommentRecord);
  }

  async getReactions(postId: string): Promise<ThoughtReactionSummary> {
    const { data, error } = await this.client
      .from("thought_reactions")
      .select("id, reaction_type")
      .eq("post_id", postId);

    if (error) {
      throw error;
    }

    return {
      postId,
      counts: (data ?? []).reduce(
        (counts, record) => {
          counts[(record as ThoughtReactionRecord).reaction_type] += 1;
          return counts;
        },
        { ...baseCounts },
      ),
    };
  }

  async toggleReaction(
    postId: string,
    reaction: ThoughtReactionType,
  ): Promise<ThoughtReactionSummary> {
    const viewerToken = getViewerToken();
    const { data: existingReaction, error: existingReactionError } = await this.client
      .from("thought_reactions")
      .select("id")
      .eq("post_id", postId)
      .eq("viewer_token", viewerToken)
      .eq("reaction_type", reaction)
      .maybeSingle();

    if (existingReactionError) {
      throw existingReactionError;
    }

    if (existingReaction?.id) {
      const { error } = await this.client.from("thought_reactions").delete().eq("id", existingReaction.id);

      if (error) {
        throw error;
      }
    } else {
      const { error } = await this.client.from("thought_reactions").insert({
        post_id: postId,
        viewer_token: viewerToken,
        reaction_type: reaction,
      });

      if (error) {
        throw error;
      }
    }

    return this.getReactions(postId);
  }
}

function mapThoughtPost(record: ThoughtPostRecord): ThoughtPost {
  return {
    id: record.id,
    slug: record.slug,
    title: record.title,
    date: record.display_date,
    category: record.category,
    tags: record.tags ?? [],
    excerpt: record.excerpt,
    content: record.content,
    coverImage: record.cover_image ?? undefined,
    readTime: record.read_time ?? "3 min",
    featured: Boolean(record.featured),
    published: Boolean(record.published),
    createdAt: record.created_at,
    updatedAt: record.updated_at,
  };
}

function mapThoughtPostInput(input: ThoughtPostInput) {
  return {
    slug: input.slug.trim(),
    title: input.title.trim(),
    display_date: input.date,
    category: input.category,
    tags: input.tags,
    excerpt: input.excerpt.trim(),
    content: input.content.trim(),
    cover_image: input.coverImage?.trim() || null,
    read_time: input.readTime.trim() || "3 min",
    featured: input.featured,
    published: input.published,
  };
}

function mapThoughtComment(record: ThoughtCommentRecord): ThoughtComment {
  return {
    id: record.id,
    postId: record.post_id,
    author: record.author,
    body: record.body,
    createdAt: record.created_at,
  };
}

function getViewerToken() {
  if (typeof window === "undefined") {
    return "server";
  }

  const key = "portfolio-thought-viewer:v1";
  const existing = window.localStorage.getItem(key);

  if (existing) {
    return existing;
  }

  const nextToken = window.crypto?.randomUUID?.() ?? `viewer-${Date.now()}`;
  window.localStorage.setItem(key, nextToken);
  return nextToken;
}

function sanitizeFileName(fileName: string) {
  return fileName
    .toLowerCase()
    .replace(/[^a-z0-9.-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}
