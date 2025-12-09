'use client';

import dynamic from 'next/dynamic';
const EmailConfirmationPage = dynamic(
  () =>
    import('@/app/_сomponents/email-confirmation-page/EmailConfirmationPage'),
  { ssr: false },
);

const PasswordResetEmailConfirmation = () => (
  <EmailConfirmationPage apiMethodName="forgotPassword" />
);

export default PasswordResetEmailConfirmation;
