"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, X } from "lucide-react";
import type { Project } from "@/lib/data";

function GithubIcon({ size = 14 }: { size?: number }) {
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
  const [showModal, setShowModal] = useState(false);

  const renderStatusBadge = (status: string) => {
    if (status === "HACKATHON") {
      return (
        <span className="inline-flex items-center rounded bg-rose-600 px-3 py-1 text-[11px] font-bold text-white tracking-wider uppercase">
          HACKATHON
        </span>
      );
    }
    if (status === "RUNNER-UP") {
      return (
        <span className="inline-flex items-center rounded bg-emerald-600 px-3 py-1 text-[11px] font-bold text-white tracking-wider uppercase">
          RUNNER-UP
        </span>
      );
    }
    if (status === "GOOGLE CHALLENGE") {
      return (
        <span className="inline-flex items-center rounded bg-sky-600 px-3 py-1 text-[11px] font-bold text-white tracking-wider uppercase">
          GOOGLE CHALLENGE
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 rounded border border-amber-500/40 bg-amber-500/5 px-3 py-1 text-[11px] font-bold text-amber-400 tracking-wider uppercase">
        <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
        IN PROGRESS
      </span>
    );
  };

  return (
    <>
      <motion.article
        onClick={() => setShowModal(true)}
        className="card card-trace group flex flex-col overflow-hidden bg-surface cursor-pointer h-full transition-all duration-300 hover:translate-y-[-4px]"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-48px" }}
        transition={{ duration: 0.5, delay: index * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {/* Cover visual area with View Project overlay on hover */}
        <div className="relative overflow-hidden h-[200px] w-full border-b border-border-t bg-elevated">
          {/* Overlay showing "VIEW PROJECT" on hover - clean dark neutral blur mask */}
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-[1.5px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10 pointer-events-none">
            <div className="border border-white/90 px-6 py-2.5 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
              <span className="text-white text-xs font-bold tracking-[0.25em] uppercase">
                VIEW PROJECT
              </span>
            </div>
          </div>
          {/* Image */}
          <img
            src={project.coverImage || "/images/placeholder.png"}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* Content details below image */}
        <div className="flex flex-1 flex-col p-6">
          {/* Tag row */}
          <div className="flex items-center gap-2 mb-4">
            {renderStatusBadge(project.status || "COMPLETED")}
            <span className="rounded border border-border-strong/50 bg-elevated/40 px-2.5 py-1 text-[10px] font-bold text-text-secondary tracking-wider uppercase">
              {project.categoryTag || "FULL STACK"}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-xl font-extrabold text-text-primary tracking-wider uppercase mb-2 group-hover:text-accent transition-colors duration-200">
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-sm leading-relaxed text-text-secondary flex-1 mb-4 line-clamp-3">
            {project.summary}
          </p>

          {/* Tech Badges */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.techStack.slice(0, 5).map((tech) => (
              <span
                key={tech}
                className="rounded border border-border-strong/30 bg-surface/30 px-2 py-0.5 text-[10px] font-bold text-text-secondary tracking-wide uppercase"
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > 5 && (
              <span className="rounded border border-border-strong/30 bg-surface/30 px-2 py-0.5 text-[10px] font-bold text-text-tertiary tracking-wide uppercase">
                +{project.techStack.length - 5}
              </span>
            )}
          </div>

          {/* Context footer / Date */}
          <div className="text-[10px] text-text-tertiary font-mono tracking-wider uppercase mb-5">
            {project.dateString || `${project.year} · COMPLETED`}
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-2.5 border-t border-border-t/40 pt-4 mt-auto">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg border border-accent/30 px-3.5 py-2 text-xs font-bold text-accent hover:bg-accent/10 transition-colors uppercase tracking-wider"
            >
              <GithubIcon size={13} />
              GitHub
            </a>
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg border border-accent/30 px-3.5 py-2 text-xs font-bold text-accent hover:bg-accent/10 transition-colors uppercase tracking-wider"
              >
                <ExternalLink size={12} />
                Live Demo
              </a>
            )}
          </div>

          {/* Features list */}
          {project.features && project.features.length > 0 && (
            <div className="mt-5 border-t border-border-t/40 pt-4 flex flex-col gap-1.5">
              {project.features.map((feat, fidx) => (
                <div key={fidx} className="flex items-start gap-2 text-xs text-text-secondary">
                  <span className="text-accent shrink-0 font-bold">→</span>
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.article>

      {/* Details Dialog Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <div className="absolute inset-0" onClick={() => setShowModal(false)} />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="relative bg-surface border border-border-strong rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl z-10 flex flex-col"
            >
              {/* Modal Cover Image */}
              <div className="relative h-48 w-full border-b border-border-t">
                <img
                  src={project.coverImage || "/images/placeholder.png"}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setShowModal(false)}
                  className="absolute top-3 right-3 p-1.5 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors z-20 cursor-pointer"
                  aria-label="Close details"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 flex flex-col gap-5">
                {/* Header info */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    {renderStatusBadge(project.status || "COMPLETED")}
                    <span className="rounded border border-border-strong/50 bg-elevated/40 px-2.5 py-0.5 text-[10px] font-bold text-text-secondary tracking-wider uppercase">
                      {project.categoryTag}
                    </span>
                  </div>
                  <h3 className="text-xl font-extrabold text-text-primary tracking-wider uppercase">
                    {project.title}
                  </h3>
                  <span className="text-[10px] text-text-tertiary font-mono tracking-wider uppercase block mt-1">
                    {project.dateString}
                  </span>
                </div>

                {/* Description */}
                <div>
                  <h4 className="text-xs font-bold text-accent tracking-wider uppercase mb-1.5">
                    Description &amp; Outcome
                  </h4>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {project.summary}
                  </p>
                  <p className="text-sm text-text-secondary leading-relaxed mt-2.5 border-l-2 border-accent/30 pl-3">
                    {project.outcome}
                  </p>
                </div>

                {/* Tech stack */}
                <div>
                  <h4 className="text-xs font-bold text-accent tracking-wider uppercase mb-2">
                    Tech Stack
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded border border-border-strong/30 bg-surface/30 px-2.5 py-1 text-[10px] font-bold text-text-primary tracking-wide uppercase"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 mt-2 border-t border-border-t/40 pt-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl border border-accent/30 px-4 py-2.5 text-xs font-bold text-accent hover:bg-accent/10 transition-colors uppercase tracking-wider"
                  >
                    <GithubIcon size={14} />
                    GitHub
                  </a>
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-xs font-bold text-white hover:bg-accent-hover transition-colors uppercase tracking-wider"
                    >
                      <ExternalLink size={14} />
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
