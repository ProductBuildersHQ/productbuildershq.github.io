export interface Framework {
  slug: string
  title: string
  subtitle: string
  description: string
  version: string
  date: string
  pdfUrl: string
  levels: number
  tags: string[]
}

export interface CaseStudy {
  slug: string
  title: string
  subtitle: string
  description: string
  company: string
  date: string
  pdfUrl: string
  level: number
  tags: string[]
  comingSoon?: boolean
}
