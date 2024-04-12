import { Metadata } from 'next';

import PageLayout from '@/components/common/layout/page-layout';
import contractAdminMetadata from '@/lib/metadata/contract-admin';

export const metadata: Metadata = contractAdminMetadata;

const ContractAdminSubmissionLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <PageLayout>{children}</PageLayout>;
};

export default ContractAdminSubmissionLayout;
