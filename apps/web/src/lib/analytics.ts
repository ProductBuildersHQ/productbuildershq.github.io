// Page-view analytics through PostHog's EU cloud, in its cookieless mode
// (pbhq-cloud ADR-014, decisions 1 and 2).
//
// - Nothing is stored in the browser: no cookies, no local storage.
// - Only page views are sent: no autocapture, session recording or surveys.
// - It runs only on the live host, so local and preview builds send nothing.
// - A browser that asks not to be tracked (Do Not Track or Global Privacy
//   Control) sends nothing.
//
// The project key is PostHog's public key: it can send events, not read them.

const KEY = 'phc_nRU3bpy6StoQgyhvAo3vh4sjgNFZ329pMEJcsXeP3Tom';
const HOST = 'productbuildershq.com';
const SITE = 'productbuildershq';

/** True when the visitor's browser asks not to be tracked. */
function optedOut(): boolean {
  const nav = navigator as Navigator & { globalPrivacyControl?: boolean };
  return nav.doNotTrack === '1' || nav.globalPrivacyControl === true;
}

/** Starts analytics on the live site and records the page view. */
export function startAnalytics(): void {
  if (location.hostname !== HOST || optedOut()) return;
  import('posthog-js')
    .then(({ default: posthog }) => {
      posthog.init(KEY, {
        api_host: 'https://eu.i.posthog.com',
        ui_host: 'https://eu.posthog.com',
        cookieless_mode: 'always',
        persistence: 'memory',
        person_profiles: 'never',
        autocapture: false,
        disable_session_recording: true,
        disable_surveys: true,
        // Project settings can switch on add-ons that load more scripts and
        // send more than page views; these keep them off.
        capture_dead_clicks: false,
        capture_heatmaps: false,
        capture_performance: false,
        disable_external_dependency_loading: true,
        capture_pageview: false,
      });
      // Every event names its site and surface; the page view is sent after,
      // so it carries them too.
      posthog.register({ site: SITE, surface: 'marketing' });
      posthog.capture('$pageview');
    })
    .catch(() => undefined); // analytics never breaks the page
}
