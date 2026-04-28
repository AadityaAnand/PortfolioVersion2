export type ThoughtReactionType = "useful" | "interesting" | "curious";

export type ThoughtPost = {
  id: string;
  title: string;
  date: string;
  category: string;
  tags: string[];
  excerpt: string;
  coverImage?: string;
  readTime: string;
  content: string;
  featured?: boolean;
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
