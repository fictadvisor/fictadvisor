'use client';
import { FC } from 'react';

import PageLayout from '@/components/common/layout/page-layout';
import CreatePasswordPage from '@/components/pages/password-recovery/create-password-page/CreatePasswordPage';

interface TokenParams {
  params: {
    token: string;
  };
}

const CreatePassword: FC<TokenParams> = ({ params }) => {
  const token = params.token;

  return (
    <PageLayout hasHeader={false} hasFooter={false} robots="noindex">
      <CreatePasswordPage token={token} />
    </PageLayout>
  );
};

export default CreatePassword;
