'use client';
import React, { FC } from 'react';

import AdminPanelLayout from '@/components/common/layout/admin-panel-layout/AdminPanelLayout';
import AdminGrantsSearch from '@/components/pages/admin/admin-grants/search-grants-page/AdminGrantsSearch';

interface AdminGrantsEditProps {
  params: {
    roleId: string;
  };
}

const AdminGrantsEdit: FC<AdminGrantsEditProps> = ({ params }) => {
  return (
    <AdminPanelLayout>
      <AdminGrantsSearch roleId={params.roleId} />
    </AdminPanelLayout>
  );
};

export default AdminGrantsEdit;
