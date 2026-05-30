"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { projects } from "@/lib/data";

export function Projects() {
  const featuredProjects = projects.filter((project) => project.featured).slice(0, 3);

  return (
    <section id="projects" className="projects-showcase section-padding">
      <Container>
        {/* Header row */}
        <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
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
              Selected work
            </h2>
            <p className="mt-3 max-w-xl text-base text-text-secondary">
              Production-grade projects, built under pressure.
            </p>
          </motion.div>
        </div>

        {/* Project grid */}
        <div className="projects-feature-grid grid gap-6 lg:grid-cols-3">
          {featuredProjects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>

        <motion.div
          className="mt-10 flex justify-center"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-48px" }}
          transition={{ duration: 0.45, delay: 0.2, ease: "easeOut" }}
        >
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-full border border-accent bg-accent px-7 py-3.5 text-sm font-bold text-[#111015] shadow-[0_12px_30px_rgba(217,140,95,0.20)] transition-all duration-200 hover:bg-accent-hover hover:scale-[0.98] active:scale-95"
          >
            View all projects
            <ArrowUpRight size={15} />
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}
