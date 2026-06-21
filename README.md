# Fashion Archive

Post-1970 fashion history interactive editorial / archive — currently
shipping as **Material Archive / Garment Lab (v2)**: a desktop-first,
desktop-only high-interaction material-lab presentation of the same
underlying archive data.

- Repo: <https://github.com/zhuang060329-bit/fashion-archive>
- Production: <https://fashion-archive-chi.vercel.app> (v2, deployed
  from `main`)
- Staging / comparison route: `/v2-preview` (same content as `/`,
  retained for side-by-side review — see [docs/material-archive-v2.md](./docs/material-archive-v2.md))

The site presents six decades of fashion trends (1970s–2020s) as
archival "specimens" — material boards, era lab sections, a scanner
cursor — rather than a conventional blog or e-commerce layout. An
earlier, more conventional accordion/chapter-nav presentation (v1)
once lived alongside this in the codebase; its unused runtime
components were removed in Phase 6K (see Current Status below). The
underlying content data, source notes, and the shared `SourceMarker`
component are retained and reused by v2.

## Tech Stack

- [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- React 19 + TypeScript
- Tailwind CSS v4 (CSS-first `@theme` tokens)
- [GSAP](https://gsap.com/) + ScrollTrigger (`@gsap/react`) — scroll-driven reveal/parallax, scanner-cursor lock-on
- [Lenis](https://github.com/darkroomengineering/lenis) — smooth scroll
- [Motion](https://motion.dev/) (Framer Motion) — used by the vendored Motion Primitives below
- Motion Primitives `disclosure` / `text-effect` (vendored under `src/components/motion-primitives/`) — v2 text reveal
- `clsx` + `tailwind-merge` (`src/lib/utils.ts` `cn()` helper)
- Cormorant Garamond + IBM Plex Mono (`next/font/google`)

The v2 scanner-cursor / spotlight interaction is a hand-authored
pattern inspired by techniques publicly documented by React Bits — no
React Bits package is installed, and no Animate UI or Aceternity UI
components are used anywhere in this project.

No backend, no database, no CMS, no authentication, no environment
variables required. All content lives in local TypeScript data files
and the site is statically generated. No brand or external imagery is
committed or fetched — v2's textures (grain, halftone, cutting guides)
are generated with CSS and inline SVG.

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

- **Production (`/`) is Material Archive / Garment Lab v2** — deployed
  on Vercel from `main` (auto-deploys on push). Merge commit
  `c71da74`, v2 integration commit `44483f0`.
- v2 is **desktop-first and desktop-only by design**: viewports below
  `1024px` show a dedicated fallback screen (`DesktopOnlyGate`) instead
  of the interactive lab content — this is a deliberate scope decision
  for this experience, not an unfinished responsive pass.
- `/v2-preview` is retained as a staging/comparison route, sharing the
  same `V2Home` component as `/`.
- **The unused v1 runtime components have been removed (Phase 6K):**
  `EntryScreen`, `EraSection`, `TrendSystem`, `GarmentIndex`,
  `CursorFollower`, `ChapterNav`, and the now-redundant
  `RouteScopedChrome` wrapper. They were confirmed to have no runtime
  import before deletion. `SourceMarker` was **kept** — it is imported
  by the v2 `EraLabSection`. The underlying content (`src/data/*`),
  source notes, QA history, and CREDITS are all retained.
- Production mobile fallback was manually verified by the user on a
  real mobile browser (`<1024px` shows the `DesktopOnlyGate` screen,
  not the full v2 experience). This confirms the fallback screen, not
  a full mobile interaction experience — the desktop-only strategy is
  intentional.
- **Screen-reader behavior has not been fully manually verified** —
  implemented per code review only. See [QA.md](./QA.md) for the exact
  limitations; do not treat this as accessibility-fully-verified.
- No external brand imagery committed or fetched.
- Static Next.js site — no database / CMS / auth / environment
  variables.
