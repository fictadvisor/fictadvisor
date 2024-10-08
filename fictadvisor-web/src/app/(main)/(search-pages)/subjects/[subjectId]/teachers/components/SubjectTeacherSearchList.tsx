import { FC } from 'react';
import { TeacherWithRolesAndCathedrasResponse } from '@fictadvisor/utils/responses';
import { Box, Typography } from '@mui/material';
import List from '@mui/material/List';
import Image from 'next/image';
import Link from 'next/link';

import { TeacherCard } from '@/components/common/ui/cards/teacher-card';

import * as styles from './SubjectTeacherSearchList.styles';

export interface SubjectTeacherSearchListProps {
  subjectId: string;
  teachers: TeacherWithRolesAndCathedrasResponse[];
}

export const SubjectTeacherSearchList: FC<SubjectTeacherSearchListProps> = ({
  subjectId,
  teachers,
}) => {
  return (
    <>
      {teachers.length === 0 && (
        <Box sx={styles.wrapper}>
          <Image
            src="/gifs/grey-frog.gif"
            alt="Frogs complete the poll"
            width={220}
            height={220}
            quality={100}
          />
          <Typography sx={styles.headText}>
            Немає викладачів на цей предмет
          </Typography>
        </Box>
      )}
      <List sx={styles.searchList}>
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
                disciplineTypes={teacher.disciplineTypes}
                rating={teacher.rating / 20}
                isSubjectCard
                cathedras={teacher.cathedras}
              />
            </Link>
          ))}
      </List>
    </>
  );
};
