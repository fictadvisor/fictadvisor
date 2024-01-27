'use client';
import React from 'react';

import AdminPanelLayout from '@/components/common/layout/admin-panel-layout/AdminPanelLayout';
import AdminDepartmentSearchPage from '@/components/pages/admin/admin-departments/admin-departments-search-page/AdminDepartmentSearchPage';

const Page = () => {
  return (
    <AdminPanelLayout>
      <AdminDepartmentSearchPage />
    </AdminPanelLayout>
  );
};

export default Page;
