---
title: 'Cloudflare'
description: 'Connect Cloudflare to PBHQ with a read-only token. What PBHQ reads, what you get back, what a Free plan does not give you, and how to fix a connection that is not working.'
section: 'integrations'
order: 10
status: 'available'
reviewed: '2026-10-23'
draft: true
references:
  - label: 'Cloudflare: Create an API token'
    url: 'https://developers.cloudflare.com/fundamentals/api/get-started/create-token/'
  - label: 'Cloudflare: Types of analytics'
    url: 'https://developers.cloudflare.com/analytics/types-of-analytics/'
  - label: 'Cloudflare: Web Analytics high-level metrics'
    url: 'https://developers.cloudflare.com/web-analytics/data-metrics/high-level-metrics/'
---

PBHQ reads your Cloudflare zones to show, for each of your sites, how much traffic it gets, what status codes it returns, and what Cloudflare's firewall saw. It only reads. It never changes your Cloudflare configuration.

This page covers what PBHQ does with Cloudflare. For how Cloudflare itself works, use [Cloudflare's own documentation](https://developers.cloudflare.com/analytics/types-of-analytics/).

## What you can do

| Capability | Status |
| --- | --- |
| Connect a Cloudflare account with a read-only API token | Available |
| Add your sites from the zones in that account | Available |
| See traffic, visitors, status codes and security events for the last 1 to 30 days (7 by default) | Available |
| See traffic by who sent it (people, search engines, AI crawlers, other bots), with daily history | In development |
| Check configuration: TLS settings, HSTS, DNSSEC, certificates | Planned |
| See real-user page speed from Cloudflare Web Analytics | Planned |

## Connect it

1. In Cloudflare, [create a custom API token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/). Grant it the read-only permissions below, and scope it to the zones you want PBHQ to see. The global API key is not supported.
2. In the PBHQ organization console, connect Cloudflare and paste the token.
3. In Add Site, choose the zones you want. Zones that are already sites are marked, and choosing one attaches this connection to it.

| Permission | Level | What it is for | Needed now? |
| --- | --- | --- | --- |
| Zone: Read | Zone | Finding your zones | Yes |
| Analytics: Read | Zone | Traffic, visitors, status codes and security events | Yes |
| Account Settings: Read | Account | Listing zones when you use an account-scoped token | Only with an account-scoped token |
| DNS, Zone Settings, SSL and Certificates, Zone WAF, Bot Management: Read | Zone | Configuration and security checks | Not yet |
| Account Analytics: Read | Account | Real-user (Web Analytics) data | Not yet |

A token that is missing a permission does not break the connection. The part of the page that needs the permission shows as unavailable, and everything else still appears.

Your token is stored encrypted. The apps that read your data never see it. They get a client that can reach only Cloudflare.

## What you get

| Measure | What it is | Worth knowing |
| --- | --- | --- |
| Requests | Every request Cloudflare handled, including bots | On very busy sites Cloudflare samples, so counts are its estimates |
| Cached requests | The share served from Cloudflare's cache | |
| Bandwidth | Bytes sent to visitors | |
| Page views | Cloudflare's count of page loads | Includes bots, so it is not a measure of audience |
| Unique visitors | Cloudflare's count of distinct visitors, by address | Counted once across the whole window, so it is not the sum of the days |
| Threats | Requests Cloudflare classed as threats | |
| Status codes | Counts by code and class (2xx, 3xx, 4xx, 5xx), and the share that were 5xx | A high 5xx share often means your server is not answering |
| Security events | Firewall events by action and source | PBHQ reads the latest 1,000 and tells you when the list was cut off |
| Daily series | Each of the above, day by day | |

You choose a window of 1 to 30 days. PBHQ reads Cloudflare when you open a page and reuses that reading for two minutes, so moving around PBHQ does not ask Cloudflare again.

Each part is read separately. If one fails, PBHQ shows the rest and says which part is missing.

## What you will not get on a Free plan

These are limits of Cloudflare's data on the Free plan, not of PBHQ. We found them while using PBHQ on our own sites.

- **Where visitors came from.** On the Free plan we tested, Cloudflare's analytics refuse to return the referrer. To learn how people find you, use Google Search Console for search queries and clicks, and a product-analytics tool for what they do on your site.
- **A reliable "this is a person" signal.** Cloudflare's bot scores come with its paid bot-management product. Without them, PBHQ estimates by combining Cloudflare's verified-bot categories, the user agent and the page requested. A bot that presents a browser's identity is counted as a person. See [Who is visiting your site?](/docs/guides/who-is-visiting-your-site).
- **Request-level detail beyond 31 days.** The detail that PBHQ uses to tell who sent your traffic is kept by Cloudflare for 31 days. Daily totals are kept for about a year. PBHQ's history feature, in development, stores daily counts so that you keep them longer.
- **Exact counts on very busy sites.** Cloudflare samples, so treat large numbers as estimates.

## What PBHQ stores

- **Your token:** encrypted, in your organization's connection store.
- **Readings:** not stored. A reading is kept in memory for two minutes for the person who asked for it.
- **History, in development:** daily counts only. Client addresses are counted and then discarded, and never written down. An administrator turns history on for a source, and PBHQ records who did.

PBHQ's Cloudflare connection sets no cookies on your visitors. If you want to measure what your visitors do in their browsers, see [Web Analytics for Product Builders](/guides/web-analytics-for-product-builders) for what each tool stores and when you need a consent banner.

## When something is not working

| What you see | What it means | What to do |
| --- | --- | --- |
| A part marked partial or unavailable | The token lacks a permission for that part | Add the permission named in the note |
| Denied | You do not have permission to use this connection | Ask an organization administrator to grant you use of it |
| Needs attention, or credential refused | Cloudflare rejected the token: it expired, was revoked, or lacks a permission | Create a new token and reconnect in the console |
| Provider unavailable | Cloudflare did not answer | Try again in a few minutes |
| No connection | Your organization has no Cloudflare connection yet | Connect one in the console |
