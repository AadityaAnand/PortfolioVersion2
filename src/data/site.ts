import type { ContactLink, HeroAction, HeroSignal, NavItem, StoryPillar } from "@/types/portfolio";

export const homeNavItems: NavItem[] = [
  { label: "Work", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Thoughts", href: "/thoughts" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export const thoughtsPageNavItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/#projects" },
  { label: "Experience", href: "/#experience" },
  { label: "Thoughts", href: "/thoughts" },
  { label: "Contact", href: "/#contact" },
];

export const heroSignals: HeroSignal[] = [
  { label: "AI", value: "Products" },
  { label: "Backend", value: "Systems" },
  { label: "Build", value: "Shipping" },
];

export const heroActions: HeroAction[] = [
  { label: "Ask AI", href: "#assistant", type: "assistant" },
  { label: "Projects", href: "#projects", type: "link" },
  { label: "Thoughts", href: "/thoughts", type: "link" },
  { label: "Contact", href: "#contact", type: "link" },
];

export const storyIntro =
  "I like working close to the real problem, especially when the product shape is still unclear and the system still needs to ship.";

export const storyPillars: StoryPillar[] = [
  {
    title: "Close to the problem",
    body: "User-facing problems. Real constraints. Clear tradeoffs.",
  },
  {
    title: "Across the stack",
    body: "Backend, frontend, AI, cloud, product.",
  },
  {
    title: "Ship, then stabilize",
    body: "Build fast. Make it reliable. Keep it usable.",
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
    value: "Download PDF",
    href: `${import.meta.env.BASE_URL}assets/Aaditya-Anand-Resume.pdf`,
  },
];
