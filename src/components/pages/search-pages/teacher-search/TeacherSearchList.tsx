import Link from 'next/link';

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
        teachers?.map((teacher, index) => (
          <Link key={index} href={`/teachers/${teacher.id}`}>
            <RatingCard
              key={teacher.id}
              name={`${teacher.lastName} ${teacher.firstName} ${teacher.middleName}`}
              roles={teacher.roles}
            />
          </Link>
        ))}
    </ul>
  );
};
