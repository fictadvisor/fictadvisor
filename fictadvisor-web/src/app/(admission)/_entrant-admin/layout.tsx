import { Metadata } from 'next';

import PageLayout from '@/components/common/layout/page-layout';
import entrantAdminMetadata from '@/lib/metadata/entrant-admin';

export const metadata: Metadata = entrantAdminMetadata;

const EntrantAdminLayout = ({ children }: { children: React.ReactNode }) => {
  return <PageLayout>{children}</PageLayout>;
};

export default EntrantAdminLayout;
