'use client';

import { useCallback, useRef } from 'react';

import { SearchFormFields } from '../types';

// Sorting and order only reshuffle the result set, so everything the user had
// already revealed is still part of it. Changing anything else asks a different
// question and starts again from a single page.
export const hasSameResultSet = (a: SearchFormFields, b: SearchFormFields) =>
  a.search === b.search &&
  a.groupId === b.groupId &&
  a.disciplineTypes.join('+') === b.disciplineTypes.join('+') &&
  a.cathedrasId.join('+') === b.cathedrasId.join('+');

/**
 * Remembers how many pages of the current result set are on screen, so a change
 * of sorting can ask for the same amount again in a single request.
 */
export const useLoadedPages = (pageSize: number) => {
  const loadedPagesRef = useRef(1);

  const resetLoadedPages = useCallback(() => {
    loadedPagesRef.current = 1;
  }, []);

  const rememberLoadedItems = useCallback(
    (items: number) => {
      loadedPagesRef.current = Math.max(1, Math.ceil(items / pageSize));
    },
    [pageSize],
  );

  return { loadedPagesRef, resetLoadedPages, rememberLoadedItems };
};
