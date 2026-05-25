# CLAUDE.md

Instructions for AI assistants working on the ProductBuildersHQ website.

## Project Overview

This is a static React/TypeScript website for ProductBuildersHQ, built with Vite and deployed to GitHub Pages. The site hosts frameworks and case studies about product development in the AI era.

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
```

## Architecture

- **Monorepo**: npm workspaces with `apps/` and `packages/` directories
- **Main app**: `apps/web/` contains the website
- **Output**: Builds to `docs/` (not `dist/`) for GitHub Pages
- **Routing**: React Router with hash-based SPA fallback via 404.html

## Key Files

| File | Purpose |
|------|---------|
| `apps/web/src/App.tsx` | Route definitions |
| `apps/web/src/data/frameworks.json` | Framework content data |
| `apps/web/src/data/case-studies.json` | Case study content data |
| `apps/web/src/lib/types.ts` | TypeScript interfaces |
| `apps/web/src/index.css` | Global styles and CSS variables |
| `apps/web/public/404.html` | SPA redirect for GitHub Pages |

## Data Structure

Frameworks and case studies are stored as JSON in `apps/web/src/data/`. Each entry has:

- `slug`: URL-safe identifier
- `title`, `subtitle`, `description`: Content
- `pdfUrl`: Path to downloadable PDF (served from `docs/papers/`)
- `tags`: Categorization
- `comingSoon`: Boolean to show placeholder instead of content

## Styling Conventions

- Tailwind CSS v4 with CSS variables for theming
- Color variables defined in `apps/web/src/index.css`:
  - `--color-primary`: Emerald green (#047857)
  - `--color-bg`: Background color
  - `--color-text`: Primary text color
  - `--color-text-muted`: Secondary text color
- Dark mode ready via CSS variables (not yet implemented)

## Adding New Pages

1. Create component in `apps/web/src/pages/`
2. Add route in `apps/web/src/App.tsx`
3. Update navigation in `apps/web/src/components/Navbar.tsx` if needed

## Adding Content

- Edit JSON files in `apps/web/src/data/`
- Place PDF files in `docs/papers/`
- Rebuild with `npm run build`

## Important Notes

- Always rebuild (`npm run build`) after changes before committing
- The `docs/` directory is committed and deployed to GitHub Pages
- Do not modify files in `docs/` directly; they are generated
- PDF files in `docs/papers/` are manually added, not generated
