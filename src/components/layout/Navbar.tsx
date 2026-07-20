"use client";

import { useState, useEffect } from "react";
import { Mail, X } from "lucide-react";

const links = [
  ["Skills.", "#skills"],
  ["Work.", "#projects"],
  ["LinkedIn.", "https://www.linkedin.com/in/malavya-mankar-002037382"],
  ["Github.", "https://github.com/malavya1411"],
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("");

  useEffect(() => {
    // Track hash changes to highlight explicitly clicked links
    const handleHashChange = () => {
      setActiveLink(window.location.hash || "");
    };
    window.addEventListener("hashchange", handleHashChange);
    handleHashChange(); // Run check on mount

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return (
    <>
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
          <div className="expandable-nav-links">
            {links.map(([label, href]) => (
              <a
                key={href}
                href={href}
                onClick={() => {
                  setOpen(false);
                  setActiveLink(href);
                }}
                className={activeLink === href ? "active" : ""}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noreferrer" : undefined}
              >
                {label}
              </a>
            ))}
          </div>
        </nav>
      </header>

      {/* Floating top right action buttons (Mail/Envelope) */}
      <div className="top-right-nav-actions">
        <a href="mailto:malavyamankar@gmail.com" className="nav-action-btn" aria-label="Email contact">
          <Mail size={18} />
        </a>
      </div>
    </>
  );
}
