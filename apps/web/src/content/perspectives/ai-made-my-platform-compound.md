---
title: "AI Didn't Make Me Type Faster. It Made My Platform Compound."
subtitle: 'A year of building, read off my own instrumentation — and the number that shows what actually changed: not lines written, but how deeply I now build on my own work.'
description: "A year of AI product-building, read off my own VisionStudio instrumentation. The real change AI made was not speed or lines of code — it was leverage: apps that now compose dozens of my own internal libraries, a depth of reuse that only became feasible with an agent as coworker. With the full Leverage Graph, and an honest ledger of what the numbers do not flatter."
date: '2026-08-07'
author: 'John Wang'
authorRole: 'Founder, ProductBuildersHQ'
references:
  - label: 'grokify/mogo — the base utility library'
    url: 'https://github.com/grokify/mogo'
  - label: 'plexusone/omniagent'
    url: 'https://github.com/plexusone/omniagent'
  - label: 'plexusone/omnillm-core — a user asks me to go market it (issue #35)'
    url: 'https://github.com/plexusone/omnillm-core/issues/35'
  - label: 'structured-changelog'
    url: 'https://github.com/grokify/structured-changelog'
  - label: 'grokify/gogithub — the open-source GitHub analysis tooling'
    url: 'https://github.com/grokify/gogithub'
  - label: 'PlexusOne Release Log — 449 releases (live)'
    url: 'https://plexusone.dev/releases/'
  - label: 'grokify/releaselog — the tool that renders the Release Log'
    url: 'https://github.com/grokify/releaselog'
frameworks:
  - product-loop-builder-loop
  - software-delivery-autonomy
  - five-ps
tags:
  - leverage
  - measurement
  - visionstudio
  - platform
  - opinion
---

The received wisdom about AI and code is that it makes you *faster* — more lines, more commits, more output per hour. That framing is exactly why the volume alarms people, and it is also, I think, the wrong lens. I have a year of my own building instrumented well enough to say what actually changed, and it was not typing speed. It was leverage.

Here is the claim, and there is a number behind it I can show you: **consuming a few popular libraries has always been normal; consuming a *lot* of my own internal libraries is new, and it only took off with AI product-building.** AI did not make me type faster. It let a platform I had already built finally compound.

## The Number That Actually Changed

VisionStudio keeps a report it calls the *Leverage Graph*, under Maturity. It reads every repository in my fleet and maps the internal dependency structure in two directions: which of my libraries are most depended upon, and which of my apps depend on the most of them.

Run it, and the shape of the change is obvious. The foundation — the most-leveraged libraries — I built the slow way, over years, before AI-assisted coding existed. The apps at the top of the *consumer* list did not, and could not, exist in that form before. An application that composes thirty-nine of your own libraries is not something you hand-assemble in a pre-AI workflow; the integration cost alone would sink it. With an agent as the coworker, that cost collapses, and deep internal reuse becomes the default instead of the exception.

## The Leverage Graph

**Top Leveraged — my most depended-upon libraries** (internal dependents across the fleet):

| # | Library | Dependents |
|---|---|---|
| 1 | grokify/mogo | 258 |
| 2 | grokify/gocharts/v2 | 76 |
| 3 | grokify/goauth | 73 |
| 4 | grokify/base36 | 56 |
| 5 | grokify/sogo | 54 |
| 6 | plexusone/omnillm-core | 33 |
| 7 | grokify/oscompat | 28 |
| 8 | plexusone/omniskill | 23 |
| 9 | plexusone/omni-google | 21 |
| 10 | plexusone/omnivoice-core | 21 |

The top of that list is pre-AI. [mogo](https://github.com/grokify/mogo) — my base Go utility library — along with `gocharts`, `goauth`, `base36`, `sogo`, and `oscompat`, is foundation I wrote and hardened the slow way, and the fleet leans on it 258, 76, 73 times over. The `omni-` entries below them are the AI era: the LLM, skill, voice, and Google libraries that became the raw material for agents.

**Top Consumers — my apps by internal dependency count:**

| # | Repo | Internal deps |
|---|---|---|
| 1 | grokify/grokify-omniagent&nbsp;\* | 45 (7d / 38i) |
| 2 | plexusone/omniagent | 39 (21d / 18i) |
| 3 | plexusone/omniagent-starter | 36 (7d / 29i) |
| 4 | plexusone/agentos | 27 (3d / 24i) |
| 5 | plexusone/agent-team-stats | 21 (10d / 11i) |
| 6 | plexusone/agentcomms | 19 (6d / 13i) |
| 7 | grokify/videoascode | 19 (6d / 13i) |
| 8 | plexusone/omni-livekit | 19 (8d / 11i) |
| 9 | plexusone/omniagent-panel | 18 (6d / 12i) |
| 10 | plexusone/agentkit | 16 (8d / 8i) |

<small>*d* = direct dependency, *i* = indirect (pulled in transitively). \* `grokify-omniagent` is private — it leverages [omniagent](https://github.com/plexusone/omniagent) and adds a set of private skills.</small>

Every repo on the consumer list is AI-era. Consuming a handful of popular libraries was always possible; consuming *dozens of my own* — 39 here, 45 there, most of them pulled in transitively through other libraries I also wrote — is the thing that simply did not happen before. It is the truest measure I have of what AI changed.

## How the Platform Formed

You can even date the pivot — every one of these repos carries a `CHANGELOG.json`, so the timeline is exact. The agent libraries came first and stood on their own for months: [OmniLLM](https://github.com/plexusone/omnillm-core) on August 25, 2025, [OmniSerp](https://github.com/plexusone/omniserp) on September 18, [OmniVoice](https://github.com/plexusone/omnivoice-core) on December 28. They grew out of classes I was taking on multi-agent systems — CrewAI, Microsoft AutoGen — whose multi-LLM and multi-search machinery I wanted in Go; each was a standalone port, released and used on its own. OmniAgent did not come until much later. When I wrote it — first release February 22, 2026, a Go take on the OpenClaw agent — an app pulled those libraries in as direct dependencies and made them work as one for the first time. That is where the consumer pattern took hold: an application ambitious enough to be worth consolidating a platform beneath it. omniagent's 39 internal dependencies are the direct result, and the ecosystem accelerated from there.

The strategy followed the structure. Rather than maintain a scatter of standalone libraries, I now drive a few *keystone* apps — OmniAgent, [videoascode](https://github.com/grokify/videoascode), VisionStudio — and factor everything reusable out beneath them as separate libraries. The apps are where acceptance testing and direction live; the libraries are where leverage accumulates. And the keystones are already outgrowing their origins: OmniAgent began as a clone but is breaking from it now, adding a multi-user team database and UI where the original is single-user. You clone to learn the shape, then diverge where your needs differ — which is exactly the climb from library to app to product this essay is about.

And the leverage pays off sideways, across the keystones, not only within them. [videoascode](https://github.com/grokify/videoascode) actually shipped first — February 9 — drawing on a different slice of the platform than OmniAgent did. But the slices converged. [elevenlabs-go](https://github.com/plexusone/elevenlabs-go) and omnivoice, the voice clients I built so agents could hear and speak in real time, are exactly what videoascode needs to narrate a presentation offline; [heygen-go](https://github.com/plexusone/heygen-go) and omniavatar, built to render avatars for batch presentation, run just as well in live mode inside OmniAgent. One project is real-time and the other is offline batch, but they lean on the same vendors and the same underlying technology, so a capability written for either becomes a capability for both. That is leverage compounding sideways: a library earns its keep twice, in two execution models it was never written specifically for.

## The Foundation Predates the Assist

It matters that the base of the graph is old. The most-leveraged libraries — [mogo](https://github.com/grokify/mogo), gocharts, and goauth — were designed, used, and hardened long before an agent ever wrote a line for me; the oldest by more than a decade. AI did not hand me that judgment; it let a platform I had already earned finally compound.

This is the honest answer to anyone who reads the volume as a lack of discernment: the discernment is in the foundation, and the foundation was built the slow way. What AI added was the ability to *stack* on it at a depth that used to be uneconomical.

## Why Go, Against the Python Grain

The AI ecosystem is mostly Python, and I build my agent stack in Go anyway. That is not contrarianism for its own sake; it is the one strong opinion I hold that was paid for entirely in production scars.

Before any of this, I ran production sites in dynamically typed languages — Ruby, PHP, Perl — mostly on hosted servers, maintaining interpreters and sprawling dependency trees across machines that did not want to cooperate. I did not want to keep doing it. So I moved to Go and began publishing public libraries in 2015: [mogo](https://github.com/grokify/mogo), the one the whole platform now leans on 258 times, has its [first commit dated February 12, 2015](https://github.com/grokify/mogo/commits?author=grokify&since=2015-02-12&until=2015-02-13), verifiable on GitHub. A single static binary, a compiler that refuses to ship a broken interface, no interpreter to babysit in production — that is the environment I wanted, and I built toward it for years before it ever mattered for agents.

And this is not an old grudge I have stopped testing. I use Python where it fits — for machine learning, most recently — so the preference is not reflexive. But even that recent turn confirmed it: the ML ecosystem pins you to an older Python interpreter, held back from the latest release by the risk of breaking changes downstream, and living inside that constraint is exactly the ongoing friction I left dynamic languages to escape. Go inverts the cost curve. You pay the investment once, up front — in types, interfaces, and a compile step — and it stays paid, instead of taxing every day of development and operations at scale. Friction you settle once beats friction you re-pay forever.

There is a framing I keep returning to — [noted on my About page](/about) — that AI can write the code and the commands but cannot supply *taste*, opinion formed by experience, or *discernment*, expertise built by practice. My preference for a statically typed, compiled fleet is exactly those two. The taste is the opinion I formed running production the hard way; the discernment is knowing first-hand what dynamic interpreters and unbounded dependency trees cost you at scale. It is also why I will pour millions of lines of effort into a Go agent ecosystem when the easy path is Python: I have lived the other pain, and I am not volunteering for it again. That solo-founder production experience is not a footnote to PlexusOne — it is the reason PlexusOne is built the way it is.

## Why This Is the Opposite of Slop

There is a reflex — I met it again at a recent [dinner of production operators](/perspectives/harnessed-agents-ai-tinkerers-dinner) — that reads high volume as recklessness. But recklessness does not produce a table like this. Slop cannot tell you what depends on what.

And a graph this deep does not hold together by luck. Nearly all of it is statically typed — Go first, then TypeScript and Swift — so the compiler checks the entire composition on every build: when a library many layers down changes an interface, the build breaks before anything ships. These repos also release *often* — a release is a gate, since CI has to pass to cut one — and the cadence is public: PlexusOne keeps a live [Release Log](https://plexusone.dev/releases/) counting 449 releases between late August 2025 and July 2026, rendered by [`@grokify/releaselog`](https://github.com/grokify/releaselog), a package I also published. Deep internal reuse would be reckless in a dynamically typed, rarely released pile; it is the opposite in a statically typed fleet that publishes constantly. Dozens of composed dependencies that compile, pass CI, and ship on a cadence is not a description of slop. It is a description of a system holding.

The whole reason I can show you these numbers is that the output is *instrumented*. VisionStudio reads the dependency graph, scores each repo on a report it calls **SCALE Platform** — after the [SCALE](/products/scale) framework: Standards, Consumption, Automation, Leverage, Effectiveness — and tracks progress, bugs fixed, and token cost off the conventional commits every repo writes through [structured-changelog](https://github.com/grokify/structured-changelog). Measurement is the opposite of spraying code and hoping. If I could not read the fleet, I would not trust it — and I would be right not to.

## You Don't Have to Take My Word for It

Here is what I think actually separates this from most writing about AI and code: it is *auditable*. Most claims in this space come from behind a private repository — "we shipped this, our agents do that" — and you are asked to believe them. Nearly everything I have described is open source. The repositories are public; the commits, releases, and changelogs are public; the dependency edges the Leverage Graph counts are sitting right there in the `go.mod` files. VisionStudio is my lens on that data, but neither the data nor the *method* is mine to spin: the analysis tooling is open source too. [gogithub](https://github.com/grokify/gogithub), and its `profile` package, is what reads a GitHub account's repositories and activity into numbers like these — and I publish it. So you can clone the fleet and recompute the graph yourself, with my own tools if you like, rather than take my rendering of it. The one private exception, `grokify-omniagent`, I have flagged as such.

That is a deliberate stance, not an accident of workflow. I build in the open in part so that when I report what AI is doing to how one person builds, it is a measurement anyone can check rather than a story anyone has to trust. This is the rarer thing I can offer: not louder claims, but claims with their receipts attached. In a field this new, that should be the price of admission for saying anything at all.

## The Cost Is Time — the Platform Bet

None of this is free, and the bill comes due in the one currency I cannot instrument away: time. Every startup lives some version of the **Platform-versus-Feature** tension — Platform versus Product, if you prefer — the pull between building reusable infrastructure and just shipping the app in front of you. Most teams resolve it toward the feature: build the product, rebuild the next one from scratch, never pay down the duplication. It ships sooner. It also compounds nothing.

I resolved it the other way, deliberately — and not because I can't ship fast. My first [Lovable](https://vibeflux.dev/) app, [vibeflux](https://vibeflux.dev/u/grokify/n/vibeflux-v10-release-notes-vibed-in-6-hours), I vibed in six hours after dinner on a Wednesday in July 2025. Features are cheap now; that is the whole premise. But I chose to spend my scarce part-time hours on the platform instead, because I believe in DRY and I have spent ten years as a platform product manager — reuse is the bet I actually trust. The cost of that choice is written into my own timeline: only now, after all these libraries, am I getting to run my own apps on top of them. The platform came first and the products came late, on purpose.

That is the trade the Leverage Graph is quietly reporting. When the apps arrive, they arrive standing on thirty-nine libraries, not on scaffolding I will throw away and rebuild next quarter. I bought compounding with time — and whether that was the right price is something only one number can finally settle.

## The Honest Ledger — Including What It Doesn't Flatter

The same instrumentation that shows leverage also shows what I have not done. Internal leverage is high; external *adoption* is not. [omnillm-core](https://github.com/plexusone/omnillm-core/issues/35) has five stars — and a user who filed an issue, came back months later, and told me, kindly, that it was a shame such a library had so little traction and that I ought to post it somewhere for reach. I still have not. I am spending the attention on building the capstone apps and the climb from SDKs to a real SaaS instead of on going to market.

Low stars, here, are a choice — but I am not going to pretend the ledger flatters me everywhere. There is one number the Leverage Graph cannot show me yet, and by my own [Five Ps](/frameworks/five-ps) it is the only one that finally counts: revenue. Everything above is the road to it, measured. It is not the destination.

## What a Year Actually Produced

So when people ask what a year of AI product-building actually produced, I don't reach for the commit count anymore. I reach for the graph. AI is a [coworker you govern](/perspectives/ai-coworker-not-exoskeleton); when governing outgrows you, you [build the governor](/perspectives/frontier-builds-its-own-governor); and the governor's best trick is that it makes the work *legible* — leverage, maturity, cost, all readable off your own fleet.

The gift was never speed. It was that a platform I spent years building could finally compound, and that I can prove it did. The lines of code were never the point. The leverage is.

And the deepest compounding is the one you are reading. This essay — and much of what I publish at ProductBuildersHQ — developed out of the building itself, mostly in the run of velocity that began around December 2025. Without the practice inside [PlexusOne](https://plexusone.dev), there would be nothing to report and no vantage to report it from. The platform did not only compound into apps. It compounded into perspective.
