# ROADMAP

## Frameworks

### Published

- [x] Software Delivery Autonomy Levels (v1.1)
- [x] Product Builder Maturity Model (v1.0)
- [x] DORA and SPACE in the AI Age (v1.1)
- [x] Loop Engineering (v1.0)
- [x] AI-Native Product Manager Metrics (v1.0)

- [x] Spec-Driven Development (v1.0)
  - Progression from vibe coding to structured specifications
  - Tools: GitHub SpecKit, AWS Kiro, AI-DLC, OpenSpec, VisionSpec
  - PRD vs. specifications for AI agents
  - Integration with ASDM framework

- [x] LLM-as-a-Judge (v1.0)
  - Replacing human code review (Level 6 enabler)
  - Categorical scoring, multi-judge aggregation
  - VEAL loop integration for automated fix cycles
  - CI/CD integration patterns and cost-benefit analysis

### Planned

> Note: the RSS feed under Infrastructure > Planned is the highest-value next
> feature for the site overall — prioritize it ahead of the framework topics
> below.

- [ ] MCP and A2A: The Infrastructure of Agentic AI
  - Model Context Protocol ecosystem (10,000+ servers)
  - Agent-to-Agent protocol (Google)
  - Security considerations and best practices
  - Enterprise integration patterns

- [ ] The AI Product Manager in 2026
  - Four working roles: copilot PM, platform PM, ML feature PM, AI ops PM
  - Tools and workflows
  - Skills and career path
  - Building custom agents

- [ ] Digital Twin Universe: Testing Infrastructure for Autonomous Coding
  - Behavioral clones of third-party services
  - Unlimited testing without rate limits
  - Integration with scenario-based validation
  - StrongDM case study deep dive

- [ ] Multi-Agent Team Patterns
  - Coordinator patterns (hierarchical, sequential, parallel)
  - Agent delegation and handoffs
  - REAL/VEAL loop orchestration
  - Enterprise governance

## Case Studies

### Published

- [x] AWS Project Mantle
- [x] StrongDM Software Factory
- [x] Spotify Honk (background agents at scale)
- [x] Cursor/Anysphere (vibe coding at scale)
- [x] GitHub Copilot Workspace (spec-driven workflows)

## Products

Applied tools built by ProductBuildersHQ, given a marketing presence on this
site distinct from their own (less-styled) MkDocs documentation sites.

### Published

- [x] VisionStudio marketing page (`/products/visionstudio`) — links to the
  public [repo](https://github.com/ProductBuildersHQ/visionstudio) and its
  future docs site
- [x] SCALE marketing page (`/products/scale`) — links to the public
  [repo](https://github.com/ProductBuildersHQ/scale) and its future docs site
- [x] Homepage narrative section highlighting Maturity Models, Tools, Specs,
  and Frameworks as the site's four differentiators

### Planned

- [ ] Deploy the VisionSpec MkDocs docs site at `/visionspec/` (already
  linked from `nav-config.json` and `about.astro`, not yet built)
- [ ] Deploy the VisionStudio MkDocs docs site at `/visionstudio/` (linked
  from the new marketing page, not yet built)
- [ ] Deploy the SCALE MkDocs docs site at `/scale/` (linked from the new
  marketing page, not yet built)

## Infrastructure

### Completed

- [x] Astro site with content collections
- [x] GitHub Pages deployment
- [x] Code block syntax highlighting (github-dark)
- [x] Responsive design
- [x] PDF generation pipeline (dss-render — see Remediation and Cross-Site below)

### Planned

- [ ] RSS feed (`@astrojs/rss`) — highest-value next feature for a publishing site
- [ ] Reading-time estimates on article pages
- [ ] Full-text search (e.g. Pagefind over the static output)
- [ ] Dark mode support (CSS variables are already structured for it)
- [ ] Newsletter integration

## Remediation (v0.3.1)

Findings from the 2026-08 site review. See `PLAN.md` for detail.

### Fixed

- [x] Build break: `ai-native-pm-metrics.md` missing required `pdfUrl` (schema now optional, buttons render conditionally)
- [x] Dead PDF links: 7 of 11 papers referenced non-existent PDFs — now generated from the built pages via the dss-render pipeline, so all `pdfUrl` links resolve
- [x] PDF pipeline: `scripts/build-pdfs.sh` + `@media print` styles render every framework/case study to `public/papers/<slug>.pdf`
- [x] SEO: canonical URL, `og:url`, and Twitter card tags added to `BaseLayout`; `robots.txt` added pointing at the sitemap
- [x] Mobile nav: restored GitHub link (was desktop-only)
- [x] `papers.astro`: hardcoded `bg-white` replaced with `--color-bg-card` token
- [x] Docs: project `CLAUDE.md` refreshed for the Astro architecture (was describing the retired React/Vite SPA)

### Planned

- [ ] `og:image` social card (needs a 1200×630 branded asset; could be generated via dss-render)
- [ ] `og:type=article` on framework/case-study pages (currently hardcoded `website`)
- [ ] Mobile nav menu should close on navigation (cosmetic; masked today by full page loads)
- [ ] CI build-verification step so a forgotten `npm run build` cannot deploy stale `docs/` (must account for the MkDocs sub-sites that also live under `docs/`)
- [ ] Single-source `nav-config.json` (currently duplicated between `apps/web/src/config/` and `apps/web/public/`; identical today but nothing enforces sync)

## Cross-Site / dss-render

The PDF pipeline uses the shared [dss-render](https://github.com/plexusone/dss-render)
module (headless-Chrome HTML→PDF, with a Pandoc reference engine). These items
span repos beyond this site.

### Planned

- [ ] Publish `plexusone/dss-render` (init repo, push, tag) so the pipeline no longer depends on a local checkout
- [ ] Wire dss-render into `aistandardsio.github.io` (its own `@media print` brand CSS + build-pdfs script)
- [ ] Wire dss-render into `plexusone.github.io` (same)
