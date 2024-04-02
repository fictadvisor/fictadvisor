'use client';
import React, { FC } from 'react';
import { useQuery } from 'react-query';

import Progress from '@/components/common/ui/progress/Progress';
import AdminSubjectEditPage from '@/components/pages/admin/admin-subjects/admin-subject-edit-page';
import SubjectAPI from '@/lib/api/subject/SubjectAPI';

interface AdminSubjectEditProps {
  params: {
    subjectId: string;
  };
}
const AdminSubjectEdit: FC<AdminSubjectEditProps> = ({ params }) => {
  const {
    data: subject,
    isSuccess,
    isLoading,
  } = useQuery('subject', () => SubjectAPI.getSubject(params.subjectId));

  if (isLoading) return <Progress />;

  if (!isSuccess) return <>Something went wrong with the admin subject edit</>;

  return <AdminSubjectEditPage subject={subject} />;
};

export default AdminSubjectEdit;
