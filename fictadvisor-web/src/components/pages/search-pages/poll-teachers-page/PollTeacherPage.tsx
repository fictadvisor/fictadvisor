import { FC, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Box } from '@mui/material';
import { useRouter } from 'next/router';

import Breadcrumbs from '@/components/common/ui/breadcrumbs';
import Button from '@/components/common/ui/button-mui';
import {
  ButtonColor,
  ButtonVariant,
} from '@/components/common/ui/button-mui/types';
import Progress from '@/components/common/ui/progress';
import PollTeacherSearchList from '@/components/pages/search-pages/poll-teachers-page/components/PollTeacherSearchList';
import useAuthentication from '@/hooks/use-authentication';
import useToast from '@/hooks/use-toast';
import PollAPI from '@/lib/api/poll/PollAPI';
import { PollTeachersResponse } from '@/lib/api/poll/types/PollTeachersResponse';

import * as styles from './PollTeacherPage.styles';

const breadcrumbs = [
  {
    label: 'Головна',
    href: '/',
  },
  {
    label: 'Опитування',
    href: '/poll',
  },
];
const PAGE_SIZE = 20;

const PollTeacherPage: FC = () => {
  const [curPage, setCurPage] = useState(0);
  const { push, replace } = useRouter();
  const { user, isLoggedIn } = useAuthentication();
  const toast = useToast();

  useEffect(() => {
    if (!isLoggedIn) {
      toast.error('Для проходження опитування потрібно авторизуватися');
      void replace('/login?redirect=~poll');
    }
  }, [isLoggedIn, push, replace]);

  const { data, isLoading, isFetching } = useQuery<PollTeachersResponse>(
    'pollTeachers',
    () => PollAPI.getUserTeachers(user.id),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      enabled: user?.id != null,
    },
  );

  useEffect(() => {
    if (!data) return;

    if (!data.hasSelectedInLastSemester) {
      toast.warning(
        'Ти ще не обрав вибіркові на цей семестр!',
        'Обери свої вибіркові в профілі у вкладці "Мої вибіркові".',
      );
    }
  }, [data]);

  return (
    <Box sx={styles.layout}>
      {isLoggedIn && (
        <>
          <Breadcrumbs items={breadcrumbs} sx={styles.breadcrumps} />
          {data && (
            <PollTeacherSearchList data={data} className="poll-teacher" />
          )}
          {isLoading ||
            (isFetching && (
              <Box sx={styles.pageLoader}>
                <Progress />
              </Box>
            ))}

          {data?.teachers.length === (curPage + 1) * PAGE_SIZE && (
            <Button
              sx={styles.loadBtn}
              text="Завантажити ще"
              onClick={() => setCurPage(pr => pr + 1)}
            />
          )}
        </>
      )}
    </Box>
  );
};

export default PollTeacherPage;
