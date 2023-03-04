import { useQuery } from 'react-query';
import { useRouter } from 'next/router';

import PageLayout from '@/components/common/layout/page-layout';
import Breadcrumbs from '@/components/common/ui/breadcrumbs';
import styles from '@/components/pages/search-pages/SearchPage.module.scss';
import { TeacherSearchList } from '@/components/pages/search-pages/teacher-search/TeacherSearchList';
import { GetTeachersBySubjectDTO } from '@/lib/api/subject/dto/GetTeachersBySubjectDTO';
import { SubjectsAPI } from '@/lib/api/subject/SubjectAPI';

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

const SubjectTeacherPage = () => {
  const { query, isReady } = useRouter();

  const { data, isLoading } = useQuery<GetTeachersBySubjectDTO>(
    ['teacher-by-subject', query.subjectId],
    SubjectsAPI.getTeachersBySubject.bind(null, query.subjectId),
    { enabled: isReady, staleTime: Infinity },
  );

  console.log(data);

  return (
    <PageLayout description={'Вчителі'}>
      <div className={styles['layout']}>
        <Breadcrumbs items={breadcrumbs} className={styles['breadcrumb']} />
        <h4>
          <b>{data?.subjectName}</b>
        </h4>
        {data && <TeacherSearchList teachers={data.teachers} />}
      </div>
    </PageLayout>
  );
};

export default SubjectTeacherPage;
