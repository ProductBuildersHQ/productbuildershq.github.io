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

# Regenerate the SDD catalog data from specification-workflow-spec
./scripts/generate-sdd-catalog.sh
```

## Architecture

- **Monorepo**: npm workspaces with `apps/` and `packages/` directories
- **Main app**: `apps/web/` is the Astro site
- **Output**: builds to `docs/` (not `dist/`) for GitHub Pages
- **Routing**: Astro file-based routing generates static HTML per route; there
  is no client-side router. `apps/web/public/404.html` is a static fallback.
- **Content**: markdown in `apps/web/src/content/`, typed by Astro content
  collections (`apps/web/src/content.config.ts`)

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
`company`, `level`, optional `industry`, `metrics`, `summary`, and `comingSoon`.

`pdfUrl` is **optional**: templates render the Download/Open PDF buttons only
when it is set, so a document without a generated PDF still builds.

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

- Always rebuild (`npm run build`) after changes before committing
- The `docs/` directory is committed and deployed to GitHub Pages
- Do not edit files in `docs/` directly; they are generated
- Paper PDFs in `docs/papers/` are generated by `scripts/build-pdfs.sh`, not
  added by hand
