---
title: 'Boris Cherny: "Coding Is Solved," and Engineering Merges Into Product Building'
subtitle: 'The head of Claude Code uninstalled his IDE — what that means, and the one word he is assuming: governance'
description: "Boris Cherny says coding is practically solved and that engineering roles will merge into generalist product builders — the ProductBuildersHQ thesis, from the person who built the tool doing the solving. But 'solved' quietly assumes you can still govern the output, which reframes the two paths to Product Builder."
date: '2026-08-07'
author: 'Boris Cherny'
authorRole: 'Creator and head of Claude Code, Anthropic'
sources:
  - label: 'Head of Claude Code: What Happens Next — Lenny''s Newsletter'
    url: 'https://www.lennysnewsletter.com/p/head-of-claude-code-what-happens'
  - label: 'Boris Cherny interview takeaways — WorkOS'
    url: 'https://workos.com/blog/boris-cherny-claude-code-acquired-interview-takeaways'
frameworks:
  - product-builder-maturity-model
  - loop-engineering
  - product-loop-builder-loop
tags:
  - coding-is-solved
  - loop-engineering
  - product-builder
  - governance
  - market-signal
---

## What Boris Cherny Said

The creator and head of Anthropic's Claude Code says that, for him, "coding is practically solved." He uninstalled his own IDE — one hundred percent of his code is now built through automated workflows. He popularized **loop engineering**: instead of prompting an agent, you write loops that prompt the agent, so the system diagnoses, builds, and deploys with no human writing code. And he makes the prediction that matters most here: the job title "software engineer" is on the way out, and engineering roles will merge into generalist **product builders**.

## Why This Is a Signal

This is not an outside observer forecasting the future. It is the person who built the tool doing the solving, describing the role it produces — and the role he names is the one this entire site is built around. "Engineering merges into product builders" is the [ProductBuildersHQ headline](/), stated by the head of Claude Code.

His "loop engineering" is also, almost verbatim, a framework we already maintain: [Loop Engineering](/frameworks/loop-engineering) systematizes exactly the practice he describes — "my job is to write loops" — into the REAL/VEAL patterns for production agent systems. When a practitioner's offhand method already matches your framework's name, the framework was reading the terrain correctly.

## The Mapping

| Cherny | Where it lands in the system |
|--------|------------------------------|
| "Engineering roles merge into generalist product builders" | The [ProductBuilder](/frameworks/product-builder-maturity-model) — the converged Level 5, said by the head of Claude Code |
| "My job is to write loops" | [Loop Engineering](/frameworks/loop-engineering) — the framework that systematizes the practice |
| Uninstalled the IDE; 100% automated workflows | High on the [autonomy ladder](/frameworks/software-delivery-autonomy) — the human governs, no longer types |
| "Coding is practically solved" | When building is cheap, only [results](/frameworks/five-ps) are scarce — the build stops being the moat |

## "Coding Is Solved" — For Whom?

Here is the word underneath Cherny's sentence that nobody says out loud: **governance**.

Notice who declares coding solved — Cherny, Yegge, Karpathy. All of them are engineers. That is not a coincidence, and it is not humility failing them. They can say coding is solved precisely because they can still *read, evaluate, and govern* what the model produces. "Solved" never meant the skill vanished. It means the skill moved — from writing code to governing the machine that writes it.

That reframes what "solved" means for the person who cannot govern. A product manager who "left engineering to get away from coding" — a common and, until now, entirely reasonable Silicon Valley trajectory — cannot tell a good implementation from a plausible-looking broken one, cannot catch the security hole, cannot judge whether the architecture will survive contact with scale. For them, coding is not solved; it is invisible, which is worse. "Coding is solved" is an engineer's sentence, and it quietly assumes a reader who retained the fluency to check the AI's work.

## The Two Paths Are No Longer Symmetric

The [Product Builder Maturity Model](/frameworks/product-builder-maturity-model) has always shown two on-ramps — a PM path and an Engineer path — converging at Level 5. In the AI era they still converge, but they are no longer symmetric at the step that now matters most.

The Engineer path's advantage is exactly the skill Cherny calls obsolete. Governing an AI that writes the code *requires being able to evaluate code* — so the engineer who keeps their hands in it is not clinging to a dying craft; they are holding the one credential that lets them run the loop. The Product path's risk is the de-technicalized PM: excellent at deciding what to build, unable to verify how it was built. In a pre-AI world that was fine — you delegated the "how" to engineers. In an AI world, the thing you delegate to is the AI, and there is no one else to govern it. You must.

This is not "engineers win." The Engineer path still has to acquire the harder-to-teach half — product judgment, the sense of what is worth building at all. And the PM path brings a real advantage that Andrew Ng named precisely: a **context advantage**, the ability to synthesize user feedback, business constraints, and lived experience into guardrails for the agent. Taste decides what to build; context explains why; governance verifies how. A Product Builder needs all three. Cherny's "coding is solved" is a reminder that the third one — governance — is not optional, and that the common move of abandoning code to "escape it" quietly forfeits the role.

The asymmetry cuts both ways, and having crossed the boundary from engineering into product himself, ProductBuildersHQ's founder names the engineer's mirror gaps bluntly. If governance is the engineer's structural edge, knowing *what* to build and *growing* it are their structural blind spots. The engineer-turned-solo-builder tends to ship hobby apps rather than businesses — well-made answers to questions no market asked — and then watches them not grow, because a hobby app has no distribution and no reason to spread. The Lovable community shows the mirror image just as plainly: product people who vibe-code a revenue-earning app and then come looking for engineering help the moment it has to scale. Each on-ramp arrives with one half and hits a wall at the other's strength — the engineer can build it right but struggles to know what is worth building or how to make it grow; the product person knows what is worth building but stalls when it has to be built to last. That is exactly why the Product Builder sits at the *convergence* — Level 5 — and not at either endpoint: the role is defined by closing both gaps, and neither path starts there.

The practical advice falls out cleanly. If you come from engineering: keep coding while you build product judgment — your fluency is an asset, not baggage. If you come from product: do not let the code atrophy. In the age of the agent, staying close to the code is not nostalgia. It is how you keep your hands on the wheel.

## What to Do With It

Find your path on the [maturity model](/frameworks/product-builder-maturity-model) and be honest about which half you are missing. Engineers: the missing half is usually product judgment and outcome ownership. Product managers: the missing half is increasingly the fluency to govern what the agent ships. "Coding is solved" is true — for the people who can still tell whether it was solved correctly.
