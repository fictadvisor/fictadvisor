'use client';
import React from 'react';

import AdminPanelLayout from '@/components/common/layout/admin-panel-layout/AdminPanelLayout';
import AdminSubjectCreatePage from '@/components/pages/admin/admin-subjects/admin-subject-create-page';

const AdminSubjectCreate = () => {
  return (
    <AdminPanelLayout>
      <AdminSubjectCreatePage />
    </AdminPanelLayout>
  );
};

export default AdminSubjectCreate;
