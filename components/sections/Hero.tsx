"use client";

import { motion } from "framer-motion";
import { ArrowDown, MapPin, GraduationCap, Users, Star } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { heroData } from "@/lib/data";
import { SITE_CONFIG } from "@/lib/constants";

const metaIcons = [MapPin, GraduationCap, Star, Users];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: SITE_CONFIG.animationDuration.normal,
      ease: SITE_CONFIG.ease,
    },
  },
};

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      {/* Subtle grid background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(var(--text-secondary) 1px, transparent 1px),
            linear-gradient(90deg, var(--text-secondary) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
        }}
      />

      {/* Subtle radial glow */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] opacity-20 rounded-full"
        style={{
          background:
            "radial-gradient(circle, var(--accent) 0%, transparent 70%)",
          filter: "blur(120px)",
        }}
      />

      <Container className="relative z-10">
        <motion.div
          className="flex flex-col items-center text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Greeting */}
          <motion.p
            className="text-sm font-medium tracking-widest uppercase text-accent"
            variants={itemVariants}
          >
            {heroData.greeting}
          </motion.p>

          {/* Name */}
          <motion.h1
            className="mt-4 text-4xl font-extrabold tracking-tight text-text-primary sm:text-6xl lg:text-7xl"
            variants={itemVariants}
          >
            {heroData.name}
          </motion.h1>

          {/* Role */}
          <motion.p
            className="mt-3 text-xl font-medium text-text-secondary sm:text-2xl"
            variants={itemVariants}
          >
            {heroData.role}
          </motion.p>

          {/* Tagline */}
          <motion.p
            className="mt-6 max-w-xl text-base leading-relaxed text-text-secondary sm:text-lg"
            variants={itemVariants}
          >
            {heroData.tagline}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
            variants={itemVariants}
          >
            <Button variant="primary" size="lg" href="#projects">
              {heroData.ctaPrimary}
              <ArrowDown size={16} className="ml-1" />
            </Button>
            <Button variant="outline" size="lg" href="#contact">
              {heroData.ctaSecondary}
            </Button>
          </motion.div>

          {/* Metadata Row */}
          <motion.div
            className="mt-16 flex flex-wrap items-center justify-center gap-6 sm:gap-8"
            variants={itemVariants}
          >
            {heroData.metadata.map((meta, i) => {
              const Icon = metaIcons[i] || Star;
              return (
                <div
                  key={meta.label}
                  className="flex items-center gap-2 text-sm text-text-secondary"
                >
                  <Icon size={14} className="text-accent/60" />
                  <span className="font-medium text-text-primary">
                    {meta.value}
                  </span>
                  <span className="hidden sm:inline">·</span>
                  <span className="hidden sm:inline">{meta.label}</span>
                </div>
              );
            })}
          </motion.div>

          {/* Terminal-like code panel */}
          <motion.div
            className="mt-16 w-full max-w-lg"
            variants={itemVariants}
          >
            <div className="card-base overflow-hidden">
              {/* Title bar */}
              <div className="flex items-center gap-2 border-b border-border-custom px-4 py-3">
                <div className="h-3 w-3 rounded-full bg-red-400/60" />
                <div className="h-3 w-3 rounded-full bg-yellow-400/60" />
                <div className="h-3 w-3 rounded-full bg-green-400/60" />
                <span className="ml-2 text-xs text-text-secondary font-mono">
                  ~/malavya/portfolio
                </span>
              </div>
              {/* Code content */}
              <div className="p-4 font-mono text-xs sm:text-sm leading-relaxed text-text-secondary">
                <p>
                  <span className="text-accent">const</span>{" "}
                  <span className="text-text-primary">developer</span>{" "}
                  <span className="text-accent">=</span> {"{"}
                </p>
                <p className="pl-4">
                  name:{" "}
                  <span className="text-green-400">&quot;Malavya Mankar&quot;</span>,
                </p>
                <p className="pl-4">
                  focus:{" "}
                  <span className="text-green-400">&quot;AI & Full-Stack&quot;</span>,
                </p>
                <p className="pl-4">
                  ships:{" "}
                  <span className="text-accent">true</span>,
                </p>
                <p className="pl-4">
                  status:{" "}
                  <span className="text-green-400">&quot;building something cool&quot;</span>,
                </p>
                <p>{"}"}</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
