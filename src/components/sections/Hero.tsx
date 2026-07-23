"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Link2, FileText, ChevronDown } from "lucide-react";
import { BuildMascot3D } from "@/components/ui/BuildMascot3D";
import { HeroBackground } from "@/components/ui/HeroBackground";

const PROFESSIONS = [
  "AI & Full-Stack",
  "Web",
  "Software",
  "Mobile App",
  "Open Source",
];

// Typewriter timing
const TYPE_SPEED   = 80;  // ms per character typed
const DELETE_SPEED = 38;  // ms per character deleted
const PAUSE_AFTER  = 2000; // ms pause before deleting
const PAUSE_BEFORE = 320;  // ms pause before typing next word

export function Hero() {
  const [displayText, setDisplayText] = useState("");
  const [wordIndex, setWordIndex]     = useState(0);
  const [isDeleting, setIsDeleting]   = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(TYPE_SPEED);

  const sectionRef = useRef<HTMLElement>(null);

  // Typewriter loop
  useEffect(() => {
    const currentWord = PROFESSIONS[wordIndex];

    const tick = () => {
      if (!isDeleting) {
        const next = currentWord.substring(0, displayText.length + 1);
        setDisplayText(next);
        setTypingSpeed(TYPE_SPEED);
        if (next === currentWord) {
          setTypingSpeed(PAUSE_AFTER);
          setIsDeleting(true);
        }
      } else {
        const next = currentWord.substring(0, displayText.length - 1);
        setDisplayText(next);
        setTypingSpeed(DELETE_SPEED);
        if (next === "") {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % PROFESSIONS.length);
          setTypingSpeed(PAUSE_BEFORE);
        }
      }
    };

    const timer = setTimeout(tick, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, wordIndex, typingSpeed]);

  // Cursor glow — update CSS custom properties on mouse move
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const section = sectionRef.current;
    if (!section) return;
    const rect = section.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width)  * 100;
    const y = ((e.clientY - rect.top)  / rect.height) * 100;
    section.style.setProperty("--glow-x", `${x}%`);
    section.style.setProperty("--glow-y", `${y}%`);
  }, []);

  const scrollToAbout = () => {
    const about = document.getElementById("about");
    if (about) about.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen w-full flex flex-col justify-between items-center overflow-hidden pt-28 sm:pt-32 lg:pt-36 pb-12 hero-with-cursor-glow"
      onMouseMove={handleMouseMove}
    >
      <HeroBackground />

      {/* Ambient dot grid overlay */}
      <div className="hero-ambient-grid" aria-hidden="true" />

      {/* Cursor glow radial light */}
      <div className="hero-cursor-glow" aria-hidden="true" />

      {/* End-to-End Container (Uncompressed Full Width Grid) */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-14 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          
          {/* ── LEFT COLUMN: Mascot + Typewriter + Title + Bio + Buttons ─ */}
          <motion.div
            className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-4 sm:space-y-6"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Zone 1: Interactive 3D Mascot */}
            <div className="reference-mascot-wrap w-[180px] h-[190px] sm:w-[220px] sm:h-[230px] lg:w-[250px] lg:h-[260px] mb-2 flex justify-center lg:justify-start">
              <BuildMascot3D />
            </div>

            {/* Typewriter profession text */}
            <p
              className="reference-kicker reference-kicker-typewriter text-accent font-serif italic text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight min-h-[1.2em] text-center lg:text-left"
              aria-live="polite"
              aria-atomic="true"
            >
              {displayText}
            </p>

            <h1 className="reference-title text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-text-primary leading-none text-center lg:text-left">
              Developer<span>.</span>
            </h1>

            <p className="reference-description max-w-2xl text-sm sm:text-base lg:text-lg text-text-secondary leading-relaxed font-medium text-center lg:text-left">
              Malavya is an AI &amp; Data Science student and full-stack developer
              who builds practical, people-first products — from intelligent
              developer tools to real-time systems.
            </p>

            {/* CTA buttons */}
            <div className="reference-actions flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
              <a href="#contact" className="reference-button reference-button-light hero-btn-connect">
                Connect <Link2 size={18} />
              </a>
              <a href="#projects" className="reference-button reference-button-light hero-btn-work">
                See work{" "}
                <span className="reference-arrow hero-btn-arrow">
                  <ArrowRight size={18} />
                </span>
              </a>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="reference-button reference-button-light hero-btn-resume"
              >
                Resume <FileText size={18} className="hero-btn-resume-icon" />
              </a>
            </div>
          </motion.div>

          {/* ── RIGHT COLUMN: User Photo ──────────────────────────────────── */}
          <motion.div
            className="lg:col-span-5 flex justify-center lg:justify-end items-center"
            initial={{ opacity: 0, scale: 0.92, x: 30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative w-full max-w-[340px] sm:max-w-[380px] lg:max-w-[440px]">
              {/* Soft Ambient Radial Backlight Glow */}
              <div className="absolute -inset-3 bg-gradient-to-tr from-accent/25 via-amber-500/15 to-accent/10 rounded-[2.5rem] blur-2xl opacity-70 pointer-events-none" />

              {/* Rounded Waist-Length Photo Frame */}
              <div className="relative rounded-[2.4rem] overflow-hidden border border-border-strong bg-surface shadow-2xl transition-all duration-500 hover:scale-[1.015] hover:shadow-accent/20">
                <img
                  src="/malavya.jpg"
                  alt="Malavya Mankar"
                  className="w-full h-auto object-cover object-top max-h-[500px] sm:max-h-[540px] lg:max-h-[580px]"
                />
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Scroll cue */}
      <motion.button
        className="hero-scroll-cue mt-8"
        onClick={scrollToAbout}
        aria-label="Scroll to About section"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6, ease: "easeOut" }}
        whileHover={{ scale: 1.08 }}
      >
        <motion.span
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={20} strokeWidth={2} />
        </motion.span>
        <span>Explore More</span>
      </motion.button>
    </section>
  );
}
