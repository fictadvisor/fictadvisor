import React from 'react';

import AdminPanelLayout from '@/components/common/layout/admin-panel-layout/AdminPanelLayout';
import AdminRolesCreate from '@/components/pages/admin/admin-roles/create-roles-page/AdminRolesCreate';

const Create = () => {
  return (
    <AdminPanelLayout>
      <AdminRolesCreate />
    </AdminPanelLayout>
  );
};

export default Create;
