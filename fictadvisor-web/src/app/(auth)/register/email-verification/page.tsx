'use client';

import EmailConfirmationPage from '@/app/_сomponents/email-confirmation-page/EmailConfirmationPage';

const RegistrationEmailConfirmation = () => (
  <EmailConfirmationPage apiMethodName="verifyEmail" />
);

export default RegistrationEmailConfirmation;
