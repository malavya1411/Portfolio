"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ExternalLink, MessageCircle, Lock } from "lucide-react";
import Image from "next/image";
import type { Project, ProjectStatus } from "@/lib/data";

function GithubIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

const PLACEHOLDER_BLUR =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOCIgaGVpZ2h0PSI4IiB2aWV3Qm94PSIwIDAgOCA4IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSI4IiBoZWlnaHQ9IjgiIGZpbGw9IiMxOTE3MUYiLz48L3N2Zz4=";

function renderStatusBadge(status: ProjectStatus | undefined) {
  switch (status) {
    case "COMPLETED":
      return (
        <span className="inline-flex items-center gap-1.5 rounded border border-emerald-500/40 bg-emerald-500/8 px-3 py-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 tracking-wider uppercase">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          COMPLETED
        </span>
      );
    case "IN_PROGRESS":
      return (
        <span className="inline-flex items-center gap-1.5 rounded border border-amber-500/40 bg-amber-500/5 px-3 py-1 text-[11px] font-bold text-amber-600 dark:text-amber-400 tracking-wider uppercase">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
          IN PROGRESS
        </span>
      );
    case "PLANNED":
      return (
        <span className="inline-flex items-center gap-1.5 rounded border border-blue-500/40 bg-blue-500/5 px-3 py-1 text-[11px] font-bold text-blue-600 dark:text-blue-400 tracking-wider uppercase">
          PLANNED
        </span>
      );
    case "HACKATHON":
      return (
        <span className="inline-flex items-center rounded bg-rose-600 px-3 py-1 text-[11px] font-bold text-white tracking-wider uppercase">
          HACKATHON
        </span>
      );
    case "RUNNER-UP":
      return (
        <span className="inline-flex items-center rounded bg-emerald-600 px-3 py-1 text-[11px] font-bold text-white tracking-wider uppercase">
          RUNNER-UP
        </span>
      );
    case "GOOGLE CHALLENGE":
      return (
        <span className="inline-flex items-center rounded bg-sky-600 px-3 py-1 text-[11px] font-bold text-white tracking-wider uppercase">
          GOOGLE CHALLENGE
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center gap-1.5 rounded border border-amber-500/40 bg-amber-500/5 px-3 py-1 text-[11px] font-bold text-amber-600 dark:text-amber-400 tracking-wider uppercase">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
          IN PROGRESS
        </span>
      );
  }
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const router = useRouter();

  return (
    <>
      <motion.article
        onClick={() => router.push(`/projects/${project.slug}`)}
        className="project-card card group flex h-full cursor-pointer flex-col overflow-hidden bg-surface transition-all duration-300 hover:translate-y-[-4px]"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-48px" }}
        transition={{ duration: 0.5, delay: index * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {/* Cover visual area with View Project overlay on hover */}
        <div className="project-card-media relative h-[230px] w-full overflow-hidden border-b border-border-t bg-elevated">
          {/* Overlay showing "VIEW PROJECT" on hover */}
          <a
            href={`/projects/${project.slug}`}
            onClick={(e) => e.stopPropagation()}
            className="absolute inset-0 z-10 flex items-center justify-center bg-slate-950/78 opacity-0 backdrop-blur-[1.5px] transition-opacity duration-300 group-hover:opacity-100"
            aria-label={`View ${project.title} case study`}
          >
            <div className="rounded-full border border-white/80 px-5 py-2 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-white">
                VIEW PROJECT
              </span>
            </div>
          </a>
          {/* Image */}
          {project.coverImage ? (
            <Image
              src={project.coverImage}
              alt={`${project.title} — project screenshot by Malavya Mankar`}
              fill
              className="object-cover object-left-top transition-transform duration-500 group-hover:scale-105"
              placeholder="blur"
              blurDataURL={PLACEHOLDER_BLUR}
              sizes="(max-width: 1024px) 100vw, 33vw"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center bg-elevated">
              <span className="text-text-tertiary text-xs font-mono">No preview</span>
            </div>
          )}
        </div>

        {/* Content details below image */}
        <div className="project-card-body flex flex-1 flex-col p-6">
          {/* Tag row */}
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            {renderStatusBadge(project.status)}
            <span className="rounded border border-border-strong/50 bg-elevated/40 px-2.5 py-1 text-[10px] font-bold text-text-secondary tracking-wider uppercase">
              {project.categoryTag || "FULL STACK"}
            </span>
          </div>

          {/* Title */}
          <h3 className="project-card-title mb-3 text-2xl font-extrabold tracking-tight text-text-primary transition-colors duration-200 group-hover:text-accent">
            {project.title}
          </h3>

          {/* Description */}
          <p className="project-card-summary mb-5 flex-1 text-base leading-relaxed text-text-secondary line-clamp-3">
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
          <div className="flex items-center gap-2.5 border-t border-border-t/40 pt-4 mt-auto flex-wrap">
            {project.isPrivateRepo ? (
              <span className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg border border-border-strong/30 px-3.5 py-2 text-xs font-bold text-text-tertiary uppercase tracking-wider cursor-not-allowed">
                <Lock size={11} />
                Private
              </span>
            ) : (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg border border-accent/30 px-3.5 py-2 text-xs font-bold text-accent hover:bg-accent/10 transition-colors uppercase tracking-wider"
                aria-label={`View ${project.title} on GitHub`}
              >
                <GithubIcon size={13} />
                GitHub
              </a>
            )}

            {project.demo ? (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg border border-accent/30 px-3.5 py-2 text-xs font-bold text-accent hover:bg-accent/10 transition-colors uppercase tracking-wider"
                aria-label={`Visit ${project.title} live demo`}
              >
                <ExternalLink size={12} />
                Live Demo
              </a>
            ) : project.demoAvailableOnRequest ? (
              <span className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg border border-border-t/40 px-3.5 py-2 text-xs font-medium text-text-tertiary uppercase tracking-wider">
                <MessageCircle size={12} className="text-accent" />
                On Request
              </span>
            ) : null}
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
    </>
  );
}
