import React from 'react';

import AdminPanelLayout from '@/components/common/layout/admin-panel-layout/AdminPanelLayout';
import AdminMainPage from '@/components/pages/admin/admin-default/AdminMainPage';

const AdminMain = () => {
  return (
    <AdminPanelLayout>
      <AdminMainPage />
    </AdminPanelLayout>
  );
};

export default AdminMain;
