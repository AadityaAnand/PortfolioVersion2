import type { ContactLink, HeroAction, HeroSignal, NavItem, StoryPillar } from "@/types/portfolio";

export const navItems: NavItem[] = [
  { label: "Work", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Thoughts", href: "#thoughts" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export const heroSignals: HeroSignal[] = [
  { label: "Mode", value: "Forward deployed execution" },
  { label: "Stack", value: "AI, product, backend, cloud" },
  { label: "Style", value: "Ambiguous problem -> shipped system" },
];

export const heroActions: HeroAction[] = [
  { label: "Ask AI About Me", href: "#assistant", type: "assistant" },
  { label: "View Projects", href: "#projects", type: "link" },
  { label: "Read My Thoughts", href: "#thoughts", type: "link" },
  { label: "Contact Me", href: "#contact", type: "link" },
];

export const storyIntro =
  "I like working close to the real problem. That usually means talking to users, clarifying the mess, and turning a half-defined need into something reliable enough to use in the wild.";

export const storyPillars: StoryPillar[] = [
  {
    title: "Close to the problem",
    body: "I do my best work when engineering is adjacent to users, operators, or internal teams who feel the friction every day.",
  },
  {
    title: "Across the stack",
    body: "I can move between backend systems, frontend surfaces, AI workflows, cloud infrastructure, and product decisions without losing the thread.",
  },
  {
    title: "Ship, then stabilize",
    body: "I care about getting something real into people's hands and making it dependable enough that they want to keep using it.",
  },
];

export const contactLinks: ContactLink[] = [
  {
    label: "Email",
    value: "aadityaanand.tech@gmail.com",
    href: "mailto:aadityaanand.tech@gmail.com",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/aadityaanand29",
    href: "https://www.linkedin.com/in/aadityaanand29/",
  },
  {
    label: "GitHub",
    value: "github.com/AadityaAnand",
    href: "https://github.com/AadityaAnand",
  },
  {
    label: "Resume",
    value: "Forward Deployed / AI / Full Stack",
    href: `${import.meta.env.BASE_URL}assets/Aaditya-Anand-Resume.pdf`,
  },
];

export const footerNote =
  "If you are building AI products, internal platforms, or systems that need someone who can move between code, product, and users, I'd love to connect.";
