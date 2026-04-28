import type { SkillGroup } from "@/types/portfolio";

export const skillGroups: SkillGroup[] = [
  {
    id: "ai",
    title: "AI Engineering",
    summary: "LLM-powered products, structured prompts, retrieval-ready content, and human-in-the-loop workflows.",
    skills: ["LLMs", "Prompt engineering", "Embeddings", "RAG-ready architecture", "AI UX"],
  },
  {
    id: "fde",
    title: "Forward Deployed Engineering",
    summary: "Ambiguous problem solving close to users, rapid prototyping, technical communication, and product judgment.",
    skills: ["Customer-facing build loops", "Problem framing", "Rapid iteration", "Technical storytelling", "Operator mindset"],
  },
  {
    id: "backend",
    title: "Backend & Systems",
    summary: "APIs, distributed services, event-driven systems, databases, and software that behaves well in production.",
    skills: ["Node.js", "Python", "Java", "Distributed systems", "PostgreSQL", "Kafka", "Redis"],
  },
  {
    id: "frontend",
    title: "Frontend & Product",
    summary: "Interfaces that explain complex systems clearly and make technical products easier to trust.",
    skills: ["React", "TypeScript", "Tailwind", "Design systems", "Dashboards", "Interaction design"],
  },
  {
    id: "cloud",
    title: "Cloud & DevOps",
    summary: "Deployment, containerization, CI/CD, and practical monitoring to keep products shippable.",
    skills: ["AWS", "Docker", "Vercel", "CI/CD", "Monitoring basics", "Platform workflows"],
  },
];
