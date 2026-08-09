#!/usr/bin/env node
// generate-marp-deck.mjs — render the ProductBuilder deck content
// (apps/web/src/data/productbuilder-deck.json) as a Marp presentation with
// per-slide narration comments, the input format consumed by
// grokify/videoascode (vac) for TTS voiceover + video generation.
//
// One content source, two renders: /presentation on the site, and this Marp
// file for the video pipeline. Never edit the output by hand; edit the JSON.
//
// Usage: node scripts/generate-marp-deck.mjs
// Output: presentation/what-is-a-productbuilder.marp.md

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const deck = JSON.parse(
  readFileSync(join(root, 'apps/web/src/data/productbuilder-deck.json'), 'utf8')
)

const header = `---
marp: true
theme: default
paginate: true
style: |
  section {
    background: #064e3b;
    color: #f1f5f9;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    font-size: 26px;
    padding: 60px 70px;
  }
  section h1 { color: #ffffff; font-size: 1.6em; line-height: 1.15; }
  section h6 { color: #eab308; text-transform: uppercase; letter-spacing: 0.2em; font-size: 0.55em; font-weight: 600; }
  section strong { color: #eab308; }
  section ul { line-height: 1.5; }
  section a { color: #34d399; }
---
`

const slideMd = (slide) => {
  const points = slide.points.map((p) => `- ${p}`).join('\n')
  return `###### ${slide.kicker}

# ${slide.title}

${points}

<!--
${slide.narration}
-->
`
}

const body = deck.slides.map(slideMd).join('\n---\n\n')
const out = header + '\n' + body

const outDir = join(root, 'presentation')
mkdirSync(outDir, { recursive: true })
const outPath = join(outDir, 'what-is-a-productbuilder.marp.md')
writeFileSync(outPath, out)
console.log(`wrote ${outPath} (${out.length} bytes, ${deck.slides.length} slides)`)
