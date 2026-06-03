"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { ProjectFilter } from "@/components/ui/ProjectFilter";
import type { Project } from "@/lib/data";

interface ProjectsClientProps {
  projects: Project[];
  allTags: string[];
}

export function ProjectsClient({ projects, allTags }: ProjectsClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tagFromUrl = searchParams.get("tag") ?? "All";

  const [activeTag, setActiveTag] = useState(
    allTags.includes(tagFromUrl) ? tagFromUrl : "All"
  );

  // Sync URL when tag changes
  const handleTagChange = useCallback(
    (tag: string) => {
      setActiveTag(tag);
      const params = new URLSearchParams(searchParams.toString());
      if (tag === "All") {
        params.delete("tag");
      } else {
        params.set("tag", tag);
      }
      router.replace(`/projects?${params.toString()}`, { scroll: false });
    },
    [router, searchParams]
  );

  // Sync if URL changes externally
  useEffect(() => {
    const tag = searchParams.get("tag") ?? "All";
    setActiveTag(allTags.includes(tag) ? tag : "All");
  }, [searchParams, allTags]);

  const filtered =
    activeTag === "All"
      ? projects
      : projects.filter((p) => p.tags.includes(activeTag));

  return (
    <>
      {/* Filter bar */}
      <div className="mb-8 overflow-x-auto pb-2">
        <ProjectFilter
          tags={allTags}
          activeTag={activeTag}
          onChange={handleTagChange}
        />
      </div>

      {/* Count */}
      <p className="mb-6 text-sm text-text-tertiary">
        Showing <span className="font-semibold text-text-secondary">{filtered.length}</span> project{filtered.length !== 1 ? "s" : ""}
        {activeTag !== "All" && (
          <> tagged <span className="font-semibold text-accent">{activeTag}</span></>
        )}
      </p>

      {/* Grid */}
      <AnimatePresence mode="popLayout">
        {filtered.length > 0 ? (
          <motion.div
            key={activeTag}
            className="grid gap-6 lg:grid-cols-3"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
          >
            {filtered.map((project, index) => (
              <ProjectCard key={project.slug} project={project} index={index} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            className="flex flex-col items-center justify-center py-24 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <p className="text-text-secondary text-sm">No projects found for this filter.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
