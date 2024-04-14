import { Metadata } from 'next';

import PageLayout from '@/components/common/layout/page-layout';
import EntrantAdminPage from '@/components/pages/entrant-admin-page';
import entrantAdminMetadata from '@/lib/metadata/entrant-admin';

export const metadata: Metadata = entrantAdminMetadata;
export default function EntrantAdmin() {
  return (
    <PageLayout>
      <EntrantAdminPage />
    </PageLayout>
  );
}
