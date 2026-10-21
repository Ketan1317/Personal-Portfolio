"use client";

import { Mail, Code2 } from "lucide-react";
import { SOCIAL_LINKS, PROFILE } from "@/lib/data";
import { cn } from "@/lib/utils";

// Official vector paths for brand & platform icons
function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={cn("w-4 h-4", className)}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={cn("w-4 h-4", className)}
    >
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );
}

function LeetCodeIcon({ className }: { className?: string }) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={cn("w-4 h-4", className)}
    >
      <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.08-2.227A1.37 1.37 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={cn("w-3.5 h-3.5", className)}
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export function getSocialIcon(name: string, className?: string) {
  const norm = name.toLowerCase();
  if (norm.includes("github")) return <GitHubIcon className={className} />;
  if (norm.includes("linkedin")) return <LinkedInIcon className={className} />;
  if (norm.includes("leetcode")) return <LeetCodeIcon className={className} />;
  if (norm.includes("twitter") || norm.includes("x")) return <XIcon className={className} />;
  if (norm.includes("email") || norm.includes("mail")) return <Mail className={cn("w-4 h-4", className)} />;
  return <Code2 className={cn("w-4 h-4", className)} />;
}

export function SocialButtonsRow({
  className,
  size = "md",
}: {
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-9 h-9 text-sm",
    lg: "w-10 h-10 text-base",
  }[size];

  const allLinks = [
    ...SOCIAL_LINKS,
    {
      name: "Email",
      url: `mailto:${PROFILE.email}`,
      iconPath: "",
    },
  ];

  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      {allLinks.map((s) => (
        <a
          key={s.name}
          href={s.url}
          target={s.url.startsWith("mailto:") ? undefined : "_blank"}
          rel={s.url.startsWith("mailto:") ? undefined : "noopener noreferrer"}
          aria-label={`Visit Ketan's ${s.name}`}
          className={cn(
            sizeClasses,
            "rounded-xl border border-border-default bg-bg-surface text-text-secondary hover:text-[#C6A76A] hover:border-[#C6A76A]/60 hover:bg-bg-elevated flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C6A76A] group",
          )}
        >
          {getSocialIcon(s.name, "transition-transform group-hover:scale-110")}
        </a>
      ))}
    </div>
  );
}
