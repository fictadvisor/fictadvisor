'use client';
import React, { FC } from 'react';
import { useQuery } from 'react-query';

import Progress from '@/components/common/ui/progress';
import EditGrantsPage from '@/components/pages/admin/admin-grants/edit-grants-page';
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
  } = useQuery('getGrantById', () =>
    GrantsAPI.getByGrantId(params.roleId, params.grantId),
  );

  if (isLoading) return <Progress />;

  if (!isSuccess) return <>Something went wrong with the admin grant edit</>;

  return <EditGrantsPage grant={grant} roleId={params.roleId} />;
};

export default AdminGrantsEdit;
