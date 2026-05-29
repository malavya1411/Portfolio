"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { navItems } from "@/lib/data";
import { SITE_CONFIG } from "@/lib/constants";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  activeSection: string;
}

export function MobileMenu({ isOpen, onClose, activeSection }: MobileMenuProps) {
  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.nav
            className="fixed inset-y-0 right-0 z-50 w-[280px] bg-surface border-l border-border-custom shadow-xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              duration: SITE_CONFIG.animationDuration.fast,
              ease: SITE_CONFIG.easeOut,
            }}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <div className="flex h-[72px] items-center justify-end px-6">
              <button
                onClick={onClose}
                className="flex h-10 w-10 items-center justify-center rounded-xl text-text-secondary hover:text-text-primary hover:bg-elevated transition-colors duration-200 cursor-pointer"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex flex-col gap-1 px-4">
              {navItems.map((item) => {
                const isActive =
                  activeSection === item.href.replace("#", "");
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className={`rounded-xl px-4 py-3 text-base font-medium transition-colors duration-200 ${
                      isActive
                        ? "bg-accent/10 text-accent"
                        : "text-text-secondary hover:text-text-primary hover:bg-elevated"
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}
            </div>

            <div className="absolute bottom-8 left-4 right-4">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-[14px] bg-accent px-6 py-3 text-sm font-medium text-white transition-colors duration-200 hover:bg-accent-hover"
              >
                Download Resume
              </a>
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
}
