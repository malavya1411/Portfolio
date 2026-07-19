"use client";

import { useState, useEffect } from "react";
import { ArrowRight, Link2 } from "lucide-react";
import { BuildMascot3D } from "@/components/ui/BuildMascot3D";

const kickerWords = ["AI & Full-Stack", "Modern Web", "Mobile App"];

export function Hero() {
  const [displayText, setDisplayText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    const currentFullWord = kickerWords[wordIndex];

    const handleType = () => {
      if (!isDeleting) {
        // Typing
        const nextText = currentFullWord.substring(0, displayText.length + 1);
        setDisplayText(nextText);
        setTypingSpeed(100);

        if (nextText === currentFullWord) {
          // Pause when word is fully typed
          setTypingSpeed(2000);
          setIsDeleting(true);
        }
      } else {
        // Deleting
        const nextText = currentFullWord.substring(0, displayText.length - 1);
        setDisplayText(nextText);
        setTypingSpeed(40);

        if (nextText === "") {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % kickerWords.length);
          setTypingSpeed(300); // Brief pause before starting next word
        }
      }
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, wordIndex, typingSpeed]);

  return (
    <section id="home" className="reference-hero">
      <div className="reference-cloud reference-cloud-one" />
      <div className="reference-cloud reference-cloud-two" />
      <div className="reference-grain" />
      <div className="reference-hero-inner">
        <div className="reference-mascot-wrap">
          <BuildMascot3D />
        </div>
        <p className="reference-kicker reference-kicker-typewriter">
          {displayText}
        </p>
        <h1 className="reference-title">Developer<span>.</span></h1>
        <p className="reference-description">Malavya is an AI &amp; Data Science student and full-stack developer who builds practical, people-first products — from intelligent developer tools to real-time systems.</p>
        <div className="reference-actions">
          <a href="#contact" className="reference-button reference-button-dark">Connect <Link2 size={19} /></a>
          <a href="#projects" className="reference-button reference-button-light">See work <span className="reference-arrow"><ArrowRight size={20} /></span></a>
        </div>
      </div>
    </section>
  );
}
