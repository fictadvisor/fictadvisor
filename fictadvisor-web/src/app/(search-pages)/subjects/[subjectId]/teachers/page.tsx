'use client';

import React, { FC, useMemo } from 'react';
import { useQuery } from 'react-query';
import { Box, Typography } from '@mui/material';

import { SubjectTeacherSearchList } from '@/app/(search-pages)/subjects/[subjectId]/teachers/components/SubjectTeacherSearchList';
import * as styles from '@/app/(search-pages)/subjects/[subjectId]/teachers/SearchTeacherPage.styles';
import Breadcrumbs from '@/components/common/ui/breadcrumbs';
import { Breadcrumb } from '@/components/common/ui/breadcrumbs/types';
import Progress from '@/components/common/ui/progress';
import SubjectsAPI from '@/lib/api/subject/SubjectAPI';
import { GetTeachersBySubjectResponse } from '@/lib/api/subject/types/GetTeachersBySubjectResponse';

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
  const { data, isLoading } = useQuery<GetTeachersBySubjectResponse>(
    ['teacher-by-subject', subjectId],
    () => SubjectsAPI.getTeachersBySubject(subjectId),
    { staleTime: Infinity },
  );

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
