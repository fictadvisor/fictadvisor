'use client';
import React, { FC } from 'react';
import { useQuery } from 'react-query';

import AdminPanelLayout from '@/components/common/layout/admin-panel-layout/AdminPanelLayout';
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
  const { data: group, isSuccess: isSuccessGroup } = useQuery(
    'getAdminGroup',
    () => GroupAPI.get(params.groupId),
  );

  return (
    <AdminPanelLayout>
      {isSuccessGroup && <AdminGroupsEdit group={group} />}
    </AdminPanelLayout>
  );
};

export default AdminGroupEditBodyPage;
