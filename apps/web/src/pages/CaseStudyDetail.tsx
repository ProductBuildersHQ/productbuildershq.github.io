import { useParams, Link } from 'react-router'
import caseStudies from '@/data/case-studies.json'
import type { CaseStudy } from '@/lib/types'

export default function CaseStudyDetail() {
  const { slug } = useParams()
  const study = (caseStudies as CaseStudy[]).find((s) => s.slug === slug)

  if (!study) {
    return (
      <div className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-5 md:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Case Study Not Found</h1>
          <p className="text-[var(--color-text-muted)] mb-8">
            The case study you're looking for doesn't exist.
          </p>
          <Link
            to="/case-studies"
            className="text-[var(--color-primary)] hover:underline"
          >
            &larr; Back to Case Studies
          </Link>
        </div>
      </div>
    )
  }

  if (study.comingSoon) {
    return (
      <div className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-5 md:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Coming Soon</h1>
          <p className="text-[var(--color-text-muted)] mb-8">
            This case study is currently being developed.
          </p>
          <Link
            to="/case-studies"
            className="text-[var(--color-primary)] hover:underline"
          >
            &larr; Back to Case Studies
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="py-8 md:py-12">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        {/* Back link */}
        <Link
          to="/case-studies"
          className="inline-flex items-center text-sm text-[var(--color-text-muted)] hover:text-[var(--color-primary)] no-underline mb-6"
        >
          <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Case Studies
        </Link>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{study.title}</h1>
          <p className="text-xl text-[var(--color-primary)] mb-4">{study.subtitle}</p>
          <p className="text-[var(--color-text-muted)] mb-6 max-w-3xl">
            {study.description}
          </p>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className="inline-flex items-center text-sm font-medium px-3 py-1.5 bg-[var(--color-accent)] text-[var(--color-primary-dark)] rounded-full">
              Level {study.level}
            </span>
            <span className="text-sm font-medium text-[var(--color-text)]">
              {study.company}
            </span>
            <span className="text-sm text-[var(--color-text-subtle)]">
              {study.date}
            </span>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-3">
            <a
              href={study.pdfUrl}
              download
              className="inline-flex items-center justify-center px-5 py-2.5 bg-[var(--color-primary-dark)] text-white font-medium rounded-lg no-underline hover:bg-[var(--color-primary)] transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download PDF
            </a>
            <a
              href={study.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-5 py-2.5 border border-[var(--color-border)] text-[var(--color-text)] font-medium rounded-lg no-underline hover:bg-[var(--color-bg-secondary)] transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Open in New Tab
            </a>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {study.tags.map((tag) => (
            <span
              key={tag}
              className="text-sm px-3 py-1 bg-[var(--color-bg-secondary)] text-[var(--color-text-muted)] rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* PDF Viewer */}
        <div className="border border-[var(--color-border)] rounded-lg overflow-hidden bg-[var(--color-bg-elevated)]">
          <iframe
            src={study.pdfUrl}
            className="w-full h-[75vh] min-h-[600px]"
            title={`${study.title} PDF`}
          />
        </div>
      </div>
    </div>
  )
}
