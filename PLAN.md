# ProductBuildersHQ Website - Future Plans

## v0.2.0 - Astro Migration (Recommended)

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

### Benefits for Content Workflow

- Drop a markdown file in `src/content/` to add new article
- Frontmatter defines metadata (title, date, tags, pdfUrl)
- Full-text search indexing possible
- Better lighthouse scores
- Automatic sitemap and RSS generation

### Estimated Effort

- Initial migration: 2-3 hours
- Component porting: 1-2 hours
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

## Current Architecture (v0.1.0)

```
productbuildershq.github.io/
├── apps/web/           # React + Vite + Tailwind
│   ├── src/
│   │   ├── components/ # Layout, Navbar, Footer
│   │   ├── data/       # JSON content (frameworks, case-studies)
│   │   ├── pages/      # Route components
│   │   └── lib/        # Types
│   └── public/
│       └── papers/     # PDF files (source)
├── docs/               # Build output (GitHub Pages)
└── packages/           # Shared packages (future)
```

### Content Pipeline

1. Write markdown in `productbuildershq-content-internal/`
2. Generate PDF with Pandoc + custom backgrounds
3. Copy PDF to `apps/web/public/papers/`
4. Add entry to JSON data file
5. Build and deploy
