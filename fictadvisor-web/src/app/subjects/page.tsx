import { FC } from 'react';
import { Metadata } from 'next';

import PageLayout from '@/components/common/layout/page-layout/PageLayout';
import SubjectSearchPage from '@/components/pages/search-pages/subject-search';
import subjectsMetadata from '@/lib/metadata/subjects';

export const metadata: Metadata = subjectsMetadata;
const SubjectsPage: FC = () => {
  return (
    <PageLayout>
      <SubjectSearchPage />
    </PageLayout>
  );
};

export default SubjectsPage;
