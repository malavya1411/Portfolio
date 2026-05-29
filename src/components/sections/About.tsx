"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
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

  return (
    <motion.div
      ref={ref}
      className="card card-trace p-6 text-center group cursor-default"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      whileHover={{ y: -4 }}
    >
      <div className="text-4xl font-bold text-accent transition-colors duration-300 group-hover:text-accent-hover">
        {isNaN(numeric) ? value : displayValue}
      </div>
      <div className="mt-2 text-sm font-semibold text-text-primary">{label}</div>
      <div className="mt-1 text-xs text-text-tertiary">{description}</div>
    </motion.div>
  );
}

export function About() {
  return (
    <section id="about" className="section-padding">
      <Container>
        <div className="grid gap-16 lg:grid-cols-[1fr_300px]">

          {/* Left */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, ease: "easeOut" }}
            >
              <span className="section-label">About</span>
              <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
                Building things that matter.
              </h2>
            </motion.div>

            <div className="mt-8 space-y-5">
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
          </div>

          {/* Right: stat cards with count-up */}
          <div className="flex flex-col gap-4 lg:pt-16">
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
