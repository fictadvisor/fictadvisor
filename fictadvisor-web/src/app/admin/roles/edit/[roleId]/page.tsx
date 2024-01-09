'use client';
import React, { FC } from 'react';
import { useQuery } from 'react-query';

import AdminPanelLayout from '@/components/common/layout/admin-panel-layout/AdminPanelLayout';
import EditRolesPage from '@/components/pages/admin/admin-roles/edit-roles-page';
import RoleAPI from '@/lib/api/role/RoleAPI';

interface AdminRolesEditProps {
  params: {
    roleId: string;
  };
}

const AdminRolesEdit: FC<AdminRolesEditProps> = ({ params }) => {
  const { data: role, isSuccess } = useQuery('getRole', () =>
    RoleAPI.getById(params.roleId),
  );
  return (
    <AdminPanelLayout>
      {isSuccess && <EditRolesPage role={role} />}
    </AdminPanelLayout>
  );
};

export default AdminRolesEdit;
