"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShaderAnimation } from "./shader-animation";

export function PageLoader() {
  const [phase, setPhase] = useState<"loading" | "pulse" | "exit" | "done">("loading");
  const [lineExpand, setLineExpand] = useState(false);

  useEffect(() => {
    // Phase 1: show name + expand line
    const t1 = setTimeout(() => setLineExpand(true), 300);
    // Phase 2: pulse
    const t2 = setTimeout(() => setPhase("pulse"), 900);
    // Phase 3: exit
    const t3 = setTimeout(() => setPhase("exit"), 1400);
    // Phase 4: done
    const t4 = setTimeout(() => setPhase("done"), 2100);

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, []);

  if (phase === "done") return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[99999] flex items-center justify-center overflow-hidden"
        style={{ background: "#000" }}
        initial={{ y: 0 }}
        animate={phase === "exit" ? { y: "-100%" } : { y: 0 }}
        transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
      >
        {/* Background shader animation */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-80">
          <ShaderAnimation />
        </div>

        <div className="relative z-10 flex flex-col items-center gap-0">
          {/* Initials */}
          <motion.div
            className="flex flex-col items-center gap-1 select-none"
            initial={{ opacity: 0, y: 10 }}
            animate={{
              opacity: phase === "exit" ? 0 : 1,
              y: phase === "exit" ? -10 : 0,
            }}
            transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ fontFamily: "var(--font-inter)" }}
          >
            <span className="text-[2.6rem] font-bold tracking-[0.08em] text-white leading-tight">
              Malavya Mankar
            </span>
            <span className="text-[1rem] font-light tracking-[0.35em] text-white/60 uppercase">
              Portfolio
            </span>
          </motion.div>

          {/* Accent line */}
          <div
            className="h-[1.5px] bg-accent mt-3 transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
            style={{ width: lineExpand ? "min(300px, 70vw)" : 0 }}
          />

          {/* Role text */}
          <motion.p
            className="mt-3 text-[10px] tracking-[0.22em] uppercase text-accent"
            style={{ fontFamily: "monospace" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === "exit" ? 0 : 1 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            AI &amp; Full-Stack Developer
          </motion.p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

