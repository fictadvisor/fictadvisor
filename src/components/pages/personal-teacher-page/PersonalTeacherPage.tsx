import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

import PageLayout from '@/components/common/layout/page-layout';
import { AlertColor } from '@/components/common/ui/alert';
import Breadcrumbs from '@/components/common/ui/breadcrumbs';
import Loader from '@/components/common/ui/loader';
import PersonalTeacherCard from '@/components/pages/personal-teacher-page/personal-teacher-card';
import PersonalTeacherTabs from '@/components/pages/personal-teacher-page/personal-teacher-tabs';
import styles from '@/components/pages/personal-teacher-page/PersonalTeacherPage.module.scss';
import { TeacherAPI } from '@/lib/api/teacher/TeacherAPI';
import { showAlert } from '@/redux/reducers/alert.reducer';

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
  const dispatch = useDispatch();
  if (isError) {
    dispatch(
      showAlert({
        color: AlertColor.ERROR,
        title: 'Куди ти лізеш, цієї людини не існує',
      }),
    );
    setTimeout(() => {
      void router.push('/teachers');
    }, 3000);
  }
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
