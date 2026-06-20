# Fashion Archive

Post-1970 fashion history interactive editorial / archive.

A single-page, long-scroll dossier covering six decades of fashion
trends (1970s–2020s), presented as an archival "intelligence" document
rather than a conventional blog or e-commerce layout.

## Tech Stack

- [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- React 19 + TypeScript
- Tailwind CSS v4 (CSS-first `@theme` tokens)
- [GSAP](https://gsap.com/) + ScrollTrigger (`@gsap/react`) — scroll-driven reveal/parallax
- [Lenis](https://github.com/darkroomengineering/lenis) — smooth scroll
- [Motion](https://motion.dev/) (Framer Motion) — accordion expand/collapse
- Cormorant Garamond + IBM Plex Mono (`next/font/google`)

No backend, no database, no CMS, no authentication. All content lives
in local TypeScript data files and the site is statically generated.

## Local Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

```bash
npm run dev      # start dev server (Turbopack)
npm run build    # production build
npm run start    # serve production build
npm run lint      # eslint
npx tsc --noEmit  # typecheck
```

See [QA.md](./QA.md) for the manual QA checklist — including which
accessibility checks are still outstanding — before shipping.

## Content Structure

All editorial content lives under `src/data/`, typed via
`src/data/types.ts`:

- `eras.ts` — six `Era` entries (1970s–2020s): title, statement,
  visual keywords, color profile, trend tags
- `cases.ts` — `Case` entries (runway moments, campaigns, brand
  moments) linked to eras, each with `sourceNotes`
- `garments.ts` — `Garment` entries (cultural objects, not products):
  statement, cultural function, key-moments timeline, associated brands
- `trends.ts` — `Trend` entries that cross multiple eras
- `archive.ts` — site-level config: thesis lines, disclaimer, version

Every factual claim carries a `SourceNote` with a `confidence` level:
`verified` | `widely-reported` | `contested`. See
[CREDITS.md](./CREDITS.md) for the full reference list.

## Asset / Copyright Policy

- **No brand or designer imagery is committed to this repository.**
- `ImageRef` entries in the data files are one of: `external-url`
  (publicly available links), `placeholder`, or `abstract-only`
  (no image — conveyed through typography/layout only).
- No `og:image` is configured, by design, rather than using an
  unauthorized image.
- Brand names, designer names, and historical events are referenced
  for educational, analytical, and critical-commentary purposes only.

## Disclaimer

This project is an independent educational and editorial portfolio
project. It is not affiliated with, endorsed by, or commercially
connected to any of the brands, designers, or organisations
referenced. All factual claims are supported by source notes within
the data files; see [CREDITS.md](./CREDITS.md).

## Current Status

- Full six-era site, chapter navigation, trend system, garment index,
  responsive pass, and a final visual-polish pass are complete
- Manual QA has been partially run against [QA.md](./QA.md): keyboard
  activation and responsive layout were checked in a real browser;
  reduced-motion and screen-reader behavior are implemented per code
  review only and have not been manually verified — see QA.md for the
  exact limitations
- No external brand imagery committed
- Static Next.js site — no database / CMS / auth
- Not yet deployed; this reflects the latest verified local checkpoint
  on `master` — see `git log` for the exact commit
