'use client';

import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

import { isBackNavigationTo } from '@/lib/utils/backNavigation';

// Snapshots live for the tab's JS context - long enough to survive opening a
// record and coming back, which is all this is for.
const snapshots = new Map<string, unknown>();

/**
 * `useState` that comes back with the value it had when the user last left this
 * page, but only when they returned with back/forward - opening the page anew
 * starts from the default.
 *
 * Pair it with `useScrollRestoration` on the same page: that hook marks the
 * traversal as handled, so a later fresh visit is not mistaken for a return.
 *
 * @param name distinguishes several pieces of state on the same page
 */
export const useRestorableState = <T>(
  name: string,
  initialValue: T,
): [T, Dispatch<SetStateAction<T>>] => {
  const pathname = usePathname();
  const snapshotKey = `${pathname}:${name}`;

  const [value, setValue] = useState<T>(() =>
    isBackNavigationTo(pathname) && snapshots.has(snapshotKey)
      ? (snapshots.get(snapshotKey) as T)
      : initialValue,
  );

  useEffect(() => {
    snapshots.set(snapshotKey, value);
  }, [snapshotKey, value]);

  return [value, setValue];
};
