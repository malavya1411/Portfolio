"use client";

import { motion } from "framer-motion";
import { SITE_CONFIG } from "@/lib/constants";
import type { SkillGroup } from "@/lib/data";

interface SkillCardProps {
  group: SkillGroup;
  index: number;
}

export function SkillCard({ group, index }: SkillCardProps) {
  return (
    <motion.div
      className="card-base p-6 sm:p-8"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: SITE_CONFIG.animationDuration.normal,
        delay: index * 0.1,
        ease: SITE_CONFIG.ease,
      }}
    >
      <h3 className="text-lg font-bold text-text-primary">{group.category}</h3>
      <p className="mt-1 text-sm text-text-secondary">{group.description}</p>

      <div className="mt-5 flex flex-wrap gap-2">
        {group.skills.map((skill) => (
          <span
            key={skill}
            className="rounded-lg bg-elevated px-3 py-1.5 text-sm font-medium text-text-primary border border-border-custom transition-colors duration-200 hover:border-accent/30 hover:text-accent"
          >
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
