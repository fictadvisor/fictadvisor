import { FC } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { RatingCard } from '@/components/common/composite/cards/Cards';
import { GetTeachersBySubjectDTO } from '@/lib/api/subject/dto/GetTeachersBySubjectDTO';
import { GetTeachersDTO } from '@/lib/api/teacher/dto/GetTeacherDTO';

import styles from '../SearchPage.module.scss';

export const TeacherSearchList = ({
  teachers,
  className,
}:
  | (GetTeachersDTO & { className: string })
  | (Omit<GetTeachersBySubjectDTO, 'subjectName'> & { className: string })) => {
  return (
    <ul className={styles[`${className}-search-list`]}>
      {teachers &&
        teachers?.map(
          teacher =>
            teacher.lastName.length > 0 &&
            (teacher.roles ? (
              <Link href={`/teachers/${teacher.id}`}>
                <RatingCard
                  key={teacher.id}
                  name={`${teacher.lastName} ${teacher.firstName} ${teacher.middleName}`}
                  roles={teacher.roles}
                />
              </Link>
            ) : (
              <Link href={`/teachers/${teacher.id}`}>
                <RatingCard
                  key={teacher.id}
                  name={`${teacher.lastName} ${teacher.firstName} ${teacher.middleName}`}
                  roles={teacher.roles}
                />
              </Link>
            )),
        )}
    </ul>
  );
};
