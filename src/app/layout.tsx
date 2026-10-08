import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { site } from "@/content/site";
import { business } from "@/data/business";
import { siteUrl } from "@/lib/site-url";
import "./globals.css";

// next/font serves every subset of a family (latin, cyrillic, cyrillic-ext, …) and the
// browser downloads only the ones a page uses; `subsets` picks which ones are *preloaded*.
// Mongolian needs `cyrillic-ext` too: Ө ө Ү ү are not in the basic `cyrillic` subset.

// Display serif: the first section headings below the hero are Cyrillic and render
// right away, so preload those subsets too. Otherwise they are only found after the
// CSS is parsed, adding a round trip before the page settles.
const display = Cormorant_Garamond({
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  weight: "600",
  style: "normal",
  variable: "--font-cormorant",
  display: "swap",
});

// Body sans: Mongolian Cyrillic is above the fold, so preload all three subsets.
const body = Manrope({
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: site.meta.title,
  description: site.meta.description,
  applicationName: business.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "mn_MN",
    url: "/",
    siteName: business.name,
    title: site.meta.ogTitle,
    description: site.meta.description,
  },
  twitter: {
    card: "summary_large_image",
    title: site.meta.ogTitle,
    description: site.meta.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#f6f0e4",
  colorScheme: "light",
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="mn" className={`${display.variable} ${body.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-60 focus:rounded-full focus:bg-forest focus:px-5 focus:py-3 focus:font-bold focus:text-cream"
        >
          {site.a11y.skipToContent}
        </a>
        {children}
      </body>
    </html>
  );
}
