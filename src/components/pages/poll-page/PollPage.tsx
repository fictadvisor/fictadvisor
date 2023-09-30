import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Box } from '@mui/material';
import { useRouter } from 'next/router';

import Breadcrumbs from '@/components/common/ui/breadcrumbs';
import Progress from '@/components/common/ui/progress';
import useAuthentication from '@/hooks/use-authentication';
import { useToastError } from '@/hooks/use-toast-error/useToastError';
import PollAPI from '@/lib/api/poll/PollAPI';
import { usePollStore } from '@/store/poll-page/usePollStore';

import PollForm from './components/poll-form';
import * as styles from './PollPage.styles';
const PollPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { user, isLoggedIn } = useAuthentication();
  const { displayError } = useToastError();
  const router = useRouter();
  const disciplineTeacherId = router.query.disciplineTeacherId as string;
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
              <PollForm data={data} />
            </Box>
          )
        )}
      </Box>
    </Box>
  );
};

export default PollPage;
