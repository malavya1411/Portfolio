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

const TECH_LOGOS = [
  { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
  { node: <SiReact />, title: "React", href: "https://react.dev" },
  { node: <SiTypescript />, title: "TypeScript", href: "https://www.typescriptlang.org" },
  { node: <SiTailwindcss />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
  { node: <SiNodedotjs />, title: "Node.js", href: "https://nodejs.org" },
  { node: <SiPostgresql />, title: "PostgreSQL", href: "https://www.postgresql.org" },
  { node: <SiSupabase />, title: "Supabase", href: "https://supabase.com" },
  { node: <SiFirebase />, title: "Firebase", href: "https://firebase.google.com" },
  { node: <SiFlutter />, title: "Flutter", href: "https://flutter.dev" },
  { node: <SiVercel />, title: "Vercel", href: "https://vercel.com" },
  { node: <SiGithub />, title: "GitHub", href: "https://github.com" },
  { node: <SiSlack />, title: "Slack", href: "https://slack.com" },
  { node: <SiGooglecloud />, title: "Google Cloud", href: "https://cloud.google.com" },
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

        {/* Tech Stack Logo loop */}
        <section className="py-12 bg-bg">
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
            />
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
