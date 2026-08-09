---
title: 'AI Is a Coworker, Not an Exoskeleton'
subtitle: 'The exoskeleton makes you a stronger individual contributor. The coworker makes you a company of one.'
description: "Ben Gregory says AI is an exoskeleton, not a coworker. For the ProductBuilder it is exactly backwards — and the difference decides whether you can ever scale past your own two hands."
date: '2026-08-07'
author: 'John Wang'
authorRole: 'Founder, ProductBuildersHQ'
references:
  - label: 'Ben Gregory — AI as Exoskeleton (Kasava)'
    url: 'https://www.kasava.dev/blog/ai-as-exoskeleton'
  - label: 'Hacker News discussion'
    url: 'https://news.ycombinator.com/item?id=47078324'
  - label: 'Lucas F. Costa — Backpressure Is All You Need'
    url: 'https://www.lucasfcosta.com/blog/backpressure-is-all-you-need'
  - label: 'Siddhant Khare — Why Your AI Agent Keeps Failing'
    url: 'https://siddhantkhare.com/writing/why-your-ai-agent-keeps-failing'
frameworks:
  - five-ps
  - product-loop-builder-loop
  - software-delivery-autonomy
tags:
  - exoskeleton
  - agent-governor
  - backpressure
  - opinion
---

Ben Gregory has a piece making the rounds — ["AI Is an Exoskeleton, Not a Coworker"](https://www.kasava.dev/blog/ai-as-exoskeleton) — and on [Hacker News](https://news.ycombinator.com/item?id=47078324) it clearly struck a nerve. I think it is backwards. Not wrong for everyone — backwards for the role I care about. AI *is* a coworker. It is not an exoskeleton. And which metaphor you pick decides whether you can ever scale past your own two hands.

Let me start where Gregory and I agree, because it is most of the way. Boris Cherny, who runs Claude Code, says coding is practically solved. For me, it essentially is. In the first half of this year I shipped roughly 8,900 commits and 640 releases across about 190 public repositories — one person, [verifiable on GitHub](https://github.com/grokify). That is not a number I could have typed. More to the point, it is not a number *one person moving faster* could reach at all. It is the output of many agents running at once, each held to a standard. Parallelism, not speed.

And here is the part I want to say plainly: **none of that output is the point.** Eight thousand commits is cheap. When building is cheap, [only results are scarce](/frameworks/five-ps) — and a pile of libraries is not a result. It is a road.

So the real question is not how much you can build. It is: when coding is solved, what is your relationship to the machine that solved it?

## The Exoskeleton Keeps You the Bottleneck

Gregory's answer is the exoskeleton. You wear it. You are still the one doing the work — you can just do dramatically more. As he puts it, "the human is still doing the work, they're just able to do dramatically more." That is a genuinely good answer for an individual contributor. It keeps you in control and amplified.

It also keeps you the bottleneck. An exoskeleton multiplies one body: you are stronger, but there is still one of you, doing one thing at a time. *The human is the backpressure* — every unit of work waits on you to move it forward. You have raised your ceiling. You have not changed its nature.

## The Coworker Runs in Parallel

My answer is the coworker, and I mean something specific and arithmetic. A coworker is different in kind, not degree. You do not move faster; you run more workers. The agent does the building — many agents, at once — and I govern them: I write the acceptance tests, I set the gates, I decide what merges. I am not typing. I am managing output I accept or reject.

That is the whole difference, and it is not subtle. **An exoskeleton makes you a stronger individual contributor. A coworker makes you a company of one.** One is a bicep; the other is an org.

The mechanism that makes it hold is [backpressure](https://www.lucasfcosta.com/blog/backpressure-is-all-you-need) — a systems idea Lucas Costa and [Siddhant Khare](https://siddhantkhare.com/writing/why-your-ai-agent-keeps-failing) have both written about well. In systems engineering, backpressure is how a downstream stage tells an upstream one to slow down. Applied to agents, it is the stack of automated gates — tests, linters, review agents, planning checks, CI — that force the machine to meet a standard before its work reaches me. Costa's line is the whole argument in a sentence: *any system that relies on a human to catch the machine's mistakes will be limited by the human, not the machine.*

## The Gates Do the Reading

"But you still review every diff," the objection goes, "so you are the bottleneck too." No — that is the exoskeleton talking. I do not read everything. I read what the gates escalate.

That distinction is not a slogan; it is infrastructure I had to build. Early on I ran CI by hand, one pipeline per repository, copy-pasted and quietly drifting out of sync. It did not survive contact with scale — past a few dozen repos, maintaining the gates was itself a full-time job. So I centralized them. The pipelines now live in a single shared [`.github`](https://github.com/grokify/.github/tree/main/.github/workflows) repository whose reusable workflows every other repo inherits. Build the backpressure once; it holds across the whole fleet. When an agent opens a pull request, those shared gates run before I ever look — build, tests, linters, a review pass — and a red check bounces the work back to the agent without spending a second of my attention. What reaches me is what already survived. That is the coworker model in one image: the gates do the first reading, so the human does the deciding.

## The Agent Governor

Gregory is right about one real risk: an agent with no context hallucinates and disappoints. But the fix is not to shrink back into the exoskeleton and do the work yourself. The fix is to become the **Agent Governor** — supply the context the machine lacks, set the acceptance criteria, build the gates. A coworker you govern is neither the autonomous agent Gregory warns against nor the exoskeleton that caps you at your own speed. The [vibe coder](/signals/boris-cherny-coding-is-solved) fails precisely because there is no governor and no backpressure: plausible slop, no gates, and it falls apart the moment it has to scale. I do not fail there — not because I out-type the agent, but because I govern it.

And look at what governing actually is, act by act. You onboard the worker with context. You set expectations as acceptance criteria. You review the work at the gates. You decide what merges. That is not coding — that is **management**, and it is the native language of the product side. An exoskeleton has no management relationship at all; you just wear it. A coworker has nothing but. Which is why I can work this way from where I sit: the job is to manage the worker, not to beat it at typing. You need enough fluency to set good gates. You do not need the fastest hands in the room.

## Governing Has Its Own Ceiling

Governing is not free, and it is not infinite. Past enough parallel work, the coordination becomes the new bottleneck — release management across hundreds of releases, tracking initiatives that span a dozen repositories at once — and it maxed me out. Not on ideas, and not on code: on the governing itself. So I built a governor for it. It turns out nearly everyone pushing at this frontier has built one too — Spotify a background-agent fleet, Steve Yegge his orchestrator, me mine. That is [its own story](/perspectives/frontier-builds-its-own-governor).

## The Road, Not the Destination

Which brings me back to the road. Those 190 repositories are SDKs, libraries, and MCP servers — infrastructure. Real as it is, none of it is the destination. The target after it is a one-person SaaS with real revenue, and that is when the [ProductBuilder](/frameworks/product-loop-builder-loop) story becomes real for me — not the commit count, not the release count. The profit. A company of one reaches profit because it is an org, not because it is a stronger arm.

And you cannot get there in an exoskeleton. An exoskeleton makes one person a stronger individual contributor. It does not make one person a company. For that you have to stop wearing the machine and start managing it — many of them, under gates you built, pointed at a result only you can choose.

AI is a coworker. Govern it like one.
