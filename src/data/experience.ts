import type { ExperienceStory } from "@/types/portfolio";

export const experiences: ExperienceStory[] = [
  {
    id: "umbc",
    company: "University of Maryland, Baltimore County",
    role: "Software Engineer",
    period: "2024 - Present",
    location: "United States",
    summary:
      "I worked on internal workflows and analytics where reliability mattered more than novelty.",
    context:
      "The systems supported operational work that people depended on. When something broke, the cost was confusion, delays, and manual cleanup rather than a flashy outage banner.",
    challenge:
      "The hard part was not adding features. It was making the backend easier to reason about, easier to debug, and safer to extend while multiple teams were using it.",
    action:
      "I redesigned backend workflows, tuned data access paths, and tightened the release process with better testing and clearer system boundaries.",
    thinking:
      "I leaned toward decisions that reduced operational ambiguity: simpler data flow, fewer surprising failure modes, and code paths that were easier for other engineers to trace.",
    outcome:
      "The system became faster to work with, easier to maintain, and more trustworthy when things went wrong.",
    stack: ["Python", "PostgreSQL", "APIs", "GitLab CI", "Testing"],
  },
  {
    id: "kyvos",
    company: "Intellicus / Kyvos",
    role: "Software Engineer",
    period: "2023",
    location: "India",
    summary:
      "I worked on cloud-hosted microservices where scale and delivery speed both mattered at the same time.",
    context:
      "The platform served enterprise analytics workloads, so the architecture had to handle real customer demand without turning every release into a coordination problem.",
    challenge:
      "The work sat in the uncomfortable middle ground between infrastructure and product. We had to improve throughput, reduce pressure on shared systems, and keep shipping.",
    action:
      "I built on AWS ECS, improved CI/CD workflows, introduced caching where it meaningfully reduced pressure, and supported service boundaries that scaled more cleanly.",
    thinking:
      "I treated release quality as part of the product. Faster delivery only mattered if the system stayed legible under load and recoverable during change.",
    outcome:
      "Releases became smoother, services handled more demand, and the system spent less time fighting its own complexity.",
    stack: ["AWS ECS", "Spring Boot", "Redis", "Jenkins", "Microservices"],
  },
  {
    id: "iit",
    company: "IIT Kharagpur",
    role: "Software Engineer",
    period: "2022 - 2023",
    location: "India",
    summary:
      "I built data and ML-serving pipelines for a research environment that still needed production-style rigor.",
    context:
      "The work involved high-volume collection, transformation, and model-serving flows where a prototype mindset was not enough once people began relying on the outputs.",
    challenge:
      "The challenge was balancing throughput with maintainability. Fast scripts were not useful if the pipeline became fragile the moment new data or new operators entered the loop.",
    action:
      "I worked on asynchronous scraping, ETL redesign, and an ML inference service that made the data pipeline more operational and easier to reuse.",
    thinking:
      "I favored clear stages, explicit interfaces, and pipelines that could be inspected without tribal knowledge.",
    outcome:
      "The system moved from ad hoc processing toward something much closer to a usable internal platform.",
    stack: ["Python", "Docker", "Airflow", "Pandas", "ML Inference"],
  },
];
