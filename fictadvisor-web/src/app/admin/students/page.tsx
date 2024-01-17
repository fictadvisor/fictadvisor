import React from 'react';

import AdminPanelLayout from '@/components/common/layout/admin-panel-layout/AdminPanelLayout';
import AdminStudentSearch from '@/components/pages/admin/admin-student/search-student-page';
import { AdminStudentSearchPageProps } from '@/components/pages/admin/admin-student/search-student-page/AdminStudentSearch';
import GroupAPI from '@/lib/api/group/GroupAPI';

export default async function AdminStudentSearchPage() {
  let data: AdminStudentSearchPageProps['dataGroups'];
  try {
    data = await GroupAPI.getAll();
  } catch (error: unknown) {
    data = null;
  }
  return (
    <AdminPanelLayout>
      <AdminStudentSearch dataGroups={data} />
    </AdminPanelLayout>
  );
}
