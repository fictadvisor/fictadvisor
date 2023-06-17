import React from 'react';
import { useRouter } from 'next/router';

import { SubjectCard } from '@/components/common/ui/cards/subject-card';
import { GetListOfSubjectsDTO } from '@/lib/api/subject/dto/GetListOfSubjectsDTO';

import styles from './SubjectSearchList.module.scss';

export const SubjectSearchList = ({ subjects }: GetListOfSubjectsDTO) => {
  const router = useRouter();

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
