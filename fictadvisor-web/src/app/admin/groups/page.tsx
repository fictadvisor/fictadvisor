import React from 'react';

import AdminPanelLayout from '@/components/common/layout/admin-panel-layout/AdminPanelLayout';
import GroupsAdminPage from '@/components/pages/admin/admin-groups/search-groups-admin-page/AdminGroupsPage';

export default async function GroupsAdmin() {
  return (
    <AdminPanelLayout>
      <GroupsAdminPage />
    </AdminPanelLayout>
  );
}
