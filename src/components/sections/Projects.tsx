"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/data";

type TabType = "Personal" | "Projects" | "Published" | "Terminal";

export function Projects() {
  const [activeTab, setActiveTab] = useState<TabType>("Personal");
  const [terminalHistory, setTerminalHistory] = useState<string[]>([
    "Welcome to Malavya's Interactive Terminal.",
    "Type 'help' to see all available commands.",
    ""
  ]);
  const [terminalInput, setTerminalInput] = useState("");
  const terminalInputRef = useRef<HTMLInputElement>(null);

  // Filter projects based on tabs
  const getFilteredProjects = () => {
    if (activeTab === "Personal") {
      // Personal projects or SaaS
      return projects.filter(
        (p) => p.slug === "ai-finder" || p.slug === "jr-06" || p.slug === "git-stat"
      );
    }
    if (activeTab === "Projects") {
      // Hackathons and core featured projects
      return projects.filter(
        (p) => p.slug === "hiremind" || p.slug === "onboard-ai" || p.slug === "crisis-sync"
      );
    }
    if (activeTab === "Published") {
      // Shipped projects with working public links
      return projects.filter(
        (p) => p.demo !== null && p.demo !== undefined
      );
    }
    return [];
  };

  const filteredProjects = getFilteredProjects();

  const handleTerminalCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = terminalInput.trim().toLowerCase();
    if (!cmd) return;

    let response = "";
    if (cmd === "help") {
      response = "Available commands:\n  - bio      : About Malavya\n  - skills   : Technical stack\n  - projects : Core highlights\n  - contact  : Reach out info\n  - clear    : Clear screen";
    } else if (cmd === "bio") {
      response = "Malavya Mankar is an AI & Data Science B.Tech student at VESIT, Mumbai. Shipped 6+ production tools, placed top 6 at Syrus 2026, and runner-up at national hackathons.";
    } else if (cmd === "skills") {
      response = "Languages : TypeScript, JavaScript, Python, C++\nFrontend  : Next.js 15, React, Tailwind CSS\nBackend   : Node.js, Express, PostgreSQL, Supabase";
    } else if (cmd === "projects") {
      response = "Core Projects:\n- HireMind   : Recruiter AI candidate profiling platform\n- OnboardAI  : Autonomous dev RAG onboarding agent\n- CrisisSync : Real-time maps disaster response system";
    } else if (cmd === "contact") {
      response = "Email    : malavyamankar@gmail.com\nGitHub   : github.com/malavya1411\nLinkedIn : linkedin.com/in/malavya-mankar-002037382";
    } else if (cmd === "clear") {
      setTerminalHistory([]);
      setTerminalInput("");
      return;
    } else {
      response = `Command not found: '${cmd}'. Type 'help' for options.`;
    }

    setTerminalHistory((prev) => [...prev, `> ${terminalInput}`, response, ""]);
    setTerminalInput("");
  };

  return (
    <section id="projects" className="projects-section">
      <div className="projects-container">
        
        {/* Section Header */}
        <div className="projects-header">
          <span className="section-label projects-label">01 — SELECTED WORK</span>
        </div>

        {/* Pill-shaped filter tabs */}
        <div className="project-tabs-container">
          <div className="project-tabs">
            {(["Personal", "Projects", "Published", "Terminal"] as TabType[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`project-tab ${activeTab === tab ? "active" : ""}`}
              >
                {tab}
                {tab === "Terminal" && (
                  <span className="project-tab-badge">NEW</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Project Content Area */}
        {activeTab === "Terminal" ? (
          /* Retro Interactive Terminal Emulator */
          <div 
            className="terminal-viewport"
            onClick={() => terminalInputRef.current?.focus()}
          >
            <div className="terminal-header">
              <div className="terminal-dots">
                <span className="terminal-dot red" />
                <span className="terminal-dot yellow" />
                <span className="terminal-dot green" />
              </div>
              <span className="terminal-title">malavya@portfolio:~</span>
            </div>
            <div className="terminal-body">
              {terminalHistory.map((line, i) => (
                <div key={i} className="terminal-line">{line}</div>
              ))}
              <form onSubmit={handleTerminalCommand} className="terminal-form">
                <span className="terminal-prompt">$</span>
                <input
                  ref={terminalInputRef}
                  type="text"
                  value={terminalInput}
                  onChange={(e) => setTerminalInput(e.target.value)}
                  className="terminal-input"
                  autoFocus
                  placeholder="type command..."
                />
              </form>
            </div>
          </div>
        ) : (
          /* Responsive 3+2 Grid Layout */
          <div className="project-grid">
            {filteredProjects.map((project) => (
              <Link 
                href={`/projects/${project.slug}`} 
                key={project.slug} 
                className="project-card-v2 group"
              >
                <div className="project-card-image-wrap">
                  <img 
                    src={project.coverImage || "/images/git_stat.png"} 
                    alt={project.title} 
                    className="project-card-image"
                  />
                </div>
                <div className="project-card-footer">
                  <span className="project-card-title">{project.title}</span>
                  {project.github && (
                    <div 
                      className="project-card-github-icon" 
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(project.github, "_blank");
                      }}
                      aria-label="View on GitHub"
                    >
                      <svg 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      >
                        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                        <path d="M9 18c-4.51 2-5-2-7-2" />
                      </svg>
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
