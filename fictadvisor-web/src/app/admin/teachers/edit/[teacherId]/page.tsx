'use client';
import React, { FC } from 'react';
import { useQuery } from 'react-query';

import AdminPanelLayout from '@/components/common/layout/admin-panel-layout/AdminPanelLayout';
import TeachersAdminEditPage from '@/components/pages/admin/admin-teachers/edit-teachers-admin-page/TeachersAdminEditPage';
import TeacherAPI from '@/lib/api/teacher/TeacherAPI';

interface PageProps {
  params: {
    teacherId: string;
  };
}

const Edit: FC<PageProps> = ({ params }) => {
  const { data: teacher, isSuccess } = useQuery('teacher', () =>
    TeacherAPI.get(params.teacherId),
  );
  return (
    <AdminPanelLayout>
      {isSuccess && <TeachersAdminEditPage teacher={teacher} />}
    </AdminPanelLayout>
  );
};

export default Edit;
