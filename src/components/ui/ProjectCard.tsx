"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import type { Project } from "@/lib/data";

function GithubIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

const PLACEHOLDER_BLUR =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOCIgaGVpZ2h0PSI4IiB2aWV3Qm94PSIwIDAgOCA4IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSI4IiBoZWlnaHQ9IjgiIGZpbGw9IiMxOTE3MUYiLz48L3N2Zz4=";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-32px" }}
      transition={{ duration: 0.4, delay: (index % 3) * 0.07, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <Link
        href={`/projects/${project.slug}`}
        className="group flex flex-col bg-white border border-black/[0.06] rounded-[16px] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:translate-y-[-4px] hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] no-underline text-inherit cursor-pointer"
      >
        {/* Thumbnail */}
        <div className="aspect-[1.85/1] overflow-hidden w-full relative bg-elevated">
          {project.coverImage ? (
            <Image
              src={project.coverImage}
              alt={`${project.title} — project screenshot`}
              fill
              className="object-cover object-left-top transition-transform duration-500 group-hover:scale-105"
              placeholder="blur"
              blurDataURL={PLACEHOLDER_BLUR}
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center">
              <span className="text-text-tertiary text-xs font-mono">No preview</span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex flex-col items-center text-center py-5 px-5 relative">
          <div className="flex flex-col gap-0.5 items-center w-full px-6 min-w-0">
            <span className="text-[1.1rem] font-semibold text-text-primary leading-tight group-hover:text-accent transition-colors duration-200 truncate w-full text-center">
              {project.title}
            </span>
          </div>

          {/* Live demo icon — left */}
          {project.demo && (
            <div
              className="absolute left-3 top-[50%] translate-y-[-50%] text-text-secondary hover:text-accent transition-colors duration-200 flex items-center justify-center p-1.5 rounded-full hover:bg-black/5 shrink-0"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                window.open(project.demo!, "_blank");
              }}
              aria-label="View Live Demo"
            >
              <ArrowUpRight size={18} />
            </div>
          )}

          {/* GitHub icon — right */}
          {project.github && (
            <div
              className="absolute right-3 top-[50%] translate-y-[-50%] text-text-secondary hover:text-accent transition-colors duration-200 flex items-center justify-center p-1.5 rounded-full hover:bg-black/5 shrink-0"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                window.open(project.github, "_blank");
              }}
              aria-label="View on GitHub"
            >
              <GithubIcon size={18} />
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
