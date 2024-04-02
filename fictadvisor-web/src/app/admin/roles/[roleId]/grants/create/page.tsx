import React, { FC } from 'react';

import AdminGrantsCreate from '@/components/pages/admin/admin-grants/create-grants-page/AdminGrantsCreate';
interface AdminGrantsCreatePageProps {
  params: {
    roleId: string;
    grantId: string;
  };
}

const AdminGrantsCreatePage: FC<AdminGrantsCreatePageProps> = ({ params }) => {
  return <AdminGrantsCreate roleId={params.roleId} />;
};

export default AdminGrantsCreatePage;
