import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Achievements } from "@/components/sections/Achievements";
import { Contact } from "@/components/sections/Contact";
import { LogoLoop } from "@/components/ui/LogoLoop";
import { Container } from "@/components/ui/Container";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiPostgresql,
  SiSupabase,
  SiFirebase,
  SiFlutter,
  SiVercel,
  SiGithub,
  SiSlack,
  SiGooglecloud,
} from "react-icons/si";

/**
 * Tech logos are decorative — no href so they don't navigate users away from the site.
 * Title is kept for accessibility / tooltip purposes only.
 */
const TECH_LOGOS = [
  { node: <SiNextdotjs />, title: "Next.js" },
  { node: <SiReact />, title: "React" },
  { node: <SiTypescript />, title: "TypeScript" },
  { node: <SiTailwindcss />, title: "Tailwind CSS" },
  { node: <SiNodedotjs />, title: "Node.js" },
  { node: <SiPostgresql />, title: "PostgreSQL" },
  { node: <SiSupabase />, title: "Supabase" },
  { node: <SiFirebase />, title: "Firebase" },
  { node: <SiFlutter />, title: "Flutter" },
  { node: <SiVercel />, title: "Vercel" },
  { node: <SiGithub />, title: "GitHub" },
  { node: <SiSlack />, title: "Slack" },
  { node: <SiGooglecloud />, title: "Google Cloud" },
];

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Achievements />
        <Contact />

        {/* Tech Stack Logo loop — decorative only, no external links */}
        <section className="py-12 bg-bg" aria-label="Core tech stack">
          <Container>
            <div className="text-center mb-8">
              <span className="text-[10px] font-bold tracking-[0.22em] uppercase text-text-tertiary">
                Core Stack &amp; Tooling
              </span>
            </div>
            <LogoLoop
              logos={TECH_LOGOS}
              speed={45}
              gap={56}
              logoHeight={30}
              scaleOnHover
              fadeOut
              pauseOnHover
              ariaLabel="Core technology stack: Next.js, React, TypeScript, Tailwind CSS, Node.js, PostgreSQL, Supabase, Firebase, Flutter, Vercel, GitHub, Slack, Google Cloud"
            />
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
