import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/config/site";

export const alt = `${site.name}. ${site.tagline}.`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Big Shoulders ExtraBold, SIL Open Font License. See assets/fonts/README.md.
const displayFont = await readFile(
  join(process.cwd(), "assets/fonts/BigShoulders-ExtraBold.ttf"),
);

const FOAM = "#f6f0e4";
const INK = "#050816";

/** Share card: the hero's sunrise, simplified to shapes the renderer supports. */
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative",
          padding: "56px 64px 96px",
          fontFamily: "Big Shoulders",
          color: FOAM,
          backgroundImage:
            "linear-gradient(180deg, #050816 0%, #0c1233 45%, #2a1a5e 72%, #b8407a 89%, #ff8a3c 97%, #ffd27a 100%)",
        }}
      >
        {/* Sun, cut off by the bottom edge like a sun on the horizon. */}
        <div
          style={{
            position: "absolute",
            right: 70,
            bottom: -150,
            width: 300,
            height: 300,
            borderRadius: 300,
            display: "flex",
            backgroundImage:
              "radial-gradient(circle, #fff6dc 0%, #ffe09a 40%, #ffb24d 75%, #ff8a3c 100%)",
            boxShadow: "0 0 120px 50px rgba(255, 190, 110, 0.55)",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", fontSize: 44 }}>
          <div
            style={{
              display: "flex",
              padding: "2px 16px",
              marginRight: 14,
              color: INK,
              transform: "skewX(-10deg)",
              backgroundImage: "linear-gradient(135deg, #ffd27a, #ff5a3c)",
            }}
          >
            {site.plate}
          </div>
          AI CLUB
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 84, lineHeight: 0.98 }}>
            WORLD&rsquo;S MOST FAMOUS BEACH.
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 84,
              lineHeight: 0.98,
              color: "#ffd27a",
            }}
          >
            BRAND NEW AI CLUB.
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 22,
              fontSize: 34,
              letterSpacing: 2,
              color: FOAM,
            }}
          >
            {`MONTHLY, IN-PERSON AI MEETUPS IN ${site.city.toUpperCase()}, ${site.region}`}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Big Shoulders", data: displayFont, style: "normal", weight: 800 },
      ],
    },
  );
}
