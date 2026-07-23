"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, GitFork, GraduationCap, Cpu, ExternalLink, ArrowUpRight } from "lucide-react";

const BUILDING_PROJECTS = [
  { name: "CanopyML", label: "Machine Learning Platform", link: "https://canopyml.vercel.app" },
  { name: "GitStat", label: "GitHub Health Dashboard", link: "https://github.com/malavya1411" },
  { name: "InboxOS", label: "AI-Powered Email OS", link: "https://github.com/malavya1411" },
  { name: "CodeScope", label: "Developer Analytics Tool", link: "https://github.com/malavya1411" },
];

/** Shared entrance animation props factory */
function cardEntrance(delay: number) {
  return {
    initial: { opacity: 0, y: 24, scale: 0.96 } as const,
    animate: { opacity: 1, y: 0, scale: 1 } as const,
    transition: { duration: 0.6, delay, ease: "easeOut" as const },
  };
}

const HOVER_SPRING = { type: "spring" as const, stiffness: 260, damping: 22 };

export function HeroFloatingCards() {
  const [projectIdx, setProjectIdx] = useState(0);

  // Rotate "Currently Building" every 7 seconds
  useEffect(() => {
    const id = setInterval(() => {
      setProjectIdx((prev) => (prev + 1) % BUILDING_PROJECTS.length);
    }, 7000);
    return () => clearInterval(id);
  }, []);

  const current = BUILDING_PROJECTS[projectIdx];

  return (
    <>
      {/* ── LEFT COLUMN ─────────────────────────────────────────────────────── */}
      <div className="hero-cards-col hero-cards-left" aria-hidden="true">

        {/* Card 1: Recognition */}
        <motion.div
          className="hero-float-card hero-float-card--recognition"
          {...cardEntrance(0.5)}
          whileHover={{
            y: -8,
            boxShadow: "0 24px 48px rgba(185, 106, 59, 0.14), 0 0 0 1.5px rgba(185,106,59,0.18)",
            transition: HOVER_SPRING,
          }}
        >
          <a href="#achievements" className="hero-float-card-content" aria-label="View achievements">
            <div className="hero-float-card-header">
              <div className="hero-float-card-header-left">
                <div className="hero-float-card-icon hero-float-card-icon--amber">
                  <Trophy size={16} strokeWidth={2.5} />
                </div>
                <span className="hero-float-card-eyebrow">Recognition</span>
              </div>
              <span className="hero-float-card-badge">
                View <ArrowUpRight size={12} strokeWidth={2.5} />
              </span>
            </div>

            <div className="hero-float-card-body">
              <p className="hero-float-card-title">Runner-Up</p>
              <p className="hero-float-card-sub">UniMerge 1.0</p>
            </div>
          </a>
        </motion.div>

        {/* Card 2: Currently Building */}
        <motion.div
          className="hero-float-card hero-float-card--building"
          {...cardEntrance(0.75)}
          whileHover={{
            y: -8,
            boxShadow: "0 24px 48px rgba(61, 90, 128, 0.13), 0 0 0 1.5px rgba(61,90,128,0.16)",
            transition: HOVER_SPRING,
          }}
        >
          <div className="hero-float-card-content">
            <div className="hero-float-card-header">
              <div className="hero-float-card-header-left">
                <div className="hero-float-card-icon hero-float-card-icon--blue">
                  <Cpu size={16} strokeWidth={2.5} />
                </div>
                <span className="hero-float-card-eyebrow">Currently Building</span>
              </div>
              <a
                href={current.link}
                target="_blank"
                rel="noopener noreferrer"
                className="hero-float-card-badge"
                onClick={(e) => e.stopPropagation()}
              >
                Live <ExternalLink size={11} strokeWidth={2.5} />
              </a>
            </div>

            <div className="hero-float-card-body">
              <AnimatePresence mode="wait">
                <motion.div
                  key={projectIdx}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <p className="hero-float-card-title">{current.name}</p>
                  <p className="hero-float-card-sub">{current.label}</p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Rotation progress dots */}
            <div className="hero-float-card-dots">
              {BUILDING_PROJECTS.map((_, i) => (
                <span
                  key={i}
                  className={`hero-float-card-dot${i === projectIdx ? " hero-float-card-dot--active" : ""}`}
                />
              ))}
            </div>
          </div>
        </motion.div>

      </div>

      {/* ── RIGHT COLUMN ────────────────────────────────────────────────────── */}
      <div className="hero-cards-col hero-cards-right" aria-hidden="true">

        {/* Card 3: Open Source / GitHub */}
        <motion.div
          className="hero-float-card hero-float-card--github"
          {...cardEntrance(0.6)}
          whileHover={{
            y: -8,
            boxShadow: "0 24px 48px rgba(20, 20, 20, 0.12), 0 0 0 1.5px rgba(20,20,20,0.14)",
            transition: HOVER_SPRING,
          }}
        >
          <a
            href="https://github.com/malavya1411"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-float-card-content"
            aria-label="GitHub profile"
          >
            <div className="hero-float-card-header">
              <div className="hero-float-card-header-left">
                <div className="hero-float-card-icon hero-float-card-icon--dark">
                  <GitFork size={16} strokeWidth={2} />
                </div>
              </div>
              <span className="hero-float-card-badge">
                Profile <ArrowUpRight size={12} strokeWidth={2.5} />
              </span>
            </div>

            <div className="hero-float-card-body">
              <p className="hero-float-card-title">GitHub</p>
              <p className="hero-float-card-sub">malavya1411</p>
            </div>
          </a>
        </motion.div>

        {/* Card 4: Education */}
        <motion.div
          className="hero-float-card hero-float-card--edu"
          {...cardEntrance(0.85)}
          whileHover={{
            y: -8,
            boxShadow: "0 24px 48px rgba(77, 119, 85, 0.12), 0 0 0 1.5px rgba(77,119,85,0.15)",
            transition: HOVER_SPRING,
          }}
        >
          <div className="hero-float-card-content">
            <div className="hero-float-card-header">
              <div className="hero-float-card-header-left">
                <div className="hero-float-card-icon hero-float-card-icon--green">
                  <GraduationCap size={16} strokeWidth={2.5} />
                </div>
                <span className="hero-float-card-eyebrow">AI & Data Science</span>
              </div>
            </div>

            <div className="hero-float-card-body">
              <p className="hero-float-card-title">Second Year</p>
              <p className="hero-float-card-sub">VESIT, Mumbai</p>
            </div>
          </div>
        </motion.div>

      </div>
    </>
  );
}
