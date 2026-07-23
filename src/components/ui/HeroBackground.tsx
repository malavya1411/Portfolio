"use client";

import { useRef } from "react";

/**
 * HeroBackground — living mesh-gradient backdrop for the hero section.
 *
 * Strategy:
 *  • Three SVG "blob" layers animate via CSS keyframes at 22-30 s periods.
 *  • No blur filters on animated elements — blobs are pre-blurred via SVG filter
 *    baked at paint time, composited with transform/opacity (GPU only).
 *  • A near-invisible SVG noise texture (opacity 0.03, mix-blend-mode: overlay)
 *    adds paper-like tactile depth and prevents banding.
 *  • prefers-reduced-motion: animation-duration collapses to 0.01 ms via the
 *    global rule already in globals.css — no extra JS needed.
 *  • Mobile: blob animations slow 20% via media query.
 */
export function HeroBackground() {
  const noiseId = "hero-bg-noise";
  const blur1Id = "hero-blob-blur-1";
  const blur2Id = "hero-blob-blur-2";
  const blur3Id = "hero-blob-blur-3";

  return (
    <div aria-hidden="true" className="hero-bg-root">
      {/* ── Animated blob layer ────────────────────────────────────────────── */}
      <svg
        className="hero-bg-svg"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Pre-baked blur for blobs — applied at definition time, NOT animated */}
          <filter id={blur1Id} x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="72" />
          </filter>
          <filter id={blur2Id} x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="96" />
          </filter>
          <filter id={blur3Id} x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="60" />
          </filter>

          {/* Fractal noise for paper texture */}
          <filter id={noiseId} x="0%" y="0%" width="100%" height="100%" colorInterpolationFilters="linearRGB">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.65"
              numOctaves="3"
              stitchTiles="stitch"
              result="noise"
            />
            <feColorMatrix type="saturate" values="0" in="noise" result="grayNoise" />
            <feBlend in="SourceGraphic" in2="grayNoise" mode="overlay" result="blended" />
            <feComposite in="blended" in2="SourceGraphic" operator="in" />
          </filter>

          <radialGradient id="hero-vignette" cx="50%" cy="45%" r="70%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="100%" stopColor="rgba(30,20,15,0.05)" />
          </radialGradient>
        </defs>

        {/* Base warm ivory fill */}
        <rect width="1440" height="900" fill="#FAF8F5" />

        {/* ── Blob 1: Muted coral — top-left drift (echoes robot orange) ── */}
        <ellipse
          cx="320"
          cy="280"
          rx="420"
          ry="320"
          fill="#E07A5F"
          fillOpacity="0.13"
          filter={`url(#${blur1Id})`}
          className="hero-blob hero-blob-coral"
        />

        {/* ── Blob 2: Warm sand — top-right slow arc ── */}
        <ellipse
          cx="1180"
          cy="180"
          rx="380"
          ry="300"
          fill="#F2CC8F"
          fillOpacity="0.11"
          filter={`url(#${blur2Id})`}
          className="hero-blob hero-blob-sand"
        />

        {/* ── Blob 3: Deep teal — bottom-center anchor ── */}
        <ellipse
          cx="720"
          cy="780"
          rx="500"
          ry="220"
          fill="#3D5A80"
          fillOpacity="0.09"
          filter={`url(#${blur1Id})`}
          className="hero-blob hero-blob-teal"
        />

        {/* ── Blob 4: secondary coral accent, right side ── */}
        <ellipse
          cx="1300"
          cy="550"
          rx="260"
          ry="200"
          fill="#E07A5F"
          fillOpacity="0.08"
          filter={`url(#${blur3Id})`}
          className="hero-blob hero-blob-coral2"
        />

        {/* ── Subtle vignette at edges ── */}
        <rect width="1440" height="900" fill="url(#hero-vignette)" />

        {/* ── Paper noise texture overlay ── */}
        <rect
          width="1440"
          height="900"
          fill="#FAF8F5"
          filter={`url(#${noiseId})`}
          opacity="0.035"
          style={{ mixBlendMode: "overlay" as const }}
        />
      </svg>

      {/* ── Gradient overlay to keep central text zone permanently clear ── */}
      <div className="hero-bg-overlay" />
    </div>
  );
}
