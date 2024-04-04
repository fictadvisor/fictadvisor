'use client';
import React, { FC } from 'react';
import { useQuery } from 'react-query';

import LoadPage from '@/components/common/ui/load-page';
import EditDepartmentsAdminPage from '@/components/pages/admin/admin-departments/edit-departments/EditDepartmentsAdminPage';
import { useQueryAdminOptions } from '@/components/pages/admin/common/constants';
import CathedraAPI from '@/lib/api/cathedras/CathedraAPI';

interface AdminDepartmentEditProps {
  params: {
    departmentId: string;
  };
}
const Page: FC<AdminDepartmentEditProps> = ({ params }) => {
  const { data: department, isLoading } = useQuery(
    ['departmentById', params.departmentId],
    () => CathedraAPI.getDepartmentById(params.departmentId),
    useQueryAdminOptions,
  );

  if (isLoading) return <LoadPage />;

  if (!department)
    throw new Error('Something went wrong in department edit page');

  return <EditDepartmentsAdminPage department={department.data} />;
};

export default Page;
