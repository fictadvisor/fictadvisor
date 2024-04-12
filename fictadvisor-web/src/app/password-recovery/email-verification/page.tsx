'use client';

import EmailConfirmationPage from '@/app/_сomponents/email-confirmation-page/EmailConfirmationPage';
import PageLayout from '@/components/common/layout/page-layout';

const PasswordResetEmailConfirmation = () => (
  <PageLayout hasHeader={false} hasFooter={false} robots="noindex">
    <EmailConfirmationPage apiMethodName="forgotPassword" />
  </PageLayout>
);

export default PasswordResetEmailConfirmation;
