'use client';

import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { QueryAllDisciplineTeacherForPollDTO } from '@fictadvisor/utils/requests';
import { PollDisciplineTeachersResponse } from '@fictadvisor/utils/responses';
import { Box } from '@mui/material';
import { useRouter } from 'next/navigation';

import { PollTeacherInitialValues } from '@/app/(main)/(search-pages)/poll/components/poll-search-form/constants';
import PollTeacherSearchList from '@/app/(main)/(search-pages)/poll/components/poll-teacher-search-list/PollTeacherSearchList';
import * as styles from '@/app/(main)/(search-pages)/poll/PollTeacherPage.styles';
import Breadcrumbs from '@/components/common/ui/breadcrumbs';
import Button from '@/components/common/ui/button-mui';
import Progress from '@/components/common/ui/progress';
import useAuthentication from '@/hooks/use-authentication';
import useToast from '@/hooks/use-toast';
import PollAPI from '@/lib/api/poll/PollAPI';

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

const PollTeacher = () => {
  const [curPage, setCurPage] = useState(0);
  const { push, replace } = useRouter();
  const { user, isLoggedIn } = useAuthentication();
  const localStorageName = 'teachersPollForm';

  const toast = useToast();
  const [queryObj, setQueryObj] = useState<QueryAllDisciplineTeacherForPollDTO>(
    PollTeacherInitialValues,
  );

  useEffect(() => {
    setQueryObj(
      localStorage.getItem(localStorageName)
        ? JSON.parse(localStorage.getItem(localStorageName) || '{}')
        : PollTeacherInitialValues,
    );
  }, []);

  useEffect(() => {
    if (!isLoggedIn) {
      toast.error('Для проходження опитування потрібно авторизуватися');
      void replace('/login?redirect=~poll');
    }
  }, [isLoggedIn, push, replace]);

  const { data, isLoading, isFetching, refetch } =
    useQuery<PollDisciplineTeachersResponse>(
      'pollTeachersByUserId',
      () => PollAPI.getUserTeachers(user.id, queryObj),
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

  useEffect(() => {
    void refetch();
  }, [queryObj, refetch]);

  return (
    <Box sx={styles.layout}>
      {isLoggedIn && (
        <>
          <Breadcrumbs items={breadcrumbs} sx={styles.breadcrumps} />
          {data && (
            <PollTeacherSearchList
              data={data}
              className="poll-teacher"
              setQueryObj={setQueryObj}
              initialValues={PollTeacherInitialValues}
              localStorageName={localStorageName}
              setCurPage={setCurPage}
            />
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
export default PollTeacher;
