'use client';
import React, { FC } from 'react';
import { useQuery } from 'react-query';

import AdminPanelLayout from '@/components/common/layout/admin-panel-layout/AdminPanelLayout';
import AdminSubjectEditPage from '@/components/pages/admin/admin-subjects/admin-subject-edit-page';
import SubjectAPI from '@/lib/api/subject/SubjectAPI';

interface AdminSubjectEditProps {
  params: {
    subjectId: string;
  };
}
const AdminSubjectEdit: FC<AdminSubjectEditProps> = ({ params }) => {
  const { data: subject, isSuccess } = useQuery('subject', () =>
    SubjectAPI.getSubject(params.subjectId),
  );
  return (
    <AdminPanelLayout>
      {isSuccess && <AdminSubjectEditPage subject={subject} />}
    </AdminPanelLayout>
  );
};

export default AdminSubjectEdit;
