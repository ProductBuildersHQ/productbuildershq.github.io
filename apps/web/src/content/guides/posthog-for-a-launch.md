---
title: 'Setting Up PostHog for a Launch'
subtitle: 'Choosing a region, running it without cookies, measuring signed-in use from your server, and what PostHog Support can and cannot do yet'
description: 'A researched setup guide for PostHog on its free plan: US or EU region and what "EU" actually promises, what the free plan allows, cookieless tracking and what it costs you, server-side events for signed-in users, and PostHog Support for a team that is not online to answer.'
date: '2026-10-25'
reviewed: '2026-10-25'
draft: true
author: 'ProductBuildersHQ'
authorRole: 'Research notes from setting up PostHog for our own products'
references:
  - label: 'PostHog: Pricing'
    url: 'https://posthog.com/pricing'
  - label: 'PostHog: Projects (regions, moving projects, cross-region migration)'
    url: 'https://posthog.com/docs/settings/projects'
  - label: 'PostHog: GDPR compliance'
    url: 'https://posthog.com/docs/privacy/gdpr-compliance'
  - label: 'PostHog: Privacy compliance (DPA on every plan)'
    url: 'https://posthog.com/docs/privacy'
  - label: 'PostHog: Data Processing Agreement'
    url: 'https://posthog.com/dpa'
  - label: 'PostHog: Subprocessors'
    url: 'https://posthog.com/subprocessors'
  - label: 'PostHog: Introducing PostHog Cloud EU'
    url: 'https://posthog.com/blog/posthog-cloud-eu'
  - label: 'PostHog: Billing limits and alerts'
    url: 'https://posthog.com/docs/billing/limits-alerts'
  - label: 'PostHog: Cookieless tracking'
    url: 'https://posthog.com/docs/data/cookieless-tracking'
  - label: 'PostHog: JavaScript library configuration'
    url: 'https://posthog.com/docs/libraries/js/config'
  - label: 'PostHog: Support'
    url: 'https://posthog.com/docs/support'
  - label: 'PostHog: Support channels'
    url: 'https://posthog.com/docs/support/concepts/channels'
  - label: 'PostHog: Support pricing and limits'
    url: 'https://posthog.com/docs/support/pricing'
  - label: 'PostHog: Support AI agent'
    url: 'https://posthog.com/docs/support/ai-agent'
  - label: 'PostHog: Connect email (Support)'
    url: 'https://posthog.com/docs/support/email'
  - label: 'PostHog: Set up the Support widget'
    url: 'https://posthog.com/docs/support/widget'
  - label: 'PostHog: Support JavaScript API reference'
    url: 'https://posthog.com/docs/support/javascript-api'
tags:
  - analytics
  - posthog
  - privacy
  - support
  - launch
---

PostHog's free plan is enough to launch a product with a working funnel, and its new Support product can hold your support inbox too. Three choices are hard to undo later: the region, whether the browser stores anything, and how you identify signed-in people. This guide covers those three, then what PostHog Support does for a team that is not online to answer.

It is research, not legal advice. Every statement about PostHog comes from its own pages, listed at the end. Where those pages disagree with each other, we say so.

For what each analytics tool stores on a visitor's device and when you need a banner, see [Do you need a cookie banner?](/docs/guides/cookie-notices-and-banners). For what GDPR asks of you in general, see [What GDPR asks of a product builder](/docs/guides/gdpr-for-product-builders).

## The short version

- **Pick the region before you send a single event.** On the free plan you cannot move a project between regions. You start again.
- **EU is the safer default** unless you have a reason to pick US. It costs the same, PostHog recommends it for GDPR, and IP capture starts switched off. Read "EU" as "stored in the EU", not "never leaves the EU".
- **Stay on the free plan without a card:** one project, a million events a month, a year of history. Put several sites in that one project and tell them apart with a property.
- **Run the marketing site without cookies.** You lose returning-visitor identity across days, replays and surveys, and gain a site that stores nothing in the browser.
- **Measure signed-in people from your server,** keyed by your own user ID, so retention needs no browser storage.
- **PostHog Support is free and has no ticket cap.** Its email channel and its API can serve as an email-reply case system. Its widget is a chat, so add it only when someone, or something you trust, will answer.

## Choosing a region

PostHog Cloud runs as two separate instances, US and EU. Your organization and its projects live in one of them.

| | US Cloud | EU Cloud |
| --- | --- | --- |
| Where data is stored | USA, per the [subprocessor list](https://posthog.com/subprocessors) | Frankfurt, Germany |
| Price | Same price list for both; the [pricing page](https://posthog.com/pricing) has no regional prices | Same |
| Features | No regional differences found in PostHog's docs | Same |
| IP capture for new projects | On until you turn it off | Off by default, per PostHog's [projects docs](https://posthog.com/docs/settings/projects) |
| PostHog's GDPR advice | Usable "if you follow additional steps", and it recommends anonymizing EU users' data | Recommended for GDPR compliance, per its [GDPR guidance](https://posthog.com/docs/privacy/gdpr-compliance) |
| Ingestion host | `https://us.i.posthog.com` | `https://eu.i.posthog.com` |

### "Stored in the EU" is not "never leaves the EU"

PostHog's [privacy page](https://posthog.com/docs/privacy) says EU Cloud ensures user data "never leaves EU jurisdiction". Its [Data Processing Agreement](https://posthog.com/dpa) is more careful. Clause 10.1 houses data in the data-center location of your agreement. Clause 10.2 says the processor will process data "outside of the Protected Area including in the US and elsewhere as identified on the Subprocessor Page".

The contracting company is PostHog, Inc., in San Francisco. The DPA says it participates in the EU-US Data Privacy Framework and its UK and Swiss extensions, and it also incorporates Standard Contractual Clauses.

The [subprocessor list](https://posthog.com/subprocessors) shows:

- AWS and Modal process in the USA for US Cloud and in Germany for EU Cloud.
- Wiz, which handles security monitoring, processes in Germany and France.
- Cloudflare, which carries traffic, works at "global edge locations".
- AI features have their own subprocessor list, which applies "only if AI features are enabled".

What to take from this:

- **The data at rest is in Frankfurt.** That is what most customers mean by EU hosting.
- **The contract still allows processing in the US.** Say "stored in the EU" in your privacy notice, not "never leaves the EU".
- **Each AI feature you turn on adds its own list.** Check it before you enable one.

### Changing your mind later

PostHog's [projects docs](https://posthog.com/docs/settings/projects) say cross-region migration "is only available to customers on the Scale or Enterprise plan", that "a PostHog engineer must run this migration", and that it means moving all event data between data centers. Scale is a $750-a-month package on the [pricing page](https://posthog.com/pricing).

PostHog's [EU announcement](https://posthog.com/blog/posthog-cloud-eu) says such moves take days or weeks, and that insights, dashboards, user accounts, feature flags and API keys do not migrate. It is an older post, so treat that part as possibly out of date. On the free plan, a change of region means a new project.

### When US makes sense

- Nearly all your customers are in the US, and you want one "everything in the US" answer for security reviews.
- You use PostHog features that read from or write to your own US-region storage or warehouse.
- A customer asks for US-only processing. That is rarer than an EU customer asking for the EU.

Latency is not a reason either way. Analytics calls are sent in the background, and your users never wait for them.

**What we chose:** EU, for every product. The deciding points were that it costs nothing extra and needs no extra setup, and that an EU customer asking for EU storage is the request we are most likely to get.

## What the free plan gives you

From the [pricing page](https://posthog.com/pricing):

- **Free:** no card, 1 project, 1 year of data retention, community support.
- **Monthly allowances:** the first million analytics events, 5,000 recordings and a million feature-flag requests each month.
- **Pay-as-you-go:** a $0 base price, 6 projects and 7 years of retention, with the same free allowances first.

Usage from every project in an organization "counts toward one bill and one free allowance", per the [projects docs](https://posthog.com/docs/settings/projects). A second project for staging is a paid-plan feature.

- **Several sites in one project.** Send a `site` property on every event and filter by it. One project can serve a marketing site, an app and a docs site.
- **Staging sends nothing.** Without a second project, keep staging and local development out of production data with configuration, not with filters afterwards.
- **Alerts.** PostHog emails the organization owner at 80% and 100% of the free allowance, per its [billing limits page](https://posthog.com/docs/billing/limits-alerts).

## Running it without cookies

PostHog's [cookieless tracking](https://posthog.com/docs/data/cookieless-tracking) has two parts.

1. **Turn it on in the project.** In Project Settings, under Web analytics, enable cookieless server hash mode. Without it, cookieless events are ignored.
2. **Configure the browser library:**

```js
posthog.init('<project token>', {
  api_host: 'https://eu.i.posthog.com', // or your own reverse-proxy path
  defaults: '2026-08-30',
  cookieless_mode: 'always',  // no cookies, localStorage or sessionStorage
  person_profiles: 'never',   // anonymous visitors never become person profiles
  autocapture: false,         // send the events you named, nothing else
  disable_session_recording: true,
  disable_conversations: true, // no Support widget on marketing pages
})
```

The project token, which starts with `phc_`, is safe to publish. Your personal API key, which starts with `phx_`, is not, per PostHog's [privacy page](https://posthog.com/docs/privacy).

**How it counts visitors.** PostHog computes a hash on its servers from the project, a salt that changes daily, the IP address, the user agent and the host. The IP is used to compute that hash, so "no IP capture" is not quite right: say the IP is used briefly to count visitors and is not stored.

**What you give up**, per the same guide:

- **Unique visitors reset every day.** Someone who returns tomorrow counts again.
- **`identify()` does nothing.** Use server events for signed-in people (next section).
- **Session replay and surveys are off.**
- **No IP-based enrichment.** That means no GeoIP and no bot detection.
- **Hashes can collide**, so two visitors can occasionally be counted as one.

**What it does not settle.** Storing nothing on the device removes the cookie, but in the EU the script itself can still fall under the device-access rule. That makes the banner question a legal judgment. [Do you need a cookie banner?](/docs/guides/cookie-notices-and-banners) explains why, and what to put in your notice.

## Signed-in use, measured from your server

Retention, activation and feature use matter most for signed-in people. You do not need the browser for them.

- **Send named events from your backend.** Examples are `signed_up`, `activated`, `feature_used` and `subscription_started`. Key each one by your own user ID, not an email address.
- **Keep personal data out of event properties.** No emails, names or free text. One guard function that removes such properties before sending is cheaper than a later clean-up.
- **Billing events come from the payment webhook,** not the browser, so they are complete even when a blocker drops the browser's requests.
- **Make the client non-blocking and switchable.** If PostHog is slow or down, your request still succeeds. One setting turns telemetry off everywhere.

Your server-side events and your cookieless page views will not join into one journey. That is the price of not storing an identifier in the browser. For a launch, a funnel from "signed up" to "activated" is usually what you need.

## PostHog Support

[PostHog Support](https://posthog.com/docs/support) puts customer conversations into a ticket inbox inside PostHog. What matters for a small team:

### What it costs and its limits

Per its [pricing page](https://posthog.com/docs/support/pricing), the widget, the inbox, every channel, workflow automation and imports are free.

| Limit | Value |
| --- | --- |
| Tickets | No cap |
| Seats | No per-seat charge |
| Email addresses per project | 10 |
| Email attachment size | 10 MB per file |
| Widget API | 30 requests a minute per browser session or IP, and 3,600 an hour per project |

### Channels

Per its [channels page](https://posthog.com/docs/support/concepts/channels), every channel lands in one inbox and replies go back the way the customer came in.

| Channel | How a ticket arrives |
| --- | --- |
| Widget | A chat button in your app |
| Email | You forward your `support@` address to PostHog; replies thread back to the customer's inbox |
| Slack | Messages, mentions or a `:ticket:` reaction |
| Microsoft Teams | Beta; messages or a mention |
| GitHub | Issues in repositories you monitor |
| API | Your own code; see below |

### The AI agent

Per its [AI agent page](https://posthog.com/docs/support/ai-agent):

- **It is opt-in and in beta.** It is not enabled for every project, and it is free while in beta. PostHog will set a price later and give notice before charging.
- **It drafts, it does not send.** Drafts are private notes for your team. It "does not reply on its own until you choose **AI reply**" for a channel and ticket type.
- **It needs your approval for AI processing.** You have to confirm that AI data processing is allowed for your organization, which brings in the AI subprocessors mentioned earlier.

### What it does not have

- **No customer portal.** PostHog's docs describe no page where customers see their tickets. A customer follows a case by email, or in the widget.
- **The widget is a chat.** It implies someone is there. If no one answers for days, that is worse than an honest form.

### Creating tickets from your own code

There are two ways, per the [channels page](https://posthog.com/docs/support/concepts/channels). A plain `POST /api/projects/:project_id/conversations/tickets/` returns `405` and creates nothing.

- **From the browser:** `posthog.conversations.sendMessage()` creates a widget ticket. The [JavaScript API](https://posthog.com/docs/support/javascript-api) keeps the widget session ID, ticket ID and the visitor's name and email in `localStorage`. It is not compatible with a site that stores nothing, so load it only when someone asks for help.
- **From your server:** the [compose API](https://posthog.com/docs/support/email) starts an email ticket and sends the first message to the customer. Send `POST /api/projects/:project_id/conversations/tickets/compose/` with:
  - `recipient_email`, `email_config_id` and `message` (required);
  - `email_subject` and `recipient_distinct_id` (optional).

  It needs a verified sending domain, which means adding PostHog's SPF and DKIM records, and a personal API key with the `ticket:write` scope. When the customer replies, the reply joins the same ticket.

The compose API fits a "we reply by email" case form:

1. **Store the case first.** Save it in your own database before calling any vendor.
2. **Start the ticket.** Call compose with the customer's address. Make the message an acknowledgment that repeats what they sent and says the reply will come by email.
3. **Answer from the inbox.** The customer replies in their own mail client.

Two cautions:

- **Spam relay.** On a form anyone can submit, compose would send email from your domain to any address typed into it. Spammers can use that. For anonymous visitors, either do not repeat their text in the acknowledgment, or confirm the address first. For signed-in people, take the address from the session.
- **The sending service.** PostHog's SPF example adds `include:mailgun.org`, which suggests replies go out through Mailgun. Mailgun is not on the subprocessor list we read. Ask PostHog before relying on it for personal data.

### Identity

For signed-in users, the [widget docs](https://posthog.com/docs/support/widget) describe identity verification. Your server signs the user's ID with an HMAC-SHA256 key from the Support settings, so their tickets follow them across browsers. Keep that key on the server.

## What we are doing

- One EU project, on the free plan, with no card. Every product shares it and is told apart by a `site` property.
- Marketing pages run cookieless, with autocapture, recording and the Support widget off.
- Signed-in use is sent from our servers, keyed by our own user ID.
- Support is a help center, plus a case form that promises an email reply and no time, plus a `support@` address. Cases are stored by us first, and PostHog Support's email channel and compose API are the first candidate for the inbox.
- No chat widget, and the AI agent stays off for replies to customers, until something answers.
- Nothing loads on screens meant for children.

## What we could not confirm

- **What happens at the free limit without a card.** PostHog emails at 80% and 100% of the free allowance. We did not find a page that says whether ingestion then stops, or for how long.
- **Whether a US and an EU organization each get their own free allowance.** The regions are separate instances, but we found no page that says so.
- **Where the AI subprocessors are,** because that list did not load for us.
- **Which US AWS region US Cloud uses.** PostHog's own pages say "USA". Only third-party sites name `us-east-1`.
- **Mailgun's role in Support email**, as above.

We will update this guide once we have set up our own project and checked these.
