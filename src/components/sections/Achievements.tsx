"use client";

import { motion } from "framer-motion";
import { Trophy, Award, GraduationCap, Medal } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { achievements } from "@/lib/data";
import type { Achievement } from "@/lib/data";

function getIcon(a: Achievement) {
  if (a.title.toLowerCase().includes("finalist") || a.title.toLowerCase().includes("top"))
    return Trophy;
  if (a.title.toLowerCase().includes("runner")) return Award;
  if (a.title.toLowerCase().includes("cgpa")) return GraduationCap;
  return Medal;
}

export function Achievements() {
  return (
    <section id="achievements" className="section-padding">
      <Container>
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <span className="mb-4 inline-block text-sm font-medium tracking-widest uppercase text-accent">
            Achievements
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
            Recognition
          </h2>
          <p className="mt-3 max-w-lg text-base text-text-secondary">
            Highlights from hackathons, competitions, and academics.
          </p>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {achievements.map((a, i) => {
            const Icon = getIcon(a);
            return (
              <motion.div
                key={a.title}
                className={`card card-trace relative overflow-hidden p-6 ${a.highlight ? "border-accent/25" : ""}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-48px" }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
              >
                {/* Top accent line for highlights */}
                {a.highlight && (
                  <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent" />
                )}

                <div className="flex items-start gap-4">
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                      a.highlight ? "bg-accent/10 text-accent" : "bg-elevated text-text-tertiary"
                    }`}
                  >
                    <Icon size={17} />
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-baseline gap-2 flex-wrap">
                      <h3 className="text-sm font-bold text-text-primary">{a.title}</h3>
                      {a.rank && (
                        <span className="text-xs font-semibold text-accent">{a.rank}</span>
                      )}
                    </div>
                    <p className="mt-0.5 text-xs font-medium text-accent/80">{a.event}</p>
                    <p className="mt-2 text-sm leading-relaxed text-text-secondary">{a.description}</p>
                    <div className="mt-3 flex items-center justify-between flex-wrap gap-2">
                      <p className="text-xs text-text-tertiary">{a.year}</p>
                      {a.certificate && (
                        <a
                          href={a.certificate}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-bold text-accent hover:text-accent-hover transition-colors cursor-pointer"
                        >
                          View Certificate ↗
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
