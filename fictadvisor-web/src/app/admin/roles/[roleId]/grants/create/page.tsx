import React, { FC } from 'react';

import CreateGrantsAdminPage from '@/components/pages/admin/admin-grants/create-grants/CreateGrantsAdminPage';

interface AdminGrantsCreatePageProps {
  params: {
    roleId: string;
    grantId: string;
  };
}

const AdminGrantsCreatePage: FC<AdminGrantsCreatePageProps> = ({ params }) => {
  return <CreateGrantsAdminPage roleId={params.roleId} />;
};

export default AdminGrantsCreatePage;
