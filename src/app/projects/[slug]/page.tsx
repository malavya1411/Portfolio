import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ExternalLink,
  Calendar,
  Briefcase,
  Award,
  Milestone,
  Code2,
  Lightbulb,
  BookOpen,
  AlertTriangle,
  CheckCircle2,
  Lock,
  MessageCircle,
} from "lucide-react";
import { SiGithub } from "react-icons/si";
import { projects } from "@/lib/data";
import { Container } from "@/components/ui/Container";
import { SITE_URL } from "@/lib/constants";

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

const PLACEHOLDER_BLUR =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOCIgaGVpZ2h0PSI4IiB2aWV3Qm94PSIwIDAgOCA4IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSI4IiBoZWlnaHQ9IjgiIGZpbGw9IiMxOTE3MUYiLz48L3N2Zz4=";

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const cs = project.caseStudy;
  const hasCaseStudy = cs && Object.values(cs).some((v) => v !== undefined && (Array.isArray(v) ? v.length > 0 : true));

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
          <div className="pointer-events-none absolute top-0 left-0 w-full h-[3px] bg-accent rounded-t-2xl" />

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

            {/* Cover image */}
            {project.coverImage && (
              <div className="mt-4 rounded-xl overflow-hidden border border-border-t bg-elevated h-[240px] lg:h-[320px] relative">
                <Image
                  src={project.coverImage}
                  alt={`${project.title} — project screenshot`}
                  fill
                  className="object-cover object-left-top"
                  placeholder="blur"
                  blurDataURL={PLACEHOLDER_BLUR}
                  priority
                />
              </div>
            )}
          </header>

          {/* Grid Layout for details */}
          <div className="grid gap-10 lg:grid-cols-3 mt-10">
            {/* Left/Middle main section */}
            <div className="lg:col-span-2 space-y-10">
              {/* Case Study Overview */}
              {cs?.overview && (
                <section>
                  <h2 className="text-sm font-mono font-semibold tracking-wider text-text-tertiary uppercase mb-4 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-accent" />
                    Overview
                  </h2>
                  <p className="text-base text-text-secondary leading-relaxed">{cs.overview}</p>
                </section>
              )}

              {/* Problem Statement */}
              {cs?.problemStatement && (
                <section>
                  <h2 className="text-sm font-mono font-semibold tracking-wider text-text-tertiary uppercase mb-4 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-accent" />
                    Problem Statement
                  </h2>
                  <div className="bg-elevated/40 rounded-xl p-5 border border-border-t">
                    <p className="text-sm text-text-secondary leading-relaxed">{cs.problemStatement}</p>
                  </div>
                </section>
              )}

              {/* Project Context (always shown) */}
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

              {/* Architecture */}
              {cs?.architecture && (
                <section>
                  <h2 className="text-sm font-mono font-semibold tracking-wider text-text-tertiary uppercase mb-4 flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-accent" />
                    Architecture
                  </h2>
                  <p className="text-base text-text-secondary leading-relaxed">{cs.architecture}</p>
                </section>
              )}

              {/* Technical Decisions */}
              {cs?.technicalDecisions && cs.technicalDecisions.length > 0 && (
                <section>
                  <h2 className="text-sm font-mono font-semibold tracking-wider text-text-tertiary uppercase mb-4 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-accent" />
                    Technical Decisions
                  </h2>
                  <ul className="space-y-3">
                    {cs.technicalDecisions.map((decision, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-text-secondary">
                        <span className="text-accent font-bold shrink-0 mt-0.5">→</span>
                        <span>{decision}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Key Outcomes (always shown) */}
              <section>
                <h2 className="text-sm font-mono font-semibold tracking-wider text-text-tertiary uppercase mb-4 flex items-center gap-2">
                  <Award className="w-4 h-4 text-accent" />
                  Key Outcomes & Contributions
                </h2>
                <p className="text-base text-text-secondary leading-relaxed">
                  {project.outcome}
                </p>
              </section>

              {/* Challenges */}
              {cs?.challenges && cs.challenges.length > 0 && (
                <section>
                  <h2 className="text-sm font-mono font-semibold tracking-wider text-text-tertiary uppercase mb-4 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-500" />
                    Challenges
                  </h2>
                  <ul className="space-y-3">
                    {cs.challenges.map((challenge, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-text-secondary bg-elevated/30 rounded-lg p-3 border border-border-t">
                        <span className="text-amber-500 font-bold shrink-0 mt-0.5">!</span>
                        <span>{challenge}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Learnings */}
              {cs?.learnings && cs.learnings.length > 0 && (
                <section>
                  <h2 className="text-sm font-mono font-semibold tracking-wider text-text-tertiary uppercase mb-4 flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-accent" />
                    Learnings
                  </h2>
                  <ul className="space-y-3">
                    {cs.learnings.map((learning, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-text-secondary">
                        <span className="text-accent font-bold shrink-0 mt-0.5">✦</span>
                        <span>{learning}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Certificate */}
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
                {project.isPrivateRepo ? (
                  <div className="inline-flex items-center justify-center gap-2 rounded-xl border border-border-strong bg-elevated/50 px-4 py-3 text-sm font-semibold text-text-tertiary w-full cursor-not-allowed">
                    <Lock className="w-4 h-4" />
                    Private Repository
                  </div>
                ) : (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-text-primary px-4 py-3 text-sm font-semibold text-bg hover:opacity-90 transition-opacity w-full cursor-pointer"
                  >
                    <SiGithub className="w-4 h-4" />
                    View GitHub Source
                  </a>
                )}

                {project.demo ? (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-border-strong bg-surface px-4 py-3 text-sm font-semibold text-text-primary hover:bg-elevated transition-colors w-full cursor-pointer"
                  >
                    <ExternalLink className="w-4 h-4 text-accent" />
                    Visit Live Demo
                  </a>
                ) : project.demoAvailableOnRequest ? (
                  <div className="inline-flex items-center justify-center gap-2 rounded-xl border border-border-t bg-elevated/30 px-4 py-3 text-sm font-medium text-text-secondary w-full">
                    <MessageCircle className="w-4 h-4 text-accent" />
                    Demo Available on Request
                  </div>
                ) : null}
              </div>

              {/* WIP notice */}
              {project.status === "IN_PROGRESS" && (
                <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-xs text-amber-600 dark:text-amber-400 flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>This project is actively in progress. Features and demo may change.</span>
                </div>
              )}
            </div>
          </div>
        </article>
      </Container>
    </div>
  );
}
