"use client";

import { motion } from "framer-motion";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/data";

function GithubIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

/* Unique abstract visual per project — no generic code windows */
function ProjectVisual({ slug }: { slug: string }) {
  const visuals: Record<string, React.ReactNode> = {
    "on-board-ai": null,
    "crisis-sync": <CrisisSyncVisual />,
    "git-stat": <GitStatVisual />,
    "ai-finder": <AiFinderVisual />,
    "jr-06": <Jr06Visual />,
  };
  return (
    <div
      className="relative overflow-hidden bg-elevated"
      style={{ height: "148px" }}
    >
      {visuals[slug] || <DefaultVisual slug={slug} />}
    </div>
  );
}

function CrisisSyncVisual() {
  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 148" fill="none" preserveAspectRatio="xMidYMid slice">
      <pattern id="cs-dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
        <circle cx="1" cy="1" r="0.8" fill="var(--border-strong)" opacity="0.6" />
      </pattern>
      <rect width="100%" height="100%" fill="url(#cs-dots)" />
      {/* Map pin cluster */}
      <circle cx="180" cy="74" r="36" stroke="var(--accent)" strokeWidth="1" opacity="0.15" />
      <circle cx="180" cy="74" r="20" stroke="var(--accent)" strokeWidth="1" opacity="0.25" />
      <circle cx="180" cy="74" r="5" fill="var(--accent)" opacity="0.9" />
      <circle cx="220" cy="55" r="4" fill="var(--text-secondary)" opacity="0.5" />
      <circle cx="155" cy="95" r="3" fill="var(--text-secondary)" opacity="0.4" />
      <line x1="180" y1="74" x2="220" y2="55" stroke="var(--accent)" strokeWidth="0.8" opacity="0.3" />
      <line x1="180" y1="74" x2="155" y2="95" stroke="var(--accent)" strokeWidth="0.8" opacity="0.3" />
      <text x="16" y="130" fontSize="9" fill="var(--text-tertiary)" fontFamily="monospace">Real-time · Firebase · Gemini AI</text>
    </svg>
  );
}

function GitStatVisual() {
  const bars = [32, 48, 28, 60, 44, 72, 38, 56, 50, 68];
  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 148" fill="none" preserveAspectRatio="xMidYMid slice">
      <pattern id="gs-dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
        <circle cx="1" cy="1" r="0.8" fill="var(--border-strong)" opacity="0.6" />
      </pattern>
      <rect width="100%" height="100%" fill="url(#gs-dots)" />
      {bars.map((h, i) => (
        <rect
          key={i}
          x={60 + i * 28}
          y={110 - h}
          width="16"
          height={h}
          rx="3"
          fill={i === 5 ? "var(--accent)" : "var(--text-secondary)"}
          opacity={i === 5 ? 0.8 : 0.2}
        />
      ))}
      <text x="16" y="130" fontSize="9" fill="var(--text-tertiary)" fontFamily="monospace">Contributor health · GitHub OAuth · Gemini</text>
    </svg>
  );
}

function AiFinderVisual() {
  const items = ["Search AI tools", "Rate limit: 60/hr", "80+ agents indexed", "Semantic match"];
  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 148" fill="none" preserveAspectRatio="xMidYMid slice">
      <pattern id="af-dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
        <circle cx="1" cy="1" r="0.8" fill="var(--border-strong)" opacity="0.6" />
      </pattern>
      <rect width="100%" height="100%" fill="url(#af-dots)" />
      {items.map((item, i) => (
        <g key={i}>
          <rect x="40" y={24 + i * 26} width="220" height="18" rx="4" fill="var(--surface)" opacity="0.8" />
          <text x="52" y={36 + i * 26} fontSize="8.5" fill={i === 0 ? "var(--accent)" : "var(--text-secondary)"} fontFamily="monospace">{item}</text>
        </g>
      ))}
    </svg>
  );
}

function Jr06Visual() {
  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 148" fill="none" preserveAspectRatio="xMidYMid slice">
      <pattern id="jr-dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
        <circle cx="1" cy="1" r="0.8" fill="var(--border-strong)" opacity="0.6" />
      </pattern>
      <rect width="100%" height="100%" fill="url(#jr-dots)" />
      {/* Table rows */}
      {[0,1,2,3].map(i => (
        <g key={i}>
          <rect x="40" y={28 + i * 24} width="300" height="16" rx="3" fill={i === 0 ? "var(--accent)" : "var(--surface)"} opacity={i === 0 ? 0.15 : 0.7} />
          <rect x="40" y={28 + i * 24} width="300" height="16" rx="3" stroke="var(--border-strong)" strokeWidth="0.5" />
          {i === 0 && <text x="52" y={40 + i * 24} fontSize="8" fill="var(--accent)" fontFamily="monospace" fontWeight="600">Part ID · Component · Qty · Location</text>}
          {i > 0 && <text x="52" y={40 + i * 24} fontSize="8" fill="var(--text-secondary)" fontFamily="monospace">PCB-{100+i} · Capacitor · {i*12} · Shelf-{i}</text>}
        </g>
      ))}
      <text x="16" y="130" fontSize="9" fill="var(--text-tertiary)" fontFamily="monospace">PostgreSQL · JWT · Recharts</text>
    </svg>
  );
}

function DefaultVisual({ slug }: { slug: string }) {
  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 148" fill="none" preserveAspectRatio="xMidYMid slice">
      <pattern id="def-dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
        <circle cx="1" cy="1" r="0.8" fill="var(--border-strong)" opacity="0.6" />
      </pattern>
      <rect width="100%" height="100%" fill="url(#def-dots)" />
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
      className="card card-trace group flex flex-col overflow-hidden"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-48px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {/* Visual area */}
      <ProjectVisual slug={project.slug} />

      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            {project.badge && (
              <span className="mb-2 inline-block rounded-full bg-accent/10 px-2.5 py-0.5 text-[11px] font-semibold text-accent border border-accent/20">
                {project.badge}
              </span>
            )}
            <h3 className="text-base font-bold text-text-primary group-hover:text-accent transition-colors duration-200 mt-1">
              {project.title}
            </h3>
            <p className="mt-0.5 text-xs text-text-tertiary">{project.context}</p>
          </div>
          <span className="text-xs text-text-tertiary shrink-0 mt-1">{project.year}</span>
        </div>

        <p className="text-sm leading-relaxed text-text-secondary flex-1">
          {project.summary}
        </p>

        {/* Outcome */}
        <p className="mt-3 text-xs leading-relaxed text-text-tertiary border-l-2 border-accent/30 pl-3">
          {project.outcome}
        </p>

        {/* Tech chips */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.techStack.slice(0, 5).map((tech) => (
            <span
              key={tech}
              className="rounded-md bg-elevated px-2 py-0.5 text-[11px] font-medium text-text-secondary border border-border-t"
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 5 && (
            <span className="rounded-md bg-elevated px-2 py-0.5 text-[11px] font-medium text-text-tertiary border border-border-t">
              +{project.techStack.length - 5}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="mt-5 flex items-center gap-2.5">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.title} on GitHub`}
            className="inline-flex items-center gap-1.5 rounded-xl border border-border-t px-3.5 py-2 text-xs font-medium text-text-secondary transition-all duration-200 hover:text-text-primary hover:border-border-strong"
          >
            <GithubIcon size={13} />
            GitHub
          </a>
          {project.demo ? (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} live demo`}
              className="inline-flex items-center gap-1.5 rounded-xl bg-accent px-3.5 py-2 text-xs font-medium text-white transition-colors duration-200 hover:bg-accent-hover"
            >
              <ExternalLink size={12} />
              Live Demo
            </a>
          ) : (
            <span className="inline-flex items-center gap-1.5 rounded-xl border border-border-t px-3.5 py-2 text-xs font-medium text-text-tertiary cursor-not-allowed opacity-60">
              <ExternalLink size={12} />
              Private
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
}
