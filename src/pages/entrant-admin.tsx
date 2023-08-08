import { useRouter } from 'next/router';

import PageLayout from '@/components/common/layout/page-layout';
import EntrantAdminPage from '@/components/pages/entrant-admin-page';
import useAuthentication from '@/hooks/use-authentication';
const EntrantAdmin = () => {
  const { isLoggedIn } = useAuthentication();
  const router = useRouter();

  if (!isLoggedIn) router.push('/login');
  return (
    <PageLayout title="Менеджент вступника | FICT Advisor">
      <EntrantAdminPage />
    </PageLayout>
  );
};

export default EntrantAdmin;
