import React from 'react';

import AdminPanelLayout from '@/components/common/layout/admin-panel-layout/AdminPanelLayout';
import AdminRolesSearch from '@/components/pages/admin/admin-roles/search-roles-page/AdminRolesSearch';

const Page = () => {
  return (
    <AdminPanelLayout>
      <AdminRolesSearch />
    </AdminPanelLayout>
  );
};

export default Page;
