import { ReactNode } from 'react';
import { Metadata } from 'next';

import PageLayout from '@/components/common/layout/page-layout';
import disciplineMetadata from '@/lib/metadata/discipline';

export const metadata: Metadata = disciplineMetadata;

const PersonalTeacherSubjectPageLayout = ({
  children,
}: {
  children: ReactNode;
}) => {
  return <PageLayout>{children}</PageLayout>;
};

export default PersonalTeacherSubjectPageLayout;
