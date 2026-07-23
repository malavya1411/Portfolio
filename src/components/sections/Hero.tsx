"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Link2, FileText, ChevronDown } from "lucide-react";
import { BuildMascot3D } from "@/components/ui/BuildMascot3D";
import { HeroBackground } from "@/components/ui/HeroBackground";
import { HeroFloatingCards } from "@/components/ui/HeroFloatingCards";

// No "Developer" variants — it already sits statically below as the h1
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
          // Finished typing — pause then start deleting
          setTypingSpeed(PAUSE_AFTER);
          setIsDeleting(true);
        }
      } else {
        const next = currentWord.substring(0, displayText.length - 1);
        setDisplayText(next);
        setTypingSpeed(DELETE_SPEED);
        if (next === "") {
          // Finished deleting — advance word
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
      className="reference-hero hero-with-cursor-glow"
      onMouseMove={handleMouseMove}
    >
      <HeroBackground />

      {/* Ambient dot grid overlay */}
      <div className="hero-ambient-grid" aria-hidden="true" />

      {/* Cursor glow radial light */}
      <div className="hero-cursor-glow" aria-hidden="true" />

      {/* Floating left/right ambient cards — hidden on mobile/tablet */}
      <div className="hero-cards-wrap">
        <HeroFloatingCards />
      </div>

      <div className="reference-hero-inner">

        {/* Zone 1: Mascot */}
        <div className="reference-mascot-wrap">
          <BuildMascot3D />
        </div>

        {/* Zone 2: Main center content */}
        <div className="reference-hero-center">

          {/* Typewriter profession text */}
          <p
            className="reference-kicker reference-kicker-typewriter"
            aria-live="polite"
            aria-atomic="true"
          >
            {displayText}
          </p>

          <h1 className="reference-title">Developer<span>.</span></h1>
          <p className="reference-description">
            Malavya is an AI &amp; Data Science student and full-stack developer
            who builds practical, people-first products — from intelligent
            developer tools to real-time systems.
          </p>

          {/* CTA buttons */}
          <div className="reference-actions">
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
        </div>

      </div>

      {/* Scroll cue */}
      <motion.button
        className="hero-scroll-cue"
        onClick={scrollToAbout}
        aria-label="Scroll to About section"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.6, ease: "easeOut" }}
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
