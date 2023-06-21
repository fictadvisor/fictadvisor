import { FC, useEffect } from 'react';
import Link from 'next/link';

import { SubjectTeacherCard } from '@/components/common/ui/cards/subject-teacher-card';
import useToast from '@/hooks/use-toast';
import { GetTeacherSubjectDTO } from '@/lib/api/teacher/dto/GetTeacherSubjectDTO';

import styles from './SubjectTeacherSearchList.module.scss';

const TOAST_TIMER = 4000;

export interface SubjectTeacherSearchListProps {
  subjectId: string;
  teachers: Omit<GetTeacherSubjectDTO, 'contacts' | 'subject'>[];
}

export const SubjectTeacherSearchList: FC<SubjectTeacherSearchListProps> = ({
  subjectId,
  teachers,
}) => {
  const toast = useToast();

  useEffect(() => {
    if (teachers.length === 0) {
      toast.error('У цього предмета немає викладачів', '', TOAST_TIMER);
    }
  }, [teachers.length]);
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
};
