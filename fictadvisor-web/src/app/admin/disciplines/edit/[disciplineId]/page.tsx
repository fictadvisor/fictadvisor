'use client';
import React, { FC } from 'react';
import { useQuery } from 'react-query';

import LoadPage from '@/components/common/ui/load-page/LoadPage';
import EditDisciplinesAdminPage from '@/components/pages/admin/admin-disciplines/edit-disciplines/EditDisciplinesAdminPage';
import { useQueryAdminOptions } from '@/components/pages/admin/common/constants';
import DisciplineAPI from '@/lib/api/discipline/DisciplineAPI';

interface AdminDisciplineEditProps {
  params: {
    disciplineId: string;
  };
}

const DisciplinesAdminEdit: FC<AdminDisciplineEditProps> = ({ params }) => {
  const {
    data: discipline,
    isSuccess,
    isLoading,
  } = useQuery(
    ['discipline', params.disciplineId],
    () => DisciplineAPI.getDisciplinesById(params.disciplineId),
    useQueryAdminOptions,
  );

  if (isLoading) return <LoadPage />;

  if (!isSuccess)
    throw new Error(
      `An error has occurred while editing ${params.disciplineId} discipline`,
    );

  return <EditDisciplinesAdminPage discipline={discipline} />;
};

export default DisciplinesAdminEdit;
