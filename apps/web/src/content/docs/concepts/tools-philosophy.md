---
title: 'ProductBuildersHQ Tools Philosophy'
description: 'How we choose the tools we recommend, what “Recommended” means, how we keep it honest, and where we are biased.'
section: 'concepts'
order: 5
status: 'available'
reviewed: '2026-10-23'
draft: true
references:
  - label: 'PostHog: Projects (the free plan includes one project; sites can share a project and be filtered by host)'
    url: 'https://posthog.com/docs/settings/projects.md'
  - label: 'HubSpot: Free CRM limits'
    url: 'https://www.hubspot.com/pricing/crm'
  - label: 'HubSpot: API usage details'
    url: 'https://developers.hubspot.com/docs/api/usage-details'
  - label: 'Zoho CRM: API limits'
    url: 'https://www.zoho.com/crm/developer/docs/api/v8/api-limits.html'
  - label: 'Cloudflare: Network and CDN plans (Free plan)'
    url: 'https://www.cloudflare.com/plans/network-cdn.md'
  - label: 'Cloudflare: Service-specific terms for application services (CDN)'
    url: 'https://www.cloudflare.com/service-specific-terms-application-services/'
  - label: 'Cloudflare: Workers static assets, billing and limitations'
    url: 'https://developers.cloudflare.com/workers/static-assets/billing-and-limitations/'
  - label: 'Fastly: Pricing'
    url: 'https://www.fastly.com/pricing/'
  - label: 'Chatwoot: Updating API and webhook access on Chatwoot Cloud'
    url: 'https://www.chatwoot.com/blog/updating-api-and-webhook-access-on-chatwoot-cloud'
---

We do not choose a tool only for ourselves. When ProductBuildersHQ names a tool, we are recommending it to you, and we connect it to PBHQ so that you can see how your product is doing from the services you already use. This page explains how we decide, so that you can judge our recommendations instead of just trusting them.

## The short version

- We recommend tools for the stage before revenue: cheap to keep alive, with costs that cannot spike. Once a product earns, you can make other choices, and we say so.
- We recommend a tool only if PBHQ works with it on its free plan, because PBHQ reads from your own account at your own plan.
- Every recommendation carries a date and a reason, and we say when a tool is not recommended yet.
- We tell you where we are biased.

## Who these recommendations are for

They are for a product that is not earning yet and has to stay alive on very little: little money, and little of your attention. Our test is functionality at the lowest cost to keep a site running until it has revenue.

Revenue changes the question. A site that earns can pay for performance tuning, support contracts, a second provider, or a tool with a better fit and a bigger bill. We do not claim our picks are the best choice at that point, and where we know when a tool is worth outgrowing, we say so.

## What we optimize for

We run several sites that earn nothing. What keeps them alive is how little attention they need, not how powerful their tools are. That shapes what we look for:

- **Cheap to keep alive.** Costs nothing when idle and needs no card.
- **Costs that cannot spike.** The best case is no meter at all. The next best is a tool that stops at its limit instead of billing you. A generous free allowance followed by usage-based pricing is fine until a good day, such as a post that goes viral, turns into a bill. Where a vendor's behavior at the limit is not documented, we say so.
- **Little upkeep.** Hosted, with no server for you to patch. A free tool you must run yourself is not free; it costs the attention that an unfunded product does not have.
- **Works with PBHQ on the free plan.** A tool whose free plan has no API cannot feed your dashboard, so we do not recommend it for PBHQ users, however good it is. We found this the hard way: one support tool we looked at limits API and webhook access on its cloud product to paid plans, and its pricing page did not say so.
- **You can leave.** Your data can be exported, and nothing about the tool traps you.
- **Honest limits.** The plan limits are documented, and we write them down for you.
- **Careful with privacy.** We prefer tools and settings that need no consent banner, and we are cautious about anything that touches children's data.

## Why Cloudflare is our first example

One practical reason we recommend Cloudflare is that traffic does not turn into a bandwidth bill. Here is exactly what we found, because "unlimited" is a stronger word than the documents use:

- **Cloudflare's plan pages list no bandwidth charge for its free CDN,** and its CDN terms set no numeric traffic limit. We did not find the words "unlimited bandwidth" on its pricing pages.
- **There is a content condition.** Its terms require a paid Cloudflare service to serve video, and a "disproportionate percentage" of pictures, audio or other large files, through the CDN. A site made mostly of text and ordinary images is the case the free plan fits.
- **Serving a site from Workers static assets is explicit:** "Requests to static assets are free and unlimited." If you use the free tier's request limits for the code that runs in front of those assets, going over returns an error instead of a charge.
- **Cloudflare describes its Free plan** as "for personal or hobby projects that aren't business-critical." That is the stage we mean. When a site earns, you will want to look again.

Other CDNs also have generous free allowances. Fastly, for example, includes 100 GB and 1 million requests a month, then charges by usage (about $0.12 per GB in North America and Europe on its pricing page). That is a good deal for a small site, and a spike beyond the allowance is billed. For someone with no revenue, a meter that can start running is a risk, and no meter is a simpler thing to plan around. That is a statement about predictability, not about which CDN is better in every other way.

## What "Recommended" means

A tool is **Recommended** when all of these are true:

1. PBHQ works with it today.
2. We have tested that connection on the tool's free plan.
3. We have read its current pricing and limits from the vendor's own pages.
4. We state the date we checked.

Other labels are just as important:

- **Recommended, with caveats.** It works, but the free plan has limits that matter, and we list them.
- **Under review.** We are still checking, and we say what is unresolved.
- **Planned.** We intend to connect it. We do not recommend a tool we cannot yet connect.
- **Not recommended yet,** with the reason, such as "the free plan has no API."

## How we check

- **Official sources first,** and we link to them. A summary on a third-party site is a lead, not evidence.
- **Then a test on the free plan,** because a pricing page does not always say what the free plan can do.
- **Then again,** because terms change. Every page here shows when its facts were last checked. We are working on running these tests on a schedule instead of relying on memory; that part is in development.
- **When a vendor changes its terms,** we change the recommendation and say why.

## Where we are right now

| Category | Our current view | Why |
| --- | --- | --- |
| CDN and traffic analytics | Cloudflare: recommended, with caveats | PBHQ works with it. No bandwidth charge on the free CDN, with a content condition (see above). Its analytics API works on the Free plan. The caveats are on [its page](/docs/integrations/cloudflare): no referrers and 31 days of request detail on Free |
| Product analytics | PostHog: planned | Its free plan allows one project, and several sites can share it, split by host. We have not built the connection |
| CRM | HubSpot Free and Zoho Free: under review | Both expose an API on a free account in their documentation. A free HubSpot CRM holds 1,000 contacts, and a free Zoho CRM allows 5,000 API credits a day, which limits how much a connected product can sync |
| Support desk | Under review | We have not yet confirmed which free plans expose an API |
| Payments | Stripe: planned | We have not built the connection |

## Where we are biased

- **We can only recommend tools we can connect to.** A better tool that PBHQ does not connect to will not appear here.
- **We test on free plans.** A paid plan may behave differently, and we say when we have not checked it.
- **We are a small team.** We will get things wrong, and we would rather correct them in public.

## Our relationships

**[To complete before publishing: list any partner, referral or startup-program relationships with the tools named here, or state that there are none.]** We do not take payment for placement, and a benefit from a vendor does not change what we write.

If you think we have got something wrong, [tell us](/about#contact).
