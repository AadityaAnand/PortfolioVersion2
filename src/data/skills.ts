import type { SkillGroup } from "@/types/portfolio";

export const skillGroups: SkillGroup[] = [
  {
    id: "ai",
    title: "AI",
    summary: "LLM-powered products and retrieval-aware interfaces.",
    skills: ["LLMs", "Prompting", "Embeddings", "RAG", "AI UX"],
  },
  {
    id: "product-work",
    title: "Product Work",
    summary: "Ambiguous problem solving close to users.",
    skills: ["Problem framing", "Rapid prototyping", "User-facing build loops", "Technical communication", "Operator mindset"],
  },
  {
    id: "backend",
    title: "Backend",
    summary: "APIs, distributed systems, and production software.",
    skills: ["Node.js", "Python", "Java", "Distributed systems", "PostgreSQL", "Kafka", "Redis"],
  },
  {
    id: "frontend",
    title: "Frontend",
    summary: "Interfaces that make technical products easier to use.",
    skills: ["React", "TypeScript", "Tailwind", "Design systems", "Dashboards", "Interaction design"],
  },
  {
    id: "cloud",
    title: "Cloud",
    summary: "Deployment, CI/CD, and practical operations.",
    skills: ["AWS", "Docker", "Vercel", "CI/CD", "Monitoring basics", "Platform workflows"],
  },
];
