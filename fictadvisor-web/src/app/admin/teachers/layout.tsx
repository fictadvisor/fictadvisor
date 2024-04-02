'use client';

import { PERMISSION } from '@fictadvisor/utils/security';

import AdminPanelAccessLayout from '@/components/common/layout/admin-panel-access-layout/AdminPanelAccessLayout';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AdminPanelAccessLayout permission={PERMISSION.ADMIN_PANEL_TEACHERS_SHOW}>
      {children}
    </AdminPanelAccessLayout>
  );
};

export default Layout;
