'use client';

import { useCallback, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

import { useRestorableState } from '@/hooks/use-restorable-state';

/**
 * Filters, page and rows per page of an admin table, kept across a trip to a
 * record and back - opening a record must not throw away the search that led to
 * it.
 */
export const useAdminListState = <T extends object>(
  initialFilters: T,
  initialPageSize: number,
) => {
  const pathname = usePathname();
  const [filters, setFilters] = useRestorableState<T>(
    'filters',
    initialFilters,
  );
  const [page, setPage] = useRestorableState('page', 0);
  const [pageSize, setPageSize] = useRestorableState(
    'pageSize',
    initialPageSize,
  );

  // The update handler stays stable while still seeing the latest filters: the
  // search bars debounce, so two changes can arrive before a re-render.
  const filtersRef = useRef(filters);
  useEffect(() => {
    filtersRef.current = filters;
  }, [filters]);

  // The search bars fire once on their own shortly after mounting, so an update
  // that changes nothing must be ignored - otherwise the restored page number
  // would be reset a moment after it came back.
  const updateFilters = useCallback(
    (update: Partial<T>) => {
      const previous = filtersRef.current;
      const next = { ...previous, ...update };
      if (JSON.stringify(previous) === JSON.stringify(next)) return;

      filtersRef.current = next;
      setFilters(next);
      // A narrower search rarely reaches as far as the page the user was on.
      setPage(0);
    },
    [setFilters, setPage],
  );

  const changePageSize = useCallback(
    (size: number) => {
      setPageSize(size);
      setPage(0);
    },
    [setPageSize, setPage],
  );

  return {
    filters,
    updateFilters,
    page,
    setPage,
    pageSize,
    changePageSize,
    // Identifies the history entry these results belong to.
    restorationKey: pathname,
  };
};
