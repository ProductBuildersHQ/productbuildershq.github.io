---
title: "The Impact Model"
subtitle: "One Causal Model of Why Your Work Should Produce Results — Drawn as a Problem Tree, Theory of Change, Logic Model, OKRs, or V2MOM"
description: "Every goal rests on a claim that what you do will change something. The Impact Model writes that claim down once, as a causal model with its assumptions, evidence, and measures, and draws the problem tree, theory of change, logic model, logframe, OKRs, V2MOM, and DMAIC from it."
version: "v1.0"
date: "November 2026"
provenance: "original"
tags: ["impact-model", "theory-of-change", "logic-model", "problem-tree", "okrs", "v2mom", "outcomes", "product-loop"]
---

Every product bet rests on a causal claim. *If we ship guided bank import, new accounts will connect a bank in their first session; accounts that connect early will reconcile every week; accounts that reconcile every week will still be here in ninety days.* That chain is the reason the work was worth doing. It is also, in most teams, written down nowhere.

What gets written down instead is the two ends. The spec says what will be built. The dashboard says what the metric did. The middle — why the one should lead to the other, and what must be true for it to — lives in a planning meeting and in the head of whoever ran it. When the metric does not move, nobody can say which link broke, because nobody wrote the links down.

> When building is cheap, the hypothesis is the scarce artifact.

The [Five Ps](/frameworks/five-ps) puts it as *taste proposes; results dispose.* The Impact Model is how you write the proposal down precisely enough that results can dispose of it: one model of how and why change is expected to happen, with the measures that will say whether it did.

## Where It Sits in the Product Loop

The [Product Loop & Builder Loop](/frameworks/product-loop-builder-loop) model splits product work into two cycles. The Builder Loop asks *built right?* and checks code against specs. The Product Loop asks *right thing?* and checks results against a hypothesis. The Impact Model is that hypothesis, made explicit:

| Product Loop station | What the Impact Model supplies |
|----------------------|--------------------------------|
| **Sense** | The problem, its causes, and its effects — what is wrong and why |
| **Hypothesize** | The outcomes to change, the causal links between them, and the assumptions each link rests on |
| **Define** | The interventions — what will be built or done — and the outcomes each is meant to move |
| **Approve** ◆ | A model a reviewer, human or LLM, can judge for plausibility before anything is built |
| **Measure** | Indicators with baselines, targets, and observations over time |
| **Validate & Grow** | Which link held and which broke, so the next turn of the loop starts from evidence |

Without it, the Measure station measures and Validate & Grow guesses. With it, a flat metric points at a specific link: the feature shipped, accounts connected their banks, but connecting did not lead to reconciling — so the assumption under that link was wrong, and that is what the next bet should address.

## What an Impact Model Holds

An impact model is a graph of causes and measures:

- **The problem** it responds to, the **causes** that produce it, and the **effects** it leads to.
- **Outcomes** that should change, at five levels — output, short-term, medium-term, long-term, and impact — and the **causal links** between them, each with a reason to believe it.
- **Assumptions** that must hold for a link to work, and the **evidence** for and against each.
- **Interventions**: what is built or done to bring the change about, and the resources and outputs they need and produce.
- **Indicators**: how progress is measured, with baselines, targets, and observations over time.
- **Actors and audiences**: who is accountable for each change, and who needs to see what.

Every element also records where it came from: *stated* by the team, *inferred* from other material, proposed as a *hypothesis*, or *confirmed* by evidence. When an AI agent drafts half the model, a reader can still tell what the team has claimed from what the agent proposed.

## One Model, Many Projections

The Impact Model's central idea is that the familiar planning and evaluation formats are not separate documents to keep in sync. They are **projections** of one model: each draws it for a different reader and leaves something out.

![The impact model and the views drawn from it](/images/frameworks/impact-model-projections.svg)

| Projection | The question it answers | Its usual reader |
|------------|------------------------|------------------|
| **Problem tree** | What is the problem, what causes it, and what does it lead to? | Discovery, before solutions |
| **Theory of change** | Why should what we do lead to the change we want, and in what order? | Strategy and review |
| **Logic model** | What goes in, what is done, and what comes out? | Planning and funding |
| **Outcome map** | What changes, who is responsible for it, and how is it measured? | Owners of each outcome |
| **Logframe** | What do we promise, and how will we verify it? | Contracts and monitoring |
| **OKRs** | What will a team commit to this period? | Teams and their managers |
| **V2MOM** | What do we want, what matters, how will we get it, what is in the way, and how will we know? | Organization-wide alignment |
| **DMAIC** | Which metric are we improving, from what baseline to what target, and is the gain holding? | Improvement efforts on an existing metric |

None of these is derived from another. A logic model shows the sequence from inputs to outputs, and rarely why each step holds. A theory of change shows why, and says less about what is delivered. OKRs keep only what a team commits to for a quarter. Drawn by hand, each is a separate document that drifts from the others the week after the planning offsite. Drawn from one model, they cannot disagree. The [comparison of outcome and strategy frameworks](/frameworks/outcome-and-strategy-frameworks) covers each method on its own terms.

None of these methods belongs to a sector, and neither does the model. A startup, a product team inside a company, and a nonprofit program all set goals, choose a strategy, and have to show results. The methods grew up in different places, OKRs at Intel and theories of change in program evaluation, but each is a tool for goals, strategy, and results wherever they are set.

## The Graph Behind Your OKRs and V2MOM

Most teams already write OKRs or a V2MOM. Both are lists. An objective's key results, and a V2MOM's methods and measures, imply that one thing leads to another, but neither says how. Cascaded OKRs imply a tree of causes and never state it, which is how a team can hit every key result while the number the company cares about stays flat.

The impact model is the graph that connects them. Its structure is as specific as a logic model's: each piece of work, the output it produces, and the outcome it should move. Each link carries its reason, as a theory of change describes it. In that graph:

- a **key result** is an indicator on an outcome, so it traces to the outcome it measures and on to the impact that outcome serves;
- a **V2MOM method** is a pathway, with its interventions as the work, a **measure** is an indicator, and an **obstacle** is a risk or an assumption not yet tested;
- every step says why it should lead to the next, so when a number does not move, the graph shows which link to question.

## A Worked Example

A fictional bookkeeping app for small businesses loses too many new accounts in their first month. As a problem tree:

| Layer | In the model |
|-------|--------------|
| **Effect** | Owners churn before the product has saved them any time |
| **Core problem** | New accounts stop using the product within 30 days |
| **Immediate cause** | Owners never reach a reconciled month |
| **Underlying cause** | Connecting a bank fails or is abandoned in the first session |
| **Structural cause** | Bank connections depend on third-party aggregators the product does not control |

The team's bet, as outcomes and links:

| Level | Outcome | Indicator and target |
|-------|---------|----------------------|
| Output | Guided bank import ships | Released to all new accounts |
| Short-term | New accounts connect a bank in their first session | 45% → 70% |
| Medium-term | Connected accounts reconcile weekly | 30% → 50% of connected accounts |
| Long-term | Accounts are still active at 90 days | 52% → 60% |
| Impact | Owners spend less time on their books | Self-reported hours per month |

Each link carries an assumption. *Connecting early leads to reconciling weekly* assumes that the friction was the connection, not the reconciling itself; the evidence so far is a correlation in last year's cohorts, so the assumption is marked as needing a test. The structural cause is out of the team's control and is recorded as out of scope, with the reason, rather than silently dropped.

From that one model the team draws a problem tree for the discovery review, a theory of change for the strategy review, and OKRs for the quarter — the short-term outcome becomes an objective and its indicator a key result, with the target and baseline carried over. If the 90-day number does not move, the observations show which link failed.

## Built for Agents and Judges

The Impact Model is a data format first. It is defined as Go types with generated JSON Schema, and the open-source [impact-model](https://github.com/ProductBuildersHQ/impact-model) toolkit provides an SDK, a command line, and an MCP server, so an AI agent can build and query the model as easily as a person can:

```bash
impact-model init --out impact-model.yaml             # a starter impact model
impact-model lint impact-model.yaml                   # deterministic quality rules
impact-model graph impact-model.yaml --dead-ends      # outcomes that lead nowhere
impact-model report problem-tree impact-model.yaml    # the problem tree
impact-model report pathway impact-model.yaml         # the theory of change
impact-model export okr impact-model.yaml             # OKRs for the quarter
impact-model export v2mom impact-model.yaml           # a V2MOM
```

Quality is checked two ways. **Lint** applies deterministic rules — every outcome has an intervention or an earlier outcome leading to it, every outcome the team is accountable for has an indicator, every deeper cause is addressed or set aside with a reason, and indicators above the line the team controls claim contribution rather than attribution. **Judging** hands the model, its narrative, and a rubric to an [LLM-as-a-Judge](/frameworks/llm-as-a-judge) and checks the theory against three classic criteria: is it *plausible*, is it *feasible*, and is it *testable*? A verdict is tied to the exact version it judged, so an edited model has to be judged again.

This is what makes the Approve gate in the Product Loop real for outcomes. A human still approves the bet, but they approve a model that has already been checked for missing links, untested assumptions, and outcomes nothing measures.

## How It Relates to the Other Frameworks

| Framework | Relationship |
|-----------|--------------|
| [Product Loop & Builder Loop](/frameworks/product-loop-builder-loop) | The Impact Model is the Product Loop's hypothesis, from Sense to Validate & Grow |
| [The Five Ps](/frameworks/five-ps) | Its long-term and impact outcomes are what P5 — Profit — is measured against |
| [AI-Native PM Metrics](/frameworks/ai-native-pm-metrics) | Those metrics are candidate indicators; the model says which outcome each one evidences |
| [LLM-as-a-Judge](/frameworks/llm-as-a-judge) | Judges the model for plausibility, feasibility, and testability before work starts |
| [Spec-Driven Development](/frameworks/spec-driven-development) | Specs say what to build; the impact model says why it should matter. The V2MOM definition workflows in the [SDD catalog](/sdd/) take the same strategy into specs |

## Getting Started

- Read the [Impact Model documentation](https://productbuildershq.com/impact-model/), starting with [getting started](https://productbuildershq.com/impact-model/guides/getting-started/) and the [concepts](https://productbuildershq.com/impact-model/concepts/).
- Start with the problem tree. A team that cannot agree on the core problem and its causes is not ready to agree on outcomes; the [problem tree guide](https://productbuildershq.com/impact-model/guides/problem-tree/) walks through it.
- Connect an agent through the [MCP server](https://productbuildershq.com/impact-model/guides/mcp-and-skills/) and let it draft the model from the material you already have — a PRD, a strategy memo, last quarter's OKRs. Everything it adds is marked as inferred until someone confirms it.

## Attribution

The Impact Model — the format, the idea of one causal model with many projections, and the lint and judging approach — is original ProductBuildersHQ work. It builds gratefully on a long body of published work on theory of change and evaluation: the theory of change practice of ActKnowledge and the Center for Theory of Change (Taplin and Clark) and of the Aspen Institute Roundtable on Community Change (Weiss; Anderson), the UNDG's *Theory of Change* companion guidance, the W.K. Kellogg Foundation's *Logic Model Development Guide*, problem-tree analysis in the logical framework approach (GTZ's *ZOPP*; the European Commission's *Project Cycle Management Guidelines*), IDRC's *Outcome Mapping* (Earl, Carden, and Smutylo), John Mayne's contribution analysis, OKRs (Andrew Grove; John Doerr), V2MOM (Marc Benioff, Salesforce), and Six Sigma's DMAIC cycle. The full list of sources and how each is used is in the [Impact Model credits](https://productbuildershq.com/impact-model/credits/). None of these parties is affiliated with or has endorsed this model.
