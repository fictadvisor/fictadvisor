'use client';
import React, { FC } from 'react';
import { useQuery } from 'react-query';
import { Box } from '@mui/material';

import AdminPanelLayout from '@/components/common/layout/admin-panel-layout/AdminPanelLayout';
import EditGrantsPage from '@/components/pages/admin/admin-grants/edit-grants-page';
import GrantsAPI from '@/lib/api/grants/GrantsAPI';

interface AdminGrantsEditProps {
  params: {
    roleId: string;
    grantId: string;
  };
}

const AdminGrantsEdit: FC<AdminGrantsEditProps> = ({ params }) => {
  const { data: grant, isSuccess } = useQuery('getGrantById', () =>
    GrantsAPI.getByGrantId(params.roleId, params.grantId),
  );
  return (
    <AdminPanelLayout>
      {isSuccess ? (
        <EditGrantsPage grant={grant} roleId={params.roleId} />
      ) : (
        <Box sx={{ padding: '32px', textAlign: 'center' }}>Wait a sec...</Box>
      )}
    </AdminPanelLayout>
  );
};

export default AdminGrantsEdit;
