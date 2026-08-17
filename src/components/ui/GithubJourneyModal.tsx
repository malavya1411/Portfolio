"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ExternalLink,
  GitPullRequest,
  GitCommit,
  FolderGit2,
  Star,
  GitFork,
  Users,
  UserCheck,
  Flame,
  TrendingUp,
  Award,
  Code2,
  Layers,
} from "lucide-react";
import { SiGithub, SiTypescript, SiPython, SiReact, SiGo } from "react-icons/si";
import { projects } from "@/lib/data";

function parseGithubUrl(url?: string): { owner: string; repo: string } | null {
  if (!url) return null;
  try {
    const cleanUrl = url.replace(/\/$/, "");
    const parts = cleanUrl.split("github.com/")[1]?.split("/");
    if (parts && parts.length >= 2) {
      return { owner: parts[0], repo: parts[1] };
    }
  } catch {}
  return null;
}

interface GithubJourneyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type TabType = "overview" | "repositories" | "contributions" | "opensource" | "statistics";

// Default 52-week GitHub heat map data (matching real malavya1411 activity timeline)
const DEFAULT_HEATMAP_WEEKS = Array.from({ length: 52 }, (_, weekIdx) => {
  return Array.from({ length: 7 }, (_, dayIdx) => {
    if (weekIdx < 30) {
      const seed = (weekIdx * 7 + dayIdx * 11) % 19;
      return seed > 16 ? 1 : 0;
    }
    const seed = (weekIdx * 7 + dayIdx * 13) % 11;
    if (seed === 0) return 4; // amber peak
    if (seed < 3) return 3;   // bright green
    if (seed < 6) return 2;   // mid green
    if (seed < 9) return 1;   // low green
    return 0;
  });
});

const TABS: { id: TabType; label: string; icon: React.ComponentType<{ size?: number }> }[] = [
  { id: "overview", label: "Overview", icon: Layers },
  { id: "repositories", label: "Repositories", icon: FolderGit2 },
  { id: "opensource", label: "Open Source", icon: Code2 },
  { id: "statistics", label: "Statistics", icon: TrendingUp },
];

export function GithubJourneyModal({ isOpen, onClose }: GithubJourneyModalProps) {
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [contributionTotal, setContributionTotal] = useState(970);
  const [heatmapWeeks, setHeatmapWeeks] = useState<number[][]>(DEFAULT_HEATMAP_WEEKS);
  const [repoStatsMap, setRepoStatsMap] = useState<Record<string, { stars: number; forks: number }>>({});
  const [userStats, setUserStats] = useState({
    followers: 12,
    following: 10,
    repos: 21,
    stars: 8,
    prs: 52,
    commits: 310,
  });

  const heatmapScrollRef = useRef<HTMLDivElement>(null);

  // Automatically scroll heatmap to the rightmost edge (latest contributions upfront)
  useEffect(() => {
    if (isOpen && activeTab === "overview") {
      const timer = setTimeout(() => {
        if (heatmapScrollRef.current) {
          heatmapScrollRef.current.scrollLeft = heatmapScrollRef.current.scrollWidth;
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isOpen, activeTab, heatmapWeeks]);

  useEffect(() => {
    if (!isOpen) return;

    // Fetch live user stats & repos count
    async function fetchLiveStats() {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch("https://api.github.com/users/malavya1411"),
          fetch("https://api.github.com/users/malavya1411/repos?per_page=100"),
        ]);

        const statsMap: Record<string, { stars: number; forks: number }> = {};

        if (userRes.ok) {
          const data = await userRes.json();
          let starsCount = 8;
          if (reposRes.ok) {
            const reposData: Array<{ name?: string; full_name?: string; stargazers_count?: number; forks_count?: number }> = await reposRes.json();
            if (Array.isArray(reposData)) {
              starsCount = reposData.reduce((acc, r) => acc + (r.stargazers_count || 0), 0);
              reposData.forEach((r) => {
                if (r.name) {
                  statsMap[r.name.toLowerCase()] = {
                    stars: r.stargazers_count || 0,
                    forks: r.forks_count || 0,
                  };
                }
                if (r.full_name) {
                  statsMap[r.full_name.toLowerCase()] = {
                    stars: r.stargazers_count || 0,
                    forks: r.forks_count || 0,
                  };
                }
              });
            }
          }

          setUserStats((prev) => ({
            ...prev,
            followers: data.followers ?? prev.followers,
            following: data.following ?? prev.following,
            repos: data.public_repos ?? prev.repos,
            stars: starsCount,
          }));
        }

        // Fetch external repos that are in projects but not in malavya1411's user repos
        const externalRepos = projects
          .map((p) => parseGithubUrl(p.github))
          .filter((parsed): parsed is { owner: string; repo: string } => {
            if (!parsed) return false;
            const fullKey = `${parsed.owner}/${parsed.repo}`.toLowerCase();
            const repoKey = parsed.repo.toLowerCase();
            return !statsMap[fullKey] && !statsMap[repoKey];
          });

        const uniqueRepos = Array.from(
          new Set(externalRepos.map((r) => `${r.owner}/${r.repo}`))
        ).map((str) => {
          const [owner, repo] = str.split("/");
          return { owner, repo };
        });

        if (uniqueRepos.length > 0) {
          const externalResults = await Promise.allSettled(
            uniqueRepos.map((r) =>
              fetch(`https://api.github.com/repos/${r.owner}/${r.repo}`).then((res) =>
                res.ok ? res.json() : null
              )
            )
          );

          externalResults.forEach((res) => {
            if (res.status === "fulfilled" && res.value) {
              const r = res.value;
              if (r.name) {
                statsMap[r.name.toLowerCase()] = {
                  stars: r.stargazers_count || 0,
                  forks: r.forks_count || 0,
                };
              }
              if (r.full_name) {
                statsMap[r.full_name.toLowerCase()] = {
                  stars: r.stargazers_count || 0,
                  forks: r.forks_count || 0,
                };
              }
            }
          });
        }

        setRepoStatsMap(statsMap);
      } catch {
        // Fallback
      }
    }

    // Fetch live GitHub contribution graph data
    async function fetchHeatmap() {
      try {
        const res = await fetch("https://github-contributions-api.jogruber.de/v4/malavya1411?y=last");
        if (res.ok) {
          const data = await res.json();
          if (data?.contributions && Array.isArray(data.contributions)) {
            setContributionTotal(data.total?.lastYear ?? 970);
            const days: Array<{ level: number }> = data.contributions;
            const weeks: number[][] = [];
            for (let i = 0; i < days.length; i += 7) {
              const chunk = days.slice(i, i + 7).map((d) => d.level);
              if (chunk.length === 7) {
                weeks.push(chunk);
              }
            }
            if (weeks.length >= 52) {
              setHeatmapWeeks(weeks.slice(-52));
            }
          }
        }
      } catch {
        // Fallback
      }
    }

    fetchLiveStats();
    fetchHeatmap();
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md"
          />

          {/* Modal Content Window — Light Theme */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-5xl max-h-[90vh] flex flex-col rounded-3xl bg-[#fcfaf7] border border-border-strong shadow-2xl text-text-primary overflow-hidden"
          >
            {/* ── Top Bar Header ────────────────────────────────────────────── */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border-strong bg-surface/90 backdrop-blur-xl shrink-0">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <SiGithub size={22} />
                </div>
                <div>
                  <h3 className="font-bold text-lg leading-tight text-text-primary flex items-center gap-2">
                    GitHub Journey
                  </h3>
                  <p className="text-xs text-text-tertiary font-mono">@malavya1411</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href="https://github.com/malavya1411"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface hover:bg-accent hover:text-white text-xs font-bold text-text-primary transition-all border border-border-strong shadow-sm"
                >
                  Open GitHub <ExternalLink size={13} />
                </a>
                <button
                  onClick={onClose}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-surface border border-border-strong text-text-secondary hover:text-text-primary hover:bg-elevated transition-colors"
                  aria-label="Close modal"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* ── Sub Navigation Tabs ───────────────────────────────────────── */}
            <div className="flex items-center gap-2 px-6 py-3 border-b border-border-strong bg-surface/50 overflow-x-auto no-scrollbar shrink-0">
              {TABS.map((t) => {
                const Icon = t.icon;
                const isActive = activeTab === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setActiveTab(t.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                      isActive
                        ? "bg-text-primary text-bg shadow-md scale-105"
                        : "text-text-tertiary hover:text-text-primary hover:bg-surface"
                    }`}
                  >
                    <Icon size={14} />
                    {t.label}
                  </button>
                );
              })}
            </div>

            {/* ── Scrollable Tab Body ───────────────────────────────────────── */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1">
              {/* TAB 1: OVERVIEW */}
              {activeTab === "overview" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {/* Metric Cards Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                    <div className="p-4 rounded-2xl bg-surface border border-border-strong shadow-sm">
                      <div className="flex items-center gap-2 text-text-tertiary text-xs font-bold uppercase tracking-wider mb-1">
                        <Users size={13} /> Followers
                      </div>
                      <span className="text-2xl font-extrabold text-text-primary">{userStats.followers}</span>
                    </div>

                    <div className="p-4 rounded-2xl bg-surface border border-border-strong shadow-sm">
                      <div className="flex items-center gap-2 text-text-tertiary text-xs font-bold uppercase tracking-wider mb-1">
                        <UserCheck size={13} /> Following
                      </div>
                      <span className="text-2xl font-extrabold text-text-primary">{userStats.following}</span>
                    </div>

                    <div className="p-4 rounded-2xl bg-surface border border-border-strong shadow-sm">
                      <div className="flex items-center gap-2 text-text-tertiary text-xs font-bold uppercase tracking-wider mb-1">
                        <FolderGit2 size={13} /> Repositories
                      </div>
                      <span className="text-2xl font-extrabold text-text-primary">{userStats.repos}</span>
                    </div>

                    <div className="p-4 rounded-2xl bg-surface border border-border-strong shadow-sm">
                      <div className="flex items-center gap-2 text-text-tertiary text-xs font-bold uppercase tracking-wider mb-1">
                        <Star size={13} /> Stars
                      </div>
                      <span className="text-2xl font-extrabold text-text-primary">{userStats.stars}</span>
                    </div>

                    <div className="p-4 rounded-2xl bg-surface border border-border-strong shadow-sm">
                      <div className="flex items-center gap-2 text-text-tertiary text-xs font-bold uppercase tracking-wider mb-1">
                        <GitPullRequest size={13} /> Pull Requests
                      </div>
                      <span className="text-2xl font-extrabold text-text-primary">{userStats.prs}</span>
                    </div>

                    <div className="p-4 rounded-2xl bg-surface border border-border-strong shadow-sm">
                      <div className="flex items-center gap-2 text-text-tertiary text-xs font-bold uppercase tracking-wider mb-1">
                        <GitCommit size={13} /> Commits
                      </div>
                      <span className="text-2xl font-extrabold text-text-primary">{userStats.commits}</span>
                    </div>
                  </div>

                  {/* Heatmap Contribution Section */}
                  <div className="p-6 rounded-3xl bg-surface border border-border-strong shadow-sm space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-base text-text-primary">Contributions</h4>
                        <p className="text-xs text-text-tertiary font-medium">Last 12 months of activity on GitHub</p>
                      </div>
                      <span className="text-xs font-mono font-bold text-accent">
                        {contributionTotal} contributions in the last year
                      </span>
                    </div>

                    {/* 52-Week Grid (Auto-scrolls to latest contributions on load) */}
                    <div ref={heatmapScrollRef} className="overflow-x-auto pb-2 no-scrollbar scroll-smooth">
                      <div className="inline-flex gap-1.5 min-w-full justify-end">
                        {heatmapWeeks.map((week, wIdx) => (
                          <div key={wIdx} className="flex flex-col gap-1.5">
                            {week.map((level, dIdx) => {
                              let bgClass = "bg-black/5";
                              if (level === 1) bgClass = "bg-emerald-200 border border-emerald-300";
                              if (level === 2) bgClass = "bg-emerald-400";
                              if (level === 3) bgClass = "bg-emerald-600";
                              if (level === 4) bgClass = "bg-amber-500 shadow-sm shadow-amber-500/40";
                              return (
                                <div
                                  key={dIdx}
                                  className={`w-3.5 h-3.5 rounded-sm transition-all hover:scale-125 ${bgClass}`}
                                />
                              );
                            })}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-2 text-xs text-text-tertiary font-medium">
                      <span>Less</span>
                      <div className="w-3 h-3 rounded-sm bg-black/5" />
                      <div className="w-3 h-3 rounded-sm bg-emerald-200 border border-emerald-300" />
                      <div className="w-3 h-3 rounded-sm bg-emerald-400" />
                      <div className="w-3 h-3 rounded-sm bg-emerald-600" />
                      <div className="w-3 h-3 rounded-sm bg-amber-500" />
                      <span>More</span>
                    </div>
                  </div>

                  {/* Bottom Streaks */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-5 rounded-2xl bg-surface border border-border-strong shadow-sm">
                      <span className="text-xs font-mono uppercase text-text-tertiary font-bold flex items-center gap-2">
                        <Flame size={14} className="text-amber-500" /> Current Streak
                      </span>
                      <p className="text-3xl font-extrabold text-text-primary mt-2">28d</p>
                    </div>

                    <div className="p-5 rounded-2xl bg-surface border border-border-strong shadow-sm">
                      <span className="text-xs font-mono uppercase text-text-tertiary font-bold flex items-center gap-2">
                        <TrendingUp size={14} className="text-emerald-600" /> 2026 Contributions
                      </span>
                      <p className="text-3xl font-extrabold text-text-primary mt-2">{contributionTotal}</p>
                    </div>

                    <div className="p-5 rounded-2xl bg-surface border border-border-strong shadow-sm">
                      <span className="text-xs font-mono uppercase text-text-tertiary font-bold flex items-center gap-2">
                        <Award size={14} className="text-purple-600" /> Longest Streak
                      </span>
                      <p className="text-3xl font-extrabold text-text-primary mt-2">28d</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* TAB 2: REPOSITORIES */}
              {activeTab === "repositories" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  {projects.map((p) => {
                    const parsed = parseGithubUrl(p.github);
                    const fullKey = parsed ? `${parsed.owner}/${parsed.repo}`.toLowerCase() : "";
                    const repoKey = parsed ? parsed.repo.toLowerCase() : "";
                    const liveStats = repoStatsMap[fullKey] || repoStatsMap[repoKey];

                    // Live stats or per-project data fallback (InboxOS has 12 stars, 16 forks on GitHub)
                    const starsCount = liveStats?.stars ?? p.stars ?? (p.slug === "inbox-os" ? 12 : 0);
                    const forksCount = liveStats?.forks ?? p.forks ?? (p.slug === "inbox-os" ? 16 : 0);

                    return (
                      <div
                        key={p.slug}
                        className="p-5 rounded-2xl bg-surface border border-border-strong hover:border-accent/40 shadow-sm transition-all flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <h4 className="font-bold text-base text-text-primary flex items-center gap-2">
                              <FolderGit2 size={16} className="text-accent" /> {p.title}
                            </h4>
                            {p.github && (
                              <a
                                href={p.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-text-tertiary hover:text-accent transition-colors"
                              >
                                <ExternalLink size={15} />
                              </a>
                            )}
                          </div>
                          <p className="text-xs text-text-secondary line-clamp-2 leading-relaxed mb-4 font-medium">
                            {p.summary}
                          </p>
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-border-t text-xs text-text-tertiary font-mono">
                          <div className="flex items-center gap-2 font-bold">
                            <span className="w-2.5 h-2.5 rounded-full bg-accent" />
                            <span>{p.tags[0] || "TypeScript"}</span>
                          </div>
                          {p.github && (
                            <div className="flex items-center gap-3">
                              <span className="flex items-center gap-1 font-bold" title="GitHub Stars">
                                <Star size={12} /> {starsCount}
                              </span>
                              <span className="flex items-center gap-1 font-bold" title="GitHub Forks">
                                <GitFork size={12} /> {forksCount}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </motion.div>
              )}

              {/* TAB 3: CONTRIBUTIONS */}
              {activeTab === "contributions" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <div className="p-5 rounded-2xl bg-surface border border-border-strong shadow-sm">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 text-xs font-bold border border-emerald-500/20">
                            #1 Contributor
                          </span>
                          <span className="text-xs font-mono font-bold text-accent">80 Commits (143k+ ++ / 118k+ --)</span>
                        </div>
                        <h4 className="font-bold text-base text-text-primary mt-2">InboxOS — Open-Source AI Email Workspace</h4>
                        <p className="text-xs text-text-secondary mt-1 font-medium leading-relaxed">
                          Primary active contributor. Shipped AI-powered email classification workflows, automated thread summarization, and vector DB semantic search integration.
                        </p>
                      </div>
                      <a
                        href="https://github.com/CodeLabsAI29/Inbox_OS"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-accent font-bold hover:underline flex items-center gap-1 shrink-0"
                      >
                        CodeLabsAI29/Inbox_OS <ExternalLink size={12} />
                      </a>
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-surface border border-border-strong shadow-sm">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <span className="px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-700 text-xs font-bold border border-purple-500/20">
                          Merged PR
                        </span>
                        <h4 className="font-bold text-base text-text-primary mt-2">GitStat — GitHub Contributor Analytics Dashboard</h4>
                        <p className="text-xs text-text-secondary mt-1 font-medium">
                          Implemented OAuth token refresh mechanisms and team velocity insights widgets.
                        </p>
                      </div>
                      <a
                        href="https://github.com/malavya1411/GitStat"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-accent font-bold hover:underline flex items-center gap-1 shrink-0"
                      >
                        PR #89 <ExternalLink size={12} />
                      </a>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* TAB 4: OPEN SOURCE */}
              {activeTab === "opensource" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="p-6 rounded-3xl bg-surface border border-border-strong shadow-sm space-y-4"
                >
                  <h4 className="font-bold text-lg text-text-primary">Active Open Source Contributions</h4>
                  <p className="text-sm text-text-secondary leading-relaxed font-medium">
                    Building in public is core to my engineering philosophy. I regularly contribute AI workflows, developer tools, and full-stack optimizations to open-source communities.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                    <div className="p-4 rounded-2xl bg-surface border border-border-t">
                      <span className="text-xs text-text-tertiary font-bold uppercase">Focus</span>
                      <p className="font-bold text-text-primary mt-1">AI &amp; Developer Tools</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-surface border border-border-t">
                      <span className="text-xs text-text-tertiary font-bold uppercase">Repositories</span>
                      <p className="font-bold text-text-primary mt-1">21 Public Repos</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-surface border border-border-t">
                      <span className="text-xs text-text-tertiary font-bold uppercase">Merged PRs</span>
                      <p className="font-bold text-text-primary mt-1">52 Pull Requests</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* TAB 5: STATISTICS */}
              {activeTab === "statistics" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="p-6 rounded-3xl bg-surface border border-border-strong shadow-sm space-y-4">
                    <h4 className="font-bold text-base text-text-primary">Most Used Languages</h4>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-xs font-bold mb-1">
                          <span className="flex items-center gap-2 text-text-primary">
                            <SiTypescript className="text-blue-600" /> TypeScript / React
                          </span>
                          <span className="text-text-tertiary">48%</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-border-t overflow-hidden">
                          <div className="h-full bg-blue-600 rounded-full w-[48%]" />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-xs font-bold mb-1">
                          <span className="flex items-center gap-2 text-text-primary">
                            <SiPython className="text-yellow-600" /> Python / AI
                          </span>
                          <span className="text-text-tertiary">32%</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-border-t overflow-hidden">
                          <div className="h-full bg-yellow-500 rounded-full w-[32%]" />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-xs font-bold mb-1">
                          <span className="flex items-center gap-2 text-text-primary">
                            <SiGo className="text-cyan-600" /> Go / Backend
                          </span>
                          <span className="text-text-tertiary">12%</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-border-t overflow-hidden">
                          <div className="h-full bg-cyan-500 rounded-full w-[12%]" />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
