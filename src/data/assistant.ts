import type { AssistantPrompt, AssistantReply } from "@/types/assistant";

export const assistantPrompts: AssistantPrompt[] = [
  {
    id: "about",
    label: "About",
    prompt: "Tell me about Aditya",
  },
  {
    id: "projects",
    label: "Projects",
    prompt: "What projects has he built?",
  },
  {
    id: "ai-fit",
    label: "AI fit",
    prompt: "Why is he a good fit for AI engineering?",
  },
  {
    id: "fde-fit",
    label: "Engineer fit",
    prompt: "What makes him strong as an engineer?",
  },
  {
    id: "backend",
    label: "Backend",
    prompt: "What backend systems has he worked on?",
  },
  {
    id: "problems",
    label: "Problem type",
    prompt: "What problems does he like solving?",
  },
];

export const assistantReplies: AssistantReply[] = [
  {
    prompt: "Tell me about Aditya",
    answer:
      "Aditya is a software engineer who works well where product ambiguity meets systems work. His background spans backend workflows, cloud services, real-time products, and data pipelines.\n\nHe is strongest when the problem is still unclear and someone needs to turn it into a working system.",
  },
  {
    prompt: "What projects has he built?",
    answer:
      "The strongest signals are a real-time collaborative code editor, an event-driven trend detection pipeline, and this AI-first portfolio surface.\n\nTogether they show product thinking, backend depth, and comfort working across the full stack.",
  },
  {
    prompt: "Why is he a good fit for AI engineering?",
    answer:
      "He approaches AI as product and systems work, not just model wiring. Context, retrieval, UX, and failure handling matter as much as the model call.\n\nHe can also build the surrounding stack that makes an AI feature usable.",
  },
  {
    prompt: "What makes him strong as an engineer?",
    answer:
      "He is comfortable clarifying ambiguity, making tradeoffs visible, and shipping before everything is perfectly specified.\n\nHe can move between product thinking, backend systems, frontend surfaces, and implementation detail without losing the thread.",
  },
  {
    prompt: "What backend systems has he worked on?",
    answer:
      "He has worked on workflow backends, cloud microservices, caching layers, event-driven pipelines, and real-time collaboration systems.\n\nThe common thread is clarity under scale: understandable systems, safer releases, and better failure handling.",
  },
  {
    prompt: "What problems does he like solving?",
    answer:
      "He tends to like problems that start ambiguous but become concrete once you ship. Internal tools, AI-assisted workflows, backend-heavy products, and systems that need both technical depth and thoughtful UX all fit that pattern.\n\nHe is a strong fit when someone needs an engineer who can translate between user pain, product language, and implementation choices.",
  },
];

export const assistantWelcome =
  "Ask about projects, systems, experience, or fit.";
