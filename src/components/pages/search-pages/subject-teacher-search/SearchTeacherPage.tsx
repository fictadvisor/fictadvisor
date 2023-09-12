import React, { FC, useMemo } from 'react';
import { useQuery } from 'react-query';
import { Typography } from '@mui/material';
import { Box } from '@mui/material';
import { useRouter } from 'next/router';

import Breadcrumbs from '@/components/common/ui/breadcrumbs';
import { Breadcrumb } from '@/components/common/ui/breadcrumbs/types';
import Progress from '@/components/common/ui/progress';
import { SubjectTeacherSearchList } from '@/components/pages/search-pages/subject-teacher-search/components/SubjectTeacherSearchList';
import SubjectsAPI from '@/lib/api/subject/SubjectAPI';
import { GetTeachersBySubjectResponse } from '@/lib/api/subject/types/GetTeachersBySubjectResponse';

import * as styles from './SearchTeacherPage.styles';

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

const SearchTeacherPage: FC = () => {
  const { query, isReady } = useRouter();

  const { data, isLoading } = useQuery<GetTeachersBySubjectResponse>(
    ['teacher-by-subject', query.subjectId],
    () => SubjectsAPI.getTeachersBySubject(query.subjectId as string),
    { enabled: isReady, staleTime: Infinity },
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
          subjectId={query.subjectId as string}
        />
      )}
    </Box>
  );
};

export default SearchTeacherPage;
