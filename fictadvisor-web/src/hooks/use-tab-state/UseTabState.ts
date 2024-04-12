'use client';
import { Dispatch, SetStateAction, SyntheticEvent, useEffect } from 'react';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { ReadonlyURLSearchParams } from 'next/navigation';
import { TeachersPageTabs } from 'src/app/(search-pages)/teachers/[teacherId]/utils';

// TODO: refactor this hook
export interface UseTabStateProps<T> {
  tab?: string | string[];
  router: AppRouterInstance;
  setIndex: Dispatch<SetStateAction<T>>;
  query: ReadonlyURLSearchParams;
}

const useTabState = <T extends string>({
  tab,
  router,
  setIndex,
  query,
}: UseTabStateProps<T>) => {
  const { replace } = router;
  useEffect(() => {
    if (Object.values(TeachersPageTabs).includes(tab as TeachersPageTabs)) {
      setIndex(tab as T);
    } else {
      /*void replace(
        { query: { ...query, tab: TeachersPageTabs.GENERAL } },
        undefined,
        {
          shallow: true,
        },
      );*/
    }
  }, [tab, replace, query]);

  return async (event: SyntheticEvent, value: T) => {
    /*await replace({ query: { ...query, tab: value } }, undefined, {
      shallow: true,
    });*/
    setIndex(value as T);
  };
};

export default useTabState;
