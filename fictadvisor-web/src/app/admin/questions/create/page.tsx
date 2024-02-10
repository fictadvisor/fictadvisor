import React from 'react';

import AdminPanelLayout from '@/components/common/layout/admin-panel-layout/AdminPanelLayout';
import QuestionsCreatePage from '@/components/pages/admin/questions-admin-page/components/questions-create-page';

const Page = () => {
  return (
    <AdminPanelLayout>
      <QuestionsCreatePage />
    </AdminPanelLayout>
  );
};

export default Page;
