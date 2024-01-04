import { useRouter } from 'next/router';

import PageLayout from '@/components/common/layout/page-layout';
import EntrantDashboardPage from '@/components/pages/entrant-dashboard-page';
import useAuthentication from '@/hooks/use-authentication';
const DeleteEntrantAdmin = () => {
  const { isLoggedIn } = useAuthentication();
  const router = useRouter();

  if (!isLoggedIn) router.push('/login');
  return (
    <PageLayout title="Менеджент вступника | FICT Advisor">
      <EntrantDashboardPage />
    </PageLayout>
  );
};

export default DeleteEntrantAdmin;
