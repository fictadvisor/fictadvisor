import { FC } from 'react';
import { useRouter } from 'next/router';

import { RatingCard } from '@/components/common/composite/cards/Cards';
import { GetTeachersBySubjectDTO } from '@/lib/api/subject/dto/GetTeachersBySubjectDTO';
import { GetTeachersDTO } from '@/lib/api/teacher/dto/GetTeacherDTO';

import styles from '../SearchPage.module.scss';

export const TeacherSearchList = ({
  teachers,
}: GetTeachersDTO | Omit<GetTeachersBySubjectDTO, 'subjectName'>) => {
  const router = useRouter();

  const redirect = (teacherId: string) => {
    router.push(`/teachers/${teacherId}`);
  };

  return (
    <ul className={styles['teacher-search-list']}>
      {teachers &&
        teachers?.map(
          teacher =>
            teacher.lastName.length > 0 && (
              <li key={teacher.id}>
                {!teacher.roles && (
                  <RatingCard
                    onClick={() => redirect(teacher.id)}
                    name={`${teacher.lastName} ${teacher.firstName} ${teacher.middleName}`}
                  />
                )}
                {teacher.roles && (
                  <RatingCard
                    roles={teacher.roles}
                    onClick={() => redirect(teacher.id)}
                    name={`${teacher.lastName} ${teacher.firstName} ${teacher.middleName} `}
                  />
                )}
              </li>
            ),
        )}
    </ul>
  );
};
