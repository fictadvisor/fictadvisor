'use client';
import React from 'react';

import AdminPanelLayout from '@/components/common/layout/admin-panel-layout/AdminPanelLayout';
import DisciplinesAdminPage from '@/components/pages/admin/disciplines-admin-page/DisciplinesAdminPage';

const DisciplinesAdminSearch = () => {
  return (
    <AdminPanelLayout>
      <DisciplinesAdminPage />
    </AdminPanelLayout>
  );
};

export default DisciplinesAdminSearch;
