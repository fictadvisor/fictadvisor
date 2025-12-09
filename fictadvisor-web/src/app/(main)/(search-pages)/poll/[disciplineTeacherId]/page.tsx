'use client';

import { FC, use, useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import PollForm from '@/app/(main)/(search-pages)/poll/[disciplineTeacherId]/components/poll-form';
import * as styles from '@/app/(main)/(search-pages)/poll/[disciplineTeacherId]/PollPage.styles';
import Breadcrumbs from '@/components/common/ui/breadcrumbs';
import Progress from '@/components/common/ui/progress';
import { useAuthentication } from '@/hooks/use-authentication/useAuthentication';
import { useToastError } from '@/hooks/use-toast-error/useToastError';
import PollAPI from '@/lib/api/poll/PollAPI';

interface PollParams {
  params: Promise<{
    disciplineTeacherId: string;
  }>;
}

const Poll: FC<PollParams> = ({ params }) => {
  const { disciplineTeacherId } = use(params);
  const [isLoading, setIsLoading] = useState(true);
  const { user, isLoading: isLoadingUser } = useAuthentication();
  const { displayError } = useToastError();
  const router = useRouter();
  const {
    error,
    isSuccess: isSuccessFetching,
    data,
    isLoading: isQuestionsLoading,
  } = useQuery({
    queryKey: ['pollQuestions', disciplineTeacherId],
    queryFn: () => PollAPI.getTeacherQuestions(disciplineTeacherId),
    retry: false,
    enabled: Boolean(user),
    refetchOnWindowFocus: false,
    placeholderData: (previousData, previousQuery) => previousData,
  });

  useEffect(() => {
    if (!user && !isLoadingUser) {
      displayError(error);
      void router.replace('login/?redirect=~poll');
    }
  }, [user, router]);

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
