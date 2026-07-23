"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  GitPullRequest,
  GitCommit,
  FolderGit2,
  Star,
  Code2,
  ExternalLink,
  ArrowRight,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { GithubJourneyModal } from "@/components/ui/GithubJourneyModal";

export function GithubActivity() {
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
        // Retain static fallback values
      }
    }
    fetchLiveStats();
  }, []);

  return (
    <section id="github-activity" className="py-14 sm:py-20 relative overflow-hidden bg-surface/50">
      <Container>
        {/* Section Heading */}
        <motion.div
          className="mb-10 max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <span className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-accent">
            07 —— GITHUB ACTIVITY
          </span>

          <div className="flex flex-wrap items-center gap-3 mt-2">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-text-primary">
              Building in public<span>.</span>
            </h2>
            <a
              href="https://github.com/malavya1411"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border-strong text-xs font-bold text-text-secondary hover:text-accent hover:border-accent/40 transition-all"
            >
              @malavya1411 <ExternalLink size={12} />
            </a>
          </div>

          <p className="mt-3 text-sm sm:text-base text-text-secondary font-medium leading-relaxed">
            Building in public through open source, personal projects, and continuous learning. Here&apos;s a live snapshot of my GitHub activity and recent work.
          </p>
        </motion.div>

        {/* 5 Metric Cards Grid */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* Card 1 */}
          <div className="p-5 rounded-2xl bg-surface border border-border-strong shadow-sm hover:border-accent/40 transition-colors flex flex-col justify-between">
            <div className="flex items-center justify-between text-accent mb-4">
              <GitPullRequest size={18} />
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-text-tertiary">
                MERGED PRS
              </span>
            </div>
            <div>
              <span className="text-3xl font-extrabold text-text-primary">{stats.mergedPRs}</span>
              <p className="text-xs text-text-tertiary mt-1 font-medium">Pull requests shipped to main</p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="p-5 rounded-2xl bg-surface border border-border-strong shadow-sm hover:border-accent/40 transition-colors flex flex-col justify-between">
            <div className="flex items-center justify-between text-accent mb-4">
              <GitCommit size={18} />
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-text-tertiary">
                TOTAL COMMITS
              </span>
            </div>
            <div>
              <span className="text-3xl font-extrabold text-text-primary">{stats.totalCommits}</span>
              <p className="text-xs text-text-tertiary mt-1 font-medium">Authored across all repos</p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="p-5 rounded-2xl bg-surface border border-border-strong shadow-sm hover:border-accent/40 transition-colors flex flex-col justify-between">
            <div className="flex items-center justify-between text-accent mb-4">
              <FolderGit2 size={18} />
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-text-tertiary">
                PUBLIC REPOS
              </span>
            </div>
            <div>
              <span className="text-3xl font-extrabold text-text-primary">{stats.publicRepos}</span>
              <p className="text-xs text-text-tertiary mt-1 font-medium">Projects available publicly</p>
            </div>
          </div>

          {/* Card 4 */}
          <div className="p-5 rounded-2xl bg-surface border border-border-strong shadow-sm hover:border-accent/40 transition-colors flex flex-col justify-between">
            <div className="flex items-center justify-between text-accent mb-4">
              <Star size={18} />
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-text-tertiary">
                TOTAL STARS
              </span>
            </div>
            <div>
              <span className="text-3xl font-extrabold text-text-primary">{stats.stars}</span>
              <p className="text-xs text-text-tertiary mt-1 font-medium">Community appreciation</p>
            </div>
          </div>

          {/* Card 5 */}
          <div className="p-5 rounded-2xl bg-surface border border-border-strong shadow-sm hover:border-accent/40 transition-colors flex flex-col justify-between col-span-2 sm:col-span-1">
            <div className="flex items-center justify-between text-accent mb-4">
              <Code2 size={18} />
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-text-tertiary">
                OSS CONTRIBUTIONS
              </span>
            </div>
            <div>
              <span className="text-3xl font-extrabold text-text-primary">{stats.ossContributions}</span>
              <p className="text-xs text-text-tertiary mt-1 font-medium">PRs to external projects</p>
            </div>
          </div>
        </motion.div>

        {/* Center Modal Trigger Button */}
        <div className="flex justify-center">
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-surface border border-border-strong hover:border-accent text-text-primary hover:text-accent font-bold text-sm shadow-md hover:shadow-xl transition-all cursor-pointer group"
          >
            Explore My Open Source Journey{" "}
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Interactive GitHub Journey Modal */}
        <GithubJourneyModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </Container>
    </section>
  );
}
