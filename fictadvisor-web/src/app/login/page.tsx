import { FC } from 'react';
import { Metadata } from 'next';

import PageLayout from '@/components/common/layout/page-layout';
import LoginPage from '@/components/pages/login-page';
import loginMetadata from '@/lib/metadata/login';
export const metadata: Metadata = loginMetadata;
const Login: FC = () => {
  return (
    <PageLayout hasHeader={false} hasFooter={false}>
      <LoginPage />
    </PageLayout>
  );
};

export default Login;
