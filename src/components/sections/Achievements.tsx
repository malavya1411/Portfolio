"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trophy,
  Award,
  GraduationCap,
  Medal,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  X,
  Sparkles,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { achievements } from "@/lib/data";
import type { Achievement } from "@/lib/data";

function getIcon(a: Achievement) {
  if (a.title.toLowerCase().includes("finalist") || a.title.toLowerCase().includes("top"))
    return Trophy;
  if (a.title.toLowerCase().includes("runner")) return Award;
  if (a.title.toLowerCase().includes("cgpa")) return GraduationCap;
  return Medal;
}

export function Achievements() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [previewCert, setPreviewCert] = useState<string | null>(null);
  const total = achievements.length;
  const pauseTimerRef = useRef<NodeJS.Timeout | null>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  // Single helper to trigger user interaction pause (5 seconds)
  const handleUserInteraction = useCallback(() => {
    setIsPaused(true);
    if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    pauseTimerRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 5000);
  }, []);

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const goToSlide = (index: number) => {
    handleUserInteraction();
    setActiveIndex(index);
  };

  // Autoplay 3000ms timer
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  // Keyboard navigation (ArrowLeft / ArrowRight)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        handleUserInteraction();
        prevSlide();
      } else if (e.key === "ArrowRight") {
        handleUserInteraction();
        nextSlide();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleUserInteraction, nextSlide, prevSlide]);

  // Scroll active timeline node into view smoothly on mobile
  useEffect(() => {
    if (timelineRef.current) {
      const activeEl = timelineRef.current.children[activeIndex] as HTMLElement;
      if (activeEl) {
        const container = timelineRef.current;
        const scrollLeft =
          activeEl.offsetLeft - container.clientWidth / 2 + activeEl.clientWidth / 2;
        container.scrollTo({ left: Math.max(0, scrollLeft), behavior: "smooth" });
      }
    }
  }, [activeIndex]);

  return (
    <section id="achievements" className="section-padding overflow-hidden relative">
      <Container>
        {/* Section Heading */}
        <motion.div
          className="mb-12 text-center max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <span className="mb-3 inline-block text-xs font-bold tracking-[0.2em] uppercase text-accent">
            Achievements
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
            Recognition
          </h2>
          <p className="mt-3 text-base text-text-secondary">
            Highlights from hackathons, competitions, and honors.
          </p>
        </motion.div>

        {/* ─── 1. TIMELINE TRACK WITH ACCURATE CENTERED LINE ─────────────────── */}
        <div className="relative mb-14 max-w-4xl mx-auto px-4 sm:px-8">
          <div
            ref={timelineRef}
            aria-label="Achievement timeline"
            className="overflow-x-auto py-3 scrollbar-none no-scrollbar snap-x relative min-w-full"
          >
            <div className="flex items-center justify-between min-w-full relative px-6 sm:px-10">
              {/* Background Connecting Line */}
              <div className="absolute left-10 right-10 top-[39px] h-[2px] bg-border-strong/60 pointer-events-none z-0 hidden sm:block" />

              {/* Active Animated Progress Track Line */}
              <motion.div
                className="absolute left-10 top-[39px] h-[2px] bg-gradient-to-r from-accent to-accent-hover pointer-events-none z-0 hidden sm:block origin-left"
                initial={false}
                animate={{
                  width: total > 1 ? `calc(${(activeIndex / (total - 1)) * 100}% - 80px)` : "0px",
                }}
                transition={{ duration: 0.55, ease: [0.25, 1, 0.5, 1] }}
              />

              {achievements.map((item, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <button
                    key={item.title + idx}
                    onClick={() => goToSlide(idx)}
                    className="flex flex-col items-center group relative cursor-pointer focus:outline-none snap-center shrink-0 z-10 min-w-[76px] sm:min-w-[90px]"
                    aria-label={`Go to ${item.title} (${item.year})`}
                    aria-current={isActive ? "true" : undefined}
                  >
                    {/* Year / Date Label */}
                    <span
                      className={`text-xs font-mono h-6 flex items-center justify-center transition-all duration-300 ${
                        isActive
                          ? "font-bold text-accent scale-110"
                          : "font-medium text-text-tertiary group-hover:text-text-secondary"
                      }`}
                    >
                      {item.year}
                    </span>

                    {/* Circular Node Row */}
                    <div className="h-7 flex items-center justify-center relative w-full my-0.5">
                      {/* Active Ring Indicator */}
                      {isActive && (
                        <motion.div
                          layoutId="active-node-halo"
                          className="absolute w-7 h-7 rounded-full bg-accent/20"
                          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        />
                      )}

                      <div
                        className={`rounded-full transition-all duration-300 flex items-center justify-center relative z-10 ${
                          isActive
                            ? "w-6 h-6 bg-accent text-white shadow-lg shadow-accent/40 ring-4 ring-accent/20"
                            : "w-4 h-4 bg-surface border-2 border-border-strong group-hover:border-accent group-hover:scale-125"
                        }`}
                      >
                        {isActive && <div className="w-2 h-2 rounded-full bg-white animate-pulse" />}
                      </div>
                    </div>

                    {/* Short Title Label below node */}
                    <span
                      className={`mt-1 text-[11px] leading-tight font-medium transition-all duration-300 max-w-[85px] text-center line-clamp-2 ${
                        isActive
                          ? "font-bold text-text-primary scale-105"
                          : "text-text-tertiary opacity-75 group-hover:opacity-100"
                      }`}
                    >
                      {item.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ─── 2. COVER FLOW CERTIFICATE CAROUSEL (100% CRISP OPAQUE CARDS) ───────────────────── */}
        <div className="relative min-h-[460px] sm:min-h-[500px] flex items-center justify-center px-4">
          {/* Navigation Buttons Overlay */}
          <button
            onClick={() => {
              handleUserInteraction();
              prevSlide();
            }}
            className="absolute left-2 sm:left-6 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-surface text-text-primary border border-border-strong shadow-xl hover:scale-110 hover:bg-elevated hover:text-accent transition-all cursor-pointer"
            aria-label="Previous certificate"
          >
            <ChevronLeft size={22} />
          </button>

          <button
            onClick={() => {
              handleUserInteraction();
              nextSlide();
            }}
            className="absolute right-2 sm:right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-surface text-text-primary border border-border-strong shadow-xl hover:scale-110 hover:bg-elevated hover:text-accent transition-all cursor-pointer"
            aria-label="Next certificate"
          >
            <ChevronRight size={22} />
          </button>

          {/* Cards Stack Container */}
          <div className="relative w-full max-w-4xl h-[420px] sm:h-[460px] flex items-center justify-center">
            {achievements.map((item, index) => {
              // Calculate relative circular offset
              let offset = index - activeIndex;
              if (offset < -Math.floor(total / 2)) offset += total;
              if (offset > Math.floor(total / 2)) offset -= total;

              const isCenter = offset === 0;
              const isPrev = offset === -1;
              const isNext = offset === 1;
              const isVisible = isCenter || isPrev || isNext;

              const Icon = getIcon(item);

              // Cover Flow horizontal offsets
              let xOffset = 0;
              if (isPrev) xOffset = -340;
              if (isNext) xOffset = 340;

              return (
                <motion.div
                  key={item.title + index}
                  className={`absolute w-[310px] sm:w-[380px] md:w-[420px] rounded-3xl border bg-surface p-6 sm:p-7 shadow-2xl transition-shadow duration-300 ${
                    isCenter
                      ? "border-accent/50 ring-2 ring-accent/20 shadow-accent/20 z-30"
                      : "border-border-strong cursor-pointer z-10"
                  }`}
                  initial={false}
                  animate={{
                    x: xOffset,
                    scale: isCenter ? 1 : isVisible ? 0.88 : 0.7,
                    opacity: isVisible ? 1 : 0,
                    zIndex: isCenter ? 30 : isVisible ? 10 : 0,
                    pointerEvents: isVisible ? "auto" : "none",
                  }}
                  whileHover={
                    isCenter
                      ? { y: -6, transition: { duration: 0.25, ease: "easeOut" } }
                      : { scale: 0.91, transition: { duration: 0.2, ease: "easeOut" } }
                  }
                  transition={{
                    duration: 0.5,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  onClick={() => {
                    if (!isCenter && isVisible) {
                      goToSlide(index);
                    }
                  }}
                  drag={isCenter ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={(_, info) => {
                    if (info.offset.x < -40) {
                      handleUserInteraction();
                      nextSlide();
                    } else if (info.offset.x > 40) {
                      handleUserInteraction();
                      prevSlide();
                    }
                  }}
                >
                  {/* Highlight Bar on Top */}
                  {item.highlight && (
                    <div className="absolute top-0 inset-x-0 h-1 rounded-t-3xl bg-gradient-to-r from-accent via-accent-hover to-accent" />
                  )}

                  {/* Thumbnail / Certificate Image Container */}
                  <div className="relative w-full h-38 sm:h-44 rounded-2xl overflow-hidden mb-5 bg-elevated border border-border-strong flex items-center justify-center group/img">
                    {item.certificate ? (
                      <img
                        src={item.certificate}
                        alt={`${item.title} certificate`}
                        className="w-full h-full object-cover object-center transition-transform duration-500 group-hover/img:scale-105"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-accent/15 via-elevated to-accent/5 flex flex-col items-center justify-center p-4 text-center relative overflow-hidden">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 text-accent mb-2 shadow-inner">
                          <Icon size={24} />
                        </div>
                        <span className="text-[11px] font-bold text-text-tertiary uppercase tracking-wider">
                          Official Distinction
                        </span>
                      </div>
                    )}

                    {/* Expand Certificate Hover Overlay */}
                    {item.certificate && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (item.certificate) setPreviewCert(item.certificate);
                        }}
                        className="absolute inset-0 bg-black/50 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 text-white text-xs font-bold cursor-pointer"
                      >
                        <Sparkles size={16} className="text-accent" /> Expand Certificate
                      </button>
                    )}
                  </div>

                  {/* Main Title & Rank */}
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-base sm:text-lg font-bold text-text-primary truncate">
                          {item.title}
                        </h3>
                        {item.rank && (
                          <span className="text-[11px] font-extrabold px-2 py-0.5 rounded-full bg-accent/10 text-accent border border-accent/20">
                            {item.rank}
                          </span>
                        )}
                      </div>
                      <p className="text-xs font-semibold text-accent/90 mt-0.5">{item.event}</p>
                    </div>

                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent shadow-sm">
                      <Icon size={18} />
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-text-secondary leading-relaxed line-clamp-3 mb-4">
                    {item.description}
                  </p>

                  {/* Footer Info */}
                  <div className="flex items-center justify-between pt-3 border-t border-border-strong text-xs">
                    <span className="font-mono text-text-tertiary font-medium">{item.year}</span>
                    {item.certificate ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (item.certificate) setPreviewCert(item.certificate);
                        }}
                        className="inline-flex items-center gap-1.5 font-bold text-accent hover:text-accent-hover transition-colors cursor-pointer group/link"
                      >
                        View Certificate{" "}
                        <ExternalLink
                          size={13}
                          className="transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                        />
                      </button>
                    ) : (
                      <span className="text-[11px] font-semibold text-text-tertiary/70">Verified Distinction</span>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Counter Indicator */}
        <div className="mt-8 text-center text-xs font-mono text-text-tertiary">
          Certificate <span className="font-bold text-text-primary">{activeIndex + 1}</span> of{" "}
          <span>{total}</span>
        </div>
      </Container>

      {/* ─── CERTIFICATE FULL-SCREEN PREVIEW MODAL ─────────────────────────── */}
      <AnimatePresence>
        {previewCert && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPreviewCert(null)}
          >
            <motion.div
              className="relative max-w-4xl w-full max-h-[90vh] bg-surface rounded-2xl p-3 overflow-hidden border border-border shadow-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setPreviewCert(null)}
                className="absolute top-4 right-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white hover:bg-accent transition-colors cursor-pointer"
                aria-label="Close certificate preview"
              >
                <X size={18} />
              </button>
              <img
                src={previewCert}
                alt="Certificate full view"
                className="w-full h-auto max-h-[82vh] object-contain rounded-xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
