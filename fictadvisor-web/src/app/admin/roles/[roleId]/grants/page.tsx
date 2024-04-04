'use client';
import React, { FC } from 'react';

import SearchGrantsAdminPage from '@/components/pages/admin/admin-grants/search-grants/SearchGrantsAdminPage';

interface AdminGrantsEditProps {
  params: {
    roleId: string;
  };
}

const AdminGrantsEdit: FC<AdminGrantsEditProps> = ({ params }) => {
  return <SearchGrantsAdminPage roleId={params.roleId} />;
};

export default AdminGrantsEdit;
