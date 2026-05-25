import { Link, NavLink } from 'react-router'

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-[var(--color-frame-bg)]">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 no-underline">
            <span className="text-xl font-bold text-[var(--color-frame-text)]">
              ProductBuildersHQ
            </span>
          </Link>

          <div className="flex items-center gap-8">
            <NavLink
              to="/frameworks"
              className={({ isActive }) =>
                `text-sm font-medium no-underline transition-colors ${
                  isActive
                    ? 'text-[var(--color-frame-accent)]'
                    : 'text-[var(--color-frame-text-muted)] hover:text-[var(--color-frame-text)]'
                }`
              }
            >
              Frameworks
            </NavLink>
            <NavLink
              to="/case-studies"
              className={({ isActive }) =>
                `text-sm font-medium no-underline transition-colors ${
                  isActive
                    ? 'text-[var(--color-frame-accent)]'
                    : 'text-[var(--color-frame-text-muted)] hover:text-[var(--color-frame-text)]'
                }`
              }
            >
              Case Studies
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `text-sm font-medium no-underline transition-colors ${
                  isActive
                    ? 'text-[var(--color-frame-accent)]'
                    : 'text-[var(--color-frame-text-muted)] hover:text-[var(--color-frame-text)]'
                }`
              }
            >
              About
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  )
}
