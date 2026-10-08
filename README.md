# Iden Coffee & Bakery: demo site

One-page menu and ordering site for Iden Coffee & Bakery (Хархорин хороолол, Улаанбаатар).
Customers browse the menu, build a basket, and send the order to the shop's Viber already written out.

Next.js 16 (App Router, Cache Components), TypeScript, Tailwind CSS 4. No backend: the whole page is prerendered.

## Where to edit

| What | File |
| --- | --- |
| All UI copy (Mongolian) and the Viber order message template | `src/content/site.ts` |
| Menu items, prices, categories, tags, "Онцлох" order | `src/data/menu.ts` |
| Hours, phones, Viber number, address, map link, Instagram | `src/data/business.ts` |
| Colours, fonts, motion | `src/app/globals.css`, `src/app/layout.tsx` |
| Photos | `public/menu/*.jpg`, hero inset `public/hero/` |

Prices are numbers in tögrög: `price: 6500` renders as `6,500₮`. `null` shows "Үнэ лавлах".
An item with `image: null` gets the green logo placeholder.

## Placeholders to confirm with the owner

Search the code for `TODO:`.

- **Prices:** none are on Instagram, so every price is `null`.
- **Opening hours:** the example hours from the brief (Да–Ба 08:00–20:00, Бя–Ня 09:00–18:00). The "Одоо нээлттэй" badge uses them.
- **Coffee drinks:** Американо, Латте and Капучино are stand-ins. Replace them with the real coffee menu.
- **Matcha cookie:** no photo yet.
- **"Хамгийн их зарагддаг" tags:** inferred from Instagram likes (tiramisu, carrot cake).
- **Delivery:** not confirmed. Set `deliveryOffered: false` to hide the option.
- **Map link:** a text search. Ask for the exact Google Maps pin.
- **Photos:** Instagram's 640px exports with text baked in. Original high-res photos will look much sharper.
- **Logo:** 150×150 is the only size available. A vector or large PNG would help the favicon and share image.

## Develop

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # must pass with zero type errors
npm run lint
```

## Deploy to Vercel

1. Push this folder to a GitHub repo.
2. On vercel.com: **Add New → Project**, import the repo, keep the defaults (framework: Next.js), **Deploy**.
3. Optional: when you add a custom domain, set `NEXT_PUBLIC_SITE_URL=https://your-domain` in the project's environment variables so share links and structured data use it. Without it, the Vercel production URL is used automatically.

Or from the terminal: `npx vercel` (preview), then `npx vercel --prod`.

The share preview image (`/opengraph-image`) is generated at build time from the logo, two photos and the fonts in `src/assets/og/`.

## Performance notes

- Measure Lighthouse on the deployed URL (pagespeed.web.dev). `next start` locally serves HTTP/1.1 with gzip, which scores several points lower than Vercel's HTTP/2 + Brotli.
- The hero photo is the LCP element and is preloaded. Keep it small.
- Hero visuals avoid `box-shadow` and SVG filters, which are slow to rasterize on phones without GPU raster. The paper grain is a 7 KB PNG tile.
- Sections below the hero use `content-visibility: auto` (`defer-render` in `globals.css`), so their layout and images wait until they're near the screen.
