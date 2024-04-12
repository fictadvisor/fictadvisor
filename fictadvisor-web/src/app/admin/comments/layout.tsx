import { PERMISSION } from '@fictadvisor/utils/security';

import AdminPanelAccessLayout from '@/components/common/layout/admin-panel-access-layout/AdminPanelAccessLayout';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AdminPanelAccessLayout permission={PERMISSION.ADMIN_PANEL_COMMENTS_SHOW}>
      {children}
    </AdminPanelAccessLayout>
  );
};

export default Layout;
