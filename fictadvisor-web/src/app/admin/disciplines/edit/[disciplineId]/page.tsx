'use client';
import React, { FC } from 'react';
import { useQuery } from 'react-query';

import Progress from '@/components/common/ui/progress';
import DisciplinesEditPage from '@/components/pages/admin/disciplines-admin-page/pages/disciplines-edit-page/DisciplinesAdminEditPage';
import DisciplineAPI from '@/lib/api/discipline/DisciplineAPI';

interface AdminDisciplineEditProps {
  params: {
    disciplineId: string;
  };
}

const DisciplinesAdminEdit: FC<AdminDisciplineEditProps> = ({ params }) => {
  const {
    data: disciplines,
    isSuccess,
    isLoading,
  } = useQuery('discipline', () => DisciplineAPI.getAllDisciplines());

  if (isLoading) return <Progress />;

  const discipline = disciplines?.disciplines.find(discipline => {
    return discipline.id === params.disciplineId;
  });

  if (!isSuccess || !discipline)
    return <>Something went wrong with the admin discipline edit</>;

  return <DisciplinesEditPage discipline={discipline} />;
};

export default DisciplinesAdminEdit;
