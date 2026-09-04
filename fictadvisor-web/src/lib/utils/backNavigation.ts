'use client';

// Next.js leaves back/forward restoration to the page itself, so anything that
// wants to come back exactly as it was - a scroll offset, a table's filters and
// page - first has to tell "the user is returning here" apart from "the user
// opened this page". The last history traversal is recorded here for them.
let backNavigationTarget: string | null = null;

if (typeof window !== 'undefined') {
  window.addEventListener('popstate', () => {
    backNavigationTarget = window.location.pathname + window.location.search;
  });
}

/**
 * Whether the user has just arrived at `key` (pathname plus query string) with
 * the back or forward button, rather than by opening it anew.
 */
export const isBackNavigationTo = (key: string) => backNavigationTarget === key;

/**
 * Forgets the traversal, so opening the same page again later starts clean.
 * Keyed, because by the time a page unmounts the traversal may already point at
 * wherever the user went instead.
 */
export const releaseBackNavigation = (key: string) => {
  if (backNavigationTarget === key) backNavigationTarget = null;
};
