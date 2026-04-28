import type { AssistantPrompt, AssistantReply } from "@/types/assistant";

export const assistantPrompts: AssistantPrompt[] = [
  {
    id: "about",
    label: "Tell me about Aaditya",
    prompt: "Tell me about Aaditya",
  },
  {
    id: "projects",
    label: "What projects has he built?",
    prompt: "What projects has he built?",
  },
  {
    id: "ai-fit",
    label: "Why is he a good fit for AI engineering?",
    prompt: "Why is he a good fit for AI engineering?",
  },
  {
    id: "fde-fit",
    label: "Why is he strong as a forward deployed engineer?",
    prompt: "What makes him strong as a forward deployed engineer?",
  },
  {
    id: "backend",
    label: "What backend systems has he worked on?",
    prompt: "What backend systems has he worked on?",
  },
  {
    id: "problems",
    label: "What problems does he like solving?",
    prompt: "What problems does he like solving?",
  },
];

export const assistantReplies: AssistantReply[] = [
  {
    prompt: "Tell me about Aaditya",
    answer:
      "Aaditya is an engineer who is most comfortable where product ambiguity meets systems work. He has spent time on backend workflows, cloud-hosted services, real-time applications, and data pipelines, and he tends to think in terms of working products rather than isolated technical tasks.\n\nWhat stands out is that he is not trying to stay in one lane. He can work on APIs and infrastructure, but he also likes shaping interfaces, interaction models, and AI-driven experiences when that is what the problem needs.",
  },
  {
    prompt: "What projects has he built?",
    answer:
      "The portfolio highlights three useful signals. One is a real-time collaborative code editor, which shows comfort with concurrency, session state, and product feel. Another is an event-driven trend detection pipeline, which points toward backend and data systems thinking. The third is this AI-first portfolio surface, which shows how he thinks about AI interfaces as products, not just API demos.\n\nAcross those projects, the pattern is consistent: he likes systems that have a clear user-facing reason to exist.",
  },
  {
    prompt: "Why is he a good fit for AI engineering?",
    answer:
      "He approaches AI features as system design problems, not just model integration work. That means thinking about context, trust, interaction flow, retrieval, and failure handling alongside the model itself.\n\nHe is also comfortable with the surrounding engineering: APIs, backend logic, data flow, frontend UX, and the product decisions that determine whether an AI feature actually helps someone.",
  },
  {
    prompt: "What makes him strong as a forward deployed engineer?",
    answer:
      "He likes working close to the actual problem. That usually means clarifying ambiguity, talking through tradeoffs, and building something useful before the requirements are perfectly shaped.\n\nHe also has the range that forward deployed work demands. He can move between customer-facing thinking, product judgment, backend systems, and implementation detail without treating them as separate jobs.",
  },
  {
    prompt: "What backend systems has he worked on?",
    answer:
      "His background includes workflow backends, analytics-oriented services, cloud microservices, caching layers, event-driven data pipelines, and real-time collaboration infrastructure.\n\nThe common thread is that he gravitates toward systems that need to stay understandable while they scale. He cares about failure modes, release safety, and whether another engineer can reason about the system six months later.",
  },
  {
    prompt: "What problems does he like solving?",
    answer:
      "He seems drawn to problems that are ambiguous at the start but concrete once you ship. Internal platforms, AI-assisted workflows, backend products, data-heavy services, and tools that need both technical depth and thoughtful UX all fit that pattern.\n\nHe is especially well matched to situations where someone needs an engineer who can translate between product language, user pain, and real implementation choices.",
  },
];

export const assistantWelcome =
  "Ask about projects, AI engineering fit, forward deployed work, backend systems, or the kinds of problems I like solving.";
