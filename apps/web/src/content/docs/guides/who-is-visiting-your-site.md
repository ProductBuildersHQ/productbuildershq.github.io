---
title: 'Who is visiting your site?'
description: 'Split your traffic into people, search engines, AI crawlers and other bots. How PBHQ decides, why the number for people is an estimate, a worked example from a site that came back from the dead, and what to do with each group.'
section: 'guides'
order: 10
status: 'in-development'
reviewed: '2026-10-23'
draft: true
references:
  - label: 'Cloudflare: Types of analytics'
    url: 'https://developers.cloudflare.com/analytics/types-of-analytics/'
  - label: 'Cloudflare: Web Analytics high-level metrics'
    url: 'https://developers.cloudflare.com/web-analytics/data-metrics/high-level-metrics/'
  - label: 'Parallel Web Systems: its crawler documentation (an example of an AI-agent crawler)'
    url: 'https://docs.parallel.ai/resources/crawler'
---

A raw request count tells you how often your server was asked for something. It does not tell you how many people came. On a site that has just come back online, most of the requests are often not people at all, and the sooner you can see the split, the better your decisions.

## The short version

- Your analytics probably count bots as visitors. Split them out before you judge a launch.
- PBHQ sorts traffic into five groups, using Cloudflare's verified-bot lists, the browser or agent name, and the page asked for.
- The number for people is an estimate and an upper bound. Treat it as "browser-like traffic", and confirm it with a measure that runs in a real browser.

## The five groups

| Group | What PBHQ counts here |
| --- | --- |
| People (estimated) | Everything that looks like a browser fetching your site and is not in a group below |
| Search engines | A search crawler that Cloudflare has verified, such as Googlebot or Bingbot |
| AI crawlers and agents | A known AI provider's agent by name (for example GPTBot, ClaudeBot, PerplexityBot, or the agents that fetch a page when someone asks an assistant), or any client Cloudflare verifies in an AI category |
| Other verified bots | Any other client Cloudflare verifies: SEO tools, uptime monitors, link previews |
| Unverified bots | A bot name Cloudflare has not verified, an empty or tool-like agent, a client that is not a browser, or a browser identity probing for exploits |

A few of the rules matter more than they look:

- **A search crawler counts as a search engine only if Cloudflare verified it.** Anyone can claim to be Googlebot. A claim that Cloudflare could not verify goes to unverified bots.
- **An AI agent is recognized by name whether or not Cloudflare verified it,** because the names are specific and rarely forged for harm.
- **Cloudflare's own category wins where it has one.** Some crawlers you would call search engines, such as Applebot, are filed by Cloudflare as AI, and PBHQ follows Cloudflare so that you can reconcile with its dashboard.

## Why "people" is an estimate

Without Cloudflare's paid bot scores, PBHQ cannot tell a person from a bot that presents a browser's identity. Such a bot is counted as a person, so the figure is an upper bound.

Two checks help:

1. **Compare with a measure that runs in the browser.** Cloudflare Web Analytics and tools like PostHog work by running a small script. Most simple crawlers do not run it, so its visit count is a lower bound on real browsers.
2. **Look at the shape.** Real readers cluster on a few popular pages and make several requests. Traffic spread evenly across thousands of pages, one request per address, looks more like a crawl, though a site whose readers each arrive from search to read one definition looks the same.

If the two measures disagree by a large factor, believe the smaller one for people.

## A worked example

We used PBHQ on one of our own sites, ExpertGlossary.com, a reference site with about 50,000 pages. It was offline for years, and its domain kept receiving requests. We relaunched it on October 14 and 15, 2026. Here are the first 15 days (October 9 to 23), 1.11 million requests:

```
+---------------------------------------------+----------+--------+
| Group                                       | Requests |  Share |
+---------------------------------------------+----------+--------+
| AI crawlers and agents                      |     473K |  42.5% |
| People (estimated)                          |     352K |  31.6% |
| Other verified bots                         |     108K |   9.7% |
| Search engines                              |      90K |   8.1% |
| Unverified bots                             |      91K |   8.1% |
+---------------------------------------------+----------+--------+
```

What the split showed:

- **The machines came first.** Requests rose about twenty-fold on the first full day. Bing's crawler arrived the day the pages went live, Baidu's the next day, and Googlebot on the third day.
- **The AI traffic was mostly crawlers that index or collect content for AI services.** The search and answer agents tied to a person's question made about 1,850 requests in total, under 0.4% of the AI crawler traffic.
- **The people figure needed a second opinion.** Traffic labelled people was spread thinly across thousands of definitions, with about one request per address on the busiest days. That is the pattern you would see from search visitors or from disguised crawlers, and this data alone cannot tell them apart. We are adding real-user measurement before claiming readers have returned.

The same traffic, counted as one number, would have looked like 1.11 million visits.

## What to do with each group

| Group | Questions to ask |
| --- | --- |
| People | Are they real readers? Compare with a browser-side measure. Which pages do they land on, and where do they go next? |
| Search engines | Are the crawlers getting good responses? Check for errors and redirects in your status codes, and compare the crawl with the pages Google Search Console says are indexed |
| AI crawlers and agents | Which agents are they? Some build indexes or training sets, and some fetch a page for a person. You decide in your robots.txt which you allow. The ones that fetch for a person are the ones that might send readers |
| Other verified bots | Anything unexpected? Monitors and SEO tools are normal, but a heavy crawler can cost you bandwidth |
| Unverified bots | Are they probing for exploits? Look at the security events, and consider firewall rules for the paths they hit |

## What PBHQ shows today

| Feature | Status |
| --- | --- |
| Traffic, status codes and security events for 7 or 30 days | Available |
| The five-way split for a recent window, by agent and vendor | In development |
| Daily history of the split, kept beyond Cloudflare's 31 days | In development |
| A real-user measure beside the split | Planned |
| Search engine crawl and index coverage alongside it | Planned |

The split depends on Cloudflare data, so see [Cloudflare](/docs/integrations/cloudflare) for the permissions it needs and the limits of a Free plan. Because the rules are heuristics, PBHQ will record which version of the rules produced a report, so that a number can be compared with an earlier one.
