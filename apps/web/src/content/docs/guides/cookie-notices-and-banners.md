---
title: 'Do you need a cookie banner?'
description: 'When a site needs a privacy notice, when it also needs a consent banner, and why "cookieless" does not settle it in the EU. Tool by tool for Cloudflare, PostHog, Google Analytics 4 and Microsoft Clarity, with the EU, UK and French positions, what a notice should say, and what a banner must do.'
section: 'guides'
order: 40
status: 'available'
reviewed: '2026-10-25'
references:
  - label: 'EUR-Lex: Directive 2002/58/EC (ePrivacy), consolidated'
    url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:02002L0058-20091219'
  - label: 'EDPB: Guidelines 2/2023 on the technical scope of Article 5(3) of the ePrivacy Directive (version 2.0)'
    url: 'https://www.edpb.europa.eu/documents/guideline/guidelines-22023-on-technical-scope-of-art-53-of-eprivacy-directive_en'
  - label: 'EDPB: Report of the work undertaken by the Cookie Banner Taskforce'
    url: 'https://www.edpb.europa.eu/documents/task-force-report/report-of-the-work-undertaken-by-the-cookie-banner-taskforce_en'
  - label: 'CNIL: Sheet n°16, use analytics on your websites and applications'
    url: 'https://www.cnil.fr/en/sheet-ndeg16-use-analytics-your-websites-and-applications'
  - label: 'ICO: Guidance on the use of storage and access technologies'
    url: 'https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guidance-on-the-use-of-storage-and-access-technologies/'
  - label: 'legislation.gov.uk: Data (Use and Access) Act 2025'
    url: 'https://www.legislation.gov.uk/ukpga/2025/18/contents'
  - label: 'legislation.gov.uk: Data (Use and Access) Act 2025, section 112 (storing information in terminal equipment)'
    url: 'https://www.legislation.gov.uk/ukpga/2025/18/section/112'
  - label: 'legislation.gov.uk: The Data (Use and Access) Act 2025 (Commencement No. 6 and Transitional and Saving Provisions) Regulations 2026, regulation 2'
    url: 'https://www.legislation.gov.uk/uksi/2026/82/regulation/2/made'
  - label: 'EUR-Lex: Digital Omnibus proposal, COM(2025) 837'
    url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:52025PC0837'
  - label: 'European Parliament Legislative Observatory: procedure 2025/0360(COD), Digital Omnibus'
    url: 'https://oeil.europarl.europa.eu/oeil/en/procedure-file?reference=2025/0360(COD)'
  - label: 'Cloudflare: Cloudflare cookies'
    url: 'https://developers.cloudflare.com/fundamentals/get-started/cloudflare-cookies/'
  - label: 'Cloudflare: Privacy-first Web Analytics (blog)'
    url: 'https://blog.cloudflare.com/privacy-first-web-analytics/'
  - label: 'PostHog: Cookieless tracking'
    url: 'https://posthog.com/docs/data/cookieless-tracking'
  - label: 'PostHog: Support JavaScript API reference (persistence)'
    url: 'https://posthog.com/docs/support/javascript-api'
  - label: 'Google: Cookies used by Google Analytics 4'
    url: 'https://support.google.com/analytics/answer/11397207'
  - label: 'Google: Consent mode'
    url: 'https://support.google.com/analytics/answer/9976101'
  - label: 'Google: EU-focused data and privacy in Google Analytics'
    url: 'https://support.google.com/analytics/answer/12017362'
  - label: 'Microsoft Learn: Clarity cookies'
    url: 'https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-cookies'
  - label: 'Microsoft Learn: Clarity consent mode'
    url: 'https://learn.microsoft.com/en-us/clarity/setup-and-installation/consent-mode'
  - label: 'Microsoft Learn: About Clarity'
    url: 'https://learn.microsoft.com/en-us/clarity/setup-and-installation/about-clarity'
---

Every site that measures its visitors needs a **privacy notice**. Some also need a **consent banner**. The two come from different laws, and mixing them up is how sites end up with a banner that does nothing, or without one when they need it.

This page is research, not legal advice. For what each tool measures and how they compare, see [Web Analytics for Product Builders](/guides/web-analytics-for-product-builders).

## The short version

- **A notice is always required.** The GDPR requires it whenever you process personal data, and analytics usually involves some.
- **A banner is required when you store or read something on the visitor's device and no exemption applies.** That rule is Article 5(3) of the [ePrivacy Directive](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:02002L0058-20091219), and the UK's version, PECR.
- **"Cookieless" removes the cookie, not the question.** The EDPB reads Article 5(3) to cover a script that makes the browser send information, even when it stores nothing. Whether consent is then needed depends on an exemption, and the EU, France and the UK answer that differently.
- **Server-side measurement is the only kind outside the rule entirely.** Cloudflare's request analytics is an example.
- **GA4 and Clarity set cookies.** Gate both behind consent for visitors from the EEA, the UK and Switzerland.

## Why "cookieless" is not the end of it

The EDPB's [Guidelines 2/2023](https://www.edpb.europa.eu/documents/guideline/guidelines-22023-on-technical-scope-of-art-53-of-eprivacy-directive_en), final version adopted in October 2024, set out when Article 5(3) applies. Three passages matter for analytics:

- **Scripts (paragraph 33).** JavaScript "where the accessing entity instructs the browser of the user to send asynchronous requests with the targeted information" is access that "clearly falls within the scope" of the rule. That describes most analytics beacons, with or without cookies.
- **Pixels and tracking links (paragraphs 50–51).** They are covered too, including when built by a script.
- **IP-based tracking (paragraph 55).** Tracking based on the IP address alone can be covered. Unless you can be sure the address does not come from the user's own device, you "take all the steps" the rule requires.

The guidelines then add (paragraph 56) that being in scope "does not systematically mean that consent needs to be collected". They leave the exemptions to be assessed case by case. So for a cookieless analytics script, the EU-wide answer is: in scope, consent unless an exemption applies.

National regulators fill that gap differently:

- **France.** The CNIL [exempts audience measurement](https://www.cnil.fr/en/sheet-ndeg16-use-analytics-your-websites-and-applications) from consent when all of its conditions are met:
  - the data is used only to produce anonymous statistics for the site itself;
  - it is not combined with other data or shared;
  - there is no tracking across sites;
  - visitors are told and can object;
  - IP addresses are truncated;
  - trackers last no more than 13 months.

  The CNIL warns that vendors who reuse the data for their own purposes fall outside the exemption.
- **The UK.** The Data (Use and Access) Act 2025 added exceptions to PECR's consent rule, including one for statistical purposes: measuring how a service is used in order to improve it. [Section 112](https://www.legislation.gov.uk/ukpga/2025/18/section/112), which makes that change, came into force on 5 February 2026, under [regulation 2 of the commencement regulations](https://www.legislation.gov.uk/uksi/2026/82/regulation/2/made). The ICO's [storage and access guidance](https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guidance-on-the-use-of-storage-and-access-technologies/) says you must still tell people clearly and give them a simple way to object.
- **A possible EU change.** On 19 November 2025 the European Commission proposed its [Digital Omnibus](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:52025PC0837), which would move the cookie rule into the GDPR, with a consent exemption for a provider's own audience measurement. The text is still being negotiated, per the Parliament's [procedure file](https://oeil.europarl.europa.eu/oeil/en/procedure-file?reference=2025/0360(COD)), and it is not law. Today's rules apply until it is adopted.

What that means in practice: a first-party, cookieless, aggregate analytics setup is the low-risk choice. It fits the French and UK exemptions when you give notice and an opt-out. In the rest of the EU it rests on the same reasoning, but no rule says so outright. If most of your audience is in one EU country, check that country's regulator.

## Tool by tool

| Tool | What it puts on or reads from the device | EU position | What to do |
| --- | --- | --- | --- |
| Cloudflare HTTP analytics | Nothing; it counts requests at Cloudflare's edge | Outside Article 5(3) | List it in your notice under hosting |
| Cloudflare security cookies | `__cf_bm` for bot management, and challenge cookies such as `cf_clearance` | Cloudflare [classes them as strictly necessary](https://developers.cloudflare.com/fundamentals/get-started/cloudflare-cookies/) | Name them in your notice. They are usually exempt |
| Cloudflare Web Analytics | A script; Cloudflare says it uses no "client-side state (like cookies or localStorage)" for analytics, per its [announcement](https://blog.cloudflare.com/privacy-first-web-analytics/) | In scope as a script; low risk, aggregate | Notice, plus an opt-out where your regulator expects one |
| PostHog, cookieless | A script; [nothing stored](https://posthog.com/docs/data/cookieless-tracking). The IP is used on PostHog's servers to compute a daily hash | In scope as a script; aggregate, with daily-reset counts | Notice, an opt-out, and an EU project |
| PostHog, default settings | A cookie and `localStorage` holding an identifier | Consent needed | A banner, or switch to cookieless |
| PostHog Support widget | `localStorage`: widget session, ticket ID, and the name and email entered, per its [JavaScript API](https://posthog.com/docs/support/javascript-api) | Arguably necessary once someone asks for help; not on every page view | Load it only when a visitor opens support, and say so in the notice |
| Google Analytics 4 | `_ga` and `_ga_<container-id>` cookies, two-year default, per [Google](https://support.google.com/analytics/answer/11397207) | Consent needed | Banner plus [consent mode](https://support.google.com/analytics/answer/9976101) |
| Microsoft Clarity | `_clck` and `_clsk` first-party cookies, plus third-party cookies, per [Microsoft](https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-cookies) | Consent needed; Microsoft [enforces consent signals](https://learn.microsoft.com/en-us/clarity/setup-and-installation/consent-mode) for the EEA, UK and Switzerland | Banner, and send Clarity the choice |

A few details behind the table:

- **GA4 consent mode.**
  - When `analytics_storage` is denied, GA4 "will not read or write first-party analytics cookies" and sends "cookieless pings" with coarse data instead.
  - In an *advanced* setup those pings are sent before the visitor chooses. Under the EDPB's reading of scripts, that is itself access, so prefer the *basic* setup, which loads nothing until consent.
  - Google says it does not log or store individual IP addresses from EU, Swiss or UK users, per its [EU data page](https://support.google.com/analytics/answer/12017362).
- **Clarity and children.** Microsoft says Clarity "shouldn't be used on websites or apps that target users under 18 years of age", per its [overview](https://learn.microsoft.com/en-us/clarity/setup-and-installation/about-clarity).
- **A form with a bot challenge.** If you protect a form with Cloudflare Turnstile, list it with the security cookies.

## What the notice should say about analytics

For each tool:

| Item | Example |
| --- | --- |
| The tool and its operator | "PostHog, operated by PostHog, Inc." |
| What it collects | "Pages viewed, the buttons named below, browser type, and the referring site" |
| What it does not do | "It stores nothing on your device and does not recognize you on a later day" |
| Why, and the legal basis | "To learn which pages help visitors; our legitimate interest in improving the site" |
| Where the data is stored | "In the European Union (Frankfurt)" |
| How long it is kept | "One year" |
| How to object | A link or switch that turns measurement off |

Write it before you add the tool, and update it when you change a setting. A notice that says "no cookies" while a tool sets one is worse than no claim at all.

## What a banner must do, if you need one

From the GDPR's consent rules and the EDPB's [cookie banner taskforce report](https://www.edpb.europa.eu/documents/task-force-report/report-of-the-work-undertaken-by-the-cookie-banner-taskforce_en):

- **Nothing runs before the choice.** Load consent-gated tools only after acceptance.
- **Rejecting is as easy as accepting.** Put a reject button on the first layer, and use no pre-ticked boxes.
- **Choices are specific.** Analytics, recording and advertising are separate.
- **Withdrawing is as easy as giving** (GDPR Article 7(3)), with a link that is always visible.
- **The choice reaches the tools.** Send it to GA4's consent mode and to Clarity, and remove what they stored when consent is withdrawn. A banner that records a choice but does not change what runs does nothing.
- **You can show the choice.** Keep a record of what was accepted and when.

For US visitors, many state laws focus on opting out of sale or sharing rather than on opting in. Honor the [Global Privacy Control](https://globalprivacycontrol.org/) signal if you share data for advertising.

## A sequence that keeps you banner-free as long as possible

1. **Server side only.** Cloudflare HTTP analytics. Publish a notice.
2. **Add an aggregate, storage-free script.** Cloudflare Web Analytics or PostHog in cookieless mode, in an EU project, with autocapture and recording off. Add an opt-out and update the notice first.
3. **Measure signed-in people from your server,** not the browser.
4. **Add a banner only for tools that need one,** such as GA4 or Clarity, and load them only after consent.
5. **Never load any of it on screens meant for children.**

[Web Analytics for Product Builders](/guides/web-analytics-for-product-builders) compares what each step tells you. [Setting Up PostHog for a Launch](/guides/posthog-for-a-launch) shows the PostHog configuration.
