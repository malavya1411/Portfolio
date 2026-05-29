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
  coverImage?: string;
  status?: string;
  categoryTag?: string;
  dateString?: string;
  features?: string[];
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

/* ─── Site Metadata ─── */

export const siteMetadata: SiteMetadata = {
  name: "Malavya Mankar",
  role: "AI & Full-Stack Developer",
  description:
    "AI & Full-Stack Developer building intelligent, production-ready systems. First-year B.E. student in AI & Data Science at VESIT, Mumbai.",
  url: "https://malavya.dev",
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
  headline: "Building AI-powered products that solve real-world problems.",
  subheadline: "Malavya Mankar",
  description:
    "First-year AI & Data Science student at VESIT with a 9.73 CGPA, focused on full-stack systems, developer tooling, and applied AI.",
  ctaPrimary: { label: "View Projects", href: "#projects" },
  ctaSecondary: { label: "Get in Touch", href: "#contact" },
};

/* ─── About ─── */

export const aboutData: AboutData = {
  bio: [
    "I'm a first-year B.E. student in Artificial Intelligence & Data Science at VESIT, Mumbai. I focus on building intelligent software — systems that combine strong engineering fundamentals with practical AI.",
    "From autonomous onboarding agents with multi-tier RAG to real-time emergency coordination platforms, I ship production-grade projects that solve real problems. I lead AlgoMinds, a hackathon team that consistently delivers under pressure.",
    "I care about clean architecture, developer experience, and writing code that other engineers can read and maintain.",
  ],
  stats: [
    { label: "CGPA", value: "9.73", description: "First year, B.E. AI & DS" },
    { label: "5+", value: "5+", description: "Hackathons competed" },
    { label: "6+", value: "6+", description: "Production projects shipped" },
  ],
};

/* ─── Skills ─── */

export const skillGroups: SkillGroup[] = [
  {
    category: "Frontend",
    description: "Responsive, performant interfaces",
    skills: ["Next.js 15", "React", "Vite", "TypeScript", "Tailwind CSS", "Flutter"],
  },
  {
    category: "Backend",
    description: "APIs, databases, and server-side logic",
    skills: ["Node.js", "Express", "PostgreSQL", "Supabase", "Firebase", "JWT Auth"],
  },
  {
    category: "AI / ML",
    description: "Intelligence layers and applied AI",
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
    description: "DevOps, integrations, and cloud",
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

/* ─── Projects — real GitHub URLs where available ─── */

export const projects: Project[] = [
  {
    title: "OnboardAI",
    slug: "onboard-ai",
    summary:
      "Autonomous developer onboarding agent that indexes codebases, generates context-aware tasks, and integrates with GitHub, Slack, and email.",
    role: "Lead Developer",
    context: "Syrus 2026 Hackathon — Top 6 Finalist (500+ teams)",
    techStack: ["Next.js 15", "RAG", "Slack Block Kit", "Nodemailer", "GitHub API"],
    outcome:
      "Three-tier RAG architecture for codebase intelligence. Automated GitHub issue creation, Slack onboarding flows, and persona-driven checklist generation — shipped in 36 hours.",
    tags: ["AI", "Full-Stack", "DevTools"],
    github: "https://github.com/CMPN-CODECELL/Syrus2026_AlgoMinds",
    demo: null,
    badge: "Top 6 — Syrus 2026",
    featured: true,
    year: "2026",
    certificate: "/images/syrus_certificate.png",
    coverImage: "/images/onboard_ai.png",
    status: "HACKATHON",
    categoryTag: "AI SYSTEM · NEXT.JS",
    dateString: "MARCH 2026 · SYRUS 2026 HACKATHON",
    features: [
      "Three-tier RAG for codebase intelligence",
      "Automated GitHub issue creation & Slack onboarding flow",
      "Persona-driven checklist generation & team updates"
    ]
  },
  {
    title: "CrisisSync",
    slug: "crisis-sync",
    summary:
      "Real-time emergency coordination platform for hospitality venues, powered by Gemini AI and Google Maps.",
    role: "Team Lead",
    context: "Google Solution Challenge 2026",
    techStack: ["Flutter", "Firebase", "Gemini AI", "Google Maps SDK"],
    outcome:
      "End-to-end emergency response system with live location tracking, AI-driven triage recommendations, and multi-venue coordination in real time.",
    tags: ["AI", "Mobile", "Full-Stack"],
    github: "https://github.com/krishnasahoo11156/crisissync",
    demo: "https://crisissync-web-5ah5sevnmq-el.a.run.app/",
    badge: "Google Solution Challenge",
    featured: true,
    year: "2026",
    coverImage: "/images/crisis_sync.png",
    status: "GOOGLE CHALLENGE",
    categoryTag: "MOBILE · FULL STACK",
    dateString: "FEBRUARY 2026 · GOOGLE SOLUTION CHALLENGE",
    features: [
      "Real-time coordination & venue tracking",
      "AI-driven triage recommendations via Gemini AI",
      "Google Maps SDK live location updates"
    ]
  },
  {
    title: "GitStat",
    slug: "git-stat",
    summary:
      "GitHub contributor health dashboard — visualise team velocity, commit patterns, and AI-generated contributor insights.",
    role: "Lead Developer",
    context: "Hackathon — Runner-Up",
    techStack: ["React", "Vite", "Tailwind", "Node.js", "Express", "Supabase", "GitHub OAuth", "Gemini 1.5 Flash"],
    outcome:
      "Full analytics dashboard with GitHub OAuth, contributor health scoring, and AI-generated summaries. Resolved complex CORS and OAuth deployment issues at speed.",
    tags: ["Full-Stack", "AI", "DevTools"],
    github: "https://github.com/malavya1411/GitStat",
    demo: "https://git-stat-olive.vercel.app",
    badge: "Runner-Up",
    featured: true,
    year: "2026",
    certificate: "/images/unimerge_certificate.jpg",
    coverImage: "/images/git_stat.png",
    status: "RUNNER-UP",
    categoryTag: "ANALYTICS · FULL STACK",
    dateString: "DECEMBER 2025 · RUNNER-UP HACKATHON",
    features: [
      "Contributor health scoring analytics dashboard",
      "GitHub OAuth secure integration & analytics",
      "Commit velocity & team frequency charts"
    ]
  },
  {
    title: "AI Finder",
    slug: "ai-finder",
    summary:
      "Curated SaaS for discovering and comparing 80+ AI agents and tools, with intelligent search powered by Gemini.",
    role: "Solo Developer",
    context: "Personal Project",
    techStack: ["React", "TypeScript", "Vite", "Gemini API"],
    outcome:
      "80+ agent database with intelligent semantic search, rate limiting, input validation, and a refined dark-mode UI.",
    tags: ["AI", "Frontend", "SaaS"],
    github: "https://github.com/malavya1411/AI-FINDER",
    demo: null,
    badge: null,
    featured: false,
    year: "2026",
    coverImage: "/images/ai_finder.png",
    status: "COMPLETED",
    categoryTag: "FRONTEND · SAAS",
    dateString: "JANUARY 2026 · PERSONAL PROJECT",
    features: [
      "Semantic match searching via Gemini API",
      "API request rate limiting & form validation",
      "80+ AI agents directory listing"
    ]
  },
  {
    title: "Inventory Management",
    slug: "jr-06",
    summary:
      "PCB component inventory management system with role-based access, real-time analytics, and audit logging.",
    role: "Full-Stack Developer",
    context: "Invictus Hackathon, ISTE-VESIT",
    techStack: ["React", "Node.js", "Express", "PostgreSQL", "JWT", "Tailwind", "Recharts"],
    outcome:
      "Full CRUD inventory system with JWT authentication, role-based access control, and Recharts analytics dashboard.",
    tags: ["Full-Stack", "Enterprise"],
    github: "https://github.com/malavya1411/electrolyte-inventory-system",
    demo: null,
    badge: null,
    featured: false,
    year: "2025",
    coverImage: "/images/inventory_management.png",
    status: "COMPLETED",
    categoryTag: "ENTERPRISE · BACKEND",
    dateString: "NOVEMBER 2025 · INVICTUS HACKATHON",
    features: [
      "PCB inventory CRUD database system",
      "Role-based access controls via JWT",
      "Interactive data analytics using Recharts"
    ]
  },
];

/* ─── Achievements ─── */

export const achievements: Achievement[] = [
  {
    title: "Top 6 Finalist",
    event: "Syrus 2026 Hackathon",
    description:
      "Built OnboardAI — an autonomous developer onboarding agent with a three-tier RAG system — finishing in the top 6 among 500+ competing teams.",
    year: "2026",
    highlight: true,
    rank: "#6 / 500+",
    certificate: "/images/syrus_certificate.png",
  },
  {
    title: "Runner-Up",
    event: "Hackathon by Parth Narkar",
    description:
      "Built GitStat, a GitHub contributor health dashboard with AI-powered insights, OAuth integration, and production-grade deployment.",
    year: "2025",
    highlight: true,
    rank: "#2",
    certificate: "/images/unimerge_certificate.jpg",
  },
  {
    title: "Google Solution Challenge",
    event: "Google Solution Challenge 2026",
    description:
      "Led team AlgoMinds in building CrisisSync, selected for Google's global developer challenge focused on real-world impact.",
    year: "2026",
    highlight: false,
  },
  {
    title: "Invictus Hackathon",
    event: "ISTE-VESIT",
    description:
      "Competed with JR-06, a full-stack PCB inventory system with real-time analytics and role-based access control.",
    year: "2025",
    highlight: false,
  },
  {
    title: "CGPA 9.73",
    event: "VESIT — B.E. AI & Data Science",
    description:
      "Top academic record maintained while actively competing in hackathons and shipping production software.",
    year: "2024–25",
    highlight: false,
  },
  {
    title: "Successful Completion",
    event: "Hack-AI-Thon 4.0",
    description:
      "Successfully completed the 24-hour online Hack-AI-Thon 4.0 organized by AI-CoLegion, the department committee of Artificial Intelligence and Data Science at VESIT.",
    year: "2025",
    highlight: false,
    certificate: "/images/hackaithon_certificate.png",
  },
];

/* ─── Contact ─── */

export const contactLinks: ContactLink[] = [
  {
    label: "Email",
    href: "mailto:malavya.mankar@example.com", // update with real email
    icon: "mail",
  },
  {
    label: "GitHub",
    href: "https://github.com/malavya1411",
    icon: "github",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/malavya-mankar-002037382",
    icon: "linkedin",
  },
];

/* ─── Filter tags ─── */

export const allTags: string[] = [
  "All",
  ...Array.from(new Set(projects.flatMap((p) => p.tags))),
];
