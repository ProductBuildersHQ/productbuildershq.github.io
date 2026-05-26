# ProductBuildersHQ Website

Static website for ProductBuildersHQ, hosting frameworks and case studies for the evolution of product development in the age of AI.

## Tech Stack

- Astro + TypeScript
- Tailwind CSS v4
- Astro Content Collections
- GitHub Pages (static hosting)

## Project Structure

```
productbuildershq.github.io/
├── apps/
│   └── web/               # Main website application
│       ├── src/
│       │   ├── content/     # Markdown content for frameworks and case studies
│       │   ├── layouts/     # Shared Astro layouts
│       │   ├── pages/       # Static and dynamic routes
│       │   └── styles/      # Global styles
│       └── public/          # Static assets (favicon, 404.html)
├── docs/                  # Built output for GitHub Pages
└── packages/              # Shared packages (future use)
```

## Development

### Prerequisites

- Node.js 18+
- npm 9+

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

The site will be available at `http://localhost:5173`.

### Build for Production

```bash
npm run build
```

This builds the site to the `docs/` directory for GitHub Pages deployment.

### Preview Production Build

```bash
npm run preview
```

## Adding Content

### Adding a Framework

Add a Markdown file to `apps/web/src/content/frameworks/`:

```md
---
title: "Framework Title"
subtitle: "Short description"
description: "Longer description for the detail page."
version: "v1.0"
date: "May 2026"
pdfUrl: "/papers/your-framework.pdf"
levels: 6
tags: ["tag1", "tag2"]
---

Framework article content goes here.
```

### Adding a Case Study

Add a Markdown file to `apps/web/src/content/case-studies/`:

```md
---
title: "Case Study Title"
subtitle: "Short description"
description: "Longer description."
company: "Company Name"
date: "January 2026"
pdfUrl: "/papers/your-case-study.pdf"
level: 5
tags: ["tag1", "tag2"]
comingSoon: false
---

Case study article content goes here.
```

### Adding PDF Papers

Place PDF files in `apps/web/public/papers/`. They are copied into `docs/papers/` by the build and served at `/papers/filename.pdf`.

## Deployment

The site is automatically deployed to GitHub Pages when changes are pushed to the main branch. The `docs/` directory is served as the root of the site.

### Manual Deployment

1. Build the site: `npm run build`
2. Commit the `docs/` directory
3. Push to the main branch

## Routing on GitHub Pages

Astro generates static HTML for every route, including framework and case study detail pages, so direct links work without client-side routing.

## License

Copyright ProductBuildersHQ. All rights reserved.
