import { ReactNode } from 'react';
import { Metadata } from 'next';

import subjectsMetadata from '@/lib/metadata/subjects';

export const metadata: Metadata = subjectsMetadata;

const SubjectsPageLayout = ({ children }: { children: ReactNode }) => {
  return children;
};

export default SubjectsPageLayout;
