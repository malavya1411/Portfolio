"use client";

import { motion } from "framer-motion";
import { Mail, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { contactLinks } from "@/lib/data";
import { StarBorder } from "@/components/ui/StarBorder";

function GithubIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function LinkedinIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function DevpostIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M6.002 1.61L0 12.004 6.002 22.39h11.996L24 12.004 17.998 1.61zm1.593 4.084h3.947c3.605 0 6.276 1.695 6.276 6.31 0 4.436-3.21 6.302-6.456 6.302H7.595zm2.517 2.449v7.714h1.241c2.646 0 3.862-1.55 3.862-3.861.009-2.569-1.096-3.853-3.767-3.853Z" />
    </svg>
  );
}

/** LeetCode SVG icon */
function LeetCodeIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16.102 17.93l-2.697 2.607c-.466.467-1.111.662-1.823.662s-1.357-.195-1.824-.662l-4.332-4.363c-.467-.467-.702-1.15-.702-1.863s.235-1.357.702-1.824l4.319-4.38c.467-.467 1.125-.645 1.837-.645s1.357.195 1.823.662l2.697 2.606c.514.515 1.365.497 1.9-.038.535-.536.553-1.387.039-1.901l-2.609-2.519c-.877-.846-2.029-1.362-3.237-1.417l.006-3.051c0-.744-.601-1.345-1.345-1.345s-1.345.601-1.345 1.345v3.052c-1.208.055-2.36.571-3.237 1.417L3.062 10.56c-1.354 1.353-1.354 3.544 0 4.897l4.331 4.331c1.354 1.353 3.544 1.353 4.898 0l2.697-2.607c.514-.515.496-1.366-.039-1.9-.535-.535-1.386-.553-1.847-.351z" />
    </svg>
  );
}

const socialIcons: Record<string, React.ComponentType<{ size?: number }>> = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  devpost: DevpostIcon,
  leetcode: LeetCodeIcon,
  mail: ({ size }) => <Mail size={size} />,
};

export function Contact() {
  const emailLink = contactLinks.find((l) => l.icon === "mail");
  const socials = contactLinks.filter((l) => l.icon !== "mail");

  return (
    <section id="contact" className="section-padding">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <span className="mb-4 inline-block text-sm font-medium tracking-widest uppercase text-accent">
              Contact
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
              Let's build something.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-text-secondary max-w-md">
              Open to internship opportunities, interesting projects, and good engineering conversations. If you're building something ambitious, let's talk.
            </p>

            {/* Email CTA */}
            {emailLink && (
              <div className="mt-8 inline-block">
                <StarBorder
                  as="a"
                  href={emailLink.href}
                  className="hover:scale-[0.98] active:scale-95 transition-all duration-200"
                  speed="5s"
                  thickness={1.5}
                >
                  <span className="flex items-center gap-2.5 font-semibold text-sm">
                    <Mail size={16} />
                    {emailLink.href.replace("mailto:", "")}
                    <ArrowRight size={14} />
                  </span>
                </StarBorder>
              </div>
            )}

            {/* Social links */}
            <div className="mt-6 flex items-center gap-3">
              {socials.map((link) => {
                const Icon = socialIcons[link.icon];
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-border-t text-text-secondary transition-all duration-200 hover:text-text-primary hover:border-border-strong hover:bg-elevated"
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </motion.div>

          {/* Right: availability + DSA card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="card card-trace p-8">
              <div className="flex items-center gap-3 mb-5">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400" />
                </span>
                <span className="text-sm font-semibold text-text-primary">Available for opportunities</span>
              </div>

              <div className="space-y-4 text-sm text-text-secondary">
                <div className="flex justify-between py-3 border-b border-border-t">
                  <span className="text-text-tertiary">Role</span>
                  <span className="font-medium text-text-primary">Internship / SWE Roles</span>
                </div>
                <div className="flex justify-between py-3 border-b border-border-t">
                  <span className="text-text-tertiary">Focus</span>
                  <span className="font-medium text-text-primary">AI · Full-Stack · DevTools</span>
                </div>
                <div className="flex justify-between py-3 border-b border-border-t">
                  <span className="text-text-tertiary">Timeline</span>
                  <span className="font-medium text-text-primary">Open to discuss</span>
                </div>
                <div className="flex justify-between py-3 border-b border-border-t">
                  <span className="text-text-tertiary">Location</span>
                  <span className="font-medium text-text-primary">Mumbai · Remote</span>
                </div>
              </div>

              <p className="mt-6 text-xs text-text-tertiary leading-relaxed">
                Currently building with AlgoMinds. Always shipping.
              </p>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
