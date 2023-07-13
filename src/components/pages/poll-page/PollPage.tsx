import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/router';

import Breadcrumbs from '@/components/common/ui/breadcrumbs';
import Progress from '@/components/common/ui/progress-mui';
import useAuthentication from '@/hooks/use-authentication';
import useToast from '@/hooks/use-toast';
import PollAPI from '@/lib/api/poll/PollAPI';

import PollForm from './components/poll-form';

import styles from './PollPage.module.scss';

const PollPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { user, isLoggedIn } = useAuthentication();
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
  const toast = useToast();

  useEffect(() => {
    if (!isLoggedIn) {
      toast.error('Для проходження опитування потрібно авторизуватися');

      void router.replace('login/?redirect=~poll');
    }
  }, [toast, isLoggedIn, router]);

  useEffect(() => {
    setIsLoading(isQuestionsLoading);
  }, [isQuestionsLoading]);

  const status =
    error && (error as AxiosError<{ error: string }>).response?.data?.error;

  if (error && !isLoading) {
    toast.error(
      'Помилка!',
      status === 'InvalidEntityIdException'
        ? 'Не знайдено опитування з таким id'
        : status === 'AnswerInDatabasePermissionException'
        ? 'Ти вже пройшов опитування за цього викладача!'
        : status === 'NoPermissionException'
        ? 'У тебе недостатньо прав для цієї дії'
        : status === 'WrongTimeException'
        ? 'Час проходження опитування сплив або опитування ще не почалось'
        : 'Помилка на сервері =(',
    );
    void router.push('/poll');
  }

  return (
    <div className={styles['poll-page']}>
      <div className={styles['poll-page__content']}>
        {isLoading ? (
          <Progress />
        ) : (
          isSuccessFetching && (
            <div className={styles['poll-page__content-wrapper']}>
              <div className={styles['breadcrumbs-wrapper']}>
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
              </div>
              <PollForm data={data} />
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default PollPage;
