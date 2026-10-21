"use client";

import { ArrowDown, Download } from "lucide-react";
import { PROFILE, SOCIAL_LINKS } from "@/lib/data";
import { getSocialIcon } from "@/components/ui/SocialIcons";
import { MetallicSculpture3D } from "@/components/ui/MetallicSculpture3D";

export function HeroSection() {
  const scrollToProjects = () => {
    document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-[92dvh] flex flex-col justify-center overflow-hidden bg-bg-base pt-20 pb-12"
      aria-label="Introduction and Overview"
    >
      {/* Ambient background lighting */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#C6A76A]/8 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-text-primary/5 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 w-full">
        <div className="grid lg:grid-cols-12 gap-8 xl:gap-12 items-center">
          {/* Left Column: Headline, Bio, Dual Actions, Metrics, Socials */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <h1
                className="text-4xl sm:text-6xl xl:text-7xl font-bold tracking-tight text-text-primary leading-[1.02]"
              >
                <span>Engineering systems</span>
                <br />
                <span className="gradient-text-purple">built with depth</span>
                <br />
                <span>&amp; precision.</span>
              </h1>
            </div>

            <p className="max-w-xl text-base sm:text-lg leading-relaxed text-text-secondary">
              Hi, I&apos;m{" "}
              <span className="font-semibold text-text-primary">
                Ketan Goyal
              </span>
              . Computer Science undergraduate at Chitkara University (CUIET), Punjab.
              Focused on full-stack development, backend engineering, databases, and system design,
              with a passion for understanding how software works internally.
            </p>

            {/* Approved Dual Actions */}
            <div className="flex flex-wrap gap-4 items-center pt-1">
              <button
                onClick={scrollToProjects}
                className="group flex items-center gap-2.5 px-6 py-3 bg-[#C6A76A] text-[#0B0B0D] font-medium rounded-full hover:bg-[#d8b87a] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C6A76A] focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base shadow-sm hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                aria-label="Scroll down to projects section"
              >
                Explore Projects
                <ArrowDown
                  size={16}
                  className="group-hover:translate-y-0.5 transition-transform"
                />
              </button>

              <a
                href={PROFILE.resumePath}
                download="Ketan_Goyal_Resume.pdf"
                className="group flex items-center gap-2 px-6 py-3 border border-border-default bg-bg-surface text-text-primary font-medium rounded-full hover:border-[#C6A76A] hover:text-[#C6A76A] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C6A76A] focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base hover:-translate-y-0.5 active:translate-y-0 shadow-sm cursor-pointer"
                aria-label="Download Ketan's verified resume PDF"
              >
                <Download
                  size={15}
                  className="group-hover:scale-110 transition-transform"
                />
                Resume PDF
              </a>
            </div>

            {/* Metrics Row */}
            <div className="grid grid-cols-3 gap-4 pt-3 border-t border-border-subtle/60 max-w-lg">
              <div className="space-y-0.5">
                <div className="text-2xl sm:text-3xl font-bold text-text-primary font-mono">
                  600+
                </div>
                <div className="label text-[11px] text-text-tertiary">
                  DSA SOLVED
                </div>
              </div>
              <div className="space-y-0.5">
                <div className="text-2xl sm:text-3xl font-bold text-text-primary font-mono">
                  9.8
                </div>
                <div className="label text-[11px] text-text-tertiary">
                  B.E. CGPA
                </div>
              </div>
              <div className="space-y-0.5">
                <div className="text-2xl sm:text-3xl font-bold text-text-primary font-mono">
                  20+
                </div>
                <div className="label text-[11px] text-text-tertiary">
                  SHIPPED BUILDS
                </div>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <span className="label text-text-tertiary text-xs">
                CONNECT //
              </span>
              <div className="flex items-center gap-2">
                {SOCIAL_LINKS.map((s) => (
                  <a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit Ketan's ${s.name} profile`}
                    className="w-9 h-9 rounded-xl border border-border-default hover:border-[#C6A76A] text-text-secondary hover:text-[#C6A76A] transition-all duration-200 flex items-center justify-center hover:-translate-y-0.5 active:translate-y-0 bg-bg-surface shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C6A76A]"
                  >
                    {getSocialIcon(s.name, "w-4 h-4")}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Seamlessly Floating 3D Torus Knot Sculpture */}
          <div className="lg:col-span-5 relative w-full h-[380px] sm:h-[460px] lg:h-[540px] flex items-center justify-center">
            <MetallicSculpture3D className="w-full h-full" />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 w-full pt-6">
        <button
          onClick={scrollToProjects}
          className="group flex items-center gap-3 text-text-tertiary hover:text-[#C6A76A] transition-colors font-mono text-xs uppercase tracking-widest cursor-pointer"
          aria-label="Scroll to projects section"
        >
          <span>Scroll to explore</span>
          <div className="w-8 h-[1px] bg-border-default group-hover:bg-[#C6A76A] transition-all group-hover:w-12" />
          <ArrowDown
            size={12}
            className="group-hover:translate-y-0.5 transition-transform"
          />
        </button>
      </div>
    </section>
  );
}
