'use client';
import React, { FC } from 'react';
import { useQuery } from 'react-query';

import AdminPanelLayout from '@/components/common/layout/admin-panel-layout/AdminPanelLayout';
import AdminDepartmentsEditPage from '@/components/pages/admin/admin-departments/admin-departments-edit-page/AdminDepartmentsEditPage';
import { useToastError } from '@/hooks/use-toast-error/useToastError';
import CathedraAPI from '@/lib/api/cathera/CathedraAPI';

interface AdminDepartmentEditProps {
  params: {
    departmentId: string;
  };
}
const Page: FC<AdminDepartmentEditProps> = ({ params }) => {
  const toast = useToastError();
  const { data, isSuccess } = useQuery('department', () =>
    CathedraAPI.getAll(),
  );
  if (!isSuccess) return <div>Loading...</div>;
  const department = data.cathedras.find(cathedra => {
    return cathedra.id === params.departmentId;
  });
  if (!department) {
    toast.displayError('Error: Cathedra doesnt exist');
    return;
  }
  return (
    <AdminPanelLayout>
      {isSuccess && <AdminDepartmentsEditPage department={department} />}
    </AdminPanelLayout>
  );
};

export default Page;
