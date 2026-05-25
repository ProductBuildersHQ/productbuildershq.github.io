export default function About() {
  return (
    <div className="py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-5 md:px-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-8">About</h1>

        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-[var(--color-text-muted)] mb-8">
            ProductBuildersHQ provides frameworks and case studies for the evolution
            of product development in the age of AI.
          </p>

          <h2 className="text-2xl font-bold mt-12 mb-4">Our Mission</h2>
          <p className="text-[var(--color-text-muted)]">
            We believe the boundaries between Product Managers and Engineers are
            dissolving. AI is compressing implementation barriers, shifting value
            toward specification, validation, and operational ownership.
          </p>
          <p className="text-[var(--color-text-muted)]">
            Our frameworks help individuals and teams navigate this transition—whether
            you're a PM learning to build, an Engineer developing product judgment, or
            an organization evolving toward higher autonomy levels.
          </p>

          <h2 className="text-2xl font-bold mt-12 mb-4">What We Publish</h2>
          <ul className="space-y-4 text-[var(--color-text-muted)]">
            <li>
              <strong className="text-[var(--color-text)]">Frameworks:</strong>{' '}
              Maturity models with levels, tools, metrics, and practices for growth.
            </li>
            <li>
              <strong className="text-[var(--color-text)]">Case Studies:</strong>{' '}
              Real-world implementations from companies like AWS, Spotify, and StrongDM.
            </li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Living Documents</h2>
          <p className="text-[var(--color-text-muted)]">
            Our frameworks are living documents, updated quarterly as tools evolve
            and new patterns emerge. Each document includes version numbers and
            update dates for transparency.
          </p>

          <h2 className="text-2xl font-bold mt-12 mb-4">Contact</h2>
          <p className="text-[var(--color-text-muted)]">
            Have feedback on our frameworks? Found a case study we should cover?
            Reach out on{' '}
            <a
              href="https://github.com/ProductBuildersHQ"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-primary)] hover:underline"
            >
              GitHub
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  )
}
