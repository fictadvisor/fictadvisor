import { FC } from 'react';
import { Metadata } from 'next';

import PageLayout from '@/components/common/layout/page-layout/PageLayout';
import TeacherSearchPage from '@/components/pages/search-pages/teacher-search';
import teachersMetadata from '@/lib/metadata/teachers';

export const metadata: Metadata = teachersMetadata;
const TeacherPage: FC = () => {
  return (
    <PageLayout>
      <TeacherSearchPage />
    </PageLayout>
  );
};

export default TeacherPage;
