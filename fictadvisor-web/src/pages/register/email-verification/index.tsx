import PageLayout from '@/components/common/layout/page-layout';
import RegistrationEmailConfirmationPage from '@/components/pages/register/email-confirmation-page';

const RegistrationEmailConfirmation = () => (
  <PageLayout hasHeader={false} hasFooter={false} robots="noindex">
    <RegistrationEmailConfirmationPage />
  </PageLayout>
);

export default RegistrationEmailConfirmation;
