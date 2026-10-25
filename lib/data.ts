// ============================================================
// PORTFOLIO DATA — Ketan Goyal
// Single source of truth for all portfolio content.
// ============================================================

import leetcodeSnapshot from "./leetcode-snapshot.json";

export const LEETCODE_CALENDAR_FALLBACK: Record<string, number> = leetcodeSnapshot;

export const PROFILE = {
  name: "Ketan Goyal",
  title: "Full-Stack Developer",
  bio: "Computer Science undergraduate at Chitkara University (CUIET) focused on full-stack development, backend engineering, and system design. 600+ DSA problems solved across graphs, dynamic programming, and core algorithms.",
  email: "goyalketan1317@gmail.com",
  resumePath: "/Resume.pdf",
  location: "Rajpura, Punjab, India",
  gpa: "9.8/10",
};

export const SOCIAL_LINKS = [
  {
    name: "GitHub",
    url: "https://github.com/Ketan1317",
    iconPath: "/socials/github.jpg",
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/ketan-goyal-117368324/",
    iconPath: "/socials/linkedin.jpg",
  },
  {
    name: "LeetCode",
    url: "https://leetcode.com/ketangoyal1212",
    iconPath: "/socials/leetcode.png",
  },
  {
    name: "X",
    url: "https://x.com/KetanGo11864224",
    iconPath: "/socials/twitter.jpg",
  },
];

export type ProjectCategory =
  | "Systems & Developer Tools"
  | "Web3"
  | "Java / Spring Boot"
  | "Next.js / Full-Stack"
  | "MERN";

export type Project = {
  id: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  tech: string[];
  category: ProjectCategory;
  githubUrl?: string;
  liveUrl?: string;
  mediaPath?: string;
  mediaType?: "image" | "video";
  featured: boolean;
  featuredIndex?: number;
};

/**
 * Filtered portfolio project list.
 * Excludes removed projects per prompt instruction:
 * Klyro, Dexmaster, Hackheaven, GitHub Finder, AI Summarizer, Spring Auth,
 * Node.js Observability Lab, Muzer, HireSphere, Machine Learning, Blogify,
 * Hotstar Clone, Java Full Stack Core, Java Programming, Spring JDBC,
 * Bash Scripting, OSC Tool, Evermore.
 */
export const PROJECTS: Project[] = [
  // ── FEATURED IN 3D CAROUSEL & SPOTLIGHT ──────────────────
  {
    id: "minidb",
    title: "miniDB",
    shortDescription: "Browser-based relational database engine with SQL parsing from scratch",
    longDescription:
      "A browser-based relational database engine built entirely from scratch in JavaScript. Features an AST-based SQL parser, query execution pipeline, B-tree inspired indexing, disk/localStorage persistence, nested joins, ACID transaction handling, and real-time query plan visualization.",
    tech: ["JavaScript", "SQL", "Database Internals", "AST Parser", "Transactions"],
    category: "Systems & Developer Tools",
    githubUrl: "https://github.com/Ketan1317/miniDB",
    mediaPath: "/projects/miniDB.mp4",
    mediaType: "video",
    featured: true,
    featuredIndex: 0,
  },
  {
    id: "sol-launchpad",
    title: "SOL Token Launchpad",
    shortDescription: "Solana token launchpad for creating, minting & deploying SPL tokens",
    longDescription:
      "A decentralized Solana token launchpad project for creating, minting, and deploying SPL tokens on the Solana blockchain. Integrates Solana Web3.js, wallet adapters, and decentralized metadata management for rapid token deployment.",
    tech: ["TypeScript", "Solana", "Web3.js", "SPL Tokens", "React"],
    category: "Web3",
    githubUrl: "https://github.com/Ketan1317/SOL-Token-Launchpad",
    mediaPath: "/projects/Sol_Token_Launchpad.mp4",
    mediaType: "video",
    featured: true,
    featuredIndex: 1,
  },
  {
    id: "devpulse",
    title: "Devpulse",
    shortDescription: "AI-powered uptime monitoring & incident management platform",
    longDescription:
      "An AI-powered uptime monitoring and incident management platform built with Spring Boot, React, and Docker. Features real-time health metrics, scheduled monitoring, proactive alerting, and a PostgreSQL/MySQL data layer. Integrates Google Gemini for intelligent root-cause analysis.",
    tech: ["Spring Boot", "React", "MySQL", "Docker", "Google Gemini", "PostgreSQL"],
    category: "Java / Spring Boot",
    githubUrl: "https://github.com/Ketan1317/Devpulse--System-Monitoring-Application",
    mediaPath: "/projects/Devpulse.mp4",
    mediaType: "video",
    featured: true,
    featuredIndex: 2,
  },
  {
    id: "crash-dump-analyzer",
    title: "Crash Dump Analyzer",
    shortDescription: "Linux diagnostic tool parsing ELF binaries, registers & stack traces",
    longDescription:
      "A Linux-based diagnostic tool that captures crash signals, memory faults, CPU registers, and stack traces. Parses ELF binaries and symbol tables for OS-level debugging and post-mortem analysis. Implemented in C using POSIX system calls.",
    tech: ["C", "Linux", "ELF", "Debugging", "POSIX"],
    category: "Systems & Developer Tools",
    githubUrl: "https://github.com/Ketan1317/Crash-Dump-Analyzer",
    mediaPath: "/projects/Crash_Dump_Analyzer.mp4",
    mediaType: "video",
    featured: true,
    featuredIndex: 3,
  },
  {
    id: "deployforge",
    title: "DeployForge",
    shortDescription: "Cloud-native deployment platform with Docker, AWS ECS & GitHub API",
    longDescription:
      "A cloud-native deployment platform that automates repository builds, Docker image synthesis, AWS ECS container deployments, and live log streaming. Supports multi-stage build pipelines and webhook integrations.",
    tech: ["TypeScript", "Docker", "AWS ECS", "GitHub API", "EC2", "Nginx"],
    category: "Systems & Developer Tools",
    githubUrl: "https://github.com/Ketan1317/DeployForge-DeploymentService",
    mediaPath: "/projects/Deployforge.mp4",
    mediaType: "video",
    featured: true,
    featuredIndex: 4,
  },
  {
    id: "lap44",
    title: "lap44",
    shortDescription: "Web3 racing game with wallet auth, smart contracts & 3D experiences",
    longDescription:
      "A Web3 racing platform built with Next.js and React Three Fiber. Features wallet authentication, smart-contract integration, stake-based gameplay, and real-time 3D racing physics on the Ethereum network.",
    tech: ["Next.js", "React Three Fiber", "Ethereum", "Smart Contracts", "TypeScript"],
    category: "Web3",
    githubUrl: "https://github.com/Ketan1317/lap44-Web3_Racing_Game",
    mediaPath: "/projects/lap44.mp4",
    mediaType: "video",
    featured: true,
    featuredIndex: 5,
  },
  {
    id: "pindrop",
    title: "PinDrop",
    shortDescription: "Link management platform with rich metadata previews & hashtag organization",
    longDescription:
      "A link management platform built with Next.js, TypeScript, and NextAuth. Automatically extracts OpenGraph metadata, generates rich link previews, organizes links with custom tags, and supports secure authentication.",
    tech: ["Next.js", "TypeScript", "NextAuth", "Metadata Extraction"],
    category: "Next.js / Full-Stack",
    githubUrl: "https://github.com/Ketan1317/PinDrop",
    mediaPath: "/projects/Pindrop.mp4",
    mediaType: "video",
    featured: true,
    featuredIndex: 6,
  },

  // ── ARCHIVE PROJECTS ─────────────────────────────────────
  {
    id: "cexec",
    title: "CExec",
    shortDescription: "Multithreaded remote C code execution server with process isolation",
    longDescription:
      "A multithreaded Linux code execution server built in C with process sandboxing, resource limits (rlimit), and filesystem isolation. Exposes remote execution over TCP sockets with POSIX thread workers.",
    tech: ["C", "Linux", "TCP Sockets", "POSIX Threads", "Resource Limits"],
    category: "Systems & Developer Tools",
    githubUrl: "https://github.com/Ketan1317/CExec-Remote-C-Code-Execution",
    featured: false,
  },
  {
    id: "sol-faucet",
    title: "SOL Devnet Faucet",
    shortDescription: "Solana wallet adapter for requesting test SOL airdrops on Devnet",
    longDescription:
      "A Solana wallet adapter application for requesting and managing test SOL airdrops on Devnet. Built with Next.js and Solana Web3 SDK.",
    tech: ["Next.js", "Solana", "Web3.js", "Tailwind CSS"],
    category: "Web3",
    githubUrl: "https://github.com/Ketan1317/SOL-Devnet-Faucet",
    mediaPath: "/projects/Sol_Faucet_Airdrop.mp4",
    mediaType: "video",
    featured: false,
  },
  {
    id: "yt-content",
    title: "YT Content Generator",
    shortDescription: "AI platform generating YouTube scripts, SEO titles & content strategies",
    longDescription:
      "An AI-powered content creation platform for creators. Generates video concepts, production scripts, SEO-optimized titles, descriptions, and tags using generative models.",
    tech: ["TypeScript", "Next.js", "AI", "Tailwind CSS"],
    category: "Next.js / Full-Stack",
    githubUrl: "https://github.com/Ketan1317/YT-Content-Generator",
    mediaPath: "/projects/YT_Content_Generator.mp4",
    mediaType: "video",
    featured: false,
  },
  {
    id: "matchnest",
    title: "MatchNest",
    shortDescription: "Full-stack matchmaking with real-time chat & WebRTC video calling",
    longDescription:
      "A full-stack matchmaking platform featuring algorithmic profile matching, low-latency text chat with Socket.IO, peer-to-peer WebRTC video calling, and responsive UI.",
    tech: ["JavaScript", "WebRTC", "Socket.IO", "Node.js", "Express"],
    category: "MERN",
    githubUrl: "https://github.com/Ketan1317/MatchNest",
    mediaPath: "/projects/MatchNest.mp4",
    mediaType: "video",
    featured: false,
  },
  {
    id: "staynest",
    title: "StayNest",
    shortDescription: "Property booking platform with listings, search & image uploads",
    longDescription:
      "A full-featured property rental platform with authenticated booking flows, search filters, reservation management, and secure media uploads.",
    tech: ["TypeScript", "Next.js", "Tailwind CSS", "REST API"],
    category: "Next.js / Full-Stack",
    githubUrl: "https://github.com/Ketan1317/Staynest-Rental-Service-Application",
    mediaPath: "/projects/StayNest.png",
    mediaType: "image",
    featured: false,
  },
  {
    id: "quickchat",
    title: "QuickChat",
    shortDescription: "Real-time chat application with instant messaging & rooms",
    longDescription:
      "A responsive real-time chat application supporting instant messaging, private channels, active status tracking, and lightweight state synchronization.",
    tech: ["JavaScript", "Node.js", "Socket.IO", "React"],
    category: "MERN",
    githubUrl: "https://github.com/Ketan1317/QuickChat",
    mediaPath: "/projects/quickchat.png",
    mediaType: "image",
    featured: false,
  },
  {
    id: "typecheck",
    title: "TypeCheck",
    shortDescription: "Interactive typing speed & accuracy diagnostics application",
    longDescription:
      "A responsive typing benchmark application evaluating real-time WPM, character accuracy, keystroke latencies, and interactive feedback.",
    tech: ["TypeScript", "React", "Tailwind CSS"],
    category: "Systems & Developer Tools",
    githubUrl: "https://github.com/Ketan1317/TypeCheck",
    mediaPath: "/projects/Typeflow.mp4",
    mediaType: "video",
    featured: false,
  },
  {
    id: "forever",
    title: "Forever",
    shortDescription: "Modern e-commerce platform with catalog & shopping cart",
    longDescription:
      "A clean e-commerce web application featuring product browsing, category filtering, cart management, and seamless order checkout interface.",
    tech: ["JavaScript", "React", "Node.js", "Express"],
    category: "MERN",
    githubUrl: "https://github.com/Ketan1317/Forever",
    mediaPath: "/projects/Forvever.jpg",
    mediaType: "image",
    featured: false,
  },
  {
    id: "quote-loom",
    title: "Quote Loom",
    shortDescription: "Social publishing & quote curation platform",
    longDescription:
      "A community platform for composing, discovering, and sharing literary quotes with rich formatting and category tagging.",
    tech: ["JavaScript", "React", "Node.js", "MongoDB"],
    category: "MERN",
    githubUrl: "https://github.com/Ketan1317/Quote-Loom",
    mediaPath: "/projects/Quote-Loom.mp4",
    mediaType: "video",
    featured: false,
  },
  {
    id: "java-http",
    title: "Java HTTP Server",
    shortDescription: "Lightweight HTTP server from scratch with raw socket programming",
    longDescription:
      "A lightweight HTTP/1.1 server built entirely from scratch in Java using raw TCP sockets. Handles HTTP request parsing, routing, mime-type resolution, status responses, and connection pools.",
    tech: ["Java", "Networking", "TCP Sockets", "HTTP Protocol"],
    category: "Java / Spring Boot",
    githubUrl: "https://github.com/Ketan1317/Java-HTTP-Server",
    featured: false,
  },
  {
    id: "hangman",
    title: "Hang The Man",
    shortDescription: "Console-based Hangman game featuring dictionary file parsing",
    longDescription:
      "A console-based Hangman game featuring robust file handling, dynamic word selection, input validation, and interactive ASCII state rendering.",
    tech: ["Java", "File I/O", "CLI"],
    category: "Java / Spring Boot",
    githubUrl: "https://github.com/Ketan1317/Hang-The-Man",
    mediaPath: "/projects/HangTheMan.mp4",
    mediaType: "video",
    featured: false,
  },
  {
    id: "battleship",
    title: "BattleShip Game",
    shortDescription: "Tactical Battleship game with randomized fleet placement",
    longDescription:
      "A grid-based tactical Battleship game implemented in Java featuring randomized 2D coordinate placement, hit tracking, and turn-based AI targeting.",
    tech: ["Java", "Data Structures", "Algorithms"],
    category: "Java / Spring Boot",
    githubUrl: "https://github.com/Ketan1317/BattleShip-Game",
    mediaPath: "/projects/BattleShipGame.mp4",
    mediaType: "video",
    featured: false,
  },
  {
    id: "nexusforge",
    title: "NexusForge",
    shortDescription: "Modular frontend UI component & design system showcase",
    longDescription:
      "A modern web interface showcase exploring component modularity, typography hierarchy, and semantic layout patterns.",
    tech: ["HTML5", "CSS3", "JavaScript"],
    category: "Next.js / Full-Stack",
    githubUrl: "https://github.com/Ketan1317/NexusForge",
    mediaPath: "/projects/NexusForge.mp4",
    mediaType: "video",
    featured: false,
  },
];

export const FEATURED_PROJECTS = PROJECTS.filter((p) => p.featured).sort(
  (a, b) => (a.featuredIndex ?? 0) - (b.featuredIndex ?? 0),
);

/**
 * Valid categories computed dynamically from actual projects
 * (ensuring no empty categories are displayed).
 */
export const PROJECT_CATEGORIES: ProjectCategory[] = Array.from(
  new Set(PROJECTS.map((p) => p.category)),
) as ProjectCategory[];

export const SKILLS = {
  Languages: [
    "Java",
    "C++",
    "C",
    "TypeScript",
    "JavaScript",
    "Python",
    "SQL",
    "Solidity",
  ],
  "Frontend & Mobile": [
    "React.js",
    "Next.js",
    "React Native",
    "Tailwind CSS",
    "TypeScript",
    "HTML5 / CSS3",
  ],
  "Backend & Systems": [
    "Node.js",
    "Express.js",
    "Spring Boot",
    "REST APIs",
    "System Design",
    "Microservices",
  ],
  "Distributed Systems & Queues": [
    "Apache Kafka",
    "Redis",
    "BullMQ",
    "Nginx",
    "WebSockets",
    "Socket.io",
    "WebRTC",
  ],
  "Databases & DevOps": [
    "PostgreSQL",
    "MongoDB",
    "Prisma",
    "Docker",
    "Prometheus",
    "Grafana",
    "Loki",
    "Git",
  ],
  "Web3 & Machine Learning": [
    "Solidity",
    "Ethereum",
    "Web3.js",
    "Machine Learning",
    "Python",
    "IPFS (Pinata)",
  ],
};

export const TECHNICAL_INTERESTS = [
  "Full-Stack Development",
  "Backend Engineering",
  "Databases & Internal Engines",
  "System Design",
  "Data Structures & Algorithms",
  "Software Mechanics & Runtime Internals",
];

export const PERSONAL_INTERESTS = [
  {
    title: "Formula 1",
    category: "Motorsport",
    description:
      "Race weekends, fierce rivalries, team strategies, and the thrill of watching every lap unfold.",
    tags: ["F1", "Race Weekends"],
  },
  {
    title: "Marvel",
    category: "Movies & Entertainment",
    description:
      "From iconic superheroes to epic storylines, I love exploring the Marvel Universe and its unforgettable characters.",
    tags: ["MCU", "Superheroes"],
  },
];

export const EDUCATION = [
  {
    degree: "B.E. in Computer Science",
    institution: "Chitkara University (CUIET)",
    location: "Punjab, India",
    result: "9.8 CGPA",
    period: "2024 – Present",
    current: true,
  },
  {
    degree: "Class XII — PCM",
    institution: "Kendriya Vidyalaya",
    location: "Sangrur, Punjab",
    result: "94.4%",
    period: "2024",
    current: false,
  },
  {
    degree: "Class X",
    institution: "Kendriya Vidyalaya",
    location: "Sangrur, Punjab",
    result: "96%",
    period: "2022",
    current: false,
  },
];

export const EXPERIENCE = [
  {
    role: "Technical Member — Web Team",
    org: "Open Source Chandigarh",
    period: "2024 – Present",
    description:
      "Contributing to the open-source community web platform using Next.js and TypeScript. Focusing on frontend performance, responsive UI architecture, and supporting tech workshops.",
  },
];

export const ACHIEVEMENTS = [
  {
    title: "600+ DSA Problems Solved",
    description:
      "Consistent problem-solving covering graphs, dynamic programming, tries, and core algorithm patterns across competitive platforms.",
    icon: "code",
  },
  {
    title: "Open Source Chandigarh Web Team",
    description:
      "Technical member contributing to web platforms, performance optimization, and developer community events.",
    icon: "git",
  },
  {
    title: "Hacktoberfest Contributor",
    description:
      "Recognized open-source contributor with accepted and merged pull requests across community software repositories.",
    icon: "award",
  },
];

export const CERTIFICATES = [
  {
    title: "Code2Chill DSA Battle",
    path: "/certificates/Code2Chill DSA Battle.pdf",
    type: "pdf" as const,
  },
  {
    title: "Hackmol 6.0 — NIT Hackathon",
    path: "/certificates/Hackmol 6.0 NIT hackathon.pdf",
    type: "pdf" as const,
  },
  {
    title: "Sandbox Hackathon",
    path: "/certificates/Sandbox hackathon.pdf",
    type: "pdf" as const,
  },
  {
    title: "CodeDunia Hackathon",
    path: "/certificates/CodeDunia Hackathon.pdf",
    type: "pdf" as const,
  },
  {
    title: "Aperture 3.0",
    path: "/certificates/Aperture 3.0.pdf",
    type: "pdf" as const,
  },
  {
    title: "CompuVision Workshop",
    path: "/certificates/CompuVision Workshop.pdf",
    type: "pdf" as const,
  },
  {
    title: "Linux Unlocked Workshop",
    path: "/certificates/Linux Unlocked Workshop.png",
    type: "image" as const,
  },
  {
    title: "Tech Abhivyakti Hackathon",
    path: "/certificates/Tech Abhivyakti Hackathon.png",
    type: "image" as const,
  },
];

export const BADGES = [
  {
    title: "Hacktoberfest Contributor",
    program: "Hacktoberfest",
    path: "/Hacktoberfest.png",
    badgeId: "cmhkk2qd6008rl704xsvqgrjl",
    description: "Official Open Source Contributor Badge",
    verified: true,
  },
  {
    title: "Winter of Code 5.0",
    program: "WoC 5.0",
    path: "/WoC 5.0 - Contributor Badge.png",
    description: "Open Source Contributor & Mentorship Program",
    verified: true,
  },
];
