---
title: "Outcome and Strategy Frameworks Compared"
subtitle: "Theory of Change, Logic Models, Logframes, Outcome Mapping, Problem Trees, OKRs, V2MOM, and DMAIC — What Each Answers and When to Use It"
description: "Product teams know OKRs and opportunity solution trees; program and policy teams know theories of change, logic models, and logframes. They are answering related questions about the same thing: why the work should produce the result. A field guide to eight methods, what each is for, what each leaves out, and where each fits in the Product Loop."
version: "v1.0"
date: "November 2026"
provenance: "industry"
tags: ["theory-of-change", "logic-model", "logframe", "outcome-mapping", "problem-tree", "okrs", "v2mom", "dmaic", "outcomes", "strategy"]
---

Two professions have spent decades on the same question from opposite ends. Product teams ask *will this feature move the metric?* and answer with OKRs, North Star metrics, and opportunity solution trees. Program and policy teams — foundations, public agencies, development organizations — ask *will this program change people's lives?* and answer with theories of change, logic models, and logframes.

The vocabularies barely overlap, and the methods are rarely compared. They should be. Each is a partial answer to one question: **why should what we do lead to the result we want, and how will we know if it did?** Each answers part of it well and leaves the rest out. Knowing which part is the difference between a planning document that guides work and one that decorates a slide.

This guide covers eight methods, compares them, and places each in the [Product Loop](/frameworks/product-loop-builder-loop). The ProductBuildersHQ [Impact Model](/frameworks/impact-model) holds what they all need, so that each can be drawn from one source instead of maintained by hand.

## At a Glance

| Method | The question it answers | Horizon | States *why*? | Measures? |
|--------|------------------------|---------|---------------|-----------|
| **Problem tree** | What is the problem, what causes it, and what does it lead to? | Before solutions | Causes only | No |
| **Theory of change** | Why should our work lead to the change we want, and in what order? | Multi-year | Yes — the core of it | Indicators per outcome |
| **Logic model** | What goes in, what is done, and what comes out? | Program life | Rarely | Usually |
| **Logframe** | What do we promise, how will we verify it, and what must hold? | Contract or project | Assumptions only | Yes, with means of verification |
| **Outcome mapping** | Whose behavior must change, and how much is in our control? | Multi-year | Partly | Progress markers |
| **OKRs** | What will this team commit to achieving this period? | A quarter or a year | No | Yes — the key results |
| **V2MOM** | What do we want, what matters, how will we get it, what is in the way, how will we know? | A year | Partly, through methods and obstacles | Yes — the measures |
| **DMAIC** | How do we move this metric from baseline to target, and keep it there? | Weeks to months | Root causes of the gap | Yes, statistically |

## The Methods

### Problem Tree

**From:** problem-tree analysis in the logical framework approach, formalized in GTZ's *ZOPP* planning method and the European Commission's *Project Cycle Management Guidelines*.

The core problem sits in the middle. Its causes grow below it as roots — immediate causes, then the underlying causes behind them, then structural ones — and its effects spread above it as branches. Turned into an *objectives tree*, each negative becomes the positive state that would replace it.

**Use it** at the start, before anyone proposes a solution. It is the cheapest way to find out whether the team agrees on what is wrong.

**It leaves out** what will be done about it, and how anyone would know it worked. A problem tree is analysis, not a plan.

**Product equivalent:** the opportunity side of an opportunity solution tree, and the "problem" section of a good PRD.

### Theory of Change

**From:** theory-driven evaluation, associated with Carol Weiss and the Aspen Institute Roundtable on Community Change in the 1990s, and practiced through ActKnowledge's backwards mapping (Taplin and Clark).

Start at the long-term goal and work backwards: what must be true just before it, and before that, down to the earliest change the work can produce. Each step becomes a *precondition*, each arrow a causal claim with a *rationale*, and each claim rests on *assumptions* that can be named and tested. The result is a pathway of change, read bottom to top.

**Use it** when the bet is large, the causal chain is long, and the expensive mistake is a wrong assumption rather than a slow execution.

**It leaves out** much detail about delivery — what is built, by whom, by when. Its common failure is the opposite of a logic model's: a compelling diagram of preconditions with no indicators, so nothing can ever disconfirm it.

**Product equivalent:** a hypothesis document with its chain spelled out — *if we ship X, users will do Y, which will produce Z, because…*

### Logic Model

**From:** program planning and evaluation, codified in the W.K. Kellogg Foundation's *Logic Model Development Guide*.

A left-to-right sequence: **inputs** (resources), **activities** (what is done), **outputs** (what is produced), **outcomes** (short-, medium-, and long-term changes), and **impact**. It fits on one page and is widely required by funders.

**Use it** to communicate what a program consists of and what it is expected to produce — to a funder, a board, or a new team member.

**It leaves out** *why*. A logic model shows that activities lead to outcomes, rarely why they should, and almost never what must hold for them to. As Isabel Vogel's review of theory of change practice puts it, a logic model without its context is closer to a logframe than to a theory of change.

**Product equivalent:** a roadmap with a results column — work items on the left, expected metric movement on the right.

### Logframe

**From:** the logical framework approach, which originated in US foreign-aid planning around 1970 and was adopted by development agencies including GTZ, the European Commission, and the UN.

A matrix. The rows are levels — goal, purpose or outcome, outputs, activities. The columns are the narrative, objectively verifiable **indicators**, the **means of verification** (where the data will come from), and the **assumptions** that must hold for one level to lead to the next.

**Use it** when the plan is a contract: when a funder or partner needs to know exactly what is promised and how it will be checked.

**It leaves out** the shape of the causal story. Its rigid levels force a branching theory into a single column, and teams often fill in the assumptions column last and least.

**Product equivalent:** a statement of work with acceptance criteria and measurement plan.

### Outcome Mapping

**From:** *Outcome Mapping* by Sarah Earl, Fred Carden, and Terry Smutylo, published by Canada's International Development Research Centre (IDRC) in 2001.

Outcome mapping focuses on changes in the behavior of **boundary partners** — the people and organizations the work interacts with directly. It separates the **sphere of control** (what the team does), the **sphere of influence** (what partners do differently), and the **sphere of interest** (the wider change no one team can claim), and tracks progress with graduated *progress markers*.

**Use it** when results depend on other people choosing to act differently — partners, customers, an ecosystem — and claiming credit for the end result would be dishonest.

**It leaves out** the end-to-end view; it deliberately stops claiming at the edge of influence.

**Product equivalent:** adoption work that depends on partners or a platform ecosystem, where a team can drive integrations but not the market's response to them.

### OKRs

**From:** Andrew Grove at Intel, described in *High Output Management* (1983), and carried to Google and beyond by John Doerr, described in *Measure What Matters* (2018).

An **objective** is a qualitative statement of what to achieve; two to five **key results** say measurably what achieving it means. OKRs are set for a period, typically a quarter, and are meant to be ambitious and transparent.

**Use it** to get a team to commit to outcomes rather than outputs for a period, and to make those commitments visible across teams.

**It leaves out** the causal story entirely. An OKR says what a team will achieve, not why achieving it should move what the company actually cares about. Cascaded OKRs imply a causal tree but never state one, which is why teams hit their key results while the top-level metric stays flat.

### V2MOM

**From:** Marc Benioff at Salesforce, used there since the company's founding and described in *Behind the Cloud* (Benioff and Adler, 2009).

Five questions answered in order: **Vision** (what do we want?), **Values** (what is important about it?), **Methods** (how will we get it?), **Obstacles** (what is in the way?), and **Measures** (how will we know?). V2MOMs cascade from the company to departments to individuals.

**Use it** to align an organization on direction and priorities, especially when values and trade-offs need to be explicit.

**It leaves out** the links between methods and measures. A V2MOM lists both but does not say which method should move which measure, or why. The [SDD catalog](/sdd/) includes V2MOM definition workflows at company, department, and team level.

### DMAIC

**From:** Six Sigma, developed at Motorola in the 1980s and popularized by General Electric.

Five phases: **Define** the problem and the metric, **Measure** the baseline, **Analyze** the root causes of the gap, **Improve** by addressing them, and **Control** to keep the gain — often with statistical process control charts that separate a real shift from noise.

**Use it** when the goal is to improve an existing, well-measured metric — conversion, latency, defect rate — rather than to create something new.

**It leaves out** the strategic question of whether this metric is the one that matters. DMAIC assumes the metric is right and optimizes it.

## Two Product-Native Methods

Product teams will reach for two methods that are not on the list above. Both map cleanly.

**The opportunity solution tree**, from Teresa Torres's *Continuous Discovery Habits* (2021), starts from a desired outcome, branches into opportunities (customer needs and pain points), and then into solutions and the experiments that test them. It is a problem tree turned upside down and joined to a theory of change: the opportunities are the causes, and the solution-to-outcome links are causal claims.

**The North Star metric** names the single measure that best captures the value customers get. In theory-of-change terms it is the long-term outcome a team steers by, and its supporting input metrics are the earlier outcomes that should lead to it. What it lacks is the stated chain: input metrics are usually chosen by correlation, and the assumption that moving them moves the North Star is rarely written down.

## Where Each Fits in the Product Loop

| Product Loop station | Methods that serve it |
|----------------------|-----------------------|
| **Sense** | Problem tree; the opportunity side of an opportunity solution tree |
| **Hypothesize** | Theory of change; opportunity solution tree; outcome mapping when partners must act |
| **Define** | Logic model; V2MOM methods; the logframe's output and activity rows |
| **Approve** ◆ | Theory of change judged for plausibility, feasibility, and testability; logframe for contracts |
| **Measure** | OKR key results; logframe indicators; outcome-mapping progress markers; North Star metric |
| **Validate & Grow** | DMAIC on metrics worth improving; the theory of change revised where a link failed |

## Choosing

- **Not sure what the problem is?** Start with a problem tree.
- **Long causal chain, expensive to be wrong?** Write a theory of change and test its riskiest assumption first.
- **Need to explain the program on one page?** Draw a logic model.
- **Promising results to a funder or partner?** Use a logframe.
- **Success depends on others changing what they do?** Use outcome mapping, and claim contribution, not attribution.
- **Setting team commitments for a quarter?** Use OKRs.
- **Aligning a whole organization for the year?** Use V2MOM.
- **Improving a metric that already exists?** Use DMAIC.

Most teams need several, and that is where they fail: each document is written separately, at a different time, by different people, and they quietly disagree. The OKRs no longer match the theory of change; the logframe promises an indicator the dashboard does not track.

## One Model Behind Them All

Every method above draws on the same underlying facts: a problem and its causes, the outcomes that should change, the causal links and assumptions between them, the work that is done, and the indicators that measure it. The ProductBuildersHQ [Impact Model](/frameworks/impact-model) holds those facts once, as a causal model, and draws the problem tree, theory of change, logic model, outcome map, logframe, OKRs, V2MOM, and DMAIC from it — so they cannot drift apart, and an AI agent can author and query it through the open-source [impact-model](https://github.com/ProductBuildersHQ/impact-model) toolkit.

## Attribution

This is an independent comparison of published methods. The methods and their names belong to their originators: problem-tree and logical framework analysis (USAID; GTZ, *ZOPP*; the European Commission, *Project Cycle Management Guidelines*), theory of change (Carol Weiss and the Aspen Institute Roundtable on Community Change; ActKnowledge and the Center for Theory of Change), the logic model (W.K. Kellogg Foundation, *Logic Model Development Guide*), *Outcome Mapping* (Earl, Carden, and Smutylo, IDRC), OKRs (Andrew Grove; John Doerr), V2MOM (Marc Benioff, Salesforce), DMAIC (Six Sigma; Motorola; General Electric), the opportunity solution tree (Teresa Torres), and Isabel Vogel's *Review of the use of 'Theory of Change' in International Development* (DFID, 2012). None of these parties is affiliated with or has endorsed this comparison.
