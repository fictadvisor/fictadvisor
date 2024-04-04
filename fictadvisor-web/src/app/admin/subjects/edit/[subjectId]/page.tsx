'use client';
import React, { FC } from 'react';
import { useQuery } from 'react-query';

import LoadPage from '@/components/common/ui/load-page/LoadPage';
import EditSubjectAdminPage from '@/components/pages/admin/admin-subjects/edit-subject/EditSubjectAdminPage';
import { useQueryAdminOptions } from '@/components/pages/admin/common/constants';
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
  } = useQuery(
    ['subject', params.subjectId],
    () => SubjectAPI.getSubject(params.subjectId),
    useQueryAdminOptions,
  );

  if (isLoading) return <LoadPage />;

  if (!isSuccess)
    throw new Error(`An error has occurred while fetching subjects`);

  return <EditSubjectAdminPage subject={subject} />;
};

export default AdminSubjectEdit;
