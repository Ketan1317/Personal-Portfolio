"use client";

import { useState } from "react";
import {
  EDUCATION,
  EXPERIENCE,
  ACHIEVEMENTS,
  CERTIFICATES,
  BADGES,
} from "@/lib/data";
import {
  GraduationCap,
  Briefcase,
  Award,
  FileText,
  ExternalLink,
  Copy,
  Check,
  Compass,
  Trophy,
} from "lucide-react";
import Image from "next/image";

function TimelineItem({
  icon: Icon,
  title,
  subtitle,
  meta,
  detail,
  current,
}: {
  icon: typeof GraduationCap;
  title: string;
  subtitle: string;
  meta?: string;
  detail?: string;
  current?: boolean;
}) {
  return (
    <div className="relative grid grid-cols-[auto_1fr] gap-4 items-start">
      {/* Timeline line */}
      <div className="flex flex-col items-center gap-1">
        <div
          className="w-8 h-8 rounded-full border border-border-default bg-bg-surface flex items-center justify-center shrink-0 shadow-xs"
          aria-hidden="true"
        >
          <Icon size={14} className="text-text-secondary" />
        </div>
        <div className="w-px flex-1 bg-border-subtle min-h-[24px]" aria-hidden="true" />
      </div>

      {/* Content */}
      <div className="pb-7 space-y-1">
        <div className="flex items-center gap-2 flex-wrap">
          <h4 className="font-semibold text-text-primary text-sm sm:text-base">{title}</h4>
          {current && (
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#C6A76A]/10 text-[#C6A76A] border border-[#C6A76A]/20 font-semibold">
              CURRENT
            </span>
          )}
        </div>
        <p className="text-text-secondary text-xs sm:text-sm font-medium">{subtitle}</p>
        {meta && <p className="font-mono text-xs text-[#C6A76A]">{meta}</p>}
        {detail && <p className="text-text-secondary text-xs sm:text-sm mt-1 leading-relaxed">{detail}</p>}
      </div>
    </div>
  );
}

function BadgeCard({
  badge,
}: {
  badge: {
    title: string;
    program: string;
    path: string;
    badgeId?: string;
    description: string;
    verified?: boolean;
  };
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = (id: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(id);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="p-4 rounded-2xl border border-border-default/80 bg-bg-surface hover:border-[#C6A76A]/40 transition-all duration-200 flex flex-col sm:flex-row gap-4 items-start sm:items-center group shadow-xs hover:shadow-sm">
      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden border border-border-default bg-bg-elevated flex items-center justify-center p-1.5 shrink-0 group-hover:scale-105 transition-transform duration-300 shadow-xs">
        <Image
          src={badge.path}
          alt={badge.title}
          width={64}
          height={64}
          className="w-full h-full object-contain"
        />
      </div>

      <div className="space-y-1 min-w-0 flex-1">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-[#C6A76A]/10 text-[#C6A76A] border border-[#C6A76A]/20">
            {badge.program}
          </span>
          <span className="text-xs text-text-tertiary font-mono">VERIFIED</span>
        </div>
        <p className="font-bold text-text-primary text-sm">{badge.title}</p>
        <p className="text-xs text-text-secondary">{badge.description}</p>

        {badge.badgeId && (
          <div className="flex items-center gap-2 pt-0.5">
            <code className="text-[10px] font-mono text-text-secondary bg-bg-elevated px-2 py-0.5 rounded border border-border-subtle select-all">
              ID: {badge.badgeId.slice(0, 14)}...
            </code>
            <button
              onClick={() => handleCopy(badge.badgeId!)}
              className="inline-flex items-center gap-1 text-[10px] font-mono text-text-tertiary hover:text-[#C6A76A] px-2 py-0.5 rounded bg-bg-elevated border border-border-subtle transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check size={10} className="text-[#C6A76A]" />
                  <span className="text-[#C6A76A] font-semibold">Copied</span>
                </>
              ) : (
                <>
                  <Copy size={10} />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export function AboutSection() {
  return (
    <section id="about" className="py-24 lg:py-32 bg-bg-surface relative" aria-label="About Ketan Goyal">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="mb-14">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-[#C6A76A]" />
            <p className="label text-text-tertiary">05 / BACKGROUND</p>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary tracking-tight">
            Identity &amp; Foundation
          </h2>
          <p className="mt-3 text-text-secondary max-w-2xl text-sm sm:text-base leading-relaxed">
            Computer Science undergraduate at Chitkara University (CUIET) focused on full-stack
            development, backend engineering, databases, system design, and algorithmic problem-solving.
          </p>
        </div>

        {/* 2-Column Editorial Grid */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column (7 cols): Education, Open Source & Genuine Personal Interests */}
          <div className="lg:col-span-7 space-y-12">
            {/* Education Timeline */}
            <div>
              <h3 className="label text-text-tertiary mb-6 flex items-center gap-2">
                <GraduationCap size={13} className="text-[#C6A76A]" />
                ACADEMIC CREDENTIALS
              </h3>
              <div>
                {EDUCATION.map((edu) => (
                  <TimelineItem
                    key={edu.degree}
                    icon={GraduationCap}
                    title={edu.degree}
                    subtitle={`${edu.institution} · ${edu.location}`}
                    meta={`${edu.result} · ${edu.period}`}
                    current={edu.current}
                  />
                ))}
              </div>
            </div>

            {/* Open Source Engagement */}
            <div>
              <h3 className="label text-text-tertiary mb-6 flex items-center gap-2">
                <Briefcase size={13} className="text-[#C6A76A]" />
                COMMUNITY &amp; OPEN SOURCE
              </h3>
              <div>
                {EXPERIENCE.map((exp) => (
                  <TimelineItem
                    key={exp.role}
                    icon={Briefcase}
                    title={exp.role}
                    subtitle={`${exp.org} · ${exp.period}`}
                    detail={exp.description}
                    current
                  />
                ))}
              </div>
            </div>

           
          </div>

          {/* Right Column (5 cols): Verified Achievements, Hackathon Certificates & Open Source Badges */}
          <div className="lg:col-span-5 space-y-10">
            {/* Core Achievements */}
            <div>
              <h3 className="label text-text-tertiary mb-5 flex items-center gap-2">
                <Trophy size={13} className="text-[#C6A76A]" />
                CORE HIGHLIGHTS
              </h3>
              <div className="space-y-3.5">
                {ACHIEVEMENTS.map((a) => (
                  <div
                    key={a.title}
                    className="p-4 rounded-xl border border-border-default/80 bg-bg-surface hover:border-[#C6A76A]/40 transition-colors space-y-1 shadow-xs"
                  >
                    <h4 className="font-bold text-text-primary text-sm flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C6A76A]" />
                      {a.title}
                    </h4>
                    <p className="text-xs text-text-secondary leading-relaxed pl-3.5">
                      {a.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Verified Open Source Badges */}
            <div className="space-y-4">
              <h3 className="label text-text-tertiary flex items-center gap-2">
                <Award size={13} className="text-[#C6A76A]" />
                VERIFIED BADGES
              </h3>
              <div className="space-y-3">
                {BADGES.map((badge) => (
                  <BadgeCard key={badge.title} badge={badge} />
                ))}
              </div>
            </div>

            {/* Hackathon & Workshop Certificates */}
            <div>
              <h3 className="label text-text-tertiary mb-4 flex items-center gap-2">
                <FileText size={13} className="text-[#C6A76A]" />
                HACKATHONS &amp; CERTIFICATIONS
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {CERTIFICATES.slice(0, 6).map((cert) => (
                  <a
                    key={cert.title}
                    href={cert.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open certificate: ${cert.title}`}
                    className="group p-3 rounded-xl border border-border-default/80 bg-bg-surface hover:border-[#C6A76A] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C6A76A] flex items-start justify-between gap-2 shadow-xs hover:-translate-y-0.5 active:translate-y-0"
                  >
                    <div className="space-y-0.5 min-w-0">
                      <p className="text-xs font-medium text-text-primary group-hover:text-[#C6A76A] transition-colors leading-snug truncate">
                        {cert.title}
                      </p>
                      <p className="text-[10px] font-mono text-text-tertiary">
                        {cert.type === "pdf" ? "PDF Document" : "Certificate"}
                      </p>
                    </div>
                    <ExternalLink
                      size={11}
                      className="text-text-tertiary group-hover:text-[#C6A76A] transition-colors shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}