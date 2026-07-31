"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects, Project } from "@/lib/data";

type TabType = "Featured Projects" | "Personal" | "Hackathons" | "Terminal";

function GithubIcon({ size = 20 }: { size?: number }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      style={{ width: size, height: size }}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function ProjectThumbnail({ coverImage, title }: { coverImage?: string; title: string }) {
  return (
    <div className="w-full h-full relative overflow-hidden select-none bg-gradient-to-br from-slate-100 to-slate-200">
      {coverImage ? (
        <img
          src={coverImage}
          alt={`${title} thumbnail`}
          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center p-4 text-center">
          <span className="text-xs font-bold text-slate-400">Thumbnail Preview</span>
        </div>
      )}
      {/* Sleek hover glass overlay + "Click here" prompt */}
      <div className="absolute inset-0 bg-black/35 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center pointer-events-none z-10">
        <span className="px-4 py-2 rounded-full bg-white/95 text-text-primary text-xs font-semibold shadow-lg backdrop-blur-md transform scale-90 group-hover:scale-100 transition-all duration-300 flex items-center gap-1.5 border border-white/50 tracking-wide">
          Click here
          <ArrowUpRight size={14} className="text-accent" />
        </span>
      </div>
    </div>
  );
}


export function Projects() {
  const [activeTab, setActiveTab] = useState<TabType>("Featured Projects");
  const [terminalHistory, setTerminalHistory] = useState<string[]>([
    "Welcome to Malavya's Interactive Terminal.",
    "Type 'help' to see all available commands.",
    ""
  ]);
  const [terminalInput, setTerminalInput] = useState("");
  const terminalInputRef = useRef<HTMLInputElement>(null);

  // Auto-switch to Terminal tab when navigated via #terminal hash
  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === "#terminal") {
        setActiveTab("Terminal");
        document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
      }
    };
    handleHash(); // run on mount in case page loaded with #terminal
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  // Order for featured top 5 — inbox-os first
  const FEATURED_ORDER = ["inbox-os", "git-stat", "code-explainer", "orbital-watch", "onboard-ai"];
  // Order for hackathon featured top 5
  const HACKATHON_ORDER = ["git-stat", "orbital-watch", "gig-shield", "onboard-ai", "crisis-sync"];
  // Order for personal projects
  const PERSONAL_ORDER = ["distil", "inbox-os", "code-explainer", "canopyml", "ai-finder", "code-scope"];

  // Filter projects based on tabs
  const getFilteredProjects = () => {
    let filtered: Project[] = [];
    if (activeTab === "Featured Projects") {
      filtered = projects.filter((p) => p.featured);
      return filtered.sort((a, b) => {
        const ai = FEATURED_ORDER.indexOf(a.slug);
        const bi = FEATURED_ORDER.indexOf(b.slug);
        if (ai !== -1 && bi !== -1) return ai - bi;
        if (ai !== -1) return -1;
        if (bi !== -1) return 1;
        return (b.demo ? 1 : 0) - (a.demo ? 1 : 0);
      });
    } else if (activeTab === "Personal") {
      filtered = projects.filter(
        (p) => p.context === "Personal Project" || p.context === "Open Source Project"
      );
      // Sort by PERSONAL_ORDER
      return filtered.sort((a, b) => {
        const ai = PERSONAL_ORDER.indexOf(a.slug);
        const bi = PERSONAL_ORDER.indexOf(b.slug);
        if (ai !== -1 && bi !== -1) return ai - bi;
        if (ai !== -1) return -1;
        if (bi !== -1) return 1;
        return (b.demo ? 1 : 0) - (a.demo ? 1 : 0);
      });
    } else if (activeTab === "Hackathons") {
      filtered = projects.filter(
        (p) =>
          p.status === "HACKATHON" ||
          p.status === "RUNNER-UP" ||
          p.status === "GOOGLE CHALLENGE" ||
          p.slug === "jr-06"
      );
      // Sort by preferred order first, then rest by demo availability
      return filtered.sort((a, b) => {
        const ai = HACKATHON_ORDER.indexOf(a.slug);
        const bi = HACKATHON_ORDER.indexOf(b.slug);
        if (ai !== -1 && bi !== -1) return ai - bi;
        if (ai !== -1) return -1;
        if (bi !== -1) return 1;
        return (b.demo ? 1 : 0) - (a.demo ? 1 : 0);
      });
    }
    return filtered;
  };

  const getTabCount = (tab: TabType) => {
    if (tab === "Featured Projects") {
      return projects.filter((p) => p.featured).length;
    }
    if (tab === "Personal") {
      return projects.filter(
        (p) => p.context === "Personal Project" || p.context === "Open Source Project"
      ).length;
    }
    if (tab === "Hackathons") {
      return projects.filter(
        (p) =>
          p.status === "HACKATHON" ||
          p.status === "RUNNER-UP" ||
          p.status === "GOOGLE CHALLENGE" ||
          p.slug === "jr-06"
      ).length;
    }
    return null;
  };

  const filteredProjects = getFilteredProjects();
  const MAX_DISPLAY = 5;
  const displayedProjects = activeTab === "Terminal" ? filteredProjects : filteredProjects.slice(0, MAX_DISPLAY);
  const hasMore = filteredProjects.length > MAX_DISPLAY;

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
      response = "Core Projects:\n- Distil        : Grounded RAG platform for legal & academic documents\n- InboxOS       : Open-source AI email operating system & pipeline\n- OrbitalWatch : Real-time 3D space tracking & collision dashboard\n- HireMind     : Recruiter AI candidate profiling platform\n- OnboardAI    : Autonomous dev RAG onboarding agent";
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
    <section id="projects" className="projects-section relative overflow-hidden">
      <div className="projects-container relative z-10">
        
        {/* Section Header */}
        <div className="projects-header flex flex-col items-center text-center gap-2 mb-10">
          <h2 className="text-text-primary font-semibold text-[2.5rem] tracking-[-0.02em] leading-tight">
            Find My Work
          </h2>
        </div>

        {/* Pill-shaped filter tabs switcher */}
        <div className="project-tabs-container mb-[48px] flex justify-center">
          <div className="project-tabs flex items-center bg-surface/80 backdrop-blur-xl p-[6px] rounded-full border border-border">
            {(["Featured Projects", "Personal", "Hackathons", "Terminal"] as TabType[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`project-tab relative py-2.5 px-6 rounded-full font-medium text-[0.95rem] transition-all duration-300 select-none border-none cursor-pointer ${
                  activeTab === tab ? "active" : ""
                }`}
              >
                <span className="flex items-center gap-1.5">
                  {tab}
                  {getTabCount(tab) !== null && (
                    <span className="text-[0.75rem] px-1.5 py-0.5 rounded-full bg-black/5 font-semibold text-text-secondary transition-colors duration-200">
                      {getTabCount(tab)}
                    </span>
                  )}
                </span>

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
          /* Responsive Grid Layout */
          <div className="flex flex-col items-center gap-10">
            <div className="project-grid pb-0 w-full">
              {displayedProjects.map((project) => (
                <Link 
                  key={project.slug} 
                  href={`/projects/${project.slug}`}
                  className="project-card-v2 group flex flex-col bg-white border border-black/[0.06] rounded-[16px] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:translate-y-[-4px] hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] no-underline text-inherit cursor-pointer"
                >
                  {/* Card image/thumbnail area */}
                  <div className="project-card-image-wrap aspect-[1.85/1] overflow-hidden w-full relative">
                    <ProjectThumbnail coverImage={project.coverImage} title={project.title} />
                  </div>
                  {/* Card Content Footer */}
                  <div className="project-card-footer flex flex-col items-center text-center py-6 px-[20px] relative">
                    <div className="flex flex-col gap-1 items-center text-center w-full px-6 min-w-0">
                      <span className="project-card-title text-[1.25rem] font-semibold text-text-primary leading-tight group-hover:text-accent transition-colors duration-200 truncate font-sans">
                        {project.title}
                      </span>
                    </div>
                    {project.demo && (
                      <div 
                        className="project-card-demo-icon absolute left-3 top-[50%] translate-y-[-50%] text-text-secondary hover:text-accent transition-colors duration-200 flex items-center justify-center p-1.5 rounded-full hover:bg-black/5 shrink-0" 
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          window.open(project.demo!, "_blank");
                        }}
                        aria-label="View Live Demo"
                      >
                        <ArrowUpRight size={20} />
                      </div>
                    )}
                    {project.github && (
                      <div 
                        className="project-card-github-icon absolute right-3 top-[50%] translate-y-[-50%] text-text-secondary hover:text-accent transition-colors duration-200 flex items-center justify-center p-1.5 rounded-full hover:bg-black/5 shrink-0" 
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          window.open(project.github, "_blank");
                        }}
                        aria-label="View on GitHub"
                      >
                        <GithubIcon size={20} />
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2.5 rounded-full border border-black/10 bg-white px-6 py-3 text-sm font-semibold text-text-secondary shadow-sm transition-all duration-200 hover:border-accent/40 hover:bg-accent/5 hover:text-accent hover:shadow-md"
            >
              View all {activeTab === "Featured Projects" ? projects.length : filteredProjects.length} projects
              <ArrowUpRight size={15} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        )}

      </div>
    </section>
  );
}
