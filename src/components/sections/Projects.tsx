"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { projects, allTags } from "@/lib/data";

export function Projects() {
  const [activeTag, setActiveTag] = useState("All");

  const filtered =
    activeTag === "All"
      ? projects
      : projects.filter((p) => p.tags.includes(activeTag));

  return (
    <section id="projects" className="section-padding">
      <Container>
        {/* Header row */}
        <div className="flex flex-col gap-6 mb-12 sm:flex-row sm:items-end sm:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <span className="mb-4 inline-block text-sm font-medium tracking-widest uppercase text-accent">
              Projects
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
              What I've shipped
            </h2>
            <p className="mt-3 text-base text-text-secondary">
              Production-grade projects, built under pressure.
            </p>
          </motion.div>

          {/* Filter pills */}
          <motion.div
            className="flex flex-wrap gap-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.15 }}
          >
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200 cursor-pointer ${
                  activeTag === tag
                    ? "bg-text-primary text-bg"
                    : "border border-border-t text-text-secondary hover:text-text-primary hover:border-border-strong"
                }`}
              >
                {tag}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Project grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <ProjectCard key={project.slug} project={project} index={i} />
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <p className="mt-16 text-center text-text-secondary">
            No projects match this filter.
          </p>
        )}
      </Container>
    </section>
  );
}
