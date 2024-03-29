import { Metadata } from 'next';

import PageLayout from '@/components/common/layout/page-layout';
import EntrantDashboardPage from '@/components/pages/entrant-dashboard-page';
export const metadata: Metadata = {
  title: 'Менеджент вступника | FICE Advisor',
  openGraph: {
    title: 'Менеджент вступника | FICE Advisor',
  },
};
const DeleteEntrantAdmin = () => {
  return (
    <PageLayout>
      <EntrantDashboardPage />
    </PageLayout>
  );
};

export default DeleteEntrantAdmin;
