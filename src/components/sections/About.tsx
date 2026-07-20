"use client";

import { motion } from "framer-motion";
import { Code2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { aboutData } from "@/lib/data";

const focusAreas = ["Applied AI", "Clean architecture", "Developer experience"];

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
            <div className="about-hero-text flex flex-col items-center text-center mx-auto">
              <span className="section-label about-label">About</span>
              <h2 className="about-title text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
                Building things that matter.
              </h2>
              <div className="about-bio mt-6 space-y-4 max-w-2xl">
                {aboutData.bio.map((para, i) => (
                  <p key={i} className="text-base leading-relaxed text-text-secondary">
                    {para}
                  </p>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-3 justify-center">
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

          {/* ── Stats cards row ── */}
          <div className="about-story-row">
            {aboutData.stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="about-story-card group flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.12, ease: "easeOut" }}
                whileHover={{ y: -5 }}
              >
                <div className="text-4xl font-extrabold text-accent tracking-tight">
                  {stat.value}
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-text-primary mt-1">
                  {stat.label}
                </div>
                <div className="text-xs leading-relaxed text-text-secondary">
                  {stat.description}
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </Container>
    </section>
  );
}
