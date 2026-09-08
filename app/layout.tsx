import type { Metadata, Viewport } from "next";
import "./globals.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://eggcentric-game.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Eggcentric - Auto-blast the alien horde",
  description:
    "Eggcentric is a free top-down arena shooter roguelite for Windows, macOS, Linux and Steam Deck. Pick an egg, fight off 20 waves of aliens, and build your loadout in the shop between waves.",
  keywords: ["Eggcentric", "arena survivor", "roguelite", "Godot", "Steam Deck", "free game"],
  authors: [{ name: "Nichmann Games" }],
  openGraph: {
    title: "Eggcentric - Auto-blast the alien horde",
    description:
      "Free top-down arena shooter roguelite for Windows, macOS, Linux and Steam Deck. Pick an egg, fight off 20 waves of aliens, and build your loadout between waves.",
    url: SITE_URL,
    siteName: "Eggcentric",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Eggcentric - Auto-blast the alien horde",
    description: "Free top-down arena shooter roguelite for Windows, macOS, Linux and Steam Deck.",
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
