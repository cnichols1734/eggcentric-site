import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { TAGLINE } from "@/lib/content";

export const alt = "Eggcentric - Auto-blast the alien horde";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const pub = (...p: string[]) => path.join(process.cwd(), "public", ...p);

export default async function OpenGraphImage() {
  const [bg, logo, egg, font] = await Promise.all([
    readFile(pub("r", "shots", "swarm.jpg")),
    readFile(pub("r", "art", "ui", "eggcentric-logo.png")),
    readFile(pub("r", "art", "eggs", "ninja.png")),
    readFile(pub("fonts", "LuckiestGuy-Regular.ttf")),
  ]);
  const toUrl = (buf: Buffer, mime: string) => `data:${mime};base64,${buf.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: "#2b2431",
          fontFamily: "Luckiest Guy",
        }}
      >
        { }
        <img
          src={toUrl(bg, "image/jpeg")}
          alt=""
          width={1200}
          height={753}
          style={{ position: "absolute", top: -60, left: 0, width: 1200, height: 753, objectFit: "cover", opacity: 0.55 }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 1200,
            height: 630,
            background: "linear-gradient(180deg, rgba(43,36,49,0.15) 0%, rgba(43,36,49,0.75) 70%, rgba(43,36,49,0.95) 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 1200,
            height: 630,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            paddingTop: 40,
          }}
        >
          { }
          <img src={toUrl(logo, "image/png")} alt="" width={820} height={193} />
          <div
            style={{
              marginTop: 22,
              color: "#f7cf65",
              fontSize: 54,
              letterSpacing: 2,
              textTransform: "uppercase",
              textShadow: "0 4px 0 #191c18, -2px -2px 0 #191c18, 2px -2px 0 #191c18, -2px 2px 0 #191c18, 2px 2px 0 #191c18",
            }}
          >
            {TAGLINE}
          </div>
          <div
            style={{
              marginTop: 28,
              display: "flex",
              gap: 14,
              background: "#35352f",
              border: "5px solid #191c18",
              borderRadius: 16,
              padding: "12px 28px",
              color: "#fff8e8",
              fontSize: 30,
              letterSpacing: 1,
              boxShadow: "0 8px 0 #191c18",
            }}
          >
            FREE · WINDOWS · MAC · LINUX · STEAM DECK
          </div>
        </div>
        { }
        <img
          src={toUrl(egg, "image/png")}
          alt=""
          width={190}
          height={242}
          style={{ position: "absolute", right: 60, bottom: -30, transform: "rotate(8deg)" }}
        />
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Luckiest Guy", data: font, style: "normal", weight: 400 }],
    },
  );
}
