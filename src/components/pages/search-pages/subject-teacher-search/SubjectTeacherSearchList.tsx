import React from 'react';

import styles from './SubjectTeacherSearchList.module.scss';
import Link from 'next/link';
import { GetTeacherDTO } from '@/lib/api/teacher/dto/GetTeacherDTO';
import { SubjectTeacherCard } from '@/components/common/composite/cards/subject-teacher-card';

export interface SubjectTeacherSearchListProps {
  subjectId: string;
  teachers: Omit<GetTeacherDTO, 'contacts' | 'description'>[];
}

export const SubjectTeacherSearchList: React.FC<
  SubjectTeacherSearchListProps
> = ({ subjectId, teachers }) => {
  return (
    <ul className={styles[`subject-teacher-search-list`]}>
      {teachers &&
        teachers.map((teacher, index) => (
          <Link
            key={index}
            href={`/discipline?teacherId=${teacher.id}&subjectId=${subjectId}`}
          >
            <SubjectTeacherCard
              avatar={teacher.avatar}
              key={teacher.id}
              name={`${teacher.lastName} ${teacher.firstName} ${teacher.middleName}`}
              roles={teacher.roles}
            />
          </Link>
        ))}
    </ul>
  );
}