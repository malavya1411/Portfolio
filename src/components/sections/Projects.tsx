"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/data";

export function Projects() {
  const track = useRef<HTMLDivElement>(null);
  const featured = projects.filter((project) => project.featured).slice(0, 5);
  useEffect(() => {
    const section = track.current?.parentElement;
    const row = track.current;
    if (!section || !row) return;
    const update = () => {
      const top = section.getBoundingClientRect().top;
      const span = section.offsetHeight - window.innerHeight;
      const progress = Math.max(0, Math.min(1, -top / Math.max(1, span)));
      const distance = Math.max(0, row.scrollWidth - window.innerWidth + 72);
      row.style.transform = `translate3d(${-distance * progress}px, 0, 0)`;
    };
    update(); window.addEventListener("scroll", update, { passive: true }); window.addEventListener("resize", update);
    return () => { window.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, []);
  return <section id="projects" className="work-scroll-section">
    <div className="work-sticky">
      <div className="work-heading"><p>01 — Selected work</p><h2>Things I&apos;ve made<br /><em>useful.</em></h2><span>Keep scrolling <b>→</b></span></div>
      <div ref={track} className="work-track">
        {featured.map((project, i) => <Link href={`/projects/${project.slug}`} key={project.slug} className={`work-card work-card-${i % 3}`}>
          <div className="work-image"><img src={project.coverImage || "/images/git_stat.png"} alt="" /><span>{project.year}</span></div>
          <div className="work-copy"><p>{project.categoryTag || project.tags[0]}</p><h3>{project.title}</h3><span>{project.summary}</span><ArrowUpRight size={18} /></div>
        </Link>)}
        <Link href="/projects" className="work-end-card">View every project <ArrowUpRight size={22} /></Link>
      </div>
    </div>
  </section>;
}
