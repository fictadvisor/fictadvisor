import React from 'react';

import AdminPanelLayout from '@/components/common/layout/admin-panel-layout/AdminPanelLayout';
import AdminGroupsCreate from '@/components/pages/admin/admin-groups/create-groups-admin-page/AdminGroupsCreate';

const AdminCreateStudentPage = () => {
  return (
    <AdminPanelLayout>
      <AdminGroupsCreate />
    </AdminPanelLayout>
  );
};

export default AdminCreateStudentPage;
