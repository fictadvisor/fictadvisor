'use client';
import React, { FC } from 'react';
import { useQuery } from 'react-query';

import LoadPage from '@/components/common/ui/load-page';
import EditUserPage from '@/components/pages/admin/admin-user/edit-user';
import { useQueryAdminOptions } from '@/components/pages/admin/common/constants';
import UserAPI from '@/lib/api/user/UserAPI';

interface AdminUserEditProps {
  params: {
    userId: string;
  };
}

const AdminUserEdit: FC<AdminUserEditProps> = ({ params }) => {
  const {
    data: user,
    isSuccess,
    isLoading,
  } = useQuery(
    ['getUser', params.userId],
    () => UserAPI.getUser(params.userId),
    useQueryAdminOptions,
  );

  if (isLoading) return <LoadPage />;

  if (!isSuccess) throw new Error('Something went wrong in user edit page');

  return <EditUserPage user={user} />;
};

export default AdminUserEdit;
