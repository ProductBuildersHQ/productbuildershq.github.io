// Structure of the documentation section at /docs/.

export type DocStatus = 'available' | 'in-development' | 'planned'

export const docSections = [
  { id: 'getting-started', title: 'Getting started', blurb: 'Sign in, add a site, connect a source.' },
  { id: 'guides', title: 'Guides', blurb: 'Answers to the questions a product builder asks, drawing on several sources.' },
  { id: 'integrations', title: 'Integrations', blurb: 'How each service connects to PBHQ, what you get from it, and what you do not.' },
  { id: 'concepts', title: 'Concepts', blurb: 'How PBHQ models sites, sources and readings, and what it stores.' },
  { id: 'reference', title: 'Reference', blurb: 'Limits by plan and a dictionary of the data.' },
  { id: 'help', title: 'Help', blurb: 'Common questions, known issues, and how to open a support case. We reply by email, not live.' },
] as const

export type DocSectionId = (typeof docSections)[number]['id']

export const statusLabels: Record<DocStatus, string> = {
  available: 'Available',
  'in-development': 'In development',
  planned: 'Planned',
}

// Pages we intend to write. The docs home lists them without links, so there
// are no thin placeholder pages for search engines to index.
export const plannedDocs: { section: DocSectionId; title: string; status: DocStatus }[] = [
  { section: 'getting-started', title: 'Sign in and add your first site', status: 'planned' },
  { section: 'guides', title: 'Is my site secure?', status: 'planned' },
  { section: 'guides', title: 'Is my site reliable?', status: 'planned' },
  { section: 'guides', title: 'Are people using my product?', status: 'planned' },
  { section: 'guides', title: 'Is it making money?', status: 'planned' },
  { section: 'integrations', title: 'Stripe', status: 'planned' },
  { section: 'integrations', title: 'PostHog', status: 'planned' },
  { section: 'integrations', title: 'Google Search Console', status: 'planned' },
  { section: 'integrations', title: 'Better Stack', status: 'planned' },
  { section: 'integrations', title: 'GitHub', status: 'planned' },
  { section: 'concepts', title: 'Sites, sources and readings', status: 'planned' },
  { section: 'concepts', title: 'How PBHQ classifies traffic', status: 'planned' },
  { section: 'concepts', title: 'History and retention', status: 'planned' },
  { section: 'reference', title: 'Recommended tools by stage', status: 'planned' },
  { section: 'reference', title: 'Limits by plan', status: 'planned' },
  { section: 'reference', title: 'Data dictionary', status: 'planned' },
  { section: 'help', title: 'Common questions', status: 'planned' },
  { section: 'help', title: 'Known issues', status: 'planned' },
  { section: 'help', title: 'Contact support', status: 'planned' },
]

export function statusClasses(status: DocStatus): string {
  switch (status) {
    case 'available':
      return 'bg-green-100 text-green-800'
    case 'in-development':
      return 'bg-amber-100 text-amber-800'
    default:
      return 'bg-[var(--color-bg-secondary)] text-[var(--color-text-muted)]'
  }
}
