import { FC } from 'react';
import { Metadata } from 'next';

import PageLayout from '@/components/common/layout/page-layout';
import LoginPage from '@/components/pages/login-page';
export const metadata: Metadata = {
  title: 'Авторизація у FICT Advisor',
};
const Login: FC = () => {
  return (
    <PageLayout hasHeader={false} hasFooter={false}>
      <LoginPage />
    </PageLayout>
  );
};

export default Login;
