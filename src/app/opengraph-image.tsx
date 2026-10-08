import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/content/site";
import { business } from "@/data/business";

export const alt = site.meta.ogAlt;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const toDataUrl = (file: Buffer, mime: string) => `data:${mime};base64,${file.toString("base64")}`;

// Read at module load so the image is prerendered at build time. Paths are literal
// so the bundler only traces these files. Satori needs TTF/OTF, so these are
// static TTFs (with Cyrillic) rather than next/font's woff2.
const [displayFont, displayItalic, bodyFont, bodyBold, logoFile, cakeFile, matchaFile] = await Promise.all([
  readFile(join(process.cwd(), "src/assets/og/CormorantGaramond-SemiBold.ttf")),
  readFile(join(process.cwd(), "src/assets/og/CormorantGaramond-MediumItalic.ttf")),
  readFile(join(process.cwd(), "src/assets/og/Manrope-Medium.ttf")),
  readFile(join(process.cwd(), "src/assets/og/Manrope-Bold.ttf")),
  readFile(join(process.cwd(), "public/logo.png")),
  readFile(join(process.cwd(), "public/menu/tres-leches.jpg")),
  readFile(join(process.cwd(), "public/hero/matcha-tiramisu-crop.jpg")),
]);
const logo = toDataUrl(logoFile, "image/png");
const cake = toDataUrl(cakeFile, "image/jpeg");
const matcha = toDataUrl(matchaFile, "image/jpeg");

const FOREST = "#316743";
const CREAM = "#f6f0e4";
const MATCHA = "#a8c49a";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", background: FOREST, position: "relative" }}>
        {/* Satori draws radial gradients with hard edges, so the glow is a plain soft circle. */}
        <div
          style={{
            position: "absolute",
            top: -120,
            right: -140,
            width: 680,
            height: 680,
            borderRadius: 680,
            background: "rgba(168,196,154,0.16)",
          }}
        />

        {/* Text column */}
        <div style={{ display: "flex", flexDirection: "column", padding: "56px 0 52px 72px", width: 700 }}>
          {/* The logo's own background is this exact green, so it sits seamlessly. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logo} width={128} height={128} alt="" style={{ marginLeft: -12 }} />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: 18,
              fontFamily: "Cormorant",
              fontWeight: 600,
              fontSize: 92,
              lineHeight: 0.92,
              color: CREAM,
            }}
          >
            <span>Iden Coffee</span>
            <span>&amp; Bakery</span>
          </div>
          <div style={{ marginTop: 16, fontFamily: "Cormorant", fontStyle: "italic", fontWeight: 500, fontSize: 46, color: MATCHA }}>
            {site.brand.tagline}
          </div>
          <div style={{ display: "flex", flexDirection: "column", marginTop: "auto" }}>
            <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 30, color: CREAM }}>{site.meta.ogLine}</div>
            <div style={{ marginTop: 8, fontFamily: "Manrope", fontWeight: 500, fontSize: 24, color: "rgba(246,240,228,0.85)" }}>
              {`${site.meta.ogSubline} · ${business.phones[0].display}`}
            </div>
          </div>
        </div>

        {/* Photo column: arch + inset, echoing the hero */}
        <div style={{ display: "flex", position: "absolute", right: 64, top: 56, width: 400, height: 518 }}>
          <div
            style={{
              display: "flex",
              position: "absolute",
              right: 0,
              top: 0,
              width: 330,
              height: 518,
              borderRadius: "165px 165px 28px 28px",
              border: `8px solid ${CREAM}`,
              overflow: "hidden",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={cake} alt="" width={314} height={502} style={{ objectFit: "cover", objectPosition: "50% 60%" }} />
          </div>
          <div
            style={{
              display: "flex",
              position: "absolute",
              left: 0,
              bottom: 24,
              width: 190,
              height: 190,
              borderRadius: 30,
              border: `7px solid ${CREAM}`,
              overflow: "hidden",
              transform: "rotate(-4deg)",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={matcha} alt="" width={176} height={176} style={{ objectFit: "cover" }} />
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Cormorant", data: displayFont, style: "normal", weight: 600 },
        { name: "Cormorant", data: displayItalic, style: "italic", weight: 500 },
        { name: "Manrope", data: bodyFont, style: "normal", weight: 500 },
        { name: "Manrope", data: bodyBold, style: "normal", weight: 700 },
      ],
    },
  );
}
