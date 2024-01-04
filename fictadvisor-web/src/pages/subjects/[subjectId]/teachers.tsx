import { FC } from 'react';

import PageLayout from '@/components/common/layout/page-layout/PageLayout';
import SubjectTeacherPage from '@/components/pages/search-pages/subject-teacher-search';

const SubjectPage: FC = () => {
  return (
    <PageLayout title="Предмет">
      <SubjectTeacherPage />
    </PageLayout>
  );
};

export default SubjectPage;
