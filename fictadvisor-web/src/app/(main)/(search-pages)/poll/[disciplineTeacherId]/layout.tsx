import { Metadata } from 'next';

import teacherPollMetadata from '@/lib/metadata/teacher-poll';

export const metadata: Metadata = teacherPollMetadata;

const TeacherPollPageLayout = ({ children }: { children: React.ReactNode }) => {
  return children;
};

export default TeacherPollPageLayout;
