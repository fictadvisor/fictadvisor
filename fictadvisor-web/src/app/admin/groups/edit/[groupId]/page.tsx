'use client';
import React, { FC } from 'react';
import { useQuery } from 'react-query';

import Progress from '@/components/common/ui/progress/Progress';
import AdminGroupsEdit from '@/components/pages/admin/admin-groups/edit-groups-admin-page/AdminGroupsEdit';
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
  } = useQuery('getAdminGroup', () => GroupAPI.get(params.groupId));

  if (isLoading) return <Progress />;

  if (!isSuccess) return <>Something went wrong with the admin user edit</>;

  return <AdminGroupsEdit group={group} />;
};

export default AdminGroupEditBodyPage;
