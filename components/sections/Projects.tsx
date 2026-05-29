"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { Tag } from "@/components/ui/Tag";
import { projects, allTags } from "@/lib/data";

export function Projects() {
  const [activeTag, setActiveTag] = useState("All");

  const filtered =
    activeTag === "All"
      ? projects
      : projects.filter((p) => p.tags.includes(activeTag));

  return (
    <section id="projects" className="section-padding">
      <Container>
        <SectionHeading
          label="Projects"
          title="What I've Built"
          description="Production-grade projects, shipped under pressure."
        />

        {/* Filter tags */}
        <div className="mb-10 flex flex-wrap items-center justify-center gap-2">
          {allTags.map((tag) => (
            <Tag
              key={tag}
              label={tag}
              size="md"
              active={activeTag === tag}
              onClick={() => setActiveTag(tag)}
            />
          ))}
        </div>

        {/* Project grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="mt-12 text-center text-text-secondary">
            No projects found for this filter.
          </p>
        )}
      </Container>
    </section>
  );
}
