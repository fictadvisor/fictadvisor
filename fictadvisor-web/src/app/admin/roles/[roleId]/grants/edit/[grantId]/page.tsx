'use client';
import React, { FC } from 'react';
import { useQuery } from 'react-query';

import LoadPage from '@/components/common/ui/load-page/LoadPage';
import EditGrantsAdminPage from '@/components/pages/admin/admin-grants/edit-grants/EditGrantsAdminPage';
import { useQueryAdminOptions } from '@/components/pages/admin/common/constants';
import GrantsAPI from '@/lib/api/grants/GrantsAPI';

interface AdminGrantsEditProps {
  params: {
    roleId: string;
    grantId: string;
  };
}

const AdminGrantsEdit: FC<AdminGrantsEditProps> = ({ params }) => {
  const {
    data: grant,
    isSuccess,
    isLoading,
  } = useQuery(
    ['getGrantById', params.roleId, params.grantId],
    () => GrantsAPI.getByGrantId(params.roleId, params.grantId),
    useQueryAdminOptions,
  );

  if (isLoading) return <LoadPage />;

  if (!isSuccess)
    throw new Error(
      `An error has occurred while editing ${params.grantId} grant`,
    );

  return <EditGrantsAdminPage grant={grant} roleId={params.roleId} />;
};

export default AdminGrantsEdit;
