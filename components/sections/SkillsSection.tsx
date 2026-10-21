"use client";

import { SKILLS } from "@/lib/data";

const SKILL_COLORS: Record<string, string> = {
  Languages: "var(--accent-purple)",
  Frontend: "var(--accent-purple)",
  "Backend & APIs": "var(--accent-purple)",
  "Databases & ORM": "var(--text-tertiary)",
  "DevOps & Systems": "var(--accent-purple)",
};

export function SkillsSection() {
  return (
    <section id="skills" className="py-24 lg:py-32 bg-bg-base" aria-label="Skills and technologies">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-[#C6A76A]" />
            <p className="label text-text-tertiary">04 / TECH STACK</p>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-text-primary tracking-tight">Skills &amp; Capabilities</h2>
        </div>

        {/* Skills grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {Object.entries(SKILLS).map(([category, skills]) => (
            <div key={category} className="space-y-4">
              {/* Category label with accent line */}
              <div className="flex items-center gap-2">
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ background: SKILL_COLORS[category] ?? "var(--accent-purple)" }}
                  aria-hidden="true"
                />
                <h3 className="label text-text-secondary">{category.toUpperCase()}</h3>
              </div>

              {/* Skill pills */}
              <div className="flex flex-wrap gap-1.5">
                {skills.map((skill) => (
                  <span key={skill} className="skill-pill">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
