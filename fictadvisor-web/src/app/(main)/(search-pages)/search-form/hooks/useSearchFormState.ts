'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { SearchFormFields } from '../types';
import {
  areSearchFormFieldsEqual,
  parseSearchFormFields,
  ParseSearchFormOptions,
  serializeSearchFormFields,
} from '../utils/searchParams';

/**
 * Keeps the search form state in the query string. The URL is the only thing
 * that survives leaving the page, so filters chosen before opening a teacher or
 * a subject are still there after the browser goes back.
 *
 * @param onChange runs before the new values are rendered, for work that has to
 *   happen while both the old and the new values are still known.
 */
export const useSearchFormState = (
  defaultValues: SearchFormFields,
  options: ParseSearchFormOptions,
  onChange?: (next: SearchFormFields, prev: SearchFormFields) => void,
) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const queryString = searchParams.toString();

  // Read once: after this the form state is the source of truth and the URL
  // follows it, not the other way around.
  const [initialValues] = useState(() =>
    parseSearchFormFields(searchParams, defaultValues, options),
  );
  const [values, setValues] = useState(initialValues);

  // The submit handler stays stable while still seeing the latest values: the
  // search inputs debounce, so two changes can arrive before a re-render.
  const valuesRef = useRef(values);
  useEffect(() => {
    valuesRef.current = values;
  }, [values]);

  const handleSubmit = useCallback(
    (query: Partial<SearchFormFields>) => {
      const prev = valuesRef.current;
      const next = { ...prev, ...query };
      if (areSearchFormFieldsEqual(prev, next)) return;

      valuesRef.current = next;
      onChange?.(next, prev);
      setValues(next);
    },
    [onChange],
  );

  useEffect(() => {
    const nextQueryString = serializeSearchFormFields(values, defaultValues);
    if (nextQueryString === queryString) return;

    router.replace(
      nextQueryString ? `${pathname}?${nextQueryString}` : pathname,
      { scroll: false },
    );
  }, [values, queryString, pathname, router, defaultValues]);

  return {
    initialValues,
    values,
    handleSubmit,
    // Identifies the history entry these results belong to.
    restorationKey: pathname + (queryString ? `?${queryString}` : ''),
  };
};
