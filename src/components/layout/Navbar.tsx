"use client";

import { useState } from "react";
import { Moon, Sun, X } from "lucide-react";

const links = [
  ["Skills.", "#skills"],
  ["Work.", "#projects"],
  ["LinkedIn.", "https://www.linkedin.com/in/malavya-mankar-002037382"],
  ["Github.", "https://github.com/malavya1411"],
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
  };

  return (
    <header className="expandable-nav-shell">
      <nav className={`expandable-nav${open ? " is-open" : ""}`} aria-label="Primary navigation">
        <button
          onClick={() => setOpen((value) => !value)}
          className="expandable-nav-name"
          aria-expanded={open}
          aria-label="Toggle navigation"
        >
          <span className="expandable-nav-icon" aria-hidden="true">
            <svg
              className="expandable-nav-menu-icon"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.4}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="4" y1="8" x2="20" y2="8" />
              <line x1="4" y1="16" x2="20" y2="16" />
            </svg>
            <X className="expandable-nav-close-icon" size={24} strokeWidth={2.4} />
          </span>
          <span>Malavya Mankar.</span>
        </button>
        <button onClick={toggleTheme} className="expandable-nav-theme" aria-label="Toggle theme">
          {dark ? <Sun size={17} /> : <Moon size={17} />}
        </button>
        <div className="expandable-nav-links">
          {links.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setOpen(false)} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined}>{label}</a>
          ))}
        </div>
      </nav>
    </header>
  );
}
