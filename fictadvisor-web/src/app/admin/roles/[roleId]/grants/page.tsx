'use client';
import React, { FC } from 'react';

import AdminGrantsSearch from '@/components/pages/admin/admin-grants/search-grants-page/AdminGrantsSearch';

interface AdminGrantsEditProps {
  params: {
    roleId: string;
  };
}

const AdminGrantsEdit: FC<AdminGrantsEditProps> = ({ params }) => {
  return <AdminGrantsSearch roleId={params.roleId} />;
};

export default AdminGrantsEdit;
