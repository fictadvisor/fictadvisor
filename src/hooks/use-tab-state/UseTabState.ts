import { Dispatch, SetStateAction, SyntheticEvent, useEffect } from 'react';
import { NextRouter } from 'next/router';

import { TeachersPageTabs } from '@/components/pages/personal-teacher-page/PersonalTeacherPage';

// TODO: refactor this hook
export interface UseTabStateProps<T> {
  tab?: string | string[];
  router: NextRouter;
  setIndex: Dispatch<SetStateAction<T>>;
}

const useTabState = <T extends string>({
  tab,
  router,
  setIndex,
}: UseTabStateProps<T>) => {
  const { replace, query, isReady } = router;
  useEffect(() => {
    if (!isReady) {
      return;
    }

    if (Object.values(TeachersPageTabs).includes(tab as TeachersPageTabs)) {
      setIndex(tab as T);
    } else {
      void replace(
        { query: { ...query, tab: TeachersPageTabs.GENERAL } },
        undefined,
        {
          shallow: true,
        },
      );
    }
  }, [tab, isReady, replace, query]);

  return async (event: SyntheticEvent, value: T) => {
    await replace({ query: { ...query, tab: value } }, undefined, {
      shallow: true,
    });
    setIndex(value as T);
  };
};

export default useTabState;
