import { Metadata } from 'next';

import PageLayout from '@/components/common/layout/page-layout';
import EntrantAdminPage from '@/components/pages/entrant-admin-page';

export const metadata: Metadata = {
  title: 'Менеджент вступника | FICT Advisor',
};
export default function EntrantAdmin() {
  return (
    <PageLayout>
      <EntrantAdminPage />
    </PageLayout>
  );
}
