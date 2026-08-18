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
  Code2,
  Lightbulb,
  BookOpen,
  AlertTriangle,
  CheckCircle2,
  Lock,
  MessageCircle,
  Star,
  GitFork,
  GitCommitHorizontal,
  Layers,
  ArrowRight,
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

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return { title: "Project Not Found" };
  }

  const pageUrl = `${SITE_URL}/projects/${project.slug}`;
  const ogImage = project.coverImage
    ? `${SITE_URL}${project.coverImage}`
    : `${SITE_URL}/images/og-image.png`;

  return {
    title: `${project.title} — ${project.context}`,
    description: `${project.summary} Built by Malavya Mankar using ${project.techStack.slice(0, 4).join(", ")}.`,
    alternates: { canonical: pageUrl },
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

// Minimal stat bar item
function StatPill({ icon, value, label }: { icon: React.ReactNode; value: string | number; label: string }) {
  return (
    <div className="cs-stat-pill">
      <span className="cs-stat-icon">{icon}</span>
      <span className="cs-stat-value">{value}</span>
      <span className="cs-stat-label">{label}</span>
    </div>
  );
}

// Section heading inside body
function SectionHeading({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="cs-section-heading">
      <span className="cs-section-heading-icon">{icon}</span>
      <span className="cs-section-heading-text">{label}</span>
    </div>
  );
}

// Architecture parser helper
function parseArchitecture(archText?: string) {
  if (!archText) return null;
  if (!archText.includes("→")) {
    return { isPipeline: false, rawText: archText, intro: "", outro: "", steps: [] };
  }

  const arrowIndex = archText.indexOf("→");
  const firstColon = archText.indexOf(":");
  let intro = "";
  let pipelinePart = archText;
  let outro = "";

  // If there's a colon before the first arrow (e.g. "A 5-layer pipeline separates concerns cleanly: Ingestion ...")
  if (firstColon !== -1 && firstColon < arrowIndex) {
    intro = archText.slice(0, firstColon + 1).trim();
    pipelinePart = archText.slice(firstColon + 1).trim();
  }

  // Check if there is an outro sentence after the last ')'
  const lastParen = pipelinePart.lastIndexOf(")");
  if (lastParen !== -1 && lastParen < pipelinePart.length - 1) {
    const trailing = pipelinePart.slice(lastParen + 1).trim();
    if (trailing.replace(/^[.\s]+/, "").length > 0) {
      outro = trailing.replace(/^[.\s]+/, "").trim();
      pipelinePart = pipelinePart.slice(0, lastParen + 1).trim();
    }
  }

  const rawSegments = pipelinePart.split("→").map((s) => s.trim());
  const steps = rawSegments.map((seg) => {
    const match = seg.match(/^([^(]+)\(([^)]+)\)/);
    if (match) {
      let cleanTitle = match[1].trim();
      if (cleanTitle.includes(":")) {
        const parts = cleanTitle.split(":");
        cleanTitle = parts[parts.length - 1].trim();
      }
      return {
        title: cleanTitle,
        desc: match[2].trim(),
      };
    } else {
      if (seg.includes(":")) {
        const [t, ...rest] = seg.split(":");
        return { title: t.trim(), desc: rest.join(":").trim() };
      }
      return { title: seg, desc: "" };
    }
  });

  return { isPipeline: true, rawText: archText, intro, outro, steps };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) notFound();

  const cs = project.caseStudy;
  const hasStats = project.stars !== undefined || project.forks !== undefined;
  const isOpenSource = project.badge === "Open Source" || project.context?.toLowerCase().includes("open source");

  return (
    <div className="cs-page">
      {/* ─── Back Link ─── */}
      <div className="cs-back-bar">
        <Container className="max-w-5xl">
          <Link href="/#projects" className="cs-back-link group">
            <ArrowLeft className="cs-back-icon" />
            Back to Overview
          </Link>
        </Container>
      </div>

      {/* ─── HERO CARD ─── */}
      <Container className="max-w-5xl">
        <div className="cs-hero-card">
          {/* Hero top row: badge + year */}
          <div className="cs-hero-top">
            <div className="cs-hero-badges">
              {project.badge && (
                <span className="cs-badge cs-badge-accent">
                  {isOpenSource && (
                    <SiGithub className="w-3 h-3" />
                  )}
                  {project.badge}
                </span>
              )}
              <span className="cs-badge cs-badge-muted">{project.year}</span>
              {project.status === "RUNNER-UP" && (
                <span className="cs-badge cs-badge-gold">Runner Up</span>
              )}
              {project.status === "GOOGLE CHALLENGE" && (
                <span className="cs-badge cs-badge-blue">🌐 Google Challenge</span>
              )}
              {project.stars !== undefined && (
                <span className="cs-badge cs-badge-muted">
                  <Star className="w-3 h-3" />
                  {project.stars} Stars
                </span>
              )}
            </div>
          </div>

          {/* Hero main content: title + image */}
          <div className="cs-hero-main">
            {/* Left: title, summary, stats */}
            <div className="cs-hero-left">
              <h1 className="cs-hero-title">{project.title}</h1>
              <p className="cs-hero-summary">{project.summary}</p>

              {/* Stats bar */}
              {(hasStats || project.dateString) && (
                <div className="cs-stats-bar">
                  {project.stars !== undefined && (
                    <StatPill
                      icon={<Star className="w-4 h-4" />}
                      value={project.stars}
                      label="Stars"
                    />
                  )}
                  {project.forks !== undefined && (
                    <StatPill
                      icon={<GitFork className="w-4 h-4" />}
                      value={project.forks}
                      label="Forks"
                    />
                  )}
                  {project.dateString && (
                    <StatPill
                      icon={<Calendar className="w-4 h-4" />}
                      value={project.dateString.split("·")[0]?.trim() || project.year}
                      label={project.dateString.split("·")[1]?.trim() || "Released"}
                    />
                  )}
                </div>
              )}
            </div>

            {/* Right: thumbnail */}
            {project.coverImage && (
              <div className="cs-hero-thumb-wrap">
                <Image
                  src={project.coverImage}
                  alt={`${project.title} — project screenshot`}
                  fill
                  className="cs-hero-thumb-img"
                  placeholder="blur"
                  blurDataURL={PLACEHOLDER_BLUR}
                  priority
                />
                {/* Subtle gradient overlay on bottom */}
                <div className="cs-hero-thumb-overlay" />
              </div>
            )}
          </div>
        </div>

        {/* ─── CONTENT GRID ─── */}
        <div className="cs-content-grid">
          {/* ─── LEFT COLUMN: Case study body ─── */}
          <div className="cs-body">

            {/* Overview */}
            {cs?.overview && (
              <section className="cs-section">
                <SectionHeading icon={<BookOpen className="w-3.5 h-3.5" />} label="Overview" />
                <p className="cs-body-text">{cs.overview}</p>
              </section>
            )}

            {/* Problem Statement */}
            {cs?.problemStatement && (
              <section className="cs-section">
                <SectionHeading icon={<AlertTriangle className="w-3.5 h-3.5" />} label="Problem Statement" />
                <div className="cs-problem-box">
                  <div className="cs-problem-bar" />
                  <p className="cs-body-text">{cs.problemStatement}</p>
                </div>
              </section>
            )}

            {/* Architecture */}
            {cs?.architecture && (() => {
              const parsed = parseArchitecture(cs.architecture);
              return (
                <section className="cs-section">
                  <SectionHeading icon={<Code2 className="w-3.5 h-3.5" />} label="Architecture" />
                  {parsed?.isPipeline && parsed.steps.length > 1 ? (
                    <div className="cs-pipeline-container">
                      {parsed.intro && <p className="cs-body-text mb-1">{parsed.intro}</p>}
                      <div className="cs-pipeline-flow">
                        {parsed.steps.map((step, i) => (
                          <div key={i} className="cs-pipeline-step-wrapper">
                            <div className="cs-pipeline-step">
                              <div className="cs-pipeline-step-header">
                                <span className="cs-pipeline-step-num">{i + 1}</span>
                                <span className="cs-pipeline-step-title">{step.title}</span>
                              </div>
                              {step.desc && <p className="cs-pipeline-step-desc">{step.desc}</p>}
                            </div>
                            {i < parsed.steps.length - 1 && (
                              <div className="cs-pipeline-arrow-wrap" aria-hidden="true">
                                <ArrowRight className="cs-pipeline-arrow" />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                      {parsed.outro && (
                        <div className="cs-pipeline-outro">
                          <span className="cs-pipeline-outro-icon">✦</span>
                          <span>{parsed.outro}</span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="cs-arch-box">
                      <p className="cs-body-text">{cs.architecture}</p>
                    </div>
                  )}
                </section>
              );
            })()}

            {/* Technical Decisions */}
            {cs?.technicalDecisions && cs.technicalDecisions.length > 0 && (
              <section className="cs-section">
                <SectionHeading icon={<CheckCircle2 className="w-3.5 h-3.5" />} label="Technical Decisions" />
                <ul className="cs-decision-list">
                  {cs.technicalDecisions.map((d, i) => {
                    const [title, ...rest] = d.split("—");
                    return (
                      <li key={i} className="cs-decision-item">
                        <span className="cs-decision-dot" />
                        <div>
                          {rest.length > 0 ? (
                            <>
                              <span className="cs-decision-title">{title.trim()} — </span>
                              <span className="cs-decision-body">{rest.join("—").trim()}</span>
                            </>
                          ) : (
                            <span className="cs-decision-body">{d}</span>
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </section>
            )}

            {/* Key Outcomes */}
            <section className="cs-section">
              <SectionHeading icon={<Award className="w-3.5 h-3.5" />} label="Key Outcomes" />
              <p className="cs-body-text">{project.outcome}</p>
            </section>

            {/* Features */}
            {project.features && project.features.length > 0 && (
              <section className="cs-section">
                <SectionHeading icon={<Layers className="w-3.5 h-3.5" />} label="Core Features" />
                <ul className="cs-features-list">
                  {project.features.map((f, i) => (
                    <li key={i} className="cs-feature-item">
                      <CheckCircle2 className="cs-feature-icon" />
                      <span className="cs-body-text-sm">{f}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Challenges */}
            {cs?.challenges && cs.challenges.length > 0 && (
              <section className="cs-section">
                <SectionHeading icon={<AlertTriangle className="w-3.5 h-3.5" />} label="Challenges" />
                <ul className="cs-challenge-list">
                  {cs.challenges.map((c, i) => (
                    <li key={i} className="cs-challenge-item">
                      <span className="cs-challenge-num">{i + 1}</span>
                      <p className="cs-body-text-sm">{c}</p>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Learnings */}
            {cs?.learnings && cs.learnings.length > 0 && (
              <section className="cs-section">
                <SectionHeading icon={<Lightbulb className="w-3.5 h-3.5" />} label="Learnings" />
                <ul className="cs-learning-list">
                  {cs.learnings.map((l, i) => (
                    <li key={i} className="cs-learning-item">
                      <span className="cs-learning-bullet">✦</span>
                      <span className="cs-body-text-sm">{l}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Certificate */}
            {project.certificate && (
              <section className="cs-section">
                <SectionHeading icon={<Award className="w-3.5 h-3.5" />} label="Official Certificate" />
                <a
                  href={project.certificate}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cs-cert-wrap group"
                >
                  <img
                    src={project.certificate}
                    alt={`${project.title} — Official Certificate`}
                    loading="lazy"
                    className="cs-cert-img"
                  />
                </a>
              </section>
            )}
          </div>

          {/* ─── RIGHT COLUMN: Sidebar ─── */}
          <aside className="cs-sidebar">

            {/* Tech Stack */}
            <div className="cs-sidebar-card">
              <p className="cs-sidebar-label">
                <Layers className="w-3.5 h-3.5" />
                Tech Stack
              </p>
              <div className="cs-tech-grid">
                {project.techStack.map((tech) => (
                  <span key={tech} className="cs-tech-chip">{tech}</span>
                ))}
              </div>
            </div>

            {/* Meta */}
            <div className="cs-sidebar-card">
              <div className="cs-meta-row">
                <span className="cs-meta-key">
                  <Calendar className="w-3.5 h-3.5" /> Year
                </span>
                <span className="cs-meta-val">{project.year}</span>
              </div>
              <div className="cs-meta-row">
                <span className="cs-meta-key">
                  <Briefcase className="w-3.5 h-3.5" /> Role
                </span>
                <span className="cs-meta-val">{project.role}</span>
              </div>
              {project.status && project.status !== "COMPLETED" && project.status !== "IN_PROGRESS" && (
                <div className="cs-meta-row">
                  <span className="cs-meta-key">
                    <Award className="w-3.5 h-3.5" /> Status
                  </span>
                  <span className="cs-meta-val cs-meta-val-accent">{project.status.replace(/-/g, " ")}</span>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="cs-sidebar-actions">
              {project.isPrivateRepo ? (
                <div className="cs-action-btn cs-action-btn-disabled">
                  <Lock className="w-4 h-4" />
                  Private Repository
                </div>
              ) : (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cs-action-btn cs-action-btn-primary"
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
                  className="cs-action-btn cs-action-btn-secondary"
                >
                  <ExternalLink className="w-4 h-4 text-accent" />
                  Visit Live Demo
                </a>
              ) : project.demoAvailableOnRequest ? (
                <div className="cs-action-btn cs-action-btn-ghost">
                  <MessageCircle className="w-4 h-4 text-accent" />
                  Demo Available on Request
                </div>
              ) : null}
            </div>

            {/* WIP Notice */}
            {project.status === "IN_PROGRESS" && (
              <div className="cs-wip-notice">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>This project is actively in progress. Features and demo may change.</span>
              </div>
            )}
          </aside>
        </div>
      </Container>
    </div>
  );
}
