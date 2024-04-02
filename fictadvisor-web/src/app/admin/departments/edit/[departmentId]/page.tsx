'use client';
import React, { FC } from 'react';
import { useQuery } from 'react-query';

import Progress from '@/components/common/ui/progress/Progress';
import AdminDepartmentsEditPage from '@/components/pages/admin/admin-departments/admin-departments-edit-page/AdminDepartmentsEditPage';
import CathedraAPI from '@/lib/api/cathera/CathedraAPI';

interface AdminDepartmentEditProps {
  params: {
    departmentId: string;
  };
}
const Page: FC<AdminDepartmentEditProps> = ({ params }) => {
  const { data, isSuccess, isLoading } = useQuery('department', () =>
    CathedraAPI.getAll(),
  );

  if (isLoading) return <Progress />;

  const department = data?.cathedras.find(cathedra => {
    return cathedra.id === params.departmentId;
  });

  if (!isSuccess || !department)
    return <>Something went wrong with the admin department edit</>;

  return <AdminDepartmentsEditPage department={department} />;
};

export default Page;
