export const RELEASES_REPO = "cnichols1734/eggcentric-releases";
export const RELEASES_URL = `https://github.com/${RELEASES_REPO}/releases`;

/** Permanent GitHub redirect to whatever the latest release's asset is. Never goes stale. */
export const latestDownloadUrl = (asset: string) =>
  `https://github.com/${RELEASES_REPO}/releases/latest/download/${asset}`;

export type PlatformId = "windows" | "macos" | "linux";

export interface PlatformInfo {
  id: PlatformId;
  label: string;
  short: string;
  asset: string;
  requirements: string;
  runFile: string;
  steps: string[];
}

export const PLATFORMS: PlatformInfo[] = [
  {
    id: "windows",
    label: "Windows",
    short: "Win",
    asset: "Eggcentric-Windows.zip",
    requirements: "Windows 10 / 11, 64-bit",
    runFile: "Eggcentric.exe",
    steps: [
      "Unzip the download.",
      "Double-click Eggcentric.exe.",
      "If Windows shows a blue \"Windows protected your PC\" box, click More info, then Run anyway. This happens once because the build is not code-signed.",
    ],
  },
  {
    id: "macos",
    label: "macOS",
    short: "Mac",
    asset: "Eggcentric-macOS.zip",
    requirements: "Intel and Apple Silicon",
    runFile: "Eggcentric.app",
    steps: [
      "Unzip the download and move Eggcentric.app to Applications.",
      "Right-click the app and choose Open, then click Open in the prompt. This is only needed the first time.",
      "If macOS says it cannot verify the developer, open System Settings, Privacy & Security, and click Open Anyway.",
    ],
  },
  {
    id: "linux",
    label: "Linux",
    short: "Linux",
    asset: "Eggcentric-Linux.zip",
    requirements: "x86_64, native build",
    runFile: "Eggcentric.x86_64",
    steps: [
      "Unzip the download.",
      "Run ./Eggcentric.x86_64 from the folder.",
      "If it will not launch, mark it executable first: chmod +x Eggcentric.x86_64",
    ],
  },
];

export interface ReleaseAsset {
  name: string;
  size: number;
  downloadCount: number;
  url: string;
}

export interface ReleaseInfo {
  tag: string;
  version: string;
  name: string;
  publishedAt: string;
  body: string;
  htmlUrl: string;
  assets: ReleaseAsset[];
  checksums: Record<string, string>;
  /** True when the GitHub API could not be reached and we fell back to baked-in data. */
  stale: boolean;
}

/**
 * Last-known-good snapshot so the page never renders empty if GitHub rate-limits
 * an anonymous request or is briefly unavailable. Download buttons never depend
 * on this because they use the permanent `latest/download` redirect.
 */
const FALLBACK: ReleaseInfo = {
  tag: "v2.1.3",
  version: "2.1.3",
  name: "Eggcentric v2.1.3",
  publishedAt: "2026-09-07T18:56:23Z",
  htmlUrl: `${RELEASES_URL}/latest`,
  body: "",
  assets: [
    { name: "Eggcentric-Linux.zip", size: 81987846, downloadCount: 0, url: latestDownloadUrl("Eggcentric-Linux.zip") },
    { name: "Eggcentric-macOS.zip", size: 115337290, downloadCount: 0, url: latestDownloadUrl("Eggcentric-macOS.zip") },
    { name: "Eggcentric-Windows.zip", size: 91559601, downloadCount: 0, url: latestDownloadUrl("Eggcentric-Windows.zip") },
  ],
  checksums: {},
  stale: true,
};

export const REVALIDATE_SECONDS = 300;

interface GitHubAsset {
  name: string;
  size: number;
  download_count: number;
  browser_download_url: string;
}

interface GitHubRelease {
  tag_name: string;
  name: string | null;
  published_at: string;
  body: string | null;
  html_url: string;
  assets: GitHubAsset[];
}

function githubHeaders(): HeadersInit {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "eggcentric-site",
  };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  return headers;
}

function parseChecksums(text: string): Record<string, string> {
  const out: Record<string, string> = {};
  for (const line of text.split("\n")) {
    const match = line.trim().match(/^([a-f0-9]{64})\s+\*?(.+)$/i);
    if (match) out[match[2]] = match[1].toLowerCase();
  }
  return out;
}

export async function getLatestRelease(): Promise<ReleaseInfo> {
  try {
    const res = await fetch(
      `https://api.github.com/repos/${RELEASES_REPO}/releases/latest`,
      { headers: githubHeaders(), next: { revalidate: REVALIDATE_SECONDS, tags: ["release"] } },
    );
    if (!res.ok) throw new Error(`GitHub API ${res.status}`);
    const data = (await res.json()) as GitHubRelease;

    const assets: ReleaseAsset[] = data.assets
      .filter((a) => a.name.endsWith(".zip"))
      .map((a) => ({
        name: a.name,
        size: a.size,
        downloadCount: a.download_count,
        url: a.browser_download_url,
      }));

    let checksums: Record<string, string> = {};
    const sums = data.assets.find((a) => a.name === "SHA256SUMS");
    if (sums) {
      try {
        const sumRes = await fetch(sums.browser_download_url, {
          next: { revalidate: REVALIDATE_SECONDS, tags: ["release"] },
        });
        if (sumRes.ok) checksums = parseChecksums(await sumRes.text());
      } catch {
        // Checksums are a nice-to-have; the page renders without them.
      }
    }

    return {
      tag: data.tag_name,
      version: data.tag_name.replace(/^v/, ""),
      name: data.name ?? data.tag_name,
      publishedAt: data.published_at,
      body: data.body ?? "",
      htmlUrl: data.html_url,
      assets,
      checksums,
      stale: false,
    };
  } catch (err) {
    console.error("[releases] falling back to baked-in release info:", err);
    return FALLBACK;
  }
}

export function assetFor(release: ReleaseInfo, platform: PlatformInfo): ReleaseAsset | undefined {
  return release.assets.find((a) => a.name === platform.asset);
}

export function formatBytes(bytes: number): string {
  if (!bytes) return "";
  const mb = bytes / (1024 * 1024);
  return mb >= 1000 ? `${(mb / 1024).toFixed(2)} GB` : `${Math.round(mb)} MB`;
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}
