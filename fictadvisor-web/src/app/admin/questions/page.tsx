import React from 'react';

import AdminPanelLayout from '@/components/common/layout/admin-panel-layout/AdminPanelLayout';
import QuestionsAdminPage from '@/components/pages/admin/questions-admin-page/QueationsAdminPage';

const Page = () => {
  return (
    <AdminPanelLayout>
      <QuestionsAdminPage />
    </AdminPanelLayout>
  );
};

export default Page;
