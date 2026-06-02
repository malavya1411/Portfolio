import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { projects } from "@/lib/data";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore all projects by Malavya Mankar — a Full Stack Developer and AI Engineer. Full archive of shipped web applications, hackathon builds, and developer tools built with React.js, Node.js, Express.js, and PostgreSQL.",
  alternates: {
    canonical: "https://portfolio-sigma-navy-hx9lng5dcr.vercel.app/projects",
  },
};

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-bg pb-16 pt-14 text-text-primary antialiased lg:pb-24 lg:pt-16">
      <Container>
        <div className="mb-8">
          <Link
            href="/#projects"
            className="group inline-flex items-center gap-2 text-sm font-medium text-text-secondary transition-colors hover:text-accent"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to featured projects
          </Link>
        </div>

        <header className="mb-12 max-w-3xl">
          <span className="mb-4 inline-block text-sm font-medium uppercase tracking-widest text-accent">
            Projects
          </span>
          <h1 className="text-4xl font-bold tracking-tight text-text-primary sm:text-5xl">
            All projects
          </h1>
          <p className="mt-4 text-base leading-relaxed text-text-secondary sm:text-lg">
            A full archive of shipped work, experiments, hackathon builds, and product systems.
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>
      </Container>
    </main>
  );
}
