'use client';

import { useCallback, useEffect, useState } from 'react';
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
 */
export const useSearchFormState = (
  defaultValues: SearchFormFields,
  options: ParseSearchFormOptions,
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

  const handleSubmit = useCallback((query: Partial<SearchFormFields>) => {
    setValues(prev => {
      const next = { ...prev, ...query };
      return areSearchFormFieldsEqual(prev, next) ? prev : next;
    });
  }, []);

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
