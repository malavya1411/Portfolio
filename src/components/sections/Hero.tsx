"use client";

import { useState, useEffect } from "react";
import { ArrowRight, Link2 } from "lucide-react";
import { BuildMascot3D } from "@/components/ui/BuildMascot3D";
import { HeroBackground } from "@/components/ui/HeroBackground";

const kickerWords = [
  "AI & Full-Stack",
  "Web",
  "Software",
  "Mobile App",
];

export function Hero() {
  const [displayText, setDisplayText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    const currentFullWord = kickerWords[wordIndex];
    const handleType = () => {
      if (!isDeleting) {
        const nextText = currentFullWord.substring(0, displayText.length + 1);
        setDisplayText(nextText);
        setTypingSpeed(80);
        if (nextText === currentFullWord) {
          setTypingSpeed(2200);
          setIsDeleting(true);
        }
      } else {
        const nextText = currentFullWord.substring(0, displayText.length - 1);
        setDisplayText(nextText);
        setTypingSpeed(35);
        if (nextText === "") {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % kickerWords.length);
          setTypingSpeed(320);
        }
      }
    };
    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, wordIndex, typingSpeed]);

  return (
    <section id="home" className="reference-hero">
      <HeroBackground />

      <div className="reference-hero-inner">

        {/* Zone 1: Mascot at top */}
        <div className="reference-mascot-wrap">
          <BuildMascot3D />
        </div>

        {/* Zone 2: Main center block containing tagline, title, description, and buttons */}
        <div className="reference-hero-center">
          <p className="reference-kicker reference-kicker-typewriter">
            {displayText}
          </p>
          <h1 className="reference-title">Developer<span>.</span></h1>
          <p className="reference-description">
            Malavya is an AI &amp; Data Science student and full-stack developer
            who builds practical, people-first products — from intelligent
            developer tools to real-time systems.
          </p>

          {/* CTA buttons placed inside center block to enforce strict spacing */}
          <div className="reference-actions">
            <a href="#contact" className="reference-button reference-button-dark">
              Connect <Link2 size={18} />
            </a>
            <a href="#projects" className="reference-button reference-button-light">
              See work <span className="reference-arrow"><ArrowRight size={18} /></span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
