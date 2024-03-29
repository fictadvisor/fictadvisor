import { Metadata } from 'next';

import PageLayout from '@/components/common/layout/page-layout';
import ContractAdminPage from '@/components/pages/contract-admin-page/ContractAdminPage';

export const metadata: Metadata = {
  title: 'Договори | FICE Advisor',
  openGraph: {
    title: 'Договори | FICE Advisor',
  },
};

const ContractAdminSubmission = () => {
  return (
    <PageLayout>
      <ContractAdminPage />
    </PageLayout>
  );
};

export default ContractAdminSubmission;
