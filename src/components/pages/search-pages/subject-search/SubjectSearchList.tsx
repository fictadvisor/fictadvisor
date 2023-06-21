import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { SubjectCard } from '@/components/common/ui/cards/subject-card';
import useToast from '@/hooks/use-toast';
import { GetListOfSubjectsDTO } from '@/lib/api/subject/dto/GetListOfSubjectsDTO';

import styles from './SubjectSearchList.module.scss';

const TOAST_TIMER = 4000;

export const SubjectSearchList = ({ subjects }: GetListOfSubjectsDTO) => {
  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    if (!subjects.length) {
      toast.error('Цього предмета не існує', '', TOAST_TIMER);
    }
  }, [subjects.length]);

  const redirect = (subjectId: string) => {
    router.push(`/subjects/${subjectId}/teachers`);
  };

  return (
    <ul className={styles['subject-search-list']}>
      {subjects &&
        subjects.map(subject => (
          <li key={subject.id}>
            <SubjectCard
              onClick={() => redirect(subject.id)}
              name={`${subject.name}`}
              details={`${
                subject.amount +
                ' ' +
                (subject.amount === 1
                  ? 'викладач'
                  : subject.amount === 2 ||
                    subject.amount === 3 ||
                    subject.amount === 4
                  ? 'викладачі'
                  : 'викладачів')
              }`}
            />
          </li>
        ))}
    </ul>
  );
};
