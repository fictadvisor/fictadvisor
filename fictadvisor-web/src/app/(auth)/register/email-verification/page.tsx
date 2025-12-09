'use client';

import dynamic from 'next/dynamic';
const EmailConfirmationPage = dynamic(
  () =>
    import('@/app/_сomponents/email-confirmation-page/EmailConfirmationPage'),
  { ssr: false },
);
const RegistrationEmailConfirmation = () => (
  <EmailConfirmationPage apiMethodName="verifyEmail" />
);

export default RegistrationEmailConfirmation;
