import React from 'react';

import AdminPanelLayout from '@/components/common/layout/admin-panel-layout/AdminPanelLayout';
import TeachersAdminPage from '@/components/pages/admin/admin-teachers/search-teacher-admin-page/TeachersAdminPage';

const Page = () => {
  return (
    <AdminPanelLayout>
      <TeachersAdminPage />
    </AdminPanelLayout>
  );
};

export default Page;
