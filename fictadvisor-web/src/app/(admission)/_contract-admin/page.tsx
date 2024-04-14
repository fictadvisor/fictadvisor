import { Metadata } from 'next';

import PageLayout from '@/components/common/layout/page-layout';
import ContractAdminPage from '@/components/pages/contract-admin-page/ContractAdminPage';
import contractAdminMetadata from '@/lib/metadata/contract-admin';

export const metadata: Metadata = contractAdminMetadata;

const ContractAdminSubmission = () => {
  return (
    <PageLayout>
      <ContractAdminPage />
    </PageLayout>
  );
};

export default ContractAdminSubmission;
