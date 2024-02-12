import React from 'react';

import AdminPanelLayout from '@/components/common/layout/admin-panel-layout/AdminPanelLayout';
import CommentsAdminPage from '@/components/pages/admin/admin-comments';

const Page = () => {
  return (
    <AdminPanelLayout>
      <CommentsAdminPage />
    </AdminPanelLayout>
  );
};

export default Page;
