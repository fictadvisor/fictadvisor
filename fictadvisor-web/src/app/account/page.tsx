'use client';

import { Metadata } from 'next';

import PageLayout from '@/components/common/layout/page-layout';
import AccountPage from '@/components/pages/account-page';

/*export const metadata: Metadata = {
  title: 'Персональний акаунт FICT Advisor',
};*/
const Account = () => (
  <PageLayout>
    <AccountPage />
  </PageLayout>
);

export default Account;
