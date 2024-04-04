'use client';
import React, { FC } from 'react';
import { useQuery } from 'react-query';

import LoadPage from '@/components/common/ui/load-page/LoadPage';
import AdminStudentEdit from '@/components/pages/admin/admin-student/edit-student/AdminStudentEdit';
import { useQueryAdminOptions } from '@/components/pages/admin/common/constants';
import StudentAPI from '@/lib/api/student/StudentAPI';

interface AdminStudentEditPageProps {
  params: {
    studentId: string;
  };
}
const AdminStudentEditPage: FC<AdminStudentEditPageProps> = ({ params }) => {
  const { data: student, isLoading: isLoadingStudent } = useQuery(
    ['getStudent', params.studentId],
    () => StudentAPI.getStudent(params.studentId),
    useQueryAdminOptions,
  );

  const { data: selectives, isLoading: isLoadingSelective } = useQuery(
    ['getStudentSelective', params.studentId],
    () => StudentAPI.getSelective(params.studentId),
    useQueryAdminOptions,
  );
  const { data: remainingSelectives, isLoading: isLoadingRemainingSelectives } =
    useQuery(
      ['getStudentRemainingSelective', params.studentId],
      () => StudentAPI.getRemainingSelective(params.studentId),
      useQueryAdminOptions,
    );

  const isSuccess = student && selectives && remainingSelectives;

  const isLoading =
    isLoadingSelective || isLoadingRemainingSelectives || isLoadingStudent;

  if (isLoading) return <LoadPage />;

  if (!isSuccess) throw new Error('Something went wrong in student edit page');

  return (
    <AdminStudentEdit
      student={student}
      selectives={selectives}
      remainingSelectives={remainingSelectives}
    />
  );
};

export default AdminStudentEditPage;
