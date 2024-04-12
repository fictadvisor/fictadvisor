import { Metadata } from 'next';

import PageLayout from '@/components/common/layout/page-layout';
import teachersMetadata from '@/lib/metadata/teachers';

export const metadata: Metadata = teachersMetadata;

const TeacherSearchPageLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <PageLayout>{children}</PageLayout>;
};

export default TeacherSearchPageLayout;
