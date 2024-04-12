import { ReactNode } from 'react';
import { Metadata } from 'next';

import teacherSubjectMetadata from '@/lib/metadata/teacher-subject';

export const metadata: Metadata = teacherSubjectMetadata;

const SubjectPageLayout = ({ children }: { children: ReactNode }) => {
  return children;
};

export default SubjectPageLayout;
