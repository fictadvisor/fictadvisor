'use client';
import React, { FC } from 'react';
import { useQuery } from 'react-query';

import AdminPanelLayout from '@/components/common/layout/admin-panel-layout/AdminPanelLayout';
import EditUserPage from '@/components/pages/admin/admin-user/edit-user-page';
import UserAPI from '@/lib/api/user/UserAPI';

interface AdminUserEditProps {
  params: {
    userId: string;
  };
}

const AdminUserEdit: FC<AdminUserEditProps> = ({ params }) => {
  const { data: user, isSuccess } = useQuery('getUser', () =>
    UserAPI.getUser(params.userId),
  );
  return (
    <AdminPanelLayout>
      {isSuccess && <EditUserPage user={user} />}
    </AdminPanelLayout>
  );
};

export default AdminUserEdit;
