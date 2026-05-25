# ProductBuildersHQ Website

Static website for ProductBuildersHQ, hosting frameworks and case studies for the evolution of product development in the age of AI.

## Tech Stack

- React 19 + TypeScript
- Vite 6
- Tailwind CSS v4
- React Router 7
- GitHub Pages (static hosting)

## Project Structure

```
productbuildershq.github.io/
├── apps/
│   └── web/               # Main website application
│       ├── src/
│       │   ├── components/  # Shared components (Layout, Navbar, Footer)
│       │   ├── data/        # JSON data for frameworks and case studies
│       │   ├── lib/         # Types and utilities
│       │   └── pages/       # Page components
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

Edit `apps/web/src/data/frameworks.json`:

```json
{
  "slug": "your-framework-slug",
  "title": "Framework Title",
  "subtitle": "Short description",
  "description": "Longer description for the detail page.",
  "version": "1.0",
  "lastUpdated": "2026-01",
  "pdfUrl": "/papers/your-framework.pdf",
  "tags": ["tag1", "tag2"],
  "comingSoon": false
}
```

### Adding a Case Study

Edit `apps/web/src/data/case-studies.json`:

```json
{
  "slug": "your-case-study-slug",
  "title": "Case Study Title",
  "subtitle": "Short description",
  "description": "Longer description.",
  "company": "Company Name",
  "level": 3,
  "date": "2026-01",
  "pdfUrl": "/papers/your-case-study.pdf",
  "tags": ["tag1", "tag2"],
  "comingSoon": false
}
```

### Adding PDF Papers

Place PDF files in `docs/papers/` directory. They will be served at `/papers/filename.pdf`.

## Deployment

The site is automatically deployed to GitHub Pages when changes are pushed to the main branch. The `docs/` directory is served as the root of the site.

### Manual Deployment

1. Build the site: `npm run build`
2. Commit the `docs/` directory
3. Push to the main branch

## SPA Routing on GitHub Pages

The site uses a redirect script in `apps/web/public/404.html` to handle client-side routing on GitHub Pages. This allows direct linking to routes like `/frameworks/product-builder-maturity-model`.

## License

Copyright ProductBuildersHQ. All rights reserved.
