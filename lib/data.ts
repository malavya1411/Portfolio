

/* ─── Type Interfaces ─── */

export interface NavItem {
  label: string;
  href: string;
}

export interface SiteMetadata {
  name: string;
  role: string;
  description: string;
  url: string;
  ogImage: string;
}

export interface HeroData {
  greeting: string;
  name: string;
  role: string;
  tagline: string;
  ctaPrimary: string;
  ctaSecondary: string;
  metadata: { label: string; value: string }[];
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
  techStack: string[];
  outcome: string;
  tags: string[];
  github: string;
  demo: string;
  featured: boolean;
}

export interface Achievement {
  title: string;
  event: string;
  description: string;
  year: string;
  highlight: boolean;
}

export interface ContactLink {
  label: string;
  href: string;
  icon: string;
}

/* ─── Site Metadata ─── */

export const siteMetadata: SiteMetadata = {
  name: "Malavya Mankar",
  role: "AI & Full-Stack Developer",
  description:
    "AI & Full-Stack Developer building intelligent, production-ready systems. First-year B.E. student in AI & Data Science at VESIT, Mumbai.",
  url: "https://malavya.dev", // placeholder
  ogImage: "/og-image.png",
};

/* ─── Navigation ─── */

export const navItems: NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact", href: "#contact" },
];

/* ─── Hero ─── */

export const heroData: HeroData = {
  greeting: "Hi, I'm",
  name: "Malavya Mankar",
  role: "AI & Full-Stack Developer",
  tagline:
    "I build intelligent, production-ready systems that turn ideas into shipped products.",
  ctaPrimary: "View Projects",
  ctaSecondary: "Get in Touch",
  metadata: [
    { label: "University", value: "VESIT, Mumbai" },
    { label: "CGPA", value: "9.73" },
    { label: "Focus", value: "AI & Data Science" },
    { label: "Team", value: "AlgoMinds" },
  ],
};

/* ─── About ─── */

export const aboutData: AboutData = {
  bio: [
    "I'm a first-year B.E. student in Artificial Intelligence & Data Science at VESIT, Mumbai. I focus on building intelligent software — systems that combine strong engineering with practical AI.",
    "From autonomous onboarding agents with multi-tier RAG to real-time emergency coordination platforms, I ship production-grade projects that solve actual problems. I lead AlgoMinds, a hackathon team that consistently delivers under pressure.",
    "I care about clean architecture, developer experience, and writing code that other people can actually read and maintain.",
  ],
  stats: [
    {
      label: "CGPA",
      value: "9.73",
      description: "Academic performance",
    },
    {
      label: "Hackathons",
      value: "5+",
      description: "Competitions entered",
    },
    {
      label: "Projects",
      value: "6+",
      description: "Production-grade builds",
    },
  ],
};

/* ─── Skills ─── */

export const skillGroups: SkillGroup[] = [
  {
    category: "Frontend",
    description: "Building responsive, performant interfaces",
    skills: [
      "Next.js 15",
      "React",
      "Vite",
      "TypeScript",
      "Tailwind CSS",
      "Flutter",
    ],
  },
  {
    category: "Backend",
    description: "APIs, databases, and server-side logic",
    skills: [
      "Node.js",
      "Express",
      "PostgreSQL",
      "Supabase",
      "Firebase",
      "JWT Auth",
    ],
  },
  {
    category: "AI / ML",
    description: "Intelligence layers and automation",
    skills: [
      "Gemini API",
      "Vector Embeddings",
      "RAG Systems",
      "MediaPipe",
      "Prompt Engineering",
      "Persona Detection",
    ],
  },
  {
    category: "Tools & Platforms",
    description: "DevOps, integrations, and infrastructure",
    skills: [
      "Vercel",
      "Render",
      "GitHub OAuth",
      "Nodemailer / SMTP",
      "Slack Block Kit",
      "Google Maps SDK",
    ],
  },
];

/* ─── Projects ─── */

export const projects: Project[] = [
  {
    title: "OnboardAI",
    slug: "onboard-ai",
    summary: "Autonomous developer onboarding agent with multi-tier codebase intelligence",
    role: "Syrus 2026 Hackathon — Top 6 Finalist",
    techStack: [
      "Next.js 15",
      "RAG",
      "Slack Block Kit",
      "Nodemailer",
      "GitHub API",
    ],
    outcome:
      "Three-tier RAG system, GitHub issue creation, Slack integration, persona detection, environment verification agent, and checklist tracking — all in 36 hours.",
    tags: ["AI", "Full-Stack", "DevTools"],
    github: "https://github.com/malavya-mankar/onboard-ai", // placeholder
    demo: "https://onboard-ai.vercel.app", // placeholder
    featured: true,
  },
  {
    title: "CrisisSync",
    slug: "crisis-sync",
    summary:
      "AI-powered real-time emergency coordination platform for hospitality venues",
    role: "Google Solution Challenge 2026 — Team Lead",
    techStack: [
      "Flutter",
      "Firebase",
      "Gemini AI",
      "Google Maps SDK",
    ],
    outcome:
      "End-to-end emergency response system with live location tracking, AI-driven triage, and real-time coordination across multiple venues.",
    tags: ["AI", "Mobile", "Full-Stack"],
    github: "https://github.com/malavya-mankar/crisis-sync", // placeholder
    demo: "https://crisis-sync.web.app", // placeholder
    featured: true,
  },
  {
    title: "GitStat",
    slug: "git-stat",
    summary: "GitHub contributor health dashboard with AI-powered insights",
    role: "Hackathon Runner-Up",
    techStack: [
      "React",
      "Vite",
      "Tailwind CSS",
      "Node.js",
      "Express",
      "Supabase",
      "GitHub OAuth",
      "Gemini 1.5 Flash",
    ],
    outcome:
      "Solved complex CORS and OAuth deployment issues. Built a full analytics dashboard with contributor health scoring powered by Gemini.",
    tags: ["Full-Stack", "AI", "DevTools"],
    github: "https://github.com/malavya-mankar/git-stat", // placeholder
    demo: "https://git-stat.vercel.app", // placeholder
    featured: true,
  },
  {
    title: "AI Finder",
    slug: "ai-finder",
    summary: "AI tool discovery SaaS with 80+ curated agents",
    role: "Solo Developer",
    techStack: [
      "React",
      "TypeScript",
      "Vite",
      "Gemini API",
    ],
    outcome:
      "80+ agent database with intelligent search, rate limiting, input validation, and a polished dark-theme UI.",
    tags: ["AI", "Frontend", "SaaS"],
    github: "https://github.com/malavya-mankar/ai-finder", // placeholder
    demo: "https://ai-finder.vercel.app", // placeholder
    featured: false,
  },
  {
    title: "JR-06",
    slug: "jr-06",
    summary: "PCB inventory management system with analytics dashboard",
    role: "Invictus Hackathon, ISTE-VESIT",
    techStack: [
      "React",
      "Node.js",
      "Express",
      "PostgreSQL",
      "JWT",
      "Tailwind CSS",
      "Recharts",
    ],
    outcome:
      "Full CRUD inventory system with JWT authentication, role-based access, and analytics visualizations via Recharts.",
    tags: ["Full-Stack", "Enterprise"],
    github: "https://github.com/malavya-mankar/jr-06", // placeholder
    demo: "https://jr-06.vercel.app", // placeholder
    featured: false,
  },
  {
    title: "HandDraw",
    slug: "hand-draw",
    summary: "Browser-based hand-gesture drawing app with pinch detection",
    role: "Solo Developer",
    techStack: [
      "MediaPipe Hands",
      "HTML5 Canvas",
      "JavaScript",
    ],
    outcome:
      "Real-time hand tracking with pinch-to-draw, neon brush effect, and zero backend — runs entirely in the browser.",
    tags: ["AI", "Creative", "Frontend"],
    github: "https://github.com/malavya-mankar/hand-draw", // placeholder
    demo: "https://hand-draw.vercel.app", // placeholder
    featured: false,
  },
];

/* ─── Achievements ─── */

export const achievements: Achievement[] = [
  {
    title: "Top 6 Finalist",
    event: "Syrus 2026 Hackathon",
    description:
      "Built OnboardAI, an autonomous developer onboarding agent with a three-tier RAG system, among 500+ teams.",
    year: "2026",
    highlight: true,
  },
  {
    title: "Runner-Up",
    event: "Hackathon by Parth Narkar",
    description:
      "Built GitStat — a contributor health dashboard solving complex OAuth and CORS deployment challenges.",
    year: "2025",
    highlight: true,
  },
  {
    title: "Participant — Google Solution Challenge",
    event: "Google Solution Challenge 2026",
    description:
      "Led team AlgoMinds to build CrisisSync, an AI-powered emergency coordination platform for Google's global challenge.",
    year: "2026",
    highlight: false,
  },
  {
    title: "Participant — Invictus Hackathon",
    event: "ISTE-VESIT, Invictus",
    description:
      "Built JR-06, a PCB inventory management system with a full analytics dashboard.",
    year: "2025",
    highlight: false,
  },
  {
    title: "CGPA 9.73",
    event: "VESIT — B.E. AI & Data Science",
    description:
      "Maintained a strong academic record while actively competing in hackathons and building production-grade projects.",
    year: "2025",
    highlight: false,
  },
];

/* ─── Contact ─── */

export const contactLinks: ContactLink[] = [
  {
    label: "Email",
    href: "mailto:malavya.mankar@example.com", // placeholder
    icon: "mail",
  },
  {
    label: "GitHub",
    href: "https://github.com/malavya-mankar", // placeholder
    icon: "github",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/malavya-mankar", // placeholder
    icon: "linkedin",
  },
];

/* ─── All unique tags from projects ─── */

export const allTags: string[] = [
  "All",
  ...Array.from(new Set(projects.flatMap((p) => p.tags))),
];
