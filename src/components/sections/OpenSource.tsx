"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  GitPullRequest,
  GitCommit,
  FolderGit2,
  Star,
  Code2,
  ExternalLink,
  Award,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { GithubJourneyModal } from "@/components/ui/GithubJourneyModal";

const BULLETS = [
  "AI Classification Workflows",
  "Thread Summarization Engine",
  "Vector DB Semantic Search",
  "80+ Commits & 143k+ Additions",
];

export function OpenSource() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stats, setStats] = useState({
    publicRepos: 21,
    followers: 12,
    following: 10,
    totalCommits: 310,
    mergedPRs: 52,
    stars: 8,
    ossContributions: 13,
  });

  // Fetch live stats from GitHub API for malavya1411
  useEffect(() => {
    async function fetchLiveStats() {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch("https://api.github.com/users/malavya1411"),
          fetch("https://api.github.com/users/malavya1411/repos?per_page=100"),
        ]);

        if (userRes.ok) {
          const userData = await userRes.json();
          let starsCount = 8;
          if (reposRes.ok) {
            const reposData: Array<{ stargazers_count?: number }> = await reposRes.json();
            if (Array.isArray(reposData)) {
              starsCount = reposData.reduce((acc, r) => acc + (r.stargazers_count || 0), 0);
            }
          }

          setStats((prev) => ({
            ...prev,
            publicRepos: userData.public_repos ?? prev.publicRepos,
            followers: userData.followers ?? prev.followers,
            following: userData.following ?? prev.following,
            stars: starsCount,
          }));
        }
      } catch {
        // Fallback static metrics
      }
    }
    fetchLiveStats();
  }, []);

  return (
    <section id="opensource" className="py-6 sm:py-9 lg:py-12 relative overflow-hidden flex flex-col justify-center">
      <Container>
        {/* Section Top Minimalist & Impactful Center-Aligned Headline */}
        <motion.div
          className="mb-6 sm:mb-8 text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <span className="text-[11px] font-mono font-bold tracking-[0.2em] uppercase text-accent block">
            OPEN SOURCE &amp; GITHUB
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-text-primary mt-1 text-center">
            Building Real Software in Public<span>.</span>
          </h2>
          <p className="mt-1.5 text-xs sm:text-sm text-text-secondary font-medium leading-normal text-center max-w-2xl mx-auto">
            Founding open-source tools, shipping production code, and contributing to modern developer ecosystems.
          </p>
        </motion.div>

        {/* 2 Equal Side-by-Side Cards (+8% Scale & Padding) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-7 items-stretch">
          
          {/* ── LEFT SIDE: Open Source (InboxOS) ────────────────────────────── */}
          <motion.div
            className="lg:col-span-6 p-6 sm:p-7 lg:p-8 rounded-3xl bg-surface border border-border-strong flex flex-col justify-between shadow-sm hover:border-accent/30 transition-all"
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="space-y-4">
              <div>
                <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-accent">
                  FEATURED OPEN SOURCE
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-text-primary mt-1">
                  Founding &amp; Building <em className="italic font-serif text-accent font-normal">InboxOS</em>.
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-text-primary leading-snug font-bold">
                Founder &amp; Lead Architect — building the open-source AI workspace for modern team inboxes.
              </p>

              {/* 4 Impactful High-Contrast Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {BULLETS.map((bullet, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 p-3 rounded-2xl bg-bg/80 border border-border-strong shadow-2xs hover:border-accent/40 transition-colors"
                  >
                    <span className="w-2 h-2 rounded-full bg-accent shrink-0" />
                    <p className="text-xs sm:text-sm text-text-primary font-bold tracking-tight">
                      {bullet}
                    </p>
                  </div>
                ))}
              </div>

              {/* 3 Real Metric Cards for InboxOS */}
              <div className="grid grid-cols-3 gap-3 pt-1">
                <div className="p-3 rounded-2xl bg-bg/80 border border-border-strong flex items-center gap-2.5">
                  <Award size={18} className="text-accent shrink-0" />
                  <div>
                    <span className="text-xs sm:text-sm font-extrabold text-text-primary block leading-none">Founder</span>
                    <span className="text-[9px] font-bold uppercase text-text-tertiary mt-0.5 block">#1 Contributor</span>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-bg/80 border border-border-strong flex items-center gap-2.5">
                  <GitCommit size={18} className="text-accent shrink-0" />
                  <div>
                    <span className="text-xs sm:text-sm font-extrabold text-text-primary block leading-none">80</span>
                    <span className="text-[9px] font-bold uppercase text-text-tertiary mt-0.5 block">Commits</span>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-bg/80 border border-border-strong flex items-center gap-2.5">
                  <Code2 size={18} className="text-accent shrink-0" />
                  <div>
                    <span className="text-xs sm:text-sm font-extrabold text-text-primary block leading-none">143k+</span>
                    <span className="text-[9px] font-bold uppercase text-text-tertiary mt-0.5 block">Lines Added</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-5 border-t border-border-t mt-5">
              <a
                href="https://github.com/CodeLabsAI29/Inbox_OS"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-text-primary text-bg font-bold text-xs hover:scale-105 transition-all shadow-sm"
              >
                View Contributions <ArrowRight size={13} />
              </a>
            </div>
          </motion.div>

          {/* ── RIGHT SIDE: Overall GitHub Activity & Live Stats ───────────── */}
          <motion.div
            className="lg:col-span-6 p-6 sm:p-7 lg:p-8 rounded-3xl bg-surface border border-border-strong flex flex-col justify-between shadow-sm hover:border-accent/30 transition-all"
            initial={{ opacity: 0, x: 15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="space-y-4">
              <div>
                <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-accent">
                  GITHUB OVERVIEW
                </span>
                <div className="flex flex-wrap items-center gap-2 mt-1">
                  <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-text-primary">
                    GitHub Profile &amp; Impact<span>.</span>
                  </h3>
                  <a
                    href="https://github.com/malavya1411"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border border-border-strong text-[11px] font-bold text-text-secondary hover:text-accent hover:border-accent/40 transition-all"
                  >
                    @malavya1411 <ExternalLink size={11} />
                  </a>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-text-primary leading-snug font-bold">
                Live profile activity &amp; open-source contributions snapshot.
              </p>

              {/* 5 GitHub Metric Cards Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-2xl bg-bg/80 border border-border-strong shadow-2xs flex flex-col justify-between">
                  <div className="flex items-center justify-between text-accent mb-1.5">
                    <GitPullRequest size={16} />
                    <span className="text-[9px] font-mono font-bold uppercase text-text-tertiary">PRS</span>
                  </div>
                  <div>
                    <span className="text-2xl font-extrabold text-text-primary">{stats.mergedPRs}</span>
                    <p className="text-[9px] text-text-tertiary font-medium mt-0.5">Shipped to main</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-bg/80 border border-border-strong shadow-2xs flex flex-col justify-between">
                  <div className="flex items-center justify-between text-accent mb-1.5">
                    <GitCommit size={16} />
                    <span className="text-[9px] font-mono font-bold uppercase text-text-tertiary">COMMITS</span>
                  </div>
                  <div>
                    <span className="text-2xl font-extrabold text-text-primary">{stats.totalCommits}</span>
                    <p className="text-[9px] text-text-tertiary font-medium mt-0.5">Across all repos</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-bg/80 border border-border-strong shadow-2xs flex flex-col justify-between">
                  <div className="flex items-center justify-between text-accent mb-1.5">
                    <FolderGit2 size={16} />
                    <span className="text-[9px] font-mono font-bold uppercase text-text-tertiary">REPOS</span>
                  </div>
                  <div>
                    <span className="text-2xl font-extrabold text-text-primary">{stats.publicRepos}</span>
                    <p className="text-[9px] text-text-tertiary font-medium mt-0.5">Public projects</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-bg/80 border border-border-strong shadow-2xs flex flex-col justify-between">
                  <div className="flex items-center justify-between text-accent mb-1.5">
                    <Star size={16} />
                    <span className="text-[9px] font-mono font-bold uppercase text-text-tertiary">STARS</span>
                  </div>
                  <div>
                    <span className="text-2xl font-extrabold text-text-primary">{stats.stars}</span>
                    <p className="text-[9px] text-text-tertiary font-medium mt-0.5">Community stars</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-bg/80 border border-border-strong shadow-2xs flex flex-col justify-between col-span-2 sm:col-span-1">
                  <div className="flex items-center justify-between text-accent mb-1.5">
                    <Code2 size={16} />
                    <span className="text-[9px] font-mono font-bold uppercase text-text-tertiary">OSS</span>
                  </div>
                  <div>
                    <span className="text-2xl font-extrabold text-text-primary">{stats.ossContributions}</span>
                    <p className="text-[9px] text-text-tertiary font-medium mt-0.5">External PRs</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Overview Modal Trigger Button */}
            <div className="pt-5 border-t border-border-t mt-5 flex justify-center">
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-full bg-text-primary text-bg font-bold text-xs shadow-sm hover:scale-105 transition-all cursor-pointer group"
              >
                Explore GitHub Journey{" "}
                <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </motion.div>

        </div>

        {/* Interactive GitHub Journey Modal */}
        <GithubJourneyModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </Container>
    </section>
  );
}
