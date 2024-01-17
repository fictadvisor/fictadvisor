import React from 'react';

import AdminPanelLayout from '@/components/common/layout/admin-panel-layout/AdminPanelLayout';
import CreateStudentPage from '@/components/pages/admin/admin-student/create-student-page';

const AdminCreateStudentPage = () => {
  return (
    <AdminPanelLayout>
      <CreateStudentPage />
    </AdminPanelLayout>
  );
};

export default AdminCreateStudentPage;
