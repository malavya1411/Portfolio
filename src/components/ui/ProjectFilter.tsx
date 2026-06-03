"use client";

import { motion } from "framer-motion";

const DISPLAY_TAGS: Record<string, string> = {
  "All": "All",
  "AI": "AI",
  "Full-Stack": "Full Stack",
  "Frontend": "Frontend",
  "DevTools": "DevTools",
  "SaaS": "SaaS",
  "Enterprise": "Enterprise",
  "Mobile": "Mobile",
};

interface ProjectFilterProps {
  tags: string[];
  activeTag: string;
  onChange: (tag: string) => void;
}

export function ProjectFilter({ tags, activeTag, onChange }: ProjectFilterProps) {
  return (
    <div
      role="group"
      aria-label="Filter projects by tag"
      className="flex flex-wrap gap-2"
    >
      {tags.map((tag) => {
        const isActive = tag === activeTag;
        const label = DISPLAY_TAGS[tag] ?? tag;
        return (
          <button
            key={tag}
            id={`filter-${tag.toLowerCase().replace(/\s+/g, "-")}`}
            onClick={() => onChange(tag)}
            aria-pressed={isActive}
            className={`relative px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
              isActive
                ? "bg-accent text-white shadow-[0_4px_16px_rgba(217,140,95,0.30)]"
                : "border border-border-strong/50 bg-surface text-text-secondary hover:text-text-primary hover:border-accent/40 hover:bg-elevated"
            }`}
          >
            {isActive && (
              <motion.span
                layoutId="active-filter-pill"
                className="absolute inset-0 rounded-full bg-accent"
                style={{ zIndex: -1 }}
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            {label}
          </button>
        );
      })}
    </div>
  );
}
