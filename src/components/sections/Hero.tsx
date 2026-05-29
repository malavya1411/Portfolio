"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { ArrowRight, MapPin, Users } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { heroData, projects } from "@/lib/data";
import { StarBorder } from "@/components/ui/StarBorder";

const TYPING_PHRASES = [
  "AI & Full-Stack Developer",
  "Hackathon Finalist",
  "RAG Systems Builder",
  "AlgoMinds Lead",
];

function useTypingEffect(phrases: string[], speed = 60, pause = 1800) {
  const [displayed, setDisplayed] = useState("");
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[phraseIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => setCharIdx((c) => c + 1), speed);
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx((c) => c - 1), speed / 2.2);
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setPhraseIdx((i) => (i + 1) % phrases.length);
    }

    setDisplayed(current.slice(0, charIdx));
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, phraseIdx, phrases, speed, pause]);

  return displayed;
}

function useMouseParallax() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      mouseX.set((e.clientX - cx) / cx);
      mouseY.set((e.clientY - cy) / cy);
    };
    window.addEventListener("mousemove", handler, { passive: true });
    return () => window.removeEventListener("mousemove", handler);
  }, [mouseX, mouseY]);

  return { smoothX, smoothY };
}

export function Hero() {
  const typed = useTypingEffect(TYPING_PHRASES);

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">

      {/* Scanlines overlay */}
      <div className="scanlines" />

      {/* Parallax background layer — subtle dot field */}
      <motion.div
        className="pointer-events-none absolute inset-[-8%] z-0"
      >
        <svg className="w-full h-full opacity-[0.07]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hero-dot" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1.2" fill="currentColor" className="text-accent" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-dot)" />
        </svg>
      </motion.div>

      {/* Soft accent radial — one, very muted */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-[0.06] z-0"
        style={{ background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)", filter: "blur(80px)" }}
      />

      <Container className="relative z-10 pt-28 pb-20 lg:pt-36 lg:pb-28">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-10">

          {/* ── Left: Text ── */}
          <motion.div>

            {/* Name tag */}
            <motion.div
              className="mb-5 inline-flex items-center gap-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <span className="h-px w-6 bg-accent" />
              <span className="section-label" style={{ marginBottom: 0 }}>
                Malavya Mankar
              </span>
            </motion.div>

            {/* Big headline */}
            <motion.h1
              className="text-[2.5rem] font-bold leading-[1.13] tracking-tight text-text-primary sm:text-5xl lg:text-[3.4rem]"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08, ease: "easeOut" }}
            >
              {heroData.headline}
            </motion.h1>

            {/* Typing line */}
            <motion.div
              className="mt-6 flex items-center min-h-[2rem]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.35 }}
            >
              <span className="text-lg font-medium text-text-secondary sm:text-xl">{typed}</span>
              <span className="typing-cursor" />
            </motion.div>

            {/* Description */}
            <motion.p
              className="mt-4 text-base leading-relaxed text-text-secondary max-w-[480px]"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.45, ease: "easeOut" }}
            >
              {heroData.description}
            </motion.p>

            {/* Meta pills */}
            <motion.div
              className="mt-5 flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.55, ease: "easeOut" }}
            >
              {[
                { icon: <MapPin size={12} />, text: "Mumbai, India" },
                { icon: <Users size={12} />, text: "AlgoMinds" },
                { icon: null, text: "CGPA 9.73" },
              ].map(({ icon, text }) => (
                <span
                  key={text}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border-t px-3 py-1 text-xs font-medium text-text-secondary"
                >
                  {icon && <span className="text-accent">{icon}</span>}
                  {text}
                </span>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              className="mt-9 flex flex-wrap items-center gap-3"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.65, ease: "easeOut" }}
            >
              <StarBorder
                as="a"
                href={heroData.ctaPrimary.href}
                className="hover:scale-[0.98] active:scale-95 transition-all duration-200"
                speed="5s"
                thickness={1.5}
              >
                <span className="flex items-center gap-2 font-semibold text-sm">
                  {heroData.ctaPrimary.label}
                  <ArrowRight size={15} />
                </span>
              </StarBorder>
              <a
                href={heroData.ctaSecondary.href}
                className="inline-flex items-center gap-2 rounded-[14px] border border-border-t px-7 py-3.5 text-sm font-medium text-text-secondary transition-all duration-200 hover:text-text-primary hover:border-border-strong hover:scale-[0.98]"
              >
                {heroData.ctaSecondary.label}
              </a>
            </motion.div>
          </motion.div>

          {/* ── Right: Featured card with entry animation ── */}
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: "easeOut" }}
          >
            <HeroProjectCard />
          </motion.div>

        </div>
      </Container>
    </section>
  );
}

function GitStatHeroVisual() {
  const bars = [24, 45, 18, 55, 38, 85, 42, 60, 48, 70, 32, 50, 68];
  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 480 192" fill="none" preserveAspectRatio="xMidYMid slice">
      <pattern id="gs-hero-grid" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
        <circle cx="0.5" cy="0.5" r="0.8" fill="var(--border-strong)" opacity="0.8" />
      </pattern>
      <rect width="100%" height="100%" fill="url(#gs-hero-grid)" />
      
      {bars.map((h, i) => (
        <rect
          key={i}
          x={50 + i * 28}
          y={140 - h}
          width="16"
          height={h}
          rx="3"
          fill={i === 5 ? "var(--accent)" : "var(--text-secondary)"}
          opacity={i === 5 ? 0.9 : 0.25}
        />
      ))}
      <circle cx={50 + 5 * 28 + 8} cy={140 - 85} r="16" stroke="var(--accent)" strokeWidth="0.8" opacity="0.25" />
      <circle cx={50 + 5 * 28 + 8} cy={140 - 85} r="6" fill="var(--accent)" opacity="0.9" />

      <path
        d="M 58 130 Q 120 70 218 80 T 362 50"
        stroke="var(--accent)"
        strokeWidth="1.5"
        fill="none"
        opacity="0.3"
        strokeDasharray="4 2"
      />

      <text x="16" y="178" fontSize="9" fill="var(--text-tertiary)" fontFamily="monospace" opacity="0.8">
        React · Vite · Node.js · Express · Supabase · GitHub OAuth · Gemini 1.5 Flash
      </text>
    </svg>
  );
}

function OnboardAiHeroVisual() {
  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 480 192" fill="none" preserveAspectRatio="xMidYMid slice">
      <pattern id="hero-grid" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
        <circle cx="0.5" cy="0.5" r="0.8" fill="var(--border-strong)" opacity="0.8" />
      </pattern>
      <rect width="100%" height="100%" fill="url(#hero-grid)" />

      {[
        { x: 60,  y: 96, label: "Codebase",   sub: "Tier 1" },
        { x: 200, y: 50, label: "Embeddings", sub: "Tier 2" },
        { x: 200, y: 96, label: "Context",    sub: "Tier 2" },
        { x: 200, y: 142,label: "Persona",    sub: "Tier 2" },
        { x: 340, y: 60, label: "GitHub",     sub: "Output" },
        { x: 340, y: 96, label: "Slack",      sub: "Output" },
        { x: 340, y: 132,label: "Email",      sub: "Output" },
      ].map((n, i) => (
        <g key={i}>
          {i > 0 && i < 4 && (
            <line x1="80" y1="96" x2={n.x - 20} y2={n.y} stroke="var(--accent)" strokeWidth="0.8" opacity="0.3" strokeDasharray="4 3" />
          )}
          {i >= 4 && (
            <line x1="220" y1={[50,96,142][i-4]} x2={n.x - 20} y2={n.y} stroke="var(--text-secondary)" strokeWidth="0.8" opacity="0.25" strokeDasharray="4 3" />
          )}
          <rect x={n.x - 20} y={n.y - 12} width={n.label.length * 7 + 16} height="24" rx="4" fill="var(--surface)" stroke="var(--border-strong)" strokeWidth="0.7" />
          <text x={n.x - 12} y={n.y + 4} fontSize="8.5" fill={i === 0 ? "var(--accent)" : "var(--text-secondary)"} fontFamily="monospace">{n.label}</text>
        </g>
      ))}

      <circle cx="80" cy="96" r="8" fill="var(--accent)" opacity="0.85" />
      <circle cx="80" cy="96" r="16" stroke="var(--accent)" strokeWidth="0.8" opacity="0.25" />
      <circle cx="80" cy="96" r="24" stroke="var(--accent)" strokeWidth="0.5" opacity="0.12" />

      <text x="16" y="178" fontSize="9" fill="var(--text-tertiary)" fontFamily="monospace" opacity="0.8">
        Next.js 15 · RAG · Slack Block Kit · GitHub API · Nodemailer
      </text>
    </svg>
  );
}

function CrisisSyncHeroVisual() {
  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 480 192" fill="none" preserveAspectRatio="xMidYMid slice">
      <pattern id="cs-hero-grid" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
        <circle cx="0.5" cy="0.5" r="0.8" fill="var(--border-strong)" opacity="0.8" />
      </pattern>
      <rect width="100%" height="100%" fill="url(#cs-hero-grid)" />
      
      <circle cx="240" cy="96" r="54" stroke="var(--accent)" strokeWidth="1" opacity="0.12" />
      <circle cx="240" cy="96" r="32" stroke="var(--accent)" strokeWidth="1" opacity="0.22" />
      <circle cx="240" cy="96" r="6" fill="var(--accent)" opacity="0.95" />
      
      {[
        { x: 170, y: 60, r: 4 },
        { x: 310, y: 70, r: 3 },
        { x: 190, y: 140, r: 3.5 },
        { x: 290, y: 130, r: 4 },
      ].map((pt, i) => (
        <g key={i}>
          <circle cx={pt.x} cy={pt.y} r={pt.r} fill="var(--text-secondary)" opacity="0.6" />
          <line x1="240" y1="96" x2={pt.x} y2={pt.y} stroke="var(--accent)" strokeWidth="0.8" opacity="0.3" strokeDasharray="3 3" />
        </g>
      ))}

      <path
        d="M 120 96 C 170 60, 310 132, 360 96"
        stroke="var(--accent)"
        strokeWidth="1.2"
        fill="none"
        opacity="0.25"
      />

      <text x="16" y="178" fontSize="9" fill="var(--text-tertiary)" fontFamily="monospace" opacity="0.8">
        Flutter · Firebase · Gemini AI · Google Maps SDK
      </text>
    </svg>
  );
}

const HERO_PROJECTS = [
  {
    title: "GitStat",
    path: "git-stat / analytics",
    badge: "Runner-Up",
    summary: "GitHub contributor health dashboard — visualise team velocity, commit patterns, and AI-generated contributor insights.",
    stats: "Contributor health · GitHub OAuth",
    visual: <GitStatHeroVisual />,
  },
  {
    title: "OnboardAI",
    path: "onboard-ai / architecture",
    badge: "Top 6 · Syrus 2026",
    summary: "Autonomous developer onboarding agent. Three-tier RAG for codebase intelligence, GitHub issue creation, Slack flows, and persona-driven checklists.",
    stats: "Built in 36h · 500+ teams",
    visual: <OnboardAiHeroVisual />,
  },
  {
    title: "CrisisSync",
    path: "crisis-sync / emergency-api",
    badge: "Google Solution Challenge",
    summary: "Real-time emergency response platform. Live location tracking, AI-driven triage recommendations, and venue coordination in real time.",
    stats: "Real-time · Firebase · Gemini AI",
    visual: <CrisisSyncHeroVisual />,
  },
];

function HeroProjectCard() {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % HERO_PROJECTS.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  const project = HERO_PROJECTS[activeIdx];

  return (
    <div className="card card-trace bracket-tl bracket-br overflow-hidden h-[378px] flex flex-col">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIdx}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.28, ease: "easeInOut" }}
          className="flex flex-col flex-1"
        >
          {/* Header */}
          <div className="border-b border-border-t px-6 py-3.5 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <div className="h-2.5 w-2.5 rounded-full bg-red-400/60" />
              <div className="h-2.5 w-2.5 rounded-full bg-yellow-400/60" />
              <div className="h-2.5 w-2.5 rounded-full bg-green-400/60" />
              <span className="ml-3 text-xs font-medium text-text-tertiary" style={{ fontFamily: "monospace" }}>
                {project.path}
              </span>
            </div>
            {project.badge && (
              <span className="rounded-full bg-accent/10 px-2.5 py-0.5 text-[10px] font-bold text-accent border border-accent/20 tracking-wide uppercase">
                {project.badge}
              </span>
            )}
          </div>

          {/* Visual area */}
          <div className="relative overflow-hidden bg-elevated h-[192px]">
            {project.visual}
          </div>

          {/* Body */}
          <div className="px-6 py-5 flex-1 flex flex-col justify-between">
            <div>
              <h3 className="text-base font-bold text-text-primary">{project.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-text-secondary line-clamp-2">
                {project.summary}
              </p>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-xs text-text-tertiary" style={{ fontFamily: "monospace" }}>
                {project.stats}
              </span>
              <a href="#projects" className="inline-flex items-center gap-1 text-sm font-semibold text-accent hover:text-accent-hover transition-colors">
                All projects <ArrowRight size={13} />
              </a>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
