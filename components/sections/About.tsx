"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { aboutData } from "@/lib/data";
import { SITE_CONFIG } from "@/lib/constants";

export function About() {
  return (
    <section id="about" className="section-padding">
      <Container>
        <SectionHeading
          label="About"
          title="Who I Am"
          description="A first-year engineer who builds like a senior."
        />

        <div className="grid gap-12 lg:grid-cols-5">
          {/* Bio */}
          <motion.div
            className="lg:col-span-3 space-y-4"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: SITE_CONFIG.animationDuration.normal,
              ease: SITE_CONFIG.ease,
            }}
          >
            {aboutData.bio.map((paragraph, i) => (
              <p
                key={i}
                className="text-base leading-relaxed text-text-secondary"
              >
                {paragraph}
              </p>
            ))}
          </motion.div>

          {/* Stats */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {aboutData.stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="card-base p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: SITE_CONFIG.animationDuration.normal,
                  delay: i * 0.1,
                  ease: SITE_CONFIG.ease,
                }}
              >
                <p className="text-3xl font-bold text-accent">{stat.value}</p>
                <p className="mt-1 text-sm font-semibold text-text-primary">
                  {stat.label}
                </p>
                <p className="mt-0.5 text-xs text-text-secondary">
                  {stat.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
