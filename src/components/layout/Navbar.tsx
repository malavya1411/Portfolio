"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, FileDown, Home, User, Code2, Briefcase, Award, Mail } from "lucide-react";
import { navItems, siteMetadata } from "@/lib/data";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { MobileMenu } from "@/components/ui/MobileMenu";
import { Container } from "@/components/ui/Container";
import { LimelightNav } from "@/components/ui/limelight-nav";

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

  const customItems = [
    {
      id: "home",
      icon: <Home className="w-5 h-5" />,
      label: "Home",
      onClick: () => document.getElementById("home")?.scrollIntoView({ behavior: "smooth" }),
    },
    {
      id: "about",
      icon: <User className="w-5 h-5" />,
      label: "About",
      onClick: () => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" }),
    },
    {
      id: "skills",
      icon: <Code2 className="w-5 h-5" />,
      label: "Skills",
      onClick: () => document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" }),
    },
    {
      id: "projects",
      icon: <Briefcase className="w-5 h-5" />,
      label: "Projects",
      onClick: () => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }),
    },
    {
      id: "achievements",
      icon: <Award className="w-5 h-5" />,
      label: "Achievements",
      onClick: () => document.getElementById("achievements")?.scrollIntoView({ behavior: "smooth" }),
    },
    {
      id: "contact",
      icon: <Mail className="w-5 h-5" />,
      label: "Contact",
      onClick: () => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }),
    },
  ];

  const activeIndex = customItems.findIndex((item) => item.id === activeSection);
  const currentActiveIndex = activeIndex >= 0 ? activeIndex : 0;

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
              <LimelightNav
                items={customItems}
                activeIndex={currentActiveIndex}
                className="bg-elevated/40 backdrop-blur-md rounded-full border border-border-t px-1 h-12"
                iconContainerClassName="px-4 py-0 flex items-center justify-center h-full"
                iconClassName="w-5 h-5 text-text-primary"
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
