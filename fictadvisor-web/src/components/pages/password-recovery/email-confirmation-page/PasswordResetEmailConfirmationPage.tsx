import EmailConfirmationPage from '@/components/pages/email-confirmation-page';

const PasswordResetEmailConfirmationPage = () => (
  <EmailConfirmationPage apiMethodName="forgotPassword" />
);

export default PasswordResetEmailConfirmationPage;
