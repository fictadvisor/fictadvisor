import { FC, HTMLProps, useEffect } from 'react';
import { Box } from '@mui/material';
import Link from 'next/link';

import { TeacherCard } from '@/components/common/ui/cards/teacher-card';
import useToast from '@/hooks/use-toast';
import { GetTeachersResponse } from '@/lib/api/teacher/types/GetTeachersResponse';

import * as styles from './TeacherSearchList.styles';

interface TeacherSearchListProps
  extends HTMLProps<HTMLDivElement>,
    GetTeachersResponse {}

const TOAST_TIMER = 4000;

export const TeacherSearchList: FC<TeacherSearchListProps> = ({ teachers }) => {
  const toast = useToast();

  useEffect(() => {
    if (teachers.length === 0) {
      toast.error('Цього викладача не існує', '', TOAST_TIMER);
    }
  }, [teachers.length]);
  return (
    <Box sx={styles.teacherSearchList}>
      {teachers?.map((teacher, index) => (
        <Link key={index} href={`/teachers/${teacher.id}`}>
          <TeacherCard
            avatar={teacher.avatar}
            key={teacher.id}
            name={`${teacher.lastName} ${teacher.firstName} ${teacher.middleName}`}
            rating={teacher.rating / 20}
          />
        </Link>
      ))}
    </Box>
  );
};
