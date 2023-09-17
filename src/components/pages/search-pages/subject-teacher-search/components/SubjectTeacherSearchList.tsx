import { FC } from 'react';
import { Box, Typography } from '@mui/material';
import List from '@mui/material/List';
import Image from 'next/image';
import Link from 'next/link';

import { TeacherCard } from '@/components/common/ui/cards/teacher-card';
import { Teacher } from '@/types/teacher';

import * as stylesMUI from './SubjectTeacherSearchList.styles';

import styles from './SubjectTeacherSearchList.module.scss';
export interface SubjectTeacherSearchListProps {
  subjectId: string;
  teachers: Omit<Teacher, 'contacts'>[];
}

export const SubjectTeacherSearchList: FC<SubjectTeacherSearchListProps> = ({
  subjectId,
  teachers,
}) => {
  return (
    <>
      {teachers.length === 0 && (
        <Box sx={stylesMUI.wrapper}>
          <Image
            src="/gifs/grey-frog.gif"
            alt="Frogs complete the poll"
            width={220}
            height={220}
            quality={100}
          />
          <Typography sx={stylesMUI.headText}>
            Немає викладачів на цей предмет
          </Typography>
        </Box>
      )}
      <List>
        {teachers &&
          teachers.map((teacher, index) => (
            <Link
              key={index}
              href={`/discipline?teacherId=${teacher.id}&subjectId=${subjectId}`}
            >
              <TeacherCard
                avatar={teacher.avatar}
                key={teacher.id}
                name={`${teacher.lastName} ${teacher.firstName} ${teacher.middleName}`}
                roles={teacher.roles}
                rating={teacher.rating / 20}
                isSubjectCard={true}
              />
            </Link>
          ))}
      </List>
    </>
  );
};
