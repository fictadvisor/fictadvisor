import { Dispatch, SetStateAction, SyntheticEvent, useEffect } from 'react';
import { NextRouter } from 'next/router';

import { TeachersPageTabs } from '@/components/pages/personal-teacher-page/PersonalTeacherPage';

export type UseTabStateProps = {
  tab: string | string[];
  router: NextRouter;
  setIndex: Dispatch<SetStateAction<any>>;
};

const useTabState = ({ tab, router, setIndex }: UseTabStateProps) => {
  const { replace, query, isReady } = router;
  useEffect(() => {
    if (!isReady) {
      return;
    }

    if (Object.values(TeachersPageTabs).includes(tab as TeachersPageTabs)) {
      setIndex(tab as TeachersPageTabs);
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

  return async (event: SyntheticEvent, value) => {
    console.log(value);
    await replace({ query: { ...query, tab: value } }, undefined, {
      shallow: true,
    });
    setIndex(value as TeachersPageTabs);
  };
};

export default useTabState;
