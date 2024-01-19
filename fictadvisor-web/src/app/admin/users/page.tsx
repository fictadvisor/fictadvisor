import React from 'react';

import AdminPanelLayout from '@/components/common/layout/admin-panel-layout/AdminPanelLayout';
import AdminUserSearch from '@/components/pages/admin/admin-user/search-user-page';

const Page = () => {
  return (
    <AdminPanelLayout>
      <AdminUserSearch />
    </AdminPanelLayout>
  );
};

export default Page;
