import { Metadata } from 'next';

import PageLayout from '@/components/common/layout/page-layout';
import subjectsMetadata from '@/lib/metadata/subjects';

export const metadata: Metadata = subjectsMetadata;

const SubjectSearchPageLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <PageLayout>{children}</PageLayout>;
};

export default SubjectSearchPageLayout;
