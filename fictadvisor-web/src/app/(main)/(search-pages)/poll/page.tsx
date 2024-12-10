'use client';

import { useEffect, useState } from 'react';
import { QueryAllDisciplineTeacherForPollDTO } from '@fictadvisor/utils/requests';
import { Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { PollTeacherInitialValues } from '@/app/(main)/(search-pages)/poll/components/poll-search-form/constants';
import PollTeacherSearchList from '@/app/(main)/(search-pages)/poll/components/poll-teacher-search-list/PollTeacherSearchList';
import * as styles from '@/app/(main)/(search-pages)/poll/PollTeacherPage.styles';
import Breadcrumbs from '@/components/common/ui/breadcrumbs';
import Button from '@/components/common/ui/button-mui';
import Progress from '@/components/common/ui/progress';
import { useAuthentication } from '@/hooks/use-authentication/useAuthentication';
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
  const { replace } = useRouter();
  const { user, isLoading: isLoadingUser } = useAuthentication();
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
    if (!user && !isLoadingUser) {
      toast.error('Для проходження опитування потрібно авторизуватися');
      void replace('/login?redirect=~poll');
    }
  }, [user, replace]);

  const { data, isLoading } = useQuery({
    queryKey: ['pollTeachersByUserId', queryObj, user],
    queryFn: () => PollAPI.getUserTeachers(user!.id, queryObj),
    refetchOnWindowFocus: false,
    enabled: !!user,
  });

  useEffect(() => {
    if (data && !data.hasSelectedInLastSemester) {
      toast.warning(
        'Ти ще не обрав вибіркові на цей семестр!',
        'Обери свої вибіркові в профілі у вкладці "Мої вибіркові".',
      );
    }
  }, [data]);

  if (isLoading || isLoadingUser)
    return (
      <Box sx={styles.pageLoader}>
        <Progress />
      </Box>
    );

  return (
    <Box sx={styles.layout}>
      {
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
          {data?.teachers.length === (curPage + 1) * PAGE_SIZE && (
            <Button
              sx={styles.loadBtn}
              text="Завантажити ще"
              onClick={() => setCurPage(pr => pr + 1)}
            />
          )}
        </>
      }
    </Box>
  );
};
export default PollTeacher;
