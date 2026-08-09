---
title: 'Everyone at the Frontier Built Their Own Governor'
subtitle: "For most of this year, the tools to govern AI coding agents didn't exist yet — so the people pushing hardest built their own. Now the market is racing to catch up."
description: "Spotify built Honk. Steve Yegge built Gas Town. I built VisionStudio. The pattern is not vanity — when the tools to govern AI agents at scale did not exist yet, the frontier rolled its own, and the tool you ship is the one you build after the problem finally teaches you its shape. Now the market is catching up."
date: '2026-08-06'
author: 'John Wang'
authorRole: 'Founder, ProductBuildersHQ'
references:
  - label: 'Steve Yegge — Welcome to Gas Town (Jan 1, 2026)'
    url: 'https://steve-yegge.medium.com/welcome-to-gas-town-4f25ee16dd04'
  - label: 'gitscan (grokify/gogit)'
    url: 'https://github.com/grokify/gogit'
  - label: 'PlexusOne desktop app'
    url: 'https://github.com/plexusone/plexusone-app'
  - label: 'prism-build (execution engine)'
    url: 'https://github.com/ProductBuildersHQ/prism-build'
  - label: 'UiPath for Coding Agents (May 2026)'
    url: 'https://www.uipath.com/newsroom/uipath-for-coding-agents-launch'
  - label: 'AI Agent Orchestration Tools for Coding (Tembo, 2026)'
    url: 'https://www.tembo.io/blog/ai-agent-orchestration-tools'
frameworks:
  - software-delivery-autonomy
  - product-loop-builder-loop
  - loop-engineering
tags:
  - governor
  - tooling
  - visionstudio
  - backpressure
  - opinion
---

In the [companion piece](/perspectives/ai-coworker-not-exoskeleton) I argued that AI is a coworker you govern, not an exoskeleton you wear — and that governing is what lets one person run many agents at once. This is about what happens next: governing has its own ceiling, and when you hit it, you discover the tools to break through do not exist yet. So you build them. Nearly everyone serious about this does — and that turns out to be the tell of how new all of this really is.

## The Frontier Is Rolling Its Own

Look at who is doing the most interesting work with coding agents, and you find the same thing under the hood: a homegrown governor.

Spotify built [Honk](/case-studies/spotify-honk) — a background-agent system that has merged over 1,500 pull requests into production. Read past the headline number and Honk is not a smarter model; it is *governance infrastructure*: agents deliberately constrained to three tools, deterministic verification, and an LLM-as-Judge layer standing between agent output and the codebase. That is backpressure, built in-house, because nothing off the shelf did it.

Steve Yegge [built Gas Town](/signals/steve-yegge-gas-town) — he [wrote it up on January 1st](https://steve-yegge.medium.com/welcome-to-gas-town-4f25ee16dd04) — and has described it as his *fourth* run at orchestrating Claude Code — earlier attempts rewritten, some in different languages, before he settled on Go and shipped the one that stuck. The tool you release is rarely the first you build. It is the one you build after the problem has taught you its shape.

I built [VisionStudio](/products/visionstudio). Same story, smaller scale, and worth telling precisely because it rhymes with theirs.

## My Version, in Three Steps

By mid-year the scale had made the case on its own: roughly 8,900 commits and 640 releases across about 190 public repositories in six months, one person, [all of it on GitHub](https://github.com/grokify). The building was never what strained — the agents did that. The *coordinating* did. Release management across that many releases, and tracking initiatives that span a dozen repositories at once, is precisely the load no amount of typing speed relieves. It was a governing problem, and governing problems need governing tools.

I did not arrive at that tool in one jump; I tooled my way to it across the year, and each step taught me what the next one had to do.

In January I wrote a small CLI, [gitscan](https://github.com/grokify/gogit), that scanned every repository and flagged the ones with changes still to be pushed and released. Useful — and not enough, because knowing what *changed* is not the same as knowing what is *done*, or what comes *next*.

In March my [PlexusOne desktop app](https://github.com/plexusone/plexusone-app) became my coding console, driving development by managing many tmux sessions at once so I could keep a dozen agents moving in parallel. Closer — but still blind to the thing that actually governs an initiative: its state across repositories, what is finished and what is left.

So in July I built that too — an [execution-management engine](https://github.com/ProductBuildersHQ/prism-build) that read the [ROADMAP.md](/sdd/definition/pbhq-lite) checklist every repo carries — one of the four files I keep in every project precisely so a tool can read them all — and put them all in one interface. That was the piece that turned a pile of scripts into a governor.

Those three are the spine, but they were not the only tools — and the dates tell the real story. Alongside them came the release machinery: [structured-changelog](https://github.com/grokify/structured-changelog) in January, to make every release a legible quality gate, and [releaselog](https://github.com/grokify/releaselog) in February, once releases were coming fast enough to be worth logging. None of it was tooling for its own sake. Every piece existed to keep [PlexusOne](https://plexusone.dev) moving, and each arrived exactly when the ecosystem's own acceleration demanded it — the tool timeline is a shadow of the release cadence it was built to serve. As PlexusOne sped up, the governors appeared one rung at a time: detect changes, gate releases, log them, run parallel sessions, then manage execution across the fleet.

## The Spec Problem Underneath

Here is the part I did not expect. VisionStudio already existed as a spec-management concept — authoring and evaluating specifications — and I barely used it. Not because specs did not matter; I was already writing them across dozens of repositories and I knew they did. The problem was that I had never settled how to *manage* them at fleet scale — where a PRD lives, which repos even have specs, how a tool finds them across a hundred projects. Specs without an enforced layout are just scattered files.

What the execution component brought was that structure. Its engine is a DoltDB database — a versioned, centralized store with a registered list of every repo and project — and centralizing that state is what finally let me *enforce* consistency: the same [four files](/sdd/definition/pbhq-lite) in the same place in every repository.

## One Identifier, Two Jobs

The unlock was small and specific. I had been laying specs out under a hand-invented slug — `docs/specs/features/{feature-slug}/` — and inventing that slug was its own little tax, paid a hundred times over. When the database began minting an **initiative ID** for tracking — the key it used to tick ROADMAP items off — that same ID became the address: `docs/specs/initiatives/{initiative-id}/`. One identifier did two jobs at once: it tracked the work, and it placed the specs. Path creation stopped being a decision and became a lookup, and the naming overhead vanished.

Only once specs had that enforced, discoverable home did spec management become real — and combining it with the definition side in one interface is what made VisionStudio a tool I could not work without. gitscan told me what changed; VisionStudio tells me where things stand *against what was supposed to happen*. The lesson was not that specs lacked value; it is that value stays illegible across a fleet until a registry holds it. Definition needed execution's backbone. Neither half is enough alone — and I learned that the hard way, in my own tools, before I ever wrote the thesis down.

## Why Everyone Ends Up Here

The goal was never to build faster — coding is solved. It was to raise the ceiling on how many governed initiatives one person can run at once: to scale governance itself. I am aiming at ten times the production I can prove today, and there is no reaching that by hand. You break a governance ceiling with a governance tool.

And that is why the pattern repeats. Honk, Gas Town, VisionStudio — none of these are the product their builders set out to make. They are the *governors* those builders had to construct on the way, because the capability of the agents ran out ahead of the tooling to govern them, and it still does. When the road is that new, the people furthest down it are the ones paving. Yegge's fourth rewrite is not an anecdote; it is the shape of the whole moment. The tool you keep is the one you build after the problem has finally taught you what it is.

That no longer means you have to write one from scratch — and this is the part that changed under my feet while I was writing it. When I hit the ceiling, there was genuinely nothing to buy; the governors were the private tooling of whoever had gotten far enough to need them. That is no longer true. In the first half of 2026 the category arrived on the market: UiPath shipped [UiPath for Coding Agents](https://www.uipath.com/newsroom/uipath-for-coding-agents-launch) in May, billed as an industry first, to "deploy, operate, and govern" coding agents; [OpenAI's Codex](https://openai.com/index/gartner-2026-agentic-coding-leader/) grew approval gates, RBAC, and auditable governance; Google, Salesforce, and others rolled out orchestration-and-governance stacks of their own. The governors are also escaping their authors as open source — [VisionStudio](/products/visionstudio) is open source, [Gas Town](/signals/steve-yegge-gas-town) is open source. Borrowing one someone else already hardened is now a perfectly good move, often the smart one.

So the honest update is not "build your own or lose." It is narrower and, I think, more useful. What is for sale is aimed squarely at the enterprise — priced and scoped for orgs, not for one builder running two hundred personal repos. And the specific problem this piece is about — spec and execution state reconciled across a whole fleet — is [still the unaddressed gap](https://www.tembo.io/blog/ai-agent-orchestration-tools): when the work spans services and the specs have to evolve alongside the code, manual reconciliation is still the bottleneck no off-the-shelf tool removes for you. That is exactly the seam I ended up paving myself, and it is still open.

The point was never the building for its own sake; it is refusing to run ungoverned. If you are pushing agents hard enough to hit the governing ceiling, do not wait — buy a governor if one fits, adopt an open one if it is closer, and build the missing piece yourself only where nothing reaches yet. Right now, at this frontier, getting a governor around your agents — bought, borrowed, or built — *is* the work.
