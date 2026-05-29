export interface NavItem {
  label: string;
  href: string;
  ariaLabel?: string;
}

export interface SiteMetadata {
  name: string;
  role: string;
  description: string;
  url: string;
}

export interface HeroData {
  headline: string;
  subheadline: string;
  description: string;
  ctaPrimary: { label: string; href: string };
  ctaSecondary: { label: string; href: string };
}

export interface AboutData {
  bio: string[];
  stats: { label: string; value: string; description: string }[];
}

export interface SkillGroup {
  category: string;
  description: string;
  skills: string[];
}

export interface Project {
  title: string;
  slug: string;
  summary: string;
  role: string;
  context: string;
  techStack: string[];
  outcome: string;
  tags: string[];
  github: string;
  demo: string | null;
  badge: string | null;
  featured: boolean;
  year: string;
  certificate?: string;
}

export interface Achievement {
  title: string;
  event: string;
  description: string;
  year: string;
  highlight: boolean;
  rank?: string;
  certificate?: string;
}

export interface ContactLink {
  label: string;
  href: string;
  icon: string;
}
