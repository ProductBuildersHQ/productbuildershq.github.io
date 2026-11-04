# TODO

Open items from the 2026-08 working sessions (homepage restructure, Signals,
SDD catalog, shared megamenu nav). Larger themes graduate to `ROADMAP.md`;
this file tracks the concrete follow-ups.

## ProductBuildersHQ app pages

- [ ] **Screenshots for `/products/portfolio`, `/build` and `/agents`.**
  Captured from the production app (about 1440px wide, PNG), with site
  names and other identifying details blurred, and checked for emails,
  tokens and private items. Wanted: the Portfolio overview, one Portfolio
  site's traffic and security, a Build roadmap or board view, an Agents
  mission or activity view, and optionally the Cloudflare connect screen.
  Convert to `.webp` under `apps/web/public/images/products/` and add each
  as a `tour` entry in `apps/web/src/data/app.json`; the pages show the
  "A look inside" section only once a tour has entries. Each image needs a
  reviewed exact-path publication-scan exception before pushing.
- [ ] **Integration readings.** Only Cloudflare shows data in Portfolio.
  When a service's readings ship, move it to `available` in
  `apps/web/src/data/integrations.json` and update its "What you see" line;
  never give dates for planned readings.

## Sub-site deployments & link swaps

- [ ] Deploy the `lever` repo MkDocs site to GitHub Pages so it serves at
  `/lever/`, then swap the LEVER links from the GitHub repo URL to `/lever/`
  in the homepage entrance card (`apps/web/src/pages/index.astro`) and the
  megamenu Models column (`apps/web/src/config/nav-config.json`).
- [ ] Deploy the `pdlc` repo MkDocs site, then swap the PDLC megamenu footer
  link from the GitHub repo URL to `/pdlc/`.
- [ ] Stand up an MkDocs site for `specification-workflow-spec` (no
  `mkdocs.yml` there yet; README badge already reserves
  `/specification-workflow-spec`) as the developer-reference layer under the
  on-site `/sdd/` narrative catalog.

## Nav / megamenu

- [ ] **Manually click through the restructured nav (3 megamenus).** The nav
  now has three megamenus — Frameworks, SDD Workflows, and From the Field
  (Case Studies | Signals) — plus Products/Resources dropdowns. Verify in a real
  browser: each megamenu trigger opens its own panel, only one is open at a time,
  Escape/click-outside close, the mobile hamburger lists all three, and the
  sub-sites (lever/visionspec) pick up the new `/nav-config.json`. (Browser
  extension was unavailable during implementation, so only build + typecheck +
  config validation were run.)
- [ ] Consider vendoring or pinning `@grokify/site-nav` (currently consumed as
  the prebuilt `site-nav.min.js` copied into `public/js/`; source lives in
  `github.com/grokify/web-tools/packages/site-nav`, referenced by `file:` path
  from plexusone).
- [x] **Multiple megamenus.** `wt-navbar` now supports a `megaMenus[]` array
  (legacy single `megaMenu` still works). Implemented in
  `github.com/grokify/web-tools/packages/site-nav` and re-shipped as
  `public/js/site-nav.min.js`. Rather than a Thinking/Library Resources
  megamenu, the IA was restructured: Frameworks and From the Field became
  megamenus, Signals moved in with Case Studies, and Resources stays a rich
  dropdown by design.

## SDD catalog enhancements

- [ ] Embed generated diagrams on `/sdd/` pages using the spec repo's
  `pkg/diagram` (D2/Mermaid from workflow definitions) — include diagram text
  in the catalog export and render at build time.
- [ ] Add a "Definition SDD vs. Execution SDD" framing section to
  `/frameworks/spec-driven-development` linking into `/sdd/`, and regenerate
  its PDF afterward (`./scripts/build-pdfs.sh`).
- [ ] Revisit the Kiro integration descriptor when a public repo or firmer
  docs exist (currently `source: docs`, lower-confidence layout).

## specification-workflow-spec (tracked here until it has its own roadmap)

- [ ] Add the instance/layout model to `pkg/integration`: an enumerable
  per-instance structure (Spec-Kit feature, OpenSpec change, AI-DLC unit of
  work) with an `Enumerate` glob and per-instance states (e.g. OpenSpec
  active vs. `changes/archive/`), so viewers can list in-flight work from
  data instead of per-tool code.
- [ ] Extend `Status` to multiple prioritized signals (`[]StatusSignal`) —
  e.g. OpenSpec layers dir-state + tasks.md checkboxes + `openspec status
  --json`; AI-DLC layers the state-file checklist + per-unit plan checkboxes.
- [ ] Model CLI status probes as structured fields (`openspec status --json`,
  Spec-Kit `check_prerequisites.py --json`) for when the tool binary is
  available.
- [ ] Resolve the "execution" terminology collision: `spectype.CategoryExecution`
  (plan/roadmap — really *delivery planning* documents, still Definition-side)
  collides with VisionStudio's Execution (monitoring actual building against
  specs). Consider renaming the spec category to `delivery` or `planning` —
  coordinated change across spectype, `layout.ExecutionDir`, workflow
  `spec_config` categories, generated schemas, and visionspec consumers. The
  website already presents it as "delivery planning" at the display layer.

## Presentation & video

- [ ] Voiceover/video phase for the ProductBuilder deck: content lives in
  `apps/web/src/data/productbuilder-deck.json` (slides + narration, single
  source); `scripts/generate-marp-deck.mjs` emits
  `presentation/what-is-a-productbuilder.marp.md` in the
  grokify/videoascode (vac) input format (Marp + `<!-- narration -->`
  comments with [PAUSE:ms]). Next: run vac with John's voice clone
  (ElevenLabs/OmniVoice per vac docs), review the render (HITL — brand
  voice), then embed on the homepage via YouTube lite-embed facade (do NOT
  commit MP4s into docs/). The web deck is live at `/presentation` (Resources
  menu) meanwhile.
- [ ] Optional deck polish: per-slide URL hash updates on scroll, and a
  Marp-rendered PNG export for diagram slides (the-model, become-one) so the
  video shows the real visuals instead of bullets.

## Product Builder Stack (from IDEATION_CHAT_ECOSYSTEM.md)

**Positioning (agreed 2026-08): the business layer nobody owns.** Education
sites (DeepLearning.AI) teach AI skills ending in toy apps; app builders
(Lovable, Base44) bake in an ecosystem but keep you inside their walls. PBHQ
serves the person building a real business on their own stack (Claude Code
et al.): the ecosystem unbundled + the growth/revenue layer education skips.
Grounding: a toy app = Builder Loop with no Product Loop; the $1M one-person
SaaS = both loops run by one person; the stack's Measure/Grow categories ARE
the Product Loop's instruments. North-star persona: the $1B one-person
ProductBuilder — treated rigorously as an ASDM claim (impossible below
L6–L7 autonomous operations; human as Governor running on taste +
discernment), answered level-by-level, not as hype. Lovable/Base44 are
on-ramps, not competitors: PBMM L2 Prototype Builder territory; PBHQ
concepts apply inside them, and the graduation path is L2 platform →
L4–5 own stack → L6–7 autonomous ops. Candidate future homepage/About
line: "from toy apps to the one-person software company."

Curated freemium tool recommendations — editorially independent of affiliate
programs. Full ideation in `IDEATION_CHAT_ECOSYSTEM.md`. Design decisions:

- [ ] **Organize by loop station, not generic jobs**: analytics = Product
  Loop Measure; CRM/support = Sense & Validate/Grow; hosting/monitoring =
  Builder Loop Ship; auth/db/payments = Build. Extends the two-loop model
  into the practical layer; proprietary organizing scheme.
- [ ] **Provider cards as a schema'd content collection** (free tier, API
  capability on free tier, export, allowance, inactivity risk, first paid
  tier, portability, last-verified, used-by-PBHQ, affiliate status) —
  deterministic card render; machine-readable for agents.
- [ ] **Verification as a scheduled agent job**: last-verified dates are a
  cadence commitment; free-tier limits and API facts are machine-checkable —
  quarterly agent sweep opens a PR with diffs, HITL approves (fits the
  publishing policy: facts automated, judgment human).
- [ ] **Bands + selection principles per the ideation doc**: Ramen / Growth /
  Scale stacks; prioritize no-expiration free tiers with real API access and
  export; Preferred status requires API + portability regardless of score;
  upgrade triggers stated per paid recommendation.
- [ ] **Editorial integrity hard lines**: pick tools first, affiliate after;
  never sell the default slot; FTC-compliant disclosure on the page; "Used
  by ProductBuildersHQ" flags tie into ships-the-machinery credibility.
- [ ] **Page plan (agreed 2026-08):** `/stack/` (philosophy + providers
  grouped by loop station, Ramen/Growth/Scale bands) → `/stack/[provider]`
  (schema'd card pages; SEO surface) → `/builds/` (PBHQ in production:
  productbuildershq.com itself, then VisionStudio Cloud, OmniAgent Cloud —
  each with its stack + ASDM operating level + eventually public growth
  metrics; first-party complement to case studies) → `/builds/[id]` (phase
  2: tool-decision changelog, free-tier-limit upgrade history, metrics over
  time). Nav: megamenu footer + Resources.
- [ ] **v1 principle: operational-only — "we only recommend what we run."**
  Launch with providers verified by PBHQ's own operations (GitHub,
  Cloudflare, HubSpot + this site's stack); providers earn cards by being
  adopted in a build (VisionStudio Cloud → PostHog/Mixpanel etc.).
  Research-based candidates join later under a visibly distinct status.
  Data rule: provider "Used by" lists are DERIVED from the builds
  collection's declared stacks, never hand-set — the claim stays
  mechanically true.
- [ ] Later scope: expand toward ~10 categories with researched
  alternatives (deep-research workflow candidate; days of verification
  across ~25 tools).
- [ ] **Extend the builds schema to declare workflows, not just tools**:
  each build states its definition workflow (PBHQ builds → pbhq-lite in
  VisionStudio) and the SDD workflow pages derive "Used by" the same way
  provider cards do — one mechanism across tools AND workflows.
  Interim hand-written notes exist on the pbhq-lite page and the /sdd/
  definition intro (2026-08); replace with derived data when /builds/
  lands.
- [ ] **Stage-fit guidance as a workflow dimension**: solo 0-1 → pbhq-lite
  / 0-1; team+revenue → big-tech-essentials; enterprise/stakeholder-heavy →
  aws-product, big-tech. Consider a stage field in the workflow profiles
  (spec repo) so the catalog can render a "which workflow?" selector.
  Insight to preserve for the eventual article: solo builders should invert
  enterprise loop-weighting — light definition ceremony, heavy outcome
  verification (GTM + metrics attainment), because alignment is free for
  one person and verified growth is the bottleneck.

## Framework opportunity — The Five Ps (5-P Product Stage Model)

- [ ] Adopt John's 5-P model (ex-"Vibe Coding Maturity Model" v0.3.0, source:
  grokify-content-internal_bak/vibe-coding-maturity-model/): **Preparation →
  Prototype → Proof-of-Concept → Production → Profit**. Naming decision
  (2026-08): call it **"The Five Ps" / 5-P Product Stage Model** — NOT
  "ProductBuildering Maturity Model" (collides with PBMM; and it's a *stage*
  model per initiative — every product starts at P1 — not a capability
  *maturity* model, which PBMM/ASDM own; TRL is the right family). Fills the
  missing slot: PBMM grades the person, ASDM the process, 5-P the
  *initiative*. Two-loop mapping: P1 = Product Loop front half; P2–P3 =
  low-ceremony Builder Loop passes; P4 = Builder Loop with real gates/ops;
  P5 = Product Loop back half (Measure, Validate & Grow). Ending at Profit
  encodes the toy-app critique as a stage progression (stuck at P2/P3
  forever = toy app). Use as the unifying stage axis for: workflow stage-fit
  (P2 → pbhq-lite/0-1; P4+ → execution workflows; P5 → heavier definition),
  stack bands (Ramen≈pre-P4, Growth≈P4–P5, Scale≈P5+), and the
  Lovable/Base44 graduation path. Model as data in
  specification-workflow-spec when built (stage type + references), then
  framework article (`provenance: original`) + About IP roster + megamenu
  Models column. Possible future extension (resist for v1): a sixth P,
  Portfolio — multiple P5 products under one solo builder.
- [ ] **Origin & motto (preserve in the article):** predates PBHQ — John
  built it as a solo founder to tell product managers "don't stop at
  prototype: minimally aim for Production, ideally Profit" (the model's
  normative motto; parallel to LEVER-forward vs REVEL-backward — stages
  allow stopping, the commitment reading sets P4 as floor, P5 as goal).
  **The interlock theorem:** 5-P P2 "Prototype" = PBMM L2 "Prototype
  Builder" — same word, same insight from two directions. The person's
  maturity caps the initiative's attainable stage: L2 people produce P2
  products; P4 requires L3–L4 skills; sustaining P5 solo requires ~L5 +
  rising ASDM autonomy (one person can't run production and growth at low
  autonomy). PBMM/ASDM are the prerequisites for the 5-P's upper rungs —
  the model family interlocks.
- [ ] **The aphorism (final wording 2026-08; on homepage two-loop section
  + Five Ps article):** "When building is cheap, only results are scarce."
  Deliberately does NOT dismiss review/judgment — both are necessary, not
  sufficient; sufficiency is the goal, and its name is results. Key insight:
  results were ALWAYS scarce (before and after AI) because you're fighting
  for attention; AI didn't create that scarcity, it removed every OTHER
  scarcity (building was the moat, now cheap), leaving results as the only
  one left. Ladder for the body: review = built right?, judgment = worth
  building?, results = did it work? Completes the About taste line:
  taste/discernment are the inputs AI cannot supply, results the output only
  the market can supply — taste proposes, results dispose. Field evidence:
  Lovable subreddit celebrates revenue screenshots, not builds. Candidate
  for homepage hero copy / Signals post on its own.
- [ ] **Positioning pair:** "PBMM is how to become a ProductBuilder; the
  Five Ps is what to aim your products at" — the person's ladder and the
  product's ladder. Reactivates the brand's first word: the Product in
  ProductBuilder means building for profit, not for the sake of building.
- [ ] **Visual: five ascending bars** (from the v0.3.0 HTML, rebuilt in
  site idiom — Tailwind/CSS, print-safe, no JS): rising height = rising
  stakes; P5 Profit gets the dark-green destination highlight per the
  CLAUDE.md ladder convention (third destination state alongside PBMM L5
  and ASDM L7 — one visual grammar: the dark green bar is where you're
  going). Replace the emoji icons with the site's stroke-icon style.
  Differentiated form within the system: ladders = progression, circles =
  loops, ascending bars = stages.

## Framework opportunity — the Product Loop & Builder Loop (two-loop model)

**Decision (2026-08): two loops, not three.** The flagship model is the
**Product Loop** (originate what to build via definition workflows; verify
outcomes — adoption, revenue) and the **Builder Loop** (implement via
execution workflows; verify built-right). Ng's agentic coding loop (The
Batch #359 loop 1) is mechanics *inside* the Builder Loop, owned by the Loop
Engineering framework and graded by ASDM — not a top-level loop. Rationale:
loops are defined by accountability (two owners), not timescale; the
loop-1/loop-2 boundary moves with ASDM level (at L6+ it dissolves), so a
3-loop model has a load-bearing wall the maturity model says is moving; and
Product Loop + Builder Loop = ProductBuilders — the role thesis and the
model are one diagram. Both loops share the same gate anatomy (intent → AI
plans → clarify → approve → AI executes → human verifies); what differs is
the artifact (specs vs code) and the verification question (right thing? vs
built right?).

**Loop stations (drafted 2026-08).** Builder Loop generalizes (not copies)
AWS AI-DLC's 7 steps — gates are human-or-policy per ASDM level, and the
loop endpoints are the cross-loop seams: **Accept** (receive the Product
Baseline; PDLC contract) → **Plan** (AI drafts + clarify sub-cycle; spec
ambiguity escalates to the Product Loop) → **Approve** (gate; human ≤L5,
policy L6+) → **Build** (AI executes; Ng's agentic loop lives here; Loop
Engineering is the manual) → **Verify** (built-right vs spec/scenarios;
human ≤L5, LLM-as-a-Judge at L6) → **Ship** (per operational policy; L7 =
autonomous ops; emits telemetry up). Compatibility mapping: AI-DLC a→Accept,
b–d→Plan, e→Approve, f→Build, g→Verify; Spec-Kit specify…tasks→Plan,
implement→Build, analyze/converge→Verify; OpenSpec propose→Plan,
apply→Build, verify→Verify. Product Loop mirrors the anatomy: **Sense**
(research, signals, telemetry; continuous-discovery/jtbd) → **Hypothesize**
(hypothesis docs, Opportunity Spec, OST; lean-startup/0-1/design-thinking) →
**Define** (MRD → PR/FAQ → 6-Pager → PRD → UXD; aws-product/big-tech;
LLM-as-a-Judge evals) → **Approve** (gate: Product Baseline → handoff to
Builder Accept) → **Measure** (adoption/engagement/revenue; AI-Native PM
Metrics + VisionStudio Execution) → **Validate & Grow** (double down or
kill; growth workflow) → back to Sense. The 24 catalog workflows map onto
Product Loop stations — the loop diagram is the catalog's organizing
geography.

- [ ] Candidate flagship framework/paper: the **Two-Cycle AI-DLC**. Today's
  execution workflows (AI-DLC, Spec-Kit, OpenSpec) run only the engineering
  cycle — AI-DLC's loop is: humans provide task → AI creates plan / seeks
  clarification → humans clarify → AI refines plan → humans approve → AI
  executes → humans verify outcome → repeat. That is the Scrum-Master/dev
  cycle with no product cycle above it — the same gap Dr. Jeff Sutherland
  addressed with Scrum@Scale's two cycles (Product Owner Cycle + Scrum Master
  Cycle). The PBHQ opportunity: define the second cycle — humans use AI to
  *originate* the tasks (definition workflows: MRD → PR/FAQ → 6-Pager → PRD)
  and to *verify the implemented work achieves its goal* (adoption, revenue —
  the AI-Native PM Metrics framework supplies the measures; VisionStudio's
  Execution monitoring supplies the observation). PBHQ deliberately does not
  recreate execution workflows; it wraps them with the product cycle. This is
  the deep narrative under the Definition/Execution split and likely a
  top-tier framework article + PDF when there is writing bandwidth.
- [ ] Incorporate Andrew Ng's three loops (The Batch #359,
  https://www.deeplearning.ai/the-batch/issue-359) into the Two-Cycle
  article: (1) agentic coding loop — AI iterates against specs/evals,
  minutes; (2) developer feedback loop — human steers and makes product
  decisions, tens of minutes to hours; (3) external feedback loop — real
  users/market, hours to weeks, slowest. Mapping: loops 1+2 ≈ the engineering
  cycle (AI execution + human built-right gates); loop 3 ≈ the product
  cycle's verification half — but Ng leaves loop 3 passive (feedback arrives
  slowly) and origination implicit (folded into loop 2 ad hoc). The PBHQ
  contribution: instrument loop 3 into an operated cycle (definition
  workflows originate; AI-Native PM Metrics + VisionStudio Execution
  monitoring verify outcomes). Ng's HITL criterion — "so long as the human
  knows something the AI does not" — explains why human judgment concentrates
  in the outer loops, where the human's market/customer knowledge advantage
  is largest. Also a strong candidate for a second Signals post (Ng #349
  validated the role thesis; #359 validates the loop structure).

## VisionStudio Cloud (product direction, 2026-08)

- [ ] **VisionStudio Cloud** = hosted VisionStudio (specs + LLM-as-a-Judge +
  dev management) exposed via **MCP server**, extended with **CD** (a few
  targets: AWS Lightsail, DigitalOcean, Vercel) and **growth/profit
  integrations** (PostHog, Mixpanel, Stripe). Strategic framing: it's the
  first tool that spans BOTH loops — local VS covers Product-Define +
  Builder-Accept/Plan/Verify; CD adds Builder-Ship; analytics+payments close
  Product-Measure + Validate/Grow. In Five Ps terms it carries a build P4
  (CD → Production) → P5 (analytics+Stripe → Profit). This is PBHQ's
  activation/revenue answer vs productbuilders.space (which productizes
  practice) — tooling, not a bootcamp.
- [ ] **Architecture discipline: orchestrate, don't rebuild.** VS Cloud is
  the loop conductor, not the orchestra — never build hosting/analytics/
  payments; CD targets are thin adapters over provider APIs, PostHog/Stripe
  are read-integrations feeding the Measure/Validate gates. Same principle as
  the Builder Loop wrapping execution workflows. Keeps surface bounded and
  integrations swappable.
- [ ] **Revenue model:** VisionStudio local = free/OSS (Ramen stage,
  adoption); VisionStudio Cloud = paid hosted (Growth/Scale stage). Tiers map
  to the stack bands / Five Ps.
- [ ] **/builds already has real content:** PlexusOne.dev and AIStandards.io
  are built with VisionStudio + the pbhq-lite workflow (stated on the About
  page and the pbhq-lite page, 2026-08). When /builds lands, these are
  first-party builds beyond productbuildershq.com itself — and their stacks
  seed the "we only recommend what we run" derivation.
- [ ] **Ultimate dogfood + /builds keystone:** build VS Cloud with pbhq-lite
  + local VS, ship to P4 on one of its own CD targets, wire its own
  PostHog/Stripe to reach P5, then document the journey on /builds with real
  metrics. Makes "we only recommend what we run" literally true — the stack
  becomes VS Cloud's own integration list (derive stack "Used by" from it).
- [ ] **MCP = distribution wedge:** plugs into the coding agent builders
  already run (a tool Claude Code calls), not an app to adopt.

## PBMM enhancement — the governance asymmetry (from the Cherny signal, 2026-08)

- [ ] Candidate PBMM section / standalone essay: **"Which path is easier —
  Engineer or Product?"** Thesis (John's, landed first in the Boris Cherny
  signal): "coding is solved" is an engineer's sentence — the people saying it
  (Cherny, Yegge, Karpathy) can say so because they can still *govern* AI
  output. In the AI era the PBMM's two on-ramps are no longer symmetric at the
  governance step: the Engineer path's retained code fluency is the credential
  that lets you run the loop; the de-technicalized PM ("I left engineering to
  get away from coding") can decide *what* but not verify *how*. Not
  "engineers win" — engineers still must acquire product judgment (the harder
  half); PMs bring Ng's "context advantage." Triad: taste (what) + context
  (why) + governance (how). Advice: engineers keep coding while building
  product sense; PMs don't let code atrophy. Consider adding a "governance
  fluency" dimension to the PBMM levels (L3–L4 gate: can you evaluate agent
  output?). Ties to Loop Engineering (you write the loops that govern) and the
  About taste line (taste = earned opinion ≈ Ng's context advantage, not the
  innate-artistry strawman Ng rejects).

## VisionStudio (framework/data integration)

- [ ] Consume `integrations.All()` / `pipelines.All()` from
  specification-workflow-spec to populate the Definition/Execution viewer and
  compute project status from the declared detection + status models.

## Homepage conversion (from the 2026-08 review, not yet done)

- [ ] Replace the hero stats bar (inventory counts undersell; use outcomes or
  drop until the numbers flatter).
- [ ] Differentiate the two CTAs (hero and closing both go to `/frameworks`).
- [ ] Add an email-capture / newsletter signup.
- [ ] Add a human credibility anchor (author line / bio / who-this-is-for).

## Content

- [ ] Keep collecting market signals for `/signals/` (Andrew Ng post is the
  inaugural entry).
- [ ] Consider surfacing the L7 "ideal state predates AI" rationale in the
  homepage ASDM ladder caption (full argument lives in the ASDM article).
- [ ] Future essay/Signals piece: "Taste & Discernment — the two inputs AI
  cannot supply." Core framing (from a Pluralsight course — get exact course
  title/author from John for citation): Taste = "opinion formed by
  experience"; Discernment = "expertise built by practice"; these cannot be
  replaced by AI, but "Code" and "Commands" can. Maps onto the two-loop
  model as a quadrant: the Builder Loop automates code + commands; the
  Product Loop's human gates run on taste + discernment. Provenance split in
  the bio: breadth (six functional rounds) forms taste; reps (700+ repos, SO
  method) build discernment. Also ties to the hero's "judgment," the
  never-automated Product Approve gate, Ng's HITL criterion, and LEVER's
  Value stage. Introduced in the About bio (2026-08).
- [ ] Future Signals/newsletter piece (candid dogfooding story): "the Builder
  Loop without the Product Loop" — 700+ repos built across grokify/PlexusOne
  with GTM deliberately unprioritized; the two-loop model applied
  autobiographically. Editorial rule established: cite corpus size, never
  star counts — don't volunteer metrics that undersell.

## Newsletter & continuous feed systems

**Publishing policy (agreed 2026-08):** automation level follows voice +
reversibility. Aggregation in others' voice on mutable pages (Radar) publishes
fully automatically. Semi-authored analysis on-site (Pulse) publishes
automatically behind machine gates (socialpulse `validate` + `verify`) with
async human spot-review. Anything in PBHQ's brand voice that is outbound or
irreversible — Signals posts, Substack sends, LinkedIn/X posts — always gets
HITL approval first. HITL = human approves, machine may execute (LinkedIn has
a post API; Substack is manual paste).

**Sequencing (agreed 2026-08):** start with other voices, defer our own. The
fully-automated tier costs no founder attention; the brand-voice tiers do, and
there is no bandwidth for a sustained voice right now. Radar now; Pulse later;
Signals stays opportunistic (no cadence promised); Substack/newsletter/curator
deferred until voice bandwidth exists. The Radar corpus (signal's monthly
merge archives) compounds meanwhile as the future newsletter's raw material.

### Now — Radar (fully automated, other voices)

- [ ] Migrate `grokify/planet-ai` (Signal-powered feed aggregator, 6-hourly
  GitHub Action) into the ProductBuildersHQ org as a branded sub-site
  (`/radar` naming candidate) — keep its own build cadence; do NOT merge into
  this repo's deterministic build. Add the shared `pbhq-nav` to its frontend.
- [ ] Curate planet-ai's `feeds.json` toward the PBHQ thesis (add product
  management / AI-native delivery sources beyond dev blogs).
- [ ] Optionally surface a "latest from the field" strip on the site (built
  from Radar's JSON Feed at build time or client-side) for freshness.

### Later — Pulse (automated behind machine gates)

- [ ] Migrate `grokify/frontier-pulse` (SocialPulse HN discussion analysis)
  to the org as `/pulse`; add a deploy workflow; resume summary production
  when there is review bandwidth (machine gates: `validate` + `verify`).

### Deferred until voice bandwidth — Newsletter (HITL)

- [ ] Do NOT create the Substack until the voice work actually starts (an
  empty publication against no cadence is a broken promise). When ready:
  a **PBHQ-branded publication with John Wang as the named author** ("Product
  Builder Signals, by John Wang") — personal trust + brand equity, the
  Lenny's/Pragmatic Engineer pattern. Embed signup in the closing CTA band
  and `/signals/`.
- [ ] Medium (@grokify): do not build out — demote to a zero-effort
  syndication mirror using Medium's import tool with canonical links back to
  productbuildershq.com; update the profile bio to point at PBHQ. Never
  write for Medium first (audience not owned/exportable; conversation moved
  to Substack/LinkedIn/X/HN).
- [ ] Newsletter pipeline (crawl → walk → run): weekly scheduled agent reads
  Radar's `data/v1` corpus API + Pulse digests, drafts the issue as a PR
  against this repo (PR review = the HITL approval gate; merge = approve),
  with `socialpulse validate`/`verify` as CI checks. Publish approved issues
  to Substack (manual paste first; no public Substack API). Run phase: port
  the curator to `plexusone/omniagent` (cron + memory + per-surface withheld
  publish tools per the publishing policy above).
- [ ] Content funnel framing once live: Radar (automated) → Pulse (analyzed) →
  Signals (editorial) → Newsletter (curated); the increasing-judgment ladder
  is itself an ASDM story worth a Signals post.

## Perspectives → speaking flywheel (2026-08)

- [ ] Perspectives is John's own-voice channel AND a speaking-engagement
  driver: accumulate quotable bylines over time → thought-leadership
  credibility → talk invitations. Wired both ways (About speaking section →
  Perspectives; each essay's author footer → "available for talks / LinkedIn").
  Positioning: John's perspective stands equal to the showcased Signals voices
  (Ng/Yegge/Karpathy/Cherny) and is *especially* valuable for the rarer
  product-manager → ProductBuilder path (per Ng, more engineers than PMs make
  this crossing; the discourse is engineer-dominated).
- [ ] Write for quotability: each essay should land 1–2 sharp, screenshot-able
  lines (e.g. "AI is a coworker. Govern it like one." / "The exoskeleton makes
  you a stronger IC; the coworker makes you a company of one."). Consider a
  designed pull-quote component (theme-aware, print-safe, brand-marked like the
  two-loop diagram) so quotes travel with attribution when shared.
- [ ] Cadence is opportunistic, not committed (same posture as Signals) — but
  Perspectives, unlike a newsletter, has no cadence promise, so it's safe to
  grow slowly. Candidate next essays already in TODO: the two-loop flagship
  read as opinion, the "which path is easier" governance-asymmetry piece, the
  "$1B one-person company is a Level 7 claim" piece, and the taste/discernment
  vs code/commands quadrant.

## Housekeeping

- [ ] Break the uncommitted 2026-08 session work into topical conventional
  commits across `productbuildershq.github.io`, `specification-workflow-spec`
  (integration/pipeline packages + catalog exporter), and `lever` (REVEL
  write-up).
