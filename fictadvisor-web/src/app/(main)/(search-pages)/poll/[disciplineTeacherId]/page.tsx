'use client';

import { FC, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Box } from '@mui/material';
import { useRouter } from 'next/navigation';

import PollForm from '@/app/(main)/(search-pages)/poll/[disciplineTeacherId]/components/poll-form';
import * as styles from '@/app/(main)/(search-pages)/poll/[disciplineTeacherId]/PollPage.styles';
import Breadcrumbs from '@/components/common/ui/breadcrumbs';
import Progress from '@/components/common/ui/progress';
import useAuthentication from '@/hooks/use-authentication';
import { useToastError } from '@/hooks/use-toast-error/useToastError';
import PollAPI from '@/lib/api/poll/PollAPI';

interface PollParams {
  params: {
    disciplineTeacherId: string;
  };
}

const Poll: FC<PollParams> = ({ params }) => {
  const disciplineTeacherId = params.disciplineTeacherId;
  const [isLoading, setIsLoading] = useState(true);
  const { user, isLoggedIn } = useAuthentication();
  const { displayError } = useToastError();
  const router = useRouter();
  const {
    error,
    isSuccess: isSuccessFetching,
    data,
    isLoading: isQuestionsLoading,
  } = useQuery(
    ['pollQuestions', disciplineTeacherId],
    async () => await PollAPI.getTeacherQuestions(disciplineTeacherId),
    {
      retry: false,
      enabled: Boolean(user),
      refetchOnWindowFocus: false,
      keepPreviousData: false,
    },
  );

  useEffect(() => {
    if (!isLoggedIn) {
      displayError(error);
      void router.replace('login/?redirect=~poll');
    }
  }, [isLoggedIn, router]);

  if (error && !isLoading) {
    displayError(error);
    void router.push('/poll');
  }

  useEffect(() => {
    setIsLoading(isQuestionsLoading);
  }, [isQuestionsLoading]);

  return (
    <Box sx={styles.pollPage}>
      <Box sx={styles.pollPageContent}>
        {isLoading ? (
          <Progress />
        ) : (
          isSuccessFetching && (
            <Box sx={styles.pollPageContentWrapper}>
              <Box sx={styles.breadcrumbsWrapper}>
                <Breadcrumbs
                  items={[
                    { label: 'Головна', href: '/' },
                    { label: 'Опитування', href: '/poll' },
                    {
                      label: `${data.teacher.lastName} ${data.teacher.firstName} ${data.teacher.middleName}`,
                      href: `/poll/${disciplineTeacherId}`,
                    },
                  ]}
                />
              </Box>
              <PollForm data={data} disciplineTeacherId={disciplineTeacherId} />
            </Box>
          )
        )}
      </Box>
    </Box>
  );
};

export default Poll;
