import React from 'react';

import AdminPanelLayout from '@/components/common/layout/admin-panel-layout/AdminPanelLayout';
import AdminUserCreate from '@/components/pages/admin/admin-user/create-user-page';

const Create = () => {
  return (
    <AdminPanelLayout>
      <AdminUserCreate />
    </AdminPanelLayout>
  );
};

export default Create;
