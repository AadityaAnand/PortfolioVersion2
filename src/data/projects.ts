import type { ProjectCaseStudy } from "@/types/portfolio";

export const projects: ProjectCaseStudy[] = [
  {
    id: "code-editor",
    title: "Real-Time Collaborative Code Editor",
    tagline: "A multi-user coding surface built to feel responsive, secure, and product-like.",
    problem:
      "Most collaborative editor demos prove that sockets work. They do not prove that the experience still feels coherent once authentication, permissions, and concurrent presence show up.",
    why:
      "I wanted to build a real-time system that behaved more like a tool someone could keep open all day, not just a networking demo.",
    role: "Full-stack builder across collaboration logic, session management, and UI flow.",
    architecture: [
      "Socket.io synchronization for edits, presence, and cursors.",
      "JWT authentication and role-aware session access.",
      "MongoDB-backed session state with a React client tuned for responsiveness.",
    ],
    stack: ["React", "TypeScript", "Node.js", "Socket.io", "MongoDB", "JWT"],
    learned:
      "Real-time software gets much easier once ownership of state is explicit. Most of the complexity comes from vague boundaries, not from websockets themselves.",
    links: [{ label: "GitHub", href: "https://github.com/AadityaAnand/CodeEditor" }],
    assistantPrompt: "What makes Aditya's collaborative code editor interesting?",
  },
  {
    id: "trend-detection",
    title: "Opportunity & Trend Detection",
    tagline: "An event-driven pipeline for finding emerging signals in noisy, high-volume data.",
    problem:
      "Trend detection becomes messy once ingestion, clustering, and query workloads compete for the same resources and the latency expectations remain high.",
    why:
      "I wanted to design a system where each stage could scale independently instead of forcing one monolith to do everything poorly.",
    role: "Backend and data systems engineer across ETL, API design, and deployment structure.",
    architecture: [
      "Kafka-backed ingestion for high-volume event flow.",
      "Service separation between ingestion, clustering, and API layers.",
      "Containerized deployment for cleaner scaling and operational isolation.",
    ],
    stack: ["Python", "FastAPI", "Kafka", "PostgreSQL", "Docker", "scikit-learn"],
    learned:
      "Pipelines become easier to evolve when each stage has a clear contract. Data systems fail quickly when every service knows too much about the others.",
    links: [{ label: "GitHub", href: "https://github.com/AadityaAnand" }],
    assistantPrompt: "How does Aditya approach backend and data architecture in his trend detection project?",
  },
  {
    id: "ai-interface",
    title: "AI Portfolio Assistant",
    tagline: "A product-style AI interface that makes a portfolio explorable instead of static.",
    problem:
      "Traditional portfolios force people to scan sections, infer context, and stitch together the story themselves. That is a poor interface for technical depth.",
    why:
      "I wanted the site itself to behave like a product demo: conversational, guided, and ready to evolve into a real assistant backed by retrieval and APIs.",
    role: "Product engineer shaping the interaction model, data architecture, and AI integration surface.",
    architecture: [
      "Structured content layer that can later feed retrieval or prompt assembly.",
      "Mock assistant service separated from the UI so a real API can replace it cleanly.",
      "Thoughts and engagement data isolated behind a service layer for future Supabase integration.",
    ],
    stack: ["React", "Vite", "TypeScript", "Tailwind", "Framer Motion"],
    learned:
      "The right AI interaction is often an information architecture problem first. Good retrieval and good interfaces start from clean, structured source material.",
    links: [{ label: "This Portfolio", href: "#assistant" }],
    assistantPrompt: "Why did Aditya design his portfolio around an AI assistant?",
  },
];
