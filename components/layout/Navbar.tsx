"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Menu, FileDown } from "lucide-react";
import { navItems, siteMetadata } from "@/lib/data";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { MobileMenu } from "@/components/ui/MobileMenu";
import { Container } from "@/components/ui/Container";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);

  // Track scroll position for navbar background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track active section via IntersectionObserver
  useEffect(() => {
    const sectionIds = navItems.map((item) => item.href.replace("#", ""));
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
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
          isScrolled
            ? "glass border-b border-border-custom"
            : "bg-transparent"
        }`}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <Container>
          <nav
            className="flex h-[72px] items-center justify-between"
            role="navigation"
            aria-label="Main navigation"
          >
            {/* Logo / Monogram */}
            <a
              href="#home"
              className="relative z-10 text-lg font-bold tracking-tight text-text-primary transition-colors duration-200 hover:text-accent"
              aria-label="Home"
            >
              <span className="text-accent">M</span>
              <span>M</span>
              <span className="text-text-secondary text-xs font-normal ml-2 hidden sm:inline">
                {siteMetadata.role}
              </span>
            </a>

            {/* Desktop nav links */}
            <div className="hidden items-center gap-1 lg:flex">
              {navItems.map((item) => {
                const isActive =
                  activeSection === item.href.replace("#", "");
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    className={`relative rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                      isActive
                        ? "text-accent"
                        : "text-text-secondary hover:text-text-primary"
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <motion.div
                        className="absolute bottom-0.5 left-3 right-3 h-[2px] rounded-full bg-accent"
                        layoutId="nav-underline"
                        transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
                      />
                    )}
                  </a>
                );
              })}
            </div>

            {/* Right side actions */}
            <div className="flex items-center gap-2">
              <ThemeToggle />

              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden items-center gap-1.5 rounded-[14px] border border-border-custom px-4 py-2 text-sm font-medium text-text-primary transition-all duration-200 hover:border-accent/40 hover:text-accent sm:inline-flex"
              >
                <FileDown size={15} />
                Resume
              </a>

              {/* Mobile menu trigger */}
              <button
                onClick={() => setMobileOpen(true)}
                className="flex h-9 w-9 items-center justify-center rounded-xl text-text-secondary transition-colors duration-200 hover:text-text-primary hover:bg-elevated lg:hidden cursor-pointer"
                aria-label="Open navigation menu"
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
