/**
 * ProductBuildersHQ Navigation Configuration
 *
 * This file configures the wt-navbar component for ProductBuildersHQ.
 * It's designed to be imported alongside @grokify/site-nav.
 */

import type { NavbarConfig } from '@grokify/site-nav';

/**
 * GitHub icon SVG
 */
export const githubIcon = `<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>`;

/**
 * Default base URL for ProductBuildersHQ
 */
export const DEFAULT_BASE_URL = 'https://productbuildershq.com';

/**
 * GitHub organization URL
 */
export const GITHUB_URL = 'https://github.com/ProductBuildersHQ';

/**
 * ProductBuildersHQ navigation configuration
 */
export function createNavbarConfig(baseUrl: string = DEFAULT_BASE_URL): NavbarConfig {
  return {
    brand: {
      name: 'ProductBuildersHQ',
      href: baseUrl,
      // Custom HTML for gradient text can be added here
    },
    baseUrl,
    links: [
      { id: 'frameworks', label: 'Frameworks', href: '/frameworks' },
      { id: 'case-studies', label: 'Case Studies', href: '/case-studies' },
    ],
    dropdowns: [
      {
        id: 'products',
        label: 'Products',
        items: [
          {
            id: 'visionspec',
            label: 'VisionSpec',
            href: '/visionspec/',
            description: 'Multi-domain specification orchestration',
          },
        ],
      },
      {
        id: 'resources',
        label: 'Resources',
        items: [
          { id: 'papers', label: 'Papers', href: '/papers/' },
          { id: 'about', label: 'About', href: '/about' },
        ],
      },
    ],
    actions: [
      {
        id: 'github',
        label: 'GitHub',
        href: GITHUB_URL,
        icon: githubIcon,
        external: true,
      },
    ],
  };
}

/**
 * CSS custom properties for ProductBuildersHQ theming
 */
export const pbhqThemeCSS = `
:root {
  /* ProductBuildersHQ theme for wt-navbar */
  --lit-navbar-primary: #10b981;
  --lit-navbar-secondary: #facc15;
  --lit-navbar-bg: #064e3b;
  --lit-navbar-bg-elevated: #0f5c4a;
  --lit-navbar-text: #ffffff;
  --lit-navbar-text-muted: rgba(255, 255, 255, 0.7);
  --lit-navbar-border: rgba(255, 255, 255, 0.1);
  --lit-navbar-title-gradient: linear-gradient(135deg, #10b981, #facc15);
}
`;

/**
 * Initialize ProductBuildersHQ navbar
 *
 * Call this function after including the site-nav bundle and this config.
 */
export function initPbhqNav(containerId: string = 'pbhq-navbar-container'): void {
  const container = document.getElementById(containerId);
  if (!container) {
    console.warn(`ProductBuildersHQ Nav: Container #${containerId} not found`);
    return;
  }

  // Inject theme CSS if not already present
  if (!document.getElementById('pbhq-theme-css')) {
    const style = document.createElement('style');
    style.id = 'pbhq-theme-css';
    style.textContent = pbhqThemeCSS;
    document.head.appendChild(style);
  }

  // Create and configure navbar
  const navbar = document.createElement('wt-navbar');
  navbar.setAttribute('theme', 'dark');
  (navbar as any).config = createNavbarConfig();

  container.appendChild(navbar);
}

// Auto-initialize when DOM is ready
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initPbhqNav());
  } else {
    initPbhqNav();
  }
}
