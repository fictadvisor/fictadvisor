import { ReactNode } from 'react';
import { Metadata } from 'next';

import PageLayout from '@/components/common/layout/page-layout';
import accountMetadata from '@/lib/metadata/account';

export const metadata: Metadata = accountMetadata;

const AccountPageLayout = ({ children }: { children: ReactNode }) => {
  return <PageLayout>{children}</PageLayout>;
};

export default AccountPageLayout;
