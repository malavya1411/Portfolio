import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Calendar, Briefcase, Award, Milestone } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { projects } from "@/lib/data";
import { Container } from "@/components/ui/Container";

const SITE_URL = "https://portfolio-sigma-navy-hx9lng5dcr.vercel.app";

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Enable static generation for all existing project slugs
export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  const pageUrl = `${SITE_URL}/projects/${project.slug}`;
  const ogImage = project.coverImage
    ? `${SITE_URL}${project.coverImage}`
    : `${SITE_URL}/images/og-image.png`;

  return {
    title: `${project.title} — ${project.context}`,
    description: `${project.summary} Built by Malavya Mankar using ${project.techStack.slice(0, 4).join(", ")}.`,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: `${project.title} | Malavya Mankar`,
      description: project.summary,
      url: pageUrl,
      type: "article",
      images: [{ url: ogImage, alt: `${project.title} project screenshot` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | Malavya Mankar`,
      description: project.summary,
      images: [ogImage],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-bg text-text-primary antialiased pt-14 pb-16 lg:pt-16 lg:pb-24">
      <Container className="max-w-4xl">
        {/* Back Link */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-accent transition-colors group cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to Overview
          </Link>
        </div>

        {/* Content Card */}
        <article className="card p-8 lg:p-12 relative bg-surface">
          {/* Accent light indicator */}
          <div
            className="pointer-events-none absolute top-0 left-0 w-full h-[3px] bg-accent rounded-t-2xl"
          />

          {/* Header Info */}
          <header className="flex flex-col gap-4 border-b border-border-t pb-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <span className="text-xs font-mono font-bold tracking-widest text-accent uppercase">
                {project.role}
              </span>
              <div className="flex items-center gap-3">
                {project.badge && (
                  <span className="rounded-full bg-accent/10 px-3 py-1 text-[10px] font-bold text-accent border border-accent/20 uppercase tracking-wide">
                    {project.badge}
                  </span>
                )}
                <span className="text-xs text-text-tertiary font-mono">
                  {project.year}
                </span>
              </div>
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl lg:text-5xl mt-2">
              {project.title}
            </h1>

            <p className="text-lg text-text-secondary leading-relaxed mt-3">
              {project.summary}
            </p>
          </header>

          {/* Grid Layout for details */}
          <div className="grid gap-10 lg:grid-cols-3 mt-10">
            {/* Left/Middle main section */}
            <div className="lg:col-span-2 space-y-10">
              <section>
                <h2 className="text-sm font-mono font-semibold tracking-wider text-text-tertiary uppercase mb-4 flex items-center gap-2">
                  <Milestone className="w-4 h-4 text-accent" />
                  Project Context
                </h2>
                <div className="bg-elevated/40 rounded-xl p-5 border border-border-t">
                  <p className="text-sm text-text-secondary leading-relaxed font-medium">
                    {project.context}
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-sm font-mono font-semibold tracking-wider text-text-tertiary uppercase mb-4 flex items-center gap-2">
                  <Award className="w-4 h-4 text-accent" />
                  Key Outcomes & Contributions
                </h2>
                <p className="text-base text-text-secondary leading-relaxed">
                  {project.outcome}
                </p>
              </section>

              {project.certificate && (
                <section>
                  <h2 className="text-sm font-mono font-semibold tracking-wider text-text-tertiary uppercase mb-4 flex items-center gap-2">
                    <Milestone className="w-4 h-4 text-accent" />
                    Official Certificate
                  </h2>
                  <div className="border border-border-t rounded-xl overflow-hidden bg-elevated/20 group relative">
                    <a
                      href={project.certificate}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block cursor-zoom-in"
                    >
                      <img
                        src={project.certificate}
                        alt={`${project.title} — Official Certificate by Malavya Mankar`}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-[1.01]"
                      />
                    </a>
                  </div>
                </section>
              )}
            </div>

            {/* Right details sidebar */}
            <div className="space-y-8 lg:border-l lg:border-border-t lg:pl-10">
              {/* Tech Stack */}
              <div>
                <h3 className="text-xs font-mono font-semibold tracking-wider text-text-tertiary uppercase mb-4">
                  Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="inline-flex items-center rounded-lg bg-elevated border border-border-t px-2.5 py-1 text-xs font-medium text-text-secondary"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Project Meta details list */}
              <div className="border-t border-border-t pt-6 space-y-4">
                <div className="flex items-center gap-3 text-xs text-text-secondary">
                  <Calendar className="w-4 h-4 text-text-tertiary" />
                  <span><strong>Year:</strong> {project.year}</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-text-secondary">
                  <Briefcase className="w-4 h-4 text-text-tertiary" />
                  <span><strong>Role:</strong> {project.role}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="border-t border-border-t pt-6 flex flex-col gap-3">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-text-primary px-4 py-3 text-sm font-semibold text-bg hover:opacity-90 transition-opacity w-full cursor-pointer"
                >
                  <SiGithub className="w-4 h-4" />
                  View GitHub Source
                </a>

                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-border-strong bg-surface px-4 py-3 text-sm font-semibold text-text-primary hover:bg-elevated transition-colors w-full cursor-pointer"
                  >
                    <ExternalLink className="w-4 h-4 text-accent" />
                    Visit Live Demo
                  </a>
                )}
              </div>
            </div>
          </div>
        </article>
      </Container>
    </div>
  );
}
