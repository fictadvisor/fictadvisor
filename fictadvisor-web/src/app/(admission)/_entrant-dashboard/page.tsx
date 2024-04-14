import { Metadata } from 'next';

import PageLayout from '@/components/common/layout/page-layout';
import EntrantDashboardPage from '@/components/pages/entrant-dashboard-page';
import entrantAdminMetadata from '@/lib/metadata/entrant-admin';
export const metadata: Metadata = entrantAdminMetadata;
const DeleteEntrantAdmin = () => {
  return (
    <PageLayout>
      <EntrantDashboardPage />
    </PageLayout>
  );
};

export default DeleteEntrantAdmin;
