"use client";

import { useState, useEffect, useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { SOCIAL_LINKS } from "@/lib/data";
import { getSocialIcon } from "@/components/ui/SocialIcons";

const emptySubscribe = () => () => {};

const NAV_LINKS = [
  { label: "Work", href: "#projects" },
  { label: "Archive", href: "#archive" },
  { label: "Activity", href: "#activity" },
  { label: "Toolkit", href: "#skills" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function Navigation() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const [activeSection, setActiveSection] = useState<string>("projects");

  useEffect(() => {
    if (typeof document !== "undefined") {
      const storedTheme = localStorage.getItem("theme") || "dark";
      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add(storedTheme);
      document.documentElement.setAttribute("data-theme", storedTheme);
    }

    const onScroll = () => {
      setScrolled(window.scrollY > 30);

      // Section spy
      const sections = NAV_LINKS.map((l) => l.href.substring(1));
      const scrollPos = window.scrollY + 140;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isDark = (resolvedTheme || theme || "dark") === "dark";

  const toggleTheme = () => {
    const nextTheme = isDark ? "light" : "dark";
    setTheme(nextTheme);
    if (typeof document !== "undefined") {
      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add(nextTheme);
      document.documentElement.setAttribute("data-theme", nextTheme);
    }
  };

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const targetId = href.substring(1);
    setActiveSection(targetId);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-bg-base/85 border-b border-border-default/60 backdrop-blur-md shadow-sm"
            : "bg-transparent",
        )}
        role="banner"
      >
        <nav
          className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between"
          aria-label="Primary navigation"
        >
          {/* Logo / Name */}
          <a
            href="#main-content"
            className="font-mono text-sm tracking-tight font-bold text-text-primary hover:text-[#C6A76A] transition-colors"
          >
            KETAN GOYAL
          </a>

          {/* Desktop links with champagne underline for active section */}
          <ul className="hidden md:flex items-center gap-8" role="list">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <li key={link.href}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className={cn(
                      "font-mono text-xs tracking-widest uppercase transition-all duration-200 cursor-pointer relative py-1",
                      isActive
                        ? "text-text-primary font-medium"
                        : "text-text-tertiary hover:text-text-primary",
                    )}
                  >
                    {link.label}
                    {isActive && (
                      <span
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C6A76A] rounded-full shadow-[0_0_8px_rgba(198,167,106,0.6)] animate-in fade-in duration-200"
                        aria-hidden="true"
                      />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Socials — desktop */}
            <div className="hidden lg:flex items-center gap-2">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit Ketan's ${s.name} profile`}
                  className="w-8 h-8 rounded-full border border-border-default hover:border-[#C6A76A] text-text-tertiary hover:text-[#C6A76A] transition-all duration-200 flex items-center justify-center hover:-translate-y-0.5 active:translate-y-0 bg-bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C6A76A]"
                >
                  {getSocialIcon(s.name, "w-3.5 h-3.5")}
                </a>
              ))}
            </div>

            {/* Theme toggle */}
            {mounted && (
              <button
                type="button"
                onClick={toggleTheme}
                aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
                className="w-8 h-8 flex items-center justify-center rounded-full border border-border-default bg-bg-surface hover:border-[#C6A76A] text-text-secondary hover:text-[#C6A76A] transition-all duration-200 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C6A76A] cursor-pointer"
              >
                {isDark ? (
                  <Sun size={14} strokeWidth={1.5} />
                ) : (
                  <Moon size={14} strokeWidth={1.5} />
                )}
              </button>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="md:hidden w-8 h-8 flex items-center justify-center rounded-full border border-border-default text-text-primary hover:text-[#C6A76A] transition-colors bg-bg-surface"
            >
              {menuOpen ? <X size={15} /> : <Menu size={15} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className="fixed inset-0 z-40 bg-bg-base/98 backdrop-blur-xl flex flex-col pt-24 px-8 md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <ul className="flex flex-col gap-3" role="list">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <li key={link.href}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className={cn(
                      "w-full text-left py-3.5 text-lg font-mono uppercase tracking-wider transition-colors border-b border-border-subtle flex items-center justify-between cursor-pointer",
                      isActive ? "text-[#C6A76A]" : "text-text-primary hover:text-[#C6A76A]",
                    )}
                  >
                    <span>{link.label}</span>
                    {isActive && <span className="text-xs text-[#C6A76A]">●</span>}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Theme switch in mobile menu */}
          {mounted && (
            <div className="mt-6 pt-4 border-t border-border-subtle flex items-center justify-between">
              <span className="font-mono text-xs text-text-secondary uppercase tracking-wider">
                Theme: {isDark ? "Dark (Obsidian)" : "Light (Warm Ivory)"}
              </span>
              <button
                type="button"
                onClick={toggleTheme}
                aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-border-default bg-bg-surface text-text-primary hover:text-[#C6A76A] hover:border-[#C6A76A] text-xs font-mono transition-colors"
              >
                {isDark ? (
                  <>
                    <Sun size={13} />
                    <span>Light Mode</span>
                  </>
                ) : (
                  <>
                    <Moon size={13} />
                    <span>Dark Mode</span>
                  </>
                )}
              </button>
            </div>
          )}

          {/* Socials in mobile menu */}
          <div className="mt-8 flex items-center gap-3">
            {SOCIAL_LINKS.map((s) => (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit Ketan's ${s.name}`}
                className="w-10 h-10 rounded-full border border-border-default text-text-secondary hover:text-[#C6A76A] hover:border-[#C6A76A] transition-all duration-200 flex items-center justify-center bg-bg-surface"
              >
                {getSocialIcon(s.name, "w-4 h-4")}
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  );
}