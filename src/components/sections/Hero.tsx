"use client";

import { useEffect, useRef } from "react";
import { ArrowRight, Link2 } from "lucide-react";

export function Hero() {
  const mascotRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const mascot = mascotRef.current;
    if (!mascot || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const move = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const x = (event.clientX / window.innerWidth - 0.5) * 10;
        const y = (event.clientY / window.innerHeight - 0.5) * 6;
        mascot.style.transform = `translate3d(${x}px,${y}px,0) rotate(${x * 0.2}deg)`;
      });
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => { cancelAnimationFrame(frame); window.removeEventListener("pointermove", move); };
  }, []);

  return (
    <section id="home" className="reference-hero">
      <div className="reference-cloud reference-cloud-one" />
      <div className="reference-cloud reference-cloud-two" />
      <div className="reference-grain" />
      <div className="reference-hero-inner">
        <div className="reference-mascot-wrap">
          <img ref={mascotRef} className="reference-mascot" src="/images/generated/build-mascot-transparent.png" alt="BUILD, Malavya's developer companion" />
        </div>
        <p className="reference-kicker">AI &amp; Full-Stack</p>
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
