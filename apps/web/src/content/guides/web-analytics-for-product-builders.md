---
title: 'Web Analytics for Product Builders'
subtitle: 'What Cloudflare, PostHog, Google Analytics, and Microsoft Clarity each measure, what they store, and whether you need a consent banner'
description: 'A researched comparison of Cloudflare HTTP analytics, Cloudflare Web Analytics, PostHog, Google Analytics 4, and Microsoft Clarity: the data each provides, what each stores on a visitor’s device, what that means for consent banners and privacy notices, and a launch sequence that avoids a banner at first.'
date: '2026-10-10'
reviewed: '2026-10-10'
author: 'ProductBuildersHQ'
authorRole: 'Research notes from building ImpactChiefs.com'
references:
  - label: 'Cloudflare — Privacy-first Web Analytics (blog)'
    url: 'https://blog.cloudflare.com/privacy-first-web-analytics/'
  - label: 'Cloudflare — Web Analytics high-level metrics'
    url: 'https://developers.cloudflare.com/web-analytics/data-metrics/high-level-metrics/'
  - label: 'Cloudflare — Zone analytics'
    url: 'https://developers.cloudflare.com/analytics/account-and-zone-analytics/zone-analytics/'
  - label: 'Cloudflare — Types of analytics (developer docs)'
    url: 'https://developers.cloudflare.com/analytics/types-of-analytics/'
  - label: 'PostHog — JavaScript library configuration (cookieless_mode, persistence, person_profiles, autocapture)'
    url: 'https://posthog.com/docs/libraries/js/config'
  - label: 'PostHog — Persistence options'
    url: 'https://posthog.com/docs/libraries/js/persistence'
  - label: 'PostHog — README (products and free tier)'
    url: 'https://github.com/PostHog/posthog'
  - label: 'PostHog — Cookieless tracking guide'
    url: 'https://posthog.com/docs/data/cookieless-tracking'
  - label: 'PostHog — Funnels'
    url: 'https://posthog.com/docs/product-analytics/funnels'
  - label: 'PostHog — Retention'
    url: 'https://posthog.com/docs/product-analytics/retention'
  - label: 'PostHog — Web analytics'
    url: 'https://posthog.com/docs/web-analytics'
  - label: 'PostHog — GDPR compliance'
    url: 'https://posthog.com/docs/privacy/gdpr-compliance'
  - label: 'PostHog — Reverse proxy'
    url: 'https://posthog.com/docs/advanced/proxy'
  - label: 'Google — Cookies used by Google Analytics 4'
    url: 'https://support.google.com/analytics/answer/11397207'
  - label: 'Google — Funnel exploration'
    url: 'https://support.google.com/analytics/answer/9327974'
  - label: 'Google — BigQuery Export'
    url: 'https://support.google.com/analytics/answer/9358801'
  - label: 'Google — Search Console integration'
    url: 'https://support.google.com/analytics/answer/10737381'
  - label: 'Google — GA4 reports overview'
    url: 'https://support.google.com/analytics/answer/9212670'
  - label: 'Google — Consent mode'
    url: 'https://support.google.com/analytics/answer/9976101'
  - label: 'Google — GA4 data retention'
    url: 'https://support.google.com/analytics/answer/7667196'
  - label: 'Microsoft Learn — Clarity overview'
    url: 'https://learn.microsoft.com/en-us/clarity/setup-and-installation/about-clarity'
  - label: 'Microsoft Learn — Clarity cookies'
    url: 'https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-cookies'
  - label: 'Microsoft Learn — Clarity consent mode'
    url: 'https://learn.microsoft.com/en-us/clarity/setup-and-installation/consent-mode'
  - label: 'CNIL — Sheet n°16: Use analytics on your websites and applications'
    url: 'https://www.cnil.fr/en/sheet-ndeg16-use-analytics-your-websites-and-applications'
  - label: 'EUR-Lex — Directive 2002/58/EC (ePrivacy), as amended'
    url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:02002L0058-20091219'
  - label: 'Global Privacy Control'
    url: 'https://globalprivacycontrol.org/'
tags:
  - analytics
  - privacy
  - consent
  - cloudflare
  - posthog
  - launch
---

If you are launching a product site, you will be told to install analytics. Each tool you add changes three things: what you can learn, what you must tell visitors, and whether you must ask them first. This guide separates those three, compares the five options most builders weigh, and ends with a sequence you can follow without a consent banner at launch.

It is research, not legal advice. Where a statement comes from a vendor's own documentation, we say so, and every source is listed at the end.

## The short version

- **Launch with Cloudflare** if your site is on Cloudflare: HTTP analytics (server side) plus Web Analytics (a small browser beacon). Neither stores anything on the visitor's device for analytics, which is the thing the banner question turns on.
- **Add PostHog next** for product questions (which feature gets used, where people drop off), in its cookieless mode so it still needs no banner.
- **Treat Google Analytics 4 and Microsoft Clarity as consent-gated tools.** Both set cookies, and Microsoft now enforces consent signals for visitors from the EEA, UK, and Switzerland.
- **Whatever you run, publish a privacy notice that matches it.** A notice is always required. A banner is only required when you store or read things on the visitor's device, or process their data in ways that need consent.

| Tool | Where it measures | What it stores on the device | Consent banner |
| --- | --- | --- | --- |
| Cloudflare HTTP analytics | Cloudflare's edge, from requests | Nothing | No |
| Cloudflare Web Analytics | A small script in the page | Nothing for analytics, per Cloudflare | Not for device storage |
| PostHog, `cookieless_mode: 'always'` | Script plus PostHog servers | Nothing, per PostHog | Generally no; confirm for your regions |
| PostHog, default settings | Script plus PostHog servers | A cookie and `localStorage` | Yes, per PostHog's own guidance |
| Google Analytics 4 | Script plus Google servers | `_ga` and `_ga_<container-id>` cookies | Yes in the EEA and UK |
| Microsoft Clarity | Script plus Microsoft servers | `_clck`, `_clsk` first-party; several third-party cookies | Yes for EEA, UK, Switzerland |

## Two separate questions

Most confusion comes from mixing up two questions.

1. **What does the tool let me see?** Page views, referrers, funnels, recordings, heatmaps.
2. **What does the tool do to the visitor?** Does it write a cookie or other storage, does it build a profile, does it send data to a third party for that company's own use?

A dashboard that looks harmless can sit on top of a script that stores a persistent identifier. The consent question is mainly about the second one. In the EU, the ePrivacy Directive's Article 5(3) is about storing information on, or reading information from, a user's device, with an exception for what is strictly necessary to provide a service the user asked for. That is why "cookieless" is the pivotal word in this space.

## The tools, one at a time

### Cloudflare HTTP analytics

**What it is.** Aggregated traffic, security, and performance metrics for each domain proxied through Cloudflare, computed from the requests Cloudflare sees. Cloudflare's [documentation](https://developers.cloudflare.com/analytics/types-of-analytics/) lists requests, data transfer, page views, visits, and API requests, and a security view that includes top crawlers and bots, covering all incoming requests, including those not affected by security measures.

**What you learn.** How much traffic actually hits the site, including crawlers and automated traffic that a browser script never sees. It is the closest thing you have to ground truth for "did the request happen".

**Cost to the visitor.** Nothing is written to their device. The data is request metadata your host already handles, so it belongs in your privacy notice under hosting.

**Limits.** It works at the request level, so it cannot see what happened in the page: no clicks, no scroll, no events.

### Cloudflare Web Analytics

**What it is.** A free analytics product. Cloudflare says it "provides free, privacy-first analytics for your website" and gives "a detailed view into the performance of web pages as experienced by your visitors". A script runs in the page and reports page loads.

**What you learn.** Page views, referrers, countries, browsers and devices, and page-load performance as real visitors experienced it.

**Cost to the visitor.** Cloudflare states in its [announcement](https://blog.cloudflare.com/privacy-first-web-analytics/): "We don’t use any client-side state (like cookies or localStorage) for analytics purposes", and that it does not track users over time by IP address, user agent, or other immutable attributes. It also says it considers fingerprinting more intrusive than cookies, because users cannot opt out of it. Its developer documentation says "Web Analytics does not collect your visitor’s personal data."

**Limits.** Because it deliberately does not recognise a returning visitor, it counts page views and visits, not people. There are no funnels and no product events.

### PostHog

**What it is.** A product-analytics platform: events, funnels, retention, feature flags, experiments, and session replay, hosted by PostHog or self-hosted.

**What you learn.** What people *do*: which quotes get copied, which filter gets used, where a flow drops off. This is the question Cloudflare cannot answer.

**Cost to the visitor depends entirely on configuration.** From [PostHog's JavaScript configuration reference](https://posthog.com/docs/libraries/js/config) and [persistence documentation](https://posthog.com/docs/libraries/js/persistence):

- The default persistence is `localStorage+cookie`. PostHog's [GDPR guidance](https://posthog.com/docs/privacy/gdpr-compliance) says that if you use cookies for logged-out users you should use a cookie banner so people can give and withdraw consent.
- `persistence: 'memory'` keeps everything in page memory, so data lasts only for the page view. Nothing is stored, but a multi-page site then sees every page load as a new visitor.
- `cookieless_mode: 'always'` sets no cookies and uses no session or local storage; identity relies on a privacy-preserving hash generated on PostHog's servers. A value of `'on_reject'` switches to cookieless only when a visitor rejects cookies. It must also be enabled in the project settings, or cookieless events are ignored.
- `person_profiles` defaults to `identified_only`, so anonymous visitors do not get person profiles.
- `autocapture` defaults to `true` and records clicks and form submissions; `disable_session_recording` defaults to `false`.
- On PostHog Cloud EU, IP capture is disabled by default for new projects; on Cloud US and self-hosted it must be set manually.

**Ad blockers.** Blockers keep lists of analytics domains. PostHog's [proxy guide](https://posthog.com/docs/advanced/proxy) says a reverse proxy on your own domain "typically increases event capture by 10-30% depending on your user base". That is PostHog's own estimate, so measure it on your site.

**Limits.** In cookieless mode you give up the stable return-visitor identity that cookies provide, so retention and long funnels are less reliable.

### Google Analytics 4

**What it is.** The most widely used web analytics product, with broad reporting on acquisition, engagement, and conversions, and links to Google's advertising and search products.

**Cost to the visitor.** [Google documents](https://support.google.com/analytics/answer/11397207) two cookies: `_ga`, "Used to distinguish users", and `_ga_<container-id>`, "Used to persist session state", each with a default expiry of two years. Event data retention can be set to 2 or 14 months for standard properties, per [Google's retention page](https://support.google.com/analytics/answer/7667196).

**Consent mode.** Google's [consent mode](https://support.google.com/analytics/answer/9976101) lets you tell Google tags what the visitor chose. When `analytics_storage` is denied, tags do not read or write Analytics cookies and instead send "cookieless pings" containing coarse information, including the IP address, which Google says it does not store or log. The pings feed behavioral and conversion modeling that fills gaps in your data. Under a basic implementation, where Google tags are blocked until consent, that modeling is not available.

**What that means for builders.** Treat GA4 as a consent-gated tool for EEA and UK visitors: it writes persistent cookies by default, and the French regulator says most large audience-measurement offerings fall outside its consent exemption (see the next section).

### Microsoft Clarity

**What it is.** A free behavioral analytics tool: session recordings, heatmaps, funnels, and AI-generated summaries of what users did. Microsoft's [overview](https://learn.microsoft.com/en-us/clarity/setup-and-installation/about-clarity) states it is free forever and "shouldn't be used on websites or apps that target users under 18 years of age".

**What you learn.** Where people click, how far they scroll, where they hesitate or rage-click. It answers "why", which counts and funnels cannot.

**Cost to the visitor.** Per Microsoft's [cookie list](https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-cookies), Clarity sets `_clck` and `_clsk` as first-party cookies, plus third-party cookies (`CLID`, `ANONCHK`, `MR`, `MUID`, `SM`). Microsoft says its "typical usage requires that non-essential cookies are set". Starting October 31, 2025, Clarity [enforces consent signal requirements](https://learn.microsoft.com/en-us/clarity/setup-and-installation/consent-mode) for visits from the EEA, UK, and Switzerland, and a valid signal is required for full functionality there. Consent Mode is on by default for those regions.

**Limits.** It records behavior on your pages, so masking and what appears on screen matter. Do not use it where forms collect sensitive information without masking.

## What each tool gives you

Consent is only half the decision. The other half is what you get for it. This matrix lists capabilities as each vendor's documentation names them.

**Legend:** ● offered. ◐ offered in a limited form. ○ not available, or not found in the sources we checked, which does not prove it is absent.

<table class="matrix">
<thead>
<tr>
<th scope="col">Capability</th>
<th scope="col" align="center">Cloudflare HTTP</th>
<th scope="col" align="center">Cloudflare Web Analytics</th>
<th scope="col" align="center">PostHog (cookies)</th>
<th scope="col" align="center">PostHog (cookieless)</th>
<th scope="col" align="center">Google Analytics 4</th>
<th scope="col" align="center">Microsoft Clarity</th>
</tr>
</thead>
<tbody>
<tr><th colspan="7" scope="colgroup" class="group">Traffic and delivery</th></tr>
<tr><th scope="row">Traffic volume, bandwidth, cache</th><td align="center">●</td><td align="center">○</td><td align="center">○</td><td align="center">○</td><td align="center">○</td><td align="center">○</td></tr>
<tr><th scope="row">Bot and crawler visibility</th><td align="center">●</td><td align="center">○</td><td align="center">○</td><td align="center">○</td><td align="center">○</td><td align="center">◐</td></tr>
<tr><th scope="row">Page views and visits</th><td align="center">◐</td><td align="center">●</td><td align="center">●</td><td align="center">●</td><td align="center">●</td><td align="center">◐</td></tr>
<tr><th scope="row">Referrers and traffic sources</th><td align="center">○</td><td align="center">○</td><td align="center">●</td><td align="center">●</td><td align="center">●</td><td align="center">○</td></tr>
<tr><th scope="row">Core Web Vitals and page load time</th><td align="center">○</td><td align="center">●</td><td align="center">○</td><td align="center">○</td><td align="center">○</td><td align="center">◐</td></tr>
</tbody>
<tbody>
<tr><th colspan="7" scope="colgroup" class="group">Behavior and product analytics</th></tr>
<tr><th scope="row">Custom events</th><td align="center">○</td><td align="center">○</td><td align="center">●</td><td align="center">●</td><td align="center">●</td><td align="center">◐</td></tr>
<tr><th scope="row">Funnels</th><td align="center">○</td><td align="center">○</td><td align="center">●</td><td align="center">◐</td><td align="center">●</td><td align="center">●</td></tr>
<tr><th scope="row">Retention and returning users</th><td align="center">○</td><td align="center">○</td><td align="center">●</td><td align="center">◐</td><td align="center">○</td><td align="center">○</td></tr>
</tbody>
<tbody>
<tr><th colspan="7" scope="colgroup" class="group">Understanding sessions</th></tr>
<tr><th scope="row">Session replay</th><td align="center">○</td><td align="center">○</td><td align="center">●</td><td align="center">○</td><td align="center">○</td><td align="center">●</td></tr>
<tr><th scope="row">Heatmaps</th><td align="center">○</td><td align="center">○</td><td align="center">●</td><td align="center">○</td><td align="center">○</td><td align="center">●</td></tr>
</tbody>
<tbody>
<tr><th colspan="7" scope="colgroup" class="group">Shipping and quality</th></tr>
<tr><th scope="row">Feature flags, experiments, surveys</th><td align="center">○</td><td align="center">○</td><td align="center">●</td><td align="center">◐</td><td align="center">○</td><td align="center">○</td></tr>
<tr><th scope="row">Error tracking</th><td align="center">○</td><td align="center">○</td><td align="center">●</td><td align="center">●</td><td align="center">○</td><td align="center">○</td></tr>
</tbody>
<tbody>
<tr><th colspan="7" scope="colgroup" class="group">Marketing and search</th></tr>
<tr><th scope="row">Search Console link</th><td align="center">○</td><td align="center">○</td><td align="center">○</td><td align="center">○</td><td align="center">●</td><td align="center">○</td></tr>
<tr><th scope="row">Google Ads link</th><td align="center">○</td><td align="center">○</td><td align="center">○</td><td align="center">○</td><td align="center">●</td><td align="center">◐</td></tr>
</tbody>
<tbody>
<tr><th colspan="7" scope="colgroup" class="group">Data and platform</th></tr>
<tr><th scope="row">Raw data export or warehouse</th><td align="center">○</td><td align="center">○</td><td align="center">●</td><td align="center">●</td><td align="center">●</td><td align="center">◐</td></tr>
<tr><th scope="row">AI-assisted insights</th><td align="center">○</td><td align="center">○</td><td align="center">●</td><td align="center">●</td><td align="center">○</td><td align="center">●</td></tr>
<tr><th scope="row">Self-hosting or open source</th><td align="center">○</td><td align="center">○</td><td align="center">●</td><td align="center">●</td><td align="center">○</td><td align="center">○</td></tr>
</tbody>
</table>

**PostHog appears twice** because its default settings and its cookieless mode give different results. Per PostHog's [cookieless tracking guide](https://posthog.com/docs/data/cookieless-tracking), in cookieless mode you cannot call `identify()`, unique users are measured with a privacy-preserving hash computed on PostHog's servers (so counts beyond a single day are limited), session replay and surveys are disabled, feature flags can be delayed unless bootstrapped, and IP-based enrichment such as GeoIP and bot detection does not apply. That is why funnels, retention, and flags are ◐ there and replay is ○. The guide does not say how heatmaps behave in cookieless mode, so that cell is ○ for "not found". Error tracking, events, and export are ● in both columns because the guide lists no limitation for them; confirm in your own project.

How to read the other ◐ cells: Cloudflare HTTP analytics shows page views and visits on Pro, Business, and Enterprise plans; the free plan shows requests, bandwidth, and unique visitors. Clarity's page and session counts sit in its dashboard insights, its bot view is its AI Visibility bot-activity report, its custom events are custom tags and smart events, its performance data is a dashboard widget, its ads view is ad campaign insights, and its export is a data export API.

### What it costs

| Tool | Price | Limits worth knowing |
| --- | --- | --- |
| Cloudflare HTTP analytics | Included with the zone | Every plan can see at least the last 30 days; longer depends on plan |
| Cloudflare Web Analytics | Free | Counts page views and visits, not people |
| PostHog | Free monthly tier per product, then usage-based | Per its README, the first 1 million events, 5,000 recordings, 1 million flag requests, and 100,000 exceptions each month are free on Cloud; open source under an MIT license apart from its `ee` directory |
| Google Analytics 4 | Free standard properties | Standard properties have a daily BigQuery export limit of 1 million events |
| Microsoft Clarity | Free, stated as free forever | Not for sites that target users under 18 |

### Where each one earns its place

- **Cloudflare HTTP analytics** tells you whether the site is up, how much traffic hits it, and who is crawling it.
- **Cloudflare Web Analytics** tells you whether pages are fast and where visitors come from, with the least overhead.
- **PostHog** tells you what people do and what to ship next: events, funnels, retention, flags, experiments, and replay in one product.
- **Google Analytics 4** is strongest where your question is marketing: attribution, Google Ads, and what search queries lead to your pages through Search Console.
- **Microsoft Clarity** tells you why people struggle: recordings and heatmaps, free, with the consent requirements described above.

### What each capability costs in consent

This table is our reading of the rules in the next section, not something any vendor states. Treat it as a starting point for a conversation with counsel.

| Capability | Usually needs a device identifier? | Usual consent position in the EU and UK |
| --- | --- | --- |
| Request logs, HTTP analytics | No | No banner; covered in the privacy notice |
| Page views and referrers by cookieless beacon | No | No banner for storage reasons |
| Core Web Vitals, page load time | No | No banner for storage reasons |
| Named custom events without a persistent ID | No | Generally no banner |
| Funnels, retention, returning users | Yes with cookies; a server-side hash is a judgment call | Banner with cookies; confirm for hash-based identity |
| Session replay and heatmaps | Usually yes | Banner, plus masking of sensitive fields |
| Feature flags and experiments | Yes if assignment is persisted | Banner unless strictly necessary |
| Autocapture of clicks and forms | Depends on tool | Safer behind consent; can capture typed text |
| Ad conversion and remarketing links | Yes, often third-party | Banner, plus honoring opt-out signals such as GPC |
| Logged-in user identification | Yes | Consent or another legal basis |

## Why the numbers disagree

Run several tools and their totals will differ. That is expected, not a bug.

| Source | Counts | Why it differs |
| --- | --- | --- |
| HTTP analytics | Requests Cloudflare saw | Includes crawlers and bots, and visitors who block scripts |
| Web Analytics | Page loads where the script ran | Misses script blockers; no returning-visitor identity |
| PostHog | Events your code sent | Misses blockers unless proxied; identity depends on cookieless or consent |
| GA4 / Clarity | Visitors who consented, plus modeled data | Consent rejection and blockers remove sessions |

Read HTTP analytics as the ceiling, a JavaScript beacon as the human estimate, and event tools as behavior inside that estimate. For a case study or a dashboard, always say which source a number came from.

## What the rules ask for

This section is a summary of public sources, not legal advice. Rules differ by country and change.

**EU and UK (ePrivacy plus GDPR).** Article 5(3) of the ePrivacy Directive requires clear information and the right to refuse before storing, or accessing, information on a user's device, other than what is strictly necessary for a service the user requested. GDPR then applies to any personal data you process, and an IP address can be personal data; PostHog's own guidance says so. The notice is separate from the banner: you need a notice either way.

**The French exemption.** The CNIL, France's regulator, lets certain audience-measurement trackers run without consent if they meet conditions. Its [analytics sheet](https://www.cnil.fr/en/sheet-ndeg16-use-analytics-your-websites-and-applications) lists them:

1. inform users of the tracker's use;
2. let them object;
3. use it only for audience measurement and A/B testing;
4. do not cross-check the data with other processing or other sites' statistics;
5. limit the tracker's scope to a single site or application publisher;
6. truncate the last byte of the IP address;
7. limit the tracker's lifetime to 13 months.

The same page states that "most large audience measurement offerings do not fall within the scope of the exemption, regardless of their configuration", and points to open-source software you configure yourself, such as Matomo. The exemption is French guidance; other regulators read these questions differently.

**United States.** Many state privacy laws center on opting out of the sale or sharing of data rather than opting in to analytics. [Global Privacy Control](https://globalprivacycontrol.org/) is a browser signal intended to communicate that opt-out, including under the California Consumer Privacy Act. If you share data for advertising, honor it. A first-party analytics setup is generally less exposed, but your notice still has to describe what you collect.

## Notice versus banner

- **A privacy notice** says what you collect, why, who processes it, how long you keep it, and how to reach you. Every site with analytics needs one.
- **A consent banner** is how you collect permission where the law requires it. It is only meaningful if it works: the tools must not run before the choice, and rejecting must stop them.

Two practical points from the sources above:

- Microsoft states that the site owner is responsible for telling Clarity when consent changes so it can remove cookies already set. A banner that records a choice but does not reconfigure the tools does nothing.
- PostHog's `cookieless_mode: 'on_reject'` suits sites that do run a banner: accepted visitors are tracked normally, and rejecting visitors still contribute aggregate, storage-free events.

## A launch sequence that avoids a banner

1. **Day one: Cloudflare HTTP analytics and Web Analytics only.** No cookies, no storage, no banner. Publish a privacy notice that says exactly that.
2. **Define events before choosing tools.** Write a short list of named events (for example `quote_copied`, `clip_played`, `topic_filtered`) and one `track(name, props)` function. Every provider then sits behind that one function, and you can add or remove a provider without touching page code.
3. **Add PostHog in cookieless mode.** `cookieless_mode: 'always'`, autocapture off, session recording off, `person_profiles` left at `identified_only`, IP capture disabled. Route events through your own domain with a reverse proxy. Update the privacy notice first.
4. **Only then consider a banner.** If you want recordings, heatmaps, or Google's ecosystem, add a consent mechanism and gate GA4 and Clarity behind it. If most of your audience is in one region, it can be reasonable to show the banner only where the law expects it, but you still disclose everywhere.
5. **Compare for a fixed window.** Run the extra tools for a few weeks, note how the numbers differ from the Cloudflare baseline, and keep only what changed a decision.

## What we are doing

We are applying this sequence to [ImpactChiefs.com](https://impactchiefs.com), a quotes and leadership site we are relaunching. It starts with Cloudflare HTTP analytics and Web Analytics and no banner, defines a shared event list, and adds PostHog in cookieless mode behind its own domain. GA4 and Clarity are optional, time-boxed experiments behind a consent banner. We will publish what the comparison shows, including where the sources disagree.

## What this guide does not settle

- **Counts of how many visitors use blockers.** We found no source we trusted for a number, so we give none. Measure your own site against HTTP analytics.
- **Whether cookieless PostHog is exempt in every country.** It stores nothing on the device, but processing and IP handling still fall under data-protection law. Check with counsel for the regions you serve.
- **Vendor changes.** Clarity's consent requirements changed in late 2025, and PostHog's persistence and cookieless options are still evolving. Check each vendor's documentation before relying on this page; the "Facts last checked" date above is the last time we did.
