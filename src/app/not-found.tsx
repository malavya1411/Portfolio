import Link from "next/link";
import { ArrowLeft, FolderOpen } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 — Page Not Found",
  description: "The page you are looking for does not exist.",
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-bg text-text-primary antialiased flex items-center justify-center px-4">
      {/* Dot grid background */}
      <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.05]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="notfound-dot" x="0" y="0" width="36" height="36" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="currentColor" className="text-accent" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#notfound-dot)" />
        </svg>
      </div>

      <div className="relative z-10 card p-10 sm:p-14 max-w-lg w-full text-center">
        {/* Accent top bar */}
        <div className="absolute top-0 left-0 w-full h-[3px] bg-accent rounded-t-2xl" />

        {/* 404 Label */}
        <span className="inline-block mb-4 text-xs font-mono font-bold tracking-[0.22em] uppercase text-accent">
          404 Error
        </span>

        {/* Big number */}
        <p className="text-[5rem] sm:text-[7rem] font-extrabold leading-none text-text-primary opacity-10 select-none">
          404
        </p>

        {/* Message */}
        <h1 className="mt-4 text-2xl sm:text-3xl font-bold tracking-tight text-text-primary">
          Page not found
        </h1>
        <p className="mt-4 text-base text-text-secondary leading-relaxed max-w-xs mx-auto">
          Looks like this page doesn&apos;t exist. Maybe it was moved, renamed, or never existed.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-bold text-white transition-all duration-200 hover:bg-accent-hover hover:scale-[0.98] active:scale-95 shadow-[0_12px_30px_rgba(217,140,95,0.22)] w-full sm:w-auto justify-center"
          >
            <ArrowLeft size={15} />
            Back to Home
          </Link>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-surface px-7 py-3.5 text-sm font-bold text-text-secondary transition-all duration-200 hover:text-text-primary hover:border-accent/40 hover:scale-[0.98] active:scale-95 w-full sm:w-auto justify-center"
          >
            <FolderOpen size={15} />
            View Projects
          </Link>
        </div>
      </div>
    </div>
  );
}
