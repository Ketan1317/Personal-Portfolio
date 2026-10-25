"use client";

import { SKILLS } from "@/lib/data";
import {
  Code2,
  Layout,
  Server,
  Cpu,
  Database,
  Layers,
} from "lucide-react";

interface CategoryMeta {
  icon: typeof Code2;
  index: string;
  subtitle: string;
}

const CATEGORY_META: Record<string, CategoryMeta> = {
  Languages: {
    icon: Code2,
    index: "01",
    subtitle: "Core programming & type systems",
  },
  "Frontend & Mobile": {
    icon: Layout,
    index: "02",
    subtitle: "Interactive UI & native applications",
  },
  "Backend & Systems": {
    icon: Server,
    index: "03",
    subtitle: "API design & server architecture",
  },
  "Distributed Systems & Queues": {
    icon: Cpu,
    index: "04",
    subtitle: "Real-time streaming & async workers",
  },
  "Databases & DevOps": {
    icon: Database,
    index: "05",
    subtitle: "Persistence, containers & observability",
  },
  "Web3 & Machine Learning": {
    icon: Layers,
    index: "06",
    subtitle: "Decentralized tech & predictive models",
  },
};

export function SkillsSection() {
  return (
    <section
      id="skills"
      className="py-24 lg:py-32 bg-bg-base relative overflow-hidden"
      aria-label="Skills and technologies"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-border-subtle/60">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C6A76A]" />
              <p className="label text-text-tertiary">04 / TECHNICAL TOOLKIT</p>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary tracking-tight">
              Skills &amp; Capabilities
            </h2>
          </div>
          <p className="text-sm text-text-secondary max-w-md font-mono">
            Structured architectural stack across modern languages, distributed pipelines, and production systems.
          </p>
        </div>

        {/* 6 Balanced, Perfectly Aligned Cards Grid (3x2) */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {Object.entries(SKILLS).map(([category, skills]) => {
            const meta = CATEGORY_META[category] ?? {
              icon: Code2,
              index: "00",
              subtitle: "Technologies",
            };
            const Icon = meta.icon;

            return (
              <div
                key={category}
                className="group p-6 rounded-2xl border border-border-default/80 bg-bg-surface hover:border-[#C6A76A]/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col justify-between space-y-6"
              >
                {/* Header */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-[#C6A76A] tracking-widest font-semibold">
                      {meta.index} {"//"}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-bg-elevated border border-border-default/60 flex items-center justify-center text-text-secondary group-hover:text-[#C6A76A] group-hover:border-[#C6A76A]/40 transition-colors">
                      <Icon size={16} />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-text-primary tracking-tight">
                      {category}
                    </h3>
                    <p className="text-xs text-text-tertiary font-sans mt-0.5">
                      {meta.subtitle}
                    </p>
                  </div>
                </div>

                {/* Skill Pills */}
                <div className="flex flex-wrap gap-2 pt-2 border-t border-border-subtle/40">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 rounded-lg text-xs font-mono border border-border-default/70 bg-bg-elevated/40 text-text-secondary hover:text-[#C6A76A] hover:border-[#C6A76A]/60 hover:bg-[#C6A76A]/5 transition-all cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
