import { Metadata } from 'next';

import PageLayout from '@/components/common/layout/page-layout';
import AccountPage from '@/components/pages/account-page';
import accountMetadata from '@/lib/metadata/account';

export const metadata: Metadata = accountMetadata;
const Account = () => (
  <PageLayout>
    <AccountPage />
  </PageLayout>
);

export default Account;
