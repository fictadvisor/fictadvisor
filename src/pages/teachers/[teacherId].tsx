import { FC } from 'react';

import PageLayout from '@/components/common/layout/page-layout/PageLayout';
import PersonalTeacherPage from '@/components/pages/personal-teacher-page';

const PersonalTeacher: FC = () => {
  return (
    <PageLayout title="Викладач">
      <PersonalTeacherPage />
    </PageLayout>
  );
};

export default PersonalTeacher;
