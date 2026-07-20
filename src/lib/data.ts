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
    "AI & Full-Stack Developer building intelligent, production-ready systems. Second-year B.Tech student in AI & Data Science at VESIT, Mumbai.",
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
    "Second-year AI & Data Science student at VESIT with a 9.73 CGPA, focused on full-stack systems, developer tooling, and applied AI.",
  ctaPrimary: { label: "View Projects", href: "#projects" },
  ctaSecondary: { label: "Get in Touch", href: "#contact" },
};

/* ─── About ─── */

const _aboutBio = [
  "I'm a Full Stack Developer and AI Engineer specializing in React.js, Node.js, and applied AI (RAG, Gemini API). With a strong academic foundation (9.73 CGPA) and hackathon leadership experience, I build fast, production-ready systems that solve real-world problems through clean architecture and modern engineering."
];

// Placeholder — stats are assembled into aboutData after projects/achievements arrays are defined below.
// See the bottom of this file for the final aboutData export.
let aboutData: AboutData = {
  bio: _aboutBio,
  stats: [
    { label: "CGPA", value: "9.73", description: "Second year, B.Tech AI & DS" },
    { label: "Hackathons", value: "5+", description: "Hackathons competed" },
    { label: "Projects", value: "6+", description: "Production projects shipped" },
  ],
};

export { aboutData };

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
    demo: "https://hire-mind-client.vercel.app/",
    demoAvailableOnRequest: false,
    badge: "Hackathon 2026",
    featured: false,
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
    featured: false,
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
  {
    title: "CanopyML",
    slug: "canopyml",
    summary: "AI-powered satellite image land cover classification & automated deforestation detection platform.",
    role: "Solo Developer",
    context: "Personal Project",
    techStack: [
      "PyTorch",
      "FastAPI",
      "React",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "Docker",
      "Nginx",
    ],
    outcome: "Built an end-to-end deep learning platform using ResNet50 for 10-class land cover classification (EuroSAT) and temporal forest loss comparisons, featuring singleton FastAPI inference and automated PDF reports.",
    tags: ["AI/ML", "Satellite", "Python"],
    github: "https://github.com/malavya1411/CanopyML",
    demo: null,
    badge: null,
    featured: false,
    year: "2026",
    coverImage: "/images/canopyml.png",
    status: "COMPLETED",
    categoryTag: "AI PLATFORM · PYTHON",
    dateString: "JULY 2026 · PERSONAL PROJECT",
    features: [
      "ResNet50 model with two-stage transfer learning on EuroSAT dataset",
      "Temporal satellite comparison for forest loss tracking & area estimates",
      "Asynchronous FastAPI backend with singleton model loader",
      "Automated PDF reporting for forestry officials",
    ],
    caseStudy: {
      overview:
        "CanopyML is an end-to-end machine learning platform that uses deep learning (ResNet50 with transfer learning) to classify satellite imagery into 10 land cover classes and automatically detect forest loss between two time periods. It is designed to automate deforestation tracking at scale, providing interactive analysis and downloadable PDF reports.",
      problemStatement:
        "Manual monitoring of deforestation from satellite imagery is slow, human-intensive, and does not scale. Stakeholders need a way to rapidly classify land cover types and compare historical satellite scans to flag canopy loss without manual inspection of thousands of square kilometers.",
      architecture:
        "FastAPI asynchronous API backend with singleton model loading to ensure low-latency concurrent inference. The frontend is a React SPA built with Vite, TypeScript, and Tailwind CSS, featuring smooth transitions via Framer Motion. The PyTorch deep learning pipeline processes EuroSAT image datasets.",
      technicalDecisions: [
        "Two-Stage Transfer Learning — Head fine-tuning first, followed by full unfreezing, allowing the ResNet50 model to adapt to satellite domain shift without breaking pre-trained features.",
        "FastAPI with Singleton Pattern — Loaded the PyTorch model once in memory on startup, avoiding repetitive model-reloading latency on inference endpoints.",
        "PyTorch + EuroSAT (27k images) — Selected EuroSAT as it maps across 10 vital land cover classes, providing high-quality training signals for remote sensing.",
        "Asynchronous API endpoints — Designed non-blocking API routing for concurrent user uploads of high-resolution satellite imagery.",
        "Dockerized Split-Deployment — Backend containerized with Docker and Nginx and deployed on Render; frontend deployed on Vercel.",
      ],
      challenges: [
        "ImageNet to EuroSAT Domain Shift — The visual patterns in satellite imagery are vastly different from standard natural photographs, requiring custom two-stage unfreezing to prevent gradient explosion.",
        "Inference Latency & CPU Overhead — Running heavy deep learning inference on CPU-limited server hosting environments required optimize pre-processing and image-tiling.",
        "Forest Loss Precision — Separating actual canopy loss from seasonal foliage changes or cloud artifacts without ground-truth labels.",
      ],
      learnings: [
        "ImageNet-trained layers require careful freezing when fine-tuning on domain-shifted datasets like satellite photography.",
        "Singleton patterns for deep learning backends are vital to prevent CPU/memory exhaustion on serverless deployment platforms.",
        "Domain-specific remote sensing models require clean, pre-processed input grids to match training data spectral bands.",
      ],
    },
  },
  {
    title: "OrbitalWatch",
    slug: "orbital-watch",
    summary:
      "Real-time space situational awareness dashboard that tracks 40,000+ orbiting objects, calculates collision risks, and simulates launch clearances on a 3D WebGL globe.",
    role: "Solo Developer",
    context: "Hackathon Project",
    techStack: [
      "React 19",
      "Vite 6",
      "React Three Fiber",
      "Three.js",
      "FastAPI",
      "PostgreSQL",
      "Redis",
      "Socket.IO",
      "Python",
    ],
    outcome:
      "Built an open-source real-time Space Situational Awareness (SSA) platform using an APScheduler-driven Celestrak ingestion engine and SGP4 propagation algorithms, streaming telemetry at 60 FPS via Socket.IO.",
    tags: ["AI/ML", "Space", "Full-Stack"],
    github: "https://github.com/parthnarkar/OrbitalWatch",
    demo: "https://orbital-watch-bay.vercel.app/",
    demoAvailableOnRequest: false,
    badge: "Celestrak GP Ingestion",
    featured: true,
    year: "2026",
    coverImage: "/images/orbital_watch.png",
    status: "HACKATHON",
    categoryTag: "3D WEBGL · FASTAPI",
    dateString: "JUNE 2026 · HACKATHON PROJECT",
    features: [
      "Real-time propagation of 40,000+ orbiters via O(N²·T) optimized geocentric shell conjunction search funnel",
      "Interactive 3D WebGL Earth visualization utilizing React Three Fiber and InstancedMesh",
      "Launch clearance forecasts and orbital collision simulations computed off-thread via Web Workers",
      "FastAPI socket stream & Redis pub/sub carrying real-time conjunction warnings",
    ],
    caseStudy: {
      overview:
        "OrbitalWatch is a real-time Space Situational Awareness (SSA) dashboard that tracks 40,000+ orbiting objects, calculates collision risks, and evaluates launch trajectory clearances. Ingesting live TLE data from Celestrak and propagating positions with SGP4, it is designed as a free, open-source alternative to commercial space situational software that costs $10K–$100K+/year.",
      problemStatement:
        "Commercial SSA tools are priced out of reach for university labs, CubeSat operators, and independent debris researchers. Building a scalable tracking solution requires resolving heavy telemetry streaming and complex conjunction collision checks in real time without lagging the browser.",
      architecture:
        "The platform uses three decoupled tiers: a python ingestion/propagation engine, a FastAPI + Socket.IO server, and a React Three Fiber frontend. The physics engine propagates satellite coordinates using SGP4 and publishes collision risks to Redis pub/sub. A FastAPI server handles socket connections to broadcast updates, and the React client runs CPU-intensive launch clearance simulation off-thread using Web Workers.",
      technicalDecisions: [
        "APScheduler Ingestion — schedules asynchronous Celestrak GP API fetches, storing records in PostgreSQL via SQLAlchemy for tracking updates.",
        "React Three Fiber & InstancedMesh — renders thousands of satellites on a WebGL globe within a single draw call, maintaining a steady 60 FPS.",
        "Redis Pub/Sub & WebSockets — streams 5-second updates to clients concurrently without blocking database processes.",
        "Web Workers for Clearance Forecasts — delegates heavy 30-day forecast propagation to a background thread to prevent UI freezing.",
      ],
      challenges: [
        "Conjunction Search Complexity — Naively checking O(N²·T) pairs for collisions was extremely CPU-intensive. Resolved by implementing a three-stage filter: a geocentric shell filter eliminating 90% of non-colliding pairs, a coarse 10-minute scan, and a fine 1-minute refinement.",
        "Physics Library Integration — Aligning raw coordinate systems from SGP4 propagation algorithms (TEME coordinates) with Three.js 3D space.",
        "Rendering Performance — Maintaining viewport fluid interaction under high coordinate data volumes using instanced rendering.",
      ],
      learnings: [
        "Progressive filtering funnels are essential when dealing with O(N²) computational complexities in standard hardware.",
        "Web Workers are critical for heavy computational logic in modern React applications to keep the main thread responsive.",
        "Decoupling physics calculations from state presentation layers ensures backend scalability and cleaner frontend rendering loop code.",
      ],
    },
  },
  {
    title: "GigShield",
    slug: "gig-shield",
    summary:
      "Labour rights & anomaly detection platform for gig workers that tracks work events, detects wage violations, and anchors audit trails on Ethereum Sepolia.",
    role: "Lead Developer",
    context: "Smart India Hackathon (SIH)",
    techStack: [
      "Express",
      "MongoDB",
      "React 19",
      "Vite",
      "FastAPI",
      "Ethereum Sepolia",
      "Socket.IO",
      "Isolation Forest",
      "Python",
      "Node.js",
    ],
    outcome:
      "Developed a multi-role compliance platform for workers, platform operators, and regulators with wage theft anomaly detection and graceful blockchain audit trail fallback anchoring.",
    tags: ["Web3", "AI", "Full-Stack"],
    github: "https://github.com/parthnarkar/GigShield",
    demo: null,
    demoAvailableOnRequest: false,
    badge: "Smart India Hackathon",
    featured: false,
    year: "2025",
    coverImage: "/images/gig_shield.png",
    status: "HACKATHON",
    categoryTag: "COMPLIANCE · WEB3",
    dateString: "DECEMBER 2025 · SMART INDIA HACKATHON",
    features: [
      "Multi-role dashboards for workers, platform operators, and regulators with JWT role-based access",
      "Tamper-proof audit trails using decentralized hash anchoring on Ethereum Sepolia",
      "Wage and work-pattern anomaly detection powered by Isolation Forest in FastAPI",
      "Real-time labor violation alerts and live feed dashboards powered by Socket.IO",
    ],
    caseStudy: {
      overview:
        "GigShield is a labour rights protection and anomaly detection platform for gig workers, operators, and regulators. Built for the Smart India Hackathon (SIH), it tracks gig work events, automatically computes government welfare eligibility, detects wage/labor violations, and registers secure audit logs on-chain for tamper-proof evidence.",
      problemStatement:
        "Gig workers lack portable digital identity, verifiable work logs, and wage protections. Consequently, proving violations like wage theft or claiming regulatory welfare benefits is difficult due to asymmetric information controlled by large platforms.",
      architecture:
        "Three decoupled tiers: an Express.js & MongoDB backend representing core workflows, a multi-role React 19 single-page application on Vite, and an isolated FastAPI service containing the anomaly detection engine. Real-time violation updates are streamed via Socket.IO directly to regulator viewports.",
      technicalDecisions: [
        "Decoupled Anomaly Detection — Isolated the machine learning service as a FastAPI worker to avoid making it a single point of failure during standard user operations.",
        "Off-Chain Database & On-Chain Audit Funnel — Treated MongoDB as the primary data store and Ethereum Sepolia as an immutable hash anchor for tamper-proof verification rather than storing raw application logs directly on-chain.",
        "Security Middleware Stack — Applied Helmet headers, express-validator schemas, mongo-sanitize queries, and rate-limiting limits to enforce robust application boundaries.",
      ],
      challenges: [
        "Tamper-Proof Audit Traceability — Designing an immutable logging system that doesn't suffer from high transaction costs or network latency. Resolved by implementing a secure hashing pipeline that batches and anchors MongoDB state roots onto Sepolia.",
        "Multi-Role Interface Optimization — Constructing worker, platform, and regulator dashboards in a single SPA. Resolved by introducing lazy loading and chunk-splitting to keep frontend bundles small.",
      ],
      learnings: [
        "Decoupled AI layers allow graceful degradation: if the FastAPI engine goes down, the core application continues working seamlessly using database fallbacks.",
        "Blockchain anchoring is highly effective for immutable validation, but only when used as a tamper-evidence layer rather than a primary database.",
        "Security best practices (rate-limiting, input sanitization) must be treated as first-class constraints during early hackathon designs rather than added as post-scripts.",
      ],
    },
  },
  {
    title: "InboxOS",
    slug: "inbox-os",
    summary:
      "Open-source AI email operating system with a 5-layer ingestion-to-delivery pipeline that reads, classifies, and acts on emails automatically — routing alerts to WhatsApp, Slack, and Telegram.",
    role: "Co-founder & Lead Architect",
    context: "Open Source Project",
    techStack: [
      "Next.js",
      "React",
      "Express",
      "Prisma",
      "PostgreSQL",
      "Redis",
      "OpenAI",
      "Gemini",
      "Ollama",
      "WebSocket",
      "Twilio",
      "Telegram API",
    ],
    outcome:
      "Led the core build as #1 contributor (78 commits, 143K+ lines added). Shipped v1.0.0 with Gmail Pub/Sub, Outlook Graph, IMAP ingestion, provider-agnostic LLM classification, and multi-channel delivery. 12 stars, 16 forks, 408 total commits.",
    tags: ["AI", "Open Source", "Full-Stack"],
    github: "https://github.com/CodeLabsAI29/Inbox_OS",
    demo: "https://inbox-os-frontend-lqrb.vercel.app/",
    demoAvailableOnRequest: false,
    badge: "Open Source",
    featured: true,
    year: "2026",
    coverImage: "/images/inbox_os.png",
    status: "COMPLETED",
    categoryTag: "AI PIPELINE · OPEN SOURCE",
    dateString: "JULY 2026 · PERSONAL OPEN SOURCE",
    features: [
      "5-layer ingestion-to-delivery pipeline: Gmail Pub/Sub, Outlook Graph, IMAP → Parser → LLM → Rules DSL → Multi-channel delivery",
      "Provider-agnostic LLMClient with OpenAI, Gemini, and local Ollama (Llama 3/Mistral) — privacy-first, no vendor lock-in",
      "DSL-based rules engine evaluating conditions like sender_is, domain_is, priority_above with time-of-day windows",
      "Async batch classification for newsletters (gpt-4o-mini routing before expensive extraction) — cost/latency tradeoff",
    ],
    caseStudy: {
      overview:
        "InboxOS is an open-source AI email operating system built under CodeLabsAI29. Instead of another inbox client, it is a decision and execution layer: a 5-stage pipeline that reads, classifies, and acts on email — creating tasks, scheduling calendar events, and routing critical alerts to WhatsApp, Slack, or Telegram without the user touching their inbox. Shipped v1.0.0 on Jul 14, 2026, and actively maintained with 12 stars, 16 forks, and 408 total commits.",
      problemStatement:
        "The average knowledge worker receives 120+ emails/day, and most existing AI tools respond by summarizing noise rather than eliminating it. InboxOS is built on the principle that email should be handled automatically — classified, routed, and acted upon — not just filtered and displayed differently.",
      architecture:
        "A 5-layer pipeline separates concerns cleanly: Ingestion (Gmail Pub/Sub, Outlook Graph delta sync, IMAP polling with OAuth 2.0) → Parser (normalizes HTML/text to Markdown, strips signatures) → Intelligence (provider-agnostic LLMClient calling structured JSON extraction) → Rules (DSL evaluates conditions per email) → Delivery (Twilio WhatsApp, Slack webhooks, Telegram, WebSocket dashboard). This separation means new delivery channels or rules don't require touching the AI layer at all.",
      technicalDecisions: [
        "Provider-Agnostic LLMClient — Abstracts OpenAI, Gemini, and local Ollama behind one interface. Local model support is a first-class option for privacy: private email never leaves the user's machine.",
        "Classification ≠ Routing — Keeping the LLM layer (Layer 3) separate from the DSL rules engine (Layer 4) makes the system extensible. Adding Telegram delivery or a new rule type requires zero changes to the AI extraction logic.",
        "Async Batch Classification — Low-priority mail (newsletters, digests) is batched and routed through gpt-4o-mini before invoking the expensive extraction pass, cutting latency and API cost significantly.",
        "Open Source + Self-hostable from Day One — 100+ 'good first issue' tags and Hacktoberfest participation as a deliberate community-growth strategy, not incidental.",
      ],
      challenges: [
        "Multi-provider Email Ingestion — Gmail Pub/Sub push, Outlook Graph delta sync, and IMAP polling each have fundamentally different event models. Unified behind an abstract Ingestion interface to avoid divergence in downstream layers.",
        "Structured LLM Output Reliability — Enforcing consistent JSON-mode output across OpenAI, Gemini, and local models for deadline/amount/action-item extraction required per-provider schema adaptation logic.",
        "Cost-Latency Tradeoff at Scale — Running full extraction on every email was prohibitively expensive. Resolved by introducing a cheap routing classifier first, then calling the heavy extraction model only for high-priority emails.",
      ],
      learnings: [
        "Separating classification from routing is the architectural choice that makes AI systems maintainable long-term — it's the difference between 'used AI' and 'designed a system where AI is one component.'",
        "Local model support (Ollama) is not just a technical choice — it's a product positioning decision about privacy and trust that should be made early.",
        "Open-source traction requires deliberate onboarding infrastructure: good README, tagged issues, and Hacktoberfest participation generate real contributions.",
      ],
    },
  },
  {
    title: "Code Explainer",
    slug: "code-explainer",
    summary:
      "Adaptive code understanding platform that dynamically switches between four scale-tailored explanation UIs, featuring Monaco-integrated annotations, overlay comments, and interactive diagrams.",
    role: "Solo Developer",
    context: "Personal Project",
    techStack: [
      "React 19",
      "Vite",
      "Zustand",
      "Monaco Editor",
      "Framer Motion",
      "Mermaid.js",
      "Vanilla CSS",
      "jsPDF",
      "html2canvas",
    ],
    outcome:
      "Built a client-side adaptive explanation engine that scales UI layouts (from step-by-step state tracking cards to multi-file codebase explorers) based on code line counts, with Monaco gutter overlays and multi-format exports.",
    tags: ["AI", "Frontend", "Developer Tools"],
    github: "https://github.com/malavya1411/CodeExplainer",
    demo: "https://code-explainer-flame.vercel.app/",
    demoAvailableOnRequest: false,
    badge: null,
    featured: true,
    year: "2026",
    coverImage: "/images/code_explainer.png",
    status: "COMPLETED",
    categoryTag: "DEVELOPER TOOLS · AI",
    dateString: "JULY 2026 · PERSONAL PROJECT",
    features: [
      "Adaptive engine switching between four UIs based on code line counts (0-100 to 2000+ lines)",
      "Three pre-generated reading depths (30s Summary, 5m Overview, Deep Dive) to eliminate latency on toggle",
      "Monaco editor gutter annotation system to attach private inline notes",
      "Interactive Mermaid diagram generation mapping statement-to-module relationships",
      "Multi-format exports to Markdown, PDF, Notion, and HTML",
    ],
    caseStudy: {
      overview:
        "Code Explainer is an adaptive code understanding platform designed to optimize developer comprehension of files at any scale. Recognizing that a one-size-fits-all AI prompt fails to serve both a 10-line helper function and a 2,000-line module, I decided the interaction model itself needed to change with scale, not just the AI's verbosity. Rather than delivering a generic wall of text for every snippet, the system dynamically switches between four scale-tailored explanation UIs: step-by-step execution timeline cards for small snippets, complexity badges for mid-sized functions, structural flow maps for module-sized files, and entry-point explorers for codebase scale.",
      problemStatement:
        "Standard AI code explanation tools rely on fixed templates that deliver the same format of output regardless of code length, leading to information overload on larger modules or shallow summaries for small functions. Developers need a system where the interaction model itself scales with the code complexity, rather than just changing the length of text responses.",
      architecture:
        "Built purely on the frontend with React 19, Vite, and Zustand for lightweight state management, styled with modular Vanilla CSS variables for precise UI customization. Code analytics, complexity parsing, and Mermaid diagrams are computed entirely in the client browser, reducing server dependencies. Inline annotations and ghost comments are injected directly into the workspace using custom Monaco Editor gutter and line decoration layers.",
      technicalDecisions: [
        "Interaction Scaled to Code Size — Map the input line count to four distinct visualization UIs (Detailed, Chunk, Architecture, and Codebase Explorer) to ensure code representation matches structural complexity.",
        "One-Click Depth Batch-Generation — Pre-generate all three reading depths (30s Summary, 5m Overview, Deep Dive) in a single LLM request. This eliminates response latency and token costs during interactive toggling.",
        "Non-Destructive Monaco Overlays — Inject inline notes and ghost comments using Monaco's decoration layers. This overlays context directly in the editor viewport without modifying the source files.",
        "Vanilla CSS Design Tokens — Designed a fully hand-rolled styling system with custom CSS variables to handle complex layout changes and micro-animations, avoiding heavy third-party UI framework bloat.",
      ],
      challenges: [
        "Synchronizing Gutter Annotations — Ensuring that line-specific comments, editor overlays, and gutter flags remain properly positioned and aligned when developers fold, expand, or edit lines of code inside the Monaco frame.",
        "Generating Syntactically Valid Diagrams — Ensuring that dynamically structured code can be reliably parsed and represented in Mermaid.js flowcharts without encountering syntax/renderer crashes on edge-case syntax patterns.",
        "Client-Side Multi-Format Exporting — Maintaining consistent layout rendering, font sizing, and visual quality when generating PDFs via html2canvas and jsPDF directly in the browser across different device screens.",
      ],
      learnings: [
        "Adapting the visual interaction model itself to the size of the data creates a far more intuitive experience than adjusting the AI model's text length.",
        "Pre-generating and caching alternative views (depth summary, overview, deep-dive) upfront is a highly effective pattern for building instant-response AI interfaces.",
        "Using native browser decorators and standard web components is often more resilient and performant for building complex IDE-like tools than wrapping heavy external layout libraries.",
      ],
    },
  },
  {
    title: "Career Compass",
    slug: "career-compass",
    summary:
      "Career and college exploration platform for high school students featuring side-by-side comparison tools and a real-time Firestore-backed application tracker.",
    role: "Solo Developer",
    context: "Hackathon Project",
    techStack: [
      "React",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "Firebase Auth",
      "Firestore",
    ],
    outcome:
      "Designed and built a unified career mapping and college comparison MVP in a 4-day sprint, implementing Firebase authentication, a comparison layout for up to 4 schools, and a real-time Firestore-backed Kanban application status tracker.",
    tags: ["Education", "Full-Stack", "MVP"],
    github: "https://github.com/malavya1411/CareerCompass",
    demo: "https://career-compass-three-azure.vercel.app/",
    demoAvailableOnRequest: false,
    badge: null,
    featured: false,
    year: "2026",
    coverImage: "/images/career_compass.png",
    status: "HACKATHON",
    categoryTag: "EDUCATION · FULL-STACK",
    dateString: "JULY 2026 · HACKATHON PROJECT",
    features: [
      "Integrated student profile setup and authentication via Firebase Auth",
      "Career explorer linking specific job requirements to relevant college majors",
      "Comparison layout evaluating up to four colleges side by side",
      "Real-time Firestore-backed Kanban application status board",
      "Seed data automation script populating collections on first load",
    ],
    caseStudy: {
      overview:
        "CareerCompass is a career and college exploration platform built for high school students. Developed solo over a disciplined 4-day sprint, the MVP consolidates career mapping, college comparison, and application tracking into a single, cohesive interface. By linking career profiles directly to academic majors and university databases, the platform replaces fragmented spreadsheets and disparate search portals with a unified application lifecycle tracker.",
      problemStatement:
        "High school students navigating college prep typically scramble across disconnected tools, using one portal to read about jobs, another to research universities, and custom spreadsheets to track application deadlines. This disjointed process results in information silos, forgotten deadlines, and friction during the application tracking lifecycle.",
      architecture:
        "A full-stack React SPA utilizing Vite and TypeScript for type-safety, styled with Tailwind CSS for rapid responsive layout building. Firebase services manage the backend footprint: Firebase Auth handles credentials and profile data, while Firestore provides real-time state synchronization for the student's personal kanban board. Careers and colleges are modeled cleanly with automated self-seeding triggers to populate demo databases.",
      technicalDecisions: [
        "Firestore Real-Time Data Sync — Leveraged Firestore snapshot listeners on the application tracker board, allowing UI updates to trigger instantly upon card moves without polling or manual refreshes.",
        "Unified Career-to-College Linkage — Designed a clean relational schema in Firestore linking career profiles to recommended college majors and matching universities, eliminating the traditional separation between career discovery and college search.",
        "Self-Seeding Demo Utility — Implemented an automated database check that populates mock career and college documents upon first load if the Firestore collections are empty, ensuring immediate usability.",
        "Timeboxed Development Plan — Scoped and executed the project layout strictly over a 4-day sprint (Day 1: Auth & Profiles, Day 2: Explorers, Day 3: Kanban, Day 4: Polish), demonstrating disciplined MVP scoping and shipping.",
      ],
      challenges: [
        "Cross-Collection Relationships — Modeling career paths and university links in Firestore, a document-based NoSQL database, without incurring high query complexity or redundant document lookups.",
        "Kanban State Continuity — Managing board column transitions and ordering updates under high-latency network conditions, solved by optimistic state updates on the frontend before Firestore listener callback fires.",
      ],
      learnings: [
        "Timeboxed timeframes (like a 4-day sprint) demand strict scope discipline, prioritizing core workflows (auth, search, tracking) over complex tertiary features.",
        "Real-time database listeners drastically simplify state management on the client since state is kept in sync with the database automatically.",
        "Consolidating separate user flows (career search, college search, application tracking) under a single pipeline provides a significantly better user experience than separate, single-purpose apps.",
      ],
    },
  },
  {
    title: "Xenocognition Simulator",
    slug: "xenocognition-simulator",
    summary:
      "A speculative cognitive empathy machine that runs human concepts through five distinct, non-human cognitive architectures to simulate decentralized, network, and collective intelligence.",
    role: "Solo Developer",
    context: "Hackathon Project",
    techStack: [
      "TanStack Start",
      "React SSR",
      "Framer Motion",
      "Tailwind CSS",
      "shadcn/ui",
      "Nitro",
    ],
    outcome:
      "Developed a speculative cognitive emulation platform using TanStack Start and Nitro server handlers, implementing five structurally distinct non-human processing models (decentralized, network, collective, entropic, parallel) that dynamically shape visual representations and signal-to-noise metrics.",
    tags: ["Speculative Design", "AI", "R&D"],
    github: "https://github.com/malavya1411/Xenocognition-Simulator",
    demo: null,
    demoAvailableOnRequest: false,
    badge: "Conceptual R&D",
    featured: false,
    year: "2026",
    coverImage: "/images/xenocognition_simulator.png",
    status: "HACKATHON",
    categoryTag: "SPECULATIVE · HACKATHON",
    dateString: "JULY 2026 · HACKATHON PROJECT",
    features: [
      "Five custom cognitive emulation models (Octopus Mind, Mycelial Network, Hive Mind, Boltzmann Brain, Post-Human Mesh)",
      "Decentralized octopus mind consensus aggregator evaluating disjointed node biases",
      "Mycelial graph node-edge signal propagation visualizer with chemical-electrical delay modeling",
      "Hive Mind voting system with collective syntax checking flagging individualist pronouns",
      "Thermodynamic entropy calculator measuring coherence and signal-to-noise ratio in a Boltzmann Mind",
      "Post-Human mesh parallel synthesis resolving cognitive tension scores between distinct stances",
      "TanStack Start React SSR application architecture with Nitro server handlers and swallowed error normalization",
    ],
    caseStudy: {
      overview:
        "The Xenocognition Simulator is a speculative AI simulation platform and conceptual art piece dressed as software. Operating under the design thesis that 'intelligence is architectural, not universal,' the simulator runs human concepts through five distinct, non-human cognitive architectures. Rather than reskinning a single LLM prompt, it structurally alters the processing pipelines, console feeds, and output formats (such as voting lists, chemical graphs, and thermodynamic entropy metrics) to mirror decentralized, network, and collective intelligences. It is built as a cognitive empathy machine to visualize minds unlike our own.",
      problemStatement:
        "Most AI persona tools simply wrap standard LLM endpoints in superficial prompt instructions ('speak like a pirate' or 'answer as a robot'), leaving the underlying cognitive layout identical. This generic approach downplays the deep structural variations in how different minds—whether decentralized octopuses, chemical mycelium, or entropic Boltzmann states—gather information, represent identity, and achieve consensus. There is a lack of tools designed to demonstrate cognitive architecture as a variable interaction model.",
      architecture:
        "Built on a modern server-side rendering architecture using TanStack Start (React SSR) and Nitro server handlers to implement lightweight, high-performance edge execution. The system features hand-crafted Framer Motion transitions and custom visualizers tailored for each cognitive state. The backend implements Nitro server handlers, including a swallowed error normalizer to handle network irregularities, while the AI generation specs follow a custom prompt-architecture mapping detailed in the codebase docs.",
      technicalDecisions: [
        "Speculative Processing Pipelines — Designed five completely separate backend handlers representing distinct mental frameworks (e.g., Hive Mind aggregates 200 votes and filters individualistic pronouns as syntax errors; Octopus Mind runs 8 parallel biased nodes; Boltzmann Brain calculates entropy formulas).",
        "TanStack Start SSR Architecture — Stepped outside of typical SPA patterns to implement server-side rendering using TanStack Start, enabling fast initial loads, robust meta tags, and high-performance server functions.",
        "Structural Output Formats — Tailored the UI components to match the cognitive model, using d3-like node graphs for mycelial signal propagation, numerical tally sheets for collective voting, and chaotic terminal overlays for entropic states.",
        "Swallowed Error Normalization — Implemented a Nitro server-side error normalizer that intercepts and formats AI parsing issues gracefully, turning raw backend stack traces into coherent, simulation-safe cognitive anomalies.",
      ],
      challenges: [
        "Prompt-to-Structure Synchronicity — Developing LLM prompts that generate complex, structured JSON payloads conforming to biological/physical constraints (such as voting records or node-edge schemas) without experiencing validation failures during rendering.",
        "Decentralized Consensus Aggregation — Orchestrating and parsing parallel independent LLM calls for the octopus nodes, and aggregating their conflicting outputs into a unified yet shifting consensus without causing unacceptable network latency.",
      ],
      learnings: [
        "AI persona generation is vastly more convincing when the structural processing pipelines and layout interfaces adapt to the concept, rather than just changes in textual tone.",
        "Designing conceptual, speculative R&D software allows for deep exploration of novel full-stack tech stacks (like TanStack Start and Nitro server handlers) with higher risk tolerance than traditional business utility applications.",
        "Representing complex philosophical constraints (like the removal of self-identity) through mechanics (pronoun syntax validation checks) makes abstract ideas tangible and engaging to interact with.",
      ],
    },
  },
  {
    title: "Code Scope",
    slug: "code-scope",
    summary:
      "Offline static analysis tool for VS Code providing deep architectural and complexity insights using pure local AST parsing and directed graphs.",
    role: "Solo Developer",
    context: "Personal Project",
    techStack: [
      "TypeScript",
      "VS Code Extension API",
      "TypeScript Compiler API",
    ],
    outcome:
      "Developed a local-first VS Code extension leveraging the TypeScript Compiler API to analyze source code ASTs, compute Cyclomatic and Cognitive complexity scores, and visualize file dependencies without cloud APIs or network requests.",
    tags: ["TypeScript", "Developer Tools", "VS Code"],
    github: "https://github.com/malavya1411/CodeScope",
    demo: null,
    demoAvailableOnRequest: false,
    badge: "VS Code Extension",
    featured: false,
    year: "2026",
    coverImage: "/images/code_scope.png",
    status: "COMPLETED",
    categoryTag: "DEVELOPER TOOLS · EXTENSION",
    dateString: "JULY 2026 · PERSONAL PROJECT",
    features: [
      "Local AST parsing and graph analysis utilizing the TypeScript Compiler API",
      "Interactive dependency visualization displaying internal imports and circular references",
      "Complexity ranking tracking both Cyclomatic (control flow paths) and Cognitive (readability/logical nesting) scores",
      "Per-function Control Flow Graph rendering loops, branch logic, and return patterns",
      "Call hierarchy visualizer tracing bidirectional function execution trees",
      "Privacy-by-design architecture with zero cloud or API-related network requests",
    ],
    caseStudy: {
      overview:
        "CodeScope is an offline static analysis VS Code extension that enables developers to understand codebase architecture and metrics. In contrast to generative AI-based explainers, CodeScope takes a deterministic, privacy-first approach. By parsing code locally using the TypeScript Compiler API, it maps file dependencies, flags circular references, and ranks function complexity without sending any data over the internet. CodeScope is distributed as packaged .vsix releases.",
      problemStatement:
        "AI-based code understanding tools are prone to hallucinations, require internet connectivity, and raise privacy issues when scanning proprietary code. Furthermore, developers checking for architectural problems like circular imports or high function complexity need deterministic, repeatable metrics, not changing text summaries.",
      architecture:
        "A local-first VS Code extension running entirely client-side on the developer's machine. It uses the TypeScript Compiler API to extract Abstract Syntax Trees (ASTs) from active file buffers and project directories. It builds internal directed graph structures to track call hierarchies and file imports. Interactive visualizations are rendered locally inside a VS Code Webview panel.",
      technicalDecisions: [
        "AST-Based Static Analysis — Chose deterministic parser logic using the TypeScript Compiler API over LLM text generators, guaranteeing 100% reproducible results and absolute privacy.",
        "Dual Complexity Metric System — Calculated both Cyclomatic complexity (quantifying branches/decisions) and Cognitive complexity (measuring logical nesting difficulty) to generate a realistic risk index.",
        "Offline-First Execution — Designed the package to run completely locally, eliminating cloud dependencies, API endpoints, and credential storage.",
        "Manual .vsix Distribution — Packaged and distributed the extension as standalone .vsix releases (v1.0.0 through v1.0.3), enabling local testing and secure enterprise distribution.",
      ],
      challenges: [
        "Performance of Project-Wide AST Parsing — Scanning multi-file directory structures inside VS Code without blocking the main editor thread, solved by offloading the TypeScript Compiler API scans to a background worker.",
        "Circular Reference Resolution — Detecting deep circular dependency loops across dynamic imports and resolving them into clean visual layouts inside the Webview panel.",
      ],
      learnings: [
        "Pairing deterministic static analysis with generative AI tools creates a stronger developer toolset, using ASTs for exact structure and LLMs for contextual explanations.",
        "Offline-first architectures build user trust by making privacy a structural guarantee of the code rather than a policy promise.",
        "Tightly-scoped developer extensions with clear, focused utility are often more reliable and easier to iterate on than sprawling, multi-purpose platforms.",
      ],
    },
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
    year: "2026",
    highlight: true,
    rank: "#2",
    certificate: "/images/unimerge_certificate.jpg",
  },
  {
    title: "100K Milestone Honor",
    event: "CampusCrew",
    description:
      "Recognized for being an integral part of the CampusCrew journey and contributing to a community that has grown to 100,000+ students worldwide.",
    year: "2026",
    highlight: false,
    certificate: "/images/campuscrew_100k_milestone.jpg",
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
      "A full-stack PCB inventory system with real-time analytics and role-based access control.",
    year: "2026",
    highlight: false,
  },
  {
    title: "CGPA 9.73",
    event: "VESIT — B.Tech AI & Data Science",
    description:
      "Top academic record maintained while actively competing in hackathons and shipping production software.",
    year: "2025–26",
    highlight: false,
  },
  {
    title: "Successful Completion",
    event: "Hack-AI-Thon 4.0",
    description:
      "Successfully completed the 24-hour online Hack-AI-Thon 4.0 organized by AI-CoLegion, the department committee of Artificial Intelligence and Data Science at VESIT.",
    year: "2026",
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

/* ─── Computed Stats (single source of truth) ─── */
// Re-assign aboutData.stats so counts are always derived from the actual data arrays.
// projectCount = total projects; hackathonCount = unique hackathons competed.
const _projectCount = projects.length;

const getHackathonsCount = () => {
  const keys = new Set<string>();

  // Extract from achievements
  achievements.forEach((a) => {
    const text = `${a.title} ${a.event} ${a.description}`.toLowerCase();
    if (
      text.includes("hackathon") || 
      text.includes("challenge") || 
      text.includes("hack-ai-thon")
    ) {
      if (text.includes("syrus")) keys.add("syrus");
      else if (text.includes("unimerge")) keys.add("unimerge");
      else if (text.includes("summer")) keys.add("summer-hackathon");
      else if (text.includes("solution challenge")) keys.add("solution-challenge");
      else if (text.includes("invictus")) keys.add("invictus");
      else if (text.includes("hack-ai-thon")) keys.add("hack-ai-thon");
      else {
        const name = a.event.toLowerCase().includes("hackathon") ? a.event : a.title;
        keys.add(name.toLowerCase().trim());
      }
    }
  });

  // Extract from projects
  projects.forEach((p) => {
    const isHack =
      p.status === "HACKATHON" ||
      p.status === "RUNNER-UP" ||
      p.status === "GOOGLE CHALLENGE" ||
      p.context.toLowerCase().includes("hackathon") ||
      (p.badge && p.badge.toLowerCase().includes("hackathon"));

    if (isHack) {
      const text = `${p.title} ${p.context} ${p.badge || ""}`.toLowerCase();
      if (text.includes("syrus")) keys.add("syrus");
      else if (text.includes("unimerge")) keys.add("unimerge");
      else if (text.includes("summer")) keys.add("summer-hackathon");
      else if (text.includes("solution challenge")) keys.add("solution-challenge");
      else if (text.includes("invictus")) keys.add("invictus");
      else if (text.includes("hack-ai-thon")) keys.add("hack-ai-thon");
      else {
        keys.add(p.context.split("—")[0].trim().toLowerCase());
      }
    }
  });

  return keys.size;
};

const _hackathonCount = getHackathonsCount();

aboutData = {
  bio: _aboutBio,
  stats: [
    { label: "CGPA", value: "9.73", description: "Second year, B.Tech AI & DS" },
    {
      label: "Hackathons",
      value: `${_hackathonCount}+`,
      description: "Hackathons competed",
    },
    {
      label: "Projects",
      value: `${_projectCount}+`,
      description: "Production projects shipped",
    },
  ],
};

