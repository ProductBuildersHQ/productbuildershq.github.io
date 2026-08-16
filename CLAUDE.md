# CLAUDE.md

Instructions for AI assistants working on the ProductBuildersHQ website.

## Project Overview

This is a static **Astro + TypeScript** website for ProductBuildersHQ, built with
Astro's content collections and Tailwind CSS v4, and deployed to GitHub Pages.
The site hosts frameworks and case studies about product development in the AI
era. (It was originally a React/Vite SPA; it was migrated to Astro — do not
reintroduce React Router, `App.tsx`, or JSON data files.)

## Commands

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Build to docs/ for GitHub Pages
npm run build

# Preview production build
npm run preview

# Regenerate the framework/case-study PDFs (see PDF Pipeline below)
./scripts/build-pdfs.sh

# Regenerate the SDD catalog data from visionspec
./scripts/generate-sdd-catalog.sh

# Reproduce a cold CI build locally (clears Astro's warm cache first)
rm -rf node_modules/.astro apps/web/.astro && npm run build

# Lint a case-study claims ledger (see Verified Statistics) — run from the
# internal content repo where the ledgers live
sevaluation lint <slug>--claims.json
```

## Architecture

- **Monorepo**: npm workspaces with `apps/` and `packages/` directories
- **Main app**: `apps/web/` is the Astro site
- **Output**: builds to `docs/` (not `dist/`) — but `docs/` is **not committed**
  (see Deployment below); it is `.gitignore`d and rebuilt in CI on every push.
- **Routing**: Astro file-based routing generates static HTML per route; there
  is no client-side router. `apps/web/public/404.html` is a static fallback.
- **Content**: markdown in `apps/web/src/content/`, typed by Astro content
  collections (`apps/web/src/content.config.ts`)

## Deployment

The site deploys via **GitHub Actions**, not by committing build output:

- `.github/workflows/deploy-pages.yml` runs `npm run build` and publishes
  `docs/` with `actions/deploy-pages`. GitHub Pages **Source must be set to
  "GitHub Actions"** (not "Deploy from a branch") — the branch-deploy mode runs
  a legacy Jekyll build that fails on this repo (no `docs/` in git, no Jekyll).
- `docs/` is **`.gitignore`d and untracked** — do not commit it, and do not
  reference it as a committed artifact. It exists locally only as a build
  product. (Historically it *was* committed; that was changed — every content
  change produced huge noisy diffs.)
- The custom domain is carried by `apps/web/public/CNAME` (→ `docs/CNAME` on
  build). Switching the Pages Source unsets the custom domain in repo Settings;
  re-enter it under Settings → Pages if the apex domain 404s while `*.github.io`
  works.
- **Local builds use a warm Astro cache** (`node_modules/.astro`), so a build
  that passes locally can still fail cold in CI. To reproduce CI, clear the
  cache first: `rm -rf node_modules/.astro apps/web/.astro && npm run build`.

## Images

- **Content-collection images fail cold-cache builds.** A relative markdown
  image inside `src/content/**` (Astro's optimizer) can fail in CI with
  `ENOENT … .astro/_astro/<hash>.png` on a cold cache. Put images referenced
  from content/pages in **`apps/web/public/images/**`** and reference them by
  absolute URL (`/images/...`); `public/` assets are copied verbatim with no
  optimization step, so there is no fragile intermediate to go missing.
- **Convert screenshots to `.webp`** to match existing optimized assets. No
  `cwebp`/ImageMagick is needed — Astro bundles `sharp`:
  `node -e "require('sharp')('in.png').webp({quality:82}).toFile('out.webp')"`.

## Key Files

| File | Purpose |
|------|---------|
| `apps/web/src/content.config.ts` | Content-collection schemas (Zod) for frameworks and case studies |
| `apps/web/src/content/frameworks/*.md` | Framework articles (markdown + frontmatter) |
| `apps/web/src/content/case-studies/*.md` | Case-study articles (markdown + frontmatter) |
| `apps/web/src/pages/` | Routes, incl. dynamic `frameworks/[slug].astro` and `case-studies/[slug].astro` |
| `apps/web/src/layouts/BaseLayout.astro` | Shared page shell (nav, footer, `<head>`) |
| `apps/web/src/config/nav-config.json` | Navigation config with three megamenus (`megaMenus[]`: Frameworks, SDD Workflows, From the Field) plus Products/Resources dropdowns (mirrored to `public/nav-config.json`; consumed by the shared `wt-navbar` web component on this site AND the MkDocs sub-sites) |
| `apps/web/public/js/pbhq-nav.js` | PBHQ-branded initializer for the shared `wt-navbar` nav (from `@grokify/site-nav`); fetches `/nav-config.json` same-origin |
| `apps/web/public/js/site-nav.min.js` | Prebuilt `@grokify/site-nav` bundle (IIFE). **Source lives in `github.com/grokify/web-tools/packages/site-nav`** (Lit + Vite). To change nav behavior (e.g. add a megamenu), edit the source there, run `npm run build`, and copy `dist/site-nav.min.js` here. The config supports multiple megamenus via `megaMenus[]` (legacy single `megaMenu` still works). |
| `apps/web/src/data/sdd-catalog.json` | Generated SDD catalog (spec types, workflows, integrations, pipelines) — never edit by hand; run `./scripts/generate-sdd-catalog.sh` |
| `apps/web/src/pages/sdd/` | SDD catalog pages generated from `sdd-catalog.json` (`index`, `specs/[id]`, `definition/[id]`, `execution/[id]`). Terminology: Definition Workflows produce product & engineering specs; Execution Workflows install agent instructions that drive implementation; "Execution" alone (VisionStudio sense) = monitoring building against specs |
| `apps/web/src/styles/global.css` | Global styles, CSS variables, and `@media print` rules |
| `apps/web/src/pages/404.astro` | 404 page (built to `docs/404.html` for GitHub Pages) |
| `scripts/build-pdfs.sh` | Generates paper PDFs from the built pages via dss-render |

## Content Structure

Frameworks and case studies are markdown files with frontmatter validated by
`content.config.ts`. Frameworks use `title`, `subtitle`, `description`,
`version`, `date`, `levels`, `tags`, and an optional `pdfUrl`. Case studies add
`company`, `level`, optional `industry`, `sources[]`, `metrics`, `summary`, and
`comingSoon`.

Each entry in `metrics[]` has `value`, `label`, `detail`, an optional
`source`/`sourceIndex` (a 1-based index into the top-level `sources[]` array,
rendered as a Wikipedia-style `[n]` footnote), and an optional `confidence`
(`reported` | `estimated` | `verified`). **See Verified Statistics below for
what `verified` requires.**

`pdfUrl` is **optional**: templates render the Download/Open PDF buttons only
when it is set, so a document without a generated PDF still builds.

## Verified Statistics (structured-evaluation)

A published metric may only carry `confidence: "verified"` when it is backed by
a **structured-evaluation claims ledger** — do not hand-label a stat
`verified`. This exists because a real false positive slipped through once (a
Cursor "$3B ARR" figure marked verified from a secondary-synthesis source; a
primary-source check later put it far lower). The ledger is the evidence; the
site publishes only the subset that survives it.

**Where the evidence lives** — ledgers are in the *internal* content repo, one
per case study, alongside a rendered HTML view:

```
~/go/src/github.com/ProductBuildersHQ/productbuildershq-content-internal/
  case-studies/<slug>/<slug>--claims.json   # the ClaimsReport (evidence)
  case-studies/<slug>/<slug>--claims.html   # human-readable render
```

The tooling is [`github.com/plexusone/structured-evaluation`](https://github.com/plexusone/structured-evaluation)
— the `claims` package (`ClaimsReport`, verdicts, `Lint`) and the `sevaluation`
CLI (`go install github.com/plexusone/structured-evaluation/cmd/sevaluation@latest`).

**Workflow to produce/refresh verified stats:**

1. Research each statistic to a **primary source** with a verbatim quote and a
   resolving URL. Aggregator/"stats roundup" pages are auto-rejected; a
   secondary-analysis or self-reported source needs a corroborating source.
2. Encode the findings as a `ClaimsReport` in `<slug>--claims.json`. Each claim
   carries its `verdict` (`verified` / `needs-review` / `rejected` /
   `unverified`), the source URL, the `quotedText`, and a `statistical`
   value/unit whose number must appear in the quote.
3. Gate it: `sevaluation lint <slug>--claims.json` (evidence integrity —
   verified claim must have URL + quote + corroboration + a fresh `asOfDate`)
   and `sevaluation check <slug>--claims.json` (criteria decision). Render for
   review: `sevaluation render <slug>--claims.json --format=html > <slug>--claims.html`.
4. Publish **only** the claims whose `verdict` is `verified` — set
   `confidence: "verified"` on the matching `metrics[]` entry on the public
   site. Everything else stays `reported` (or off the site).

**Principles:**

- The **site publishes only the `verified` subset**; the ledger audits
  *everything*. It is normal and expected for a ledger's report-level
  `decision` to be `fail` — that just means it contains some `needs-review` /
  `rejected` claims (e.g. an unverifiable ARR figure) that are **not** on the
  site. A failing ledger does not imply a bad published stat.
- **AWS Mantle is the standing exception**: its metrics are all `reported`
  (podcast-sourced, under separate review) and its ledger has no verified
  claims. Do not promote them to `verified` without new primary sources.
- When adding or changing a published stat, update the ledger first, re-lint,
  and keep the published `value` consistent with the verified claim's number.

## Positioning

- **Building, not training** (north star). PBHQ's focus is product building;
  frameworks, maturity models, and skills are means, not the end. The end is a
  shipped product with real results (adoption, revenue, growth). This is the
  key differentiator vs. education sites (DeepLearning.AI) and practice/drills
  platforms (productbuilders.space): their *product is the learning*; PBHQ's
  product is what builders build with (VisionStudio/VisionStudio Cloud) and the
  proof they ship (/builds). Copy should read build-first, not publisher/
  educator-first — frameworks "exist to be used, not admired." Tools and
  /builds outrank the article library in the intended hierarchy.

## Editorial Conventions

- **Provenance marking**: every framework article carries `provenance` frontmatter —
  `original` (PBHQ-created IP: Two-Loop Model, PBMM, ASDM, LEVER/REVEL, SCALE,
  PDLC, Loop Engineering, AI-Native PM Metrics, AI-DORA & AI-SPACE, PBHQ Lite,
  VisionSpec/VisionStudio/PRISM; extensions of third-party work stay `original`
  when the contribution is PBHQ's, with an Attribution section crediting the base)
  renders a gold "PBHQ Original" badge; `industry` (analysis of others' work)
  renders "Industry Analysis". SDD-catalog encodings of third-party methodologies
  carry an attribution line (independent interpretation, no affiliation/endorsement);
  the About page holds the canonical original-IP portfolio list; the footer carries
  the site-wide third-party marks notice. New original frameworks: add the badge,
  the About list entry, and an Attribution section in the article when it builds
  on third-party work.

- **Signals name style**: refer to cited people by full name in headings,
  table headers, and frontmatter ("What Andrew Ng Said"), and by surname in
  running prose ("Ng argues…"). Never first-name-only — it presumes
  familiarity and is ambiguous out of context. Apply the same rule to every
  signal regardless of how famous the person is.
- **Signals quotation**: keep direct quotes to a couple of short attributed
  lines; the mapping to our frameworks is the product, not the summary.

## Styling Conventions

- Tailwind CSS v4 with CSS variables for theming
- Color variables defined in `apps/web/src/styles/global.css`:
  - `--color-primary`: Emerald green (#047857)
  - `--color-bg`, `--color-text`, `--color-text-muted`: surface/text
- Print styles live in the `@media print` block of `global.css`; add the
  `no-print` class to any element that should not appear in generated PDFs.
- **Ladder diagrams highlight the destination state**: in the homepage
  maturity diagrams, the ideal end state of each ladder gets a solid
  dark-green card (`--color-primary-dark` background, gold level label,
  white text) — L5 Product Builder in the PBMM ladder and L7 Autonomous
  Operations in the ASDM ladder. The highlight marks the ideal state, not
  the most common one (L7 is where e-commerce and single-founder products
  have always had to operate, even pre-AI). Keep the two ladders'
  treatments consistent if either diagram changes.

## PDF Pipeline

Paper PDFs are **generated from the built HTML**, not hand-made: each PDF is a
faithful print of the live article page, so its look comes from the site's own
`@media print` CSS. `scripts/build-pdfs.sh` builds the site, serves `docs/`,
renders every framework and case study to `apps/web/public/papers/<slug>.pdf`
using [dss-render](https://github.com/plexusone/dss-render) (headless Chrome),
then rebuilds so `docs/papers/` is complete.

To add a paper: write the markdown, give it a `pdfUrl` of
`/papers/<slug>.pdf`, then run `./scripts/build-pdfs.sh`.

## Adding New Pages

1. Create a `.astro` component in `apps/web/src/pages/`
2. Update navigation in `apps/web/src/config/nav-config.json` if needed

## Important Notes

- Rebuild (`npm run build`) after changes to confirm the site compiles before
  committing — but **do not commit `docs/`** (it is `.gitignore`d and built in
  CI; see Deployment). Commit only source under `apps/web/**` and repo config.
- Do not edit files in `docs/` directly; they are generated.
- Source-of-truth paper PDFs live in `apps/web/public/papers/` and are
  generated by `scripts/build-pdfs.sh`, not added by hand; the build copies
  them into `docs/papers/`.
- Release: bump `CHANGELOG.json` (compact single-line leaf objects — the
  existing style, not `json.dump(indent=2)`), regenerate `CHANGELOG.md` via
  `schangelog generate`, then tag only after commits are pushed and CI is green.
