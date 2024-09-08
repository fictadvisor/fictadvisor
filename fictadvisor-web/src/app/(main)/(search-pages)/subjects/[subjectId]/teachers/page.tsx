'use client';

import React, { FC, useMemo } from 'react';
import { SubjectWithTeachersResponse } from '@fictadvisor/utils/responses';
import { Box, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { SubjectTeacherSearchList } from '@/app/(main)/(search-pages)/subjects/[subjectId]/teachers/components/SubjectTeacherSearchList';
import * as styles from '@/app/(main)/(search-pages)/subjects/[subjectId]/teachers/SearchTeacherPage.styles';
import Breadcrumbs from '@/components/common/ui/breadcrumbs';
import { Breadcrumb } from '@/components/common/ui/breadcrumbs/types';
import Progress from '@/components/common/ui/progress';
import SubjectsAPI from '@/lib/api/subject/SubjectAPI';

interface SubjectTeacherPage {
  params: {
    subjectId: string;
  };
}

const breadcrumbs: Breadcrumb[] = [
  {
    label: 'Головна',
    href: '/',
  },
  {
    label: 'Предмети',
    href: '/subjects',
  },
];

const SubjectPage: FC<SubjectTeacherPage> = ({ params }) => {
  const subjectId = params.subjectId;
  const { data, isLoading } = useQuery({
    queryKey: ['teacher-by-subject', subjectId],
    queryFn: () => SubjectsAPI.getTeachersBySubject(subjectId),
    staleTime: Infinity,
  });

  const subject: Breadcrumb = useMemo(
    () => ({ label: data?.subjectName || '', href: '#' }),
    [data],
  );

  return (
    <Box sx={styles.layout}>
      <Breadcrumbs items={[...breadcrumbs, subject]} sx={styles.breadcrumbs} />
      <Typography variant="h4">{data?.subjectName}</Typography>
      {isLoading && (
        <Box sx={styles.pageLoader}>
          <Progress />
        </Box>
      )}
      {data && !isLoading && (
        <SubjectTeacherSearchList
          teachers={data.teachers}
          subjectId={subjectId}
        />
      )}
    </Box>
  );
};

export default SubjectPage;
