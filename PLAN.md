# ProductBuildersHQ Website - Future Plans

## v0.2.0 - Astro Migration (Implemented)

Status: implemented in `apps/web/`. The site now builds with Astro, renders framework and case study Markdown as static HTML, and keeps PDFs available as downloads.

### Why Migrate to Astro?

The current React + Vite setup works but has SEO limitations for a content-focused site. Astro is purpose-built for content sites and would provide:

| Feature | Current (React) | Astro |
|---------|-----------------|-------|
| **SEO** | Client-side render (JS required) | Static HTML at build time |
| **Page Load** | ~250KB JS bundle | Zero JS by default |
| **Markdown** | Requires react-markdown | First-class MDX support |
| **Content** | JSON data files | Content Collections |
| **Performance** | Good | Excellent (no hydration) |

### Migration Path

1. **Create new Astro project** in `apps/web-astro/`
2. **Port components** - Astro supports React components where needed
3. **Move content** to Astro Content Collections:
   ```
   src/content/
   ├── frameworks/
   │   ├── product-builder-maturity-model.md
   │   └── software-delivery-autonomy.md
   └── case-studies/
       ├── aws-project-mantle.md
       └── strongdm-software-factory.md
   ```
4. **Keep PDF generation** - Pandoc workflow remains unchanged
5. **Update build** - Astro outputs to `docs/` for GitHub Pages

### Article Content as HTML (Key Change)

**Current approach**: Embed PDF in iframe
**New approach**: Render markdown as native HTML, offer PDF as download

| Aspect | PDF Embed | HTML Render |
|--------|-----------|-------------|
| SEO | Not indexed | Fully indexed |
| Mobile | Poor UX | Native responsive |
| Loading | Slower (PDF viewer) | Instant |
| Accessibility | Limited | Full a11y |
| Styling | Fixed | Matches site theme |

**Content flow with Astro:**

```
productbuildershq-content-internal/
└── product-builder_maturity-model/
    └── article.md                    # Source of truth

      ↓ Copy to website              ↓ Pandoc

productbuildershq.github.io/
├── src/content/frameworks/
│   └── product-builder-mm.md         # → HTML render
└── public/papers/
    └── product-builder-mm.pdf        # → Download link
```

**Frontmatter schema:**

```yaml
---
title: "Product Builder Maturity Model"
subtitle: "Two Paths to End-to-End Product Ownership"
version: "v1.0"
date: 2026-05-01
pdfUrl: "/papers/product-builder-maturity-model.pdf"
levels: 7
tags: ["maturity-model", "product-management", "engineering"]
---
```

**Article page layout:**

```
┌─────────────────────────────────────┐
│ ← Back to Frameworks                │
├─────────────────────────────────────┤
│ Product Builder Maturity Model      │
│ Two Paths to End-to-End Ownership   │
│                                     │
│ [7 Levels] [v1.0] [May 2026]       │
│                                     │
│ [Download PDF]  [Copy Link]         │
├─────────────────────────────────────┤
│ Table of Contents (sticky sidebar)  │
│ ─────────────────                   │
│ • The Convergence Model             │
│ • Maturity Dimensions               │
│ • Shared Foundation: Levels 0-2     │
│ • ...                               │
├─────────────────────────────────────┤
│                                     │
│ [Full article content rendered      │
│  as styled HTML with proper         │
│  typography, tables, diagrams]      │
│                                     │
└─────────────────────────────────────┘
```

### Benefits for Content Workflow

- Drop a markdown file in `src/content/` to add new article
- Frontmatter defines metadata (title, date, tags, pdfUrl)
- **Article renders as native HTML** - fully searchable, accessible
- **PDF available for download** - print, offline, sharing
- Full-text search indexing possible
- Better lighthouse scores
- Automatic sitemap and RSS generation
- Table of contents auto-generated from headings

### Build Pipeline Options

Markdown source lives in `productbuildershq-content-internal/`. Two approaches:

**Option A: Dual build from content repo** (recommended)

```
productbuildershq-content-internal/
└── product-builder_maturity-model/
    ├── article.md          # Single source of truth
    ├── article.pdf         # Pandoc → PDF (for download)
    └── article.html        # Pandoc → HTML (for website)
```

```bash
# In content-internal: build both outputs
pandoc article.md -o article.pdf --pdf-engine=xelatex  # Branded PDF
pandoc article.md -o article.html --standalone          # Clean HTML

# Copy to website
cp article.pdf  ../website/public/papers/
cp article.html ../website/src/content/   # Or embed directly
```

**Option B: Website builds HTML at deploy time**

```
productbuildershq-content-internal/
└── product-builder_maturity-model/
    ├── article.md          # Source
    └── article.pdf         # Pre-built PDF only

productbuildershq.github.io/
└── astro.config.mjs
    # Reads markdown from content-internal via symlink or submodule
    # Astro/MDX renders HTML at build time
```

```bash
# Symlink content repo
ln -s ../productbuildershq-content-internal content

# Astro config
export default defineConfig({
  content: {
    collections: {
      frameworks: defineCollection({
        source: './content/*/article.md'
      })
    }
  }
});
```

**Recommendation: Option A (dual build)**

- PDF and HTML stay in sync (same build moment)
- Content repo is self-contained
- Website just copies pre-built artifacts
- Easier to preview both outputs before publishing

### Estimated Effort

- Initial migration: 2-3 hours
- Component porting: 1-2 hours
- Content sync setup: 30 minutes
- Testing and polish: 1 hour

---

## v0.3.0 - Enhanced Features

### Potential Additions

- [ ] Dark mode toggle
- [ ] Full-text search across articles
- [ ] RSS feed for new publications
- [ ] Newsletter signup integration
- [ ] Reading time estimates
- [ ] Table of contents for long articles
- [ ] Social sharing metadata (OpenGraph)

---

## Current Architecture (v0.2.0)

```
productbuildershq.github.io/
├── apps/web/           # Astro + Tailwind
│   ├── src/
│   │   ├── content/    # Markdown content collections
│   │   ├── layouts/    # Shared Astro layouts
│   │   ├── pages/      # Static and dynamic routes
│   │   └── styles/     # Global styles
│   └── public/
│       └── papers/     # PDF files (source)
├── docs/               # Build output (GitHub Pages)
└── packages/           # Shared packages (future)
```

### Content Pipeline

1. Write markdown in `productbuildershq-content-internal/`
2. Generate PDF with Pandoc + custom backgrounds
3. Copy markdown to `apps/web/src/content/`
4. Copy PDF to `apps/web/public/papers/`
5. Build and deploy
