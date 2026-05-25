import { Link } from 'react-router'

interface Paper {
  title: string
  description: string
  pdfUrl: string
  frameworkSlug?: string
  caseStudySlug?: string
}

const papers: Paper[] = [
  {
    title: 'Product Builder Maturity Model',
    description: 'A framework for evolving from traditional PM/Engineering roles to AI-native Product Builder capabilities.',
    pdfUrl: '/papers/product-builder-maturity-model.pdf',
    frameworkSlug: 'product-builder-maturity-model'
  },
  {
    title: 'Software Delivery Autonomy Model',
    description: 'Framework for measuring and improving team autonomy in software delivery practices.',
    pdfUrl: '/papers/software-delivery-autonomy.pdf',
    frameworkSlug: 'software-delivery-autonomy'
  },
  {
    title: 'AWS Project Mantle Case Study',
    description: 'Case study analyzing Amazon\'s Project Mantle and its approach to building autonomous delivery teams.',
    pdfUrl: '/papers/aws-project-mantle.pdf',
    caseStudySlug: 'aws-project-mantle'
  }
]

export default function Papers() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      <div className="max-w-4xl mx-auto px-5 md:px-8 py-16">
        <h1 className="text-3xl font-bold text-[var(--color-text)] mb-4">Papers</h1>
        <p className="text-[var(--color-text-muted)] mb-12">
          Research papers and frameworks for product builders.
        </p>

        <div className="space-y-6">
          {papers.map((paper) => (
            <div
              key={paper.title}
              className="bg-white border border-[var(--color-border)] rounded-lg p-6 hover:border-[var(--color-primary)] transition-colors"
            >
              <h2 className="text-xl font-semibold text-[var(--color-text)] mb-2">
                {paper.title}
              </h2>
              <p className="text-[var(--color-text-muted)] mb-4">
                {paper.description}
              </p>
              <div className="flex items-center gap-4">
                <a
                  href={paper.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-primary-dark)] text-white rounded-lg text-sm font-medium no-underline hover:bg-[var(--color-primary)] transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download PDF
                </a>
                {paper.frameworkSlug && (
                  <Link
                    to={`/frameworks/${paper.frameworkSlug}`}
                    className="text-sm text-[var(--color-primary)] no-underline hover:underline"
                  >
                    View Framework
                  </Link>
                )}
                {paper.caseStudySlug && (
                  <Link
                    to={`/case-studies/${paper.caseStudySlug}`}
                    className="text-sm text-[var(--color-primary)] no-underline hover:underline"
                  >
                    View Case Study
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
