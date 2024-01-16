import React, { FC } from 'react';

import AdminPanelLayout from '@/components/common/layout/admin-panel-layout/AdminPanelLayout';
import AdminGrantsCreate from '@/components/pages/admin/admin-grants/create-grants-page/AdminGrantsCreate';
interface AdminGrantsCreatePageProps {
  params: {
    roleId: string;
    grantId: string;
  };
}

const AdminGrantsCreatePage: FC<AdminGrantsCreatePageProps> = ({ params }) => {
  return (
    <AdminPanelLayout>
      <AdminGrantsCreate roleId={params.roleId} />
    </AdminPanelLayout>
  );
};

export default AdminGrantsCreatePage;
