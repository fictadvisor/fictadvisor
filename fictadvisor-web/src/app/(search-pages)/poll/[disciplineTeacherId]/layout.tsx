import { Metadata } from 'next';

import PageLayout from '@/components/common/layout/page-layout';
import teacherPollMetadata from '@/lib/metadata/teacher-poll';

export const metadata: Metadata = teacherPollMetadata;

const TeacherPollPageLayout = ({ children }: { children: React.ReactNode }) => {
  return <PageLayout>{children}</PageLayout>;
};

export default TeacherPollPageLayout;
