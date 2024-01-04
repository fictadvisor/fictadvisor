import PageLayout from '@/components/common/layout/page-layout';
import PasswordResetLinkExpiredPage from '@/components/pages/password-recovery/link-expired';

const PasswordResetLinkExpired = () => (
  <PageLayout hasHeader={false} hasFooter={false} robots="noindex">
    <PasswordResetLinkExpiredPage />
  </PageLayout>
);

export default PasswordResetLinkExpired;
