import { useCallback } from 'react';
import { NavigateOptions } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type QueryParams = Record<string, string | null>;

export const useQueryParams = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Utility function to generate new query params string
  const generateQueryString = useCallback((params: QueryParams) => {
    const newParams = new URLSearchParams(searchParams.toString());
    Object.entries(params).forEach(([name, value]) => {
      if (value === null) {
        newParams.delete(name);
      } else {
        newParams.set(name, value);
      }
    });
    return newParams.toString();
  }, []);

  // Update the URL with new query params
  const updateQueryParams = useCallback(
    (
      params: QueryParams,
      navigateOptions: NavigateOptions = { scroll: false },
    ) => {
      const newQueryString = generateQueryString(params);
      router.push(`${pathname}?${newQueryString}`, navigateOptions);
    },
    [],
  );

  // Get the value of a specific query param
  const getQueryParams = useCallback((name: string): string | null => {
    return searchParams.get(name);
  }, []);

  // Return the updated query string without pushing the route
  const getAndUpdateQueryString = useCallback((name: string, value: string) => {
    const updatedParams = generateQueryString({ [name]: value });
    return `?${updatedParams}`;
  }, []);

  return { updateQueryParams, getQueryParams, getAndUpdateQueryString };
};
