'use client';
import React, { FC } from 'react';
import { useQuery } from 'react-query';

import Progress from '@/components/common/ui/progress';
import EditUserPage from '@/components/pages/admin/admin-user/edit-user-page';
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
  } = useQuery('getUser', () => UserAPI.getUser(params.userId));

  if (isLoading) return <Progress />;

  if (!isSuccess) return <>Something went wrong with the admin user edit</>;

  return <EditUserPage user={user} />;
};

export default AdminUserEdit;
