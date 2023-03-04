import { FC } from 'react';
import { useRouter } from 'next/router';

import { RatingCard } from '@/components/common/composite/cards/Cards';
import { GetTeachersDTO } from '@/lib/api/teacher/dto/GetTeacherDTO';

import styles from '../SearchPage.module.scss';

export const TeacherSearchList = ({ teachers }: GetTeachersDTO) => {
  const router = useRouter();

  const redirect = (teacherId: string) => {
    router.push(`/teachers/${teacherId}`);
  };

  return (
    <ul className={styles['teacher-search-list']}>
      {teachers &&
        teachers?.map(teacher => (
          <li key={teacher.id}>
            <RatingCard
              onClick={() => redirect(teacher.id)}
              name={`${teacher.lastName} ${teacher.firstName} ${teacher.middleName} `}
            />
          </li>
        ))}
    </ul>
  );
};
