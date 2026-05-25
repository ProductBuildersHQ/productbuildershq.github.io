import { Link } from 'react-router'
import frameworks from '@/data/frameworks.json'
import type { Framework } from '@/lib/types'

export default function Frameworks() {
  return (
    <div className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Frameworks</h1>
          <p className="text-xl text-[var(--color-text-muted)] max-w-3xl">
            Maturity models and methodologies for product builders. Each framework
            provides a structured path for growth with tools, metrics, and practices.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {(frameworks as Framework[]).map((framework) => (
            <Link
              key={framework.slug}
              to={`/frameworks/${framework.slug}`}
              className="group block p-8 bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl no-underline hover:border-[var(--color-primary)] hover:shadow-lg transition-all"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-sm font-medium px-3 py-1 bg-[var(--color-primary)]/10 text-[var(--color-primary)] rounded-full">
                      {framework.levels} Levels
                    </span>
                    <span className="text-sm text-[var(--color-text-subtle)]">
                      {framework.version} &middot; {framework.date}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold mb-2 text-[var(--color-text)] group-hover:text-[var(--color-primary)]">
                    {framework.title}
                  </h2>
                  <p className="text-base text-[var(--color-text-muted)] mb-4">
                    {framework.subtitle}
                  </p>
                  <p className="text-sm text-[var(--color-text-muted)]">
                    {framework.description}
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <span className="inline-flex items-center justify-center w-12 h-12 bg-[var(--color-primary)]/10 rounded-lg text-[var(--color-primary)] group-hover:bg-[var(--color-primary)] group-hover:text-white transition-colors">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </span>
                </div>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {framework.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-1 bg-[var(--color-bg-secondary)] text-[var(--color-text-muted)] rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
