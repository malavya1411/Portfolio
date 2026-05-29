"use client";

import { motion } from "framer-motion";
import { SITE_CONFIG } from "@/lib/constants";

interface SectionHeadingProps {
  label: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  label,
  title,
  description,
  align = "center",
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <motion.div
      className={`mb-16 max-w-2xl ${alignClass}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: SITE_CONFIG.animationDuration.normal, ease: SITE_CONFIG.ease }}
    >
      <span className="mb-3 inline-block text-sm font-medium tracking-widest uppercase text-accent">
        {label}
      </span>
      <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-text-secondary sm:text-lg">
          {description}
        </p>
      )}
    </motion.div>
  );
}
