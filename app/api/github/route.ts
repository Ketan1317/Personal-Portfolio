import { NextResponse } from "next/server";

const GITHUB_USERNAME = "Ketan1317";
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

type CacheEntry = { data: unknown; ts: number };
const cache = new Map<string, CacheEntry>();

async function fetchGitHub(path: string) {
  const cached = cache.get(path);
  if (cached && Date.now() - cached.ts < CACHE_TTL_MS) {
    return cached.data;
  }

  const headers: HeadersInit = {
    Accept: "application/vnd.github.v3+json",
    "User-Agent": "ketan-portfolio",
  };

  if (process.env.GITHUB_TOKEN) {
    headers["Authorization"] = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  const res = await fetch(`https://api.github.com${path}`, {
    headers,
    next: { revalidate: 300 },
  });

  if (!res.ok) {
    throw new Error(`GitHub API error ${res.status}`);
  }

  const data = await res.json();
  cache.set(path, { data, ts: Date.now() });
  return data;
}

export async function GET() {
  try {
    const [user, repos, contribsData] = await Promise.all([
      fetchGitHub(`/users/${GITHUB_USERNAME}`),
      fetchGitHub(`/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`),
      fetch(
        `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`,
        {
          next: { revalidate: 3600 },
        },
      )
        .then((r) => (r.ok ? r.json() : null))
        .catch(() => null),
    ]);

    const repoList = (repos as Array<Record<string, unknown>>).map((r) => ({
      name: r.name,
      description: r.description,
      language: r.language,
      stargazers_count: r.stargazers_count,
      forks_count: r.forks_count,
      html_url: r.html_url,
      updated_at: r.updated_at,
      topics: r.topics,
    }));

    return NextResponse.json({
      ok: true,
      user: {
        login: (user as Record<string, unknown>).login,
        name: (user as Record<string, unknown>).name,
        public_repos: (user as Record<string, unknown>).public_repos,
        followers: (user as Record<string, unknown>).followers,
        following: (user as Record<string, unknown>).following,
        avatar_url: (user as Record<string, unknown>).avatar_url,
        bio: (user as Record<string, unknown>).bio,
        html_url: (user as Record<string, unknown>).html_url,
      },
      repos: repoList,
      contributions: contribsData?.contributions ?? [],
      totalContributions:
        contribsData?.total?.lastYear ??
        contribsData?.total?.[Object.keys(contribsData?.total ?? {})[0]] ??
        346,
    });
  } catch (err) {
    console.error("GitHub API error:", err);
    return NextResponse.json(
      {
        ok: false,
        error: "Failed to fetch GitHub data",
        fallback: {
          html_url: `https://github.com/${GITHUB_USERNAME}`,
          login: GITHUB_USERNAME,
        },
      },
      { status: 502 },
    );
  }
}
