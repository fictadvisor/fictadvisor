import { useQuery } from 'react-query';
import { useRouter } from 'next/router';

import PageLayout from '@/components/common/layout/page-layout';
import Breadcrumbs from '@/components/common/ui/breadcrumbs';
import styles from '@/components/pages/search-pages/SearchPage.module.scss';
import { TeacherSearchList } from '@/components/pages/search-pages/teacher-search/TeacherSearchList';
import { GetTeachersBySubjectDTO } from '@/lib/api/subject/dto/GetTeachersBySubjectDTO';
import { SubjectsAPI } from '@/lib/api/subject/SubjectAPI';

const SubjectTeacherPage = () => {
  const breadcrumbs = [
    {
      label: 'Головна',
      href: '/',
    },
    {
      label: 'Предмети',
      href: '/subjects',
    },
  ];

  const { query, isReady } = useRouter();

  const { data, isLoading } = useQuery<GetTeachersBySubjectDTO>(
    ['teacher-by-subject', query.subjectId],
    SubjectsAPI.getTeachersBySubject.bind(null, query.subjectId),
    { enabled: isReady, staleTime: Infinity },
  );

  if (isReady && data)
    breadcrumbs.push({
      label: data.subjectName,
      href: '#',
    });

  console.log(data);

  return (
    <PageLayout title={data?.subjectName}>
      <div className={styles['layout']}>
        <Breadcrumbs items={breadcrumbs} className={styles['breadcrumb']} />
        <h4 className={styles['subject-title']}>
          <b>{data?.subjectName}</b>
        </h4>
        {data && <TeacherSearchList teachers={data.teachers} />}
      </div>
    </PageLayout>
  );
};

export default SubjectTeacherPage;
