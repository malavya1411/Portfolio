"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { Tag } from "@/components/ui/Tag";
import type { Project } from "@/lib/data";
import { SITE_CONFIG } from "@/lib/constants";

function GithubIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.article
      className="card-base group flex flex-col overflow-hidden"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: SITE_CONFIG.animationDuration.normal,
        delay: index * 0.1,
        ease: SITE_CONFIG.ease,
      }}
    >
      {/* Header */}
      <div className="p-6 pb-0 sm:p-8 sm:pb-0">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          {project.featured && (
            <span className="rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-semibold text-accent border border-accent/20">
              Featured
            </span>
          )}
          <span className="text-xs text-text-secondary">{project.role}</span>
        </div>

        <h3 className="text-xl font-bold text-text-primary group-hover:text-accent transition-colors duration-250">
          {project.title}
        </h3>

        <p className="mt-2 text-sm leading-relaxed text-text-secondary">
          {project.summary}
        </p>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-6 pt-4 sm:p-8 sm:pt-4">
        <p className="mb-4 text-sm leading-relaxed text-text-secondary/80">
          {project.outcome}
        </p>

        {/* Tech stack tags */}
        <div className="mb-6 flex flex-wrap gap-1.5">
          {project.techStack.map((tech) => (
            <Tag key={tech} label={tech} />
          ))}
        </div>

        {/* Action links */}
        <div className="mt-auto flex items-center gap-3">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${project.title} source code on GitHub`}
            className="inline-flex items-center gap-1.5 rounded-xl border border-border-custom px-4 py-2 text-sm font-medium text-text-secondary transition-all duration-200 hover:border-accent/40 hover:text-accent"
          >
            <GithubIcon size={15} />
            Source
          </a>
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${project.title} live demo`}
            className="inline-flex items-center gap-1.5 rounded-xl bg-accent px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:bg-accent-hover"
          >
            <ExternalLink size={15} />
            Live Demo
          </a>
        </div>
      </div>
    </motion.article>
  );
}
