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
    <section id="opensource" className="py-12 sm:py-16 lg:py-20 relative overflow-hidden flex flex-col justify-center min-h-screen">
      <Container>
        {/* Section Top Minimalist & Impactful Headline */}
        <motion.div
          className="mb-8 sm:mb-12 max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <span className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-accent">
            OPEN SOURCE &amp; GITHUB
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-text-primary mt-2">
            Building Real Software in Public<span>.</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-text-secondary font-medium leading-relaxed">
            Founding open-source tools, shipping production code, and contributing to modern developer ecosystems.
          </p>
        </motion.div>

        {/* 2 Equal Side-by-Side Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          
          {/* ── LEFT SIDE: Open Source (InboxOS) ────────────────────────────── */}
          <motion.div
            className="lg:col-span-6 p-6 sm:p-8 lg:p-10 rounded-3xl bg-surface border border-border-strong flex flex-col justify-between shadow-md hover:border-accent/40 transition-all"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="space-y-6">
              <div>
                <span className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-accent">
                  FEATURED OPEN SOURCE
                </span>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-text-primary mt-2">
                  Founding &amp; Building <em className="italic font-serif text-accent font-normal">InboxOS</em>.
                </h3>
              </div>

              <p className="text-sm sm:text-base text-text-primary leading-relaxed font-extrabold">
                Founder &amp; Lead Architect — building the open-source AI workspace for modern team inboxes.
              </p>

              {/* 4 Impactful High-Contrast Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {BULLETS.map((bullet, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-4 rounded-2xl bg-bg/80 border border-border-strong shadow-2xs hover:border-accent/40 transition-colors"
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-accent shrink-0" />
                    <p className="text-sm sm:text-base text-text-primary font-extrabold tracking-tight">
                      {bullet}
                    </p>
                  </div>
                ))}
              </div>

              {/* 3 Real Metric Cards for InboxOS */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className="p-3.5 sm:p-4 rounded-2xl bg-bg/80 border border-border-strong flex items-center gap-2.5">
                  <Award size={20} className="text-accent shrink-0" />
                  <div>
                    <span className="text-sm sm:text-base font-extrabold text-text-primary block leading-none">Founder</span>
                    <span className="text-[10px] font-bold uppercase text-text-tertiary mt-1 block">#1 Contributor</span>
                  </div>
                </div>

                <div className="p-3.5 sm:p-4 rounded-2xl bg-bg/80 border border-border-strong flex items-center gap-2.5">
                  <GitCommit size={20} className="text-accent shrink-0" />
                  <div>
                    <span className="text-sm sm:text-base font-extrabold text-text-primary block leading-none">80</span>
                    <span className="text-[10px] font-bold uppercase text-text-tertiary mt-1 block">Commits</span>
                  </div>
                </div>

                <div className="p-3.5 sm:p-4 rounded-2xl bg-bg/80 border border-border-strong flex items-center gap-2.5">
                  <Code2 size={20} className="text-accent shrink-0" />
                  <div>
                    <span className="text-sm sm:text-base font-extrabold text-text-primary block leading-none">143k+</span>
                    <span className="text-[10px] font-bold uppercase text-text-tertiary mt-1 block">Lines Added</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-border-t mt-6">
              <a
                href="https://github.com/CodeLabsAI29/Inbox_OS"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-text-primary text-bg font-bold text-sm hover:scale-105 transition-all shadow-md"
              >
                View Contributions <ArrowRight size={15} />
              </a>
            </div>
          </motion.div>

          {/* ── RIGHT SIDE: Overall GitHub Activity & Live Stats ───────────── */}
          <motion.div
            className="lg:col-span-6 p-6 sm:p-8 lg:p-10 rounded-3xl bg-surface border border-border-strong flex flex-col justify-between shadow-md hover:border-accent/40 transition-all"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="space-y-6">
              <div>
                <span className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-accent">
                  GITHUB OVERVIEW
                </span>
                <div className="flex flex-wrap items-center gap-3 mt-2">
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-text-primary">
                    GitHub Profile &amp; Impact<span>.</span>
                  </h3>
                  <a
                    href="https://github.com/malavya1411"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border-strong text-xs font-bold text-text-secondary hover:text-accent hover:border-accent/40 transition-all"
                  >
                    @malavya1411 <ExternalLink size={12} />
                  </a>
                </div>
              </div>

              <p className="text-sm sm:text-base text-text-primary leading-relaxed font-extrabold">
                Live profile activity &amp; open-source contributions snapshot.
              </p>

              {/* 5 GitHub Metric Cards Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
                <div className="p-4 rounded-2xl bg-bg/80 border border-border-strong shadow-2xs flex flex-col justify-between">
                  <div className="flex items-center justify-between text-accent mb-2">
                    <GitPullRequest size={18} />
                    <span className="text-[10px] font-mono font-bold uppercase text-text-tertiary">PRS</span>
                  </div>
                  <div>
                    <span className="text-2xl sm:text-3xl font-extrabold text-text-primary">{stats.mergedPRs}</span>
                    <p className="text-[10px] text-text-tertiary font-medium mt-1">Shipped to main</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-bg/80 border border-border-strong shadow-2xs flex flex-col justify-between">
                  <div className="flex items-center justify-between text-accent mb-2">
                    <GitCommit size={18} />
                    <span className="text-[10px] font-mono font-bold uppercase text-text-tertiary">COMMITS</span>
                  </div>
                  <div>
                    <span className="text-2xl sm:text-3xl font-extrabold text-text-primary">{stats.totalCommits}</span>
                    <p className="text-[10px] text-text-tertiary font-medium mt-1">Across all repos</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-bg/80 border border-border-strong shadow-2xs flex flex-col justify-between">
                  <div className="flex items-center justify-between text-accent mb-2">
                    <FolderGit2 size={18} />
                    <span className="text-[10px] font-mono font-bold uppercase text-text-tertiary">REPOS</span>
                  </div>
                  <div>
                    <span className="text-2xl sm:text-3xl font-extrabold text-text-primary">{stats.publicRepos}</span>
                    <p className="text-[10px] text-text-tertiary font-medium mt-1">Public projects</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-bg/80 border border-border-strong shadow-2xs flex flex-col justify-between">
                  <div className="flex items-center justify-between text-accent mb-2">
                    <Star size={18} />
                    <span className="text-[10px] font-mono font-bold uppercase text-text-tertiary">STARS</span>
                  </div>
                  <div>
                    <span className="text-2xl sm:text-3xl font-extrabold text-text-primary">{stats.stars}</span>
                    <p className="text-[10px] text-text-tertiary font-medium mt-1">Community stars</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-bg/80 border border-border-strong shadow-2xs flex flex-col justify-between col-span-2 sm:col-span-1">
                  <div className="flex items-center justify-between text-accent mb-2">
                    <Code2 size={18} />
                    <span className="text-[10px] font-mono font-bold uppercase text-text-tertiary">OSS</span>
                  </div>
                  <div>
                    <span className="text-2xl sm:text-3xl font-extrabold text-text-primary">{stats.ossContributions}</span>
                    <p className="text-[10px] text-text-tertiary font-medium mt-1">External PRs</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Overview Modal Trigger Button */}
            <div className="pt-6 border-t border-border-t mt-6 flex justify-center">
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-text-primary text-bg font-bold text-sm shadow-md hover:scale-105 transition-all cursor-pointer group"
              >
                Explore Open Source Journey{" "}
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
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
