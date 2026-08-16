---
title: "The App Reality Ladder"
subtitle: "Concept, Demo, Proof-of-Concept, Prototype, Production — What an Artifact Actually Proves"
description: "A five-rung claim-strength ladder for AI-era software artifacts. When AI makes everything look real, the label on an app must say what it proves — not what it resembles."
version: "v1.0"
date: "August 2026"
levels: 5
provenance: "original"
tags: ["app-reality", "prototype", "proof-of-concept", "demo", "ai-native", "vibe-coding", "evidence"]
---

Ask an engineer what a prototype is and you'll hear: *a working system with the intended experience — the thing you build after the proof-of-concept shows the hard part is possible.* Ask an AI-era product manager and you'll hear: *the thing I made in Lovable this afternoon.* Both are using the word correctly within their own culture. Neither means the same artifact. And the gap between those two meanings is now where products die.

Here is what changed. Making software *look* real used to be expensive, so appearance was a reliable proxy for reality — if the screens worked, someone had built the plumbing. AI severed that link. A convincing, clickable, deployed-to-a-URL application is now minutes of work, which means **appearance carries almost no information**. The scarce, decision-relevant signal is what the artifact *proves*: what has actually been validated, against real data, under real constraints, in front of real users.

> When anything can look real, the label must say what's proven.

The App Reality Ladder is a five-rung vocabulary for that. It grades artifacts by **claim strength** — the evidence standing behind them — not by fidelity of appearance. Its job is to make "what is this thing, really?" answerable in one word, so that a decision gate is never fooled by a Concept wearing a Prototype's clothes.

---

## The Ladder

| Rung | Name | What it proves | What it cannot prove |
|------|------|----------------|----------------------|
| **R1** | **Concept** | The idea can be *communicated* — sketches, mockups, a written narrative, a static wireframe. Nothing executes. | That anyone wants it, that it can be built, that it works. |
| **R2** | **Demo** | The *experience* can be simulated — interactive, clickable, hardcoded data, no real backend. A facade that tests **desirability**: will anyone care? | That the system behind the screens can exist. Every hard problem is still ahead. |
| **R3** | **Proof-of-Concept** | The *risky part* actually works — a vertical slice against real data, real APIs, real constraints. Tests **feasibility**: can we build it? Ugly is fine; ugly is the point. | That the whole experience holds together, or that anyone can operate it. |
| **R4** | **Prototype** | The system *works end-to-end with the intended experience* — real functionality and real UX, short of operational hardening. | That it survives real users, real load, real time. |
| **R5** | **Production** | It *runs* — operated, monitored, in the hands of real users, with someone on the hook when it breaks. | That it matters. Results — adoption, revenue, retention — are a different ladder's job. |

Each rung answers one gate question:

- **R1 Concept** — *do we understand what we're proposing?*
- **R2 Demo** — *does anyone want this?*
- **R3 Proof-of-Concept** — *can this be built?*
- **R4 Prototype** — *does the whole thing work as intended?*
- **R5 Production** — *does it run for real?*

The rungs are cumulative claims, not phases you must visit in order. A team may skip a Demo when desirability is obvious, or skip a PoC when nothing is technically novel. What the ladder forbids is **claim inflation**: presenting an R2 artifact as if it carried R4 evidence. That's not a process violation — it's a category error, and in the AI era it is the default failure mode of the room.

---

## The Two Axes: Appearance vs. Claim

The reason two smart cultures ended up with colliding vocabulary is that they were grading different axes.

**Engineering vocabulary grades claim strength.** Concept → PoC → Prototype is an evidence ladder: each term tells you what has been demonstrated. A PoC that's ugly is *correct* — its entire job is to burn down the feasibility risk, not to look like anything.

**AI-PM vocabulary grades appearance fidelity.** A "PM prototype" from v0, Lovable, Bolt, or a vibe-coding session is graded on how convincingly it renders the intended experience. On the appearance axis it scores brilliantly. On the claim axis it is an R2 Demo: a **horizontal facade** — broad surface, nothing real behind it.

That last distinction — facade vs. slice — is the cleanest way to see why the same word can't serve both cultures:

- A **horizontal facade** (R2) covers the *whole* surface shallowly: every screen clicks, no screen is real.
- A **vertical slice** (R3) covers *one* path deeply: one workflow, real data, real backend, end to end — and probably no styling at all.

A facade and a slice can describe the same product and share zero code. They retire different risks. A product effort usually needs both — and needs to never confuse one for the other.

### Translation table

| What they call it | What it is on the ladder |
|---|---|
| "PM prototype", v0/Lovable/Bolt build, vibe-coded app | **R2 Demo** |
| Figma clickable, storyboard, PR/FAQ appendix mockup | **R1 Concept** (interactive Figma flows straddle R1–R2) |
| Engineering spike, "I got the model fine-tuned on our data" | **R3 Proof-of-Concept** |
| "Beta", "internal alpha" (working, unhardened) | **R4 Prototype** |
| "It's live" (operated, real users) | **R5 Production** |

None of these mappings are demotions. An R2 Demo produced in an afternoon is one of the highest-leverage artifacts in modern product work — *when labeled R2*. The failure mode isn't building demos; it's letting a demo's appearance write checks that only R3+ evidence can cash.

---

## Where the Rungs Live in Working Backwards

The ladder slots directly into a [Working Backwards](/sdd)-style definition flow, where different documents want different rungs of evidence:

- The **press release and FAQ** embed **R1 Concepts** — mockups and experience walkthroughs in the appendix that make the narrative concrete. Amazon practice has always done this; you can't write a credible press release about an experience no one has sketched.
- A **Demo (R2)** is the strongest desirability evidence a PR/FAQ review can cite: not "we believe customers want this" but "here's the facade — watch people try to use it."
- The **FAQ's feasibility answers** should cite an **R3 PoC** when there's a real "can we even do this?" question. "Yes, we validated the hard part against production data" is an answer; "the demo works" is not.
- The **decision gate** (the 6-pager review) green-lights the spend that produces **R4** — which is precisely why detailed UX and architecture come *after* the gate, not before. You don't buy R4 evidence for an idea that might die in the meeting.
- **R5** is what the Builder Loop ships and operates.

The ladder is what keeps that flow honest: each document cites the rung it actually has, and the gate knows exactly how much reality is in the room.

---

## It Interlocks With the Five Ps

The [Five Ps](/frameworks/five-ps) stages the *product journey* — Preparation to Profit — and deliberately orders **P2 Prototype** before **P3 Proof-of-Concept**, because a product-led model tests desirability before feasibility. *The order is the thesis.* Note the deliberate vocabulary split: the Five Ps keeps the PM's own word for P2 — it is a normative model addressed to PMs in their own language ("don't stop at Prototype") — while this ladder supplies the precise artifact term underneath it.

The App Reality Ladder doesn't compete with that ordering — it supplies the artifact vocabulary underneath it. The two models grade different nouns: the Five Ps grades *how far the product has gotten*; the Reality Ladder grades *what a given artifact proves*. The mapping at the seam:

| Five Ps stage | Reality Ladder artifact |
|---|---|
| P1 Preparation | R1 Concepts (specs, mockups, narratives) |
| P2 Prototype | **R2 Demo** — the PM prototype, named precisely |
| P3 Proof-of-Concept | **R3 Proof-of-Concept** |
| P4 Production | R4 Prototype hardened into **R5 Production** |
| P5 Profit | beyond artifacts — results |

Read together: the Five Ps says *visit desirability before feasibility, and don't stop before Production*. The Reality Ladder says *whatever you're holding, label it by what it proves*. A journey model and a truth-in-labeling model, sharing one seam — the artifact the industry calls a "PM prototype" is stage P2 of the journey and rung R2 of reality.

And the same theorem that links the Five Ps to the [Product Builder Maturity Model](/frameworks/product-builder-maturity-model) applies here: climbing past R2 is a capability threshold. Producing R3 requires engineering reality; producing R4–R5 requires shipping and operating end to end. The person's maturity caps the artifact's attainable rung — which is why "everyone has a prototype now" is true only on the appearance axis. On the claim axis, the upper rungs are as scarce as they ever were.

---

## Using the Ladder

Three habits make the vocabulary stick:

1. **Label artifacts at the door.** Every review, every gate, every stakeholder share opens with the rung: "this is an R2 Demo — it tests whether anyone wants this; nothing behind it is real." Thirty seconds that prevents the most expensive misunderstanding in AI-era product work.
2. **Match the claim to the rung.** Desirability claims cite R2 evidence. Feasibility claims cite R3. "It works" claims cite R4. "It's real" claims cite R5. A claim citing a lower rung than it needs is flagged, not debated.
3. **Fund by rung, not by appearance.** The question at a gate is never "how done does it look?" — it's "which risks are retired, and what does the next rung cost?" An impressive facade changes the first answer not at all.

When building is cheap, looking real is free — and saying what's real is the discipline. The ladder is five words. Use them precisely, and the room always knows exactly how much reality it's standing on.
