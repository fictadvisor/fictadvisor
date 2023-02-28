import PageLayout from '@/components/common/layout/page-layout';
import PersonalTeacherCard from '@/components/pages/personal-teacher-page/personal-teacher-card';
import PersonalTeacherTabs from '@/components/pages/personal-teacher-page/personal-teacher-tabs';
import styles from '@/components/pages/personal-teacher-page/PersonalTeacherPage.module.scss';
import { testData } from '@/components/pages/personal-teacher-page/testData';
import { transformData } from '@/components/pages/personal-teacher-page/utils';

const PersonalTeacherPage = () => {
  const data = transformData(testData);
  return (
    <PageLayout description={'Сторінка викладача'}>
      <div className={styles['personal-teacher-page']}>
        <div className={styles['personal-teacher-page-content']}>
          <div>ТУТ БУДЕ BREADCRUMB</div>
          <div className={styles['cardy']}>
            <PersonalTeacherCard {...data} />
          </div>
          <div>
            <PersonalTeacherTabs></PersonalTeacherTabs>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};
export default PersonalTeacherPage;
