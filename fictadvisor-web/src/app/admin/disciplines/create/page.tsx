'use client';
import React from 'react';

import AdminPanelLayout from '@/components/common/layout/admin-panel-layout/AdminPanelLayout';
import DisciplinesAdminCreatePage from '@/components/pages/admin/disciplines-admin-page/pages/disciplines-create-page/DisciplinesAdminCreatePage';

const AdminSubjectCreate = () => {
  return (
    <AdminPanelLayout>
      <DisciplinesAdminCreatePage></DisciplinesAdminCreatePage>
    </AdminPanelLayout>
  );
};

export default AdminSubjectCreate;
