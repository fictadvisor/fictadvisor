'use client';
import React, { FC } from 'react';
import { useQuery } from 'react-query';

import LoadPage from '@/components/common/ui/load-page/LoadPage';
import EditTeachersAdminPage from '@/components/pages/admin/admin-teachers/edit-teachers/EditTeachersAdminPage';
import { useQueryAdminOptions } from '@/components/pages/admin/common/constants';
import TeacherAPI from '@/lib/api/teacher/TeacherAPI';

interface PageProps {
  params: {
    teacherId: string;
  };
}

const Edit: FC<PageProps> = ({ params }) => {
  const {
    data: teacher,
    isSuccess,
    isLoading,
  } = useQuery(
    ['teacher', params.teacherId],
    () => TeacherAPI.get(params.teacherId),
    useQueryAdminOptions,
  );

  if (isLoading) return <LoadPage />;

  if (!isSuccess) throw new Error('Something went wrong in teacher edit page');

  return <EditTeachersAdminPage teacher={teacher} />;
};

export default Edit;
