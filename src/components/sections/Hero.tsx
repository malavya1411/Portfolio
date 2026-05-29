"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Trophy, Globe } from "lucide-react";
import { Container } from "@/components/ui/Container";

function GithubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

const FEATURED_PROJECTS = [
  {
    label: "FEATURED PROJECT",
    badge: "Runner-Up",
    title: "GitStat",
    image: "/images/git_stat.png",
    description:
      "GitHub contributor health dashboard — visualise team velocity, commit patterns, and AI-generated contributor insights.",
    techStack: ["React", "Vite", "Node.js", "Express", "Supabase", "Gemini AI"],
    slug: "git-stat",
  },
  {
    label: "FEATURED PROJECT",
    badge: "Top 6 · Syrus 2026",
    title: "OnboardAI",
    image: "/images/onboard_ai.png",
    description:
      "Three-tier RAG system for developer onboarding, with GitHub automation, Slack workflows, and personalized AI assistance.",
    techStack: ["Next.js", "TypeScript", "RAG", "Slack", "GitHub API", "PostgreSQL"],
    slug: "onboard-ai",
  },
  {
    label: "FEATURED PROJECT",
    badge: "Google Solution Challenge",
    title: "CrisisSync",
    image: "/images/crisis_sync.png",
    description:
      "Real-time emergency coordination platform with live location tracking, AI-driven triage, and multi-venue management.",
    techStack: ["Flutter", "Firebase", "Gemini AI", "Google Maps SDK"],
    slug: "crisis-sync",
  },
];

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 pointer-events-none select-none z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-bg/90 via-bg/40 to-bg z-10" />
        <div className="absolute inset-0 bg-bg/85 dark:bg-bg/90 mix-blend-multiply dark:mix-blend-normal z-10" />
        <img
          src="/images/hero_bg.png"
          alt=""
          className="w-full h-full object-cover opacity-[0.25] dark:opacity-[0.35]"
        />
      </div>

      {/* Scanlines */}
      <div className="scanlines" />

      {/* Dot grid texture */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.06] dark:opacity-[0.09]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hero-dot" x="0" y="0" width="36" height="36" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="currentColor" className="text-accent" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-dot)" />
        </svg>
      </div>

      {/* Soft accent glow */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.05] z-0"
        style={{ background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)", filter: "blur(90px)" }}
      />

      <Container className="relative z-10 pt-20 pb-16 lg:pt-24 lg:pb-24">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-14">

          {/* ── Left: Text ── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* Name tag */}
            <div className="mb-6 inline-flex items-center gap-2">
              <span className="text-accent font-mono text-xs font-semibold tracking-[0.2em] uppercase">
                —— MALAVYA MANKAR
              </span>
            </div>

            {/* Big headline */}
            <h1 className="text-[2.8rem] font-extrabold leading-[1.1] tracking-tight text-text-primary sm:text-5xl lg:text-[3.6rem]">
              Building intelligent{" "}
              <span className="text-accent">products</span>{" "}
              for{" "}
              <span className="text-[#7c6af5]">developers</span>
              {", "}
              <span className="text-[#3b8bff]">teams</span>
              {","}
              <br />
              and real-world impact.
            </h1>

            {/* Sub role */}
            <p className="mt-5 text-lg font-medium text-text-secondary">
              AI Engineer &amp; Full-Stack Developer
            </p>

            {/* Description */}
            <p className="mt-3 text-base leading-relaxed text-text-secondary max-w-[480px]">
              I build end-to-end products that combine AI, clean architecture,
              and seamless integrations to solve real problems.
            </p>

            {/* Achievement badge pills */}
            <motion.div
              className="mt-7 flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-2.5 rounded-xl border border-border-strong/60 bg-surface/60 backdrop-blur-sm px-4 py-2.5">
                <Trophy size={14} className="text-emerald-400 shrink-0" />
                <div>
                  <div className="text-xs font-bold text-text-primary leading-none">Runner-Up</div>
                  <div className="text-[10px] text-text-tertiary mt-0.5">Unimerge Hackathon</div>
                </div>
              </div>
              <div className="inline-flex items-center gap-2.5 rounded-xl border border-border-strong/60 bg-surface/60 backdrop-blur-sm px-4 py-2.5">
                <Trophy size={14} className="text-amber-400 shrink-0" />
                <div>
                  <div className="text-xs font-bold text-text-primary leading-none">Top 6 Finalist</div>
                  <div className="text-[10px] text-text-tertiary mt-0.5">Syrus 2026</div>
                </div>
              </div>
              <div className="inline-flex items-center gap-2.5 rounded-xl border border-border-strong/60 bg-surface/60 backdrop-blur-sm px-4 py-2.5">
                <Globe size={14} className="text-blue-400 shrink-0" />
                <div>
                  <div className="text-xs font-bold text-text-primary leading-none">Google Solution</div>
                  <div className="text-[10px] text-text-tertiary mt-0.5">Challenge</div>
                </div>
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div
              className="mt-8 flex flex-wrap items-center gap-3"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45, ease: "easeOut" }}
            >
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-bold text-white transition-all duration-200 hover:bg-accent-hover hover:scale-[0.98] active:scale-95 shadow-[0_4px_20px_rgba(32,191,175,0.3)]"
              >
                Explore My Work
                <ArrowUpRight size={15} />
              </a>
              <a
                href="https://github.com/malavya1411"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-surface/40 backdrop-blur-sm px-7 py-3.5 text-sm font-bold text-text-secondary transition-all duration-200 hover:text-text-primary hover:border-border-strong hover:scale-[0.98] active:scale-95"
              >
                <GithubIcon size={15} />
                GitHub
              </a>
            </motion.div>
          </motion.div>

          {/* ── Right: Featured Project Card ── */}
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          >
            <FeaturedProjectCard />
          </motion.div>

        </div>
      </Container>
    </section>
  );
}

function FeaturedProjectCard() {
  const [activeIdx, setActiveIdx] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % FEATURED_PROJECTS.length);
    }, 3000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const project = FEATURED_PROJECTS[activeIdx];

  return (
    <div className="w-full rounded-2xl border border-border-strong/50 bg-surface/60 backdrop-blur-md overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.35)]">

      {/* Card header — static */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-border-t/60">
        <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-text-tertiary font-mono">
          FEATURED PROJECT
        </span>
        <AnimatePresence mode="wait">
          <motion.span
            key={project.badge}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.22 }}
            className="rounded-full bg-accent-muted border border-accent/30 px-3 py-0.5 text-[10px] font-bold text-accent tracking-wider uppercase"
          >
            {project.badge}
          </motion.span>
        </AnimatePresence>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeIdx}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {/* Project title row */}
          <div className="flex items-center gap-3 px-5 pt-4 pb-3">
            <div className="w-9 h-9 rounded-xl bg-accent/15 border border-accent/20 flex items-center justify-center shrink-0">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <h2 className="text-xl font-extrabold text-text-primary tracking-tight">
              {project.title}
            </h2>
          </div>

          {/* Screenshot */}
          <div className="mx-5 mb-4 rounded-xl overflow-hidden border border-border-t/40 bg-elevated h-[220px]">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover object-top"
            />
          </div>

          {/* Description + tech + CTA */}
          <div className="px-5 pb-5">
            <p className="text-sm text-text-secondary leading-relaxed mb-4">
              {project.description}
            </p>

            {/* Tech stack pills */}
            <div className="flex flex-wrap gap-1.5 mb-5">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-border-strong/40 bg-elevated/60 px-2.5 py-0.5 text-[10px] font-semibold text-text-secondary tracking-wide"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Dot indicators + View Case Study */}
            <div className="flex items-center justify-between border-t border-border-t/40 pt-3">
              <div className="flex items-center gap-1.5">
                {FEATURED_PROJECTS.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveIdx(idx)}
                    className={`rounded-full transition-all duration-300 cursor-pointer ${
                      idx === activeIdx
                        ? "w-4 h-1.5 bg-accent"
                        : "w-1.5 h-1.5 bg-text-tertiary/40 hover:bg-text-tertiary/70"
                    }`}
                    aria-label={`Switch to project ${idx + 1}`}
                  />
                ))}
              </div>
              <a
                href={`/projects/${project.slug}`}
                className="inline-flex items-center gap-1.5 text-sm font-bold text-accent hover:text-accent-hover transition-colors"
              >
                View Case Study
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

