import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { z } from 'astro/zod'

const frameworkSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  description: z.string(),
  version: z.string(),
  date: z.string(),
  pdfUrl: z.string().optional(),
  levels: z.number().optional(),
  // 'original' = PBHQ-created IP; 'industry' = analysis of others' frameworks.
  provenance: z.enum(['original', 'industry']).optional(),
  tags: z.array(z.string()),
})

const caseStudySchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  description: z.string(),
  company: z.string(),
  industry: z.string().optional(),
  date: z.string(),
  sources: z.array(z.object({
    label: z.string(),
    url: z.string(),
  })).optional(),
  pdfUrl: z.string().optional(),
  level: z.number(),
  tags: z.array(z.string()),
  metrics: z.array(z.object({
    value: z.string(),
    label: z.string(),
    detail: z.string(),
    source: z.string().optional(),
    // 1-based index into the top-level `sources[]` array — renders as a
    // Wikipedia-style clickable footnote (e.g. "[1]") next to the metric,
    // linking to that source's entry. Omit when the metric isn't yet tied
    // to a specific checkable source.
    sourceIndex: z.number().int().positive().optional(),
    confidence: z.enum(['reported', 'estimated', 'verified']).optional(),
  })).optional(),
  summary: z.object({
    challenge: z.string(),
    approach: z.string(),
    outcome: z.string(),
  }).optional(),
  comingSoon: z.boolean().optional(),
})

const signalSchema = z.object({
  title: z.string(),
  subtitle: z.string().optional(),
  description: z.string(),
  date: z.string(),
  author: z.string(),
  authorRole: z.string().optional(),
  sources: z.array(z.object({
    label: z.string(),
    url: z.string(),
  })),
  frameworks: z.array(z.string()).optional(),
  tags: z.array(z.string()),
})

// Perspectives are first-person, bylined opinion essays (John Wang's own takes),
// distinct from Signals (which map third-party claims to the frameworks).
const perspectiveSchema = z.object({
  title: z.string(),
  subtitle: z.string().optional(),
  description: z.string(),
  date: z.string(),
  author: z.string().default('John Wang'),
  authorRole: z.string().default('Founder, ProductBuildersHQ'),
  pdfUrl: z.string().optional(),
  references: z.array(z.object({
    label: z.string(),
    url: z.string(),
  })).optional(),
  frameworks: z.array(z.string()).optional(),
  tags: z.array(z.string()),
})

// Guides are researched, practical write-ups for people building products:
// what a tool or practice does, what it costs, and what to do. Unlike
// Perspectives (opinion), a guide cites its sources and carries a `reviewed`
// date, because the facts it states (vendor behavior, regulation) change.
const guideSchema = z.object({
  title: z.string(),
  subtitle: z.string().optional(),
  description: z.string(),
  date: z.string(),
  // Date the facts were last checked against the cited sources.
  reviewed: z.string(),
  // A draft renders in the dev server and is left out of production builds.
  draft: z.boolean().default(false),
  author: z.string().default('ProductBuildersHQ'),
  authorRole: z.string().optional(),
  references: z.array(z.object({
    label: z.string(),
    url: z.string(),
  })).optional(),
  frameworks: z.array(z.string()).optional(),
  tags: z.array(z.string()),
})

const frameworks = defineCollection({
  loader: glob({ base: './src/content/frameworks', pattern: '**/*.md' }),
  schema: frameworkSchema,
})

const caseStudies = defineCollection({
  loader: glob({ base: './src/content/case-studies', pattern: '**/*.md' }),
  schema: caseStudySchema,
})

const signals = defineCollection({
  loader: glob({ base: './src/content/signals', pattern: '**/*.md' }),
  schema: signalSchema,
})

const guides = defineCollection({
  loader: glob({ base: './src/content/guides', pattern: '**/*.md' }),
  schema: guideSchema,
})

const perspectives = defineCollection({
  loader: glob({ base: './src/content/perspectives', pattern: '**/*.md' }),
  schema: perspectiveSchema,
})

export const collections = { frameworks, caseStudies, signals, perspectives, guides }
