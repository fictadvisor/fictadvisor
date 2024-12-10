import { Metadata } from 'next';

import PageLayout from '@/components/common/layout/page-layout';
import loginMetadata from '@/lib/metadata/login';

export const metadata: Metadata = loginMetadata;

const TeacherSearchPageLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <PageLayout hasFooter={false} hasHeader={false}>
      {children}
    </PageLayout>
  );
};

export default TeacherSearchPageLayout;
