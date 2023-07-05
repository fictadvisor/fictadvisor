import { useMemo } from 'react';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';

import Breadcrumbs from '@/components/common/ui/breadcrumbs';
import { Breadcrumb } from '@/components/common/ui/breadcrumbs/types';
import Loader, { LoaderSize } from '@/components/common/ui/loader';
import styles from '@/components/pages/search-pages/SearchPage.module.scss';
import { SubjectTeacherSearchList } from '@/components/pages/search-pages/subject-teacher-search/SubjectTeacherSearchList';
import SubjectsAPI from '@/lib/api/subject/SubjectAPI';
import { GetTeachersBySubjectResponse } from '@/lib/api/subject/types/GetTeachersBySubjectResponse';

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

const SubjectTeacherPage = () => {
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
    <div className={styles['layout']}>
      <Breadcrumbs
        items={[...breadcrumbs, subject]}
        sx={{ margin: '16px 0px 16px 0px' }} //TODO move inline styles when refactor
      />
      <h4 className={styles['subject-title']}>{data?.subjectName}</h4>
      {isLoading && (
        <div className={styles['page-loader']}>
          <Loader size={LoaderSize.SMALLEST} />
        </div>
      )}
      {data && !isLoading && (
        <SubjectTeacherSearchList
          teachers={data.teachers}
          subjectId={query.subjectId as string}
        />
      )}
    </div>
  );
};

export default SubjectTeacherPage;
