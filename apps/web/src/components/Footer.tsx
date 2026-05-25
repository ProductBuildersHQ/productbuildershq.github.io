import { Link } from 'react-router'

export default function Footer() {
  return (
    <footer className="bg-[var(--color-frame-bg)] text-[var(--color-frame-text)] py-12">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">ProductBuildersHQ</h3>
            <p className="text-[var(--color-frame-text-muted)] text-sm">
              Frameworks and case studies for the evolution of product development.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4 text-[var(--color-frame-accent)]">
              Research
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/frameworks" className="text-[var(--color-frame-text-muted)] hover:text-[var(--color-frame-text)] text-sm no-underline">
                  Frameworks
                </Link>
              </li>
              <li>
                <Link to="/case-studies" className="text-[var(--color-frame-text-muted)] hover:text-[var(--color-frame-text)] text-sm no-underline">
                  Case Studies
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4 text-[var(--color-frame-accent)]">
              Company
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-[var(--color-frame-text-muted)] hover:text-[var(--color-frame-text)] text-sm no-underline">
                  About
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/ProductBuildersHQ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--color-frame-text-muted)] hover:text-[var(--color-frame-text)] text-sm no-underline"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[var(--color-frame-border)] text-center text-[var(--color-frame-text-muted)] text-sm">
          <span className="text-[var(--color-frame-accent)]">productbuildershq.com</span>
          <span className="mx-2">&middot;</span>
          &copy; {new Date().getFullYear()} ProductBuildersHQ
        </div>
      </div>
    </footer>
  )
}
