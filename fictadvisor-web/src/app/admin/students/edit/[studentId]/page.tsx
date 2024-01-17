'use client';
import React, { FC } from 'react';
import { useQuery } from 'react-query';

import AdminPanelLayout from '@/components/common/layout/admin-panel-layout/AdminPanelLayout';
import AdminStudentEdit from '@/components/pages/admin/admin-student/edit-student-page';
import StudentAPI from '@/lib/api/student/StudentAPI';

interface AdminStudentEditPageProps {
  params: {
    studentId: string;
  };
}
const AdminStudentEditPage: FC<AdminStudentEditPageProps> = ({ params }) => {
  const { data: student, isSuccess: isSuccessStudent } = useQuery(
    'getStudent',
    () => StudentAPI.getStudent(params.studentId),
  );

  const { data: selectives, isSuccess: isSuccessSelectives } = useQuery(
    'getStudentSelective',
    () => StudentAPI.getSelective(params.studentId),
  );
  const { data: remainingSelectives, isSuccess: isSuccessRemainingSelectives } =
    useQuery('getStudentRemainingSelective', () =>
      StudentAPI.getRemainingSelective(params.studentId),
    );

  return (
    <AdminPanelLayout>
      {isSuccessSelectives &&
        isSuccessRemainingSelectives &&
        isSuccessStudent && (
          <AdminStudentEdit
            student={student}
            selectives={selectives}
            remainingSelectives={remainingSelectives}
          />
        )}
    </AdminPanelLayout>
  );
};

export default AdminStudentEditPage;
