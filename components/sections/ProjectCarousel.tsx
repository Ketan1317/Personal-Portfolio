"use client";

import {
  useState,
  useCallback,
  useEffect,
  useRef,
} from "react";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  GitBranch,
  Play,
  Pause,
  Maximize2,
} from "lucide-react";
import { FEATURED_PROJECTS, type Project } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Modal } from "@/components/ui/Modal";
import { ProjectDetail } from "@/components/sections/ProjectDetail";

// ── 3D Cylindrical Geometry Transforms ───────────────────────────
const POSITIONS = [
  // 0: Active Center
  {
    x: "0%",
    z: 70,
    rotateY: 0,
    scale: 1.04,
    opacity: 1,
    blur: 0,
    zIndex: 25,
    clickableToOpen: true,
  },
  // 1: Next (Right)
  {
    x: "56%",
    z: -80,
    rotateY: -28,
    scale: 0.85,
    opacity: 0.68,
    blur: 1.5,
    zIndex: 12,
    clickableToOpen: false,
  },
  // 2: Far Next (Far Right)
  {
    x: "100%",
    z: -220,
    rotateY: -48,
    scale: 0.68,
    opacity: 0.32,
    blur: 4,
    zIndex: 5,
    clickableToOpen: false,
  },
  // 3: Prev (Left)
  {
    x: "-56%",
    z: -80,
    rotateY: 28,
    scale: 0.85,
    opacity: 0.68,
    blur: 1.5,
    zIndex: 12,
    clickableToOpen: false,
  },
  // 4: Far Prev (Far Left)
  {
    x: "-100%",
    z: -220,
    rotateY: 48,
    scale: 0.68,
    opacity: 0.32,
    blur: 4,
    zIndex: 5,
    clickableToOpen: false,
  },
];

function getPositionIndex(offset: number, total: number): number {
  const normalized = ((offset % total) + total) % total;
  if (normalized === 0) return 0; // active
  if (normalized === 1) return 1; // next
  if (normalized === 2) return 2; // next+1
  if (normalized === total - 1) return 3; // prev
  if (normalized === total - 2) return 4; // prev-1
  return -1; // hidden
}

// ── Interactive 3D Media Card ──────────────────────────────────────
function ProjectCard({
  project,
  posIdx,
  isActive,
  onClick,
  onOpenDetails,
  cardWidth,
}: {
  project: Project;
  posIdx: number;
  isActive: boolean;
  onClick: () => void;
  onOpenDetails: (p: Project) => void;
  cardWidth: number;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [reducedMotion] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });
  const [mouseParallax, setMouseParallax] = useState({ x: 0, y: 0 });

  // Sync video play/pause with active slide state
  useEffect(() => {
    if (!videoRef.current || project.mediaType !== "video") return;
    videoRef.current.muted = true;
    if (isActive) {
      videoRef.current.play().catch(() => {});
    } else {
      videoRef.current.pause();
    }
  }, [isActive, project.mediaType]);

  const toggleVideoPlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const rafRef = useRef<number | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isActive || reducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 12;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      setMouseParallax({ x, y });
    });
  };

  const handleMouseLeave = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    setMouseParallax({ x: 0, y: 0 });
  };

  if (posIdx === -1) return null;
  const cfg = POSITIONS[posIdx];

  const transformStyle = reducedMotion
    ? {
        transform: `translateX(${cfg.x})`,
        opacity: cfg.opacity,
        zIndex: cfg.zIndex,
      }
    : {
        transform: `translateX(${cfg.x}) translateZ(${cfg.z}px) rotateY(${
          cfg.rotateY + (isActive ? mouseParallax.x * 0.4 : 0)
        }deg) rotateX(${isActive ? -mouseParallax.y * 0.4 : 0}deg) scale(${cfg.scale})`,
        opacity: cfg.opacity,
        zIndex: cfg.zIndex,
        filter: cfg.blur ? `blur(${cfg.blur}px)` : "none",
        transition: "transform 0.55s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.55s ease, filter 0.55s ease",
      };

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "absolute cursor-pointer will-change-transform select-none rounded-2xl overflow-hidden shadow-2xl transform-gpu",
        "border transition-colors duration-300",
        isActive
          ? "border-[#C6A76A]/60 shadow-[0_16px_50px_rgba(0,0,0,0.85)] ring-1 ring-[#C6A76A]/40"
          : "border-[#F2EBDD]/10 hover:border-[#C6A76A]/30 shadow-[0_8px_30px_rgba(0,0,0,0.6)]",
      )}
      style={{
        width: cardWidth,
        aspectRatio: "16/9",
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
        ...transformStyle,
      }}
      role="group"
      aria-label={`${project.title}${isActive ? " (Active Project)" : ""}`}
      tabIndex={isActive ? 0 : -1}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpenDetails(project);
        }
      }}
    >
      <div className="relative w-full h-full bg-bg-surface">
        {/* Media Frame */}
        {project.mediaType === "video" && project.mediaPath ? (
          <video
            ref={videoRef}
            src={project.mediaPath}
            loop
            muted
            playsInline
            preload="metadata"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onVolumeChange={(e) => {
              e.currentTarget.muted = true;
            }}
            className="w-full h-full object-cover pointer-events-none"
            aria-label={`${project.title} demonstration video`}
          />
        ) : project.mediaPath ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.mediaPath}
            alt={`${project.title} screenshot`}
            loading="lazy"
            className="w-full h-full object-cover pointer-events-none"
          />
        ) : (
          <div className="w-full h-full flex flex-col justify-between p-5 bg-bg-surface">
            <div className="font-mono text-xs text-text-tertiary">
              SYSTEM LEVEL ARCHITECTURE
            </div>
            <div className="font-mono text-xs text-text-secondary">
              <code>
                {project.id === "minidb"
                  ? "$ minidb --ast-parse --strict\n[engine] B-tree index allocated"
                  : "$ sol-launchpad --network devnet\n[spl] token mint ready"}
              </code>
            </div>
            <div className="font-mono text-[10px] text-[#C6A76A]">
              READY FOR EXECUTION
            </div>
          </div>
        )}

        {/* Ambient Gradient Overlays */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/35 pointer-events-none"
          aria-hidden="true"
        />

        {/* Video Play/Pause Control Button for Active Card */}
        {isActive && project.mediaType === "video" && (
          <div className="absolute top-3.5 right-3.5 flex items-center gap-1.5 z-20">
            <button
              onClick={toggleVideoPlay}
              className="w-7 h-7 flex items-center justify-center rounded-full bg-black/65 hover:bg-black/85 text-white/90 border border-white/10 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C6A76A]"
              aria-label={isPlaying ? "Pause video" : "Play video"}
            >
              {isPlaying ? <Pause size={12} /> : <Play size={12} />}
            </button>
          </div>
        )}

        {/* Center Play Icon for Inactive Cards */}
        {!isActive && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/80 shadow-md">
              <Play size={18} fill="currentColor" className="ml-0.5" />
            </div>
          </div>
        )}

        {/* Bottom Metadata & Expand Trigger */}
        <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-end justify-between z-20">
          <div className="min-w-0 pr-3">
            <div className="text-white font-bold text-base sm:text-lg truncate tracking-tight">
              {project.title}
            </div>
            <div className="text-white/70 text-xs font-mono line-clamp-1 mt-0.5">
              {project.shortDescription}
            </div>
          </div>

          {isActive && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenDetails(project);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#C6A76A] hover:bg-[#d8b87a] text-[#0B0B0D] font-medium text-xs font-mono backdrop-blur-md transition-all shadow-md shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white cursor-pointer"
              aria-label={`Open full details for ${project.title}`}
            >
              <Maximize2 size={11} />
              <span>Specs</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export function ProjectCarousel() {
  const [active, setActive] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const [autoplayProgress, setAutoplayProgress] = useState(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [cardWidth, setCardWidth] = useState(520);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);

  const stageRef = useRef<HTMLDivElement>(null);
  const total = FEATURED_PROJECTS.length;

  // Responsive card dimension
  useEffect(() => {
    const updateSize = () => {
      const w = window.innerWidth;
      if (w < 480) {
        setCardWidth(w - 48);
      } else if (w < 768) {
        setCardWidth(420);
      } else if (w < 1280) {
        setCardWidth(520);
      } else {
        setCardWidth(600);
      }
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const next = useCallback(() => {
    setActive((prev) => (prev + 1) % total);
    setAutoplayProgress(0);
  }, [total]);

  const prev = useCallback(() => {
    setActive((prev) => (prev - 1 + total) % total);
    setAutoplayProgress(0);
  }, [total]);

  // Autoplay timer with progress bar
  useEffect(() => {
    if (!isAutoplay) return;
    const interval = 80;
    const step = (interval / 6000) * 100;

    const timer = setInterval(() => {
      setAutoplayProgress((p) => {
        if (p >= 100) {
          next();
          return 0;
        }
        return p + step;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [isAutoplay, next]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeEl = document.activeElement;
      if (activeEl?.tagName === "INPUT" || activeEl?.tagName === "TEXTAREA") return;
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [next, prev]);

  // Pointer drag gestures
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    setDragStartX(e.clientX);
    setIsAutoplay(false);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const diff = e.clientX - dragStartX;
    if (Math.abs(diff) > 70) {
      if (diff > 0) prev();
      else next();
      setIsDragging(false);
    }
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  const currentProject = FEATURED_PROJECTS[active];

  const handleCardClick = (idx: number) => {
    if (idx === active) {
      setSelectedProject(FEATURED_PROJECTS[active]);
    } else {
      setActive(idx);
    }
  };

  return (
    <section
      id="projects"
      className="relative py-24 lg:py-32 overflow-hidden bg-gradient-to-b from-bg-base via-bg-surface/60 to-bg-base border-t border-border-default/60"
      aria-label="Signature 3D Project Carousel"
    >
      {/* Background ambient radial illumination */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-[#C6A76A]/8 blur-[130px] rounded-full pointer-events-none"
        aria-hidden="true"
      />

      {/* Header bar */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#C6A76A]" />
              <p className="font-mono text-xs uppercase tracking-widest text-[#777570]">01 / SIGNATURE WORKS</p>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary tracking-tight">
              Featured Systems &amp; Builds
            </h2>
          </div>

          
        </div>
      </div>

      {/* 3D Carousel Stage */}
      <div
        ref={stageRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        className={cn(
          "relative h-[340px] sm:h-[410px] flex items-center justify-center touch-pan-y select-none",
          isDragging ? "cursor-grabbing" : "cursor-grab",
        )}
        style={{ perspective: 1200 }}
        role="list"
        aria-label="3D Cylindrical Project Showcase"
      >
        {FEATURED_PROJECTS.map((project, idx) => {
          const offset = idx - active;
          const posIdx = getPositionIndex(offset, total);

          return (
            <ProjectCard
              key={project.id}
              project={project}
              posIdx={posIdx}
              isActive={idx === active}
              cardWidth={cardWidth}
              onClick={() => handleCardClick(idx)}
              onOpenDetails={(p) => setSelectedProject(p)}
            />
          );
        })}

        {/* Left / Right Nav Buttons */}
        <button
          onClick={prev}
          aria-label="Previous project"
          className="absolute left-4 sm:left-10 z-30 w-11 h-11 rounded-full border border-border-default bg-bg-surface/85 hover:border-[#C6A76A] hover:text-[#C6A76A] text-text-primary backdrop-blur-md flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C6A76A] cursor-pointer"
        >
          <ChevronLeft size={20} />
        </button>

        <button
          onClick={next}
          aria-label="Next project"
          className="absolute right-4 sm:right-10 z-30 w-11 h-11 rounded-full border border-border-default bg-bg-surface/85 hover:border-[#C6A76A] hover:text-[#C6A76A] text-text-primary backdrop-blur-md flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C6A76A] cursor-pointer"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Autoplay Progress Line */}
      {isAutoplay && (
        <div className="max-w-md mx-auto px-6 mt-4">
          <div className="w-full h-1 bg-border-subtle rounded-full overflow-hidden">
            <div
              className="h-full bg-[#C6A76A] transition-all duration-75 ease-linear rounded-full shadow-[0_0_8px_rgba(198,167,106,0.6)]"
              style={{ width: `${autoplayProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* Active Project Details & Nav Controls */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 mt-10">
        <div className="grid lg:grid-cols-[1fr_auto] gap-8 items-end p-6 sm:p-8 rounded-3xl border border-border-default bg-bg-surface backdrop-blur-md shadow-xl">
          {/* Left Column: Project Overview */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span
                className="text-4xl sm:text-5xl font-bold font-mono text-[#C6A76A]/40 leading-none select-none"
                aria-hidden="true"
              >
                {String(active + 1).padStart(2, "0")}
              </span>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-xs uppercase tracking-widest text-[#C6A76A]">
                    PROJECT {active + 1} OF {total}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-text-primary tracking-tight">
                  {currentProject?.title}
                </h3>
              </div>
            </div>

            <p className="text-text-secondary max-w-2xl text-sm sm:text-base leading-relaxed">
              {currentProject?.longDescription || currentProject?.shortDescription}
            </p>

            {/* Tech Stack Pills */}
            <div className="flex flex-wrap gap-2 pt-1" aria-label="Technology stack">
              {currentProject?.tech.map((t) => (
                <span
                  key={t}
                  className="font-mono text-xs px-2.5 py-1 rounded-full bg-bg-surface text-text-secondary border border-border-default hover:border-[#C6A76A]/40 transition-colors"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Right Column: Actions */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setSelectedProject(currentProject)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#C6A76A] text-[#0B0B0D] font-medium text-xs font-mono hover:bg-[#d8b87a] transition-all hover:-translate-y-0.5 active:translate-y-0 shadow-md cursor-pointer"
              aria-label={`View complete specifications for ${currentProject?.title}`}
            >
              <Maximize2 size={13} />
              <span>Full Specs</span>
            </button>

            {currentProject?.githubUrl && (
              <a
                href={currentProject.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border-default bg-bg-surface text-text-secondary hover:text-[#C6A76A] hover:border-[#C6A76A] transition-all text-xs font-mono hover:-translate-y-0.5 active:translate-y-0"
                aria-label={`View ${currentProject.title} on GitHub`}
              >
                <GitBranch size={13} />
                <span>Source Code</span>
              </a>
            )}

            {currentProject?.liveUrl && (
              <a
                href={currentProject.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border-default bg-bg-surface text-text-secondary hover:text-[#C6A76A] hover:border-[#C6A76A] transition-all text-xs font-mono hover:-translate-y-0.5 active:translate-y-0"
                aria-label={`Open live demo of ${currentProject.title}`}
              >
                <ExternalLink size={13} />
                <span>Live Demo</span>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Modal for Technical Specs */}
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
