'use client';

import { useEffect, useRef } from 'react';

// How long we keep nudging the window back to the saved offset. Lists grow in
// several frames (cards mount, avatars load, Masonry measures its children), and
// scrollTo is clamped to whatever the page height is at that moment.
const RESTORE_FRAMES = 30;

// Scroll offsets have to outlive the component: a back navigation unmounts the
// page, so component state is already gone when we need the offset again. A
// module level map is enough - it lives exactly as long as the tab's JS context,
// same as the react-query cache the list itself is restored from.
const positions = new Map<string, number>();

// Next.js leaves back/forward scrolling to the browser, and the browser restores
// the offset before the remounted page has rendered its list - by then the page
// is one screen tall and the offset is clamped to the top. We remember which
// entry the user came back to and redo the restore once the content is there.
let pendingRestorationKey: string | null = null;

if (typeof window !== 'undefined') {
  window.addEventListener('popstate', () => {
    pendingRestorationKey = window.location.pathname + window.location.search;
  });
}

/**
 * Restores the window scroll offset when the user returns to `key` via
 * back/forward. A fresh navigation to the same URL still starts at the top.
 *
 * @param key    identifies the history entry, normally pathname + query string
 * @param isReady whether the content that defines the page height is rendered
 */
export const useScrollRestoration = (key: string, isReady: boolean) => {
  const isRestoredRef = useRef(false);

  useEffect(() => {
    let isActive = true;
    let frame = 0;

    const save = () => {
      frame = 0;
      if (isActive) positions.set(key, window.scrollY);
    };

    const handleScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(save);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      isActive = false;
      window.removeEventListener('scroll', handleScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [key]);

  useEffect(() => {
    if (isRestoredRef.current || !isReady) return;
    isRestoredRef.current = true;

    if (pendingRestorationKey !== key) return;
    pendingRestorationKey = null;

    const target = positions.get(key);
    if (!target) return;

    let attempts = 0;
    let frame = 0;
    const restore = () => {
      window.scrollTo(0, target);
      if (Math.round(window.scrollY) < target && attempts++ < RESTORE_FRAMES) {
        frame = window.requestAnimationFrame(restore);
      }
    };

    frame = window.requestAnimationFrame(restore);
    return () => window.cancelAnimationFrame(frame);
  }, [key, isReady]);
};
