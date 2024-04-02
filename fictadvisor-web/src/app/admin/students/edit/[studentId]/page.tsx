'use client';
import React, { FC } from 'react';
import { useQuery } from 'react-query';

import Progress from '@/components/common/ui/progress/Progress';
import AdminStudentEdit from '@/components/pages/admin/admin-student/edit-student-page';
import StudentAPI from '@/lib/api/student/StudentAPI';

interface AdminStudentEditPageProps {
  params: {
    studentId: string;
  };
}
const AdminStudentEditPage: FC<AdminStudentEditPageProps> = ({ params }) => {
  const { data: student, isLoading: isLoadingStudent } = useQuery(
    'getStudent',
    () => StudentAPI.getStudent(params.studentId),
  );

  const { data: selectives, isLoading: isLoadingSelective } = useQuery(
    'getStudentSelective',
    () => StudentAPI.getSelective(params.studentId),
  );
  const { data: remainingSelectives, isLoading: isLoadingRemainingSelectives } =
    useQuery('getStudentRemainingSelective', () =>
      StudentAPI.getRemainingSelective(params.studentId),
    );

  const isSuccess = student && selectives && remainingSelectives;

  const isLoading =
    isLoadingSelective || isLoadingRemainingSelectives || isLoadingStudent;

  if (isLoading) return <Progress />;

  if (!isSuccess) return <>Something went wrong with the admin role edit</>;

  return (
    <AdminStudentEdit
      student={student}
      selectives={selectives}
      remainingSelectives={remainingSelectives}
    />
  );
};

export default AdminStudentEditPage;
