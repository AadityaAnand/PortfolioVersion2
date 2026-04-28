export type NavItem = {
  label: string;
  href: string;
};

export type HeroAction = {
  label: string;
  href: string;
  type: "link" | "assistant";
};

export type HeroSignal = {
  label: string;
  value: string;
};

export type StoryPillar = {
  title: string;
  body: string;
};

export type ExperienceStory = {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  summary: string;
  context: string;
  challenge: string;
  action: string;
  thinking: string;
  outcome: string;
  stack: string[];
};

export type ProjectLink = {
  label: string;
  href: string;
};

export type ProjectCaseStudy = {
  id: string;
  title: string;
  tagline: string;
  problem: string;
  why: string;
  role: string;
  architecture: string[];
  stack: string[];
  learned: string;
  links: ProjectLink[];
  assistantPrompt: string;
};

export type SkillGroup = {
  id: string;
  title: string;
  summary: string;
  skills: string[];
};

export type ContactLink = {
  label: string;
  value: string;
  href: string;
};
