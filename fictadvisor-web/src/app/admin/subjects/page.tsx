'use client';
import React from 'react';

import AdminPanelLayout from '@/components/common/layout/admin-panel-layout/AdminPanelLayout';
import AdminSubjectSearchPage from '@/components/pages/admin/admin-subjects/admin-subject-search-page';

const AdminSubjectSearch = () => {
  return (
    <AdminPanelLayout>
      <AdminSubjectSearchPage />
    </AdminPanelLayout>
  );
};

export default AdminSubjectSearch;
