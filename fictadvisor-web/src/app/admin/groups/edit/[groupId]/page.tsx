'use client';
import React, { FC } from 'react';
import { useQuery } from 'react-query';

import LoadPage from '@/components/common/ui/load-page/LoadPage';
import AdminGroupsEdit from '@/components/pages/admin/admin-groups/edit-groups/AdminGroupsEdit';
import { useQueryAdminOptions } from '@/components/pages/admin/common/constants';
import GroupAPI from '@/lib/api/group/GroupAPI';

interface AdminGroupEditBodyPageProps {
  params: {
    groupId: string;
  };
}
const AdminGroupEditBodyPage: FC<AdminGroupEditBodyPageProps> = ({
  params,
}) => {
  const {
    data: group,
    isSuccess,
    isLoading,
  } = useQuery(
    ['getAdminGroup', params.groupId],
    () => GroupAPI.get(params.groupId),
    useQueryAdminOptions,
  );

  if (isLoading) return <LoadPage />;

  if (!isSuccess)
    throw new Error(
      `An error has occurred while editing ${params.groupId} group`,
    );

  return <AdminGroupsEdit group={group} />;
};

export default AdminGroupEditBodyPage;
