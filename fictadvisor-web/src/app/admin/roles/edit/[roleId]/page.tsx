'use client';
import React, { FC } from 'react';
import { useQuery } from 'react-query';

import Progress from '@/components/common/ui/progress/Progress';
import EditRolesPage from '@/components/pages/admin/admin-roles/edit-roles-page';
import RoleAPI from '@/lib/api/role/RoleAPI';

interface AdminRolesEditProps {
  params: {
    roleId: string;
  };
}

const AdminRolesEdit: FC<AdminRolesEditProps> = ({ params }) => {
  const {
    data: role,
    isSuccess,
    isLoading,
  } = useQuery('getRole', () => RoleAPI.getById(params.roleId));

  if (isLoading) return <Progress />;

  if (!isSuccess) return <>Something went wrong with the admin role edit</>;

  return <EditRolesPage role={role} />;
};

export default AdminRolesEdit;
