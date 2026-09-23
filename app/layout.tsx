import type { Metadata, Viewport } from "next";
import "./globals.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://eggcentric-game.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Eggcentric - Auto-blast the alien horde",
  description:
    "Eggcentric is an arena shooter roguelite for Windows, macOS, Linux and Steam Deck. Free to download during alpha, and coming soon to Steam. Pick an egg and play Survival in 2D or 3D, or a 3D Adventure. Online co-op for up to four players.",
  keywords: ["Eggcentric", "arena survivor", "roguelite", "3D", "co-op", "Godot", "Steam", "Steam Deck", "free game", "alpha"],
  authors: [{ name: "Nichmann Games" }],
  openGraph: {
    title: "Eggcentric - Auto-blast the alien horde",
    description:
      "Arena shooter roguelite for Windows, macOS, Linux and Steam Deck. Free during alpha, coming soon to Steam. Survival in 2D or 3D, a 3D Adventure mode, and online co-op.",
    url: SITE_URL,
    siteName: "Eggcentric",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Eggcentric - Auto-blast the alien horde",
    description: "Arena shooter roguelite with 2D and 3D Survival and a 3D Adventure. Free during alpha, coming soon to Steam.",
  },
};

export const viewport: Viewport = {
  themeColor: "#2b2431",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
