---
title: 'What GDPR asks of a product builder'
description: 'Whether the GDPR applies to you, and the dozen things it asks of a small product team: a record of what you collect, a lawful basis, a privacy notice, contracts with your vendors, transfers, rights requests, breaches, and children. With the article for each, and what is usually enough at launch.'
section: 'guides'
order: 30
status: 'available'
reviewed: '2026-10-25'
draft: true
references:
  - label: 'EUR-Lex: Regulation (EU) 2016/679 (GDPR)'
    url: 'https://eur-lex.europa.eu/eli/reg/2016/679/oj'
  - label: 'EUR-Lex: Commission Implementing Decision (EU) 2023/1795 (EU-US Data Privacy Framework)'
    url: 'https://eur-lex.europa.eu/eli/dec_impl/2023/1795/oj'
  - label: 'European Commission: International dimension of data protection'
    url: 'https://commission.europa.eu/law/law-topic/data-protection/international-dimension-data-protection_en'
  - label: 'Court of Justice: Case C-703/25 P, Latombe v Commission (appeal)'
    url: 'https://curia.europa.eu/juris/liste.jsf?num=C-703/25'
  - label: 'EDPB: Guidelines and recommendations'
    url: 'https://www.edpb.europa.eu/our-work-tools/general-guidance/guidelines-recommendations-best-practices_en'
  - label: 'ICO: UK GDPR guidance and resources'
    url: 'https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/'
  - label: 'PostHog: GDPR compliance'
    url: 'https://posthog.com/docs/privacy/gdpr-compliance'
---

The GDPR is the EU's data-protection law. The UK has a near-identical copy, the UK GDPR. Both are long, but for a small product the work comes down to about a dozen things, most of which are writing down what you already do.

This page is research, not legal advice. Article numbers refer to the [GDPR](https://eur-lex.europa.eu/eli/reg/2016/679/oj). Cookies and banners come from a different law, covered in [Do you need a cookie banner?](/docs/guides/cookie-notices-and-banners).

## Does it apply to you?

- **You are established in the EU or UK:** it applies to everything you process (Article 3(1)).
- **You are outside both, but offer goods or services to people in the EU, or monitor their behavior there:** it applies to that processing (Article 3(2)).
  - **What counts as offering.** A site anyone can reach does not count on its own. Recital 23 points to signs such as EU languages or currencies, or mentioning EU customers.
  - **Monitoring.** Recital 24 describes monitoring as tracking people on the internet, including profiling. Product analytics of EU visitors can count.
- **It covers personal data:** anything that relates to an identifiable person (Article 4(1)). That includes an email address, a user ID tied to an account, and often an IP address.

If you sell online to anyone who signs up, assume it applies.

## Two roles: controller and processor

- **For your own users, you are the controller.** You decide what is collected and why.
- **Your vendors are processors.** Hosting, analytics, email and payments are examples. They act on your instructions.
- **If you run a B2B product that holds your customers' end-user data, you are also a processor,** for your customers. They will ask you for a Data Processing Agreement. Have one ready before the first business customer asks.

## What it asks, and what is usually enough at launch

| What | Article | What it asks | Usually enough at launch |
| --- | --- | --- | --- |
| Know what you hold | 30, 5(1) | A record of each purpose, the data, who receives it, where it goes, and how long you keep it | One table, kept with your code. The exemption for organizations under 250 people does not apply when processing is regular, which it is for a product |
| A lawful basis for each purpose | 6 | One of six bases. For products: contract (running the account), legitimate interests (security, basic analytics), consent (anything optional) | Write the basis next to each purpose in your table |
| Collect only what you need | 5(1)(c), 25 | Minimization, and privacy-protective defaults | No free text in analytics, no email as an analytics property, short retention by default |
| Keep it only as long as needed | 5(1)(e) | A retention period for each kind of data | Set retention in each tool, such as 1 year for analytics |
| Tell people | 13, 14 | Who you are, what you collect, why, the basis, who receives it, transfers, retention, people's rights, and how to complain | A privacy notice that names every tool you run. Update it before you add a tool, not after |
| Contracts with vendors | 28 | A written contract with each processor | Sign each vendor's DPA. Many are self-serve, and PostHog's is free on every plan |
| Transfers outside the EU | 44–49 | A transfer mechanism: an adequacy decision, Standard Contractual Clauses, or another listed safeguard | Prefer a vendor's EU region where offered. Otherwise check that the vendor is certified under the Data Privacy Framework or signs SCCs |
| Rights requests | 12, 15–22 | Access, correction, deletion, portability and objection, answered within one month (extendable by two in hard cases) | One documented way in, such as an email address, and a way to export and delete an account's data, including from your analytics tool |
| Security | 32 | Measures appropriate to the risk | Encryption in transit and at rest, least-privilege access, secrets out of code, backups you have restored |
| Breaches | 33, 34 | Tell the supervisory authority within 72 hours unless the breach is unlikely to put people at risk. Tell the people affected when the risk is high | A short runbook that says who decides and how to notify |
| Risky processing | 35 | A data protection impact assessment when processing is likely to be high risk | Needed if you profile people at scale, monitor them systematically, or build for children |
| A representative | 27 | A representative in the EU if you are outside the EU and Article 3(2) applies, unless your processing is occasional and low risk | A product with regular EU users usually needs one. Paid representative services exist. The UK GDPR has the same rule for the UK |
| A data protection officer | 37 | Only when your core activities are large-scale monitoring or large-scale special-category data | Rarely needed at launch |

## Transfers to the US

Most product stacks use US vendors, so this is the item that raises the most questions.

- **The Data Privacy Framework.** The European Commission's [adequacy decision](https://eur-lex.europa.eu/eli/dec_impl/2023/1795/oj) of July 2023 lets data flow to US companies certified under it.
  - The EU General Court dismissed a challenge to the decision in September 2025.
  - An appeal is pending before the Court of Justice as [Case C-703/25 P](https://curia.europa.eu/juris/liste.jsf?num=C-703/25). The court struck down the two earlier arrangements.
- **Standard Contractual Clauses** are the usual fallback. Many vendors' DPAs include both, so a ruling against the framework does not stop the transfer.
- **An EU region removes most of the question for stored data.** It may not remove all of it: the vendor's DPA can still allow processing elsewhere. [Setting Up PostHog for a Launch](/guides/posthog-for-a-launch) shows an example.

## Consent is narrower than people think

Consent is one lawful basis of six, not a requirement for everything. When you do rely on it, it must be:

- freely given, specific, informed and unambiguous (Article 4(11));
- as easy to withdraw as to give (Article 7(3));
- something you can show was given (Article 7(1)).

Running the account a customer signed up for is a contract basis, not consent. The consent most sites ask for is mainly for device storage under the ePrivacy rules, which is a separate law: see [Do you need a cookie banner?](/docs/guides/cookie-notices-and-banners).

## Children

- **When a service is offered directly to a child and consent is your basis,** the child must be at least 16, or the age a member state sets, which cannot be lower than 13. Below that age, a parent must consent (Article 8).
- **Recital 38 asks for particular care** with children's data in marketing and profiling.
- **In the US, COPPA** sets its own rules for children under 13.

If you build for children, the simplest rule is that child-facing screens load no analytics, no session recording and no chat.

## The UK

The UK GDPR and the Data Protection Act 2018 mirror the GDPR. The UK's cookie rules sit in a separate law, PECR, which changed in 2026, so it is covered on the cookie page. The [ICO](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/) is the regulator and publishes plain-language guidance.

## A launch checklist

1. List every tool that touches personal data, and what each one holds.
2. Write the record: purpose, data, basis, recipient, region, retention.
3. Sign each vendor's DPA, and choose an EU region where it costs nothing extra.
4. Publish a privacy notice that matches the record.
5. Set retention in each tool.
6. Decide how you will answer access and deletion requests, and test it on your own account.
7. Write a breach runbook of one page.
8. Decide whether you need an EU or UK representative.
9. Keep personal data out of analytics events.
10. Re-check all of this when you add a tool.

## What PBHQ does with your data

For what PBHQ stores when you connect a service, see each integration page. For example, the [Cloudflare](/docs/integrations/cloudflare) page says PBHQ encrypts your token, does not store readings, and counts client addresses without writing them down.
