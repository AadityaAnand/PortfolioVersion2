export type ThoughtReactionType = "useful" | "interesting" | "curious";

export type ThoughtCategory = "Technical" | "Life" | "Fun";

export type ThoughtPost = {
  id: string;
  slug?: string;
  title: string;
  date: string;
  category: ThoughtCategory | string;
  tags: string[];
  excerpt: string;
  coverImage?: string;
  readTime: string;
  content: string;
  featured?: boolean;
  published?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type ThoughtPostInput = {
  id?: string;
  slug: string;
  title: string;
  date: string;
  category: ThoughtCategory;
  tags: string[];
  excerpt: string;
  coverImage?: string;
  readTime: string;
  content: string;
  featured: boolean;
  published: boolean;
};

export type ThoughtComment = {
  id: string;
  postId: string;
  author: string;
  body: string;
  createdAt: string;
};

export type ThoughtReactionSummary = {
  postId: string;
  counts: Record<ThoughtReactionType, number>;
};

export type ThoughtCommentInput = {
  postId: string;
  author: string;
  body: string;
};
