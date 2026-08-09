---
title: 'Harnessed Agents: Field Notes from an AI Tinkerers Dinner'
subtitle: 'Twenty operators shipping agents to production, one theme: the bottleneck is not capability, it is control. Three things I brought to the table.'
description: "Notes from an off-the-record AI Tinkerers dinner in San Francisco on harnessing agents in production — three field answers on coding at scale without slop, deterministic guardrails for non-deterministic agents, and why releases beat rebuilding from spec."
date: '2026-08-07'
author: 'John Wang'
authorRole: 'Founder, ProductBuildersHQ'
references:
  - label: 'AI Tinkerers'
    url: 'https://aitinkerers.org'
  - label: 'AI Tinkerers — Building Software Factories dinner (April 2026)'
    url: 'https://sf.aitinkerers.org/p/building-software-factories-vip-dinner-with-kiro-b-capital'
  - label: 'CodeRabbit trial (plexusone/omnidevx-core PR #1)'
    url: 'https://github.com/plexusone/omnidevx-core/pull/1'
  - label: 'echartify — charts for agents'
    url: 'https://github.com/grokify/echartify'
  - label: 'structured-changelog'
    url: 'https://github.com/grokify/structured-changelog'
frameworks:
  - software-delivery-autonomy
  - loop-engineering
  - product-loop-builder-loop
tags:
  - harnessed-agents
  - backpressure
  - guardrails
  - quality-gates
  - opinion
---

On June 2nd I sat down to dinner in San Francisco with about twenty other people who ship agents into production. It was an [AI Tinkerers](https://aitinkerers.org) VIP dinner, and the theme was **Harnessed Agents**.

If you don't know AI Tinkerers: it is one of the few AI communities that gates on doing the work. No observers, no sales pitches, no slides — the room is operators only, and the guest list is curated around people actively shipping agentic systems into real environments, not demos and not prototypes. This particular dinner was small and off the record, sponsored by [Bright Data](https://brightdata.com), whose infrastructure a lot of agents lean on to read and act on the live web.

It was the second of these dinners I'd been invited to. The first, back in April, was ["Building Software Factories"](https://sf.aitinkerers.org/p/building-software-factories-vip-dinner-with-kiro-b-capital) with Kiro and B-Capital, and the two themes rhyme in a way worth noticing: that night the shared conclusion was that the model is no longer the bottleneck — the engineering system around it is. Harnessed Agents was the same realization aimed one level down, at the agents themselves. Twice now I've watched a room of production operators arrive, from different starting points, at the same place: the system around the model is the work.

Because it was off the record, I'm going to share my own positions and the questions that were on the table — not anyone else's words. But I can tell you the framing, because it is the whole reason I wanted to be there: raw model capability is no longer the bottleneck; control is. The teams winning right now are not the ones with the most ambitious agents. They are the ones who figured out how to put a harness on them.

That is the thesis I have been writing here under other names. The [coworker you govern](/perspectives/ai-coworker-not-exoskeleton). The backpressure that catches the machine so you don't have to. The [governor you build](/perspectives/frontier-builds-its-own-governor) when the coordination outgrows you. "Harness" is the same idea in a different coat, and there was something clarifying about walking into a curated room of production operators and finding it printed on the invitation. Here are three things I brought to the table.

## 1. Coding at Scale Without Drowning in Slop

The first question is the one everyone asks me once they hear the [numbers](/perspectives/frontier-builds-its-own-governor): at that volume, how do you keep AI slop from swallowing the codebase?

My honest answer doesn't just surprise people — it tends to alarm them: **I push millions of lines of code to GitHub without reviewing it.** I have watched accomplished engineers and CTOs hear that and react the way you would to someone admitting they don't wear a seatbelt, and one person at the dinner had exactly that reaction. So let me be precise about why I'm comfortable with it. At my scale there is simply too much code to read, and a human going through diffs line by line is exactly the bottleneck the harness is supposed to remove. What reviews the code is the harness — `golangci-lint` on every package, GitHub CodeQL for SAST, Dependabot for SCA and dependency bumps, and lately I'm trialing [CodeRabbit](https://github.com/plexusone/omnidevx-core/pull/1) as an AI review pass on top. A change that trips any of them never reaches a merge. That is backpressure doing the reading.

The alarm, I think, is an exoskeleton reflex. If you assume a human has to be the one catching every mistake, then unreviewed code is negligence by definition. But that is the [coworker-versus-exoskeleton](/perspectives/ai-coworker-not-exoskeleton) split showing up in the wild: I am not the reviewer of record — the harness is — and my job is to make it good enough that I don't have to be. [Steve Yegge](/signals/steve-yegge-gas-town) operates the same way and says so without apology. And I'll own the honest other half of it: this is partly an experiment. I genuinely want to know how much working, maintained code one person can push at scale with AI as the coworker, and the only way to find that ceiling is to run at it. So far the code works, it ships, and it holds.

And it holds for a concrete reason: the code is not floating free. Those hundreds of repositories are not loose ends — they are SDKs and libraries, built platform-style, and they roll up into a handful of capstone apps I actually run. [VisionStudio](/products/visionstudio) reads specs and execution state and pulls in [SCALE](/products/scale) metrics and token costs; [omniagent](https://github.com/plexusone/omniagent) wires LLMs, search, Twilio and Discord, and a browser UI together; [videoascode](https://github.com/grokify/videoascode) runs LLM, voice, and avatar pipelines end to end. And the layering is literal, not rhetorical. omniagent alone stands on 39 of my own internal libraries — 21 direct, the rest pulled in transitively — a number I read straight off VisionStudio's *Leverage Graph* report, under Maturity. The report ranks the other direction too: my base utility library, [mogo](https://github.com/grokify/mogo), is depended on 258 times across the fleet, the floor everything else is built on. An app, from the inside, is mostly my own SDKs, stacked. That is where the real review happens — not on diffs, but as acceptance testing at the app boundary, in production-level use, with me as the first user. A library can look green in isolation and still be wrong; the app is where wrong shows up. The diffs go unread. The apps do not.

So where does my human time actually go? Into the part the machine cannot own: **the shape.** I design interfaces — Go structs, JSON Schema, Zod schemas — because the contract is where a single decision compounds across a hundred call sites. And I treat dependency management as a first-class job: which library calls which, which code belongs in which package, where the seams go. At the service level I build modular monoliths on purpose — one deployable, clean internal boundaries — so I can split them later without paying the cost of distribution before I need it.

The pattern under all of it is the same: the machine fills the volume, I govern the shape. The diffs are the machine's. The interfaces are mine.

## 2. Guardrails for Things That Are Non-Deterministic by Nature

The second thread was the commercial one: how do you put guardrails on an agent so it does the expected thing, when the agent is non-deterministic by nature? In a demo, variance is charming. In production, variance is a support ticket.

One builder at the table put it cleanly — constrain the *output* to something deterministic, even when the agent's path to it is not. I have been converging on the same move from my own experiments, and the insight is that you don't have to make the whole agent deterministic; you usually can't. You make the *boundary* deterministic. Non-deterministic coming in, non-deterministic in the middle — but for a large class of use cases, a deterministic *out*.

Where I'm testing this concretely is [echartify](https://github.com/grokify/echartify), a library for agents to render charts on screen. The agent's reasoning about *what* to show is fuzzy and probabilistic; the chart it emits is a strict, validated spec that renders the same way every time. The determinism lives in the contract at the edge, not in the model. It is the same instinct as the schemas from the first note — pin the boundary hard, and you can let the middle be as probabilistic as it needs to be.

## 3. Why Keep the Code At All?

The third question was the most philosophical, and the one I disagreed with most usefully. Someone raised it: in a world where anything can be regenerated from a spec, why keep the code? Treat the implementation as disposable — hold the spec, throw the code away, rebuild it whenever you want.

As a backup posture, it's elegant. As a working practice, I wouldn't do it, and I said so. Rebuilding from spec is not free — it costs the build, and then it costs the *retesting and redebugging*, which is usually the expensive part. The code is not merely an output of the spec; it is where a lot of hard-won debugging is banked. Throw it away and you volunteer to pay that bill a second time.

Which is exactly why I push so many releases. **A release is a quality gate.** Cutting one means CI passed, the docs are current — README, CLAUDE.md, the MkDocs site, release notes — and the changelog is written. I keep that machine-readable: [structured-changelog](https://github.com/grokify/structured-changelog) holds a `CHANGELOG.json` that agents can write and read, and its `schangelog` binary generates the human `CHANGELOG.md` from it. That was one of the very first tools I built to scale — first release on January 3rd — precisely because releases were going to be my quality gate and I needed them cheap and consistent.

Now that every repo carries it, the releases have become a *measurement surface*. VisionStudio reads the conventional commits and changelog dates as a progress report — how much shipped, over what span, how many bugs fixed — alongside token cost. That ledger is exactly what I'd be tearing up if I treated code as disposable. And it matters most where rebuild-from-spec sounds worst: a simple API-backed CRUD microservice, sure, regenerate it cheaply. But the audio and video work and the desktop apps — [videoascode](https://github.com/grokify/videoascode), the [ElevenLabs](https://github.com/plexusone/elevenlabs-go) and [Deepgram](https://github.com/plexusone/deepgram-go) clients — carry real exploration and testing that no spec fully captures. You do not want to rediscover that twice.

## The Harness Is the Product

Three questions, and when I lay my answers next to each other they are obviously the same answer wearing different clothes. Backpressure that reviews the code so I don't. Deterministic contracts at the boundary of a non-deterministic agent. Releases that lock in validated state so nothing has to be rebuilt from scratch. Every one of them is a harness.

That is the through-line of everything I have been writing here. AI is a [coworker you govern](/perspectives/ai-coworker-not-exoskeleton), not an exoskeleton you wear. When governing outgrows you, you [build the governor](/perspectives/frontier-builds-its-own-governor). And at a dinner full of people shipping agents into production, the official theme turned out to be the same word by a different name. Capability stopped being the bottleneck a while ago. The teams that win from here are the ones with the best harness — and most of us, it turns out, are still building it by hand.

*A closing thank-you to Joe Heitzeberg, who founded AI Tinkerers and convenes these off-the-record practitioner dinners. Rooms like this one — operators only, no slides, no pitches — are rare, and they exist because Heitzeberg decided to build them and keep them honest. Thanks too to [Bright Data](https://brightdata.com) for sponsoring the evening and hosting it in their offices, gourmet chef and all — a fitting host for a night about harnessed agents, given how much of the live web those agents reach through their infrastructure. This is exactly the kind of informal, high-signal exchange the field needs more of.*
