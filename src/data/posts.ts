import type { ThoughtPost } from "@/types/thoughts";

export const thoughtCategories = [
  {
    id: "technical",
    title: "Technical",
    description: "Systems, AI, architecture.",
  },
  {
    id: "life",
    title: "Life",
    description: "Reflections, work, direction.",
  },
  {
    id: "fun",
    title: "Fun",
    description: "Side notes, experiments, curiosities.",
  },
] as const;

export const thoughtPosts: ThoughtPost[] = [];
