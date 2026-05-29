"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Code2, GraduationCap, Layers3, Sparkles, Trophy } from "lucide-react";
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

interface StatCardProps {
  value: string;
  label: string;
  description: string;
  index: number;
}

const focusAreas = ["Applied AI", "Clean architecture", "Developer experience"];

function StatIcon({ index }: { index: number }) {
  if (index === 0) return <GraduationCap size={20} strokeWidth={1.9} />;
  if (index === 1) return <Trophy size={20} strokeWidth={1.9} />;
  if (index === 2) return <Layers3 size={20} strokeWidth={1.9} />;
  return <Sparkles size={20} strokeWidth={1.9} />;
}

function StatCard({ value, label, description, index }: StatCardProps) {
  // Parse numeric portion for count-up
  const numeric = parseFloat(value.replace(/[^0-9.]/g, ""));
  const suffix = value.replace(/[0-9.]/g, "");
  const hasDecimal = value.includes(".");
  const { count, ref } = useCountUp(numeric, 1000 + index * 200);

  const displayValue = isNaN(numeric)
    ? value
    : hasDecimal
    ? count.toFixed(2)
    : `${Math.floor(count)}${suffix}`;

  const displayLabel =
    label === value && description.toLowerCase().includes("hackathon")
      ? "Hackathons"
      : label === value && description.toLowerCase().includes("project")
      ? "Projects"
      : label;

  return (
    <motion.div
      ref={ref}
      className="about-stat group relative overflow-hidden rounded-2xl border border-border-strong/50 bg-surface/70 p-5 shadow-[var(--card-shadow)] backdrop-blur-md"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      whileHover={{ y: -4 }}
    >
      <div className="absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-accent/45 to-transparent opacity-70" />
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="about-stat-value text-4xl font-extrabold leading-none text-accent transition-colors duration-300 group-hover:text-accent-hover">
            {isNaN(numeric) ? value : displayValue}
          </div>
          <div className="mt-3 text-sm font-bold text-text-primary">{displayLabel}</div>
        </div>
        <div className="about-stat-icon flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-accent/20 bg-accent-muted text-accent">
          <StatIcon index={index} />
        </div>
      </div>
      <div className="mt-5 text-sm leading-relaxed text-text-secondary">{description}</div>
    </motion.div>
  );
}

export function About() {
  return (
    <section id="about" className="about-section section-padding relative overflow-hidden">
      <div className="about-bg-grid pointer-events-none absolute inset-0" />

      <Container className="relative z-10">
        <div className="about-layout grid items-stretch gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-14">

          {/* Left */}
          <div className="about-copy rounded-[28px] border border-border-t bg-surface/45 p-6 backdrop-blur-sm sm:p-8 lg:p-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, ease: "easeOut" }}
            >
              <span className="section-label about-label">About</span>
              <h2 className="about-title max-w-[760px] text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
                Building things that matter.
              </h2>
            </motion.div>

            <div className="about-bio mt-8 space-y-5">
              {aboutData.bio.map((para, i) => (
                <motion.p
                  key={i}
                  className="text-base leading-relaxed text-text-secondary"
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: i * 0.12, ease: "easeOut" }}
                >
                  {para}
                </motion.p>
              ))}
            </div>

            <motion.div
              className="about-focus mt-8 flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: 0.35, ease: "easeOut" }}
            >
              {focusAreas.map((area) => (
                <span
                  key={area}
                  className="inline-flex items-center gap-2 rounded-full border border-border-strong/50 bg-bg/55 px-4 py-2 text-xs font-bold text-text-secondary"
                >
                  <Code2 size={13} className="text-accent" />
                  {area}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Right: stat cards with count-up */}
          <div className="about-stats flex flex-col gap-4">
            {aboutData.stats.map((stat, i) => (
              <StatCard
                key={stat.label}
                value={stat.value}
                label={stat.label}
                description={stat.description}
                index={i}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
