"use client";

import { motion } from "framer-motion";
import { Trophy, Award, Medal, Star, GraduationCap } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import type { Achievement } from "@/lib/data";

const iconMap: Record<string, typeof Trophy> = {
  trophy: Trophy,
  award: Award,
  medal: Medal,
  star: Star,
  graduation: GraduationCap,
};

function getAchievementIcon(title: string) {
  if (title.toLowerCase().includes("finalist") || title.toLowerCase().includes("top"))
    return Trophy;
  if (title.toLowerCase().includes("runner")) return Award;
  if (title.toLowerCase().includes("cgpa")) return GraduationCap;
  return Medal;
}

interface AchievementCardProps {
  achievement: Achievement;
  index: number;
}

export function AchievementCard({ achievement, index }: AchievementCardProps) {
  const Icon = getAchievementIcon(achievement.title);

  return (
    <motion.div
      className={`card-base relative p-6 sm:p-8 ${
        achievement.highlight
          ? "border-accent/30 bg-accent/[0.03]"
          : ""
      }`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: SITE_CONFIG.animationDuration.normal,
        delay: index * 0.1,
        ease: SITE_CONFIG.ease,
      }}
    >
      {achievement.highlight && (
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent rounded-t-[20px]" />
      )}

      <div className="flex items-start gap-4">
        <div
          className={`flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-xl ${
            achievement.highlight
              ? "bg-accent/10 text-accent"
              : "bg-elevated text-text-secondary"
          }`}
        >
          <Icon size={20} />
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-base font-bold text-text-primary">
              {achievement.title}
            </h3>
            <span className="text-xs text-text-secondary">{achievement.year}</span>
          </div>
          <p className="mt-0.5 text-sm font-medium text-accent">
            {achievement.event}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-text-secondary">
            {achievement.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
