"use client";

import { ExternalLink, GitBranch, Tag } from "lucide-react";
import type { Project } from "@/lib/data";

interface ProjectDetailProps {
  project: Project;
}

export function ProjectDetail({ project }: ProjectDetailProps) {
  return (
    <div className="space-y-6">
      {/* Media preview */}
      {project.mediaPath && (
        <div className="relative rounded-xl overflow-hidden bg-bg-surface aspect-video">
          {project.mediaType === "video" ? (
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
              aria-label={`${project.title} demo video`}
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={project.mediaPath}
              alt={`${project.title} screenshot`}
              className="w-full h-full object-cover"
            />
          )}
        </div>
      )}

      {/* Preview availability notice if no media */}
      {!project.mediaPath && (
        <div className="flex items-center gap-2">
          <span className="label text-text-tertiary">No preview available</span>
        </div>
      )}

      {/* Description */}
      <div className="space-y-2">
        <h3 className="label text-text-tertiary">ABOUT THIS PROJECT</h3>
        <p className="text-text-secondary leading-relaxed">{project.longDescription}</p>
      </div>

      {/* Tech stack */}
      <div className="space-y-3">
        <h3 className="label text-text-tertiary flex items-center gap-1">
          <Tag size={10} />
          TECH STACK
        </h3>
        <div className="flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span key={t} className="skill-pill">
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Links */}
      <div className="flex flex-wrap gap-3 pt-2 border-t border-border-subtle">
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-border-default text-text-secondary hover:border-accent-purple hover:text-accent-purple transition-colors text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-purple"
            aria-label={`View ${project.title} source code on GitHub`}
          >
            <GitBranch size={15} />
            View Source
          </a>
        )}
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent-purple text-white hover:bg-accent-purple/90 transition-colors text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-purple"
            aria-label={`Visit ${project.title} live demo`}
          >
            <ExternalLink size={15} />
            Live Demo
          </a>
        )}
      </div>
    </div>
  );
}
