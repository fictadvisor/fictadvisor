import Link from 'next/link';

import { TeacherCard } from '@/components/common/ui/cards/teacher-card';
import { GetTeachersBySubjectDTO } from '@/lib/api/subject/dto/GetTeachersBySubjectDTO';
import { GetTeachersDTO } from '@/lib/api/teacher/dto/GetTeacherDTO';

import styles from './TeacherSearchList.module.scss';

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
            <TeacherCard
              avatar={teacher.avatar}
              key={teacher.id}
              name={`${teacher.lastName} ${teacher.firstName} ${teacher.middleName}`}
            />
          </Link>
        ))}
    </ul>
  );
};
