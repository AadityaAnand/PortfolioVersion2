export interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  duration: string;
  description: string[];
  technologies: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  image?: string;
  duration?: string;
}

export interface Skill {
  name: string;
  category: string;
  icon: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
} 