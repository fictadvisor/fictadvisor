'use client';

import EmailConfirmationPage from '@/app/_сomponents/email-confirmation-page/EmailConfirmationPage';

const PasswordResetEmailConfirmation = () => (
  <EmailConfirmationPage apiMethodName="forgotPassword" />
);

export default PasswordResetEmailConfirmation;
