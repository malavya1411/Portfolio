"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/data";

type TabType = "Personal" | "Projects" | "Published" | "Terminal";

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

function ProjectThumbnail({ slug }: { slug: string }) {
  if (slug === "git-stat") {
    return (
      <div className="w-full h-full bg-[#0f172a] text-[#34d399] p-3 flex flex-col justify-between font-mono select-none overflow-hidden relative">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#34d399 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 text-[9px] text-slate-400 z-10">
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ef4444]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#eab308]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
            <span className="ml-1 font-mono text-[8px] text-slate-300">gitstat-dashboard</span>
          </div>
          <span className="text-emerald-400 font-semibold tracking-wider text-[8px] bg-emerald-500/10 px-1 py-0.5 rounded">LIVE</span>
        </div>
        {/* Dashboard Preview */}
        <div className="flex-1 flex flex-col justify-center gap-2 py-1 z-10">
          <div className="text-[10px] font-bold text-slate-100 leading-tight">
            "Understand who's building. Before they disappear."
          </div>
          {/* Commit Grid */}
          <div className="grid grid-cols-12 gap-1 w-full">
            {Array.from({ length: 24 }).map((_, i) => {
              const opacities = [0.1, 0.3, 0.6, 0.9, 0.4, 0.2];
              const opacity = opacities[i % opacities.length];
              return (
                <div 
                  key={i} 
                  className="aspect-square rounded-[1px]" 
                  style={{ backgroundColor: `rgba(52, 211, 153, ${opacity})` }}
                />
              );
            })}
          </div>
        </div>
        {/* Metrics Footer */}
        <div className="flex justify-between items-center text-[8px] text-slate-500 border-t border-slate-800 pt-1 z-10">
          <span>BRANCH: MAIN</span>
          <span className="text-emerald-400 font-bold">142 COMMITS</span>
        </div>
      </div>
    );
  }

  if (slug === "ai-finder") {
    return (
      <div className="w-full h-full bg-[#1a1a2e] text-slate-300 p-3 flex flex-col justify-between select-none overflow-hidden relative">
        {/* Grid background */}
        <div className="absolute inset-0 opacity-[0.08] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(99,102,241,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.15) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
        {/* Top Header */}
        <div className="flex items-center justify-between text-[8px] uppercase tracking-wider text-indigo-400 font-bold z-10">
          <span>AI AGENT DIRECTORY</span>
          <span className="bg-indigo-500/10 px-1.5 py-0.5 rounded text-[7px]">80+ Tools</span>
        </div>
        {/* Grid of Tool Cards */}
        <div className="flex-1 flex flex-col justify-center gap-1.5 z-10">
          <div className="grid grid-cols-2 gap-1.5">
            <div className="bg-[#16162a]/80 border border-slate-800 p-1.5 rounded flex items-center gap-1 min-w-0">
              <span className="w-3.5 h-3.5 rounded bg-indigo-500 flex items-center justify-center text-[8px] font-bold text-white shrink-0">M</span>
              <div className="flex flex-col min-w-0 leading-none">
                <span className="text-[8.5px] font-bold text-white truncate">Midjourney</span>
                <span className="text-[6.5px] text-slate-500 truncate">Image Gen</span>
              </div>
            </div>
            <div className="bg-[#16162a]/80 border border-slate-800 p-1.5 rounded flex items-center gap-1 min-w-0">
              <span className="w-3.5 h-3.5 rounded bg-rose-500 flex items-center justify-center text-[8px] font-bold text-white shrink-0">J</span>
              <div className="flex flex-col min-w-0 leading-none">
                <span className="text-[8.5px] font-bold text-white truncate">Jasper AI</span>
                <span className="text-[6.5px] text-slate-500 truncate">Copywriting</span>
              </div>
            </div>
            <div className="bg-[#16162a]/80 border border-slate-800 p-1.5 rounded flex items-center gap-1 min-w-0">
              <span className="w-3.5 h-3.5 rounded bg-sky-500 flex items-center justify-center text-[8px] font-bold text-white shrink-0">C</span>
              <div className="flex flex-col min-w-0 leading-none">
                <span className="text-[8.5px] font-bold text-white truncate">Copilot</span>
                <span className="text-[6.5px] text-slate-500 truncate">Developer</span>
              </div>
            </div>
            <div className="bg-[#16162a]/80 border border-slate-800 p-1.5 rounded flex items-center gap-1 min-w-0">
              <span className="w-3.5 h-3.5 rounded bg-amber-500 flex items-center justify-center text-[8px] font-bold text-white shrink-0">G</span>
              <div className="flex flex-col min-w-0 leading-none">
                <span className="text-[8.5px] font-bold text-white truncate">Gemini</span>
                <span className="text-[6.5px] text-slate-500 truncate">Chatbot</span>
              </div>
            </div>
          </div>
        </div>
        <div className="text-[7.5px] text-slate-500 text-center font-mono uppercase tracking-widest border-t border-slate-800/50 pt-1 z-10">
          Semantic Search Enabled
        </div>
      </div>
    );
  }

  if (slug === "jr-06") { // Inventory Management
    return (
      <div className="w-full h-full bg-[#f8fafc] text-slate-800 p-3 flex flex-col justify-between select-none overflow-hidden relative border-b border-slate-100">
        {/* Subtle grid */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
        {/* Title */}
        <div className="flex items-center justify-between text-[8px] uppercase tracking-wider text-slate-400 font-semibold z-10">
          <span>INVENTORY CONTROL</span>
          <span className="text-emerald-500 font-bold">STATUS: OK</span>
        </div>
        {/* Chart / Graphs */}
        <div className="flex-1 flex items-end gap-2 py-2 px-1 z-10">
          {/* Bar Chart Mock */}
          <div className="flex-1 flex items-end gap-1 h-full">
            <div className="w-full bg-[#22c55e] rounded-t-sm" style={{ height: '40%' }} />
            <div className="w-full bg-[#22c55e] rounded-t-sm" style={{ height: '75%' }} />
            <div className="w-full bg-[#22c55e] rounded-t-sm" style={{ height: '60%' }} />
            <div className="w-full bg-[#10b981] rounded-t-sm" style={{ height: '90%' }} />
            <div className="w-full bg-[#059669] rounded-t-sm" style={{ height: '50%' }} />
          </div>
          {/* Pie Chart / Mini Stats */}
          <div className="w-16 h-full flex flex-col justify-center gap-0.5 border-l border-slate-200 pl-2 shrink-0">
            <div className="text-[6.5px] text-slate-400 leading-none">TOTAL ITEMS</div>
            <div className="text-[10px] font-bold text-slate-700 leading-none">1,248</div>
            <div className="w-full bg-slate-200 h-1 rounded-full overflow-hidden mt-0.5">
              <div className="bg-[#22c55e] h-full" style={{ width: '70%' }} />
            </div>
          </div>
        </div>
        {/* Footer */}
        <div className="text-[7.5px] text-slate-400 border-t border-slate-100 pt-1 flex justify-between font-mono z-10">
          <span>DB: POSTGRESQL</span>
          <span>AUDIT LOG ACTIVE</span>
        </div>
      </div>
    );
  }

  if (slug === "ai-messaging") {
    return (
      <div className="w-full h-full bg-gradient-to-br from-[#dbeafe] to-[#eff6ff] text-slate-800 p-3 flex flex-col justify-between select-none overflow-hidden relative">
        {/* Phone mockups overlay */}
        <div className="absolute inset-0 flex justify-end items-end p-2 opacity-95">
          {/* Phone mockup */}
          <div className="w-[72px] h-[105px] bg-slate-900 rounded-t-lg border-x-[1.5px] border-t-[1.5px] border-slate-800 p-0.5 shadow-2xl flex flex-col gap-0.5 translate-y-3">
            <div className="w-4 h-0.5 bg-slate-800 mx-auto rounded-full" />
            <div className="flex-1 bg-white rounded-t-md p-0.5 flex flex-col gap-0.5 overflow-hidden">
              <div className="bg-blue-100 text-[5px] text-blue-800 p-0.5 rounded-sm max-w-[85%] self-end">
                Yes, that sounds perfect!
              </div>
              <div className="bg-slate-100 text-[5px] text-slate-700 p-0.5 rounded-sm max-w-[85%]">
                Crafting message...
              </div>
              <div className="bg-blue-500 text-[5px] text-white p-0.5 rounded-sm max-w-[80%] self-end font-semibold">
                Perfect messaging.
              </div>
            </div>
          </div>
        </div>
        {/* Text Details */}
        <div className="z-10 max-w-[65%] flex flex-col gap-0.5">
          <span className="text-[8px] uppercase tracking-wider text-blue-600 font-bold">MESSAGING COPILOT</span>
          <div className="text-[10.5px] font-bold text-slate-900 leading-tight">
            "Transform your thoughts into effective messages"
          </div>
        </div>
        <div className="z-10 text-[7.5px] text-blue-500 font-mono">
          GEMINI API POWERED
        </div>
      </div>
    );
  }

  if (slug === "boldbot") {
    return (
      <div className="w-full h-full bg-white text-slate-800 p-3 flex flex-col justify-between select-none overflow-hidden relative">
        {/* Geometric Shapes Background */}
        <svg className="absolute inset-0 w-full h-full opacity-60" viewBox="0 0 100 100" preserveAspectRatio="none">
          <polygon points="100,0 80,45 100,65" fill="rgba(59, 130, 246, 0.12)" />
          <polygon points="0,100 35,65 55,100" fill="rgba(16, 185, 129, 0.1)" />
          <polygon points="75,100 100,75 100,100" fill="rgba(245, 158, 11, 0.1)" />
          <polygon points="15,0 45,35 25,65" fill="rgba(139, 92, 246, 0.1)" />
        </svg>
        {/* Header */}
        <div className="z-10 flex items-center justify-between text-[8px] uppercase tracking-wider text-indigo-600 font-bold">
          <span>BOLDBOT SLACK</span>
          <span className="text-slate-400">v1.2.0</span>
        </div>
        {/* Text */}
        <div className="z-10 flex flex-col gap-0.5 max-w-[90%]">
          <div className="text-[11px] font-black text-slate-900 leading-tight tracking-tight uppercase">
            BOLDBOT AUTOMATION
          </div>
          <div className="text-[8.5px] font-medium text-slate-500 leading-snug">
            "Automate your business, the bold way."
          </div>
        </div>
        {/* Footer */}
        <div className="z-10 text-[7.5px] text-indigo-500 font-mono tracking-wider">
          SLACK BLOCK KIT & STRIPE
        </div>
      </div>
    );
  }

  // General elegant layout for other projects (like HireMind, OnboardAI, CrisisSync)
  if (slug === "hiremind") {
    return (
      <div className="w-full h-full bg-[#0a0f1d] text-slate-300 p-3 flex flex-col justify-between font-sans select-none overflow-hidden relative">
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#4f46e5 1.5px, transparent 1.5px)', backgroundSize: '24px 24px' }} />
        <div className="flex items-center justify-between text-[8px] uppercase tracking-wider text-indigo-400 font-bold z-10">
          <span>HIREMIND AI</span>
          <span className="text-emerald-400 font-bold bg-emerald-400/10 px-1.5 py-0.5 rounded">98 SCORE</span>
        </div>
        <div className="flex-1 flex flex-col justify-center gap-1 z-10">
          {/* Mock Candidate Profile */}
          <div className="bg-[#111827]/95 border border-slate-800 p-1.5 rounded flex items-center justify-between gap-1">
            <div className="flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-[8px] font-bold">JD</span>
              <div className="flex flex-col min-w-0">
                <span className="text-[9.5px] font-bold text-white leading-none truncate">John Doe</span>
                <span className="text-[7.5px] text-slate-500 truncate">React Developer</span>
              </div>
            </div>
            <span className="text-[8.5px] font-bold text-emerald-400">92% Match</span>
          </div>
        </div>
        <div className="text-[7.5px] text-slate-500 text-center font-mono border-t border-slate-800 pt-1 uppercase tracking-wider z-10">
          Explainable ATS Engine Active
        </div>
      </div>
    );
  }

  if (slug === "onboard-ai") {
    return (
      <div className="w-full h-full bg-[#1e1e1e] text-slate-300 p-3 flex flex-col justify-between font-mono select-none overflow-hidden relative">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-1 text-[8px] text-zinc-500 z-10">
          <span>onboard-agent.sh</span>
          <span className="text-amber-500">RAG PROCESS</span>
        </div>
        <div className="flex-1 flex flex-col justify-center gap-0.5 z-10 text-[8px] leading-tight">
          <div className="text-zinc-500">$ npx onboard-ai init</div>
          <div className="text-emerald-400">✔ Indexed 142 source files</div>
          <div className="text-emerald-400">✔ Generated onboarding checklist</div>
          <div className="text-zinc-300">✔ GitHub Issue integration established</div>
        </div>
        <div className="text-[7.5px] text-zinc-600 border-t border-zinc-800 pt-1 text-right z-10">
          SLACK CLIENT ACTIVE
        </div>
      </div>
    );
  }

  if (slug === "crisis-sync") {
    return (
      <div className="w-full h-full bg-[#f1f5f9] text-slate-800 p-3 flex flex-col justify-between select-none overflow-hidden relative">
        {/* Mock Map View */}
        <div className="absolute inset-0 bg-[#e2e8f0]/40 pointer-events-none" />
        <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0,30 Q30,50 60,20 T100,50" fill="none" stroke="#94a3b8" strokeWidth="1.5" />
          <path d="M20,0 Q50,40 20,80 T80,100" fill="none" stroke="#94a3b8" strokeWidth="1.5" />
          <circle cx="45" cy="35" r="14" fill="rgba(239, 68, 68, 0.15)" stroke="#ef4444" strokeWidth="0.5" strokeDasharray="2 2" />
        </svg>
        <div className="absolute top-[35%] left-[45%] translate-x-[-50%] translate-y-[-50%] z-10">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
          </span>
        </div>
        {/* Texts */}
        <div className="z-10 flex items-center justify-between text-[8px] uppercase tracking-wider text-slate-400 font-bold">
          <span>CRISIS COORDINATION</span>
          <span className="text-red-500 font-bold bg-red-50 px-1.5 py-0.5 rounded border border-red-100">EMERGENCY</span>
        </div>
        <div className="z-10 max-w-[65%] mt-auto">
          <div className="text-[10px] font-bold text-slate-900 leading-tight">
            CrisisSync Response Platform
          </div>
          <span className="text-[7.5px] text-slate-500 font-mono">MAPS SDK & GEMINI AI</span>
        </div>
      </div>
    );
  }

  // Fallback
  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-zinc-800 dark:to-zinc-900 flex items-center justify-center p-4 text-center">
      <span className="text-xs font-bold text-slate-400 dark:text-zinc-500">Thumbnail Preview</span>
    </div>
  );
}

export function Projects() {
  const [activeTab, setActiveTab] = useState<TabType>("Personal");
  const [terminalHistory, setTerminalHistory] = useState<string[]>([
    "Welcome to Malavya's Interactive Terminal.",
    "Type 'help' to see all available commands.",
    ""
  ]);
  const [terminalInput, setTerminalInput] = useState("");
  const terminalInputRef = useRef<HTMLInputElement>(null);

  // Filter projects based on tabs (supporting exactly the 5 projects under Personal)
  const getFilteredProjects = () => {
    if (activeTab === "Personal") {
      return projects.filter(
        (p) => p.slug === "git-stat" || p.slug === "ai-finder" || p.slug === "jr-06" || p.slug === "ai-messaging" || p.slug === "boldbot"
      );
    }
    if (activeTab === "Projects") {
      return projects.filter(
        (p) => p.slug === "hiremind" || p.slug === "onboard-ai" || p.slug === "crisis-sync"
      );
    }
    if (activeTab === "Published") {
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
          <div className="project-tabs flex items-center bg-surface/80 dark:bg-surface/60 backdrop-blur-xl p-[6px] rounded-full border border-border">
            {(["Personal", "Projects", "Published", "Terminal"] as TabType[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`project-tab relative py-2.5 px-6 rounded-full font-medium text-[0.95rem] transition-all duration-300 select-none border-none cursor-pointer ${
                  activeTab === tab ? "active" : ""
                }`}
              >
                {tab}
                {tab === "Terminal" && (
                  <span className="project-tab-badge absolute top-0 right-0 bg-[#ef4444] text-white text-[0.6rem] px-2 py-0.5 rounded-[4px] font-bold transform translate-x-1/2 -translate-y-1/2 shadow-sm uppercase tracking-wider">
                    NEW
                  </span>
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
          /* Responsive Grid Layout */
          <div className="project-grid pb-10">
            {filteredProjects.map((project) => (
              <Link 
                key={project.slug} 
                href={`/projects/${project.slug}`}
                className="project-card-v2 group flex flex-col bg-white dark:bg-surface border border-black/[0.06] dark:border-white/[0.06] rounded-[16px] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:translate-y-[-4px] hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] no-underline text-inherit cursor-pointer"
              >
                {/* Card image/thumbnail area */}
                <div className="project-card-image-wrap aspect-[1.85/1] overflow-hidden w-full relative">
                  <ProjectThumbnail slug={project.slug} />
                </div>
                {/* Card Content Footer */}
                <div className="project-card-footer flex justify-between items-center p-[20px] pt-4">
                  <div className="flex flex-col gap-1 pr-4 min-w-0">
                    <span className="project-card-title text-[1.1rem] font-semibold text-text-primary leading-tight group-hover:text-accent transition-colors duration-200 truncate font-sans">
                      {project.title}
                    </span>
                    <span className="text-xs text-text-secondary line-clamp-1 font-sans">
                      {project.summary}
                    </span>
                  </div>
                  {project.github && (
                    <div 
                      className="project-card-github-icon text-text-secondary hover:text-accent transition-colors duration-200 flex items-center justify-center p-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/5 shrink-0" 
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
        )}

      </div>
    </section>
  );
}
