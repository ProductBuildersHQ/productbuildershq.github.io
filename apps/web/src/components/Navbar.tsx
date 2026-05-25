import { useState, useRef, useEffect } from 'react'
import { Link, NavLink } from 'react-router'
import navConfig from '@/config/nav-config.json'

interface DropdownItem {
  id: string
  label: string
  href: string
  description?: string
  external?: boolean
}

interface DropdownMenu {
  id: string
  label: string
  items: DropdownItem[]
}

interface NavLink {
  id: string
  label: string
  href: string
}

interface NavAction {
  id: string
  label: string
  href: string
  icon?: string
  external?: boolean
}

interface NavConfig {
  brand: { name: string; href: string }
  baseUrl: string
  links: NavLink[]
  dropdowns: DropdownMenu[]
  actions: NavAction[]
}

const config = navConfig as NavConfig

interface DropdownProps {
  menu: DropdownMenu
}

function Dropdown({ menu }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 text-sm font-medium text-[var(--color-frame-text-muted)] hover:text-[var(--color-frame-text)] transition-colors bg-transparent border-none cursor-pointer"
      >
        {menu.label}
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-64 bg-[var(--color-frame-bg)] border border-[rgba(255,255,255,0.15)] rounded-lg shadow-lg py-2 z-50">
          {menu.items.map((item) => (
            item.external ? (
              <a
                key={item.id}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-2 text-sm text-[var(--color-frame-text-muted)] hover:text-[var(--color-frame-text)] hover:bg-[rgba(255,255,255,0.05)] no-underline"
                onClick={() => setIsOpen(false)}
              >
                <div className="font-medium">{item.label}</div>
                {item.description && (
                  <div className="text-xs text-[var(--color-frame-text-muted)] mt-0.5">{item.description}</div>
                )}
              </a>
            ) : (
              <Link
                key={item.id}
                to={item.href}
                className="block px-4 py-2 text-sm text-[var(--color-frame-text-muted)] hover:text-[var(--color-frame-text)] hover:bg-[rgba(255,255,255,0.05)] no-underline"
                onClick={() => setIsOpen(false)}
              >
                <div className="font-medium">{item.label}</div>
                {item.description && (
                  <div className="text-xs text-[var(--color-frame-text-muted)] mt-0.5">{item.description}</div>
                )}
              </Link>
            )
          ))}
        </div>
      )}
    </div>
  )
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
    </svg>
  )
}

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-[var(--color-frame-bg)]">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-2 no-underline">
            <span className="text-xl font-bold text-[var(--color-frame-text)]">
              {config.brand.name}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {config.links.map((link) => (
              <NavLink
                key={link.id}
                to={link.href}
                className={({ isActive }) =>
                  `text-sm font-medium no-underline transition-colors ${
                    isActive
                      ? 'text-[var(--color-frame-accent)]'
                      : 'text-[var(--color-frame-text-muted)] hover:text-[var(--color-frame-text)]'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            {config.dropdowns.map((dropdown) => (
              <Dropdown key={dropdown.id} menu={dropdown} />
            ))}
            {config.actions.map((action) => (
              <a
                key={action.id}
                href={action.href}
                target={action.external ? '_blank' : undefined}
                rel={action.external ? 'noopener noreferrer' : undefined}
                className="text-[var(--color-frame-text-muted)] hover:text-[var(--color-frame-text)] transition-colors"
                title={action.label}
              >
                {action.icon === 'github' ? <GitHubIcon /> : action.label}
              </a>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-[var(--color-frame-text)] bg-transparent border-none cursor-pointer p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-[rgba(255,255,255,0.1)]">
            <div className="flex flex-col gap-4">
              {config.links.map((link) => (
                <NavLink
                  key={link.id}
                  to={link.href}
                  className={({ isActive }) =>
                    `text-sm font-medium no-underline ${
                      isActive ? 'text-[var(--color-frame-accent)]' : 'text-[var(--color-frame-text-muted)]'
                    }`
                  }
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </NavLink>
              ))}
              {config.dropdowns.map((dropdown) => (
                <div key={dropdown.id} className="border-t border-[rgba(255,255,255,0.1)] pt-4">
                  <div className="text-xs text-[var(--color-frame-text-muted)] uppercase tracking-wide mb-2">
                    {dropdown.label}
                  </div>
                  {dropdown.items.map((item) => (
                    item.external ? (
                      <a
                        key={item.id}
                        href={item.href}
                        className="block py-2 text-sm text-[var(--color-frame-text-muted)] no-underline"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.label}
                      </a>
                    ) : (
                      <Link
                        key={item.id}
                        to={item.href}
                        className="block py-2 text-sm text-[var(--color-frame-text-muted)] no-underline"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    )
                  ))}
                </div>
              ))}
              <div className="border-t border-[rgba(255,255,255,0.1)] pt-4">
                {config.actions.map((action) => (
                  <a
                    key={action.id}
                    href={action.href}
                    target={action.external ? '_blank' : undefined}
                    rel={action.external ? 'noopener noreferrer' : undefined}
                    className="flex items-center gap-2 text-sm text-[var(--color-frame-text-muted)] no-underline"
                  >
                    {action.icon === 'github' && <GitHubIcon />}
                    {action.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
