import { useQuery } from 'react-query';
import { useRouter } from 'next/router';

import PageLayout from '@/components/common/layout/page-layout';
import Breadcrumbs from '@/components/common/ui/breadcrumbs';
import Loader from '@/components/common/ui/loader';
import PersonalTeacherCard from '@/components/pages/personal-teacher-page/personal-teacher-card';
import PersonalTeacherTabs from '@/components/pages/personal-teacher-page/personal-teacher-tabs';
import styles from '@/components/pages/personal-teacher-page/PersonalTeacherPage.module.scss';
import { TeacherAPI } from '@/lib/api/teacher/TeacherAPI';

const PersonalTeacherPage = () => {
  const router = useRouter();
  const teacherId = router.query.teacherId as string;

  const { isLoading, isError, data } = useQuery(
    ['teacher', teacherId],
    () => TeacherAPI.get(teacherId),
    {
      refetchOnWindowFocus: false,
      retry: false,
    },
  );

  return (
    <PageLayout description={'Сторінка викладача'}>
      <div className={styles['personal-teacher-page']}>
        <div className={styles['personal-teacher-page-content']}>
          {isLoading ? (
            <div className={styles['loader']}>
              <Loader></Loader>
            </div>
          ) : (
            !isError && (
              <div>
                <Breadcrumbs
                  className={styles['breadcrumbs']}
                  items={[
                    {
                      label: 'Головна',
                      href: '/',
                    },
                    { label: 'Викладачі', href: '/subjects' },
                    {
                      label: 'Викладач',
                      href: '/teachers/[token]',
                    },
                  ]}
                />
                <div className={styles['card-wrapper']}>
                  <PersonalTeacherCard {...data} />
                </div>
                <div className={styles['tabs']}>
                  <PersonalTeacherTabs />
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </PageLayout>
  );
};
export default PersonalTeacherPage;
