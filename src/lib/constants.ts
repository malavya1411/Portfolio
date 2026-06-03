/** Single source of truth for the canonical domain */
export const SITE_URL = "https://portfolio-sigma-navy-hx9lng5dcr.vercel.app";

export const SITE_CONFIG = {
  maxWidth: 1200,
  navHeight: 72,
  animationDuration: {
    fast: 0.25,
    normal: 0.5,
    slow: 0.8,
  },
  ease: [0.25, 0.1, 0.25, 1] as const,
  easeOut: [0, 0, 0.25, 1] as const,
} as const;

export const SECTION_IDS = {
  home: "home",
  about: "about",
  skills: "skills",
  projects: "projects",
  achievements: "achievements",
  contact: "contact",
} as const;
