"use client";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SkillCard } from "@/components/ui/SkillCard";
import { skillGroups } from "@/lib/data";

export function Skills() {
  return (
    <section id="skills" className="section-padding bg-surface">
      <Container>
        <SectionHeading
          label="Skills"
          title="Tech Stack"
          description="The tools and technologies I use to build production-grade systems."
        />

        <div className="grid gap-6 sm:grid-cols-2">
          {skillGroups.map((group, i) => (
            <SkillCard key={group.category} group={group} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}
