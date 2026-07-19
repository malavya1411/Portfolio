"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Code2, GraduationCap, Layers3, Trophy, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { aboutData } from "@/lib/data";

function useCountUp(target: number, duration = 1200) {
  const [count, setCount] = useState(0);
  const [active, setActive] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setActive(true); },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    const frame = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      setCount(ease * target);
      if (t < 1) requestAnimationFrame(frame);
      else setCount(target);
    };
    requestAnimationFrame(frame);
  }, [active, target, duration]);

  return { count, ref };
}

const focusAreas = ["Applied AI", "Clean architecture", "Developer experience"];

const storyCards = [
  {
    step: "01",
    icon: <GraduationCap size={22} strokeWidth={1.8} />,
    title: "Started with curiosity",
    body: "Second-year B.Tech student in AI & Data Science at VESIT, Mumbai. Currently holding a 9.73 CGPA — driven by a deep interest in how software and intelligence intersect.",
  },
  {
    step: "02",
    icon: <Trophy size={22} strokeWidth={1.8} />,
    title: "Tested at hackathons",
    body: "Competed in 5+ hackathons — placed top 6 at Syrus 2026 (500+ teams) and won runner-up at a national hackathon. Leading AlgoMinds, a team that builds fast under pressure.",
  },
  {
    step: "03",
    icon: <Layers3 size={22} strokeWidth={1.8} />,
    title: "Shipped real products",
    body: "Turned those ideas into 6+ production projects — from autonomous developer-onboarding agents with multi-tier RAG to real-time emergency coordination platforms.",
  },
];

export function About() {
  return (
    <section id="about" className="about-section section-padding relative overflow-hidden">
      <div className="about-bg-grid pointer-events-none absolute inset-0" />

      <Container className="relative z-10">
        <div className="about-v2-layout">

          {/* ── Big hero block ── */}
          <motion.div
            className="about-hero-block"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            <div className="about-hero-text">
              <span className="section-label about-label">About</span>
              <h2 className="about-title text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
                Building things that matter.
              </h2>
              <div className="about-bio mt-6 space-y-4">
                {aboutData.bio.map((para, i) => (
                  <p key={i} className="text-base leading-relaxed text-text-secondary">
                    {para}
                  </p>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                {focusAreas.map((area) => (
                  <span
                    key={area}
                    className="inline-flex items-center gap-2 rounded-full border border-border-strong/50 bg-bg/55 px-4 py-2 text-xs font-bold text-text-secondary"
                  >
                    <Code2 size={13} className="text-accent" />
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── Three story cards ── */}
          <div className="about-story-row">
            {storyCards.map((card, i) => (
              <motion.div
                key={card.step}
                className="about-story-card group"
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.12, ease: "easeOut" }}
                whileHover={{ y: -5 }}
              >
                {/* connector arrow between cards */}
                {i < storyCards.length - 1 && (
                  <div className="about-story-connector" aria-hidden="true">
                    <ArrowRight size={16} />
                  </div>
                )}

                <div className="about-story-icon text-accent">
                  {card.icon}
                </div>
                <div className="about-story-step">{card.step}</div>
                <h3 className="about-story-title">{card.title}</h3>
                <p className="about-story-body">{card.body}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </Container>
    </section>
  );
}
