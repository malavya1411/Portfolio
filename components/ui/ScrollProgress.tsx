"use client";

import { useEffect, useState } from "react";

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (scrolled / total) * 100 : 0);
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[99996] h-[2px]" style={{ background: "var(--border)" }}>
      <div
        className="h-full transition-[width] duration-75 ease-linear"
        style={{ width: `${progress}%`, background: "var(--accent)" }}
      />
    </div>
  );
}
