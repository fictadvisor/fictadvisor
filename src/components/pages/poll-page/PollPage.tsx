import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { AxiosError } from 'axios';
import { useRouter } from 'next/router';

import { AlertColor } from '@/components/common/ui/alert';
import Breadcrumbs from '@/components/common/ui/breadcrumbs';
import Loader from '@/components/common/ui/loader/Loader';
import useAuthentication from '@/hooks/use-authentication';
import PollAPI from '@/lib/api/poll/PollAPI';
import { showAlert } from '@/redux/reducers/alert.reducer';

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
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoggedIn) {
      dispatch(
        showAlert({
          title: 'Для проходження опитування потрібно авторизуватися',
          color: AlertColor.ERROR,
        }),
      );
      void router.replace('login/?redirect=~poll');
    }
  }, [dispatch, isLoggedIn, router]);

  useEffect(() => {
    setIsLoading(isQuestionsLoading);
  }, [isQuestionsLoading]);

  const status =
    error && (error as AxiosError<{ error: string }>).response?.data?.error;

  if (error && !isLoading) {
    dispatch(
      showAlert({
        title: 'Помилка!',
        description:
          status === 'InvalidEntityIdException'
            ? 'Не знайдено опитування з таким id'
            : status === 'AnswerInDatabasePermissionException'
            ? 'Ти вже пройшов опитування за цього викладача!'
            : status === 'NoPermissionException'
            ? 'У тебе недостатньо прав для цієї дії'
            : status === 'WrongTimeException'
            ? 'Час проходження опитування сплив або опитування ще не почалось'
            : 'Помилка на сервері =(',
        color: AlertColor.ERROR,
      }),
    );
    void router.push('/poll');
  }

  return (
    <div className={styles['poll-page']}>
      <div className={styles['poll-page__content']}>
        {isLoading ? (
          <Loader />
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
