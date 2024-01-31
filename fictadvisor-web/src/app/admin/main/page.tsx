import React from 'react';

import AdminPanelLayout from '@/components/common/layout/admin-panel-layout/AdminPanelLayout';
import AdminHomePage from '@/components/pages/admin/admin-main/AdminHomePage';

const Page = () => {
  return (
    <AdminPanelLayout>
      <AdminHomePage />
    </AdminPanelLayout>
  );
};

export default Page;
