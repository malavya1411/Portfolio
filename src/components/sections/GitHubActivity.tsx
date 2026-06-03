"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Activity } from "lucide-react";

const GITHUB_USERNAME = "malavya1411";

type Theme = "dark" | "light";

function useThemeClass(): Theme {
  const [theme, setTheme] = useState<Theme>("dark");
  useEffect(() => {
    const check = () =>
      setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light");
    check();
    const observer = new MutationObserver(check);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);
  return theme;
}

// Inline SVG skeleton placeholder
function StatSkeleton() {
  return (
    <div className="h-[195px] w-full rounded-xl bg-elevated/40 border border-border-t animate-pulse" />
  );
}

interface StatCardImgProps {
  src: string;
  alt: string;
  height?: number;
}

function StatCardImg({ src, alt, height = 195 }: StatCardImgProps) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);
  return (
    <div className="relative w-full overflow-hidden rounded-xl border border-border-t bg-elevated/20" style={{ minHeight: height }}>
      {!loaded && !errored && <StatSkeleton />}
      {errored ? (
        <div className="flex items-center justify-center" style={{ height }}>
          <span className="text-xs text-text-tertiary">Stats unavailable</span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setErrored(true)}
          className={`w-full h-auto block transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0 absolute inset-0"}`}
          style={{ height: loaded ? "auto" : 0 }}
        />
      )}
    </div>
  );
}

export function GitHubActivity() {
  const theme = useThemeClass();

  const bgParam = theme === "dark" ? "0d1117" : "F5F2E8";
  const textColorParam = theme === "dark" ? "F4EFE7" : "141414";
  const titleColorParam = theme === "dark" ? "D98C5F" : "B96A3B";
  const iconColorParam = theme === "dark" ? "D98C5F" : "B96A3B";
  const borderColorParam = theme === "dark" ? "24202B" : "EBE6D4";
  const ringColorParam = theme === "dark" ? "D98C5F" : "B96A3B";
  const fireColorParam = theme === "dark" ? "D98C5F" : "B96A3B";

  const statsUrl =
    `https://github-readme-stats.vercel.app/api?username=${GITHUB_USERNAME}` +
    `&show_icons=true&hide_border=true&count_private=true` +
    `&bg_color=${bgParam}&text_color=${textColorParam}&title_color=${titleColorParam}&icon_color=${iconColorParam}` +
    `&border_radius=12&custom_title=GitHub+Stats`;

  const streakUrl =
    `https://github-readme-streak-stats.herokuapp.com/?user=${GITHUB_USERNAME}` +
    `&hide_border=true&background=${bgParam}&stroke=${borderColorParam}` +
    `&ring=${ringColorParam}&fire=${fireColorParam}&currStreakLabel=${titleColorParam}` +
    `&sideLabels=${textColorParam}&dates=${textColorParam}&border_radius=12`;

  const langsUrl =
    `https://github-readme-stats.vercel.app/api/top-langs/?username=${GITHUB_USERNAME}` +
    `&layout=compact&hide_border=true&count_private=true&langs_count=6` +
    `&bg_color=${bgParam}&text_color=${textColorParam}&title_color=${titleColorParam}` +
    `&border_radius=12&custom_title=Top+Languages`;

  return (
    <section id="github-activity" className="section-padding bg-bg">
      <Container>
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <div className="flex items-center gap-3 mb-2">
            <Activity className="w-5 h-5 text-accent" />
            <span className="text-sm font-medium tracking-widest uppercase text-accent">
              Open Source
            </span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
            GitHub Activity
          </h2>
          <p className="mt-3 max-w-lg text-base text-text-secondary">
            Always shipping. Always learning.
          </p>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-48px" }}
            transition={{ duration: 0.5, delay: 0, ease: "easeOut" }}
          >
            <StatCardImg
              src={statsUrl}
              alt="Malavya Mankar GitHub stats"
              height={195}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-48px" }}
            transition={{ duration: 0.5, delay: 0.08, ease: "easeOut" }}
          >
            <StatCardImg
              src={streakUrl}
              alt="Malavya Mankar GitHub streak"
              height={195}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-48px" }}
            transition={{ duration: 0.5, delay: 0.16, ease: "easeOut" }}
            className="sm:col-span-2 lg:col-span-1"
          >
            <StatCardImg
              src={langsUrl}
              alt="Malavya Mankar top languages"
              height={195}
            />
          </motion.div>
        </div>

        <motion.div
          className="mt-5 flex justify-center"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-48px" }}
          transition={{ duration: 0.4, delay: 0.24, ease: "easeOut" }}
        >
          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-bold text-accent hover:text-accent-hover transition-colors group"
            aria-label="View Malavya Mankar on GitHub"
          >
            View full GitHub profile
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
        </motion.div>
      </Container>
    </section>
  );
}
