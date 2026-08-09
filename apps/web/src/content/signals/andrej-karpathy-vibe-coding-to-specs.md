---
title: 'Andrej Karpathy: The Coiner of "Vibe Coding" Says He Has Never Felt So Far Behind'
subtitle: 'Software 3.0, the human as supervisor — and why even the coiner points past the vibes to the specs'
description: "Andrej Karpathy named vibe coding, then described a Software 3.0 world where the human is a high-level supervisor running many projects in parallel. Even he admits he has never felt so far behind — which is the whole case for a maturity ladder."
date: '2025-12-26'
author: 'Andrej Karpathy'
authorRole: 'OpenAI co-founder; former Tesla AI lead'
sources:
  - label: 'Andrej Karpathy on X — "I''ve never felt this much behind as a programmer"'
    url: 'https://x.com/karpathy/status/2004607146781278521'
  - label: 'Andrej Karpathy — Software 3.0 (Sequoia AI Ascent)'
    url: 'https://www.youtube.com/watch?v=96jN2OCOfLs'
frameworks:
  - product-loop-builder-loop
  - spec-driven-development
  - product-builder-maturity-model
tags:
  - vibe-coding
  - software-3-0
  - spec-driven
  - supervisor
  - market-signal
---

## What Andrej Karpathy Said

In a December 2025 post on X, Karpathy — the person who coined "vibe coding" — wrote: "I've never felt this much behind as a programmer." His diagnosis: the profession is being "dramatically refactored," and on top of the usual engineering stack there is now a whole new programmable layer to master — agents, subagents, their prompts, context, memory, tools, hooks, MCP, LSP, slash commands, workflows — governing entities he calls "fundamentally stochastic, fallible, unintelligible and changing." His image for the moment: a "powerful alien tool was handed around" with "no manual," producing a "magnitude 9 earthquake" in the profession.

Four months later, at Sequoia's AI Ascent, he formalized the same anxiety into a framework: **Software 3.0** — programming in English, where the real work is prompting and context-window management, and the human sits above the code as a high-level supervisor running many projects at once rather than reviewing lines by hand.

## Why This Is a Signal

When the person who *named* the paradigm says he is scrambling to keep up, the takeaway is not "you are behind." It is that everyone is on a ladder now, including the people who built the rungs. A maturity model is not a nice-to-have in that world; it is the only way to have a coordinate system while the terrain moves.

This is the third independent arrival at the same conclusion documented here, after [Andrew Ng](/signals/andrew-ng-generalists-the-batch-349) and [Steve Yegge](/signals/steve-yegge-gas-town): the developer's job moves from writing code to directing it. Three very different people, the same destination.

## The Mapping

| Karpathy's Software 3.0 | Where it lands in the system |
|-------------------------|------------------------------|
| The human as a "high-level supervisor" running projects in parallel | The [ProductBuilder](/frameworks/product-loop-builder-loop) — orchestrating the build rather than typing it |
| Software 3.0 = prompting and context-window management | Spec-driven development — the "context" you manage is specification; the [definition side](/sdd/#definition) made rigorous |
| "Vibe coding" as the entry point | A [Prototype](/frameworks/five-ps)-stage move — the on-ramp, not the destination |
| "Never felt so far behind" | The [PBMM](/frameworks/product-builder-maturity-model) — the role is a climb, and no one is exempt from climbing |

## The Arc from Vibes to Specs

Karpathy coined the phrase that launched a thousand demos — and then described a world that quietly moves past it. Vibe coding is unmanaged: you prompt on feeling and copy-paste what looks right. Software 3.0, as he frames it, is the opposite discipline — *context management*, deciding precisely what the model should know and do. That is not vibes. That is specification.

This is exactly the arc our [Spec-Driven Development](/frameworks/spec-driven-development) analysis traces: vibe coding was the wave that proved the paradigm, and the crash that followed proved it needed structure. The coiner himself points beyond the coinage. The interesting question was never whether to prompt the model — it was how much of what you feed it should be a considered specification versus a hopeful vibe. Karpathy's Software 3.0 answers: as much as you can manage.

## What to Do With It

If the pioneers feel behind, deliberate climbing beats anxious scrambling. Locate yourself on the [Product Builder Maturity Model](/frameworks/product-builder-maturity-model), and treat "context management" as a skill to build on purpose — because the supervisor Karpathy describes is only as good as the specifications they hand down.
