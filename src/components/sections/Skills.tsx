"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { skillGroups } from "@/lib/data";
import { 
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiNodedotjs, 
  SiPostgresql, SiSupabase, SiFirebase, SiVercel, SiGithub, 
  SiSlack, SiVite, SiExpress, SiGooglemaps, SiFlutter
} from "react-icons/si";
import { Monitor, Database, Brain, Cloud, Sparkles, Cpu, Layers, HelpCircle, Mail, Network } from "lucide-react";

const categoryNameMap: Record<string, string> = {
  "Frontend": "Frontend",
  "Backend": "Backend",
  "AI / ML": "AI & Machine Learning",
  "Tools & Platforms": "Tools & Integrations"
};

function getCategoryIcon(category: string) {
  switch (category.toLowerCase()) {
    case "frontend":
      return Monitor;
    case "backend":
      return Database;
    case "ai / ml":
    case "ai & machine learning":
      return Brain;
    case "tools & platforms":
    case "tools & integrations":
      return Cloud;
    default:
      return HelpCircle;
  }
}

function getSkillIcon(skill: string) {
  switch (skill.toLowerCase()) {
    case "next.js":
    case "next.js 15":
    case "next.js 16":
      return <SiNextdotjs className="w-4 h-4 text-text-primary" />;
    case "react":
      return <SiReact className="w-4 h-4 text-[#61DAFB]" />;
    case "typescript":
      return <SiTypescript className="w-4 h-4 text-[#3178C6]" />;
    case "tailwind css":
      return <SiTailwindcss className="w-4 h-4 text-[#38BDF8]" />;
    case "vite":
      return <SiVite className="w-4 h-4 text-[#646CFF]" />;
    case "flutter":
      return <SiFlutter className="w-4 h-4 text-[#02569B]" />;
    case "node.js":
      return <SiNodedotjs className="w-4 h-4 text-[#339933]" />;
    case "express":
      return <SiExpress className="w-4 h-4 text-text-primary" />;
    case "postgresql":
      return <SiPostgresql className="w-4 h-4 text-[#4169E1]" />;
    case "supabase":
      return <SiSupabase className="w-4 h-4 text-[#3ECF8E]" />;
    case "firebase":
      return <SiFirebase className="w-4 h-4 text-[#FFCA28]" />;
    case "jwt auth":
      return <Layers className="w-4 h-4 text-[#E65100]" />;
    case "gemini api":
      return <Sparkles className="w-4 h-4 text-[#1A73E8]" />;
    case "vector embeddings":
      return <Layers className="w-4 h-4 text-[#9DB6A2]" />;
    case "rag systems":
      return <Network className="w-4 h-4 text-[#9DB6A2]" />;
    case "mediapipe":
      return <Cpu className="w-4 h-4 text-[#34A853]" />;
    case "prompt engineering":
      return <Brain className="w-4 h-4 text-accent" />;
    case "persona detection":
      return <Cpu className="w-4 h-4 text-[#FF6D00]" />;
    case "github oauth":
      return <SiGithub className="w-4 h-4 text-text-primary" />;
    case "nodemailer / smtp":
      return <Mail className="w-4 h-4 text-[#EA4335]" />;
    case "slack block kit":
      return <SiSlack className="w-4 h-4 text-[#4A154B]" />;
    case "vercel":
      return <SiVercel className="w-4 h-4 text-text-primary" />;
    case "render":
      return <Cloud className="w-4 h-4 text-[#46E3B7]" />;
    case "google maps sdk":
      return <SiGooglemaps className="w-4 h-4 text-[#4285F4]" />;
    default:
      return <HelpCircle className="w-4 h-4 text-text-tertiary" />;
  }
}

export function Skills() {
  return (
    <section id="skills" className="section-padding bg-bg">
      <Container>
        {/* Header Block */}
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
            Tech Stack
          </h2>
          <p className="mt-3 max-w-lg text-base text-text-secondary">
            The technologies, tools, and platforms I use to build scalable, intelligent products.
          </p>
        </motion.div>

        {/* Legend */}
        <motion.div
          className="mb-6 flex items-center gap-5"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-48px" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <div className="flex items-center gap-2 text-xs text-text-tertiary">
            <span className="inline-block h-2 w-2 rounded-full bg-accent" />
            Primary
          </div>
          <div className="flex items-center gap-2 text-xs text-text-tertiary">
            <span className="inline-block h-2 w-2 rounded-full bg-border-strong" />
            Supporting
          </div>
        </motion.div>

        {/* Rows of Skills */}
        <div className="flex flex-col gap-6">
          {skillGroups.map((group, i) => {
            const CategoryIcon = getCategoryIcon(group.category);
            const displayName = categoryNameMap[group.category] || group.category;
            // Use skillsWithTier if available, fall back to plain skills list
            const tieredSkills = group.skillsWithTier ?? group.skills.map((s) => ({ name: s, tier: "secondary" as const }));
            const primarySkills = tieredSkills.filter((s) => s.tier === "primary");
            const secondarySkills = tieredSkills.filter((s) => s.tier === "secondary");

            return (
              <motion.div
                key={group.category}
                className="card card-trace flex flex-col gap-6 p-6 lg:flex-row lg:items-start lg:justify-between"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-48px" }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
              >
                {/* Category Header */}
                <div className="flex items-start gap-4 lg:w-[280px] shrink-0">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-elevated border border-border-t text-accent">
                    <CategoryIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-text-primary">{displayName}</h3>
                    <p className="mt-1 text-xs text-text-tertiary leading-relaxed">
                      {group.description}
                    </p>
                  </div>
                </div>

                {/* Tiered Badges */}
                <div className="flex flex-col gap-4 lg:flex-1 lg:pl-6 lg:border-l lg:border-border-t">
                  {/* Primary */}
                  {primarySkills.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {primarySkills.map((skill) => (
                        <div
                          key={skill.name}
                          className="flex items-center gap-2 rounded-xl bg-accent/8 border border-accent/25 px-3.5 py-2 text-xs font-bold text-text-primary hover:border-accent/45 hover:bg-accent/12 transition-all cursor-default"
                        >
                          {getSkillIcon(skill.name)}
                          <span>{skill.name}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Secondary */}
                  {secondarySkills.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {secondarySkills.map((skill) => (
                        <div
                          key={skill.name}
                          className="flex items-center gap-2 rounded-xl bg-elevated/30 border border-border-t px-3 py-1.5 text-xs font-medium text-text-secondary hover:border-accent/20 hover:bg-elevated/60 transition-all cursor-default opacity-80"
                        >
                          {getSkillIcon(skill.name)}
                          <span>{skill.name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Callout Bar */}
        <motion.div
          className="card card-trace mt-8 p-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-surface/50 backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-48px" }}
          transition={{ duration: 0.5, delay: 0.35, ease: "easeOut" }}
        >
          <div className="flex items-center gap-3">
            <span className="text-accent shrink-0">
              <Sparkles className="w-5 h-5" />
            </span>
            <p className="text-sm font-medium text-text-secondary">
              Continuously learning, building, and shipping products with modern technologies.
            </p>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-accent hover:text-accent-hover transition-colors shrink-0 group cursor-pointer"
          >
            Let's build something great together
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
        </motion.div>
      </Container>
    </section>
  );
}
