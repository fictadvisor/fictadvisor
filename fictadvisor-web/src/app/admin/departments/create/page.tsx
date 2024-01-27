'use client';
import React from 'react';

import AdminPanelLayout from '@/components/common/layout/admin-panel-layout/AdminPanelLayout';
import AdminDepartmentsCreatePage from '@/components/pages/admin/admin-departments/admin-departments-create-page/AdminDepartmentsCreatePage';

const Page = () => {
  return (
    <AdminPanelLayout>
      <AdminDepartmentsCreatePage />
    </AdminPanelLayout>
  );
};

export default Page;
