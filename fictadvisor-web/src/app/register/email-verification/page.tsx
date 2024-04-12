'use client';

import RegistrationEmailConfirmationPage from 'src/app/register/email-verification/email-confirmation-page';

import PageLayout from '@/components/common/layout/page-layout';

const RegistrationEmailConfirmation = () => (
  <PageLayout hasHeader={false} hasFooter={false}>
    <RegistrationEmailConfirmationPage />
  </PageLayout>
);

export default RegistrationEmailConfirmation;
