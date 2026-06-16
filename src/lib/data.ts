/* ─── Project Status Type ─── */

export type ProjectStatus =
  | "COMPLETED"
  | "IN_PROGRESS"
  | "PLANNED"
  | "HACKATHON"
  | "RUNNER-UP"
  | "GOOGLE CHALLENGE";

/* ─── Skill Tier ─── */
export type SkillTier = "primary" | "secondary";

/* ─── Case Study Fields ─── */
export interface CaseStudySection {
  overview?: string;
  problemStatement?: string;
  architecture?: string;
  technicalDecisions?: string[];
  challenges?: string[];
  learnings?: string[];
  screenshots?: string[];
}

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

export interface Skill {
  name: string;
  tier: SkillTier;
}

export interface SkillGroup {
  category: string;
  description: string;
  skills: string[];
  skillsWithTier?: Skill[];
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
  demoAvailableOnRequest?: boolean;
  isPrivateRepo?: boolean;
  badge: string | null;
  featured: boolean;
  year: string;
  certificate?: string;
  coverImage?: string;
  status?: ProjectStatus;
  categoryTag?: string;
  dateString?: string;
  features?: string[];
  caseStudy?: CaseStudySection;
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
    "I'm a first-year B.E. student in Artificial Intelligence & Data Science at VESIT, Mumbai. I'm a Full Stack Developer focused on building intelligent software — combining strong web development fundamentals with applied AI and modern JavaScript ecosystems.",
    "I specialize in React.js, Node.js, Express.js, and PostgreSQL — building end-to-end systems that are fast, maintainable, and production-ready. From autonomous developer-onboarding agents with multi-tier RAG to real-time emergency coordination platforms, I ship software that solves real problems.",
    "As a hackathon participant and software engineer, I lead AlgoMinds — a team that has placed in the top 6 at Syrus 2026 (500+ teams) and won runner-up at a national hackathon. I care deeply about clean architecture, developer experience, and writing code that other engineers can read and maintain.",
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
    skillsWithTier: [
      { name: "React", tier: "primary" },
      { name: "Next.js 15", tier: "primary" },
      { name: "TypeScript", tier: "primary" },
      { name: "Tailwind CSS", tier: "primary" },
      { name: "Vite", tier: "secondary" },
      { name: "Flutter", tier: "secondary" },
    ],
  },
  {
    category: "Backend",
    description: "APIs, databases, and server-side logic",
    skills: ["Node.js", "Express", "PostgreSQL", "Supabase", "Firebase", "JWT Auth"],
    skillsWithTier: [
      { name: "Node.js", tier: "primary" },
      { name: "Express", tier: "primary" },
      { name: "PostgreSQL", tier: "primary" },
      { name: "Supabase", tier: "secondary" },
      { name: "Firebase", tier: "secondary" },
      { name: "JWT Auth", tier: "secondary" },
    ],
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
    skillsWithTier: [
      { name: "Gemini API", tier: "primary" },
      { name: "RAG Systems", tier: "primary" },
      { name: "Prompt Engineering", tier: "primary" },
      { name: "Vector Embeddings", tier: "secondary" },
      { name: "MediaPipe", tier: "secondary" },
      { name: "Persona Detection", tier: "secondary" },
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
    skillsWithTier: [
      { name: "Vercel", tier: "primary" },
      { name: "GitHub OAuth", tier: "primary" },
      { name: "Render", tier: "secondary" },
      { name: "Nodemailer / SMTP", tier: "secondary" },
      { name: "Slack Block Kit", tier: "secondary" },
      { name: "Google Maps SDK", tier: "secondary" },
    ],
  },
];

/* ─── Projects — real GitHub URLs where available ─── */

export const projects: Project[] = [
  {
    title: "HireMind",
    slug: "hiremind",
    summary:
      "AI-powered hiring intelligence platform that combines explainable AI, skill-gap analysis, GitHub profiling, LeetCode evaluation, and blind screening.",
    role: "Lead Developer",
    context: "Summer Hackathon 2026 — AI-Powered Resume Screening & Candidate Ranking System (Problem Statement 3)",
    techStack: [
      "React",
      "TypeScript",
      "Vite",
      "Express",
      "Firebase Auth",
      "Firestore",
      "Firebase Storage",
      "Featherless AI",
      "React Query",
      "Zustand",
    ],
    outcome:
      "Developed a complete AI recruitment platform featuring resume parsing, job description intelligence, explainable candidate ranking, GitHub/LeetCode analysis, blind screening, and hiring analytics dashboards.",
    tags: ["AI", "Full-Stack", "HRTech"],
    github: "https://github.com/malavya1411/HireMind",
    demo: null,
    demoAvailableOnRequest: true,
    badge: "Hackathon 2026",
    featured: true,
    year: "2026",
    certificate: "/images/hiremind_certificate.jpg",
    coverImage: "/images/hiremind.png",
    status: "HACKATHON",
    categoryTag: "AI PLATFORM · REACT",
    dateString: "JUNE 2026 · SUMMER HACKATHON 2026",
    features: [
      "Explainable AI candidate ranking and recommendations",
      "Multi-source profile evaluation (Resume + GitHub + LeetCode)",
      "Blind screening mode to eliminate unconscious bias",
      "Interactive skill-gap visualization & recruiter feedback loops",
    ],
    caseStudy: {
      overview:
        "HireMind is an AI-powered hiring intelligence platform designed to move recruiters beyond traditional, manual resume screening. Developed for the Summer Hackathon 2026, it addresses the challenges of manual sorting and lack of transparency in traditional Applicant Tracking Systems (ATS) by introducing explainable AI, skill-gap heatmaps, and multi-source profiling.",
      problemStatement:
        "Recruiters spend hours manually scanning resumes, while standard ATS solutions offer opaque ranking scores without context. This lack of transparency and visual analysis leads to bias, missed candidates, and inefficient screening workflows.",
      architecture:
        "React + TypeScript frontend built with Vite, connected to an Express.js backend through REST APIs. Firebase Authentication handles role-based access control (Recruiter, Hiring Manager, Admin), Firestore stores candidate and application data, and Firebase Storage hosts uploaded resumes. AI evaluations are powered by Featherless AI, and React Query + Zustand manage application and server states.",
      technicalDecisions: [
        "Firebase Authentication instead of custom auth — accelerated development while providing secure role-based access control.",
        "Firestore over relational databases — enabled rapid iteration on candidate and recruiter data models during hackathon development.",
        "Featherless AI for candidate evaluation — provided explainable AI-generated ranking and recommendation workflows.",
        "Blind Screening Mode — intentionally hides personally identifiable information (PII) to reduce unconscious bias during candidate evaluation.",
        "Multi-source Candidate Analysis — combines resume content, GitHub activity, and LeetCode performance for more holistic hiring decisions.",
        "React Query + Zustand — separated server-state management from application state, improving frontend scalability and responsiveness.",
      ],
      challenges: [
        "Resume Parsing Accuracy — extracting structured information from varied PDF and DOCX formats required robust parsing and validation logic.",
        "Explainable AI Recommendations — generating recruiter-friendly explanations while maintaining ranking consistency across candidates.",
        "Candidate Ranking Fairness — balancing resume data with external developer signals such as GitHub and LeetCode profiles without introducing bias.",
        "Blind Screening Implementation — ensuring sensitive candidate information remained hidden while preserving enough context for evaluation.",
        "Multi-source Data Aggregation — normalizing data from resumes, GitHub, and coding platforms into a unified scoring model.",
      ],
      learnings: [
        "Explainability is often more valuable to recruiters than raw AI scores because it builds trust in automated decisions.",
        "Blind screening mechanisms can significantly improve fairness without reducing evaluation quality.",
        "Combining multiple candidate signals (resume, GitHub, coding profiles) produces more reliable assessments than resume-only screening.",
        "Firebase enables rapid deployment of authentication, storage, and database functionality, making it highly effective for hackathon-scale products.",
        "Separating AI analysis, ranking logic, and recruiter feedback loops creates a foundation for continuously improving hiring recommendations over time.",
      ],
    },
  },
  {
    title: "OnboardAI",
    slug: "onboard-ai",
    summary:
      "Autonomous developer onboarding agent that indexes codebases, generates context-aware tasks, and integrates with GitHub, Slack, and email.",
    role: "Lead Developer",
    context: "Syrus 2026 Hackathon — Top 6 Finalist",
    techStack: ["Next.js 15", "RAG", "Slack Block Kit", "Nodemailer", "GitHub API"],
    outcome:
      "Three-tier RAG architecture for codebase intelligence. Automated GitHub issue creation, Slack onboarding flows, and persona-driven checklist generation — shipped in 36 hours.",
    tags: ["AI", "Full-Stack", "DevTools"],
    github: "https://github.com/CMPN-CODECELL/Syrus2026_AlgoMinds",
    demo: null,
    demoAvailableOnRequest: false,
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
      "Persona-driven checklist generation & team updates",
    ],
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
    dateString: "APRIL 2026 · GOOGLE SOLUTION CHALLENGE",
    features: [
      "Real-time coordination & venue tracking",
      "AI-driven triage recommendations via Gemini AI",
      "Google Maps SDK live location updates",
    ],
  },
  {
    title: "GitStat",
    slug: "git-stat",
    summary:
      "GitHub contributor health dashboard — visualise team velocity, commit patterns, and AI-generated contributor insights.",
    role: "Lead Developer",
    context: "Unimerge Hackathon — Runner-Up",
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
    dateString: "APRIL 2026 · UNIMERGE HACKATHON",
    features: [
      "Contributor health scoring analytics dashboard",
      "GitHub OAuth secure integration & analytics",
      "Commit velocity & team frequency charts",
    ],
    caseStudy: {
      overview:
        "GitStat is a GitHub contributor health dashboard built to surface team velocity, burnout signals, and AI-generated insights about individual contributors. It was built under hackathon conditions (36 hours) and later shipped to production at git-stat-olive.vercel.app.",
      problemStatement:
        "Engineering teams lack real-time visibility into contributor health and code velocity. Burnout often goes undetected until it's too late. GitStat addresses this by aggregating GitHub activity data into an actionable health score per contributor.",
      architecture:
        "React + Vite SPA on the frontend, Express + Node.js REST API on the backend (deployed to Render). GitHub OAuth handles secure authentication. Supabase (PostgreSQL) stores user sessions and cached contributor data. Gemini 1.5 Flash generates AI summaries of contributor activity.",
      technicalDecisions: [
        "GitHub OAuth instead of PAT tokens — ensures user-scoped data access without exposing repo secrets",
        "Supabase for auth session storage — avoided rolling a custom session layer under time pressure",
        "Gemini 1.5 Flash over GPT-4 — cost-free tier with sufficient context window for contributor summaries",
        "Vite over CRA — faster cold starts during iterative hackathon development",
        "Express CORS middleware configured per-origin — required to allow the Vercel frontend to call the Render backend across different domains",
      ],
      challenges: [
        "CORS errors between Vercel-deployed frontend and Render-deployed backend — resolved by adding dynamic origin allowlist in Express CORS config",
        "GitHub OAuth redirect URI mismatch in production — production callback URL was not registered, required adding the Vercel domain to GitHub OAuth App settings",
        "GitHub API rate limits — implemented response caching in Supabase to avoid repeated calls within the same session",
        "Burnout prediction heuristic — designed a composite scoring function based on commit frequency variance, PR merge latency, and review-to-commit ratio",
      ],
      learnings: [
        "OAuth callback URIs must be registered for every deployment environment — staging and production need separate entries",
        "CORS debugging is significantly easier with structured logging on the Express layer",
        "Hackathon deployments benefit from keeping frontend and backend on the same domain or using a reverse proxy",
        "Gemini's API quota is generous enough for demo-scale AI features at zero cost",
      ],
    },
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
    demoAvailableOnRequest: true,
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
      "80+ AI agents directory listing",
    ],
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
    demoAvailableOnRequest: false,
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
      "Interactive data analytics using Recharts",
    ],
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
    event: "Unimerge Hackathon",
    description:
      "Built GitStat, a GitHub contributor health dashboard with AI-powered insights, OAuth integration, and production-grade deployment.",
    year: "2025",
    highlight: true,
    rank: "#2",
    certificate: "/images/unimerge_certificate.jpg",
  },
  {
    title: "Hackathon Participant",
    event: "Summer Hackathon 2026",
    description:
      "Successfully built HireMind — an AI-powered hiring intelligence platform combining explainable AI, skill-gap analysis, and blind screening.",
    year: "2026",
    highlight: false,
    certificate: "/images/hiremind_certificate.jpg",
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
    href: "mailto:malavyamankar@gmail.com",
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
  {
    label: "Devpost",
    href: "https://devpost.com/malavya1411",
    icon: "devpost",
  },
  {
    label: "LeetCode",
    href: "https://leetcode.com/u/Malavya_Mankar/",
    icon: "leetcode",
  },
];

/* ─── Filter tags ─── */

export const allTags: string[] = [
  "All",
  ...Array.from(new Set(projects.flatMap((p) => p.tags))),
];
