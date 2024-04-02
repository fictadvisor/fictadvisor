'use client';
import React, { FC } from 'react';
import { useQuery } from 'react-query';

import Progress from '@/components/common/ui/progress';
import TeachersAdminEditPage from '@/components/pages/admin/admin-teachers/edit-teachers-admin-page/TeachersAdminEditPage';
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
  } = useQuery('teacher', () => TeacherAPI.get(params.teacherId));

  if (isLoading) return <Progress />;

  if (!isSuccess) return <>Something went wrong with the admin teacher edit</>;

  return <TeachersAdminEditPage teacher={teacher} />;
};

export default Edit;
