"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, FileDown } from "lucide-react";
import { navItems, siteMetadata } from "@/lib/data";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { MobileMenu } from "@/components/ui/MobileMenu";
import { Container } from "@/components/ui/Container";
import { PillNav } from "@/components/ui/PillNav";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sectionIds = navItems.map((item) => item.href.replace("#", ""));
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: "-40% 0px -55% 0px" }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${
          isScrolled ? "glass-nav border-b border-border-t" : "bg-transparent"
        }`}
        initial={{ y: -72 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <Container>
          <nav
            className="flex h-[72px] items-center justify-between"
            role="navigation"
            aria-label="Main navigation"
          >
            {/* Wordmark */}
            <a
              href="#home"
              className="text-sm font-bold tracking-tight text-text-primary transition-colors duration-200 hover:text-accent"
              aria-label="Home"
            >
              Malavya Mankar
            </a>

            {/* Desktop links */}
            <div className="hidden items-center lg:flex">
              <PillNav
                items={navItems}
                activeHref={`#${activeSection}`}
                baseColor="var(--elevated)"
                pillColor="transparent"
                pillTextColor="var(--text-secondary)"
                hoveredPillTextColor="#ffffff"
                initialLoadAnimation={true}
              />
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-2">
              <ThemeToggle />

              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden items-center gap-1.5 rounded-[12px] border border-border-t px-4 py-2 text-sm font-medium text-text-secondary transition-all duration-200 hover:text-text-primary hover:border-border-strong sm:inline-flex"
              >
                <FileDown size={14} />
                Resume
              </a>

              <button
                onClick={() => setMobileOpen(true)}
                className="flex h-9 w-9 items-center justify-center rounded-xl text-text-secondary transition-colors duration-200 hover:text-text-primary hover:bg-elevated lg:hidden cursor-pointer"
                aria-label="Open navigation"
              >
                <Menu size={20} />
              </button>
            </div>
          </nav>
        </Container>
      </motion.header>

      <MobileMenu
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        activeSection={activeSection}
      />
    </>
  );
}
