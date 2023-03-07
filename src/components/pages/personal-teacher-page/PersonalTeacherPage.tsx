import PageLayout from '@/components/common/layout/page-layout';
import Breadcrumbs from '@/components/common/ui/breadcrumbs';
import PersonalTeacherCard from '@/components/pages/personal-teacher-page/personal-teacher-card';
import PersonalTeacherTabs from '@/components/pages/personal-teacher-page/personal-teacher-tabs';
import styles from '@/components/pages/personal-teacher-page/PersonalTeacherPage.module.scss';
import { testData } from '@/components/pages/personal-teacher-page/testData';

const PersonalTeacherPage = () => {
  const data = testData;
  return (
    <PageLayout description={'Сторінка викладача'}>
      <div className={styles['personal-teacher-page']}>
        <div className={styles['personal-teacher-page-content']}>
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
      </div>
    </PageLayout>
  );
};
export default PersonalTeacherPage;
