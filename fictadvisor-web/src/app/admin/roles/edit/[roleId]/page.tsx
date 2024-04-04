'use client';
import React, { FC } from 'react';
import { useQuery } from 'react-query';

import LoadPage from '@/components/common/ui/load-page/LoadPage';
import EditRolesAdminPage from '@/components/pages/admin/admin-roles/edit-roles/EditRolesAdminPage';
import { useQueryAdminOptions } from '@/components/pages/admin/common/constants';
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
  } = useQuery(
    ['getRole', params.roleId],
    () => RoleAPI.getById(params.roleId),
    useQueryAdminOptions,
  );

  if (isLoading) return <LoadPage />;

  if (!isSuccess)
    throw new Error(
      `An error has occurred while editing ${params.roleId} role`,
    );

  return <EditRolesAdminPage role={role} />;
};

export default AdminRolesEdit;
