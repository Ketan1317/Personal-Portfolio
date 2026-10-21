"use client";

import { SOCIAL_LINKS } from "@/lib/data";
import { getSocialIcon } from "@/components/ui/SocialIcons";
import { ArrowUp } from "lucide-react";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      className="border-t border-border-default/60 bg-bg-base text-text-secondary"
      role="contentinfo"
      aria-label="Site footer"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-8 border-b border-border-subtle/40">
          {/* Identity */}
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C6A76A]" />
              <span className="font-bold text-text-primary tracking-tight font-mono text-sm">
                KETAN GOYAL
              </span>
            </div>
            <p className="text-xs text-text-tertiary">
              Full-Stack Developer &amp; Systems Builder · Rajpura, India
            </p>
          </div>

          {/* Quick Navigation Links */}
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap items-center gap-6 text-xs font-mono" role="list">
              {[
                { href: "#projects", label: "Work" },
                { href: "#archive", label: "Archive" },
                { href: "#activity", label: "Activity" },
                { href: "#skills", label: "Toolkit" },
                { href: "#about", label: "About" },
                { href: "#contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-text-secondary hover:text-[#C6A76A] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social Icons & Back to Top */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit Ketan's ${s.name}`}
                  className="w-8 h-8 rounded-lg border border-border-default bg-bg-surface text-text-secondary hover:text-[#C6A76A] hover:border-[#C6A76A]/50 flex items-center justify-center transition-colors"
                >
                  {getSocialIcon(s.name, "w-3.5 h-3.5")}
                </a>
              ))}
            </div>

            <button
              onClick={scrollToTop}
              aria-label="Scroll back to top"
              className="w-8 h-8 rounded-lg border border-border-default bg-bg-surface text-text-secondary hover:text-[#C6A76A] hover:border-[#C6A76A]/50 flex items-center justify-center transition-colors cursor-pointer"
            >
              <ArrowUp size={14} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}