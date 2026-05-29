"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { skillGroups } from "@/lib/data";

const SKILL_PROFICIENCIES: Record<string, number> = {
  "Next.js 15": 88, "React": 92, "Vite": 80, "TypeScript": 85, "Tailwind CSS": 90, "Flutter": 72,
  "Node.js": 82, "Express": 80, "PostgreSQL": 75, "Supabase": 78, "Firebase": 76, "JWT Auth": 78,
  "Gemini API": 85, "Vector Embeddings": 80, "RAG Systems": 82, "MediaPipe": 68, "Prompt Engineering": 88, "Persona Detection": 75,
  "Vercel": 90, "Render": 78, "GitHub OAuth": 82, "Nodemailer / SMTP": 80, "Slack Block Kit": 76, "Google Maps SDK": 74,
};

function ProgressBar({ skill, animate }: { skill: string; animate: boolean }) {
  const pct = SKILL_PROFICIENCIES[skill] ?? 75;
  return (
    <div className="mb-3 last:mb-0">
      <div className="mb-1.5 flex items-center justify-between">
        <span className="text-xs font-medium text-text-secondary">{skill}</span>
        <span className="text-[10px] text-text-tertiary" style={{ fontFamily: "monospace" }}>{pct}%</span>
      </div>
      <div className="sk-track">
        <div className="sk-fill" style={{ width: animate ? `${pct}%` : "0%" }} />
      </div>
    </div>
  );
}

export function Skills() {
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    cardRefs.current.forEach((el, i) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => setVisibleCards((s) => new Set(s).add(i)), i * 100);
          }
        },
        { threshold: 0.3 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <section id="skills" className="section-padding border-t border-border-t">
      <Container>
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <span className="section-label">Skills</span>
          <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
            Technical Arsenal
          </h2>
          <p className="mt-3 max-w-lg text-base text-text-secondary">
            Tools I reach for when shipping production systems.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2">
          {skillGroups.map((group, i) => (
            <motion.div
              key={group.category}
              ref={(el) => { cardRefs.current[i] = el; }}
              className="card card-trace p-6"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              <div className="mb-5">
                <h3 className="text-sm font-bold uppercase tracking-widest text-text-primary">{group.category}</h3>
                <p className="mt-1 text-xs text-text-tertiary">{group.description}</p>
              </div>

              {group.skills.map((skill) => (
                <ProgressBar key={skill} skill={skill} animate={visibleCards.has(i)} />
              ))}
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
