'use client';
import React, { FC } from 'react';
import { useQuery } from 'react-query';

import AdminPanelLayout from '@/components/common/layout/admin-panel-layout/AdminPanelLayout';
import DisciplinesEditPage from '@/components/pages/admin/disciplines-admin-page/pages/disciplines-edit-page/DisciplinesAdminEditPage';
import DisciplineAPI from '@/lib/api/discipline/DisciplineAPI';

interface AdminDisciplineEditProps {
  params: {
    disciplineId: string;
  };
}

const DisciplinesAdminEdit: FC<AdminDisciplineEditProps> = ({ params }) => {
  const { data: disciplines } = useQuery('discipline', () =>
    DisciplineAPI.getAllDisciplines(),
  );

  const discipline = disciplines?.disciplines.filter(
    discipline => discipline.id == params.disciplineId,
  )[0];

  return (
    <AdminPanelLayout>
      {discipline && <DisciplinesEditPage discipline={discipline} />}
    </AdminPanelLayout>
  );
};

export default DisciplinesAdminEdit;
