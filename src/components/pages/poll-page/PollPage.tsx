import { useEffect, useState } from 'react';

import Loader from '@/components/common/ui/loader/Loader';
import { client } from '@/lib/api/instance';
import { getAuthorizationHeader } from '@/lib/api/utils';

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

type Question = {
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
  const [isFetching, setIsFetching] = useState(false);
  const [fetchedData, setFetchedData] =
    useState<FetchedTeacherPollData>(initialState);
  const getQuestions = async () => {
    setIsFetching(true);
    const data = await client.get(
      'http://142.93.97.196:4001/v2/disciplineTeachers/24529274-6a79-4ad2-a4ae-9f0e7956ffad/questions',
      getAuthorizationHeader(),
    );
    setFetchedData(data.data);
    setIsFetching(false);
  };

  useEffect(() => {
    getQuestions();
  }, []);

  return (
    <PageLayout
      description={'Сторінка для проходження опитування'}
      hasFooter={true}
      hasHeader={true}
    >
      <div className={styles['poll-page']}>
        <div className={styles['poll-page__content']}>
          {isFetching ? <Loader /> : <PollForm data={fetchedData} />}
        </div>
      </div>
    </PageLayout>
  );
};

export default PollPage;
