import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { z } from 'astro/zod'

const frameworkSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  description: z.string(),
  version: z.string(),
  date: z.string(),
  pdfUrl: z.string(),
  levels: z.number(),
  tags: z.array(z.string()),
})

const caseStudySchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  description: z.string(),
  company: z.string(),
  industry: z.string().optional(),
  date: z.string(),
  pdfUrl: z.string(),
  level: z.number(),
  tags: z.array(z.string()),
  metrics: z.array(z.object({
    value: z.string(),
    label: z.string(),
    detail: z.string(),
    source: z.string().optional(),
    confidence: z.enum(['reported', 'estimated', 'verified']).optional(),
  })).optional(),
  summary: z.object({
    challenge: z.string(),
    approach: z.string(),
    outcome: z.string(),
  }).optional(),
  comingSoon: z.boolean().optional(),
})

const frameworks = defineCollection({
  loader: glob({ base: './src/content/frameworks', pattern: '**/*.md' }),
  schema: frameworkSchema,
})

const caseStudies = defineCollection({
  loader: glob({ base: './src/content/case-studies', pattern: '**/*.md' }),
  schema: caseStudySchema,
})

export const collections = { frameworks, caseStudies }
