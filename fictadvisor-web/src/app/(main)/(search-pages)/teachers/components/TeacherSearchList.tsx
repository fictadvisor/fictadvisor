import { FC, HTMLProps, useEffect } from 'react';
import { PaginatedTeachersResponse } from '@fictadvisor/utils/responses';
import { Box } from '@mui/material';
import Link from 'next/link';

import { TeacherCard } from '@/components/common/ui/cards/teacher-card';
import useToast from '@/hooks/use-toast';

import * as styles from './TeacherSearchList.styles';

interface TeacherSearchListProps
  extends HTMLProps<HTMLDivElement>,
    PaginatedTeachersResponse {
  isFetching: boolean;
}

const TOAST_TIMER = 4000;

export const TeacherSearchList: FC<TeacherSearchListProps> = ({
  teachers,
  isFetching,
}) => {
  const toast = useToast();

  useEffect(() => {
    if (teachers.length === 0 && !isFetching) {
      toast.error('Результатів за запитом не знайдено', '', TOAST_TIMER);
    }
  }, [isFetching]);

  return (
    <Box sx={styles.teacherSearchList}>
      {teachers.map((teacher, index) => (
        <Link key={index} href={`/teachers/${teacher.id}`}>
          <TeacherCard
            avatar={teacher.avatar}
            key={teacher.id}
            name={`${teacher.lastName} ${teacher.firstName} ${teacher.middleName}`}
            rating={teacher.rating / 20}
            disciplineTypes={teacher.disciplineTypes}
            cathedras={teacher.cathedras}
          />
        </Link>
      ))}
    </Box>
  );
};
