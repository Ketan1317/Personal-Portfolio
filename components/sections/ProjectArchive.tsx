"use client";

import { useState, useMemo } from "react";
import {
  Search,
  ExternalLink,
  GitBranch,
  Play,
  LayoutGrid,
  List,
  Terminal,
} from "lucide-react";
import { PROJECTS, type Project } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Modal } from "@/components/ui/Modal";
import { ProjectDetail } from "@/components/sections/ProjectDetail";

function ProjectCardMedia({ project }: { project: Project }) {
  if (project.mediaType === "video" && project.mediaPath) {
    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-border-default bg-black/90 shadow-sm group/media">
        <video
          src={project.mediaPath}
          controls
          muted
          playsInline
          preload="metadata"
          onVolumeChange={(e) => {
            e.currentTarget.muted = true;
          }}
          className="w-full h-full object-cover"
          aria-label={`${project.title} video demonstration`}
        />
      </div>
    );
  }

  if (project.mediaType === "image" && project.mediaPath) {
    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-border-default bg-bg-surface shadow-sm">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.mediaPath}
          alt={`${project.title} screenshot`}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
      </div>
    );
  }

  // Fallback for code/system projects without media
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-border-default bg-bg-elevated p-4 flex flex-col justify-between shadow-sm">
      <div className="flex items-center justify-between text-text-tertiary">
        <Terminal size={14} />
        <span className="font-mono text-[10px] uppercase tracking-wider text-accent-purple">
          ARCHITECTURE
        </span>
      </div>
      <div className="font-mono text-xs text-text-secondary line-clamp-3">
        <code>
          {project.id === "cexec"
            ? "$ ./cexec --port 8080 --sandbox /var/run/cbox\n[worker] pthread pool initialized"
            : "$ java HttpServer -p 8080\n[io] listening for HTTP/1.1 requests"}
        </code>
      </div>
      <div className="font-mono text-[10px] text-accent-purple">
        SYSTEM LEVEL IMPLEMENTATION
      </div>
    </div>
  );
}

export function ProjectArchive() {
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return PROJECTS;
    return PROJECTS.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q) ||
        p.tech.some((t) => t.toLowerCase().includes(q)),
    );
  }, [search]);

  return (
    <section id="archive" className="py-24 lg:py-32 bg-gradient-to-b from-bg-base via-bg-surface to-bg-surface relative" aria-label="Project archive">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-[#C6A76A]" />
                <p className="font-mono text-xs uppercase tracking-widest text-text-tertiary">02 / PROJECT ARCHIVE</p>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary tracking-tight">
                Complete Works
              </h2>
              <p className="mt-2 text-text-tertiary max-w-xl text-sm sm:text-base">
                Curated portfolio across systems programming, Web3, full-stack, and developer tooling.
              </p>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-1 p-1 rounded-lg bg-bg-surface border border-border-default self-start md:self-auto shadow-xs">
              <button
                onClick={() => setViewMode("grid")}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono transition-colors",
                  viewMode === "grid"
                    ? "bg-bg-elevated text-text-primary font-semibold shadow-xs"
                    : "text-text-tertiary hover:text-text-secondary",
                )}
                aria-label="Grid layout"
              >
                <LayoutGrid size={13} />
                Grid
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono transition-colors",
                  viewMode === "list"
                    ? "bg-bg-elevated text-text-primary font-semibold shadow-xs"
                    : "text-text-tertiary hover:text-text-secondary",
                )}
                aria-label="List layout"
              >
                <List size={13} />
                List
              </button>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-10 items-stretch sm:items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search
              size={13}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-tertiary"
              aria-hidden="true"
            />
            <input
              type="search"
              placeholder="Search tech, title, specs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search projects"
              className="w-full pl-9 pr-4 py-2.5 text-xs font-mono rounded-full border border-border-default bg-bg-surface text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-1 focus:ring-accent-purple focus:border-accent-purple shadow-xs transition-colors"
            />
          </div>

          <div className="text-xs font-mono text-text-tertiary">
            {filtered.length} {filtered.length === 1 ? "project" : "projects"} displayed
          </div>
        </div>

        {/* Content Display */}
        {filtered.length === 0 ? (
          <div className="py-16 text-center border border-dashed border-border-default rounded-xl bg-bg-surface">
            <p className="text-text-secondary text-sm">
              No projects match your search query.
            </p>
            <button
              onClick={() => setSearch("")}
              className="mt-3 text-xs font-mono text-accent-purple hover:underline cursor-pointer"
            >
              Reset search
            </button>
          </div>
        ) : viewMode === "grid" ? (
          /* Rich Media Grid */
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project) => (
              <article
                key={project.id}
                className="group flex flex-col justify-between rounded-xl border border-border-default bg-bg-surface p-4 shadow-sm hover:shadow-md hover:border-accent-purple/60 transition-all duration-300"
              >
                <div className="space-y-3">
                  {/* Media Frame with restrained border & shadow */}
                  <ProjectCardMedia project={project} />

                  {/* Header info */}
                  <div>
                    
                    <h3 className="text-base font-bold text-text-primary group-hover:text-accent-purple transition-colors mt-0.5">
                      {project.title}
                    </h3>
                    <p className="text-xs text-text-secondary line-clamp-2 mt-1 leading-relaxed">
                      {project.shortDescription}
                    </p>
                  </div>

                  {/* Tech stack pills */}
                  <div className="flex flex-wrap gap-1 pt-1">
                    {project.tech.slice(0, 4).map((t) => (
                      <span
                        key={t}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-bg-elevated text-text-secondary border border-border-subtle"
                      >
                        {t}
                      </span>
                    ))}
                    {project.tech.length > 4 && (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded text-text-tertiary">
                        +{project.tech.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="flex items-center justify-between pt-4 mt-4 border-t border-border-subtle">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="inline-flex items-center gap-1 text-xs font-mono text-accent-purple hover:underline cursor-pointer"
                  >
                    View Specs
                    <ExternalLink size={11} />
                  </button>

                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-7 h-7 flex items-center justify-center rounded-full border border-border-default text-text-secondary hover:text-accent-purple hover:border-accent-purple transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-purple"
                      aria-label={`View ${project.title} on GitHub`}
                    >
                      <GitBranch size={13} />
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        ) : (
          /* Technical List Mode */
          <div className="space-y-0 divide-y divide-border-subtle border border-border-default rounded-xl bg-bg-surface overflow-hidden shadow-xs">
            {filtered.map((project) => (
              <div
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 hover:bg-bg-elevated transition-colors cursor-pointer"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelectedProject(project);
                  }
                }}
              >
                <div className="space-y-1 min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold text-sm text-text-primary group-hover:text-accent-purple transition-colors">
                      {project.title}
                    </h3>
                    {project.featured && (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-accent-purple-dim text-accent-purple border border-accent-purple/20">
                        FEATURED
                      </span>
                    )}
                    {project.mediaPath && (
                      <span className="text-[10px] font-mono text-accent-purple flex items-center gap-1">
                        <Play size={8} fill="currentColor" />
                        MEDIA
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-text-secondary line-clamp-1">
                    {project.shortDescription}
                  </p>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-auto shrink-0">
                  <div className="hidden md:flex items-center gap-1">
                    {project.tech.slice(0, 3).map((t) => (
                      <span key={t} className="text-[11px] font-mono text-text-tertiary">
                        {t}
                      </span>
                    ))}
                  </div>

                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="w-7 h-7 flex items-center justify-center rounded-full border border-border-default text-text-secondary hover:text-accent-purple transition-colors"
                      aria-label={`View ${project.title} GitHub`}
                    >
                      <GitBranch size={12} />
                    </a>
                  )}

                  <span className="text-xs font-mono text-accent-purple group-hover:translate-x-0.5 transition-transform">
                    →
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Total Count */}
        <div className="mt-8 flex items-center justify-between text-xs font-mono text-text-tertiary">
          <span>{filtered.length} total projects cataloged</span>
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        title={selectedProject?.title}
      >
        {selectedProject && <ProjectDetail project={selectedProject} />}
      </Modal>
    </section>
  );
}
