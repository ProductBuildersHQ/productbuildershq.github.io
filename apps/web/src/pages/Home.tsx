import { Link } from 'react-router'
import frameworks from '@/data/frameworks.json'
import caseStudies from '@/data/case-studies.json'
import type { Framework, CaseStudy } from '@/lib/types'

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 md:py-32 bg-[var(--color-bg-secondary)]">
        <div className="max-w-7xl mx-auto px-5 md:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-[var(--color-primary-dark)]">
            ProductBuildersHQ
          </h1>
          <p className="text-xl md:text-2xl text-[var(--color-text-muted)] max-w-3xl mx-auto mb-8">
            Frameworks and case studies for the evolution of product development.
            From AI-assisted to AI-operated.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/frameworks"
              className="inline-flex items-center justify-center px-6 py-3 bg-[var(--color-primary-dark)] text-white font-medium rounded-lg no-underline hover:bg-[var(--color-primary)] transition-colors"
            >
              Explore Frameworks
            </Link>
            <Link
              to="/case-studies"
              className="inline-flex items-center justify-center px-6 py-3 bg-[var(--color-accent)] text-[var(--color-primary-dark)] font-medium rounded-lg no-underline hover:bg-[var(--color-accent-light)] transition-colors"
            >
              View Case Studies
            </Link>
          </div>
        </div>
      </section>

      {/* Frameworks */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">Frameworks</h2>
              <p className="text-[var(--color-text-muted)] text-lg">
                Maturity models for product builders
              </p>
            </div>
            <Link
              to="/frameworks"
              className="hidden sm:inline-flex text-[var(--color-primary)] hover:underline no-underline text-sm font-medium"
            >
              View all &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {(frameworks as Framework[]).map((framework) => (
              <Link
                key={framework.slug}
                to={`/frameworks/${framework.slug}`}
                className="group block p-6 bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl no-underline hover:border-[var(--color-primary)] hover:shadow-lg transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-xs font-medium px-2 py-1 bg-[var(--color-primary)]/10 text-[var(--color-primary)] rounded">
                    {framework.levels} Levels
                  </span>
                  <span className="text-xs text-[var(--color-text-subtle)]">
                    {framework.version}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-[var(--color-text)] group-hover:text-[var(--color-primary)]">
                  {framework.title}
                </h3>
                <p className="text-sm text-[var(--color-text-muted)] mb-4">
                  {framework.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {framework.tags.slice(0, 3).map((tag) => (
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
      </section>

      {/* Case Studies */}
      <section className="py-16 md:py-24 bg-[var(--color-bg-secondary)]">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">Case Studies</h2>
              <p className="text-[var(--color-text-muted)] text-lg">
                Real-world implementations of AI-native development
              </p>
            </div>
            <Link
              to="/case-studies"
              className="hidden sm:inline-flex text-[var(--color-primary)] hover:underline no-underline text-sm font-medium"
            >
              View all &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {(caseStudies as CaseStudy[]).map((study) => (
              <div
                key={study.slug}
                className={`p-6 bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl ${
                  study.comingSoon ? 'opacity-60' : ''
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-xs font-medium px-2 py-1 bg-[var(--color-accent)] text-[var(--color-primary-dark)] rounded">
                    Level {study.level}
                  </span>
                  {study.comingSoon && (
                    <span className="text-xs font-medium px-2 py-1 bg-[var(--color-text-muted)]/20 text-[var(--color-text-muted)] rounded">
                      Coming Soon
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-semibold mb-1 text-[var(--color-text)]">
                  {study.title}
                </h3>
                <p className="text-sm text-[var(--color-primary)] mb-3">
                  {study.company}
                </p>
                <p className="text-sm text-[var(--color-text-muted)] mb-4">
                  {study.description}
                </p>
                {!study.comingSoon && (
                  <Link
                    to={`/case-studies/${study.slug}`}
                    className="text-sm font-medium text-[var(--color-primary)] no-underline hover:underline"
                  >
                    Read case study &rarr;
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-5 md:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to evolve your product development?
          </h2>
          <p className="text-lg text-[var(--color-text-muted)] mb-8">
            Download our frameworks and start your journey from AI-assisted to AI-operated.
          </p>
          <Link
            to="/frameworks"
            className="inline-flex items-center justify-center px-6 py-3 bg-[var(--color-primary)] text-white font-medium rounded-lg no-underline hover:bg-[var(--color-primary-light)] transition-colors"
          >
            Get Started
          </Link>
        </div>
      </section>
    </>
  )
}
