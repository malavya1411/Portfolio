"use client";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AchievementCard } from "@/components/ui/AchievementCard";
import { achievements } from "@/lib/data";

export function Achievements() {
  return (
    <section id="achievements" className="section-padding bg-surface">
      <Container>
        <SectionHeading
          label="Achievements"
          title="Recognition"
          description="Highlights from hackathons, competitions, and academics."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {achievements.map((achievement, i) => (
            <AchievementCard
              key={achievement.title}
              achievement={achievement}
              index={i}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
