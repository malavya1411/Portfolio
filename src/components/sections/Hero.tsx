"use client";

import { ArrowRight, Link2 } from "lucide-react";
import { BuildMascot3D } from "@/components/ui/BuildMascot3D";

export function Hero() {
  return (
    <section id="home" className="reference-hero">
      <div className="reference-cloud reference-cloud-one" />
      <div className="reference-cloud reference-cloud-two" />
      <div className="reference-grain" />
      <div className="reference-hero-inner">
        <div className="reference-mascot-wrap">
          <BuildMascot3D />
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
