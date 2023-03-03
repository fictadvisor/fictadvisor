import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/router';

import { AlertColor, AlertVariant } from '@/components/common/ui/alert';
import AlertPopup from '@/components/common/ui/alert-popup/AlertPopup';
import Loader from '@/components/common/ui/loader/Loader';
import useAuthentication from '@/hooks/use-authentication';
import { PollAPI } from '@/lib/api/poll/PollAPI';

import PageLayout from '../../common/layout/page-layout/PageLayout';

import PollForm from './components/poll-form';

import styles from './PollPage.module.scss';

export type Teacher = {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  avatar: string | null;
};

export type Subject = {
  id: string;
  name: string;
};

export type Question = {
  id: string;
  name: string;
  criteria: string;
  text: string;
  type: string;
  description: string | null;
  display: string;
  isRequired: boolean;
};

export type Category = {
  name: string;
  count: number;
  questions: Question[];
};

export interface FetchedTeacherPollData {
  subject: Subject;
  categories: Category[];
  teacher: Teacher;
}

const initialState = {
  subject: { id: 'subjectId', name: 'subject' },
  categories: [
    {
      name: 'category',
      count: 3,
      questions: [
        {
          id: 'questionId',
          name: '1 question',
          criteria: 'criteria',
          text: 'text',
          type: 'type',
          description: 'description',
          display: 'display',
          isRequired: false,
        },
      ],
    },
  ],
  teacher: {
    id: 'teacherId',
    firstName: 'first',
    middleName: 'middle',
    lastName: 'last',
    avatar: null,
  },
};

const PollPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { user, isLoggedIn, isAuthenticationFetching } = useAuthentication();
  const router = useRouter();
  const disciplineTeacherId = router.query.disciplineTeacherId as string;
  const {
    error: FetchingQuestionsError,
    isSuccess: isSuccessFetching,
    data: FetchedData,
    isLoading: isQuestionsLoading,
  } = useQuery(
    ['pollQuestions'],
    async () => await PollAPI.getTeacherQuestions(disciplineTeacherId),
    {
      retry: false,
      enabled: Boolean(user),
      refetchOnWindowFocus: false,
    },
  );

  useEffect(() => {
    if (!isLoggedIn && !isAuthenticationFetching) {
      void router.push('/login');
    }
  }, [isAuthenticationFetching, isLoggedIn, router]);

  useEffect(() => {
    setIsLoading(isQuestionsLoading || isAuthenticationFetching);
  }, [isQuestionsLoading, isAuthenticationFetching]);

  const status =
    FetchingQuestionsError &&
    (FetchingQuestionsError as AxiosError).response?.status;

  return (
    <PageLayout
      description={'Сторінка для проходження опитування'}
      hasFooter={true}
      hasHeader={true}
    >
      <div className={styles['poll-page']}>
        <div className={styles['poll-page__content']}>
          {isLoading ? (
            <Loader />
          ) : isSuccessFetching ? (
            <PollForm data={FetchedData || initialState} />
          ) : null}
        </div>
        {FetchingQuestionsError && !isLoading && (
          <AlertPopup
            title="Помилка!"
            description={
              status === 400
                ? 'Не знайдено опитування з таким id'
                : status === 403
                ? 'Ви не маєте доступу до цієї сторінки оскільки вже пройшли опитування!'
                : 'Помилка на сервері =('
            }
            variant={AlertVariant.FILLED}
            color={AlertColor.ERROR}
          />
        )}
      </div>
    </PageLayout>
  );
};

export default PollPage;
